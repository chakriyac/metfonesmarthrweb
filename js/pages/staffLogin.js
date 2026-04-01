/* ─── Staff Login Page ─── */
Router.register('/login/staff', function renderStaffLogin() {
  const page = el('div', { className: 'auth-screen fade-in' });
  page.innerHTML = `
    <div class="bg-rings"><span></span><span></span><span></span></div>
    <div class="bg-orb bg-orb-1"></div>
    <div class="bg-orb bg-orb-2"></div>

    <div class="auth-card">
      <!-- Back -->
      <button class="btn-glass" onclick="Router.navigate('/login')" style="position:absolute;top:16px;left:16px;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;padding:0">←</button>

      <div class="auth-card-head">
        <div class="auth-card-logo">
          <svg width="28" height="28" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="20" r="10" fill="rgba(0,0,0,0.12)"/><path d="M10 48c0-10 8-18 18-18s18 8 18 18" fill="rgba(0,0,0,0.08)"/></svg>
        </div>
        <h1 style="font-size:24px">Metfone Staff</h1>
        <p class="auth-sub">Use your staff credentials to sign in</p>
      </div>

      <div class="input-group">
        <label>Staff ID / Email</label>
        <input type="email" placeholder="hr.staff@metfone.com.kh">
      </div>

      <div class="input-group" style="position:relative">
        <label>Password</label>
        <input type="password" placeholder="••••••••">
        <button style="position:absolute;right:16px;top:32px;font-size:14px;color:var(--text-placeholder);background:none;border:none;cursor:pointer" onclick="
          var inp = this.previousElementSibling;
          inp.type = inp.type === 'password' ? 'text' : 'password';
          this.textContent = inp.type === 'password' ? '👁' : '🙈';
        ">👁</button>
      </div>

      <button class="btn btn-dark" style="width:100%;padding:14px;border-radius:var(--radius-pill);margin-top:8px;margin-bottom:20px" onclick="
        var sel = sessionStorage.getItem('loginRole') || 'hr';
        if(sel==='employee') Router.navigate('/employee/dashboard');
        else if(sel==='manager') Router.navigate('/employee/dashboard');
        else Router.navigate('/hr/dashboard');
      ">Sign In</button>

      <p style="text-align:center"><a href="#" style="font-size:13px;color:var(--teal);text-decoration:underline">Need access? Contact HR admin</a></p>
    </div>`;
  return page;
});
