/* ─── HR Employee Management — AI Turnover Prediction ─── */
Router.register('/hr/employees', function renderHrEmployeeManagement() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/employees'));

  /* ── Full employee dataset ── */
  const allEmployees = [
    /* ─ High Risk (risk ≥ 85) ─ */
    { id:'E001',init:'CL',name:'Chanthy Lim',pos:'Senior Developer',dept:'IT',tenure:'5 yrs',joinDate:'2021-03-15',risk:88,category:'high',isNew:false,bg:'#FDE8E8',color:'#ED1C24',
      signals:['LinkedIn updated recently','Engagement dropping','Overtime surging (burnout)'],
      actions:['Schedule career discussion','Workload adjustment','Retention bonus consideration'] },
    { id:'E002',init:'RK',name:'Rathana Kim',pos:'Marketing Lead',dept:'Marketing',tenure:'4 yrs',joinDate:'2022-01-10',risk:82,category:'high',isNew:false,bg:'#FDE8E8',color:'#ED1C24',
      signals:['Decreased participation in meetings','Used all personal leave days','Compensation below market rate'],
      actions:['Salary review discussion','Role expansion proposal'] },
    { id:'E003',init:'DS',name:'Dara Sous',pos:'Sales Manager',dept:'Sales',tenure:'6 yrs',joinDate:'2020-06-01',risk:91,category:'high',isNew:false,bg:'#FDE8E8',color:'#ED1C24',
      signals:['Job portal activity detected','Skip-level meetings declining','Team complaints rising'],
      actions:['Executive 1-on-1','Management coaching','Retention package review'] },
    { id:'E004',init:'VN',name:'Vanna Nob',pos:'HR Lead',dept:'HR',tenure:'4 yrs',joinDate:'2022-04-20',risk:86,category:'high',isNew:false,bg:'#FDE8E8',color:'#ED1C24',
      signals:['Applied for external roles','PTO usage spiking','Peer feedback declining'],
      actions:['Career progression plan','Cross-functional opportunity','Comp adjustment'] },
    { id:'E005',init:'RC',name:'Rithy Chan',pos:'DevOps Engineer',dept:'IT',tenure:'3 yrs',joinDate:'2023-02-14',risk:89,category:'high',isNew:false,bg:'#FDE8E8',color:'#ED1C24',
      signals:['Certifications not renewed','Late attendance pattern','Reduced code contributions'],
      actions:['Technical growth plan','Flexible schedule trial','Project rotation'] },
    { id:'E006',init:'MO',name:'Maly Ouk',pos:'Marketing Manager',dept:'Marketing',tenure:'5 yrs',joinDate:'2021-07-01',risk:85,category:'high',isNew:false,bg:'#FDE8E8',color:'#ED1C24',
      signals:['Competitor recruiter contact','Low satisfaction survey','Team restructuring stress'],
      actions:['Leadership development program','Team autonomy expansion'] },
    { id:'E007',init:'NS',name:'Narith Seng',pos:'Sales Rep',dept:'Sales',tenure:'3 yrs',joinDate:'2023-05-20',risk:87,category:'high',isNew:false,bg:'#FDE8E8',color:'#ED1C24',
      signals:['Quota miss 3 consecutive months','Commission dispute unresolved','Peer departures'],
      actions:['Performance recovery plan','Territory reassignment','Mentorship pairing'] },
    { id:'E008',init:'TO',name:'Thida Oum',pos:'HR Director',dept:'HR',tenure:'7 yrs',joinDate:'2019-01-15',risk:86,category:'high',isNew:false,bg:'#FDE8E8',color:'#ED1C24',
      signals:['Executive headhunter approach','Strategic disagreements','Work-life imbalance'],
      actions:['Board-level recognition','Sabbatical option','Equity package review'] },

    /* ─ Medium Risk (risk 50–84) ─ */
    { id:'E009',init:'SP',name:'Sokha Pen',pos:'IT Support',dept:'IT',tenure:'2 yrs',joinDate:'2024-03-01',risk:65,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['Overtime increasing','Skill stagnation detected'],
      actions:['Training enrollment','Workload review'] },
    { id:'E010',init:'PT',name:'Pheakdey Thun',pos:'Accountant',dept:'Finance',tenure:'3 yrs',joinDate:'2023-06-15',risk:58,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['Compensation gap widening','Reduced initiative'],
      actions:['Market salary adjustment','Professional development'] },
    { id:'E011',init:'KV',name:'Kosal Vann',pos:'Content Writer',dept:'Marketing',tenure:'2 yrs',joinDate:'2024-01-20',risk:72,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['Creative output declining','Freelance profiles active'],
      actions:['Creative freedom expansion','Publication opportunities'] },
    { id:'E012',init:'BS',name:'Bopha Srey',pos:'Frontend Developer',dept:'IT',tenure:'3 yrs',joinDate:'2023-04-10',risk:68,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['Conference attendance requests denied','Tech stack frustration'],
      actions:['Tech modernization project','Conference sponsorship'] },
    { id:'E013',init:'SM',name:'Sreyneang Mao',pos:'Finance Manager',dept:'Finance',tenure:'5 yrs',joinDate:'2021-09-01',risk:62,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['Delegation resistance','Peer promotion dissatisfaction'],
      actions:['Leadership training','Clear promotion timeline'] },
    { id:'E014',init:'CE',name:'Chantha Ek',pos:'Graphic Designer',dept:'Marketing',tenure:'2 yrs',joinDate:'2024-02-15',risk:55,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['Portfolio updates outside work','Limited growth path'],
      actions:['Senior designer track','Brand ownership project'] },
    { id:'E015',init:'PH',name:'Pheakdey Heng',pos:'Backend Developer',dept:'IT',tenure:'2 yrs',joinDate:'2024-05-01',risk:70,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['Code review engagement low','Team social withdrawal'],
      actions:['Pair programming initiative','Team building activities'] },
    { id:'E016',init:'RH',name:'Rith Hak',pos:'Business Dev',dept:'Sales',tenure:'3 yrs',joinDate:'2023-08-20',risk:60,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['Territory overlap frustration','Commission structure complaints'],
      actions:['Territory optimization','Incentive restructure'] },
    { id:'E017',init:'VT',name:'Vuthy Tan',pos:'Payroll Officer',dept:'Finance',tenure:'4 yrs',joinDate:'2022-03-01',risk:52,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['Routine fatigue indicators','Reduced process improvement suggestions'],
      actions:['HRIS automation project lead','Cross-training opportunity'] },
    { id:'E018',init:'NC',name:'Nary Chhim',pos:'UI/UX Designer',dept:'IT',tenure:'2 yrs',joinDate:'2024-06-01',risk:64,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['Design conference rejected twice','Tool budget constraints'],
      actions:['Design system ownership','Tool budget increase'] },
    { id:'E019',init:'ST',name:'Sambo Tith',pos:'Regional Lead',dept:'Sales',tenure:'5 yrs',joinDate:'2021-11-01',risk:74,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['Market expansion pushback','Autonomy conflicts','Travel fatigue'],
      actions:['Regional strategy co-creation','Travel policy flexibility'] },
    { id:'E020',init:'SM2',name:'Sokly Meng',pos:'Senior Accountant',dept:'Finance',tenure:'4 yrs',joinDate:'2022-07-01',risk:56,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['CPA study leave denied','Workload imbalance'],
      actions:['Study leave approval','Task redistribution'] },
    { id:'E021',init:'SN',name:'Sopheap Noun',pos:'Mobile Developer',dept:'IT',tenure:'2 yrs',joinDate:'2024-04-15',risk:66,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['Open source contributions increasing','Internal project disinterest'],
      actions:['Innovation time allocation','Open source policy'] },
    { id:'E022',init:'KR',name:'Kanha Ros',pos:'Recruiter',dept:'HR',tenure:'3 yrs',joinDate:'2023-01-10',risk:58,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['Recruitment burnout signs','Tool frustration'],
      actions:['ATS upgrade','Hiring load balance'] },
    { id:'E023',init:'MS',name:'Makara Sen',pos:'System Admin',dept:'IT',tenure:'4 yrs',joinDate:'2022-08-01',risk:51,category:'medium',isNew:false,bg:'#FFF8F0',color:'#E87C1E',
      signals:['On-call fatigue','Cloud migration anxiety'],
      actions:['On-call rotation optimization','Cloud training program'] },

    /* ─ Low Risk (risk < 50) ─ */
    { id:'E024',init:'TK',name:'Theary Kong',pos:'Training Lead',dept:'HR',tenure:'4 yrs',joinDate:'2022-02-01',risk:22,category:'low',isNew:false,bg:'#F0F9F8',color:'#00A79D',signals:[],actions:[] },
    { id:'E025',init:'VD',name:'Visal Deth',pos:'HR Specialist',dept:'HR',tenure:'3 yrs',joinDate:'2023-03-15',risk:18,category:'low',isNew:false,bg:'#F0F9F8',color:'#00A79D',signals:[],actions:[] },
    { id:'E026',init:'PM',name:'Phearun Mak',pos:'Product Manager',dept:'IT',tenure:'3 yrs',joinDate:'2023-07-01',risk:30,category:'low',isNew:false,bg:'#F0F9F8',color:'#00A79D',signals:[],actions:[] },
    { id:'E027',init:'CL2',name:'Chanthy Loun',pos:'Sales Executive',dept:'Sales',tenure:'2 yrs',joinDate:'2024-01-15',risk:25,category:'low',isNew:false,bg:'#F0F9F8',color:'#00A79D',signals:[],actions:[] },
    { id:'E028',init:'DP',name:'Davy Phan',pos:'Brand Specialist',dept:'Marketing',tenure:'3 yrs',joinDate:'2023-05-01',risk:28,category:'low',isNew:false,bg:'#F0F9F8',color:'#00A79D',signals:[],actions:[] },
    { id:'E029',init:'LC',name:'Leak Chhem',pos:'Budget Analyst',dept:'Finance',tenure:'2 yrs',joinDate:'2024-03-20',risk:20,category:'low',isNew:false,bg:'#F0F9F8',color:'#00A79D',signals:[],actions:[] },
    { id:'E030',init:'PC',name:'Pisey Chea',pos:'Financial Analyst',dept:'Finance',tenure:'3 yrs',joinDate:'2023-09-01',risk:32,category:'low',isNew:false,bg:'#F0F9F8',color:'#00A79D',signals:[],actions:[] },
    { id:'E031',init:'VM',name:'Vuth Meas',pos:'IT Manager',dept:'IT',tenure:'6 yrs',joinDate:'2020-04-01',risk:15,category:'low',isNew:false,bg:'#F0F9F8',color:'#00A79D',signals:[],actions:[] },
    { id:'E032',init:'MN',name:'Malis Noun',pos:'Mobile Team Lead',dept:'IT',tenure:'5 yrs',joinDate:'2021-01-15',risk:24,category:'low',isNew:false,bg:'#F0F9F8',color:'#00A79D',signals:[],actions:[] },
    { id:'E033',init:'KD',name:'Khem Dara',pos:'Marketing Director',dept:'Marketing',tenure:'7 yrs',joinDate:'2019-06-01',risk:12,category:'low',isNew:false,bg:'#F0F9F8',color:'#00A79D',signals:[],actions:[] },
    { id:'E034',init:'LM',name:'Lida Meas',pos:'Operations Manager',dept:'Operations',tenure:'5 yrs',joinDate:'2021-02-01',risk:19,category:'low',isNew:false,bg:'#F0F9F8',color:'#00A79D',signals:[],actions:[] },
    { id:'E035',init:'BP',name:'Bora Pan',pos:'BI Manager',dept:'Business Intelligence',tenure:'4 yrs',joinDate:'2022-05-01',risk:26,category:'low',isNew:false,bg:'#F0F9F8',color:'#00A79D',signals:[],actions:[] },
    { id:'E036',init:'PS',name:'Phally Sorn',pos:'Finance Director',dept:'Finance',tenure:'8 yrs',joinDate:'2018-03-01',risk:10,category:'low',isNew:false,bg:'#F0F9F8',color:'#00A79D',signals:[],actions:[] },

    /* ─ New Hires (joined in last 3 months) ─ */
    { id:'E037',init:'SV',name:'Sreymom Vy',pos:'Junior Developer',dept:'IT',tenure:'2 mo',joinDate:'2026-02-10',risk:15,category:'low',isNew:true,bg:'#F0F0FF',color:'#6C63FF',signals:[],actions:[] },
    { id:'E038',init:'DK',name:'Dany Khim',pos:'Marketing Intern',dept:'Marketing',tenure:'1 mo',joinDate:'2026-03-05',risk:10,category:'low',isNew:true,bg:'#F0F0FF',color:'#6C63FF',signals:[],actions:[] },
    { id:'E039',init:'RT',name:'Rith Teng',pos:'Sales Associate',dept:'Sales',tenure:'3 mo',joinDate:'2026-01-15',risk:20,category:'low',isNew:true,bg:'#F0F0FF',color:'#6C63FF',signals:[],actions:[] },
    { id:'E040',init:'LN',name:'Leakhena Nuon',pos:'HR Coordinator',dept:'HR',tenure:'1 mo',joinDate:'2026-03-20',risk:8,category:'low',isNew:true,bg:'#F0F0FF',color:'#6C63FF',signals:[],actions:[] },
    { id:'E041',init:'VK',name:'Vicheka Keo',pos:'Data Analyst',dept:'Business Intelligence',tenure:'2 mo',joinDate:'2026-02-01',risk:12,category:'low',isNew:true,bg:'#F0F0FF',color:'#6C63FF',signals:[],actions:[] },
    { id:'E042',init:'CS',name:'Channy Sok',pos:'Finance Trainee',dept:'Finance',tenure:'2 wk',joinDate:'2026-03-25',risk:5,category:'low',isNew:true,bg:'#F0F0FF',color:'#6C63FF',signals:[],actions:[] },
  ];

  /* ── State ── */
  var currentTab = 'all';
  var searchQuery = '';
  var filterDept = 'All';

  var departments = ['All', ...new Set(allEmployees.map(function(e) { return e.dept; }))];

  var main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div class="page-header">
          <h1>Employee Management</h1>
          <p>AI-powered turnover prediction & retention</p>
        </div>

        <!-- Search + Dept filter -->
        <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
          <div style="flex:1;min-width:200px">
            <input id="emp-search" type="text" placeholder="🔍  Search by name, ID, position, department…" style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:16px;padding:12px 16px;font-size:13px">
          </div>
          <select id="emp-dept-filter" style="background:var(--glass-bg);border:1.5px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:12px;font-weight:600;min-width:140px">
            ${departments.map(function(d) { return '<option value="' + d + '">' + d + '</option>'; }).join('')}
          </select>
        </div>

        <!-- Tabs -->
        <div style="display:flex;gap:6px;margin-bottom:20px;flex-wrap:wrap" id="emp-tabs">
          <button class="emp-tab active" data-tab="all" style="padding:8px 18px;border-radius:12px;border:1.5px solid var(--teal);background:rgba(0,167,157,0.06);color:var(--teal);font-size:12px;font-weight:700;cursor:pointer">All</button>
          <button class="emp-tab" data-tab="high" style="padding:8px 18px;border-radius:12px;border:1.5px solid var(--glass-border);background:transparent;color:var(--text-secondary);font-size:12px;font-weight:700;cursor:pointer">High Risk</button>
          <button class="emp-tab" data-tab="medium" style="padding:8px 18px;border-radius:12px;border:1.5px solid var(--glass-border);background:transparent;color:var(--text-secondary);font-size:12px;font-weight:700;cursor:pointer">Medium Risk</button>
          <button class="emp-tab" data-tab="low" style="padding:8px 18px;border-radius:12px;border:1.5px solid var(--glass-border);background:transparent;color:var(--text-secondary);font-size:12px;font-weight:700;cursor:pointer">Low Risk</button>
          <button class="emp-tab" data-tab="new" style="padding:8px 18px;border-radius:12px;border:1.5px solid var(--glass-border);background:transparent;color:var(--text-secondary);font-size:12px;font-weight:700;cursor:pointer">New Hires</button>
        </div>

        <!-- AI Risk Overview -->
        <div class="section-header"><h2>🤖 AI Turnover Prediction</h2></div>
        <div id="emp-stats" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px"></div>

        <div class="card" style="background:linear-gradient(135deg,rgba(0,167,157,0.1),rgba(0,167,157,0.1));border-left:4px solid var(--teal);margin-bottom:24px;display:flex;gap:12px;align-items:center">
          <span style="font-size:24px">💰</span>
          <div>
            <p style="font-size:14px;font-weight:700;color:var(--teal)">Potential savings: $900,000/year</p>
            <p style="font-size:12px;color:var(--text-tertiary)">By retaining 30% of at-risk employees</p>
          </div>
        </div>

        <!-- Filter info -->
        <div id="emp-filter-info" style="margin-bottom:12px;font-size:11px;color:var(--text-tertiary)"></div>

        <!-- Employee List -->
        <div id="emp-list"></div>

      </div>

      <div class="col-side">
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Recent Actions</h3>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[
              { action: 'Retention bonus offered', emp: 'Chanthy Lim', result: 'Risk reduced 85% → 45%', time: '2 days ago', color: 'var(--teal)' },
              { action: 'Career discussion scheduled', emp: 'Rathana Kim', result: 'Pending meeting', time: 'Yesterday', color: 'var(--orange)' },
              { action: 'Workload redistributed', emp: 'Sokha Pen', result: 'Overtime -40%', time: '1 week ago', color: 'var(--teal)' },
              { action: 'Salary review approved', emp: 'Maly Ouk', result: '15% adjustment', time: '3 days ago', color: 'var(--teal)' },
              { action: 'Leadership program enrolled', emp: 'Dara Sous', result: 'Q2 cohort', time: '5 days ago', color: 'var(--orange)' },
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

        <!-- Department Breakdown -->
        <div class="card card-lg" style="margin-top:16px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Dept Risk Breakdown</h3>
          <div id="emp-dept-breakdown" style="display:flex;flex-direction:column;gap:10px"></div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);

  /* ═════════════════════════════════════════════
     Event Handlers
     ═════════════════════════════════════════════ */
  setTimeout(function() {

    function getFiltered() {
      return allEmployees.filter(function(e) {
        /* Tab filter */
        if (currentTab === 'high' && e.category !== 'high') return false;
        if (currentTab === 'medium' && e.category !== 'medium') return false;
        if (currentTab === 'low' && e.category !== 'low' || (currentTab === 'low' && e.isNew)) return false;
        if (currentTab === 'new' && !e.isNew) return false;
        /* Dept filter */
        if (filterDept !== 'All' && e.dept !== filterDept) return false;
        /* Search */
        if (searchQuery) {
          var q = searchQuery.toLowerCase();
          if (e.name.toLowerCase().indexOf(q) < 0 && e.id.toLowerCase().indexOf(q) < 0 &&
              e.pos.toLowerCase().indexOf(q) < 0 && e.dept.toLowerCase().indexOf(q) < 0) return false;
        }
        return true;
      }).sort(function(a, b) { return b.risk - a.risk; });
    }

    function renderStats(data) {
      var high = data.filter(function(e) { return e.category === 'high'; }).length;
      var med = data.filter(function(e) { return e.category === 'medium'; }).length;
      var low = data.filter(function(e) { return e.category === 'low'; }).length;
      page.querySelector('#emp-stats').innerHTML = [
        { label: 'High Risk', count: high, pct: '85%+ risk', color: 'var(--red)', bg: '#FDE8E8' },
        { label: 'Medium Risk', count: med, pct: '50–84% risk', color: 'var(--orange)', bg: '#FFF8F0' },
        { label: 'Low Risk', count: low, pct: '<50% risk', color: 'var(--teal)', bg: '#F0F9F8' },
      ].map(function(r) {
        return '<div class="card" style="text-align:center;padding:20px;cursor:pointer;transition:transform 0.15s" data-stat-tab="' + r.label.split(' ')[0].toLowerCase() + '">' +
          '<div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:' + r.color + '">' + r.count + '</div>' +
          '<p style="font-size:13px;font-weight:600;margin-bottom:2px">' + r.label + '</p>' +
          '<p style="font-size:11px;color:var(--text-tertiary)">' + r.pct + ' score</p></div>';
      }).join('');
      /* Click stat cards to filter */
      page.querySelectorAll('[data-stat-tab]').forEach(function(card) {
        card.onclick = function() {
          currentTab = card.dataset.statTab;
          updateTabUI();
          renderAll();
        };
      });
    }

    function renderDeptBreakdown() {
      var depts = {};
      allEmployees.forEach(function(e) {
        if (!depts[e.dept]) depts[e.dept] = { high:0, med:0, low:0, total:0 };
        depts[e.dept].total++;
        if (e.category === 'high') depts[e.dept].high++;
        else if (e.category === 'medium') depts[e.dept].med++;
        else depts[e.dept].low++;
      });
      var el = page.querySelector('#emp-dept-breakdown');
      el.innerHTML = Object.keys(depts).map(function(d) {
        var info = depts[d];
        var riskPct = Math.round((info.high + info.med) / info.total * 100);
        var barColor = riskPct > 40 ? 'var(--red)' : riskPct > 20 ? 'var(--orange)' : 'var(--teal)';
        return '<div style="cursor:pointer" class="emp-dept-row" data-dept="' + d + '">' +
          '<div style="display:flex;justify-content:space-between;margin-bottom:3px">' +
            '<span style="font-size:11px;font-weight:600">' + d + '</span>' +
            '<span style="font-size:10px;color:var(--text-tertiary)">' + info.total + ' staff · ' + info.high + ' high</span></div>' +
          '<div style="height:5px;border-radius:3px;background:var(--border)">' +
            '<div style="height:100%;width:' + riskPct + '%;border-radius:3px;background:' + barColor + '"></div></div></div>';
      }).join('');
      el.querySelectorAll('.emp-dept-row').forEach(function(row) {
        row.onclick = function() {
          filterDept = row.dataset.dept;
          page.querySelector('#emp-dept-filter').value = filterDept;
          renderAll();
        };
      });
    }

    function renderEmployeeCard(e) {
      var borderColor = e.category === 'high' ? 'var(--red)' : e.category === 'medium' ? 'var(--orange)' : 'var(--teal)';
      var ringColor = borderColor;
      var newBadge = e.isNew ? '<span style="padding:2px 8px;border-radius:6px;background:rgba(108,99,255,0.08);color:#6C63FF;font-size:9px;font-weight:700;margin-left:6px">🆕 NEW</span>' : '';
      var card = '<div class="card" style="border-left:4px solid ' + borderColor + ';margin-bottom:12px;padding:18px">';

      /* Header row */
      card += '<div style="display:flex;align-items:center;gap:14px;margin-bottom:' + (e.signals.length > 0 ? '12px' : '0') + '">' +
        '<div class="avatar avatar-sm" style="background:' + e.bg + ';color:' + e.color + '">' + e.init + '</div>' +
        '<div style="flex:1">' +
          '<div style="display:flex;align-items:center"><p style="font-size:14px;font-weight:600">' + e.name + '</p>' + newBadge + '</div>' +
          '<p style="font-size:11px;color:var(--text-tertiary)">' + e.pos + ' · ' + e.dept + ' · ' + e.tenure + '</p>' +
          '<p style="font-size:10px;color:var(--text-tertiary);margin-top:2px">ID: ' + e.id + ' · Joined: ' + e.joinDate + '</p>' +
        '</div>' +
        '<div style="width:48px;height:48px;border-radius:50%;border:3px solid ' + ringColor + ';display:flex;align-items:center;justify-content:center">' +
          '<span style="font-size:14px;font-weight:800;color:' + ringColor + '">' + e.risk + '%</span></div></div>';

      /* AI Signals */
      if (e.signals.length > 0) {
        var badgeClass = e.category === 'high' ? 'badge-red' : 'badge-orange';
        card += '<div style="margin-bottom:12px">' +
          '<p style="font-size:11px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.6px;margin-bottom:6px">🔍 AI SIGNALS</p>' +
          '<div style="display:flex;flex-wrap:wrap;gap:6px">' +
          e.signals.map(function(s) { return '<span class="badge ' + badgeClass + '" style="font-size:10px">' + s + '</span>'; }).join('') +
          '</div></div>';
      }

      /* AI Recommendations */
      if (e.actions.length > 0) {
        card += '<div>' +
          '<p style="font-size:11px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.6px;margin-bottom:6px">💡 AI RECOMMENDATIONS</p>' +
          '<div style="display:flex;flex-wrap:wrap;gap:6px">' +
          e.actions.map(function(a) { return '<button class="btn-glass" style="font-size:11px;padding:6px 12px">' + a + '</button>'; }).join('') +
          '</div></div>';
      }

      card += '</div>';
      return card;
    }

    function renderList(data) {
      var listEl = page.querySelector('#emp-list');
      var infoEl = page.querySelector('#emp-filter-info');

      var filters = [];
      if (currentTab !== 'all') filters.push('Category: ' + currentTab);
      if (filterDept !== 'All') filters.push('Dept: ' + filterDept);
      if (searchQuery) filters.push('Search: "' + searchQuery + '"');
      infoEl.textContent = filters.length > 0 ? '🔍 ' + filters.join(' · ') + ' — ' + data.length + ' employee' + (data.length !== 1 ? 's' : '') : 'Showing all ' + data.length + ' employees';

      if (data.length === 0) {
        listEl.innerHTML = '<div class="card" style="padding:40px;text-align:center">' +
          '<p style="font-size:28px;margin-bottom:8px">👥</p>' +
          '<p style="font-size:14px;font-weight:600;color:var(--text-secondary)">No employees match your filters</p>' +
          '<p style="font-size:12px;color:var(--text-tertiary);margin-top:4px">Try adjusting your search or filters</p></div>';
        return;
      }

      /* Group by category */
      var high = data.filter(function(e) { return e.category === 'high'; });
      var med = data.filter(function(e) { return e.category === 'medium'; });
      var low = data.filter(function(e) { return e.category === 'low' && !e.isNew; });
      var newH = data.filter(function(e) { return e.isNew; });
      var html = '';

      if (high.length > 0) {
        html += '<div class="section-header" style="margin-bottom:12px"><h2 style="color:var(--red)">🔴 High Risk (' + high.length + ')</h2></div>';
        html += high.map(renderEmployeeCard).join('');
        html += '<div style="margin-bottom:24px"></div>';
      }
      if (med.length > 0) {
        html += '<div class="section-header" style="margin-bottom:12px"><h2 style="color:var(--orange)">🟡 Medium Risk (' + med.length + ')</h2></div>';
        html += med.map(renderEmployeeCard).join('');
        html += '<div style="margin-bottom:24px"></div>';
      }
      if (low.length > 0) {
        html += '<div class="section-header" style="margin-bottom:12px"><h2 style="color:var(--teal)">🟢 Low Risk (' + low.length + ')</h2></div>';
        html += low.map(renderEmployeeCard).join('');
        html += '<div style="margin-bottom:24px"></div>';
      }
      if (newH.length > 0) {
        html += '<div class="section-header" style="margin-bottom:12px"><h2 style="color:#6C63FF">🆕 New Hires (' + newH.length + ')</h2></div>';
        html += newH.map(renderEmployeeCard).join('');
      }

      listEl.innerHTML = html;
    }

    function updateTabUI() {
      page.querySelectorAll('.emp-tab').forEach(function(t) {
        var isActive = t.dataset.tab === currentTab;
        t.style.borderColor = isActive ? 'var(--teal)' : 'var(--glass-border)';
        t.style.background = isActive ? 'rgba(0,167,157,0.06)' : 'transparent';
        t.style.color = isActive ? 'var(--teal)' : 'var(--text-secondary)';
        t.classList.toggle('active', isActive);
      });
    }

    function renderAll() {
      var data = getFiltered();
      renderStats(data);
      renderList(data);
    }

    /* Initial render */
    renderAll();
    renderDeptBreakdown();

    /* ── Tab clicks ── */
    page.querySelectorAll('.emp-tab').forEach(function(tab) {
      tab.onclick = function() {
        currentTab = tab.dataset.tab;
        updateTabUI();
        renderAll();
      };
    });

    /* ── Search ── */
    page.querySelector('#emp-search').addEventListener('input', function() {
      searchQuery = this.value.trim();
      renderAll();
    });

    /* ── Department filter ── */
    page.querySelector('#emp-dept-filter').onchange = function() {
      filterDept = this.value;
      renderAll();
    };

  });

  return page;
});
