# GitHub OSINT

Vercel-deployable public intelligence tool for any GitHub user.

Uses a **classic Personal Access Token** to pull:

- Full public profile
- Emails (from public PushEvents + noreply patterns)
- Commit author identities
- All public repositories
- Organizations
- Public gists
- Recent activity stream

## Quick Start (Local)

```bash
git clone https://github.com/unemployedz/repo.git
cd repo
npm install
cp .env.example .env.local
# edit .env.local and paste your classic token
npm run dev
```

Open http://localhost:3000

## Classic Token

1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Scopes: `public_repo`, `read:user` (optional: `read:org`)
4. Copy → paste into `.env.local` as `GITHUB_TOKEN=ghp_...`

## Deploy to Vercel

1. Import the repo on vercel.com
2. Add Environment Variable:
   - Key: `GITHUB_TOKEN`
   - Value: your classic token
3. Deploy

That's it. The `/api/osint` route runs server-side so the token never hits the browser.

## API

```
POST /api/osint
Body: { "username": "target" }
```

Returns structured JSON with profile, emails, repos, orgs, gists, activity.

## Notes

- Only public data is collected.
- Rate limits are higher with a token (5k/hr vs 60/hr unauthenticated).
- Emails come from commit metadata in public events + standard noreply formats.
- No scraping, pure official API.

Built for speed. Deploy and gather.