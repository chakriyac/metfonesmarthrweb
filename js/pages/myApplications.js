/* ─── My Applications Page ─── */
Router.register('/applications', function renderMyApplications() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/applications'));

  const apps = [
    { pos: 'Recruitment Officer', co: 'Metfone', loc: 'Phnom Penh', type: 'Full-time', date: 'Dec 2', status: 'In Review', badge: 'badge-red', avatar: '#FDE8E8', avatarText: '#ED1C24', init: 'RO' },
    { pos: 'Network Engineer', co: 'Metfone', loc: 'Siem Reap', type: 'Full-time', date: 'Nov 25', status: 'Shortlisted', badge: 'badge-teal', avatar: '#F0F9F8', avatarText: '#00A79D', init: 'NE' },
    { pos: 'Mobile App Developer', co: 'Metfone', loc: 'Phnom Penh', type: 'Contract', date: 'Nov 18', status: 'Interview', badge: 'badge-orange', avatar: '#FFF8F0', avatarText: '#E87C1E', init: 'MA' },
    { pos: 'Data Analyst', co: 'Metfone', loc: 'Battambang', type: 'Full-time', date: 'Nov 10', status: 'In Review', badge: 'badge-red', avatar: '#F7F7F8', avatarText: '#8E8E93', init: 'DA' },
    { pos: 'IT Support Specialist', co: 'Metfone', loc: 'Phnom Penh', type: 'Full-time', date: 'Oct 28', status: 'Closed', badge: 'badge-gray', avatar: '#F7F7F8', avatarText: '#8E8E93', init: 'IT' },
  ];

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div style="max-width:860px;margin:0 auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
        <h1 style="font-family:var(--font-display);font-size:22px;font-weight:700">My Applications</h1>
        <button class="btn-glass" style="font-size:12px;padding:8px 14px" onclick="Router.navigate('/home')">Browse Jobs</button>
      </div>

      <div class="stats-row" style="margin-bottom:20px">
        <div class="stat-card" style="background:linear-gradient(135deg,var(--grad-1),var(--grad-4))">
          <div class="number">5</div>
          <div class="label">TOTAL</div>
        </div>
        <div class="stat-card">
          <div class="number" style="color:var(--red)">2</div>
          <div class="label">IN REVIEW</div>
        </div>
        <div class="stat-card">
          <div class="number" style="color:var(--teal)">1</div>
          <div class="label">SHORTLISTED</div>
        </div>
        <div class="stat-card">
          <div class="number" style="color:var(--orange)">1</div>
          <div class="label">INTERVIEW</div>
        </div>
      </div>

      <div class="tab-row">
        <button class="tab active">Ongoing</button>
        <button class="tab">History</button>
      </div>

      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch">
        <div class="table-header" style="grid-template-columns:2fr 1fr 80px 100px 60px;min-width:500px">
          <span>POSITION</span><span>COMPANY</span><span>DATE</span><span>STATUS</span><span>ACTION</span>
        </div>

        ${apps.map(a => `
          <div class="table-row" style="grid-template-columns:2fr 1fr 80px 100px 60px;min-width:500px">
            <div style="display:flex;align-items:center;gap:12px">
              <div class="avatar avatar-sm" style="background:${a.avatar};color:${a.avatarText};font-size:9px">${a.init}</div>
              <div>
                <p style="font-size:13px;font-weight:600">${a.pos}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${a.loc} · ${a.type}</p>
              </div>
            </div>
            <span style="font-size:13px;color:var(--text-secondary)">${a.co}</span>
            <span style="font-size:12px;color:var(--text-tertiary)">${a.date}</span>
            <span class="badge ${a.badge}">${a.status}</span>
            <a href="#/tracking" style="font-size:12px;font-weight:600;color:var(--teal)">${a.status === 'Closed' ? 'View' : 'Track →'}</a>
          </div>
        `).join('')}
      </div>
    </div>`;

  page.appendChild(main);
  initTabs(page);
  return page;
});
