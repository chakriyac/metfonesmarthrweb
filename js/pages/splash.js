/* ─── Splash Page ─── */
Router.register('/', function renderSplash() {
  const page = el('div', { className: 'auth-screen fade-in' });
  page.innerHTML = `
    <div class="bg-rings"><span></span><span></span><span></span></div>
    <div class="bg-orb bg-orb-1"></div>
    <div class="bg-orb bg-orb-2"></div>

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
        Already have an account? <strong style="color:var(--teal)">Sign in</strong>
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
