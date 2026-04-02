/* ─── Seeker Home Page ─── */
Router.register('/home', function renderHomeSeeker() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/home'));

  const allJobs = [
    { id:1, init:'RO', title:'Recruitment Officer', co:'Metfone', dept:'Human Resources', loc:'Phnom Penh', type:'Full-time', salary:800, time:'2d ago', accent:'#ED1C24', match:92, hot:true, applicants:34, tags:['HR','Recruiting','Communication'], desc:'Join our HR team to lead talent acquisition across Cambodia. Work with hiring managers to source and evaluate top candidates.' },
    { id:2, init:'NE', title:'Network Engineer', co:'Metfone', dept:'IT & Engineering', loc:'Siem Reap', type:'Full-time', salary:1200, time:'3d ago', accent:'#00A79D', match:87, hot:true, applicants:21, tags:['Networking','Cisco','Linux'], desc:'Design and maintain enterprise network infrastructure. Ensure 99.9% uptime across all regional offices.' },
    { id:3, init:'MA', title:'Mobile App Developer', co:'Metfone', dept:'IT & Engineering', loc:'Phnom Penh', type:'Contract', salary:1500, time:'5d ago', accent:'#E87C1E', match:78, hot:false, applicants:45, tags:['iOS','Android','Flutter'], desc:'Build next-generation mobile apps for millions of Metfone subscribers. Flutter & native experience preferred.' },
    { id:4, init:'DA', title:'Data Analyst', co:'Metfone', dept:'IT & Engineering', loc:'Battambang', type:'Full-time', salary:900, time:'1w ago', accent:'#00A79D', match:74, hot:false, applicants:18, tags:['SQL','Python','Tableau'], desc:'Transform raw data into strategic insights. Build dashboards and reports for executive decision-making.' },
    { id:5, init:'CS', title:'Customer Success Lead', co:'Metfone', dept:'Customer Experience', loc:'Phnom Penh', type:'Full-time', salary:950, time:'1w ago', accent:'#E87C1E', match:70, hot:false, applicants:27, tags:['CRM','Leadership','Support'], desc:'Lead the customer success team. Drive retention, satisfaction, and upsell across enterprise accounts.' },
    { id:6, init:'PM', title:'Project Manager', co:'Metfone', dept:'Operations', loc:'Phnom Penh', type:'Full-time', salary:1100, time:'3d ago', accent:'#ED1C24', match:82, hot:true, applicants:31, tags:['Agile','Scrum','Leadership'], desc:'Manage cross-functional projects from kick-off to delivery. Drive on-time execution across departments.' },
    { id:7, init:'UX', title:'UX/UI Designer', co:'Metfone', dept:'IT & Engineering', loc:'Phnom Penh', type:'Full-time', salary:1000, time:'4d ago', accent:'#00A79D', match:80, hot:false, applicants:38, tags:['Figma','Prototyping','Design Systems'], desc:'Design beautiful, user-centered digital products. Create design systems for web and mobile platforms.' },
    { id:8, init:'SA', title:'Sales Account Executive', co:'Metfone', dept:'Sales & Marketing', loc:'Siem Reap', type:'Full-time', salary:750, time:'5d ago', accent:'#E87C1E', match:68, hot:false, applicants:52, tags:['B2B','SaaS','Negotiation'], desc:'Drive enterprise sales across key accounts. Build relationships and close high-value deals in the telecom sector.' },
    { id:9, init:'FE', title:'Frontend Developer', co:'Metfone', dept:'IT & Engineering', loc:'Phnom Penh', type:'Contract', salary:1300, time:'1d ago', accent:'#00A79D', match:85, hot:true, applicants:29, tags:['React','TypeScript','Tailwind'], desc:'Build performant web applications with modern frameworks. Join the digital transformation team.' },
    { id:10, init:'HR', title:'HR Business Partner', co:'Metfone', dept:'Human Resources', loc:'Phnom Penh', type:'Full-time', salary:1400, time:'6d ago', accent:'#ED1C24', match:76, hot:false, applicants:15, tags:['Strategy','People Ops','Analytics'], desc:'Partner with leadership to align HR strategy with business objectives. Drive organizational development initiatives.' },
    { id:11, init:'QA', title:'QA Engineer', co:'Metfone', dept:'IT & Engineering', loc:'Battambang', type:'Full-time', salary:850, time:'1w ago', accent:'#00A79D', match:72, hot:false, applicants:22, tags:['Selenium','Cypress','API Testing'], desc:'Ensure software quality through automated and manual testing. Build robust test frameworks and CI/CD pipelines.' },
    { id:12, init:'MK', title:'Digital Marketing Lead', co:'Metfone', dept:'Sales & Marketing', loc:'Phnom Penh', type:'Full-time', salary:1050, time:'2d ago', accent:'#E87C1E', match:65, hot:false, applicants:41, tags:['SEO','Social Media','Analytics'], desc:'Lead digital marketing campaigns across all channels. Drive brand awareness and customer acquisition for Metfone.' },
  ];

  /* Filter state */
  let activeFilters = { loc: 'All', type: 'All', dept: 'All', sort: 'match' };
  const locations = ['All', 'Phnom Penh', 'Siem Reap', 'Battambang'];
  const types = ['All', 'Full-time', 'Contract', 'Part-time'];
  const depts = ['All', 'IT & Engineering', 'Human Resources', 'Sales & Marketing', 'Operations', 'Customer Experience'];

  function getFilteredJobs() {
    let filtered = allJobs.filter(j => {
      if (activeFilters.loc !== 'All' && j.loc !== activeFilters.loc) return false;
      if (activeFilters.type !== 'All' && j.type !== activeFilters.type) return false;
      if (activeFilters.dept !== 'All' && j.dept !== activeFilters.dept) return false;
      return true;
    });
    const q = (document.getElementById('jobSearch')?.value || '').toLowerCase();
    if (q) filtered = filtered.filter(j => j.title.toLowerCase().includes(q) || j.tags.some(t => t.toLowerCase().includes(q)) || j.dept.toLowerCase().includes(q) || j.loc.toLowerCase().includes(q));
    if (activeFilters.sort === 'match') filtered.sort((a, b) => b.match - a.match);
    else if (activeFilters.sort === 'salary') filtered.sort((a, b) => b.salary - a.salary);
    else if (activeFilters.sort === 'recent') filtered.sort((a, b) => a.id > 6 ? -1 : 1);
    return filtered;
  }

  const main = el('div', { className: 'main-content' });

  function render() {
    const jobs = getFilteredJobs();
    const featured = jobs.length && jobs[0].match >= 85 ? jobs[0] : null;
    const rest = featured ? jobs.slice(1) : jobs;

    main.innerHTML = `${bgOrbs()}
    <style>
      @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      @keyframes gentlePulse{0%,100%{opacity:0.7}50%{opacity:1}}
      @keyframes slideIn{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:translateX(0)}}

      .s-pill{padding:6px 16px;font-size:12px;font-weight:600;border-radius:20px;cursor:pointer;transition:all 0.25s;white-space:nowrap;border:1.5px solid #E5E5EA;background:#fff;color:var(--text-secondary)}
      .s-pill:hover{border-color:#ED1C24;color:#ED1C24}
      .s-pill.active{background:#ED1C24;color:white;border-color:#ED1C24;box-shadow:0 2px 10px rgba(237,28,36,0.2)}
      .s-select{appearance:none;background:#fff;border:1.5px solid #E5E5EA;border-radius:12px;padding:8px 34px 8px 12px;font-size:12px;font-weight:500;color:var(--text);cursor:pointer;outline:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238E8E93' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;transition:border-color 0.2s}
      .s-select:hover,.s-select:focus{border-color:#ED1C24}

      .feat-card{position:relative;overflow:hidden;border-radius:20px;cursor:pointer;background:#fff;border:1.5px solid #E5E5EA;transition:all 0.35s cubic-bezier(.4,0,.2,1)}
      .feat-card:hover{transform:translateY(-3px);box-shadow:0 16px 48px rgba(237,28,36,0.08);border-color:#ED1C24}

      .jcard{cursor:pointer;overflow:hidden;transition:all 0.3s cubic-bezier(.4,0,.2,1);border:1.5px solid #EFEFEF;background:#fff;border-radius:16px;animation:fadeUp 0.4s ease-out both}
      .jcard:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,0.06);border-color:rgba(237,28,36,0.25)}
      .jcard .jcard-accent{transition:width 0.3s}
      .jcard:hover .jcard-accent{width:100%!important}

      .match-dot{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;font-size:11px;font-weight:800}
      .tag-chip{font-size:10px;font-weight:600;padding:3px 10px;border-radius:8px;letter-spacing:0.2px}

      .filter-row{display:flex;gap:8px;align-items:center;overflow-x:auto;-webkit-overflow-scrolling:touch;padding:2px 0;scrollbar-width:none}
      .filter-row::-webkit-scrollbar{display:none}
      .cnt-badge{display:inline-flex;align-items:center;justify-content:center;min-width:22px;height:22px;border-radius:11px;background:#ED1C24;color:#fff;font-size:11px;font-weight:700;padding:0 7px}
      .no-results{text-align:center;padding:60px 20px;color:var(--text-tertiary)}
      .stat-card{background:#fff;border:1.5px solid #EFEFEF;border-radius:14px;display:flex;align-items:center;gap:12px;padding:14px 16px;cursor:pointer;transition:all 0.2s}
      .stat-card:hover{border-color:#ED1C24;box-shadow:0 4px 16px rgba(237,28,36,0.06)}
    </style>

    <div style="max-width:860px;margin:0 auto">

    <!-- Greeting -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:44px;height:44px;border-radius:50%;background:#FDE8E8;display:flex;align-items:center;justify-content:center;color:#ED1C24;font-weight:700;font-size:15px;position:relative;box-shadow:0 4px 12px rgba(237,28,36,0.12)">SC<span style="position:absolute;bottom:1px;right:1px;width:10px;height:10px;border-radius:50%;background:#34C759;border:2px solid white"></span></div>
        <div>
          <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:2px">Good morning 👋</p>
          <h1 style="font-family:var(--font-display);font-size:20px;font-weight:800;color:var(--black)">Sokha Chan</h1>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <button style="padding:7px 16px;font-size:11px;font-weight:600;border-radius:20px;background:#fff;border:1.5px solid #E5E5EA;color:var(--text);cursor:pointer;transition:all 0.2s" onclick="Router.navigate('/profile')" onmouseenter="this.style.borderColor='#ED1C24';this.style.color='#ED1C24'" onmouseleave="this.style.borderColor='#E5E5EA';this.style.color='var(--text)'">Profile 85%</button>
        <button onclick="Router.navigate('/notifications')" style="width:36px;height:36px;border-radius:50%;background:#fff;border:1.5px solid #E5E5EA;display:flex;align-items:center;justify-content:center;font-size:15px;position:relative;cursor:pointer;transition:border-color 0.2s" onmouseenter="this.style.borderColor='#ED1C24'" onmouseleave="this.style.borderColor='#E5E5EA'">🔔<span style="position:absolute;top:6px;right:6px;width:7px;height:7px;border-radius:50%;background:#ED1C24;border:2px solid white"></span></button>
      </div>
    </div>

    <!-- Search -->
    <div style="background:#fff;border:1.5px solid #E5E5EA;border-radius:14px;display:flex;align-items:center;gap:12px;padding:10px 16px;margin-bottom:18px;transition:border-color 0.2s" id="searchBox">
      <span style="font-size:16px;color:var(--text-tertiary)">🔍</span>
      <input id="jobSearch" type="text" placeholder="Search jobs, skills, locations…" style="flex:1;border:none;background:none;font-size:14px;outline:none;color:var(--black);font-weight:500" onfocus="document.getElementById('searchBox').style.borderColor='#ED1C24'" onblur="document.getElementById('searchBox').style.borderColor='#E5E5EA'">
      <button style="padding:7px 18px;font-size:11px;font-weight:700;color:white;background:#ED1C24;border:none;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:5px;transition:background 0.2s" onclick="Router.navigate('/chat/ai')" onmouseenter="this.style.background='#BE1E2D'" onmouseleave="this.style.background='#ED1C24'">✦ Ask AI</button>
    </div>

    <!-- Filters -->
    <div style="margin-bottom:22px">
      <div class="filter-row" style="margin-bottom:10px">
        <span style="font-size:11px;color:var(--text-tertiary);font-weight:600;flex-shrink:0;margin-right:2px">📍</span>
        ${locations.map(l => `<button class="s-pill loc-filter ${activeFilters.loc === l ? 'active' : ''}" data-val="${l}">${l}</button>`).join('')}
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <select class="s-select" id="filterType">
          ${types.map(t => `<option value="${t}" ${activeFilters.type === t ? 'selected' : ''}>${t === 'All' ? 'All Types' : t}</option>`).join('')}
        </select>
        <select class="s-select" id="filterDept">
          ${depts.map(d => `<option value="${d}" ${activeFilters.dept === d ? 'selected' : ''}>${d === 'All' ? 'All Departments' : d}</option>`).join('')}
        </select>
        <div style="flex:1"></div>
        <span style="font-size:11px;color:var(--text-tertiary);font-weight:500">Sort</span>
        <select class="s-select" id="filterSort">
          <option value="match" ${activeFilters.sort === 'match' ? 'selected' : ''}>Best Match</option>
          <option value="salary" ${activeFilters.sort === 'salary' ? 'selected' : ''}>Highest Salary</option>
          <option value="recent" ${activeFilters.sort === 'recent' ? 'selected' : ''}>Most Recent</option>
        </select>
      </div>
    </div>

    <!-- Results count -->
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
      <h2 style="font-family:var(--font-display);font-size:18px;font-weight:800;color:var(--black)">Jobs for You</h2>
      <span class="cnt-badge">${jobs.length}</span>
      ${activeFilters.loc !== 'All' || activeFilters.type !== 'All' || activeFilters.dept !== 'All' ? `<button id="clearFilters" style="font-size:11px;color:var(--text-tertiary);background:none;border:1.5px solid #E5E5EA;border-radius:8px;padding:4px 12px;cursor:pointer;font-weight:500;transition:all 0.2s" onmouseenter="this.style.borderColor='#ED1C24';this.style.color='#ED1C24'" onmouseleave="this.style.borderColor='#E5E5EA';this.style.color='var(--text-tertiary)'">Clear filters</button>` : ''}
    </div>

    ${featured ? `
    <!-- Featured -->
    <div class="feat-card" onclick="Router.navigate('/jobs/${featured.id}')" style="margin-bottom:18px">
      <div style="height:4px;background:linear-gradient(90deg,#ED1C24,#E87C1E)"></div>
      <div style="padding:24px 26px 22px;display:flex;gap:24px;align-items:flex-start">
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
            <div style="width:42px;height:42px;border-radius:12px;background:#FDE8E8;display:flex;align-items:center;justify-content:center;flex-shrink:0">${logoHTML('sm')}</div>
            <div>
              <p style="font-size:11px;color:var(--text-tertiary);font-weight:500">${featured.co} · ${featured.dept}</p>
            </div>
            <div style="margin-left:auto;display:flex;gap:6px">
              <span style="font-size:10px;font-weight:700;color:#ED1C24;background:#FDE8E8;padding:4px 10px;border-radius:8px">TOP MATCH</span>
              ${featured.hot ? '<span style="font-size:10px;font-weight:600;color:#E87C1E;background:#FFF8F0;padding:4px 10px;border-radius:8px">Hot</span>' : ''}
            </div>
          </div>
          <h2 style="font-family:var(--font-display);font-size:22px;font-weight:800;margin-bottom:6px;color:var(--black);letter-spacing:-0.3px">${featured.title}</h2>
          <p style="font-size:13px;color:var(--text-secondary);line-height:1.6;margin-bottom:16px;max-width:480px">${featured.desc}</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">
            ${['📍 ' + featured.loc, '💼 ' + featured.type, '💰 $' + featured.salary.toLocaleString() + '/mo', '👥 ' + featured.applicants + ' applicants'].map(p => `<span style="font-size:11px;color:var(--text-secondary);background:#F5F5F7;padding:5px 12px;border-radius:8px;font-weight:500">${p}</span>`).join('')}
          </div>
          <div style="display:flex;gap:5px;flex-wrap:wrap">
            ${featured.tags.map(t => `<span class="tag-chip" style="color:#ED1C24;background:#FDE8E8">${t}</span>`).join('')}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px;flex-shrink:0;padding-top:30px">
          <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#ED1C24,#E87C1E);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(237,28,36,0.25)"><span style="font-size:16px;font-weight:800;color:white">${featured.match}%</span></div>
          <button style="padding:10px 24px;font-size:12px;font-weight:700;color:white;background:#ED1C24;border:none;border-radius:12px;cursor:pointer;white-space:nowrap;transition:all 0.2s;box-shadow:0 2px 10px rgba(237,28,36,0.2)" onclick="event.stopPropagation();Router.navigate('/jobs/${featured.id}')" onmouseenter="this.style.background='#BE1E2D';this.style.transform='translateY(-1px)'" onmouseleave="this.style.background='#ED1C24';this.style.transform=''">Apply Now →</button>
        </div>
      </div>
    </div>` : ''}

    ${rest.length === 0 && !featured ? `
    <div class="no-results">
      <p style="font-size:40px;margin-bottom:12px">🔍</p>
      <p style="font-size:16px;font-weight:700;margin-bottom:6px">No jobs found</p>
      <p style="font-size:13px">Try adjusting your filters or search terms</p>
    </div>` : ''}

    <!-- Job Grid -->
    ${rest.length ? `<div id="jobList" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:28px">
      ${rest.map((j, i) => `
        <div class="jcard" onclick="Router.navigate('/jobs/${j.id}')" style="padding:0;animation-delay:${i * 0.05}s">
          <div class="jcard-accent" style="height:3px;background:${j.accent};width:40%;border-radius:16px 0 0 0"></div>
          <div style="padding:18px 20px 16px">
            <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px">
              <div style="width:42px;height:42px;border-radius:12px;background:${j.accent}10;color:${j.accent};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0">${j.init}</div>
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">
                  <p style="font-size:14px;font-weight:700;color:var(--black);letter-spacing:-0.1px">${j.title}</p>
                  ${j.hot ? '<span style="font-size:9px;font-weight:700;color:#E87C1E;background:#FFF8F0;padding:2px 7px;border-radius:6px">Hot</span>' : ''}
                </div>
                <p style="font-size:11px;color:var(--text-tertiary)">${j.co} · ${j.dept}</p>
              </div>
            </div>
            <p style="font-size:12px;color:var(--text-secondary);line-height:1.5;margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${j.desc}</p>
            <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px">
              <span style="font-size:10px;color:var(--text-secondary);background:#F5F5F7;padding:3px 9px;border-radius:7px">📍 ${j.loc}</span>
              <span style="font-size:10px;color:var(--text-secondary);background:#F5F5F7;padding:3px 9px;border-radius:7px">💼 ${j.type}</span>
              <span style="font-size:10px;color:var(--text-secondary);background:#F5F5F7;padding:3px 9px;border-radius:7px">👥 ${j.applicants}</span>
            </div>
            <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:14px">
              ${j.tags.map(t => `<span class="tag-chip" style="color:${j.accent};background:${j.accent}10">${t}</span>`).join('')}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid #F0F0F2">
              <div>
                <p style="font-size:17px;font-weight:800;color:var(--black);letter-spacing:-0.3px">$${j.salary.toLocaleString()}<span style="font-size:10px;color:var(--text-tertiary);font-weight:400">/mo</span></p>
                <p style="font-size:9px;color:var(--text-tertiary);margin-top:1px">${j.time}</p>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <div class="match-dot" style="background:${j.match >= 80 ? j.accent + '12' : '#F5F5F7'};color:${j.match >= 80 ? j.accent : 'var(--text-tertiary)'};border:2px solid ${j.match >= 80 ? j.accent : '#E5E5EA'}">${j.match}%</div>
                <button style="font-size:11px;font-weight:600;color:#fff;background:var(--black);border:none;padding:8px 16px;border-radius:10px;cursor:pointer;white-space:nowrap;transition:all 0.2s" onclick="event.stopPropagation();Router.navigate('/jobs/${j.id}')" onmouseenter="this.style.background='#ED1C24'" onmouseleave="this.style.background='var(--black)'">View →</button>
              </div>
            </div>
          </div>
        </div>`).join('')}
    </div>` : ''}

    <!-- Active Applications -->
    <div style="margin-bottom:28px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <h2 style="font-family:var(--font-display);font-size:17px;font-weight:800;color:var(--black)">Active Applications</h2>
        <a href="#/applications" style="font-size:12px;font-weight:600;color:#ED1C24;text-decoration:none">View all →</a>
      </div>
      <div style="display:flex;gap:10px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px;scrollbar-width:none">
        ${[
          { title:'Recruitment Officer', status:'In Review', color:'#00A79D', progress:25, icon:'📝' },
          { title:'Network Engineer', status:'Shortlisted', color:'#00A79D', progress:50, icon:'✅' },
          { title:'Mobile App Dev', status:'Interview', color:'#E87C1E', progress:75, icon:'🎤' },
        ].map(a => `
          <div style="min-width:220px;flex-shrink:0;padding:18px;cursor:pointer;transition:all 0.2s;border-radius:14px;background:#fff;border:1.5px solid #EFEFEF" onclick="Router.navigate('/tracking')"
               onmouseenter="this.style.transform='translateY(-2px)';this.style.borderColor='#ED1C24';this.style.boxShadow='0 4px 16px rgba(237,28,36,0.06)'" onmouseleave="this.style.transform='';this.style.borderColor='#EFEFEF';this.style.boxShadow='none'">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
              <span style="font-size:16px">${a.icon}</span>
              <p style="font-size:13px;font-weight:600;color:var(--black)">${a.title}</p>
            </div>
            <div style="height:4px;border-radius:2px;background:#F0F0F2;margin-bottom:10px"><div style="height:100%;width:${a.progress}%;border-radius:2px;background:${a.color};transition:width 0.5s"></div></div>
            <span style="font-size:10px;font-weight:600;color:${a.color};background:${a.color}10;padding:3px 10px;border-radius:8px">${a.status}</span>
          </div>`).join('')}
      </div>
    </div>

    </div>`;

    bindEvents();
  }

  function bindEvents() {
    /* Search */
    const input = document.getElementById('jobSearch');
    if (input) {
      input.addEventListener('input', () => render());
      /* Restore search value */
      const prev = main.querySelector('#jobSearch');
      if (prev && prev !== input) input.value = prev.value;
    }

    /* Location pills */
    main.querySelectorAll('.loc-filter').forEach(btn => {
      btn.onclick = () => { activeFilters.loc = btn.dataset.val; render(); };
    });

    /* Dropdowns */
    const typeSelect = document.getElementById('filterType');
    if (typeSelect) typeSelect.onchange = () => { activeFilters.type = typeSelect.value; render(); };
    const deptSelect = document.getElementById('filterDept');
    if (deptSelect) deptSelect.onchange = () => { activeFilters.dept = deptSelect.value; render(); };
    const sortSelect = document.getElementById('filterSort');
    if (sortSelect) sortSelect.onchange = () => { activeFilters.sort = sortSelect.value; render(); };

    /* Clear filters */
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) clearBtn.onclick = () => { activeFilters = { loc:'All', type:'All', dept:'All', sort: activeFilters.sort }; render(); };
  }

  render();
  page.appendChild(main);
  return page;
});