/* ─── Employee Dashboard Page ─── */
Router.register('/employee/dashboard', function renderEmployeeDashboard() {
  const page = el('div', { className: 'app-layout fade-in' });
  const role = sessionStorage.getItem('loginRole');
  page.appendChild(role === 'manager' ? managerSidebar('/employee/dashboard') : employeeSidebar('/employee/dashboard'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <!-- Hero greeting -->
        <div class="hero-card" style="margin-bottom:24px;padding:32px 36px;border-radius:24px">
          <div style="display:flex;align-items:center;gap:20px">
            <div style="position:relative;flex-shrink:0">
              <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,rgba(0,167,157,0.15),rgba(0,167,157,0.12));display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:var(--teal);border:2px solid rgba(255,255,255,0.6)">VN</div>
              <span style="position:absolute;bottom:2px;right:2px;width:14px;height:14px;border-radius:50%;background:var(--green);border:3px solid white;box-shadow:0 0 8px rgba(0,167,157,0.4)"></span>
            </div>
            <div style="flex:1">
              <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:4px;letter-spacing:0.5px">WELCOME BACK</p>
              <h2 style="font-family:var(--font-display);font-size:24px;font-weight:800;color:var(--black);margin-bottom:6px">Good Morning, Vanna!</h2>
              <p style="font-size:13px;color:var(--text-secondary);margin-bottom:10px">Staff · HR Department · Metfone HQ</p>
              <div style="display:flex;align-items:center;gap:12px">
                <span class="badge badge-green" style="padding:6px 14px;font-size:12px">● Checked In 8:05 AM</span>
                <span style="display:flex;align-items:center;gap:4px;font-size:11px;color:var(--text-tertiary)">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  GPS Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats row -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px">
          ${[
            { num: '12', label: 'Leave Days', color: 'var(--teal)', bg: 'rgba(0,167,157,0.06)', icon: '🏖️' },
            { num: '160h', label: 'Hours This Month', color: 'var(--teal)', bg: 'rgba(0,167,157,0.06)', icon: '⏱️' },
            { num: '$2,450', label: 'Last Payslip', color: 'var(--orange)', bg: 'rgba(232,124,30,0.06)', icon: '💰' },
            { num: '95%', label: 'Attendance', color: 'var(--red)', bg: 'rgba(237,28,36,0.06)', icon: '📊' },
          ].map(s => `
            <div class="card" style="padding:20px;border-radius:20px;position:relative;overflow:hidden">
              <div style="position:absolute;top:12px;right:14px;font-size:20px;opacity:0.5">${s.icon}</div>
              <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:${s.color};margin-bottom:4px">${s.num}</div>
              <div style="font-size:12px;color:var(--text-tertiary);font-weight:500">${s.label}</div>
              <div style="margin-top:10px;height:4px;border-radius:2px;background:rgba(0,0,0,0.04)">
                <div style="height:100%;border-radius:2px;width:${s.num === '95%' ? '95%' : s.num === '12' ? '60%' : '80%'};background:${s.color};opacity:0.5"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Quick Actions -->
        <div class="section-header"><h2>Quick Actions</h2></div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px">
          ${[
            { icon: '💰', title: 'View Payslip', desc: 'March 2026', route: '/employee/payslip', gradient: 'linear-gradient(135deg,rgba(232,124,30,0.08),rgba(232,124,30,0.02))' },
            { icon: '🏖️', title: 'Request Leave', desc: '12 days left', route: '/employee/leave', gradient: 'linear-gradient(135deg,rgba(0,167,157,0.08),rgba(0,167,157,0.02))' },
            { icon: '📅', title: 'Attendance', desc: 'History & records', route: '/employee/attendance', gradient: 'linear-gradient(135deg,rgba(0,167,157,0.08),rgba(0,167,157,0.02))' },
            { icon: '🤖', title: 'Ask HR AI', desc: 'Get instant help', route: '/chat/ai', gradient: 'linear-gradient(135deg,rgba(237,28,36,0.08),rgba(237,28,36,0.02))' },
          ].map(q => `
            <div class="card" style="padding:22px 20px;border-radius:20px;cursor:pointer;background:${q.gradient}" onclick="Router.navigate('${q.route}')">
              <div style="width:44px;height:44px;border-radius:14px;background:rgba(255,255,255,0.7);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:12px;border:1px solid rgba(255,255,255,0.5)">${q.icon}</div>
              <div style="font-size:14px;font-weight:700;color:var(--black);margin-bottom:3px">${q.title}</div>
              <div style="font-size:11px;color:var(--text-tertiary)">${q.desc}</div>
            </div>
          `).join('')}
        </div>

        <!-- Recent Activity -->
        <div class="section-header"><h2>Recent Activity</h2></div>
        <div class="stagger-children" style="display:flex;flex-direction:column;gap:10px">
          ${[
            { icon: '✅', bg: 'rgba(0,167,157,0.08)', color: '#00A79D', title: 'Checked in', detail: 'Metfone HQ · GPS Verified', time: 'Today 8:05 AM' },
            { icon: '💰', bg: 'rgba(232,124,30,0.08)', color: '#E87C1E', title: 'Payslip available', detail: 'March 2026 — $2,450 net', time: 'Mar 28' },
            { icon: '✅', bg: 'rgba(0,167,157,0.08)', color: '#00A79D', title: 'Leave approved', detail: 'Annual leave · Apr 10–12 (3 days)', time: 'Mar 25' },
            { icon: '📅', bg: 'rgba(0,167,157,0.08)', color: '#00A79D', title: 'Attendance perfect', detail: 'March week 4 — 100% on time', time: 'Mar 24' },
          ].map(a => `
            <div class="card" style="display:flex;align-items:center;gap:16px;padding:18px 20px;border-radius:18px">
              <div style="width:42px;height:42px;border-radius:14px;background:${a.bg};display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${a.icon}</div>
              <div style="flex:1;min-width:0">
                <p style="font-size:14px;font-weight:700;color:var(--black);margin-bottom:2px">${a.title}</p>
                <p style="font-size:12px;color:var(--text-tertiary)">${a.detail}</p>
              </div>
              <span style="font-size:12px;color:var(--text-tertiary);white-space:nowrap;font-weight:500">${a.time}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right sidebar -->
      <div class="col-side">
        <!-- Today's Status -->
        <div class="card card-lg" style="margin-bottom:16px;text-align:center;border-radius:24px;padding:28px 24px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:2px">Today's Status</h3>
          <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:20px">April 1, 2026</p>

          <div style="position:relative;width:100px;height:100px;margin:0 auto 16px">
            <svg width="100" height="100" viewBox="0 0 100 100" style="transform:rotate(-90deg)">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="8"/>
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--teal)" stroke-width="8" stroke-linecap="round" stroke-dasharray="264" stroke-dashoffset="0" style="transition:stroke-dashoffset 1s ease"/>
            </svg>
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
              <span style="font-family:var(--font-display);font-size:28px;font-weight:800;color:var(--teal)">8h</span>
            </div>
          </div>

          <p style="font-size:14px;font-weight:700;color:var(--black);margin-bottom:2px">Working hours today</p>
          <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:20px">8:05 AM — In progress</p>

          <button class="btn-dark" style="width:100%;padding:14px;border-radius:var(--radius-pill);font-size:14px;font-weight:700" onclick="Router.navigate('/employee/checkin')">View Check In/Out</button>
        </div>

        <!-- Upcoming -->
        <div class="card card-lg" style="border-radius:24px;padding:28px 24px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:16px">Upcoming</h3>
          <div style="display:flex;flex-direction:column;gap:14px">
            ${[
              { date: 'Apr 10–12', title: 'Annual Leave', badge: 'badge-green', status: 'Approved' },
              { date: 'Apr 15', title: 'Performance Review', badge: 'badge-orange', status: 'Scheduled' },
              { date: 'Apr 30', title: 'Payslip Release', badge: 'badge-teal', status: 'Upcoming' },
            ].map(e => `
              <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:rgba(255,255,255,0.4);border-radius:14px;border:1px solid rgba(255,255,255,0.5)">
                <span style="font-size:12px;font-weight:700;color:var(--text-tertiary);width:66px;flex-shrink:0">${e.date}</span>
                <span style="font-size:13px;font-weight:600;flex:1;color:var(--black)">${e.title}</span>
                <span class="badge ${e.badge}" style="font-size:10px;padding:4px 10px">${e.status}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
