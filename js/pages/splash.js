/* ─── Splash Page ─── */
Router.register('/', function renderSplash() {
  const page = el('div', { className: 'auth-screen fade-in' });
  page.innerHTML = `
    <div class="bg-rings"><span></span><span></span><span></span></div>
    <div class="bg-orb bg-orb-1"></div>
    <div class="bg-orb bg-orb-2"></div>
    <div class="bg-orb bg-orb-3"></div>

    <!-- Brand mesh pattern -->
    <svg class="auth-mesh" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ED1C24;stop-opacity:0.06"/>
          <stop offset="50%" style="stop-color:#E87C1E;stop-opacity:0.04"/>
          <stop offset="100%" style="stop-color:#00A79D;stop-opacity:0.05"/>
        </linearGradient>
      </defs>
      <g stroke="url(#meshGrad)" fill="none" stroke-width="0.8">
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

    <div class="auth-card" style="text-align:center;max-width:400px">
      <div class="auth-card-head">
        <div class="auth-card-logo">${logoHTML('md')}</div>
        <h1 style="font-size:30px">Metfone<br>Smart HR</h1>
        <p class="auth-sub" style="margin-top:4px">Your all-in-one recruitment &amp; team platform</p>
      </div>

      <button class="btn btn-dark" onclick="Router.navigate('/login')" style="width:100%;padding:15px;font-size:15px;font-weight:700;border-radius:var(--radius-pill);margin-bottom:14px">
        Get Started
      </button>

      <a href="#/login" style="font-size:13px;color:var(--text-tertiary)">
        Already have an account? <strong style="color:var(--red)">Sign in</strong>
      </a>

      <div style="display:flex;justify-content:center;gap:20px;margin-top:28px">
        <span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-tertiary)"><span style="width:6px;height:6px;border-radius:50%;background:var(--teal);display:inline-block"></span> Secure OTP</span>
        <span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-tertiary)"><span style="width:6px;height:6px;border-radius:50%;background:var(--green);display:inline-block"></span> Encrypted</span>
      </div>
    </div>`;

  const timer = setTimeout(function() { Router.navigate('/login'); }, 3000);
  page.addEventListener('click', function(e) {
    if (e.target.closest('.btn-dark') || e.target.closest('a')) clearTimeout(timer);
  });

  return page;
});
