/* ─── Staff Login Page ─── */
Router.register('/login/staff', function renderStaffLogin() {
  const page = el('div', { className: 'auth-screen fade-in' });
  page.innerHTML = `
    <div class="bg-rings"><span></span><span></span><span></span></div>
    <div class="bg-orb bg-orb-1"></div>
    <div class="bg-orb bg-orb-2"></div>
    <div class="bg-orb bg-orb-3"></div>

    <svg class="auth-mesh" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <g stroke="rgba(237,28,36,0.05)" fill="none" stroke-width="0.8">
        <path d="M100,200 Q200,100 350,180 T600,150" class="mesh-line ml-1"/>
        <path d="M50,400 Q250,300 400,380 T750,350" class="mesh-line ml-2"/>
        <path d="M150,600 Q300,500 500,560 T780,520" class="mesh-line ml-3"/>
        <circle cx="350" cy="180" r="3" fill="rgba(237,28,36,0.06)" class="mesh-dot md-1"/>
        <circle cx="400" cy="380" r="2.5" fill="rgba(0,167,157,0.05)" class="mesh-dot md-2"/>
        <circle cx="500" cy="560" r="3" fill="rgba(232,124,30,0.05)" class="mesh-dot md-3"/>
      </g>
    </svg>

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

      <button class="btn btn-dark" id="staff-signin-btn" style="width:100%;padding:14px;border-radius:var(--radius-pill);margin-top:8px;margin-bottom:16px" onclick="
        var sel = sessionStorage.getItem('loginRole') || 'hr';
        if(sel==='employee') Router.navigate('/employee/dashboard');
        else if(sel==='manager') Router.navigate('/employee/dashboard');
        else Router.navigate('/hr/dashboard');
      ">Sign In</button>

      <!-- Divider -->
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <div style="flex:1;height:1px;background:var(--glass-border)"></div>
        <span style="font-size:11px;color:var(--text-tertiary);font-weight:600;white-space:nowrap">or continue with</span>
        <div style="flex:1;height:1px;background:var(--glass-border)"></div>
      </div>

      <!-- SSO Buttons -->
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px">
        <!-- Metfone SSO -->
        <button class="sso-btn" id="sso-metfone" style="width:100%;padding:12px 16px;border-radius:14px;border:1.5px solid rgba(237,28,36,0.15);background:rgba(237,28,36,0.03);cursor:pointer;display:flex;align-items:center;gap:12px;transition:all 0.2s;font-family:inherit">
          <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#ED1C24,#BE1E2D);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <span style="color:#fff;font-size:11px;font-weight:800;letter-spacing:-0.5px">M</span>
          </div>
          <div style="flex:1;text-align:left">
            <p style="font-size:12px;font-weight:700;color:var(--black)">Metfone Employee SSO</p>
            <p style="font-size:10px;color:var(--text-tertiary)">Sign in with your Metfone corporate account</p>
          </div>
          <span style="font-size:12px;color:var(--text-tertiary)">→</span>
        </button>

        <!-- Microsoft AD / Azure -->
        <button class="sso-btn" id="sso-microsoft" style="width:100%;padding:12px 16px;border-radius:14px;border:1.5px solid rgba(0,120,212,0.15);background:rgba(0,120,212,0.03);cursor:pointer;display:flex;align-items:center;gap:12px;transition:all 0.2s;font-family:inherit">
          <div style="width:32px;height:32px;border-radius:8px;background:#f3f3f3;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="18" height="18" viewBox="0 0 21 21"><rect x="1" y="1" width="9" height="9" fill="#F25022"/><rect x="11" y="1" width="9" height="9" fill="#7FBA00"/><rect x="1" y="11" width="9" height="9" fill="#00A4EF"/><rect x="11" y="11" width="9" height="9" fill="#FFB900"/></svg>
          </div>
          <div style="flex:1;text-align:left">
            <p style="font-size:12px;font-weight:700;color:var(--black)">Microsoft Active Directory</p>
            <p style="font-size:10px;color:var(--text-tertiary)">Azure AD / Entra ID corporate login</p>
          </div>
          <span style="font-size:12px;color:var(--text-tertiary)">→</span>
        </button>

        <!-- Google Workspace -->
        <button class="sso-btn" id="sso-google" style="width:100%;padding:12px 16px;border-radius:14px;border:1.5px solid rgba(66,133,244,0.15);background:rgba(66,133,244,0.03);cursor:pointer;display:flex;align-items:center;gap:12px;transition:all 0.2s;font-family:inherit">
          <div style="width:32px;height:32px;border-radius:8px;background:#fff;border:1px solid #e0e0e0;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          </div>
          <div style="flex:1;text-align:left">
            <p style="font-size:12px;font-weight:700;color:var(--black)">Google Workspace</p>
            <p style="font-size:10px;color:var(--text-tertiary)">Sign in with @metfone.com.kh account</p>
          </div>
          <span style="font-size:12px;color:var(--text-tertiary)">→</span>
        </button>
      </div>

      <p style="text-align:center"><a href="#" style="font-size:13px;color:var(--red);text-decoration:underline">Need access? Contact HR admin</a></p>
    </div>`;

  /* ── SSO Button Handlers ── */
  setTimeout(() => {
    const ssoMetfone = page.querySelector('#sso-metfone');
    const ssoMicrosoft = page.querySelector('#sso-microsoft');
    const ssoGoogle = page.querySelector('#sso-google');

    /* Hover effects */
    page.querySelectorAll('.sso-btn').forEach(btn => {
      btn.onmouseenter = () => { btn.style.transform = 'translateY(-1px)'; btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'; };
      btn.onmouseleave = () => { btn.style.transform = ''; btn.style.boxShadow = ''; };
    });

    function showSSOModal(provider, config) {
      const existing = document.getElementById('ssoModal');
      if (existing) existing.remove();

      const extraFieldHTML = config.extraField
        ? '<div style="margin-bottom:14px">' +
            '<label style="font-size:10px;font-weight:700;color:var(--text-tertiary);display:block;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px">' + config.extraField.label + '</label>' +
            '<select id="sso-domain-select" style="width:100%;padding:12px 14px;border:1.5px solid var(--glass-border);border-radius:14px;font-size:12px;background:var(--glass-bg)">' +
              config.extraField.options.map(function(o) { return '<option value="' + o.value + '"' + (o.selected ? ' selected' : '') + '>' + o.label + '</option>'; }).join('') +
            '</select>' +
          '</div>'
        : '';

      const overlay = document.createElement('div');
      overlay.id = 'ssoModal';
      overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);backdrop-filter:blur(6px);animation:fadeIn 0.3s ease';
      overlay.innerHTML =
        '<div style="width:420px;max-width:92vw;background:var(--card-bg,#fff);border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,0.18);overflow:hidden;animation:slideUp 0.35s cubic-bezier(0.25,0.1,0.25,1)">' +
          '<div style="padding:24px 24px 16px;text-align:center;border-bottom:1px solid var(--border);background:' + config.headerBg + '">' +
            '<div style="width:52px;height:52px;border-radius:14px;background:' + config.iconBg + ';display:flex;align-items:center;justify-content:center;margin:0 auto 12px">' + config.iconHTML + '</div>' +
            '<h3 style="font-size:16px;font-weight:700;margin-bottom:4px">' + config.title + '</h3>' +
            '<p style="font-size:11px;color:var(--text-tertiary)">' + config.subtitle + '</p>' +
          '</div>' +
          '<div style="padding:20px 24px">' +
            '<div style="margin-bottom:14px">' +
              '<label style="font-size:10px;font-weight:700;color:var(--text-tertiary);display:block;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px">' + config.fieldLabel + '</label>' +
              '<div style="position:relative">' +
                '<input id="sso-email-input" type="email" placeholder="' + config.placeholder + '" value="' + config.defaultValue + '" style="width:100%;padding:12px 14px 12px 40px;border:1.5px solid var(--glass-border);border-radius:14px;font-size:13px;background:var(--glass-bg);transition:border-color 0.2s">' +
                '<span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:14px;color:var(--text-tertiary)">' + config.fieldIcon + '</span>' +
              '</div>' +
            '</div>' +
            extraFieldHTML +
            '<div style="padding:12px 14px;border-radius:12px;background:rgba(0,167,157,0.04);border:1px solid rgba(0,167,157,0.1);margin-bottom:16px">' +
              '<p style="font-size:10px;font-weight:600;color:var(--teal);margin-bottom:6px">🔒 Secure Single Sign-On</p>' +
              '<p style="font-size:10px;color:var(--text-tertiary);line-height:1.5">' + config.securityNote + '</p>' +
            '</div>' +
            '<button id="sso-proceed" style="width:100%;padding:13px;border-radius:14px;border:none;background:' + config.btnBg + ';color:#fff;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 16px ' + config.btnShadow + ';transition:all 0.15s">' +
              config.btnIcon + ' Continue with ' + config.providerName +
            '</button>' +
          '</div>' +
          '<div style="padding:10px 24px 16px;text-align:center">' +
            '<button id="sso-cancel" style="background:none;border:none;font-size:12px;color:var(--text-tertiary);cursor:pointer;text-decoration:underline">Cancel — use email login instead</button>' +
          '</div>' +
        '</div>' +
        '<style>@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}</style>';

      document.body.appendChild(overlay);

      const closeSSO = () => { overlay.style.opacity='0'; overlay.style.transition='opacity 0.2s'; setTimeout(()=>overlay.remove(),200); };
      overlay.querySelector('#sso-cancel').onclick = closeSSO;
      overlay.onclick = (e) => { if (e.target === overlay) closeSSO(); };

      overlay.querySelector('#sso-proceed').onclick = () => {
        const email = overlay.querySelector('#sso-email-input').value.trim();
        if (!email) { overlay.querySelector('#sso-email-input').style.borderColor = 'var(--red)'; overlay.querySelector('#sso-email-input').focus(); return; }

        const btn = overlay.querySelector('#sso-proceed');
        btn.innerHTML = '<span style="display:inline-block;animation:spin 0.8s linear infinite">⏳</span> Authenticating…';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = '✅ Authenticated!';
          btn.style.background = 'var(--teal)';
          btn.style.opacity = '1';

          setTimeout(() => {
            closeSSO();
            var sel = sessionStorage.getItem('loginRole') || 'hr';
            if (sel === 'employee') Router.navigate('/employee/dashboard');
            else if (sel === 'manager') Router.navigate('/employee/dashboard');
            else Router.navigate('/hr/dashboard');
          }, 600);
        }, 1800);
      };

      /* Enter key */
      overlay.querySelector('#sso-email-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') overlay.querySelector('#sso-proceed').click();
      });

      setTimeout(() => overlay.querySelector('#sso-email-input').focus(), 350);
    }

    /* Metfone SSO */
    if (ssoMetfone) ssoMetfone.onclick = () => showSSOModal('metfone', {
      title: 'Metfone Employee SSO',
      subtitle: 'Single sign-on with your corporate Metfone account',
      headerBg: 'linear-gradient(135deg,rgba(237,28,36,0.04),rgba(190,30,45,0.02))',
      iconBg: 'linear-gradient(135deg,#ED1C24,#BE1E2D)',
      iconHTML: '<span style="color:#fff;font-size:18px;font-weight:800">M</span>',
      fieldLabel: 'Metfone Staff Email',
      fieldIcon: '👤',
      placeholder: 'your.name@metfone.com.kh',
      defaultValue: '',
      extraField: {
        label: 'Authentication Domain',
        options: [
          { value:'metfone.com.kh', label:'🏢 metfone.com.kh — Metfone Cambodia (HQ)', selected: true },
          { value:'viettel.com.vn', label:'🌐 viettel.com.vn — Viettel Group', selected: false },
          { value:'metfone-branch.com.kh', label:'📍 metfone-branch.com.kh — Branch Offices', selected: false },
        ]
      },
      securityNote: 'You will be authenticated through the Metfone Identity Provider (IdP). Your credentials are verified securely through SAML 2.0 protocol.',
      btnBg: 'linear-gradient(135deg,#ED1C24,#BE1E2D)',
      btnShadow: 'rgba(237,28,36,0.3)',
      btnIcon: '🔐',
      providerName: 'Metfone SSO',
    });

    /* Microsoft AD */
    if (ssoMicrosoft) ssoMicrosoft.onclick = () => showSSOModal('microsoft', {
      title: 'Microsoft Sign-In',
      subtitle: 'Sign in with your Azure Active Directory account',
      headerBg: 'linear-gradient(135deg,rgba(0,120,212,0.04),rgba(0,120,212,0.01))',
      iconBg: '#f3f3f3',
      iconHTML: '<svg width="24" height="24" viewBox="0 0 21 21"><rect x="1" y="1" width="9" height="9" fill="#F25022"/><rect x="11" y="1" width="9" height="9" fill="#7FBA00"/><rect x="1" y="11" width="9" height="9" fill="#00A4EF"/><rect x="11" y="11" width="9" height="9" fill="#FFB900"/></svg>',
      fieldLabel: 'Microsoft Work Account',
      fieldIcon: '📧',
      placeholder: 'your.name@metfone.onmicrosoft.com',
      defaultValue: '',
      extraField: null,
      securityNote: 'Authenticated via Microsoft Entra ID (formerly Azure AD). Multi-factor authentication (MFA) may be required by your organization policy.',
      btnBg: '#0078D4',
      btnShadow: 'rgba(0,120,212,0.3)',
      btnIcon: '<svg width="16" height="16" viewBox="0 0 21 21" style="vertical-align:middle"><rect x="1" y="1" width="9" height="9" fill="#fff"/><rect x="11" y="1" width="9" height="9" fill="rgba(255,255,255,0.8)"/><rect x="1" y="11" width="9" height="9" fill="rgba(255,255,255,0.8)"/><rect x="11" y="11" width="9" height="9" fill="rgba(255,255,255,0.6)"/></svg>',
      providerName: 'Microsoft',
    });

    /* Google Workspace */
    if (ssoGoogle) ssoGoogle.onclick = () => showSSOModal('google', {
      title: 'Google Workspace Sign-In',
      subtitle: 'Use your company Google account to sign in',
      headerBg: 'linear-gradient(135deg,rgba(66,133,244,0.04),rgba(66,133,244,0.01))',
      iconBg: '#fff',
      iconHTML: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>',
      fieldLabel: 'Google Workspace Email',
      fieldIcon: '📧',
      placeholder: 'your.name@metfone.com.kh',
      defaultValue: '',
      extraField: null,
      securityNote: 'Authenticated via Google OAuth 2.0. Your organization may require additional verification through Google Workspace admin policies.',
      btnBg: '#4285F4',
      btnShadow: 'rgba(66,133,244,0.3)',
      btnIcon: '🔑',
      providerName: 'Google',
    });
  });

  return page;
});