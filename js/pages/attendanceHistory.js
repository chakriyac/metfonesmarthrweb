/* ─── Attendance History Page ─── */
Router.register('/employee/attendance', function renderAttendanceHistory() {
  const page = el('div', { className: 'app-layout fade-in' });
  const role = sessionStorage.getItem('loginRole');
  page.appendChild(role === 'manager' ? managerSidebar('/employee/attendance') : employeeSidebar('/employee/attendance'));

  const records = [
    { date: 'Mar 31', day: 'Monday', cin: '8:05 AM', cout: '5:12 PM', hrs: '8h 07m', status: 'Present', badge: 'badge-green' },
    { date: 'Mar 28', day: 'Friday', cin: '8:00 AM', cout: '5:30 PM', hrs: '8h 30m', status: 'Present', badge: 'badge-green' },
    { date: 'Mar 27', day: 'Thursday', cin: '8:25 AM', cout: '5:15 PM', hrs: '7h 50m', status: 'Late', badge: 'badge-orange' },
    { date: 'Mar 26', day: 'Wednesday', cin: '7:55 AM', cout: '5:10 PM', hrs: '8h 15m', status: 'Present', badge: 'badge-green' },
    { date: 'Mar 25', day: 'Tuesday', cin: '8:02 AM', cout: '6:00 PM', hrs: '9h 58m', status: 'Overtime', badge: 'badge-red' },
    { date: 'Mar 24', day: 'Monday', cin: '8:00 AM', cout: '5:05 PM', hrs: '8h 05m', status: 'Present', badge: 'badge-green' },
    { date: 'Mar 22–23', day: 'Sat–Sun', cin: '—', cout: '—', hrs: '—', status: 'Weekend', badge: 'badge-gray' },
    { date: 'Mar 21', day: 'Friday', cin: '—', cout: '—', hrs: '—', status: 'Leave', badge: 'badge-teal' },
  ];

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div class="page-header">
          <h1>Attendance History</h1>
          <p>Your attendance records</p>
        </div>

        <div style="display:flex;gap:12px;margin-bottom:20px">
          <select style="background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px;font-weight:600">
            <option>March 2026</option>
            <option>February 2026</option>
            <option>January 2026</option>
            <option>December 2025</option>
            <option>November 2025</option>
          </select>
        </div>

        <div class="stats-row" style="margin-bottom:24px">
          <div class="stat-card"><div class="number" style="color:var(--green)">22</div><div class="label">Days Present</div></div>
          <div class="stat-card"><div class="number" style="color:var(--teal)">176h</div><div class="label">Total Hours</div></div>
          <div class="stat-card"><div class="number" style="color:var(--orange)">95%</div><div class="label">On Time</div></div>
        </div>

        <div class="section-header"><h2>Daily Records</h2></div>
        <div class="stagger-children" style="display:flex;flex-direction:column;gap:8px">
          ${records.map(r => `
            <div class="card" style="display:flex;align-items:center;gap:14px;${r.status === 'Weekend' || r.status === 'Leave' ? 'opacity:0.7' : ''}">
              <div style="min-width:70px">
                <p style="font-size:13px;font-weight:600">${r.date}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${r.day}</p>
              </div>
              <div style="flex:1;display:flex;gap:14px;font-size:12px;color:var(--text-secondary)">
                <span>In: ${r.cin}</span>
                <span>Out: ${r.cout}</span>
                <span style="font-weight:600;color:var(--text-primary)">${r.hrs}</span>
              </div>
              <span class="badge ${r.badge}">${r.status}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="col-side">
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Insights</h3>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[
              { icon: '🎉', title: 'Great attendance!', desc: '95% on-time this month', color: 'var(--green)' },
              { icon: '⏰', title: '1 late arrival', desc: 'Mar 27 — 8:25 AM (25 min)', color: 'var(--orange)' },
              { icon: '💪', title: 'Overtime hours', desc: '1h 58m extra this month', color: 'var(--teal)' },
            ].map(i => `
              <div style="display:flex;gap:10px">
                <span style="font-size:18px;flex-shrink:0">${i.icon}</span>
                <div>
                  <p style="font-size:13px;font-weight:600;color:${i.color}">${i.title}</p>
                  <p style="font-size:11px;color:var(--text-tertiary)">${i.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:8px">Status Legend</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${[
              { badge: 'badge-green', label: 'Present — On time' },
              { badge: 'badge-orange', label: 'Late — After 8:15 AM' },
              { badge: 'badge-red', label: 'Overtime — Over 9 hours' },
              { badge: 'badge-teal', label: 'Leave — Approved time off' },
              { badge: 'badge-gray', label: 'Weekend — Non-working' },
            ].map(l => `
              <div style="display:flex;align-items:center;gap:8px">
                <span class="badge ${l.badge}" style="min-width:70px;text-align:center">${l.badge.replace('badge-', '').charAt(0).toUpperCase() + l.badge.replace('badge-', '').slice(1)}</span>
                <span style="font-size:12px;color:var(--text-secondary)">${l.label.split(' — ')[1]}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
