import { useState } from 'react';
import Head from 'next/head';

// simple SVG icons
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
  eye: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  eyeOff: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
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

function BlurReveal({ value }) {
  const [revealed, setRevealed] = useState(false);
  if (!value) return <span className="muted">—</span>;
  return (
    <button
      type="button"
      className={`blur-reveal ${revealed ? 'open' : ''}`}
      onClick={() => setRevealed((v) => !v)}
      title={revealed ? 'Hide' : 'Click to reveal'}
    >
      <span className="blur-text">{value}</span>
      <span className="blur-icon">{revealed ? Icon.eyeOff : Icon.eye}</span>
    </button>
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
        {/* SIDEBAR */}
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

        {/* MAIN */}
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
              {/* PROFILE STRIP — matches screenshot style */}
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

              {/* TABS */}
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

              {/* TAB PANELS */}
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
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background: #0a0a0b;
          color: #e4e4e7;
          min-height: 100vh;
        }
        a { color: #a1a1aa; text-decoration: none; }
        a:hover { color: #fff; }
        button { font-family: inherit; }
      `}</style>

      <style jsx>{`
        .app {
          display: flex;
          min-height: 100vh;
        }

        /* SIDEBAR */
        .sidebar {
          width: 240px;
          background: #111113;
          border-right: 1px solid #1f1f23;
          display: flex;
          flex-direction: column;
          transition: width 0.2s ease, margin 0.2s ease;
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
          border-bottom: 1px solid #1f1f23;
        }
        .logo {
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.08em;
          color: #fff;
        }
        .sidebar-nav {
          flex: 1;
          padding: 12px 10px;
        }
        .nav-section {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #52525b;
          padding: 8px 10px 6px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          border: none;
          background: transparent;
          color: #a1a1aa;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          text-align: left;
        }
        .nav-item:hover { background: #1a1a1e; color: #fff; }
        .nav-item.active {
          background: #1c1c21;
          color: #fff;
        }
        .nav-item.disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .sidebar-foot {
          padding: 14px 16px;
          border-top: 1px solid #1f1f23;
          font-size: 11px;
        }

        /* MAIN */
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .topbar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border-bottom: 1px solid #1f1f23;
          background: #0f0f11;
        }
        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: none;
          background: transparent;
          color: #a1a1aa;
          border-radius: 8px;
          cursor: pointer;
        }
        .icon-btn:hover { background: #1a1a1e; color: #fff; }

        .search {
          display: flex;
          align-items: center;
          flex: 1;
          max-width: 520px;
          background: #16161a;
          border: 1px solid #27272a;
          border-radius: 10px;
          overflow: hidden;
        }
        .search-icon {
          padding: 0 12px;
          color: #52525b;
          display: flex;
        }
        .search input {
          flex: 1;
          border: none;
          background: transparent;
          color: #fff;
          padding: 11px 0;
          font-size: 14px;
          outline: none;
        }
        .search button {
          border: none;
          background: #27272a;
          color: #fff;
          padding: 11px 18px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .search button:hover:not(:disabled) { background: #3f3f46; }
        .search button:disabled { opacity: 0.4; cursor: not-allowed; }

        .banner.error {
          margin: 16px 20px 0;
          padding: 12px 16px;
          background: #1c1010;
          border: 1px solid #7f1d1d;
          color: #fca5a5;
          border-radius: 8px;
          font-size: 13px;
        }

        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #52525b;
        }
        .empty-icon { opacity: 0.4; }
        .empty-state h2 { color: #e4e4e7; font-size: 20px; }
        .empty-state p { font-size: 14px; }
        .spinner {
          width: 28px;
          height: 28px;
          border: 2px solid #27272a;
          border-top-color: #a1a1aa;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* PROFILE STRIP */
        .profile-strip {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #111113;
          border: 1px solid #1f1f23;
          border-radius: 14px;
          padding: 16px 20px;
          flex-wrap: wrap;
        }
        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }
        .identity { min-width: 120px; }
        .name { font-weight: 600; font-size: 15px; color: #fff; }
        .handle { font-size: 13px; color: #71717a; margin-top: 2px; }
        .stats {
          display: flex;
          gap: 24px;
          margin-left: auto;
        }
        .stat { text-align: center; }
        .stat-label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #52525b;
          margin-bottom: 2px;
        }
        .stat-value { font-size: 16px; font-weight: 600; color: #fff; }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border: 1px solid #27272a;
          border-radius: 8px;
          font-size: 13px;
          color: #e4e4e7;
          background: transparent;
        }
        .btn-outline:hover { background: #1a1a1e; color: #fff; }

        /* TABS */
        .tabs {
          display: flex;
          gap: 4px;
          background: #111113;
          border: 1px solid #1f1f23;
          border-radius: 12px;
          padding: 4px;
          overflow-x: auto;
        }
        .tab {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 14px;
          border: none;
          background: transparent;
          color: #71717a;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
          white-space: nowrap;
        }
        .tab:hover { color: #e4e4e7; background: #1a1a1e; }
        .tab.active {
          background: #1c1c21;
          color: #fff;
        }
        .badge {
          background: #27272a;
          color: #a1a1aa;
          font-size: 11px;
          padding: 1px 6px;
          border-radius: 10px;
          font-weight: 600;
        }

        /* PANEL */
        .panel {
          background: #111113;
          border: 1px solid #1f1f23;
          border-radius: 14px;
          padding: 18px;
          min-height: 200px;
        }

        .grid-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
        }
        .info-card {
          background: #0a0a0b;
          border: 1px solid #1f1f23;
          border-radius: 10px;
          padding: 14px;
        }
        .info-card.wide { grid-column: 1 / -1; }
        .info-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #52525b;
          margin-bottom: 6px;
        }
        .info-value {
          font-size: 14px;
          color: #e4e4e7;
          word-break: break-word;
        }

        /* BLUR REVEAL */
        .blur-reveal {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #0a0a0b;
          border: 1px solid #1f1f23;
          border-radius: 8px;
          padding: 10px 14px;
          cursor: pointer;
          color: #e4e4e7;
          font-size: 14px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
          max-width: 100%;
        }
        .blur-reveal:hover { border-color: #3f3f46; }
        .blur-text {
          filter: blur(5px);
          user-select: none;
          transition: filter 0.2s;
        }
        .blur-reveal.open .blur-text {
          filter: none;
          user-select: text;
        }
        .blur-icon {
          display: flex;
          color: #71717a;
          flex-shrink: 0;
        }

        .email-list { display: flex; flex-direction: column; gap: 10px; }
        .email-row {
          background: #0a0a0b;
          border: 1px solid #1f1f23;
          border-radius: 10px;
          padding: 14px 16px;
        }
        .email-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #52525b;
          margin-bottom: 8px;
        }
        .authors { margin-top: 16px; }
        .section-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #52525b;
          margin-bottom: 10px;
        }
        .author-row { margin-bottom: 8px; }

        .repo-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 10px;
        }
        .repo-card {
          display: block;
          background: #0a0a0b;
          border: 1px solid #1f1f23;
          border-radius: 10px;
          padding: 14px;
          transition: border-color 0.15s;
        }
        .repo-card:hover { border-color: #3f3f46; }
        .repo-name { font-weight: 600; font-size: 14px; color: #fff; }
        .repo-desc {
          font-size: 12px;
          color: #71717a;
          margin: 6px 0;
          line-height: 1.35;
        }
        .repo-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 12px;
          color: #52525b;
        }
        .tag {
          background: #1c1c21;
          padding: 1px 6px;
          border-radius: 4px;
          font-size: 11px;
        }

        .simple-list { display: flex; flex-direction: column; gap: 6px; }
        .simple-row {
          display: flex;
          gap: 12px;
          padding: 12px 14px;
          background: #0a0a0b;
          border: 1px solid #1f1f23;
          border-radius: 8px;
          font-size: 13px;
        }
        .simple-row:hover { border-color: #3f3f46; }

        .activity-list { display: flex; flex-direction: column; gap: 4px; }
        .activity-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-bottom: 1px solid #1a1a1e;
          font-size: 13px;
        }
        .act-type {
          min-width: 80px;
          color: #a1a1aa;
          font-weight: 500;
        }
        .act-repo { color: #e4e4e7; }
        .act-time {
          margin-left: auto;
          color: #52525b;
          font-size: 12px;
        }

        .empty-panel {
          text-align: center;
          color: #52525b;
          padding: 40px 20px;
          font-size: 14px;
        }
        .muted { color: #52525b; }
        .rate-line {
          text-align: center;
          font-size: 12px;
          color: #3f3f46;
        }

        @media (max-width: 700px) {
          .stats { margin-left: 0; width: 100%; justify-content: space-around; }
          .profile-strip { gap: 12px; }
        }
      `}</style>
    </>
  );
}