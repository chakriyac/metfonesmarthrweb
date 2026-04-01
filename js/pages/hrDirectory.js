/* ─── HR Employee Directory — Full Staff List ─── */
Router.register('/hr/directory', function renderHrDirectory() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/directory'));

  const employees = [
    { init: 'DS', name: 'Dara Samnang', email: 'dara.s@metfone.com.kh', phone: '+855 12 300 001', pos: 'HR Officer', dept: 'HR', type: 'Full-Time', location: 'Phnom Penh HQ', joined: 'Jan 2021', tenure: '5 yrs', status: 'Active', perf: 93, avatar: '#F0F9F8', color: '#00A79D' },
    { init: 'VN', name: 'Vanna Nob', email: 'vanna.n@metfone.com.kh', phone: '+855 12 300 002', pos: 'HR Assistant', dept: 'HR', type: 'Full-Time', location: 'Phnom Penh HQ', joined: 'Mar 2022', tenure: '4 yrs', status: 'Active', perf: 91, avatar: '#E8F5E9', color: '#34C759' },
    { init: 'CL', name: 'Chanthy Lim', email: 'chanthy.l@metfone.com.kh', phone: '+855 12 300 003', pos: 'Senior Developer', dept: 'IT', type: 'Full-Time', location: 'Phnom Penh HQ', joined: 'Feb 2021', tenure: '5 yrs', status: 'Active', perf: 94, avatar: '#E0F7F5', color: '#00A79D' },
    { init: 'RK', name: 'Rathana Kim', email: 'rathana.k@metfone.com.kh', phone: '+855 12 300 004', pos: 'Marketing Lead', dept: 'Marketing', type: 'Full-Time', location: 'Phnom Penh HQ', joined: 'Jun 2022', tenure: '4 yrs', status: 'Active', perf: 88, avatar: '#FDE8E8', color: '#ED1C24' },
    { init: 'SP', name: 'Sokha Pen', email: 'sokha.p@metfone.com.kh', phone: '+855 12 300 005', pos: 'IT Support', dept: 'IT', type: 'Full-Time', location: 'Phnom Penh HQ', joined: 'Aug 2023', tenure: '3 yrs', status: 'Active', perf: 85, avatar: '#FFF8F0', color: '#E87C1E' },
    { init: 'PT', name: 'Pheakdey Thun', email: 'pheakdey.t@metfone.com.kh', phone: '+855 12 300 006', pos: 'Accountant', dept: 'Finance', type: 'Full-Time', location: 'Phnom Penh HQ', joined: 'May 2023', tenure: '3 yrs', status: 'Active', perf: 82, avatar: '#F7F7F8', color: '#8E8E93' },
    { init: 'SM', name: 'Sopheap Meas', email: 'sopheap.m@metfone.com.kh', phone: '+855 12 300 007', pos: 'Manager', dept: 'IT', type: 'Full-Time', location: 'Phnom Penh HQ', joined: 'Jan 2020', tenure: '6 yrs', status: 'Active', perf: 96, avatar: '#E8F5E9', color: '#34C759' },
    { init: 'KC', name: 'Kosal Chan', email: 'kosal.c@metfone.com.kh', phone: '+855 12 300 008', pos: 'Network Engineer', dept: 'IT', type: 'Full-Time', location: 'Siem Reap', joined: 'Apr 2022', tenure: '4 yrs', status: 'Active', perf: 87, avatar: '#F0F9F8', color: '#00A79D' },
    { init: 'LS', name: 'Leakhena Sok', email: 'leakhena.s@metfone.com.kh', phone: '+855 12 300 009', pos: 'Finance Officer', dept: 'Finance', type: 'Full-Time', location: 'Phnom Penh HQ', joined: 'Sep 2021', tenure: '5 yrs', status: 'Active', perf: 90, avatar: '#E0F7F5', color: '#00A79D' },
    { init: 'NV', name: 'Nary Vong', email: 'nary.v@metfone.com.kh', phone: '+855 12 300 010', pos: 'Customer Service Rep', dept: 'Customer Service', type: 'Full-Time', location: 'Battambang', joined: 'Nov 2023', tenure: '2 yrs', status: 'Active', perf: 79, avatar: '#FFF8F0', color: '#E87C1E' },
    { init: 'BC', name: 'Bopha Chea', email: 'bopha.c@metfone.com.kh', phone: '+855 12 300 011', pos: 'UI/UX Designer', dept: 'IT', type: 'Full-Time', location: 'Phnom Penh HQ', joined: 'Jul 2022', tenure: '4 yrs', status: 'Active', perf: 92, avatar: '#FDE8E8', color: '#ED1C24' },
    { init: 'TS', name: 'Theary Sun', email: 'theary.s@metfone.com.kh', phone: '+855 12 300 012', pos: 'Data Analyst', dept: 'Business Intelligence', type: 'Full-Time', location: 'Phnom Penh HQ', joined: 'Feb 2024', tenure: '2 yrs', status: 'Active', perf: 84, avatar: '#E8F5E9', color: '#34C759' },
    { init: 'MH', name: 'Mony Heng', email: 'mony.h@metfone.com.kh', phone: '+855 12 300 013', pos: 'Content Writer', dept: 'Marketing', type: 'Part-Time', location: 'Remote', joined: 'Oct 2024', tenure: '1 yr', status: 'Active', perf: 76, avatar: '#F7F7F8', color: '#8E8E93' },
    { init: 'PL', name: 'Pisey Leng', email: 'pisey.l@metfone.com.kh', phone: '+855 12 300 014', pos: 'QA Engineer', dept: 'IT', type: 'Full-Time', location: 'Phnom Penh HQ', joined: 'Mar 2023', tenure: '3 yrs', status: 'Active', perf: 86, avatar: '#F0F9F8', color: '#00A79D' },
    { init: 'SY', name: 'Sothea Yim', email: 'sothea.y@metfone.com.kh', phone: '+855 12 300 015', pos: 'Sales Executive', dept: 'Sales', type: 'Full-Time', location: 'Sihanoukville', joined: 'Jun 2023', tenure: '3 yrs', status: 'On Leave', perf: 81, avatar: '#FFF8F0', color: '#E87C1E' },
    { init: 'KT', name: 'Kunthea Tep', email: 'kunthea.t@metfone.com.kh', phone: '+855 12 300 016', pos: 'Payroll Specialist', dept: 'Finance', type: 'Full-Time', location: 'Phnom Penh HQ', joined: 'Jan 2022', tenure: '4 yrs', status: 'Active', perf: 89, avatar: '#E0F7F5', color: '#00A79D' },
    { init: 'DV', name: 'Davith Var', email: 'davith.v@metfone.com.kh', phone: '+855 12 300 017', pos: 'Security Officer', dept: 'Operations', type: 'Full-Time', location: 'Phnom Penh HQ', joined: 'May 2020', tenure: '6 yrs', status: 'Active', perf: 83, avatar: '#F7F7F8', color: '#8E8E93' },
    { init: 'CR', name: 'Chantha Ros', email: 'chantha.r@metfone.com.kh', phone: '+855 12 300 018', pos: 'Intern', dept: 'HR', type: 'Internship', location: 'Phnom Penh HQ', joined: 'Jan 2026', tenure: '3 mos', status: 'Active', perf: 74, avatar: '#E8F5E9', color: '#34C759' },
  ];

  const departments = [...new Set(employees.map(e => e.dept))].sort();
  const locations = [...new Set(employees.map(e => e.location))].sort();

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div style="max-width:1060px">
      <div class="page-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px">
        <div>
          <h1>Employee Directory</h1>
          <p>${employees.length} employees across ${departments.length} departments</p>
        </div>
        <button class="btn-glass" style="font-size:13px;padding:10px 20px">⬇ Export CSV</button>
      </div>

      <!-- Filters -->
      <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap">
        <div style="flex:1;min-width:200px">
          <input type="text" id="emp-search" placeholder="🔍  Search by name, role, email…" style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px">
        </div>
        <select id="dept-filter" style="background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px">
          <option value="all">All Departments</option>
          ${departments.map(d => `<option value="${d}">${d}</option>`).join('')}
        </select>
        <select id="loc-filter" style="background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px">
          <option value="all">All Locations</option>
          ${locations.map(l => `<option value="${l}">${l}</option>`).join('')}
        </select>
        <select id="status-filter" style="background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px">
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
        </select>
      </div>

      <!-- Summary cards -->
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:28px">
        ${[
          { num: employees.length, label: 'Total Staff', color: 'var(--teal)', icon: '👥' },
          { num: employees.filter(e => e.status === 'Active').length, label: 'Active', color: 'var(--green)', icon: '✅' },
          { num: employees.filter(e => e.status === 'On Leave').length, label: 'On Leave', color: 'var(--orange)', icon: '🏖️' },
          { num: departments.length, label: 'Departments', color: 'var(--red)', icon: '🏢' },
          { num: locations.length, label: 'Locations', color: 'var(--text-secondary)', icon: '📍' },
        ].map(s => `
          <div class="card" style="padding:16px 18px;border-radius:18px;text-align:center;position:relative;overflow:hidden">
            <div style="position:absolute;top:8px;right:10px;font-size:16px;opacity:0.4">${s.icon}</div>
            <div style="font-family:var(--font-display);font-size:24px;font-weight:800;color:${s.color}">${s.num}</div>
            <div style="font-size:11px;color:var(--text-tertiary)">${s.label}</div>
          </div>
        `).join('')}
      </div>

      <!-- Table header -->
      <div style="display:grid;grid-template-columns:44px 1fr 1fr 100px 80px 70px 80px;gap:12px;padding:8px 20px;font-size:11px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.5px">
        <span></span>
        <span>EMPLOYEE</span>
        <span>DEPARTMENT / ROLE</span>
        <span>LOCATION</span>
        <span>TENURE</span>
        <span>PERF</span>
        <span>STATUS</span>
      </div>

      <!-- Employee rows -->
      <div id="emp-list" class="stagger-children" style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
        ${employees.map(e => `
          <div class="card emp-row" data-name="${e.name.toLowerCase()}" data-email="${e.email}" data-pos="${e.pos.toLowerCase()}" data-dept="${e.dept}" data-loc="${e.location}" data-status="${e.status}" style="display:grid;grid-template-columns:44px 1fr 1fr 100px 80px 70px 80px;gap:12px;align-items:center;padding:14px 20px;border-radius:16px;cursor:pointer;transition:all 0.2s">
            <div style="width:40px;height:40px;border-radius:50%;background:${e.avatar};color:${e.color};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;border:1.5px solid rgba(255,255,255,0.5)">${e.init}</div>

            <div style="min-width:0">
              <p style="font-size:13px;font-weight:700;color:var(--black);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${e.name}</p>
              <p style="font-size:11px;color:var(--text-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${e.email}</p>
            </div>

            <div style="min-width:0">
              <p style="font-size:13px;font-weight:600;color:var(--black);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${e.pos}</p>
              <p style="font-size:11px;color:var(--text-tertiary)">${e.dept} · ${e.type}</p>
            </div>

            <span style="font-size:12px;color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${e.location}</span>

            <span style="font-size:12px;color:var(--text-secondary)">${e.tenure}</span>

            <div>
              <span style="font-size:14px;font-weight:700;color:${e.perf >= 90 ? 'var(--green)' : e.perf >= 80 ? 'var(--teal)' : 'var(--orange)'}">${e.perf}%</span>
            </div>

            <span class="badge ${e.status === 'Active' ? 'badge-green' : e.status === 'On Leave' ? 'badge-orange' : 'badge-gray'}" style="font-size:10px;padding:4px 10px;justify-self:start">${e.status}</span>
          </div>
        `).join('')}
      </div>

      <!-- Count -->
      <p id="emp-count" style="font-size:12px;color:var(--text-tertiary);margin-top:16px;margin-bottom:40px">Showing ${employees.length} of ${employees.length} employees</p>
    </div>`;

  page.appendChild(main);

  // Filtering
  setTimeout(() => {
    const search = page.querySelector('#emp-search');
    const deptF = page.querySelector('#dept-filter');
    const locF = page.querySelector('#loc-filter');
    const statusF = page.querySelector('#status-filter');
    const list = page.querySelector('#emp-list');
    const count = page.querySelector('#emp-count');
    const total = employees.length;

    function applyFilters() {
      const q = search.value.toLowerCase();
      const dept = deptF.value;
      const loc = locF.value;
      const status = statusF.value;
      let visible = 0;

      list.querySelectorAll('.emp-row').forEach(row => {
        const mSearch = !q || row.dataset.name.includes(q) || row.dataset.email.includes(q) || row.dataset.pos.includes(q);
        const mDept = dept === 'all' || row.dataset.dept === dept;
        const mLoc = loc === 'all' || row.dataset.loc === loc;
        const mStatus = status === 'all' || row.dataset.status === status;
        const show = mSearch && mDept && mLoc && mStatus;
        row.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      count.textContent = 'Showing ' + visible + ' of ' + total + ' employees';
    }

    search.addEventListener('input', applyFilters);
    deptF.addEventListener('change', applyFilters);
    locF.addEventListener('change', applyFilters);
    statusF.addEventListener('change', applyFilters);
  });

  return page;
});
