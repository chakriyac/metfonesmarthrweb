/* ─── HR Officer Profile Page ─── */
Router.register('/hr/profile', function renderHrProfile() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/profile'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <!-- Hero -->
        <div class="hero-card" style="margin-bottom:24px;display:flex;align-items:center;gap:20px">
          <div class="avatar avatar-xl" style="background:#F0F9F8;color:#00A79D;font-weight:700;font-size:22px;position:relative">
            DS
            <span style="position:absolute;bottom:2px;right:2px;width:12px;height:12px;border-radius:50%;background:#34C759;border:2px solid white"></span>
          </div>
          <div style="flex:1">
            <h2 style="font-family:var(--font-display);font-size:22px;font-weight:800;margin-bottom:2px">Dara Samnang</h2>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:8px">HR Officer · Phnom Penh Branch</p>
            <div style="display:flex;gap:8px">
              <span class="badge badge-green">● Online</span>
              <span class="badge badge-teal">HR Team Lead</span>
            </div>
          </div>
        </div>

        <!-- Performance Stats -->
        <div class="stats-row" style="margin-bottom:24px">
          <div class="stat-card"><div class="number" style="color:var(--red)">48</div><div class="label">Reviews Done</div></div>
          <div class="stat-card"><div class="number" style="color:var(--teal)">23</div><div class="label">Hires Made</div></div>
          <div class="stat-card"><div class="number" style="color:var(--orange)">4.8</div><div class="label">Avg Rating</div></div>
          <div class="stat-card"><div class="number" style="color:var(--teal)">96%</div><div class="label">Completion</div></div>
        </div>

        <!-- Contact Info -->
        <div class="profile-section">
          <h3 class="section-label">CONTACT INFORMATION</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
            ${[
              { icon: '📱', label: 'Phone', value: '+855 77 888 999' },
              { icon: '✉️', label: 'Email', value: 'dara.s@metfone.com.kh' },
              { icon: '📍', label: 'Office', value: 'Metfone Tower, Floor 8' },
              { icon: '🆔', label: 'Employee ID', value: 'MF-HR-0042' },
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

        <!-- Responsibilities -->
        <div class="profile-section">
          <h3 class="section-label">RESPONSIBILITIES</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${[
              'Review and screen candidate applications',
              'Schedule and conduct interviews',
              'Manage recruitment pipeline for IT & HR departments',
              'Coordinate onboarding for new hires',
              'Generate weekly recruitment reports',
            ].map(r => `
              <div style="display:flex;gap:10px;align-items:center">
                <span style="width:24px;height:24px;border-radius:50%;background:var(--teal);color:white;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0">✓</span>
                <p style="font-size:13px;color:var(--text-secondary)">${r}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Skills -->
        <div class="profile-section">
          <h3 class="section-label">SKILLS & EXPERTISE</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${['Talent Acquisition', 'Interview Techniques', 'HR Management', 'Cambodian Labor Law', 'Employee Relations', 'HRIS Systems', 'Khmer (Native)', 'English (Professional)'].map(s =>
              `<span class="badge badge-gray">${s}</span>`
            ).join('')}
          </div>
        </div>
      </div>

      <!-- Right: Actions & Activity -->
      <div class="col-side">
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Quick Actions</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn-dark" style="width:100%">✏️ Edit Profile</button>
            <button class="btn-glass" style="width:100%">🔑 Change Password</button>
            <button class="btn-glass" style="width:100%">🔔 Notification Settings</button>
            <button class="btn-outline-red" style="width:100%" onclick="logout()">🚪 Sign Out</button>
          </div>
        </div>

        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Recent Activity</h3>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[
              { action: 'Reviewed application', detail: 'Sokha Rith — Recruitment Officer', time: '2h ago', color: 'var(--red)' },
              { action: 'Scheduled interview', detail: 'Dara Sophal — Network Engineer', time: '5h ago', color: 'var(--teal)' },
              { action: 'Posted new job', detail: 'Mobile App Developer', time: '1d ago', color: 'var(--orange)' },
              { action: 'Sent offer letter', detail: 'Chanthy Mao — Data Analyst', time: '2d ago', color: 'var(--teal)' },
            ].map(a => `
              <div style="display:flex;gap:10px">
                <div style="width:8px;height:8px;border-radius:50%;background:${a.color};flex-shrink:0;margin-top:5px"></div>
                <div style="flex:1">
                  <p style="font-size:12px;font-weight:600">${a.action}</p>
                  <p style="font-size:11px;color:var(--text-tertiary)">${a.detail}</p>
                </div>
                <span style="font-size:10px;color:var(--text-tertiary);white-space:nowrap">${a.time}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
