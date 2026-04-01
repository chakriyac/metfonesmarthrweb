/* ─── Manager Leave Approvals Page ─── */
Router.register('/manager/leave', function renderManagerLeaveApprovals() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(managerSidebar('/manager/leave'));

  const requests = [
    { init: 'PC', name: 'Pisey Chea', dept: 'IT', type: 'Annual Leave', dates: 'Apr 12–14, 2026', days: 3, reason: 'Family event in Kampot', submitted: '2 hours ago', bg: '#E8F4FD', color: '#007AFF' },
    { init: 'SM', name: 'Sokha Meng', dept: 'Marketing', type: 'Sick Leave', dates: 'Apr 8, 2026', days: 1, reason: 'Medical appointment', submitted: 'Yesterday', bg: '#FFF8F0', color: '#E87C1E' },
    { init: 'VL', name: 'Veasna Lim', dept: 'Operations', type: 'Personal Leave', dates: 'Apr 20, 2026', days: 1, reason: 'Personal errand', submitted: '3 days ago', bg: '#F7F7F8', color: '#8E8E93' },
  ];

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div class="page-header">
          <h1>Leave Approvals</h1>
          <p>Review and manage team leave requests</p>
        </div>

        <div class="stats-row" style="margin-bottom:24px">
          <div class="stat-card"><div class="number" style="color:var(--orange)">3</div><div class="label">Pending</div></div>
          <div class="stat-card"><div class="number" style="color:var(--green)">12</div><div class="label">Approved</div></div>
          <div class="stat-card"><div class="number" style="color:var(--red)">2</div><div class="label">Rejected</div></div>
          <div class="stat-card"><div class="number" style="color:var(--teal)">17</div><div class="label">Total</div></div>
        </div>

        <div class="tab-row" style="margin-bottom:20px">
          <button class="tab active">Pending (3)</button>
          <button class="tab">Approved</button>
          <button class="tab">Rejected</button>
          <button class="tab">All</button>
        </div>

        <div class="section-header"><h2>Pending Requests</h2></div>
        <div class="stagger-children" style="display:flex;flex-direction:column;gap:12px">
          ${requests.map((r, idx) => `
            <div class="card card-lg" id="request-${idx}">
              <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px">
                <div class="avatar avatar-sm" style="background:${r.bg};color:${r.color}">${r.init}</div>
                <div style="flex:1">
                  <p style="font-size:14px;font-weight:600">${r.name}</p>
                  <p style="font-size:11px;color:var(--text-tertiary)">${r.dept}</p>
                </div>
                <span class="badge badge-orange">Pending</span>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px">
                <div>
                  <p style="font-size:11px;color:var(--text-tertiary)">Type</p>
                  <p style="font-size:13px;font-weight:500">${r.type}</p>
                </div>
                <div>
                  <p style="font-size:11px;color:var(--text-tertiary)">Dates</p>
                  <p style="font-size:13px;font-weight:500">${r.dates}</p>
                </div>
                <div>
                  <p style="font-size:11px;color:var(--text-tertiary)">Duration</p>
                  <p style="font-size:13px;font-weight:500">${r.days} day${r.days > 1 ? 's' : ''}</p>
                </div>
              </div>

              <div style="background:var(--glass-bg);backdrop-filter:var(--glass-blur);border-radius:12px;padding:12px;margin-bottom:12px">
                <p style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px">Reason</p>
                <p style="font-size:13px;color:var(--text-secondary)">${r.reason}</p>
                <p style="font-size:10px;color:var(--text-tertiary);margin-top:4px">Submitted ${r.submitted}</p>
              </div>

              <div class="action-area-${idx}">
                <div style="margin-bottom:10px">
                  <textarea class="note-${idx}" style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:12px;padding:10px 14px;font-size:12px;min-height:50px;resize:vertical;font-family:var(--font-text)" placeholder="Add a note (optional)…"></textarea>
                </div>
                <div style="display:flex;gap:8px">
                  <button class="btn-dark" style="flex:1" data-action="approve" data-idx="${idx}">✅ Approve</button>
                  <button class="btn-glass" style="flex:1" data-action="info" data-idx="${idx}">ℹ️ Need More Info</button>
                  <button class="btn-outline-red" style="flex:1" data-action="reject" data-idx="${idx}">❌ Reject</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="col-side">
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Team Availability</h3>
          <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:12px">April 2026</p>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${[
              { date: 'Apr 8', people: 1, names: 'Sokha M. (Sick)', color: 'var(--orange)' },
              { date: 'Apr 10–12', people: 2, names: 'Pisey C. + Vanna N.', color: 'var(--red)' },
              { date: 'Apr 20', people: 1, names: 'Veasna L. (Personal)', color: 'var(--teal)' },
            ].map(d => `
              <div style="display:flex;gap:10px;align-items:center">
                <span style="font-size:12px;font-weight:600;color:var(--text-tertiary);width:65px;flex-shrink:0">${d.date}</span>
                <div style="flex:1">
                  <p style="font-size:12px;font-weight:500">${d.people} off</p>
                  <p style="font-size:10px;color:var(--text-tertiary)">${d.names}</p>
                </div>
                <div style="width:8px;height:8px;border-radius:50%;background:${d.color}"></div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Recent Decisions</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${[
              { name: 'Vanna Nob', action: 'Approved', type: 'Annual Leave', date: 'Apr 10–12', badge: 'badge-green' },
              { name: 'Kosal Vann', action: 'Rejected', type: 'Personal Leave', date: 'Apr 5', badge: 'badge-red' },
              { name: 'Dara Sous', action: 'Approved', type: 'Sick Leave', date: 'Mar 28', badge: 'badge-green' },
            ].map(d => `
              <div style="display:flex;align-items:center;gap:8px">
                <span class="badge ${d.badge}">${d.action}</span>
                <div style="flex:1">
                  <p style="font-size:12px;font-weight:500">${d.name}</p>
                  <p style="font-size:10px;color:var(--text-tertiary)">${d.type} · ${d.date}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  initTabs(page);

  // Approval actions
  setTimeout(() => {
    page.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.idx;
        const action = btn.dataset.action;
        const card = page.querySelector(`#request-${idx}`);
        const area = page.querySelector(`.action-area-${idx}`);
        if (card && area) {
          const labels = { approve: 'Approved', reject: 'Rejected', info: 'Info Requested' };
          const badges = { approve: 'badge-green', reject: 'badge-red', info: 'badge-orange' };
          area.innerHTML = `<div style="text-align:center;padding:12px"><span class="badge ${badges[action]}">${labels[action]}</span></div>`;
          card.querySelector('.badge-orange')?.classList.replace('badge-orange', badges[action]);
          if (card.querySelector('.badge-orange')) card.querySelector('.badge').textContent = labels[action];
        }
      });
    });
  });

  return page;
});
