/* ─── Login Select Page ─── */
Router.register('/login', function renderLoginSelect() {
  const page = el('div', { className: 'auth-screen fade-in' });
  page.innerHTML = `
    <div class="bg-rings"><span></span><span></span><span></span></div>
    <div class="bg-orb bg-orb-1"></div>
    <div class="bg-orb bg-orb-2"></div>
    <div class="bg-orb bg-orb-3"></div>

    <!-- Brand mesh pattern -->
    <svg class="auth-mesh" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="meshGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ED1C24;stop-opacity:0.06"/>
          <stop offset="50%" style="stop-color:#E87C1E;stop-opacity:0.04"/>
          <stop offset="100%" style="stop-color:#00A79D;stop-opacity:0.05"/>
        </linearGradient>
      </defs>
      <g stroke="url(#meshGrad2)" fill="none" stroke-width="0.8">
        <path d="M100,200 Q200,100 350,180 T600,150" class="mesh-line ml-1"/>
        <path d="M50,400 Q250,300 400,380 T750,350" class="mesh-line ml-2"/>
        <path d="M150,600 Q300,500 500,560 T780,520" class="mesh-line ml-3"/>
        <path d="M0,300 Q150,200 300,280 T650,250" class="mesh-line ml-4"/>
        <path d="M200,700 Q400,620 550,680 T800,650" class="mesh-line ml-5"/>
        <circle cx="350" cy="180" r="3" fill="rgba(237,28,36,0.08)" class="mesh-dot md-1"/>
        <circle cx="400" cy="380" r="2.5" fill="rgba(0,167,157,0.07)" class="mesh-dot md-2"/>
        <circle cx="500" cy="560" r="3" fill="rgba(232,124,30,0.06)" class="mesh-dot md-3"/>
        <circle cx="300" cy="280" r="2" fill="rgba(237,28,36,0.05)" class="mesh-dot md-4"/>
        <circle cx="600" cy="150" r="2.5" fill="rgba(0,167,157,0.06)" class="mesh-dot md-5"/>
        <circle cx="550" cy="680" r="2" fill="rgba(232,124,30,0.05)" class="mesh-dot md-6"/>
      </g>
    </svg>

    <div class="auth-card">
      <div class="auth-card-head">
        <div class="auth-card-logo">${logoHTML('sm')}</div>
        <h1>Sign In</h1>
        <p class="auth-sub">Choose your role to continue</p>
      </div>

      <!-- 2×2 Role grid -->
      <div class="role-grid" id="role-grid" style="margin-bottom:24px">
        <div class="role-tile active" data-role="seeker">
          <span class="tile-icon" style="background:rgba(237,28,36,0.08)">👤</span>
          <span class="tile-name">Job Seeker</span>
          <span class="tile-desc">Find &amp; apply for jobs</span>
          <span class="tile-dot"></span>
        </div>
        <div class="role-tile" data-role="employee">
          <span class="tile-icon" style="background:rgba(0,167,157,0.08)">🏢</span>
          <span class="tile-name">Employee</span>
          <span class="tile-desc">Check-in, leave &amp; payslip</span>
          <span class="tile-dot"></span>
        </div>
        <div class="role-tile" data-role="manager">
          <span class="tile-icon" style="background:rgba(232,124,30,0.08)">📊</span>
          <span class="tile-name">Manager</span>
          <span class="tile-desc">Approvals &amp; team oversight</span>
          <span class="tile-dot"></span>
        </div>
        <div class="role-tile" data-role="hr">
          <span class="tile-icon" style="background:linear-gradient(135deg,rgba(237,28,36,0.08),rgba(0,167,157,0.08))">🛡️</span>
          <span class="tile-name">HR Admin</span>
          <span class="tile-desc">Recruitment &amp; management</span>
          <span class="tile-dot"></span>
        </div>
      </div>

      <!-- Continue -->
      <button class="btn btn-dark" id="continue-btn" style="width:100%;padding:14px;font-size:15px;font-weight:700;border-radius:var(--radius-pill);margin-bottom:20px">
        Continue
      </button>

      <!-- Divider -->
      <div class="divider-text"><span>or continue with</span></div>

      <!-- Social -->
      <div style="display:flex;gap:10px;margin-top:16px">
        <button class="btn-social" style="flex:1">
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2a10.34 10.34 0 00-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92A8.78 8.78 0 0017.64 9.2z" fill="#4285F4"/><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 009 18z" fill="#34A853"/><path d="M3.96 10.71A5.41 5.41 0 013.68 9c0-.6.1-1.17.28-1.71V4.96H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.04l3-2.33z" fill="#FBBC05"/><path d="M9 3.58a4.86 4.86 0 013.44 1.35l2.58-2.59A8.65 8.65 0 009 0 9 9 0 00.96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/></svg>
          Google
        </button>
        <button class="btn-social" style="flex:1">
          <svg width="18" height="18" viewBox="0 0 18 18"><rect width="18" height="18" rx="2" fill="#0A66C2"/><path d="M4.7 7.3h1.8v5.4H4.7V7.3zm.9-2.8a1 1 0 110 2 1 1 0 010-2zm2.7 2.8h1.7v.7h.03a1.9 1.9 0 011.7-1c1.8 0 2.2 1.2 2.2 2.8v3.1h-1.8V10c0-.7 0-1.6-1-1.6s-1.1.8-1.1 1.5v2.8H8.3V7.3z" fill="#fff"/></svg>
          LinkedIn
        </button>
        <button class="btn-social" style="flex:1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          Biometrics
        </button>
      </div>
    </div>`;

  setTimeout(() => {
    const tiles = page.querySelectorAll('.role-tile');
    tiles.forEach(t => {
      t.addEventListener('click', () => {
        tiles.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
      });
    });
    page.querySelector('#continue-btn').addEventListener('click', () => {
      const sel = page.querySelector('.role-tile.active');
      if (sel) {
        const r = sel.dataset.role;
        sessionStorage.setItem('loginRole', r);
        Router.navigate(r === 'seeker' ? '/login/phone' : '/login/staff');
      }
    });
  });

  return page;
});
