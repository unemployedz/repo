export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.body;
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username required' });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN not configured' });
  }

  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'github-osint',
  };

  // helper: is this a usable email?
  function isRealEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const e = email.toLowerCase().trim();
    if (!e.includes('@')) return false;
    // skip pure dummy / privacy placeholders
    if (e.endsWith('@users.noreply.github.com')) return false;
    if (e.includes('noreply') && e.includes('github')) return false;
    if (e === 'none@none.com' || e === 'user@example.com') return false;
    if (e.startsWith('noreply@') || e.startsWith('no-reply@')) return false;
    return true;
  }

  try {
    // 1. User profile
    const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers });
    if (!userRes.ok) {
      const err = await userRes.json().catch(() => ({}));
      return res.status(userRes.status).json({ error: err.message || 'User not found' });
    }
    const user = await userRes.json();

    // 2. Public repos (sorted by recently pushed)
    const reposRes = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`,
      { headers }
    );
    const repos = reposRes.ok ? await reposRes.json() : [];

    // 3. Public events
    const eventsRes = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100`,
      { headers }
    );
    const events = eventsRes.ok ? await eventsRes.json() : [];

    const emails = new Set();
    const commitAuthors = new Set();

    // --- Source A: PushEvent commits (fast) ---
    for (const ev of events) {
      if (ev.type === 'PushEvent' && ev.payload?.commits) {
        for (const c of ev.payload.commits) {
          const em = c.author?.email;
          if (isRealEmail(em)) {
            emails.add(em);
            if (c.author.name) commitAuthors.add(`${c.author.name} <${em}>`);
          }
        }
      }
    }

    // --- Source B: deep dive into recent repos via commits API ---
    // scan up to 8 most recently pushed non-fork repos, 30 commits each
    const targetRepos = repos
      .filter((r) => !r.fork && !r.archived)
      .slice(0, 8);

    for (const repo of targetRepos) {
      try {
        const commitsRes = await fetch(
          `https://api.github.com/repos/${repo.full_name}/commits?per_page=30&author=${encodeURIComponent(username)}`,
          { headers }
        );
        if (!commitsRes.ok) continue;
        const commits = await commitsRes.json();
        if (!Array.isArray(commits)) continue;

        for (const c of commits) {
          // commit.author (GitHub user) vs commit.commit.author (git identity)
          const gitEmail = c.commit?.author?.email;
          const gitName = c.commit?.author?.name;
          if (isRealEmail(gitEmail)) {
            emails.add(gitEmail);
            if (gitName) commitAuthors.add(`${gitName} <${gitEmail}>`);
          }
          // also check committer
          const committerEmail = c.commit?.committer?.email;
          const committerName = c.commit?.committer?.name;
          if (isRealEmail(committerEmail)) {
            emails.add(committerEmail);
            if (committerName) commitAuthors.add(`${committerName} <${committerEmail}>`);
          }
        }
      } catch {
        // skip repo on error
      }
    }

    // profile public email (rare but real)
    if (isRealEmail(user.email)) {
      emails.add(user.email);
    }

    // 4. Orgs
    let orgs = [];
    try {
      const orgsRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/orgs`, { headers });
      if (orgsRes.ok) orgs = await orgsRes.json();
    } catch {}

    // 5. Gists
    let gists = [];
    try {
      const gistsRes = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/gists?per_page=30`,
        { headers }
      );
      if (gistsRes.ok) gists = await gistsRes.json();
    } catch {}

    const result = {
      profile: {
        login: user.login,
        id: user.id,
        name: user.name,
        bio: user.bio,
        company: user.company,
        location: user.location,
        blog: user.blog,
        twitter: user.twitter_username,
        email: user.email || null,
        hireable: user.hireable,
        public_repos: user.public_repos,
        public_gists: user.public_gists,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
        updated_at: user.updated_at,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        type: user.type,
      },
      emails: Array.from(emails),
      commitAuthors: Array.from(commitAuthors),
      repos: repos.map((r) => ({
        name: r.name,
        full_name: r.full_name,
        html_url: r.html_url,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        open_issues: r.open_issues_count,
        created_at: r.created_at,
        updated_at: r.updated_at,
        pushed_at: r.pushed_at,
        private: r.private,
        fork: r.fork,
        archived: r.archived,
        topics: r.topics || [],
        default_branch: r.default_branch,
      })),
      orgs: orgs.map((o) => ({
        login: o.login,
        description: o.description,
        html_url: `https://github.com/${o.login}`,
      })),
      gists: gists.map((g) => ({
        id: g.id,
        html_url: g.html_url,
        description: g.description,
        public: g.public,
        created_at: g.created_at,
        files: Object.keys(g.files || {}),
      })),
      recentActivity: events.slice(0, 20).map((e) => ({
        type: e.type,
        repo: e.repo?.name,
        created_at: e.created_at,
        payload_summary:
          e.type === 'PushEvent'
            ? `${e.payload?.size || 0} commits`
            : e.type === 'CreateEvent'
            ? e.payload?.ref_type
            : e.type === 'WatchEvent'
            ? 'starred'
            : e.type === 'ForkEvent'
            ? 'forked'
            : null,
      })),
      rateLimit: {
        remaining: userRes.headers.get('x-ratelimit-remaining'),
        reset: userRes.headers.get('x-ratelimit-reset'),
      },
      note: 'Emails pulled from real git commit metadata across recent repos. Pure noreply.github.com addresses are filtered out.',
    };

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
}