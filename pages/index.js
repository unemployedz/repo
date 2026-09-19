import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function runOsint(e) {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch('/api/osint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>GitHub OSINT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <header>
          <h1>GitHub OSINT</h1>
          <p>Public intel via classic token · vercel ready</p>
        </header>

        <form onSubmit={runOsint} className="search-box">
          <input
            type="text"
            placeholder="Enter any GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button type="submit" disabled={loading || !username.trim()}>
            {loading ? 'Scanning...' : 'Gather'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {data && (
          <div className="results">
            {/* Profile Card */}
            <section className="card profile">
              <div className="profile-header">
                <img src={data.profile.avatar_url} alt="avatar" />
                <div>
                  <h2>{data.profile.name || data.profile.login}</h2>
                  <a href={data.profile.html_url} target="_blank" rel="noreferrer">
                    @{data.profile.login}
                  </a>
                  {data.profile.bio && <p className="bio">{data.profile.bio}</p>}
                </div>
              </div>
              <div className="meta-grid">
                <div><span>ID</span>{data.profile.id}</div>
                <div><span>Repos</span>{data.profile.public_repos}</div>
                <div><span>Followers</span>{data.profile.followers}</div>
                <div><span>Following</span>{data.profile.following}</div>
                <div><span>Gists</span>{data.profile.public_gists}</div>
                <div><span>Created</span>{new Date(data.profile.created_at).toLocaleDateString()}</div>
                {data.profile.location && <div><span>Location</span>{data.profile.location}</div>}
                {data.profile.company && <div><span>Company</span>{data.profile.company}</div>}
                {data.profile.blog && (
                  <div><span>Blog</span><a href={data.profile.blog} target="_blank" rel="noreferrer">{data.profile.blog}</a></div>
                )}
                {data.profile.twitter && <div><span>Twitter</span>@{data.profile.twitter}</div>}
                {data.profile.email && <div><span>Public Email</span>{data.profile.email}</div>}
                {data.profile.hireable !== null && (
                  <div><span>Hireable</span>{data.profile.hireable ? 'Yes' : 'No'}</div>
                )}
              </div>
            </section>

            {/* Emails */}
            <section className="card">
              <h3>Emails / Commit Authors</h3>
              {data.emails.length === 0 && data.commitAuthors.length === 0 ? (
                <p className="empty">No emails found in recent public events</p>
              ) : (
                <ul className="list">
                  {data.emails.map((e) => (
                    <li key={e}><code>{e}</code></li>
                  ))}
                  {data.commitAuthors.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              )}
            </section>

            {/* Orgs */}
            {data.orgs.length > 0 && (
              <section className="card">
                <h3>Organizations</h3>
                <ul className="list">
                  {data.orgs.map((o) => (
                    <li key={o.login}>
                      <a href={o.html_url} target="_blank" rel="noreferrer">{o.login}</a>
                      {o.description && <span className="dim"> — {o.description}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Repos */}
            <section className="card">
              <h3>Public Repositories ({data.repos.length})</h3>
              <div className="repo-grid">
                {data.repos.map((r) => (
                  <div key={r.full_name} className="repo">
                    <a href={r.html_url} target="_blank" rel="noreferrer">{r.name}</a>
                    {r.description && <p>{r.description}</p>}
                    <div className="repo-meta">
                      {r.language && <span>{r.language}</span>}
                      <span>★ {r.stargazers_count}</span>
                      <span>⑂ {r.forks_count}</span>
                      {r.fork && <span className="tag">fork</span>}
                      {r.archived && <span className="tag">archived</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Gists */}
            {data.gists.length > 0 && (
              <section className="card">
                <h3>Public Gists</h3>
                <ul className="list">
                  {data.gists.map((g) => (
                    <li key={g.id}>
                      <a href={g.html_url} target="_blank" rel="noreferrer">
                        {g.description || g.files.join(', ') || g.id}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Activity */}
            <section className="card">
              <h3>Recent Public Activity</h3>
              <ul className="list activity">
                {data.recentActivity.map((a, i) => (
                  <li key={i}>
                    <span className="type">{a.type.replace('Event', '')}</span>
                    {a.repo && <span className="repo-name">{a.repo}</span>}
                    {a.payload_summary && <span className="dim">{a.payload_summary}</span>}
                    <span className="time">{new Date(a.created_at).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="rate">
              Rate limit remaining: {data.rateLimit?.remaining ?? '—'}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #0d1117;
          color: #c9d1d9;
          min-height: 100vh;
        }
        a { color: #58a6ff; text-decoration: none; }
        a:hover { text-decoration: underline; }
        code { background: #161b22; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
      `}</style>

      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        header {
          text-align: center;
          margin-bottom: 32px;
        }
        header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #f0f6fc;
          margin-bottom: 6px;
        }
        header p {
          color: #8b949e;
          font-size: 0.95rem;
        }
        .search-box {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
        }
        .search-box input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #30363d;
          border-radius: 8px;
          background: #161b22;
          color: #f0f6fc;
          font-size: 1rem;
        }
        .search-box input:focus {
          outline: none;
          border-color: #58a6ff;
        }
        .search-box button {
          padding: 12px 24px;
          background: #238636;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.95rem;
        }
        .search-box button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .search-box button:hover:not(:disabled) {
          background: #2ea043;
        }
        .error {
          background: #3d1214;
          border: 1px solid #f85149;
          color: #f85149;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .results {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .card {
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 10px;
          padding: 20px;
        }
        .card h3 {
          font-size: 1rem;
          color: #f0f6fc;
          margin-bottom: 12px;
          border-bottom: 1px solid #21262d;
          padding-bottom: 8px;
        }
        .profile-header {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        .profile-header img {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 2px solid #30363d;
        }
        .profile-header h2 {
          font-size: 1.4rem;
          color: #f0f6fc;
        }
        .bio {
          margin-top: 6px;
          color: #8b949e;
          font-size: 0.9rem;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
        }
        .meta-grid div {
          font-size: 0.9rem;
        }
        .meta-grid span {
          display: block;
          color: #8b949e;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 2px;
        }
        .list {
          list-style: none;
        }
        .list li {
          padding: 6px 0;
          border-bottom: 1px solid #21262d;
          font-size: 0.9rem;
        }
        .list li:last-child { border-bottom: none; }
        .empty { color: #8b949e; font-size: 0.9rem; }
        .dim { color: #8b949e; }
        .repo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
        }
        .repo {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 8px;
          padding: 12px;
        }
        .repo a {
          font-weight: 600;
          font-size: 0.95rem;
        }
        .repo p {
          margin: 6px 0;
          font-size: 0.85rem;
          color: #8b949e;
          line-height: 1.3;
        }
        .repo-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.8rem;
          color: #8b949e;
        }
        .tag {
          background: #21262d;
          padding: 1px 6px;
          border-radius: 4px;
          font-size: 0.75rem;
        }
        .activity .type {
          display: inline-block;
          min-width: 90px;
          color: #58a6ff;
          font-weight: 500;
        }
        .activity .repo-name {
          margin: 0 8px;
        }
        .activity .time {
          float: right;
          color: #8b949e;
          font-size: 0.8rem;
        }
        .rate {
          text-align: center;
          color: #8b949e;
          font-size: 0.8rem;
          margin-top: 8px;
        }
      `}</style>
    </>
  );
}