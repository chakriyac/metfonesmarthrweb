/* ─── HR Dashboard Page ─── */
Router.register('/hr/dashboard', function renderHrDashboard() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/dashboard'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div class="page-header">
          <h1>Dashboard</h1>
          <p>Welcome back, Dara · Last updated just now</p>
        </div>

        <div class="hero-card" style="margin-bottom:20px">
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px">
            ${[
              { num: '12', label: 'Active Jobs', sub: '↑ 3 this week', subColor: 'var(--teal)' },
              { num: '48', label: 'Total Applications', sub: '↑ 8 new today', subColor: 'var(--teal)' },
              { num: '7', label: 'Interviews This Week', sub: '3 today', subColor: 'var(--text-tertiary)' },
              { num: '3', label: 'Pending Offers', sub: '2 accepted', subColor: 'var(--teal)' },
            ].map((s, i) => `
              <div style="${i < 3 ? 'border-right:1px solid rgba(255,255,255,0.3);' : ''}padding:0 16px">
                <div style="font-family:var(--font-display);font-size:28px;font-weight:800">${s.num}</div>
                <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">${s.label}</div>
                <span style="font-size:11px;color:${s.subColor}">${s.sub}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="stats-row" style="margin-bottom:24px">
          <div class="stat-card"><div class="number" style="color:var(--red)">15</div><div class="label">Under Review</div></div>
          <div class="stat-card"><div class="number" style="color:var(--teal)">18</div><div class="label">Shortlisted</div></div>
          <div class="stat-card"><div class="number" style="color:var(--orange)">7</div><div class="label">Scheduled</div></div>
          <div class="stat-card"><div class="number" style="color:var(--text-tertiary)">8</div><div class="label">Rejected</div></div>
        </div>

        <div class="section-header">
          <h2>Recent Applications</h2>
          <a href="#/hr/applications" class="link">See all</a>
        </div>

        <div class="stagger-children" style="display:flex;flex-direction:column;gap:8px">
          ${[
            { init: 'SR', name: 'Sokha Rith', pos: 'Recruitment Officer', date: 'Dec 2', status: 'In Review', badge: 'badge-red', bg: '#FDE8E8', color: '#ED1C24' },
            { init: 'DS', name: 'Dara Sophal', pos: 'Network Engineer', date: 'Nov 28', status: 'Shortlisted', badge: 'badge-teal', bg: '#F0F9F8', color: '#00A79D' },
            { init: 'PK', name: 'Piseth Keo', pos: 'Mobile App Developer', date: 'Nov 25', status: 'Interview', badge: 'badge-orange', bg: '#FFF8F0', color: '#E87C1E' },
          ].map(a => `
            <div class="card" style="display:flex;align-items:center;gap:14px;cursor:pointer" onclick="Router.navigate('/hr/applications/1')">
              <div class="avatar avatar-sm" style="background:${a.bg};color:${a.color}">${a.init}</div>
              <div style="flex:1">
                <p style="font-size:13px;font-weight:600">${a.name}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${a.pos}</p>
              </div>
              <span style="font-size:11px;color:var(--text-tertiary)">${a.date}</span>
              <span class="badge ${a.badge}">${a.status}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="col-side">
        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:4px">Today's Schedule</h3>
          <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:16px">Dec 5, 2024</p>

          <div style="display:flex;flex-direction:column;gap:10px">
            ${[
              { time: '09:00', color: 'var(--red)', bg: '#FFF0F0', title: 'Interview — Sokha R.', sub: 'Recruitment Officer · Room 3A' },
              { time: '11:00', color: 'var(--teal)', bg: '#F0F9F8', title: 'Review session', sub: 'Network Engineer candidates · Online' },
              { time: '14:30', color: 'var(--orange)', bg: '#FFF8F0', title: 'Technical test — Piseth K.', sub: 'Mobile App Developer · Lab B' },
            ].map(e => `
              <div style="background:${e.bg};border-radius:14px;padding:14px 16px">
                <p style="font-size:12px;font-weight:700;color:${e.color};margin-bottom:2px">${e.time}</p>
                <p style="font-size:13px;font-weight:600">${e.title}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${e.sub}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
