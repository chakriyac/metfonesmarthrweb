/* ─── Login Phone Page ─── */
Router.register('/login/phone', function renderLoginPhone() {
  const page = el('div', { className: 'auth-screen fade-in' });
  page.innerHTML = `
    <div class="bg-rings"><span></span><span></span><span></span></div>
    <div class="bg-orb bg-orb-1"></div>
    <div class="bg-orb bg-orb-2"></div>

    <div class="auth-card">
      <!-- Back -->
      <button class="btn-glass" onclick="Router.navigate('/login')" style="position:absolute;top:16px;left:16px;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;padding:0">←</button>

      <div class="auth-card-head">
        <div class="auth-card-logo">${logoHTML('sm')}</div>
        <h1 style="font-size:24px">Enter your<br>Phone Number</h1>
        <p class="auth-sub">We'll send a one-time code to your Metfone number.</p>
      </div>

      <div class="input-group">
        <label>Country</label>
        <div style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.5);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.5);border-radius:16px;padding:14px 16px">
          <span style="font-size:16px">🇰🇭</span>
          <span style="font-size:14px;font-weight:500">Cambodia</span>
          <span style="font-size:14px;color:var(--text-tertiary);margin-left:auto">+855</span>
        </div>
      </div>

      <div class="input-group">
        <label>Phone Number</label>
        <input type="tel" placeholder="Enter your number">
      </div>

      <p style="font-size:11px;color:var(--text-tertiary);line-height:1.5;margin-bottom:20px">
        By continuing, you agree to our <a href="#" style="color:var(--text-secondary);text-decoration:underline">Terms</a> &amp; <a href="#" style="color:var(--text-secondary);text-decoration:underline">Privacy</a>
      </p>

      <div style="display:flex;gap:16px;margin-bottom:20px">
        <span style="display:flex;align-items:center;gap:4px;font-size:11px;color:var(--teal)">🔒 Encrypted</span>
        <span style="display:flex;align-items:center;gap:4px;font-size:11px;color:var(--red)">🔐 Secure</span>
      </div>

      <button class="btn btn-dark" style="width:100%;padding:14px;border-radius:var(--radius-pill);margin-bottom:16px" onclick="Router.navigate('/home')">Send OTP</button>

      <div class="divider-text"><span>or sign in with</span></div>

      <div style="display:flex;gap:12px;justify-content:center;margin-top:14px;margin-bottom:12px">
        <button class="btn-social">
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2a10.34 10.34 0 00-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92A8.78 8.78 0 0017.64 9.2z" fill="#4285F4"/><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 009 18z" fill="#34A853"/><path d="M3.96 10.71A5.41 5.41 0 013.68 9c0-.6.1-1.17.28-1.71V4.96H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.04l3-2.33z" fill="#FBBC05"/><path d="M9 3.58a4.86 4.86 0 013.44 1.35l2.58-2.59A8.65 8.65 0 009 0 9 9 0 00.96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/></svg>
          Google
        </button>
        <button class="btn-social">
          <svg width="18" height="18" viewBox="0 0 18 18"><rect width="18" height="18" rx="2" fill="#0A66C2"/><path d="M4.7 7.3h1.8v5.4H4.7V7.3zm.9-2.8a1 1 0 110 2 1 1 0 010-2zm2.7 2.8h1.7v.7h.03a1.9 1.9 0 011.7-1c1.8 0 2.2 1.2 2.2 2.8v3.1h-1.8V10c0-.7 0-1.6-1-1.6s-1.1.8-1.1 1.5v2.8H8.3V7.3z" fill="#fff"/></svg>
          LinkedIn
        </button>
      </div>

      <p style="text-align:center"><a href="#/login" style="font-size:13px;color:var(--text-tertiary);text-decoration:underline">Use another sign in method</a></p>
    </div>`;
  return page;
});
