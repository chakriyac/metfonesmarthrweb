/* ─── HR Employee Management — AI Turnover Prediction ─── */
Router.register('/hr/employees', function renderHrEmployeeManagement() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/employees'));

  const highRisk = [
    { init: 'CL', name: 'Chanthy Lim', pos: 'Senior Developer', dept: 'IT', tenure: '5 yrs', risk: 88, bg: '#FDE8E8', color: '#ED1C24',
      signals: ['LinkedIn updated recently', 'Engagement dropping', 'Overtime surging (burnout)'],
      actions: ['Schedule career discussion', 'Workload adjustment', 'Retention bonus consideration'] },
    { init: 'RK', name: 'Rathana Kim', pos: 'Marketing Lead', dept: 'Marketing', tenure: '4 yrs', risk: 82, bg: '#FDE8E8', color: '#ED1C24',
      signals: ['Decreased participation in meetings', 'Used all personal leave days', 'Compensation below market rate'],
      actions: ['Salary review discussion', 'Role expansion proposal'] },
  ];

  const medRisk = [
    { init: 'SP', name: 'Sokha Pen', pos: 'IT Support', dept: 'IT', tenure: '2 yrs', risk: 65, bg: '#FFF8F0', color: '#E87C1E' },
    { init: 'PT', name: 'Pheakdey Thun', pos: 'Accountant', dept: 'Finance', tenure: '3 yrs', risk: 58, bg: '#FFF8F0', color: '#E87C1E' },
  ];

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div class="page-header">
          <h1>Employee Management</h1>
          <p>AI-powered turnover prediction & retention</p>
        </div>

        <div style="display:flex;gap:12px;margin-bottom:16px">
          <div style="flex:1">
            <input type="text" placeholder="🔍  Search employees…" style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:16px;padding:12px 16px;font-size:13px">
          </div>
        </div>

        <div class="tab-row" style="margin-bottom:20px">
          <button class="tab active">All</button>
          <button class="tab">High Risk</button>
          <button class="tab">Medium Risk</button>
          <button class="tab">Low Risk</button>
          <button class="tab">New Hires</button>
        </div>

        <!-- AI Risk Overview -->
        <div class="section-header"><h2>🤖 AI Turnover Prediction</h2></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px">
          ${[
            { label: 'High Risk', count: 8, pct: '85%+', color: 'var(--red)', bg: '#FDE8E8' },
            { label: 'Medium Risk', count: 15, pct: '50–85%', color: 'var(--orange)', bg: '#FFF8F0' },
            { label: 'Low Risk', count: 212, pct: '<50%', color: 'var(--green)', bg: '#E8F5E9' },
          ].map(r => `
            <div class="card" style="text-align:center;padding:20px">
              <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:${r.color}">${r.count}</div>
              <p style="font-size:13px;font-weight:600;margin-bottom:2px">${r.label}</p>
              <p style="font-size:11px;color:var(--text-tertiary)">${r.pct} risk score</p>
            </div>
          `).join('')}
        </div>

        <div class="card" style="background:linear-gradient(135deg,rgba(0,167,157,0.1),rgba(52,199,89,0.1));border-left:4px solid var(--teal);margin-bottom:24px;display:flex;gap:12px;align-items:center">
          <span style="font-size:24px">💰</span>
          <div>
            <p style="font-size:14px;font-weight:700;color:var(--teal)">Potential savings: $900,000/year</p>
            <p style="font-size:12px;color:var(--text-tertiary)">By retaining 30% of at-risk employees</p>
          </div>
        </div>

        <!-- High Risk -->
        <div class="section-header"><h2 style="color:var(--red)">🔴 High Risk Employees (8)</h2></div>
        <div class="stagger-children" style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px">
          ${highRisk.map(e => `
            <div class="card card-lg">
              <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px">
                <div class="avatar avatar-sm" style="background:${e.bg};color:${e.color}">${e.init}</div>
                <div style="flex:1">
                  <p style="font-size:14px;font-weight:600">${e.name}</p>
                  <p style="font-size:11px;color:var(--text-tertiary)">${e.pos} · ${e.dept} · ${e.tenure}</p>
                </div>
                <div style="width:48px;height:48px;border-radius:50%;border:3px solid var(--red);display:flex;align-items:center;justify-content:center">
                  <span style="font-size:14px;font-weight:800;color:var(--red)">${e.risk}%</span>
                </div>
              </div>
              <div style="margin-bottom:12px">
                <p style="font-size:11px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.6px;margin-bottom:6px">🔍 AI SIGNALS</p>
                <div style="display:flex;flex-wrap:wrap;gap:6px">
                  ${e.signals.map(s => `<span class="badge badge-red" style="font-size:10px">${s}</span>`).join('')}
                </div>
              </div>
              <div>
                <p style="font-size:11px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.6px;margin-bottom:6px">💡 AI RECOMMENDATIONS</p>
                <div style="display:flex;flex-wrap:wrap;gap:6px">
                  ${e.actions.map(a => `<button class="btn-glass" style="font-size:11px;padding:6px 12px">${a}</button>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Medium Risk -->
        <div class="section-header"><h2 style="color:var(--orange)">🟡 Medium Risk (15)</h2></div>
        <div class="stagger-children" style="display:flex;flex-direction:column;gap:8px">
          ${medRisk.map(e => `
            <div class="card" style="display:flex;align-items:center;gap:14px">
              <div class="avatar avatar-sm" style="background:${e.bg};color:${e.color}">${e.init}</div>
              <div style="flex:1">
                <p style="font-size:13px;font-weight:600">${e.name}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${e.pos} · ${e.dept} · ${e.tenure}</p>
              </div>
              <div style="width:40px;height:40px;border-radius:50%;border:3px solid var(--orange);display:flex;align-items:center;justify-content:center">
                <span style="font-size:12px;font-weight:800;color:var(--orange)">${e.risk}%</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="col-side">
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Recent Actions</h3>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[
              { action: 'Retention bonus offered', emp: 'Chanthy Lim', result: 'Risk reduced 85% → 45%', time: '2 days ago', color: 'var(--green)' },
              { action: 'Career discussion scheduled', emp: 'Rathana Kim', result: 'Pending meeting', time: 'Yesterday', color: 'var(--orange)' },
              { action: 'Workload redistributed', emp: 'Sokha Pen', result: 'Overtime -40%', time: '1 week ago', color: 'var(--teal)' },
            ].map(a => `
              <div style="display:flex;gap:10px">
                <div style="width:8px;height:8px;border-radius:50%;background:${a.color};flex-shrink:0;margin-top:5px"></div>
                <div>
                  <p style="font-size:12px;font-weight:600">${a.action}</p>
                  <p style="font-size:11px;color:var(--text-secondary)">${a.emp} — ${a.result}</p>
                  <p style="font-size:10px;color:var(--text-tertiary)">${a.time}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Workforce Stats</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${[
              { label: 'Total Employees', value: '235' },
              { label: 'Avg Tenure', value: '3.2 years' },
              { label: 'Turnover Rate (YTD)', value: '4.2%' },
              { label: 'New Hires (Q1)', value: '12' },
              { label: 'Open Positions', value: '8' },
            ].map(s => `
              <div style="display:flex;justify-content:space-between">
                <span style="font-size:12px;color:var(--text-tertiary)">${s.label}</span>
                <span style="font-size:12px;font-weight:600">${s.value}</span>
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
