/* ─── Leave Management Page ─── */
Router.register('/employee/leave', function renderLeaveManagement() {
  const page = el('div', { className: 'app-layout fade-in' });
  const role = sessionStorage.getItem('loginRole');
  page.appendChild(role === 'manager' ? managerSidebar('/employee/leave') : employeeSidebar('/employee/leave'));

  const requests = [
    { type: 'Annual Leave', dates: 'Apr 25–28, 2026', days: 4, reason: 'Travel plans', status: 'Pending', badge: 'badge-orange' },
    { type: 'Sick Leave', dates: 'Apr 7, 2026', days: 1, reason: 'Dental surgery follow-up', status: 'Pending', badge: 'badge-orange' },
    { type: 'Annual Leave', dates: 'Apr 10–12, 2026', days: 3, reason: 'Family event in Siem Reap', status: 'Approved', badge: 'badge-green' },
    { type: 'Sick Leave', dates: 'Mar 15, 2026', days: 1, reason: 'Medical appointment', status: 'Approved', badge: 'badge-green' },
    { type: 'Annual Leave', dates: 'Mar 3–4, 2026', days: 2, reason: 'Khmer New Year preparation', status: 'Approved', badge: 'badge-green' },
    { type: 'Personal Leave', dates: 'Feb 20, 2026', days: 1, reason: 'Personal errand', status: 'Approved', badge: 'badge-green' },
    { type: 'Sick Leave', dates: 'Feb 10, 2026', days: 2, reason: 'Fever and cold', status: 'Approved', badge: 'badge-green' },
    { type: 'Annual Leave', dates: 'Jan 27–28, 2026', days: 2, reason: 'Wedding attendance', status: 'Approved', badge: 'badge-green' },
    { type: 'Personal Leave', dates: 'Jan 15, 2026', days: 1, reason: 'Bank appointment', status: 'Rejected', badge: 'badge-red' },
    { type: 'Sick Leave', dates: 'Jan 8, 2026', days: 1, reason: 'Flu recovery', status: 'Rejected', badge: 'badge-red' },
    { type: 'Annual Leave', dates: 'Dec 29–31, 2025', days: 3, reason: 'New Year holiday trip', status: 'Approved', badge: 'badge-green' },
    { type: 'Personal Leave', dates: 'Dec 5, 2025', days: 1, reason: 'House move', status: 'Approved', badge: 'badge-green' },
  ];

  let activeFilter = 'All';

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
          <div>
            <h1 style="font-family:var(--font-display);font-size:24px;font-weight:700">Leave Management</h1>
            <p style="font-size:13px;color:var(--text-tertiary)">Request & track your time off</p>
          </div>
          <button class="btn-dark" id="new-leave-btn">+ Create Request</button>
        </div>

        <!-- Leave Balance -->
        <div class="hero-card" style="margin-bottom:24px;display:flex;align-items:center;justify-content:space-around;padding:28px 24px">
          <div style="text-align:center">
            <div style="width:90px;height:90px;border-radius:50%;border:6px solid var(--teal);display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 8px">
              <span style="font-family:var(--font-display);font-size:28px;font-weight:800">12</span>
              <span style="font-size:10px;color:var(--text-tertiary)">days</span>
            </div>
            <p style="font-size:13px;font-weight:600">Available</p>
          </div>
          <div style="width:1px;height:60px;background:rgba(255,255,255,0.3)"></div>
          <div style="text-align:center">
            <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:var(--orange)">6</div>
            <p style="font-size:12px;color:var(--text-tertiary)">Days Used</p>
          </div>
          <div style="width:1px;height:60px;background:rgba(255,255,255,0.3)"></div>
          <div style="text-align:center">
            <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:var(--red)">1</div>
            <p style="font-size:12px;color:var(--text-tertiary)">Pending</p>
          </div>
        </div>

        <div style="margin-bottom:12px">
          <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:6px">Annual Leave Balance: 12 / 18 days (66% remaining)</p>
          <div style="height:8px;border-radius:4px;background:var(--border)">
            <div style="height:100%;width:66%;border-radius:4px;background:linear-gradient(90deg,var(--teal),var(--mint))"></div>
          </div>
        </div>

        <div class="tab-row" style="margin:20px 0 16px" id="leave-tabs">
          <button class="tab active" data-filter="All">All</button>
          <button class="tab" data-filter="Pending">Pending</button>
          <button class="tab" data-filter="Approved">Approved</button>
          <button class="tab" data-filter="Rejected">Rejected</button>
        </div>

        <div id="leave-list" class="stagger-children" style="display:flex;flex-direction:column;gap:8px">
        </div>
      </div>

      <div class="col-side">
        <div class="card card-lg" id="leave-form" style="display:none">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:16px">New Leave Request</h3>
          <div style="margin-bottom:12px">
            <label style="font-size:11px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;display:block;margin-bottom:6px">LEAVE TYPE</label>
            <select style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:12px 16px;font-size:13px">
              <option>Annual Leave</option>
              <option>Sick Leave</option>
              <option>Personal Leave</option>
              <option>Maternity / Paternity</option>
            </select>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
            <div>
              <label style="font-size:11px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;display:block;margin-bottom:6px">START DATE</label>
              <input type="date" style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:12px 16px;font-size:13px">
            </div>
            <div>
              <label style="font-size:11px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;display:block;margin-bottom:6px">END DATE</label>
              <input type="date" style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:12px 16px;font-size:13px">
            </div>
          </div>
          <div style="margin-bottom:16px">
            <label style="font-size:11px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;display:block;margin-bottom:6px">REASON</label>
            <textarea style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:12px 16px;font-size:13px;min-height:80px;resize:vertical;font-family:var(--font-text)" placeholder="Describe your reason…"></textarea>
          </div>
          <p style="font-size:11px;color:var(--text-tertiary);margin-bottom:16px">Your manager will be notified for approval.</p>
          <button class="btn-dark" style="width:100%">Submit Request</button>
        </div>

        <div class="card card-lg" id="leave-info">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Leave Types</h3>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[
              { icon: '🏖️', type: 'Annual Leave', total: '18 days/year', used: '6 used' },
              { icon: '🏥', type: 'Sick Leave', total: '30 days/year', used: '1 used' },
              { icon: '📋', type: 'Personal Leave', total: '5 days/year', used: '1 used' },
              { icon: '👶', type: 'Maternity', total: '90 days', used: '0 used' },
            ].map(l => `
              <div style="display:flex;gap:10px;align-items:center">
                <span style="font-size:18px">${l.icon}</span>
                <div style="flex:1">
                  <p style="font-size:13px;font-weight:600">${l.type}</p>
                  <p style="font-size:11px;color:var(--text-tertiary)">${l.total} · ${l.used}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);

  function renderLeaveList() {
    const list = page.querySelector('#leave-list');
    if (!list) return;
    const filtered = activeFilter === 'All' ? requests : requests.filter(r => r.status === activeFilter);
    if (filtered.length === 0) {
      list.innerHTML = `<div style="text-align:center;padding:40px 20px">
        <p style="font-size:32px;margin-bottom:8px">📭</p>
        <p style="font-size:14px;font-weight:600;color:var(--text-secondary);margin-bottom:4px">No ${activeFilter.toLowerCase()} requests</p>
        <p style="font-size:12px;color:var(--text-tertiary)">Your ${activeFilter.toLowerCase()} leave requests will appear here.</p>
      </div>`;
      return;
    }
    list.innerHTML = filtered.map(r => `
      <div class="card" style="display:flex;align-items:center;gap:14px">
        <div style="width:40px;height:40px;border-radius:10px;background:${r.status === 'Approved' ? '#F0F9F8' : r.status === 'Pending' ? '#FFF8F0' : '#FDE8E8'};display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">
          ${r.type === 'Annual Leave' ? '🏖️' : r.type === 'Sick Leave' ? '🏥' : '📋'}
        </div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">
            <p style="font-size:13px;font-weight:600">${r.type}</p>
            <span style="font-size:11px;color:var(--text-tertiary)">${r.days} day${r.days > 1 ? 's' : ''}</span>
          </div>
          <p style="font-size:11px;color:var(--text-tertiary)">${r.dates}</p>
          <p style="font-size:11px;color:var(--text-secondary);margin-top:2px">${r.reason}</p>
        </div>
        <span class="badge ${r.badge}">${r.status}</span>
      </div>
    `).join('');
  }

  // Tab filter + toggle leave form
  setTimeout(() => {
    /* Filter tabs */
    const tabs = page.querySelectorAll('#leave-tabs .tab');
    tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      activeFilter = t.dataset.filter;
      renderLeaveList();
    }));

    /* Initial render */
    renderLeaveList();

    /* Toggle leave form */
    const btn = page.querySelector('#new-leave-btn');
    const form = page.querySelector('#leave-form');
    const info = page.querySelector('#leave-info');
    if (btn && form && info) {
      btn.addEventListener('click', () => {
        const showing = form.style.display !== 'none';
        form.style.display = showing ? 'none' : 'block';
        info.style.display = showing ? 'block' : 'none';
        btn.textContent = showing ? '+ Create Request' : '✕ Cancel';
      });
    }
  });

  return page;
});
