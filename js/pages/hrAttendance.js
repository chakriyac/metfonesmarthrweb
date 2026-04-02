/* ─── HR Attendance Dashboard Page ─── */
Router.register('/hr/attendance', function renderHrAttendance() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/attendance'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div class="page-header">
          <h1>Attendance Dashboard</h1>
          <p>Real-time employee attendance monitoring</p>
        </div>

        <!-- Real-time Metrics -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
          ${[
            { num: '287', label: 'Checked In', icon: '✅', bg: '#F0F9F8', color: 'var(--teal)' },
            { num: '12', label: 'Late Arrivals', icon: '⚠️', bg: '#FFF8F0', color: 'var(--orange)' },
            { num: '5', label: 'Not Checked In', icon: '❌', bg: '#FDE8E8', color: 'var(--red)' },
            { num: '8', label: 'On Leave', icon: '📅', bg: '#F0F9F8', color: '#00A79D' },
          ].map(m => `
            <div class="card" style="text-align:center;padding:20px 12px">
              <div style="width:40px;height:40px;border-radius:50%;background:${m.bg};margin:0 auto 8px;display:flex;align-items:center;justify-content:center;font-size:18px">${m.icon}</div>
              <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:${m.color}">${m.num}</div>
              <p style="font-size:12px;color:var(--text-tertiary)">${m.label}</p>
            </div>
          `).join('')}
        </div>

        <!-- Filters -->
        <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap">
          <input type="date" value="2026-04-01" style="background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px">
          <div class="tab-row">
            <button class="tab active">All</button>
            <button class="tab">IT</button>
            <button class="tab">Sales</button>
            <button class="tab">Marketing</button>
            <button class="tab">Finance</button>
            <button class="tab">HR</button>
          </div>
        </div>

        <!-- AI Recommendations -->
        <div class="section-header"><h2>🤖 AI Recommendations</h2></div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
          ${[
            { priority: 'Urgent', color: 'var(--red)', bg: '#FDE8E8', border: '#ED1C24', msg: 'Call Dara — Not checked in yet, usually arrives by 8:00 AM', icon: '🚨' },
            { priority: 'Warning', color: 'var(--orange)', bg: '#FFF8F0', border: '#E87C1E', msg: 'Sokha late 3× this week — Recommend 1-on-1 conversation', icon: '⚠️' },
            { priority: 'Info', color: '#00A79D', bg: '#F0F9F8', border: '#00A79D', msg: 'IT Dept: 95% checked in — Above average attendance today', icon: 'ℹ️' },
          ].map(a => `
            <div class="card" style="border-left:4px solid ${a.border};display:flex;align-items:center;gap:12px">
              <span style="font-size:18px">${a.icon}</span>
              <div style="flex:1">
                <span class="badge" style="background:${a.bg};color:${a.color};margin-bottom:4px;display:inline-block">${a.priority}</span>
                <p style="font-size:13px;color:var(--text-secondary)">${a.msg}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Not Checked In -->
        <div class="section-header"><h2>❌ Not Checked In (5)</h2></div>
        <div class="stagger-children" style="display:flex;flex-direction:column;gap:8px;margin-bottom:24px">
          ${[
            { init: 'DS', name: 'Dara Sous', dept: 'Sales', note: 'Expected 8:00 AM', action: 'Call to check', bg: '#FDE8E8', color: '#ED1C24' },
            { init: 'RK', name: 'Rathana Kim', dept: 'Marketing', note: 'Has called in sick (approved)', action: '', bg: '#F0F9F8', color: '#00A79D' },
          ].map(e => `
            <div class="card" style="display:flex;align-items:center;gap:14px">
              <div class="avatar avatar-sm" style="background:${e.bg};color:${e.color}">${e.init}</div>
              <div style="flex:1">
                <p style="font-size:13px;font-weight:600">${e.name}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${e.dept} · ${e.note}</p>
              </div>
              ${e.action ? `<button class="btn-glass" style="font-size:11px">📞 ${e.action}</button>` : '<span class="badge badge-teal">Approved</span>'}
            </div>
          `).join('')}
        </div>

        <!-- Late Arrivals -->
        <div class="section-header"><h2>⚠️ Late Arrivals (12)</h2></div>
        <div class="stagger-children" style="display:flex;flex-direction:column;gap:8px;margin-bottom:24px">
          ${[
            { init: 'SP', name: 'Sokha Pen', dept: 'IT', time: '8:25 AM', note: '3rd time this week', bg: '#FFF8F0', color: '#E87C1E' },
            { init: 'PC', name: 'Pisey Chea', dept: 'Finance', time: '8:15 AM', note: 'Traffic issue reported', bg: '#FFF8F0', color: '#E87C1E' },
          ].map(e => `
            <div class="card" style="display:flex;align-items:center;gap:14px">
              <div class="avatar avatar-sm" style="background:${e.bg};color:${e.color}">${e.init}</div>
              <div style="flex:1">
                <p style="font-size:13px;font-weight:600">${e.name}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${e.dept} · ${e.note}</p>
              </div>
              <span style="font-size:13px;font-weight:600;color:var(--orange)">${e.time}</span>
            </div>
          `).join('')}
        </div>

        <!-- Checked In -->
        <div class="section-header">
          <h2>✅ Checked In</h2>
          <a href="#" class="link">View All (287)</a>
        </div>
        <div class="stagger-children" style="display:flex;flex-direction:column;gap:8px">
          ${[
            { init: 'SM', name: 'Sopheak Meas', dept: 'IT', time: '8:05 AM', bg: '#F0F9F8', color: '#00A79D' },
            { init: 'CL', name: 'Chanthy Lim', dept: 'Sales', time: '7:55 AM', bg: '#F0F9F8', color: '#00A79D' },
            { init: 'VN', name: 'Vanna Nob', dept: 'HR', time: '8:00 AM', bg: '#F0F9F8', color: '#00A79D' },
          ].map(e => `
            <div class="card" style="display:flex;align-items:center;gap:14px">
              <div class="avatar avatar-sm" style="background:${e.bg};color:${e.color}">${e.init}</div>
              <div style="flex:1">
                <p style="font-size:13px;font-weight:600">${e.name}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${e.dept}</p>
              </div>
              <span style="font-size:12px;color:var(--teal);font-weight:600">${e.time}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="col-side">
        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Department Summary</h3>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[
              { dept: 'IT', present: 45, total: 48, pct: 94 },
              { dept: 'Sales', present: 82, total: 90, pct: 91 },
              { dept: 'Marketing', present: 35, total: 38, pct: 92 },
              { dept: 'Finance', present: 28, total: 30, pct: 93 },
              { dept: 'HR', present: 18, total: 18, pct: 100 },
            ].map(d => `
              <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                  <span style="font-size:12px;font-weight:600">${d.dept}</span>
                  <span style="font-size:12px;color:var(--text-tertiary)">${d.present}/${d.total} (${d.pct}%)</span>
                </div>
                <div style="height:6px;border-radius:3px;background:var(--border)">
                  <div style="height:100%;width:${d.pct}%;border-radius:3px;background:${d.pct === 100 ? 'var(--teal)' : d.pct >= 93 ? 'var(--teal)' : 'var(--orange)'}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  initTabs(page);
  return page;
});
