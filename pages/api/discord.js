export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;
  if (!token || typeof token !== 'string' || token.trim().length < 20) {
    return res.status(400).json({ error: 'Valid Discord user token required' });
  }

  const clean = token.trim().replace(/^Bearer\s+/i, '');

  const headers = {
    Authorization: clean,
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  };

  try {
    // /users/@me — basic profile + email + phone (if present on account)
    const meRes = await fetch('https://discord.com/api/v9/users/@me', { headers });
    if (!meRes.ok) {
      const err = await meRes.json().catch(() => ({}));
      const msg = err.message || `Discord API ${meRes.status}`;
      if (meRes.status === 401) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }
      return res.status(meRes.status).json({ error: msg });
    }
    const me = await meRes.json();

    // format phone: keep digits, insert dashes
    function formatPhone(raw) {
      if (!raw) return null;
      const digits = String(raw).replace(/\D/g, '');
      if (digits.length === 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
      }
      if (digits.length === 11 && digits.startsWith('1')) {
        return `+1-${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
      }
      // fallback: group remaining
      if (digits.length > 6) {
        return `${digits.slice(0, digits.length - 6)}-${digits.slice(-6, -3)}-${digits.slice(-3)}`;
      }
      return raw;
    }

    // optional: guilds count
    let guilds = [];
    try {
      const gRes = await fetch('https://discord.com/api/v9/users/@me/guilds', { headers });
      if (gRes.ok) guilds = await gRes.json();
    } catch {}

    // optional: billing / payment sources (sometimes exposes more)
    let billing = null;
    try {
      const bRes = await fetch('https://discord.com/api/v9/users/@me/billing/payment-sources', { headers });
      if (bRes.ok) billing = await bRes.json();
    } catch {}

    const result = {
      id: me.id,
      username: me.username,
      global_name: me.global_name || null,
      discriminator: me.discriminator,
      email: me.email || null,
      phone: formatPhone(me.phone),
      phone_raw: me.phone || null,
      verified: me.verified,
      mfa_enabled: me.mfa_enabled,
      premium_type: me.premium_type, // 0 none, 1 nitro classic, 2 nitro, 3 nitro basic
      flags: me.flags,
      public_flags: me.public_flags,
      avatar: me.avatar
        ? `https://cdn.discordapp.com/avatars/${me.id}/${me.avatar}.png?size=128`
        : null,
      banner: me.banner
        ? `https://cdn.discordapp.com/banners/${me.id}/${me.banner}.png?size=480`
        : null,
      locale: me.locale,
      nsfw_allowed: me.nsfw_allowed,
      guild_count: Array.isArray(guilds) ? guilds.length : 0,
      payment_sources: Array.isArray(billing) ? billing.length : 0,
    };

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
}