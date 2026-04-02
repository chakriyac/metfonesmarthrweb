/* ─── Seeker Home Page ─── */
Router.register('/home', function renderHomeSeeker() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/home'));

  const jobs = [
    { id:1, init:'RO', title:'Recruitment Officer', co:'Metfone', loc:'Phnom Penh', type:'Full-time', salary:'$800', time:'2d ago', bg:'#FDE8E8', color:'#ED1C24', match:92 },
    { id:2, init:'NE', title:'Network Engineer', co:'Metfone', loc:'Siem Reap', type:'Full-time', salary:'$1,200', time:'3d ago', bg:'#F0F9F8', color:'#00A79D', match:87 },
    { id:3, init:'MA', title:'Mobile App Developer', co:'Metfone', loc:'Phnom Penh', type:'Contract', salary:'$1,500', time:'5d ago', bg:'#FFF8F0', color:'#E87C1E', match:78 },
    { id:4, init:'DA', title:'Data Analyst', co:'Metfone', loc:'Battambang', type:'Full-time', salary:'$900', time:'1w ago', bg:'#F7F7F8', color:'#8E8E93', match:74 },
    { id:5, init:'CS', title:'Customer Success Lead', co:'Metfone', loc:'Phnom Penh', type:'Full-time', salary:'$950', time:'1w ago', bg:'#E8F0FD', color:'#2563EB', match:70 },
  ];

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <!-- Slim greeting row -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
      <div style="display:flex;align-items:center;gap:12px">
        <div class="avatar avatar-md" style="background:#FDE8E8;color:#ED1C24;font-weight:700;font-size:14px;position:relative">
          SC
          <span style="position:absolute;bottom:0;right:0;width:9px;height:9px;border-radius:50%;background:#34C759;border:2px solid white"></span>
        </div>
        <div>
          <p style="font-size:11px;color:var(--text-tertiary)">Good morning 👋</p>
          <h1 style="font-family:var(--font-display);font-size:18px;font-weight:800">Sokha Chan</h1>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <button class="btn-glass" style="padding:6px 14px;font-size:11px" onclick="Router.navigate('/profile')">Profile 85%</button>
        <button onclick="Router.navigate('/notifications')" style="width:34px;height:34px;border-radius:50%;background:var(--glass-bg);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid var(--glass-border);display:flex;align-items:center;justify-content:center;font-size:14px;position:relative;cursor:pointer">
          🔔<span style="position:absolute;top:5px;right:5px;width:6px;height:6px;border-radius:50%;background:var(--red)"></span>
        </button>
      </div>
    </div>

    <!-- Search bar -->
    <div class="card" style="display:flex;align-items:center;gap:12px;padding:10px 18px;margin-bottom:20px">
      <span style="font-size:16px;color:var(--text-tertiary)">🔍</span>
      <input id="jobSearch" type="text" placeholder="Search positions, skills, locations…" style="flex:1;border:none;background:none;font-size:14px;outline:none;color:var(--black)">
      <button class="btn-glass" style="padding:6px 14px;font-size:11px" onclick="Router.navigate('/chat/ai')">✦ AI</button>
    </div>

    <!-- Jobs section (primary) -->
    <div style="margin-bottom:32px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <h2 style="font-family:var(--font-display);font-size:16px;font-weight:700">Jobs for You</h2>
        <div class="tab-row" style="margin-bottom:0;gap:4px">
          <button class="tab active" style="padding:6px 14px;font-size:11px">Best Match</button>
          <button class="tab" style="padding:6px 14px;font-size:11px">Recent</button>
          <button class="tab" style="padding:6px 14px;font-size:11px">Saved</button>
        </div>
      </div>

      <div id="jobList" class="stagger-children" style="display:flex;flex-direction:column;gap:8px">
        ${jobs.map(j => `
          <div class="card job-card" data-title="${j.title.toLowerCase()}" style="display:flex;align-items:center;gap:14px;padding:14px 18px;cursor:pointer" onclick="Router.navigate('/jobs/${j.id}')">
            <div style="width:40px;height:40px;border-radius:12px;background:${j.bg};color:${j.color};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${j.init}</div>
            <div style="flex:1;min-width:0">
              <p style="font-size:14px;font-weight:600;margin-bottom:2px">${j.title}</p>
              <p style="font-size:11px;color:var(--text-tertiary)">${j.co} · ${j.loc} · ${j.type}</p>
            </div>
            <div style="text-align:right;flex-shrink:0">
              <p style="font-size:14px;font-weight:700;color:var(--black)">${j.salary}<span style="font-size:10px;color:var(--text-tertiary);font-weight:400">/mo</span></p>
              <p style="font-size:10px;color:var(--text-tertiary);margin-top:2px">${j.time}</p>
            </div>
            <div style="width:38px;height:38px;border-radius:50%;background:${j.match >= 85 ? 'rgba(0,167,157,0.08)' : 'rgba(142,142,147,0.08)'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <span style="font-size:11px;font-weight:700;color:${j.match >= 85 ? 'var(--teal)' : 'var(--text-tertiary)'}">${j.match}%</span>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Active Applications (secondary) -->
    <div style="margin-bottom:28px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <h2 style="font-family:var(--font-display);font-size:16px;font-weight:700">Active Applications</h2>
        <a href="#/applications" style="font-size:12px;font-weight:600;color:var(--teal)">View all →</a>
      </div>
      <div style="display:flex;gap:10px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px">
        ${[
          { title:'Recruitment Officer', status:'In Review', badge:'badge-red', progress:25 },
          { title:'Network Engineer', status:'Shortlisted', badge:'badge-teal', progress:50 },
          { title:'Mobile App Dev', status:'Interview', badge:'badge-orange', progress:75 },
        ].map(a => `
          <div class="card" style="min-width:200px;flex-shrink:0;padding:16px;cursor:pointer" onclick="Router.navigate('/tracking')">
            <p style="font-size:13px;font-weight:600;margin-bottom:10px">${a.title}</p>
            <div style="height:4px;border-radius:2px;background:var(--border);margin-bottom:8px"><div style="height:100%;width:${a.progress}%;border-radius:2px;background:var(--teal)"></div></div>
            <span class="badge ${a.badge}" style="font-size:10px">${a.status}</span>
          </div>`).join('')}
      </div>
    </div>

    <!-- Stats strip (compact) -->
    <div style="display:flex;gap:10px">
      <div class="card" style="flex:1;display:flex;align-items:center;gap:10px;padding:12px 16px;cursor:pointer" onclick="Router.navigate('/applications')">
        <span style="font-size:14px">📋</span>
        <div><p style="font-family:var(--font-display);font-size:18px;font-weight:800">5</p><p style="font-size:10px;color:var(--text-tertiary)">Applied</p></div>
      </div>
      <div class="card" style="flex:1;display:flex;align-items:center;gap:10px;padding:12px 16px;cursor:pointer" onclick="Router.navigate('/tracking')">
        <span style="font-size:14px">📍</span>
        <div><p style="font-family:var(--font-display);font-size:18px;font-weight:800;color:var(--teal)">2</p><p style="font-size:10px;color:var(--text-tertiary)">Interviews</p></div>
      </div>
      <div class="card" style="flex:1;display:flex;align-items:center;gap:10px;padding:12px 16px">
        <span style="font-size:14px">🎉</span>
        <div><p style="font-family:var(--font-display);font-size:18px;font-weight:800;color:var(--orange)">1</p><p style="font-size:10px;color:var(--text-tertiary)">Offer</p></div>
      </div>
    </div>`;

  page.appendChild(main);
  initTabs(page);

  /* Live search filter */
  setTimeout(() => {
    const input = document.getElementById('jobSearch');
    if (input) input.addEventListener('input', () => {
      const q = input.value.toLowerCase();
      document.querySelectorAll('.job-card').forEach(c => {
        c.style.display = c.dataset.title.includes(q) ? '' : 'none';
      });
    });
  });

  return page;
});