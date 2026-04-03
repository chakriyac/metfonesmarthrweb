/* ─── HR Home → Redirect to Dashboard ─── */
Router.register('/hr/home', function renderHrHome() {
  Router.navigate('/hr/dashboard');
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/dashboard'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
          <div>
            <h1 style="font-family:var(--font-display);font-size:24px;font-weight:700">HR Home</h1>
            <p style="font-size:13px;color:var(--text-tertiary)">Officer overview &amp; quick actions</p>
          </div>
          <div style="position:relative;cursor:pointer">
            <span style="font-size:20px">🔔</span>
            <span style="position:absolute;top:-4px;right:-6px;width:18px;height:18px;border-radius:50%;background:var(--red);color:white;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">3</span>
          </div>
        </div>

        <!-- Officer Card -->
        <div class="hero-card" style="margin-bottom:20px;display:flex;align-items:center;gap:16px">
          <div class="avatar avatar-xl" style="background:#F0F9F8;color:#00A79D;font-weight:700;position:relative">
            DS
            <span style="position:absolute;bottom:2px;right:2px;width:12px;height:12px;border-radius:50%;background:#34C759;border:2px solid white"></span>
          </div>
          <div>
            <h2 style="font-family:var(--font-display);font-size:20px;font-weight:700;margin-bottom:2px">Dara Samnang</h2>
            <p style="font-size:13px;color:var(--text-secondary)">HR Officer · Phnom Penh Branch</p>
            <span class="badge badge-green" style="margin-top:6px">● Online</span>
          </div>
        </div>

        <!-- Today Stats -->
        <div class="stats-row" style="margin-bottom:20px">
          <div class="stat-card">
            <div class="number" style="color:var(--red)">8</div>
            <div class="label">New Apps</div>
          </div>
          <div class="stat-card">
            <div class="number" style="color:var(--teal)">3</div>
            <div class="label">Interviews</div>
          </div>
          <div class="stat-card">
            <div class="number" style="color:var(--orange)">5</div>
            <div class="label">Pending Tasks</div>
          </div>
          <div class="stat-card">
            <div class="number">2</div>
            <div class="label">Messages</div>
          </div>
        </div>
        <p style="font-size:11px;color:var(--text-tertiary);margin-bottom:20px;margin-top:-12px">Dec 5, 2024</p>

        <!-- Quick Actions 2×3 -->
        <div class="section-header"><h2>Quick Actions</h2></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px">
          ${[
            { icon: '📋', title: 'Review Apps', desc: '15 pending', route: '/hr/applications' },
            { icon: '📅', title: 'Schedule', desc: '3 interviews', route: '/hr/dashboard' },
            { icon: '📊', title: 'Reports', desc: 'Generate weekly stats', route: '/hr/dashboard' },
            { icon: '👥', title: 'Team', desc: 'Manage HR team', route: '/hr/dashboard' },
            { icon: '📢', title: 'Post Job', desc: 'Create new listing', route: '/hr/dashboard' },
            { icon: '⚙️', title: 'Settings', desc: 'Account & preferences', route: '/hr/dashboard' },
          ].map(q => `
            <div class="quick-action" onclick="Router.navigate('${q.route}')">
              <div class="qa-icon">${q.icon}</div>
              <div class="qa-title">${q.title}</div>
              <div class="qa-desc">${q.desc}</div>
            </div>
          `).join('')}
        </div>

        <!-- My Tasks -->
        <div class="section-header"><h2>My Tasks</h2></div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <div class="card" style="display:flex;align-items:center;gap:12px">
            <span style="width:24px;height:24px;border-radius:50%;background:#00A79D;color:white;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">✓</span>
            <div style="flex:1">
              <p style="font-size:13px;font-weight:500;text-decoration:line-through;color:var(--text-tertiary)">Review Sokha's application – Recruitment Officer</p>
            </div>
            <span class="badge badge-green">Done</span>
          </div>
          <div class="card" style="display:flex;align-items:center;gap:12px">
            <span style="width:24px;height:24px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0"></span>
            <div style="flex:1">
              <p style="font-size:13px;font-weight:500">Schedule interview with Dara S. – Network Engineer</p>
            </div>
            <span class="badge badge-orange">Pending</span>
          </div>
          <div class="card" style="display:flex;align-items:center;gap:12px">
            <span style="width:24px;height:24px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0"></span>
            <div style="flex:1">
              <p style="font-size:13px;font-weight:500">Send offer letter to accepted candidates</p>
            </div>
            <span class="badge badge-orange">Pending</span>
          </div>
        </div>
      </div>

      <!-- Right: Upcoming -->
      <div class="col-side">
        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:16px">Upcoming</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            <div style="background:#FFF0F0;border-radius:14px;padding:14px 16px">
              <p style="font-size:12px;font-weight:700;color:var(--red);margin-bottom:2px">09:00</p>
              <p style="font-size:13px;font-weight:600">Interview — Sokha R.</p>
              <p style="font-size:11px;color:var(--text-tertiary)">Recruitment Officer · Room 3A</p>
            </div>
            <div style="background:#F0F9F8;border-radius:14px;padding:14px 16px">
              <p style="font-size:12px;font-weight:700;color:var(--teal);margin-bottom:2px">11:00</p>
              <p style="font-size:13px;font-weight:600">Review session</p>
              <p style="font-size:11px;color:var(--text-tertiary)">Network Engineer candidates · Online</p>
            </div>
            <div style="background:#FFF8F0;border-radius:14px;padding:14px 16px">
              <p style="font-size:12px;font-weight:700;color:var(--orange);margin-bottom:2px">14:30</p>
              <p style="font-size:13px;font-weight:600">Technical test — Piseth K.</p>
              <p style="font-size:11px;color:var(--text-tertiary)">Mobile App Developer · Lab B</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
