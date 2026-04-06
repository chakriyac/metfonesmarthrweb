/* ─── HR Attendance Dashboard Page ─── */
Router.register('/hr/attendance', function renderHrAttendance() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/attendance'));

  /* ── Full employee attendance data ── */
  const allEmployees = [
    { id:'E001',name:'Sopheak Meas',init:'SM',dept:'IT',position:'Senior Developer',checkIn:'07:55',checkOut:'17:05',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E002',name:'Chanthy Lim',init:'CL',dept:'Sales',position:'Sales Executive',checkIn:'07:50',checkOut:'17:00',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E003',name:'Vanna Nob',init:'VN',dept:'HR',position:'HR Associate',checkIn:'08:00',checkOut:'17:10',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E004',name:'Sokha Pen',init:'SP',dept:'IT',position:'QA Engineer',checkIn:'08:25',checkOut:'17:30',status:'Late',bg:'#FFF8F0',color:'#E87C1E' },
    { id:'E005',name:'Pisey Chea',init:'PC',dept:'Finance',position:'Accountant',checkIn:'08:15',checkOut:'17:00',status:'Late',bg:'#FFF8F0',color:'#E87C1E' },
    { id:'E006',name:'Dara Sous',init:'DS',dept:'Sales',position:'Sales Manager',checkIn:'—',checkOut:'—',status:'Absent',bg:'#FDE8E8',color:'#ED1C24' },
    { id:'E007',name:'Rathana Kim',init:'RK',dept:'Marketing',position:'Content Writer',checkIn:'—',checkOut:'—',status:'Sick Leave',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E008',name:'Bopha Srey',init:'BS',dept:'IT',position:'Frontend Developer',checkIn:'07:58',checkOut:'17:02',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E009',name:'Kosal Vann',init:'KV',dept:'Marketing',position:'Social Media Manager',checkIn:'08:20',checkOut:'17:15',status:'Late',bg:'#FFF8F0',color:'#E87C1E' },
    { id:'E010',name:'Sreyneang Mao',init:'SM',dept:'Finance',position:'Finance Manager',checkIn:'07:45',checkOut:'17:00',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E011',name:'Pheakdey Heng',init:'PH',dept:'IT',position:'Backend Developer',checkIn:'08:10',checkOut:'17:20',status:'Late',bg:'#FFF8F0',color:'#E87C1E' },
    { id:'E012',name:'Theary Kong',init:'TK',dept:'HR',position:'Training Lead',checkIn:'07:52',checkOut:'17:05',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E013',name:'Visal Deth',init:'VD',dept:'HR',position:'HR Specialist',checkIn:'07:48',checkOut:'17:00',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E014',name:'Narith Seng',init:'NS',dept:'Sales',position:'Sales Rep',checkIn:'08:22',checkOut:'17:10',status:'Late',bg:'#FFF8F0',color:'#E87C1E' },
    { id:'E015',name:'Maly Ouk',init:'MO',dept:'Marketing',position:'Marketing Manager',checkIn:'07:55',checkOut:'17:00',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E016',name:'Rithy Chan',init:'RC',dept:'IT',position:'DevOps Engineer',checkIn:'07:50',checkOut:'17:05',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E017',name:'Leak Chhem',init:'LC',dept:'Finance',position:'Budget Analyst',checkIn:'—',checkOut:'—',status:'Annual Leave',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E018',name:'Phearun Mak',init:'PM',dept:'IT',position:'Product Manager',checkIn:'08:05',checkOut:'17:15',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E019',name:'Sambo Tith',init:'ST',dept:'Sales',position:'Regional Lead',checkIn:'07:40',checkOut:'17:00',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E020',name:'Sopheap Noun',init:'SN',dept:'IT',position:'Mobile Developer',checkIn:'08:30',checkOut:'17:35',status:'Late',bg:'#FFF8F0',color:'#E87C1E' },
    { id:'E021',name:'Kanha Ros',init:'KR',dept:'HR',position:'Recruiter',checkIn:'07:58',checkOut:'17:00',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E022',name:'Vuthy Tan',init:'VT',dept:'Finance',position:'Payroll Officer',checkIn:'07:55',checkOut:'17:10',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E023',name:'Chantha Ek',init:'CE',dept:'Marketing',position:'Graphic Designer',checkIn:'08:18',checkOut:'17:20',status:'Late',bg:'#FFF8F0',color:'#E87C1E' },
    { id:'E024',name:'Piseth Khim',init:'PK',dept:'Sales',position:'Account Manager',checkIn:'—',checkOut:'—',status:'Absent',bg:'#FDE8E8',color:'#ED1C24' },
    { id:'E025',name:'Nary Chhim',init:'NC',dept:'IT',position:'UI/UX Designer',checkIn:'08:02',checkOut:'17:05',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E026',name:'Rith Hak',init:'RH',dept:'Sales',position:'Business Dev',checkIn:'07:48',checkOut:'17:00',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E027',name:'Sokly Meng',init:'SM',dept:'Finance',position:'Senior Accountant',checkIn:'07:50',checkOut:'17:00',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E028',name:'Davy Phan',init:'DP',dept:'Marketing',position:'Brand Specialist',checkIn:'—',checkOut:'—',status:'Annual Leave',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E029',name:'Makara Sen',init:'MS',dept:'IT',position:'System Admin',checkIn:'07:30',checkOut:'17:00',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
    { id:'E030',name:'Thida Oum',init:'TO',dept:'HR',position:'HR Director',checkIn:'07:45',checkOut:'17:30',status:'On Time',bg:'#F0F9F8',color:'#00A79D' },
  ];

  /* ── State ── */
  let filterDept = 'All';
  let filterStatus = 'All';
  let filterDateFrom = '2026-04-01';
  let filterDateTo = '2026-04-06';
  let filterStaffId = '';
  let searchQuery = '';
  let sortCol = 'name';
  let sortAsc = true;

  /* ── Derived stats ── */
  function getStats(data) {
    return {
      checkedIn: data.filter(e => e.status === 'On Time').length,
      late: data.filter(e => e.status === 'Late').length,
      absent: data.filter(e => e.status === 'Absent').length,
      leave: data.filter(e => e.status.includes('Leave') || e.status === 'Sick Leave').length,
    };
  }

  const departments = ['All', ...new Set(allEmployees.map(e => e.dept))];
  const statuses = ['All', 'On Time', 'Late', 'Absent', 'Sick Leave', 'Annual Leave'];

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
          <div class="page-header" style="margin-bottom:0">
            <h1>Attendance Dashboard</h1>
            <p>Real-time employee attendance monitoring</p>
          </div>
          <div style="display:flex;gap:8px">
            <button id="btn-export-excel" style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:14px;border:1.5px solid rgba(0,167,157,0.3);background:rgba(0,167,157,0.04);color:var(--teal);font-size:12px;font-weight:700;cursor:pointer;transition:all 0.15s">
              📥 Export Excel
            </button>
            <button id="btn-export-filtered" style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:14px;border:1.5px solid rgba(232,124,30,0.3);background:rgba(232,124,30,0.04);color:var(--orange);font-size:12px;font-weight:700;cursor:pointer;transition:all 0.15s">
              📊 Export Filtered
            </button>
          </div>
        </div>

        <!-- Real-time Metrics -->
        <div id="att-stats" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px"></div>

        <!-- Filters -->
        <div class="card" style="padding:18px;margin-bottom:20px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <p style="font-size:11px;font-weight:700;color:var(--teal);text-transform:uppercase;letter-spacing:0.5px">🔍 Filter Attendance</p>
            <button id="att-reset" style="padding:6px 14px;border-radius:10px;border:1.5px solid var(--glass-border);background:transparent;font-size:10px;font-weight:600;cursor:pointer;color:var(--text-tertiary);display:flex;align-items:center;gap:4px">↺ Reset All</button>
          </div>
          <!-- Row 1: Date range -->
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:12px">
            <div>
              <label style="font-size:9px;font-weight:700;color:var(--text-tertiary);display:block;margin-bottom:4px;text-transform:uppercase">From Date</label>
              <input id="att-date-from" type="date" value="${filterDateFrom}" style="background:var(--glass-bg);border:1.5px solid var(--glass-border);border-radius:12px;padding:8px 14px;font-size:12px">
            </div>
            <span style="font-size:12px;color:var(--text-tertiary);padding-bottom:8px">→</span>
            <div>
              <label style="font-size:9px;font-weight:700;color:var(--text-tertiary);display:block;margin-bottom:4px;text-transform:uppercase">To Date</label>
              <input id="att-date-to" type="date" value="${filterDateTo}" style="background:var(--glass-bg);border:1.5px solid var(--glass-border);border-radius:12px;padding:8px 14px;font-size:12px">
            </div>
            <div style="display:flex;gap:6px;padding-bottom:2px">
              <button class="att-quick-date" data-range="today" style="padding:5px 10px;border-radius:8px;border:1.5px solid rgba(0,167,157,0.2);background:rgba(0,167,157,0.04);font-size:10px;font-weight:700;cursor:pointer;color:var(--teal)">Today</button>
              <button class="att-quick-date" data-range="week" style="padding:5px 10px;border-radius:8px;border:1.5px solid var(--glass-border);background:transparent;font-size:10px;font-weight:700;cursor:pointer;color:var(--text-secondary)">This Week</button>
              <button class="att-quick-date" data-range="month" style="padding:5px 10px;border-radius:8px;border:1.5px solid var(--glass-border);background:transparent;font-size:10px;font-weight:700;cursor:pointer;color:var(--text-secondary)">This Month</button>
            </div>
          </div>
          <!-- Row 2: Department, Status, Staff ID -->
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:12px">
            <div>
              <label style="font-size:9px;font-weight:700;color:var(--text-tertiary);display:block;margin-bottom:4px;text-transform:uppercase">Department</label>
              <select id="att-dept" style="background:var(--glass-bg);border:1.5px solid var(--glass-border);border-radius:12px;padding:8px 14px;font-size:12px;min-width:130px">
                ${departments.map(d => '<option value="' + d + '">' + d + '</option>').join('')}
              </select>
            </div>
            <div>
              <label style="font-size:9px;font-weight:700;color:var(--text-tertiary);display:block;margin-bottom:4px;text-transform:uppercase">Status</label>
              <select id="att-status" style="background:var(--glass-bg);border:1.5px solid var(--glass-border);border-radius:12px;padding:8px 14px;font-size:12px;min-width:130px">
                ${statuses.map(s => '<option value="' + s + '">' + s + '</option>').join('')}
              </select>
            </div>
            <div>
              <label style="font-size:9px;font-weight:700;color:var(--text-tertiary);display:block;margin-bottom:4px;text-transform:uppercase">Staff ID</label>
              <input id="att-staff-id" type="text" placeholder="e.g. E001" style="background:var(--glass-bg);border:1.5px solid var(--glass-border);border-radius:12px;padding:8px 14px;font-size:12px;width:100px">
            </div>
            <div style="flex:1;min-width:160px;position:relative">
              <label style="font-size:9px;font-weight:700;color:var(--text-tertiary);display:block;margin-bottom:4px;text-transform:uppercase">Search Employee</label>
              <input id="att-search" type="text" placeholder="🔍 Search name, position…" style="width:100%;background:var(--glass-bg);border:1.5px solid var(--glass-border);border-radius:12px;padding:8px 14px;font-size:12px">
              <div id="att-search-results" style="display:none;position:absolute;top:100%;left:0;right:0;background:var(--card-bg,#fff);border:1.5px solid var(--glass-border);border-radius:12px;margin-top:4px;max-height:200px;overflow-y:auto;box-shadow:0 8px 24px rgba(0,0,0,0.1);z-index:20"></div>
            </div>
          </div>
          <!-- Selected staff chips -->
          <div id="att-selected-staff" style="display:flex;gap:6px;flex-wrap:wrap"></div>
          <!-- Active filter info -->
          <div id="att-filter-info" style="margin-top:10px;font-size:11px;color:var(--text-tertiary)"></div>
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

        <!-- Attendance Table -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <h2 style="font-size:15px;font-weight:700">📋 Attendance Records</h2>
          <span id="att-count" style="font-size:11px;color:var(--text-tertiary);font-weight:600"></span>
        </div>
        <div class="card" style="padding:0;overflow:hidden;margin-bottom:24px">
          <div style="overflow-x:auto">
            <table id="att-table" style="width:100%;border-collapse:collapse;font-size:12px">
              <thead>
                <tr style="background:var(--glass-bg);border-bottom:2px solid var(--glass-border)">
                  <th class="att-sort" data-col="id" style="padding:12px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--text-tertiary);text-transform:uppercase;cursor:pointer;user-select:none;white-space:nowrap">ID ↕</th>
                  <th class="att-sort" data-col="name" style="padding:12px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--text-tertiary);text-transform:uppercase;cursor:pointer;user-select:none;white-space:nowrap">Employee ↕</th>
                  <th class="att-sort" data-col="dept" style="padding:12px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--text-tertiary);text-transform:uppercase;cursor:pointer;user-select:none;white-space:nowrap">Department ↕</th>
                  <th class="att-sort" data-col="position" style="padding:12px 14px;text-align:left;font-size:10px;font-weight:700;color:var(--text-tertiary);text-transform:uppercase;cursor:pointer;user-select:none;white-space:nowrap">Position ↕</th>
                  <th class="att-sort" data-col="checkIn" style="padding:12px 14px;text-align:center;font-size:10px;font-weight:700;color:var(--text-tertiary);text-transform:uppercase;cursor:pointer;user-select:none;white-space:nowrap">Check In ↕</th>
                  <th class="att-sort" data-col="checkOut" style="padding:12px 14px;text-align:center;font-size:10px;font-weight:700;color:var(--text-tertiary);text-transform:uppercase;cursor:pointer;user-select:none;white-space:nowrap">Check Out ↕</th>
                  <th class="att-sort" data-col="status" style="padding:12px 14px;text-align:center;font-size:10px;font-weight:700;color:var(--text-tertiary);text-transform:uppercase;cursor:pointer;user-select:none;white-space:nowrap">Status ↕</th>
                </tr>
              </thead>
              <tbody id="att-tbody"></tbody>
            </table>
          </div>
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

        <!-- Export Options -->
        <div class="card" style="padding:18px;margin-top:14px">
          <h3 style="font-size:13px;font-weight:700;margin-bottom:14px">📥 Export Options</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button id="btn-export-all" class="btn-glass" style="width:100%;text-align:left;padding:10px 14px;font-size:12px">📊 All Employees (${allEmployees.length})</button>
            <button id="btn-export-late" class="btn-glass" style="width:100%;text-align:left;padding:10px 14px;font-size:12px">⚠️ Late Arrivals Only</button>
            <button id="btn-export-absent" class="btn-glass" style="width:100%;text-align:left;padding:10px 14px;font-size:12px">❌ Absent / Not Checked In</button>
            <button id="btn-export-dept" class="btn-glass" style="width:100%;text-align:left;padding:10px 14px;font-size:12px">🏢 By Department (Summary)</button>
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);

  /* ═════════════════════════════════════════════
     Event Handlers
     ═════════════════════════════════════════════ */
  setTimeout(function() {

    /* ── Excel Export Utility (generates real .xlsx) ── */
    function generateXLSX(data, columns, sheetName, fileName) {
      /* Build XML Spreadsheet (Office Open XML simplified as SpreadsheetML) */
      var xml = '<?xml version="1.0"?>\n';
      xml += '<?mso-application progid="Excel.Sheet"?>\n';
      xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n';
      xml += ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n';
      xml += '<Styles>\n';
      xml += '<Style ss:ID="header"><Font ss:Bold="1" ss:Size="11" ss:Color="#FFFFFF"/><Interior ss:Color="#00A79D" ss:Pattern="Solid"/><Alignment ss:Horizontal="Center"/></Style>\n';
      xml += '<Style ss:ID="default"><Font ss:Size="10"/></Style>\n';
      xml += '<Style ss:ID="late"><Font ss:Size="10" ss:Color="#E87C1E"/></Style>\n';
      xml += '<Style ss:ID="absent"><Font ss:Size="10" ss:Color="#ED1C24"/></Style>\n';
      xml += '<Style ss:ID="ontime"><Font ss:Size="10" ss:Color="#00A79D"/></Style>\n';
      xml += '<Style ss:ID="leave"><Font ss:Size="10" ss:Color="#6C63FF"/></Style>\n';
      xml += '</Styles>\n';
      xml += '<Worksheet ss:Name="' + sheetName.replace(/[<>&"]/g, '') + '">\n<Table>\n';

      /* Column widths */
      columns.forEach(function(col) {
        xml += '<Column ss:Width="' + (col.width || 100) + '"/>\n';
      });

      /* Header row */
      xml += '<Row>\n';
      columns.forEach(function(col) {
        xml += '<Cell ss:StyleID="header"><Data ss:Type="String">' + col.label + '</Data></Cell>\n';
      });
      xml += '</Row>\n';

      /* Data rows */
      data.forEach(function(row) {
        xml += '<Row>\n';
        columns.forEach(function(col) {
          var val = row[col.key] !== undefined ? String(row[col.key]) : '';
          var styleId = 'default';
          if (col.key === 'status') {
            if (val === 'Late') styleId = 'late';
            else if (val === 'Absent') styleId = 'absent';
            else if (val === 'On Time') styleId = 'ontime';
            else if (val.includes('Leave') || val === 'Sick Leave') styleId = 'leave';
          }
          var type = col.type || 'String';
          xml += '<Cell ss:StyleID="' + styleId + '"><Data ss:Type="' + type + '">' + val.replace(/[<>&]/g, function(c) { return c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&amp;'; }) + '</Data></Cell>\n';
        });
        xml += '</Row>\n';
      });

      xml += '</Table>\n</Worksheet>\n</Workbook>';

      /* Download */
      var blob = new Blob([xml], { type: 'application/vnd.ms-excel' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = fileName + '.xls';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    /* Standard columns */
    var stdColumns = [
      { key: 'id', label: 'Employee ID', width: 80 },
      { key: 'name', label: 'Full Name', width: 140 },
      { key: 'dept', label: 'Department', width: 100 },
      { key: 'position', label: 'Position', width: 140 },
      { key: 'checkIn', label: 'Check In', width: 80 },
      { key: 'checkOut', label: 'Check Out', width: 80 },
      { key: 'status', label: 'Status', width: 90 },
    ];

    /* ── Selected staff filter ── */
    var selectedStaffIds = [];

    /* ── Filter & render helpers ── */
    function getFilteredData() {
      return allEmployees.filter(function(e) {
        if (filterDept !== 'All' && e.dept !== filterDept) return false;
        if (filterStatus !== 'All' && e.status !== filterStatus) return false;
        if (filterStaffId) {
          if (e.id.toLowerCase().indexOf(filterStaffId.toLowerCase()) < 0) return false;
        }
        if (selectedStaffIds.length > 0) {
          if (selectedStaffIds.indexOf(e.id) < 0) return false;
        }
        if (searchQuery && selectedStaffIds.length === 0) {
          var q = searchQuery.toLowerCase();
          if (e.name.toLowerCase().indexOf(q) < 0 && e.id.toLowerCase().indexOf(q) < 0 && e.position.toLowerCase().indexOf(q) < 0 && e.dept.toLowerCase().indexOf(q) < 0) return false;
        }
        return true;
      }).sort(function(a, b) {
        var va = a[sortCol] || '';
        var vb = b[sortCol] || '';
        if (va < vb) return sortAsc ? -1 : 1;
        if (va > vb) return sortAsc ? 1 : -1;
        return 0;
      });
    }

    function renderStats(data) {
      var s = getStats(data);
      var statsEl = page.querySelector('#att-stats');
      statsEl.innerHTML = [
        { num: s.checkedIn, label: 'Checked In', icon: '✅', bg: '#F0F9F8', color: 'var(--teal)' },
        { num: s.late, label: 'Late Arrivals', icon: '⚠️', bg: '#FFF8F0', color: 'var(--orange)' },
        { num: s.absent, label: 'Not Checked In', icon: '❌', bg: '#FDE8E8', color: 'var(--red)' },
        { num: s.leave, label: 'On Leave', icon: '📅', bg: '#F0F9F8', color: '#00A79D' },
      ].map(function(m) {
        return '<div class="card" style="text-align:center;padding:20px 12px">' +
          '<div style="width:40px;height:40px;border-radius:50%;background:' + m.bg + ';margin:0 auto 8px;display:flex;align-items:center;justify-content:center;font-size:18px">' + m.icon + '</div>' +
          '<div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:' + m.color + '">' + m.num + '</div>' +
          '<p style="font-size:12px;color:var(--text-tertiary)">' + m.label + '</p></div>';
      }).join('');
    }

    function renderTable(data) {
      var tbody = page.querySelector('#att-tbody');
      var countEl = page.querySelector('#att-count');
      countEl.textContent = 'Showing ' + data.length + ' of ' + allEmployees.length + ' employees';

      var infoEl = page.querySelector('#att-filter-info');
      var filters = [];
      if (filterDateFrom !== '2026-04-01' || filterDateTo !== '2026-04-06') filters.push('Date: ' + filterDateFrom + ' → ' + filterDateTo);
      if (filterDept !== 'All') filters.push('Dept: ' + filterDept);
      if (filterStatus !== 'All') filters.push('Status: ' + filterStatus);
      if (filterStaffId) filters.push('Staff ID: ' + filterStaffId);
      if (selectedStaffIds.length > 0) filters.push('Staff: ' + selectedStaffIds.join(', '));
      if (searchQuery && selectedStaffIds.length === 0) filters.push('Search: "' + searchQuery + '"');
      infoEl.textContent = filters.length > 0 ? '🔍 Active filters: ' + filters.join(' · ') + ' — ' + data.length + ' result' + (data.length !== 1 ? 's' : '') : '';

      if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="padding:40px;text-align:center;color:var(--text-tertiary)">' +
          '<p style="font-size:24px;margin-bottom:8px">📋</p>' +
          '<p style="font-size:13px;font-weight:600">No records match your filters</p>' +
          '<p style="font-size:11px;margin-top:4px">Try adjusting department, status, or search</p></td></tr>';
        return;
      }

      tbody.innerHTML = data.map(function(e, idx) {
        var statusBg, statusColor;
        if (e.status === 'On Time') { statusBg = 'rgba(0,167,157,0.08)'; statusColor = 'var(--teal)'; }
        else if (e.status === 'Late') { statusBg = 'rgba(232,124,30,0.08)'; statusColor = 'var(--orange)'; }
        else if (e.status === 'Absent') { statusBg = 'rgba(237,28,36,0.08)'; statusColor = 'var(--red)'; }
        else { statusBg = 'rgba(108,99,255,0.08)'; statusColor = '#6C63FF'; }

        var rowBg = idx % 2 === 0 ? '' : 'background:var(--glass-bg)';
        return '<tr style="border-bottom:1px solid var(--glass-border);' + rowBg + ';transition:background 0.15s" onmouseenter="this.style.background=\'rgba(0,167,157,0.04)\'" onmouseleave="this.style.background=\'' + (idx % 2 === 0 ? '' : 'var(--glass-bg)') + '\'">' +
          '<td style="padding:10px 14px;font-size:11px;color:var(--text-tertiary);font-weight:600">' + e.id + '</td>' +
          '<td style="padding:10px 14px"><div style="display:flex;align-items:center;gap:8px">' +
            '<div class="avatar avatar-sm" style="background:' + e.bg + ';color:' + e.color + ';font-weight:700;font-size:9px;width:26px;height:26px;flex-shrink:0">' + e.init + '</div>' +
            '<span style="font-size:12px;font-weight:600">' + e.name + '</span></div></td>' +
          '<td style="padding:10px 14px;font-size:11px;color:var(--text-secondary)">' + e.dept + '</td>' +
          '<td style="padding:10px 14px;font-size:11px;color:var(--text-secondary)">' + e.position + '</td>' +
          '<td style="padding:10px 14px;text-align:center;font-size:11px;font-weight:600;color:' + (e.checkIn === '—' ? 'var(--text-tertiary)' : e.status === 'Late' ? 'var(--orange)' : 'var(--teal)') + '">' + e.checkIn + '</td>' +
          '<td style="padding:10px 14px;text-align:center;font-size:11px;font-weight:600;color:var(--text-secondary)">' + e.checkOut + '</td>' +
          '<td style="padding:10px 14px;text-align:center"><span style="padding:3px 10px;border-radius:8px;font-size:10px;font-weight:700;background:' + statusBg + ';color:' + statusColor + '">' + e.status + '</span></td>' +
        '</tr>';
      }).join('');
    }

    function renderAll() {
      var data = getFilteredData();
      renderStats(data);
      renderTable(data);
    }

    /* Initial render */
    renderAll();

    /* ── Filter bindings ── */
    page.querySelector('#att-dept').onchange = function() { filterDept = this.value; renderAll(); };
    page.querySelector('#att-status').onchange = function() { filterStatus = this.value; renderAll(); };
    page.querySelector('#att-date-from').onchange = function() { filterDateFrom = this.value; renderAll(); };
    page.querySelector('#att-date-to').onchange = function() { filterDateTo = this.value; renderAll(); };
    page.querySelector('#att-staff-id').addEventListener('input', function() { filterStaffId = this.value.trim(); renderAll(); });

    /* ── Search with autocomplete ── */
    var attSearchInput = page.querySelector('#att-search');
    var attSearchResults = page.querySelector('#att-search-results');
    attSearchInput.addEventListener('input', function() {
      var q = attSearchInput.value.trim().toLowerCase();
      searchQuery = q;
      if (q.length < 1) { attSearchResults.style.display = 'none'; renderAll(); return; }
      var matches = allEmployees.filter(function(e) {
        return selectedStaffIds.indexOf(e.id) < 0 &&
          (e.name.toLowerCase().indexOf(q) >= 0 || e.id.toLowerCase().indexOf(q) >= 0 || e.position.toLowerCase().indexOf(q) >= 0);
      }).slice(0, 8);
      if (matches.length === 0) {
        attSearchResults.innerHTML = '<div style="padding:12px;text-align:center;font-size:11px;color:var(--text-tertiary)">No matching employees</div>';
      } else {
        attSearchResults.innerHTML = matches.map(function(e) {
          return '<div class="att-search-item" data-id="' + e.id + '" style="display:flex;align-items:center;gap:10px;padding:10px 14px;cursor:pointer;transition:background 0.15s;border-bottom:1px solid var(--glass-border)">' +
            '<div class="avatar avatar-sm" style="background:' + e.bg + ';color:' + e.color + ';font-weight:700;font-size:9px;width:26px;height:26px;flex-shrink:0">' + e.init + '</div>' +
            '<div style="flex:1"><p style="font-size:11px;font-weight:600">' + e.name + '</p><p style="font-size:9px;color:var(--text-tertiary)">' + e.id + ' · ' + e.position + ' · ' + e.dept + '</p></div>' +
            '<span style="font-size:10px;color:var(--teal);font-weight:600">+ Select</span></div>';
        }).join('');
      }
      attSearchResults.style.display = 'block';
      attSearchResults.querySelectorAll('.att-search-item').forEach(function(item) {
        item.onmouseenter = function() { item.style.background = 'rgba(0,167,157,0.04)'; };
        item.onmouseleave = function() { item.style.background = ''; };
        item.onclick = function() {
          var empId = item.dataset.id;
          if (selectedStaffIds.indexOf(empId) < 0) selectedStaffIds.push(empId);
          attSearchInput.value = ''; searchQuery = '';
          attSearchResults.style.display = 'none';
          renderSelectedChips();
          renderAll();
        };
      });
      renderAll();
    });
    attSearchInput.addEventListener('blur', function() { setTimeout(function() { attSearchResults.style.display = 'none'; }, 200); });

    /* ── Selected staff chips ── */
    function renderSelectedChips() {
      var container = page.querySelector('#att-selected-staff');
      if (selectedStaffIds.length === 0) { container.innerHTML = ''; return; }
      container.innerHTML = selectedStaffIds.map(function(sid) {
        var emp = allEmployees.find(function(e) { return e.id === sid; });
        if (!emp) return '';
        return '<span class="att-chip" data-id="' + emp.id + '" style="display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:10px;background:rgba(0,167,157,0.06);border:1.5px solid rgba(0,167,157,0.2);font-size:11px;font-weight:600;color:var(--teal)">' +
          '<span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:' + emp.bg + ';color:' + emp.color + ';font-size:8px;font-weight:700">' + emp.init + '</span>' +
          emp.name + ' <span style="font-size:9px;color:var(--text-tertiary)">(' + emp.id + ')</span>' +
          '<button class="att-chip-rm" data-id="' + emp.id + '" style="background:none;border:none;font-size:10px;cursor:pointer;color:var(--text-tertiary);padding:0 2px">✕</button></span>';
      }).join('');
      container.querySelectorAll('.att-chip-rm').forEach(function(btn) {
        btn.onclick = function() {
          selectedStaffIds = selectedStaffIds.filter(function(id) { return id !== btn.dataset.id; });
          renderSelectedChips();
          renderAll();
        };
      });
    }

    /* ── Quick date range buttons ── */
    page.querySelectorAll('.att-quick-date').forEach(function(btn) {
      btn.onclick = function() {
        page.querySelectorAll('.att-quick-date').forEach(function(b) { b.style.borderColor = 'var(--glass-border)'; b.style.background = 'transparent'; b.style.color = 'var(--text-secondary)'; });
        btn.style.borderColor = 'rgba(0,167,157,0.3)'; btn.style.background = 'rgba(0,167,157,0.04)'; btn.style.color = 'var(--teal)';
        var today = new Date('2026-04-06');
        if (btn.dataset.range === 'today') {
          filterDateFrom = '2026-04-06'; filterDateTo = '2026-04-06';
        } else if (btn.dataset.range === 'week') {
          var dayOfWeek = today.getDay();
          var startOfWeek = new Date(today); startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
          filterDateFrom = startOfWeek.toISOString().split('T')[0]; filterDateTo = '2026-04-06';
        } else if (btn.dataset.range === 'month') {
          filterDateFrom = '2026-04-01'; filterDateTo = '2026-04-30';
        }
        page.querySelector('#att-date-from').value = filterDateFrom;
        page.querySelector('#att-date-to').value = filterDateTo;
        renderAll();
      };
    });

    /* ── Reset ── */
    page.querySelector('#att-reset').onclick = function() {
      filterDept = 'All'; filterStatus = 'All'; searchQuery = ''; filterStaffId = '';
      filterDateFrom = '2026-04-01'; filterDateTo = '2026-04-06';
      selectedStaffIds = [];
      page.querySelector('#att-dept').value = 'All';
      page.querySelector('#att-status').value = 'All';
      page.querySelector('#att-search').value = '';
      page.querySelector('#att-staff-id').value = '';
      page.querySelector('#att-date-from').value = '2026-04-01';
      page.querySelector('#att-date-to').value = '2026-04-06';
      renderSelectedChips();
      page.querySelectorAll('.att-quick-date').forEach(function(b) { b.style.borderColor = 'var(--glass-border)'; b.style.background = 'transparent'; b.style.color = 'var(--text-secondary)'; });
      renderAll();
    };

    /* ── Column sort ── */
    page.querySelectorAll('.att-sort').forEach(function(th) {
      th.onclick = function() {
        var col = th.dataset.col;
        if (sortCol === col) sortAsc = !sortAsc;
        else { sortCol = col; sortAsc = true; }
        /* Update header indicators */
        page.querySelectorAll('.att-sort').forEach(function(h) {
          var label = h.textContent.replace(/ [↑↓↕]/g, '');
          h.textContent = h.dataset.col === sortCol ? label + (sortAsc ? ' ↑' : ' ↓') : label + ' ↕';
        });
        renderAll();
      };
    });

    /* ── Show toast helper ── */
    function showExportToast(msg) {
      var toast = document.createElement('div');
      toast.style.cssText = 'position:fixed;bottom:30px;right:30px;padding:16px 24px;border-radius:16px;background:var(--teal);color:#fff;font-size:13px;font-weight:700;z-index:99999;box-shadow:0 8px 30px rgba(0,0,0,0.2);animation:fadeIn 0.3s';
      toast.innerHTML = msg;
      document.body.appendChild(toast);
      setTimeout(function() { toast.remove(); }, 3500);
    }

    /* ── Export: All button (top bar) ── */
    page.querySelector('#btn-export-excel').onclick = function() {
      var btn = this;
      btn.innerHTML = '⏳ Generating…'; btn.style.opacity = '0.7';
      setTimeout(function() {
        generateXLSX(allEmployees, stdColumns, 'All Employees', 'Metfone_Attendance_All_' + filterDateFrom + '_to_' + filterDateTo);
        btn.innerHTML = '✅ Downloaded'; btn.style.opacity = '1'; btn.style.color = 'var(--teal)';
        showExportToast('📥 Exported <strong>' + allEmployees.length + ' employees</strong> to Excel');
        setTimeout(function() { btn.innerHTML = '📥 Export Excel'; }, 2000);
      }, 800);
    };

    /* ── Export: Filtered button (top bar) ── */
    page.querySelector('#btn-export-filtered').onclick = function() {
      var btn = this;
      var data = getFilteredData();
      if (data.length === 0) { alert('No data matches current filters'); return; }
      btn.innerHTML = '⏳ Generating…'; btn.style.opacity = '0.7';
      setTimeout(function() {
        var suffix = filterDept !== 'All' ? '_' + filterDept : '';
        suffix += filterStatus !== 'All' ? '_' + filterStatus.replace(/\s+/g, '') : '';
        generateXLSX(data, stdColumns, 'Filtered Attendance', 'Metfone_Attendance' + suffix + '_' + filterDateFrom + '_to_' + filterDateTo);
        btn.innerHTML = '✅ Downloaded'; btn.style.opacity = '1'; btn.style.color = 'var(--orange)';
        showExportToast('📥 Exported <strong>' + data.length + ' filtered records</strong> to Excel');
        setTimeout(function() { btn.innerHTML = '📊 Export Filtered'; }, 2000);
      }, 800);
    };

    /* ── Sidebar export buttons ── */
    page.querySelector('#btn-export-all').onclick = function() {
      generateXLSX(allEmployees, stdColumns, 'All Employees', 'Metfone_Attendance_All_' + filterDateFrom + '_to_' + filterDateTo);
      showExportToast('📥 Exported all <strong>' + allEmployees.length + ' employees</strong>');
    };

    page.querySelector('#btn-export-late').onclick = function() {
      var data = allEmployees.filter(function(e) { return e.status === 'Late'; });
      generateXLSX(data, stdColumns, 'Late Arrivals', 'Metfone_Late_Arrivals_' + filterDateFrom + '_to_' + filterDateTo);
      showExportToast('⚠️ Exported <strong>' + data.length + ' late arrivals</strong>');
    };

    page.querySelector('#btn-export-absent').onclick = function() {
      var data = allEmployees.filter(function(e) { return e.status === 'Absent'; });
      generateXLSX(data, stdColumns, 'Absent Employees', 'Metfone_Absent_' + filterDateFrom + '_to_' + filterDateTo);
      showExportToast('❌ Exported <strong>' + data.length + ' absent employees</strong>');
    };

    page.querySelector('#btn-export-dept').onclick = function() {
      /* Department summary export */
      var depts = {};
      allEmployees.forEach(function(e) {
        if (!depts[e.dept]) depts[e.dept] = { dept: e.dept, total: 0, onTime: 0, late: 0, absent: 0, leave: 0, rate: '' };
        var d = depts[e.dept]; d.total++;
        if (e.status === 'On Time') d.onTime++;
        else if (e.status === 'Late') d.late++;
        else if (e.status === 'Absent') d.absent++;
        else d.leave++;
      });
      var deptData = Object.values(depts).map(function(d) { d.rate = Math.round((d.onTime + d.late) / d.total * 100) + '%'; return d; });
      var deptCols = [
        { key: 'dept', label: 'Department', width: 120 },
        { key: 'total', label: 'Total Staff', width: 80 },
        { key: 'onTime', label: 'On Time', width: 80 },
        { key: 'late', label: 'Late', width: 80 },
        { key: 'absent', label: 'Absent', width: 80 },
        { key: 'leave', label: 'On Leave', width: 80 },
        { key: 'rate', label: 'Attendance Rate', width: 100 },
      ];
      generateXLSX(deptData, deptCols, 'Department Summary', 'Metfone_Dept_Summary_' + filterDateFrom + '_to_' + filterDateTo);
      showExportToast('🏢 Exported <strong>department summary</strong> report');
    };

  });

  return page;
});
