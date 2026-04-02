/* ─── Staff Profile Page (Employee) ─── */
Router.register('/employee/profile', function renderStaffProfile() {
  const page = el('div', { className: 'app-layout fade-in' });
  const role = sessionStorage.getItem('loginRole');
  page.appendChild(role === 'manager' ? managerSidebar('/employee/profile') : employeeSidebar('/employee/profile'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <!-- Hero -->
        <div class="hero-card" style="margin-bottom:24px;display:flex;align-items:center;gap:20px">
          <div class="avatar avatar-xl" style="background:#F0F9F8;color:#00A79D;font-weight:700;font-size:22px;position:relative">
            VN
            <span style="position:absolute;bottom:2px;right:2px;width:12px;height:12px;border-radius:50%;background:var(--green);border:2px solid white"></span>
            <div style="position:absolute;bottom:-4px;right:-4px;width:24px;height:24px;border-radius:50%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);display:flex;align-items:center;justify-content:center;font-size:12px;cursor:pointer">📷</div>
          </div>
          <div style="flex:1">
            <h2 style="font-family:var(--font-display);font-size:22px;font-weight:800;margin-bottom:2px">Vanna Nob</h2>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">HR Department · Metfone HQ</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              <span class="badge badge-green">● Online</span>
              <span class="badge badge-teal">Staff</span>
              <span class="badge badge-gray">ID: MF-0087</span>
            </div>
          </div>
        </div>

        <!-- Quick Action Pills -->
        <div style="display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap">
          ${['💬 Message', '📞 Call', '📹 Video', '✅ Check In'].map(a =>
            `<button class="btn-glass" style="font-size:12px">${a}</button>`
          ).join('')}
        </div>

        <!-- Stats -->
        <div class="stats-row" style="margin-bottom:24px">
          <div class="stat-card"><div class="number" style="color:var(--teal)">160h</div><div class="label">Hours</div></div>
          <div class="stat-card"><div class="number" style="color:var(--teal)">22</div><div class="label">Present</div></div>
          <div class="stat-card"><div class="number" style="color:var(--orange)">3 yrs</div><div class="label">Tenure</div></div>
          <div class="stat-card"><div class="number" style="color:var(--red)">4.8</div><div class="label">Rating</div></div>
        </div>

        <!-- Contact Info -->
        <div class="profile-section">
          <h3 class="section-label">CONTACT INFORMATION</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
            ${[
              { icon: '📱', label: 'Phone', value: '+855 12 776 889' },
              { icon: '✉️', label: 'Email', value: 'vanna.n@metfone.com.kh' },
              { icon: '📍', label: 'Office', value: 'Metfone Tower, Floor 3' },
              { icon: '🆔', label: 'Staff Code', value: 'MF-0087' },
            ].map(c => `
              <div style="display:flex;gap:10px;align-items:start">
                <span style="font-size:16px">${c.icon}</span>
                <div>
                  <p style="font-size:11px;color:var(--text-tertiary)">${c.label}</p>
                  <p style="font-size:13px;font-weight:500">${c.value}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Department -->
        <div class="profile-section">
          <h3 class="section-label">DEPARTMENT & ROLE</h3>
          <div style="display:flex;gap:14px;align-items:center">
            <div style="width:40px;height:40px;border-radius:10px;background:var(--red-bg);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              ${logoHTML('sm')}
            </div>
            <div>
              <p style="font-size:14px;font-weight:600">HR Department</p>
              <p style="font-size:12px;color:var(--text-tertiary)">Administrative Officer · Joined Jan 2023</p>
            </div>
          </div>
        </div>

        <!-- This Month -->
        <div class="profile-section">
          <h3 class="section-label">THIS MONTH</h3>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
            <div class="card" style="text-align:center;padding:16px">
              <div style="font-size:20px;font-weight:800;color:var(--teal)">160h</div>
              <p style="font-size:11px;color:var(--text-tertiary)">Hours Worked</p>
            </div>
            <div class="card" style="text-align:center;padding:16px">
              <div style="font-size:20px;font-weight:800;color:var(--teal)">22</div>
              <p style="font-size:11px;color:var(--text-tertiary)">Present</p>
            </div>
            <div class="card" style="text-align:center;padding:16px">
              <div style="font-size:20px;font-weight:800;color:var(--orange)">1</div>
              <p style="font-size:11px;color:var(--text-tertiary)">Late</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-side">
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Quick Access</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            ${[
              { icon: '💰', label: 'Payslip', route: '/employee/payslip' },
              { icon: '🏖️', label: 'Leave', route: '/employee/leave' },
              { icon: '📅', label: 'History', route: '/employee/attendance' },
              { icon: '📊', label: 'Reports', route: '/employee/dashboard' },
            ].map(q => `
              <div class="quick-action" onclick="Router.navigate('${q.route}')" style="padding:14px;text-align:center">
                <div style="font-size:20px;margin-bottom:4px">${q.icon}</div>
                <div style="font-size:12px;font-weight:600">${q.label}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Settings</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${[
              { icon: '🔔', label: 'Notifications', desc: 'Push & email alerts' },
              { icon: '🔒', label: 'Privacy', desc: 'Profile visibility' },
              { icon: '🌐', label: 'Language', desc: 'English (US)' },
              { icon: '❓', label: 'Help & Support', desc: 'FAQ & contact' },
            ].map(s => `
              <div style="display:flex;align-items:center;gap:12px;padding:8px 0;cursor:pointer">
                <span style="font-size:16px">${s.icon}</span>
                <div style="flex:1">
                  <p style="font-size:13px;font-weight:500">${s.label}</p>
                  <p style="font-size:11px;color:var(--text-tertiary)">${s.desc}</p>
                </div>
                <span style="font-size:12px;color:var(--text-tertiary)">→</span>
              </div>
            `).join('')}
            <div style="border-top:1px solid var(--border);margin-top:8px;padding-top:12px">
              <button class="btn-outline-red" style="width:100%" onclick="logout()">🚪 Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
