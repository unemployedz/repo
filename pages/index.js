import { useState } from 'react';
import Head from 'next/head';

const Icon = {
  menu: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  close: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  search: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  repo: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  org: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
    </svg>
  ),
  activity: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  gist: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  external: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
};

const TABS = [
  { id: 'overview', label: 'Overview', icon: Icon.user },
  { id: 'emails', label: 'Emails', icon: Icon.mail },
  { id: 'repos', label: 'Repos', icon: Icon.repo },
  { id: 'orgs', label: 'Orgs', icon: Icon.org },
  { id: 'gists', label: 'Gists', icon: Icon.gist },
  { id: 'activity', label: 'Activity', icon: Icon.activity },
];

/* exact blur pattern from reference */
function BlurReveal({ value }) {
  const [revealed, setRevealed] = useState(false);
  if (!value) return <span className="muted">—</span>;

  return (
    <span className="private-wrap">
      <span className={`private-value ${revealed ? 'revealed' : ''}`}>{value}</span>
      {!revealed && (
        <button
          type="button"
          className="reveal"
          onClick={() => setRevealed(true)}
        >
          Click to reveal
        </button>
      )}
    </span>
  );
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tab, setTab] = useState('overview');

  async function runOsint(e) {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);
    setTab('overview');

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

      <div className={`app ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
        <aside className="sidebar">
          <div className="sidebar-head">
            <span className="logo">OSINT</span>
            <button className="icon-btn" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
              {Icon.close}
            </button>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section">GitHub</div>
            <button className="nav-item active">
              {Icon.user}
              <span>User Lookup</span>
            </button>
            <button className="nav-item disabled" title="Coming soon">
              {Icon.repo}
              <span>Repo Scan</span>
            </button>
            <button className="nav-item disabled" title="Coming soon">
              {Icon.org}
              <span>Org Intel</span>
            </button>
          </nav>

          <div className="sidebar-foot">
            <span className="muted">classic token · public only</span>
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            {!sidebarOpen && (
              <button className="icon-btn" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
                {Icon.menu}
              </button>
            )}
            <form onSubmit={runOsint} className="search">
              <span className="search-icon">{Icon.search}</span>
              <input
                type="text"
                placeholder="GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
              <button type="submit" disabled={loading || !username.trim()}>
                {loading ? 'Scanning' : 'Gather'}
              </button>
            </form>
          </header>

          {error && <div className="banner error">{error}</div>}

          {!data && !loading && !error && (
            <div className="empty-state">
              <div className="empty-icon">{Icon.search}</div>
              <h2>GitHub OSINT</h2>
              <p>Enter a username to pull public profile, emails, repos and activity.</p>
            </div>
          )}

          {loading && (
            <div className="empty-state">
              <div className="spinner" />
              <p>Gathering public intel...</p>
            </div>
          )}

          {data && (
            <div className="content">
              <div className="profile-strip">
                <img src={data.profile.avatar_url} alt="" className="avatar" />
                <div className="identity">
                  <div className="name">{data.profile.name || data.profile.login}</div>
                  <div className="handle">@{data.profile.login}</div>
                </div>
                <div className="stats">
                  <div className="stat">
                    <span className="stat-label">Repositories</span>
                    <span className="stat-value">{data.profile.public_repos}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Emails</span>
                    <span className="stat-value">{data.emails.length}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Followers</span>
                    <span className="stat-value">{data.profile.followers}</span>
                  </div>
                </div>
                <a
                  href={data.profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  Open profile {Icon.external}
                </a>
              </div>

              <div className="tabs">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    className={`tab ${tab === t.id ? 'active' : ''}`}
                    onClick={() => setTab(t.id)}
                  >
                    {t.icon}
                    <span>{t.label}</span>
                    {t.id === 'emails' && data.emails.length > 0 && (
                      <span className="badge">{data.emails.length}</span>
                    )}
                    {t.id === 'repos' && (
                      <span className="badge">{data.repos.length}</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="panel">
                {tab === 'overview' && (
                  <div className="grid-cards">
                    <div className="info-card">
                      <div className="info-label">User ID</div>
                      <div className="info-value">{data.profile.id}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Created</div>
                      <div className="info-value">
                        {new Date(data.profile.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Location</div>
                      <div className="info-value">{data.profile.location || '—'}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Company</div>
                      <div className="info-value">{data.profile.company || '—'}</div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Blog</div>
                      <div className="info-value">
                        {data.profile.blog ? (
                          <a href={data.profile.blog} target="_blank" rel="noreferrer">
                            {data.profile.blog}
                          </a>
                        ) : (
                          '—'
                        )}
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-label">Twitter</div>
                      <div className="info-value">
                        {data.profile.twitter ? `@${data.profile.twitter}` : '—'}
                      </div>
                    </div>
                    <div className="info-card wide">
                      <div className="info-label">Bio</div>
                      <div className="info-value">{data.profile.bio || '—'}</div>
                    </div>
                    {data.profile.email && (
                      <div className="info-card wide">
                        <div className="info-label">Public Profile Email</div>
                        <BlurReveal value={data.profile.email} />
                      </div>
                    )}
                  </div>
                )}

                {tab === 'emails' && (
                  <div className="email-list">
                    {data.emails.length === 0 ? (
                      <div className="empty-panel">No real emails found in public commits</div>
                    ) : (
                      data.emails.map((email) => (
                        <div key={email} className="email-row">
                          <div className="email-label">Public Commit Email</div>
                          <BlurReveal value={email} />
                        </div>
                      ))
                    )}
                    {data.commitAuthors.length > 0 && (
                      <div className="authors">
                        <div className="section-title">Commit Authors</div>
                        {data.commitAuthors.map((a) => (
                          <div key={a} className="author-row">
                            <BlurReveal value={a} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {tab === 'repos' && (
                  <div className="repo-list">
                    {data.repos.length === 0 ? (
                      <div className="empty-panel">No public repositories</div>
                    ) : (
                      data.repos.map((r) => (
                        <a
                          key={r.full_name}
                          href={r.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="repo-card"
                        >
                          <div className="repo-name">{r.name}</div>
                          {r.description && <div className="repo-desc">{r.description}</div>}
                          <div className="repo-meta">
                            {r.language && <span>{r.language}</span>}
                            <span>{r.stargazers_count} stars</span>
                            <span>{r.forks_count} forks</span>
                            {r.fork && <span className="tag">fork</span>}
                            {r.archived && <span className="tag">archived</span>}
                          </div>
                        </a>
                      ))
                    )}
                  </div>
                )}

                {tab === 'orgs' && (
                  <div className="simple-list">
                    {data.orgs.length === 0 ? (
                      <div className="empty-panel">No public organizations</div>
                    ) : (
                      data.orgs.map((o) => (
                        <a
                          key={o.login}
                          href={o.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="simple-row"
                        >
                          <span>{o.login}</span>
                          {o.description && <span className="muted">{o.description}</span>}
                        </a>
                      ))
                    )}
                  </div>
                )}

                {tab === 'gists' && (
                  <div className="simple-list">
                    {data.gists.length === 0 ? (
                      <div className="empty-panel">No public gists</div>
                    ) : (
                      data.gists.map((g) => (
                        <a
                          key={g.id}
                          href={g.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="simple-row"
                        >
                          <span>{g.description || g.files.join(', ') || g.id}</span>
                        </a>
                      ))
                    )}
                  </div>
                )}

                {tab === 'activity' && (
                  <div className="activity-list">
                    {data.recentActivity.length === 0 ? (
                      <div className="empty-panel">No recent public activity</div>
                    ) : (
                      data.recentActivity.map((a, i) => (
                        <div key={i} className="activity-row">
                          <span className="act-type">{a.type.replace('Event', '')}</span>
                          {a.repo && <span className="act-repo">{a.repo}</span>}
                          {a.payload_summary && (
                            <span className="muted">{a.payload_summary}</span>
                          )}
                          <span className="act-time">
                            {new Date(a.created_at).toLocaleString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="rate-line">
                Rate remaining: {data.rateLimit?.remaining ?? '—'}
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          background: #000;
          color: #eee;
          min-height: 100vh;
        }
        a { color: #aaa; text-decoration: none; }
        a:hover { color: #fff; }
        button { font-family: inherit; }
      `}</style>

      <style jsx>{`
        .app {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          width: 240px;
          background: rgba(5,5,5,.96);
          border-right: 1px solid #1b1b1b;
          display: flex;
          flex-direction: column;
          transition: width 0.2s ease;
          flex-shrink: 0;
        }
        .sidebar-collapsed .sidebar {
          width: 0;
          overflow: hidden;
          border: none;
        }
        .sidebar-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 16px;
          border-bottom: 1px solid #191919;
        }
        .logo {
          font-weight: 900;
          letter-spacing: 0.16em;
          font-size: 14px;
          color: #fff;
        }
        .sidebar-nav { flex: 1; padding: 12px 10px; }
        .nav-section {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          color: #444;
          padding: 8px 10px 6px;
          font-weight: 800;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 11px;
          width: 100%;
          padding: 11px 12px;
          border: 1px solid #222;
          background: #0b0b0b;
          color: #eee;
          border-radius: 10px;
          cursor: pointer;
          font-size: 13px;
          text-align: left;
          margin-bottom: 8px;
        }
        .nav-item:hover { border-color: #333; }
        .nav-item.active { border-color: #444; background: #111; }
        .nav-item.disabled { opacity: 0.35; cursor: not-allowed; }
        .sidebar-foot {
          padding: 16px;
          border-top: 1px solid #191919;
          font-size: 9px;
          color: #444;
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          background: #000;
        }
        .topbar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border-bottom: 1px solid #1b1b1b;
          background: #050505;
        }
        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border: 1px solid #242424;
          background: #090909;
          color: #aaa;
          border-radius: 9px;
          cursor: pointer;
        }
        .icon-btn:hover { color: #fff; border-color: #333; }

        .search {
          display: flex;
          align-items: center;
          flex: 1;
          max-width: 520px;
          background: #070707;
          border: 1px solid #252525;
          border-radius: 13px;
          overflow: hidden;
          padding: 4px;
          gap: 4px;
        }
        .search-icon {
          padding: 0 10px;
          color: #444;
          display: flex;
        }
        .search input {
          flex: 1;
          border: none;
          background: #030303;
          color: #fff;
          padding: 11px 12px;
          font-size: 14px;
          outline: none;
          border-radius: 9px;
          font-family: inherit;
        }
        .search button {
          border: 1px solid #444;
          background: #f2f2f2;
          color: #000;
          padding: 11px 18px;
          font-size: 11px;
          font-weight: 900;
          cursor: pointer;
          border-radius: 9px;
          font-family: inherit;
        }
        .search button:hover:not(:disabled) { background: #fff; }
        .search button:disabled { opacity: 0.4; cursor: not-allowed; }

        .banner.error {
          margin: 16px 20px 0;
          padding: 11px;
          background: #100606;
          border: 1px solid #3a1717;
          color: #ff9b9b;
          border-radius: 9px;
          font-size: 11px;
        }

        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #444;
        }
        .empty-icon { opacity: 0.3; }
        .empty-state h2 { color: #eee; font-size: 16px; font-weight: 800; }
        .empty-state p { font-size: 12px; }
        .spinner {
          width: 22px;
          height: 22px;
          border: 2px solid #222;
          border-top-color: #666;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 820px;
        }

        .profile-strip {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #050505;
          border: 1px solid #242424;
          border-radius: 13px;
          padding: 16px 18px;
          flex-wrap: wrap;
        }
        .avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid #333;
          background: #111;
        }
        .identity { min-width: 100px; }
        .name { font-weight: 800; font-size: 16px; color: #eee; }
        .handle { font-size: 10px; color: #666; margin-top: 3px; }
        .stats {
          display: flex;
          gap: 20px;
          margin-left: auto;
        }
        .stat { text-align: left; }
        .stat-label {
          display: block;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          color: #555;
          font-weight: 800;
          margin-bottom: 4px;
        }
        .stat-value { font-size: 14px; font-weight: 800; color: #eee; }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border: 1px solid #333;
          border-radius: 9px;
          font-size: 10px;
          color: #ccc;
          background: transparent;
        }
        .btn-outline:hover { border-color: #555; color: #fff; }

        .tabs {
          display: flex;
          gap: 4px;
          background: #050505;
          border: 1px solid #242424;
          border-radius: 12px;
          padding: 4px;
          overflow-x: auto;
        }
        .tab {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 12px;
          border: none;
          background: transparent;
          color: #555;
          border-radius: 8px;
          font-size: 11px;
          cursor: pointer;
          white-space: nowrap;
          font-family: inherit;
        }
        .tab:hover { color: #aaa; background: #0b0b0b; }
        .tab.active {
          background: #111;
          color: #eee;
          border: 1px solid #333;
        }
        .badge {
          background: #1a1a1a;
          color: #777;
          font-size: 10px;
          padding: 1px 6px;
          border-radius: 8px;
          font-weight: 700;
        }

        .panel {
          background: #050505;
          border: 1px solid #242424;
          border-radius: 13px;
          padding: 16px;
          min-height: 180px;
        }

        .grid-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 1px;
          background: #202020;
        }
        .info-card {
          background: #050505;
          padding: 13px 15px;
          min-height: 63px;
        }
        .info-card.wide { grid-column: 1 / -1; }
        .info-label {
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          color: #555;
          font-weight: 800;
          margin-bottom: 6px;
        }
        .info-value {
          font-size: 11px;
          color: #eee;
          overflow-wrap: anywhere;
          line-height: 1.4;
        }

        /* ===== EXACT BLUR FROM REFERENCE ===== */
        .private-wrap {
          position: relative;
          display: inline-block;
          max-width: 100%;
          min-height: 18px;
        }
        .private-value {
          filter: blur(6px);
          user-select: none;
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
          overflow-wrap: anywhere;
        }
        .private-value.revealed {
          filter: none;
          user-select: text;
        }
        .reveal {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          border: 0 !important;
          background: transparent !important;
          color: #aaa !important;
          font-size: 8px !important;
          padding: 0 !important;
          font-family: inherit;
          cursor: pointer;
        }
        .reveal:hover { color: #fff !important; }

        .email-list { display: flex; flex-direction: column; gap: 7px; }
        .email-row {
          padding: 11px 12px;
          background: #070707;
          border: 1px solid #181818;
          border-radius: 9px;
        }
        .email-label {
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          color: #555;
          font-weight: 800;
          margin-bottom: 4px;
        }
        .authors { margin-top: 14px; }
        .section-title {
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          color: #555;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .author-row { margin-bottom: 7px; }

        .repo-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 8px;
        }
        .repo-card {
          display: block;
          background: #070707;
          border: 1px solid #181818;
          border-radius: 9px;
          padding: 12px;
        }
        .repo-card:hover { border-color: #333; }
        .repo-name { font-weight: 700; font-size: 12px; color: #eee; }
        .repo-desc {
          font-size: 10px;
          color: #555;
          margin: 5px 0;
          line-height: 1.35;
        }
        .repo-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 10px;
          color: #444;
        }
        .tag {
          background: #111;
          padding: 1px 5px;
          border-radius: 4px;
          font-size: 9px;
        }

        .simple-list { display: flex; flex-direction: column; gap: 6px; }
        .simple-row {
          display: flex;
          gap: 10px;
          padding: 11px 12px;
          background: #070707;
          border: 1px solid #181818;
          border-radius: 9px;
          font-size: 11px;
        }
        .simple-row:hover { border-color: #333; }

        .activity-list { display: flex; flex-direction: column; gap: 2px; }
        .activity-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          border-bottom: 1px solid #141414;
          font-size: 11px;
        }
        .act-type {
          min-width: 70px;
          color: #777;
          font-weight: 700;
        }
        .act-repo { color: #eee; }
        .act-time {
          margin-left: auto;
          color: #444;
          font-size: 10px;
        }

        .empty-panel {
          text-align: center;
          color: #444;
          padding: 36px 16px;
          font-size: 11px;
        }
        .muted { color: #444; }
        .rate-line {
          text-align: center;
          font-size: 9px;
          color: #333;
        }

        @media (max-width: 700px) {
          .stats { margin-left: 0; width: 100%; justify-content: space-between; }
          .profile-strip { gap: 12px; }
        }
      `}</style>
    </>
  );
}