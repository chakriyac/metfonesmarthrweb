/* ─── Seeker Home Page ─── */
Router.register('/home', function renderHomeSeeker() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/home'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <!-- Hero Profile Card -->
        <div class="hero-card" style="margin-bottom:24px;display:flex;align-items:center;gap:20px">
          <div class="avatar avatar-xl" style="background:#FDE8E8;color:#ED1C24;font-weight:700;position:relative">
            SC
            <span style="position:absolute;bottom:2px;right:2px;width:12px;height:12px;border-radius:50%;background:#34C759;border:2px solid white"></span>
          </div>
          <div style="flex:1">
            <p style="font-size:12px;color:var(--text-tertiary)">Good morning 👋</p>
            <h1 style="font-family:var(--font-display);font-size:24px;font-weight:800;margin-bottom:4px">Sokha Chan</h1>
            <p style="font-size:13px;color:var(--text-secondary)">Job Seeker · Phnom Penh</p>
          </div>
          <div style="text-align:right">
            <span class="badge badge-teal">Profile 85%</span>
            <div class="progress-bar" style="width:100px;margin-top:6px"><div class="fill" style="width:85%"></div></div>
          </div>
        </div>

        <!-- Quick Actions 4-grid -->
        <div class="quick-actions cols-4" style="margin-bottom:24px">
          <div class="quick-action" onclick="Router.navigate('/jobs')">
            <div class="qa-icon">🔍</div>
            <div class="qa-title">Find Jobs</div>
            <div class="qa-desc">12 new listings</div>
          </div>
          <div class="quick-action" onclick="Router.navigate('/applications')">
            <div class="qa-icon">📋</div>
            <div class="qa-title">My Apps</div>
            <div class="qa-desc">5 active</div>
          </div>
          <div class="quick-action" onclick="Router.navigate('/chat/ai')">
            <div class="qa-icon">✦</div>
            <div class="qa-title">Ask AI</div>
            <div class="qa-desc">Career advice</div>
          </div>
          <div class="quick-action" onclick="Router.navigate('/chat/hr')">
            <div class="qa-icon">💬</div>
            <div class="qa-title">Chat HR</div>
            <div class="qa-desc">1 new message</div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="tab-row">
          <button class="tab active">Recommended</button>
          <button class="tab">Recent</button>
          <button class="tab">Saved</button>
        </div>

        <!-- Job Cards -->
        <div class="stagger-children" style="display:flex;flex-direction:column;gap:12px">
          ${[
            { init: 'RO', title: 'Recruitment Officer', co: 'Metfone', loc: 'Phnom Penh', type: 'Full-time', salary: '$800/mo', time: '2d ago', bg: '#FDE8E8', color: '#ED1C24', match: '92%' },
            { init: 'NE', title: 'Network Engineer', co: 'Metfone', loc: 'Siem Reap', type: 'Full-time', salary: '$1,200/mo', time: '3d ago', bg: '#F0F9F8', color: '#00A79D', match: '87%' },
            { init: 'MA', title: 'Mobile App Developer', co: 'Metfone', loc: 'Phnom Penh', type: 'Contract', salary: '$1,500/mo', time: '5d ago', bg: '#FFF8F0', color: '#E87C1E', match: '78%' },
            { init: 'DA', title: 'Data Analyst', co: 'Metfone', loc: 'Battambang', type: 'Full-time', salary: '$900/mo', time: '1w ago', bg: '#F7F7F8', color: '#8E8E93', match: '74%' },
          ].map(j => `
            <div class="card" style="display:flex;align-items:center;gap:16px;cursor:pointer" onclick="Router.navigate('/jobs/1')">
              <div class="avatar avatar-md" style="background:${j.bg};color:${j.color}">${j.init}</div>
              <div style="flex:1">
                <h3 style="font-size:14px;font-weight:600;margin-bottom:2px">${j.title}</h3>
                <p style="font-size:12px;color:var(--text-tertiary)">${j.co} · ${j.loc} · ${j.type}</p>
              </div>
              <div style="text-align:right">
                <p style="font-size:14px;font-weight:700;color:var(--red)">${j.salary}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${j.time}</p>
              </div>
              <span class="badge badge-teal">${j.match}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right Panel -->
      <div class="col-side">
        <!-- Profile Summary -->
        <div class="card card-lg" style="margin-bottom:16px;text-align:center">
          <div class="avatar avatar-lg" style="background:#FDE8E8;color:#ED1C24;font-weight:700;margin:0 auto 10px">SC</div>
          <p style="font-size:15px;font-weight:700">Sokha Chan</p>
          <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:12px">Job Seeker · Phnom Penh</p>
          <div style="display:flex;justify-content:center;gap:16px;margin-bottom:12px">
            <div style="text-align:center"><div style="font-family:var(--font-display);font-size:18px;font-weight:700">5</div><div style="font-size:10px;color:var(--text-tertiary)">Applied</div></div>
            <div style="text-align:center"><div style="font-family:var(--font-display);font-size:18px;font-weight:700;color:var(--teal)">2</div><div style="font-size:10px;color:var(--text-tertiary)">Interviews</div></div>
            <div style="text-align:center"><div style="font-family:var(--font-display);font-size:18px;font-weight:700;color:var(--orange)">1</div><div style="font-size:10px;color:var(--text-tertiary)">Offers</div></div>
          </div>
          <button class="btn btn-glass" style="width:100%" onclick="Router.navigate('/profile')">View Profile</button>
        </div>

        <!-- Application Status -->
        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:14px">Application Status</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:13px">Recruitment Officer</span>
              <span class="badge badge-red">In Review</span>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:13px">Network Engineer</span>
              <span class="badge badge-teal">Shortlisted</span>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:13px">Mobile App Dev</span>
              <span class="badge badge-orange">Interview</span>
            </div>
          </div>
          <button class="btn btn-dark" style="width:100%;margin-top:16px;font-size:13px;padding:12px" onclick="Router.navigate('/applications')">View All Applications</button>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  initTabs(page);
  return page;
});