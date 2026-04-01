/* ─── HR Applications Page ─── */
Router.register('/hr/applications', function renderHrApplications() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/applications'));

  const positions = [
    {
      title: 'Recruitment Officer', dept: 'HR Department', slots: '1 position · 3 applicants',
      badge: 'badge-red', badgeText: 'Urgent',
      candidates: [
        { init: 'SR', name: 'Sokha Rith', score: 92, status: 'In Review', badge: 'badge-red', bg: '#FDE8E8', color: '#ED1C24', date: 'Dec 2' },
        { init: 'KV', name: 'Kosal Vann', score: 78, status: 'In Review', badge: 'badge-red', bg: '#F7F7F8', color: '#8E8E93', date: 'Dec 1' },
        { init: 'MS', name: 'Mony Sam', score: 65, status: 'New', badge: 'badge-gray', bg: '#F7F7F8', color: '#8E8E93', date: 'Nov 30' },
      ]
    },
    {
      title: 'Network Engineer', dept: 'IT Department', slots: '2 positions · 2 applicants',
      badge: 'badge-teal', badgeText: 'Active',
      candidates: [
        { init: 'DS', name: 'Dara Sophal', score: 88, status: 'Shortlisted', badge: 'badge-teal', bg: '#F0F9F8', color: '#00A79D', date: 'Nov 28' },
        { init: 'PT', name: 'Pheakdey Thun', score: 72, status: 'In Review', badge: 'badge-red', bg: '#F7F7F8', color: '#8E8E93', date: 'Nov 26' },
      ]
    },
    {
      title: 'Mobile App Developer', dept: 'IT Department', slots: '1 position · 2 applicants',
      badge: 'badge-orange', badgeText: 'Interview',
      candidates: [
        { init: 'PK', name: 'Piseth Keo', score: 95, status: 'Interview', badge: 'badge-orange', bg: '#FFF8F0', color: '#E87C1E', date: 'Nov 25' },
        { init: 'SL', name: 'Sreyleak Lim', score: 80, status: 'In Review', badge: 'badge-red', bg: '#F7F7F8', color: '#8E8E93', date: 'Nov 22' },
      ]
    },
    {
      title: 'Data Analyst', dept: 'Business Intelligence', slots: '1 position · 1 applicant',
      badge: 'badge-gray', badgeText: 'New',
      candidates: [
        { init: 'VT', name: 'Vanna Tith', score: 70, status: 'In Review', badge: 'badge-red', bg: '#F7F7F8', color: '#8E8E93', date: 'Nov 20' },
      ]
    },
  ];

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div style="max-width:960px">
      <div class="page-header">
        <h1>Applications</h1>
        <p>Grouped by position · ${positions.reduce((s, p) => s + p.candidates.length, 0)} total candidates</p>
      </div>

      <div style="display:flex;gap:12px;margin-bottom:16px">
        <div style="flex:1;position:relative">
          <input type="text" placeholder="🔍  Search candidates or positions…" style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:16px;padding:12px 16px;font-size:13px">
        </div>
        <button class="btn-glass">⚙ Filter</button>
      </div>

      <div class="tab-row" style="margin-bottom:20px">
        <button class="tab active">All Positions</button>
        <button class="tab">Urgent</button>
        <button class="tab">Active</button>
        <button class="tab">Closed</button>
      </div>

      <div class="stagger-children" style="display:flex;flex-direction:column;gap:16px">
        ${positions.map(pos => `
          <div class="position-group">
            <div class="position-group-header">
              <div style="flex:1">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                  <h3 style="font-size:15px;font-weight:700">${pos.title}</h3>
                  <span class="badge ${pos.badge}">${pos.badgeText}</span>
                </div>
                <p style="font-size:12px;color:var(--text-tertiary)">${pos.dept} · ${pos.slots}</p>
              </div>
              <a href="#/hr/dashboard" style="font-size:12px;font-weight:600;color:var(--teal)">Manage →</a>
            </div>
            ${pos.candidates.map((c, i) => `
              <div class="candidate-row" onclick="Router.navigate('/hr/applications/1')">
                <div class="rank${i === 0 ? ' top' : ''}">#${i + 1}</div>
                <div class="avatar avatar-sm" style="background:${c.bg};color:${c.color}">${c.init}</div>
                <div style="flex:1;min-width:0">
                  <p style="font-size:13px;font-weight:600">${c.name}</p>
                  <p style="font-size:11px;color:var(--text-tertiary)">Applied ${c.date}</p>
                </div>
                <div style="text-align:right">
                  <div style="font-size:14px;font-weight:700;color:${c.score >= 90 ? 'var(--green)' : c.score >= 75 ? 'var(--teal)' : 'var(--text-secondary)'}">${c.score}%</div>
                  <span class="badge ${c.badge}" style="font-size:10px">${c.status}</span>
                </div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    </div>`;

  page.appendChild(main);
  initTabs(page);
  return page;
});
