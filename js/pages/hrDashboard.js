/* ─── HR Dashboard Page ─── */
Router.register('/hr/dashboard', function renderHrDashboard() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/dashboard'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <!-- Officer Welcome -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <div style="display:flex;align-items:center;gap:16px">
            <div class="avatar avatar-xl" style="background:#F0F9F8;color:#00A79D;font-weight:700;position:relative">
              DS
              <span style="position:absolute;bottom:2px;right:2px;width:12px;height:12px;border-radius:50%;background:#34C759;border:2px solid white"></span>
            </div>
            <div>
              <h1 style="font-family:var(--font-display);font-size:22px;font-weight:700;margin-bottom:2px">Welcome back, Dara</h1>
              <p style="font-size:13px;color:var(--text-tertiary)">HR Officer · Phnom Penh Branch · <span style="color:var(--teal)">● Online</span></p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="position:relative;cursor:pointer">
              <span style="font-size:20px">🔔</span>
              <span style="position:absolute;top:-4px;right:-6px;width:18px;height:18px;border-radius:50%;background:var(--red);color:white;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center">3</span>
            </div>
            <p style="font-size:11px;color:var(--text-tertiary)">April 3, 2026</p>
          </div>
        </div>

        <div class="hero-card" style="margin-bottom:20px">
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px">
            ${[
              { num: '12', label: 'Active Jobs', sub: '↑ 3 this week', subColor: 'var(--teal)' },
              { num: '48', label: 'Total Applications', sub: '↑ 8 new today', subColor: 'var(--teal)' },
              { num: '7', label: 'Interviews This Week', sub: '3 today', subColor: 'var(--text-tertiary)' },
              { num: '3', label: 'Pending Offers', sub: '2 accepted', subColor: 'var(--teal)' },
            ].map((s, i) => `
              <div style="${i < 3 ? 'border-right:1px solid rgba(255,255,255,0.3);' : ''}padding:0 16px">
                <div style="font-family:var(--font-display);font-size:28px;font-weight:800">${s.num}</div>
                <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">${s.label}</div>
                <span style="font-size:11px;color:${s.subColor}">${s.sub}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Quick Actions -->
        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:24px">
          ${[
            { icon: '📋', title: 'Review Apps', desc: '15 pending', route: '/hr/applications' },
            { icon: '📅', title: 'Schedule', desc: '3 interviews', route: '/hr/dashboard' },
            { icon: '📊', title: 'Reports', desc: 'Weekly stats', route: '/hr/dashboard' },
            { icon: '👥', title: 'Team', desc: 'HR team', route: '/hr/employees' },
            { icon: '📢', title: 'Post Job', desc: 'New listing', route: '/hr/jobs/create' },
            { icon: '⚙️', title: 'Settings', desc: 'Preferences', route: '/hr/profile' },
          ].map(q => `
            <div class="quick-action" onclick="Router.navigate('${q.route}')" style="text-align:center;padding:14px 8px;border-radius:16px;background:var(--glass-bg);border:1px solid var(--glass-border);cursor:pointer;transition:all 0.2s">
              <div style="font-size:22px;margin-bottom:6px">${q.icon}</div>
              <div style="font-size:11px;font-weight:600;color:var(--black)">${q.title}</div>
              <div style="font-size:10px;color:var(--text-tertiary)">${q.desc}</div>
            </div>
          `).join('')}
        </div>

        <div class="stats-row" style="margin-bottom:24px">
          <div class="stat-card"><div class="number" style="color:var(--red)">15</div><div class="label">Under Review</div></div>
          <div class="stat-card"><div class="number" style="color:var(--teal)">18</div><div class="label">Shortlisted</div></div>
          <div class="stat-card"><div class="number" style="color:var(--orange)">7</div><div class="label">Scheduled</div></div>
          <div class="stat-card"><div class="number" style="color:var(--text-tertiary)">8</div><div class="label">Rejected</div></div>
        </div>

        <!-- Recruitment Pipeline -->
        <div class="section-header" style="margin-bottom:14px">
          <h2>Recruitment Pipeline</h2>
        </div>
        <div class="card card-lg" style="margin-bottom:24px;padding:20px">
          <div style="display:flex;align-items:center;gap:4px;margin-bottom:14px">
            ${[
              { label: 'Applied', count: 48, pct: 100, color: 'var(--text-secondary)' },
              { label: 'Screened', count: 33, pct: 69, color: 'var(--teal)' },
              { label: 'Interviewed', count: 18, pct: 38, color: 'var(--orange)' },
              { label: 'Finalist', count: 8, pct: 17, color: 'var(--red)' },
              { label: 'Offered', count: 3, pct: 6, color: '#6C63FF' },
            ].map((s, i) => `
              <div style="flex:${s.pct};text-align:center">
                <div style="background:${s.color};height:8px;border-radius:4px;margin-bottom:6px;opacity:0.85"></div>
                <p style="font-size:18px;font-weight:800;color:${s.color}">${s.count}</p>
                <p style="font-size:10px;color:var(--text-tertiary)">${s.label}</p>
              </div>
              ${i < 4 ? '<span style="font-size:12px;color:var(--text-tertiary);margin:0 2px">→</span>' : ''}
            `).join('')}
          </div>
        </div>

        <!-- Finalist Candidates -->
        <div class="section-header" style="margin-bottom:14px">
          <h2>🏆 Finalist Candidates</h2>
          <span style="font-size:12px;color:var(--text-tertiary)">Top candidates ready for offer</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px">
          ${[
            { id:'pk', init:'PK', name:'Piseth Keo', pos:'Mobile App Developer', score:95, dept:'IT', skills:['Swift','Kotlin','Flutter'], stage:'Final Interview Complete', bg:'#FFF8F0', color:'#E87C1E', rec:'Highly Recommended' },
            { id:'sc', init:'SC', name:'Sokha Chan', pos:'Sr. Network Engineer', score:93, dept:'IT', skills:['Cisco','AWS','Linux'], stage:'Technical Assessment Passed', bg:'#F0F9F8', color:'#00A79D', rec:'Highly Recommended' },
            { id:'cn', init:'CN', name:'Chantrea Nhem', pos:'UI/UX Designer', score:91, dept:'Product', skills:['Figma','Prototyping','Research'], stage:'Design Challenge Complete', bg:'#FDE8E8', color:'#ED1C24', rec:'Recommended' },
            { id:'ds', init:'DS', name:'Dara Sophal', pos:'Network Engineer', score:88, dept:'IT', skills:['Networking','Security','Cloud'], stage:'Panel Interview Done', bg:'#F0F9F8', color:'#00A79D', rec:'Recommended' },
            { id:'sp', init:'SP', name:'Sophal Tep', pos:'Project Manager', score:87, dept:'Operations', skills:['PMP','Agile','Budgeting'], stage:'Case Study Submitted', bg:'#FFF8F0', color:'#E87C1E', rec:'Recommended' },
            { id:'rs', init:'RS', name:'Ratana Sim', pos:'Data Analyst', score:86, dept:'BI', skills:['Python','SQL','Tableau'], stage:'Data Exercise Complete', bg:'#F0F0FF', color:'#6C63FF', rec:'Under Review' },
            { id:'nk', init:'NK', name:'Nary Kong', pos:'QA Engineer', score:85, dept:'IT', skills:['Selenium','Cypress','CI/CD'], stage:'Technical Test Done', bg:'#F0F9F8', color:'#00A79D', rec:'Recommended' },
            { id:'sr', init:'SR', name:'Sokha Rith', pos:'Recruitment Officer', score:84, dept:'HR', skills:['Sourcing','ATS','Interviewing'], stage:'HR Interview Complete', bg:'#FDE8E8', color:'#ED1C24', rec:'Under Review' },
          ].map((c, i) => `
            <div class="card" style="padding:16px;cursor:pointer;transition:all 0.2s;${i < 2 ? 'border-left:3px solid var(--teal);' : ''}" onclick="Router.navigate('/hr/applications/${c.id}')">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
                <div style="position:relative">
                  <div class="avatar avatar-sm" style="background:${c.bg};color:${c.color};font-weight:700">${c.init}</div>
                  <span style="position:absolute;-top:-4px;right:-4px;font-size:12px">${i < 3 ? '⭐' : ''}</span>
                </div>
                <div style="flex:1;min-width:0">
                  <div style="display:flex;align-items:center;gap:6px">
                    <p style="font-size:13px;font-weight:700">${c.name}</p>
                    ${i < 2 ? '<span class="badge badge-teal" style="font-size:9px">Top Pick</span>' : ''}
                  </div>
                  <p style="font-size:11px;color:var(--text-tertiary)">${c.pos} · ${c.dept}</p>
                </div>
                <div style="text-align:right">
                  <p style="font-size:18px;font-weight:800;color:${c.score >= 90 ? 'var(--teal)' : c.score >= 85 ? 'var(--orange)' : 'var(--text-secondary)'}">${c.score}%</p>
                </div>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">
                ${c.skills.map(s => `<span style="font-size:10px;padding:2px 8px;border-radius:8px;background:rgba(0,167,157,0.08);color:var(--teal);font-weight:600">${s}</span>`).join('')}
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between">
                <p style="font-size:11px;color:var(--text-tertiary)">✅ ${c.stage}</p>
                <span style="font-size:10px;font-weight:600;color:${c.rec === 'Highly Recommended' ? 'var(--teal)' : c.rec === 'Recommended' ? 'var(--orange)' : 'var(--text-tertiary)'}">${c.rec}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Interview Candidates -->
        <div class="section-header" style="margin-bottom:14px">
          <h2>📅 Interview Schedule</h2>
          <a href="#/hr/applications" class="link">See all</a>
        </div>
        <div class="stagger-children" style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
          ${[
            { id:'vr', init:'VR', name:'Vanna Ros', pos:'Marketing Coordinator', date:'Apr 3, 2:00 PM', type:'Panel Interview', room:'Room 3A · In-Person', interviewers:'Dara S., Mr. Khem', bg:'#FFF8F0', color:'#E87C1E', status:'Today', statusColor:'var(--red)' },
            { id:'dp', init:'DP', name:'Dara Pich', pos:'Customer Service Lead', date:'Apr 4, 10:00 AM', type:'Behavioral Interview', room:'Room 2B · In-Person', interviewers:'Dara S., Ms. Lim', bg:'#F0F9F8', color:'#00A79D', status:'Tomorrow', statusColor:'var(--orange)' },
            { id:'kl', init:'KL', name:'Kunthea Ly', pos:'HR Assistant', date:'Apr 4, 2:30 PM', type:'First Interview', room:'Google Meet · Online', interviewers:'Dara S.', bg:'#FDE8E8', color:'#ED1C24', status:'Tomorrow', statusColor:'var(--orange)' },
            { id:'pt', init:'PT', name:'Pheakdey Thun', pos:'Network Engineer', date:'Apr 7, 9:00 AM', type:'Technical Assessment', room:'Lab B · In-Person', interviewers:'Dara S., Mr. Vin', bg:'#F0F0FF', color:'#6C63FF', status:'Mon', statusColor:'var(--text-tertiary)' },
            { id:'sl', init:'SL', name:'Sreyleak Lim', pos:'Mobile App Developer', date:'Apr 7, 11:00 AM', type:'Coding Challenge', room:'Lab B · In-Person', interviewers:'Dara S., Ms. Noun', bg:'#F7F7F8', color:'#A7A9AB', status:'Mon', statusColor:'var(--text-tertiary)' },
            { id:'ms', init:'MS', name:'Mony Sam', pos:'Recruitment Officer', date:'Apr 8, 10:00 AM', type:'HR Screening', room:'Google Meet · Online', interviewers:'Dara S.', bg:'#F7F7F8', color:'#A7A9AB', status:'Tue', statusColor:'var(--text-tertiary)' },
            { id:'vt', init:'VT', name:'Vanna Tith', pos:'Data Analyst', date:'Apr 9, 2:00 PM', type:'Case Presentation', room:'Room 4A · In-Person', interviewers:'Dara S., Mr. Pan', bg:'#FFF8F0', color:'#E87C1E', status:'Wed', statusColor:'var(--text-tertiary)' },
          ].map((c, i) => `
            <div class="card" style="padding:16px;display:flex;align-items:center;gap:14px;cursor:pointer;${i === 0 ? 'border-left:3px solid var(--red);background:rgba(237,28,36,0.03);' : ''}" onclick="Router.navigate('/hr/applications/${c.id}')">
              <div class="avatar avatar-sm" style="background:${c.bg};color:${c.color};font-weight:700">${c.init}</div>
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px">
                  <p style="font-size:13px;font-weight:700">${c.name}</p>
                  <span style="font-size:10px;font-weight:700;color:${c.statusColor}">${c.status}</span>
                </div>
                <p style="font-size:11px;color:var(--text-tertiary)">${c.pos}</p>
                <div style="display:flex;align-items:center;gap:8px;margin-top:4px;font-size:11px;color:var(--text-tertiary)">
                  <span>🗓 ${c.date}</span>
                  <span>·</span>
                  <span>${c.type}</span>
                </div>
              </div>
              <div style="text-align:right;flex-shrink:0">
                <p style="font-size:11px;font-weight:600;color:var(--text-secondary)">${c.room}</p>
                <p style="font-size:10px;color:var(--text-tertiary);margin-top:2px">👥 ${c.interviewers}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Recent Applications -->
        <div class="section-header">
          <h2>Recent Applications</h2>
          <a href="#/hr/applications" class="link">See all</a>
        </div>

        <div class="stagger-children" style="display:flex;flex-direction:column;gap:8px">
          ${[
            { id: 'sr', init: 'SR', name: 'Sokha Rith', pos: 'Recruitment Officer', date: 'Dec 2', status: 'In Review', badge: 'badge-red', bg: '#FDE8E8', color: '#ED1C24' },
            { id: 'ds', init: 'DS', name: 'Dara Sophal', pos: 'Network Engineer', date: 'Nov 28', status: 'Shortlisted', badge: 'badge-teal', bg: '#F0F9F8', color: '#00A79D' },
            { id: 'pk', init: 'PK', name: 'Piseth Keo', pos: 'Mobile App Developer', date: 'Nov 25', status: 'Interview', badge: 'badge-orange', bg: '#FFF8F0', color: '#E87C1E' },
            { id: 'cn', init: 'CN', name: 'Chantrea Nhem', pos: 'UI/UX Designer', date: 'Mar 15', status: 'Offer Sent', badge: 'badge-teal', bg: '#FDE8E8', color: '#ED1C24' },
            { id: 'sc', init: 'SC', name: 'Sokha Chan', pos: 'Sr. Network Engineer', date: 'Mar 28', status: 'In Review', badge: 'badge-red', bg: '#F0F9F8', color: '#00A79D' },
          ].map(a => `
            <div class="card" style="display:flex;align-items:center;gap:14px;cursor:pointer" onclick="Router.navigate('/hr/applications/${a.id}')">
              <div class="avatar avatar-sm" style="background:${a.bg};color:${a.color}">${a.init}</div>
              <div style="flex:1">
                <p style="font-size:13px;font-weight:600">${a.name}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${a.pos}</p>
              </div>
              <span style="font-size:11px;color:var(--text-tertiary)">${a.date}</span>
              <span class="badge ${a.badge}">${a.status}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="col-side">
        <!-- Today's Schedule -->
        <div class="card card-lg" style="margin-bottom:20px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:4px">Today's Schedule</h3>
          <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:16px">April 3, 2026</p>

          <div style="display:flex;flex-direction:column;gap:10px">
            ${[
              { time: '09:00', color: 'var(--red)', bg: '#FFF0F0', title: 'Interview — Sokha R.', sub: 'Recruitment Officer · Room 3A' },
              { time: '11:00', color: 'var(--teal)', bg: '#F0F9F8', title: 'Review session', sub: 'Network Engineer candidates · Online' },
              { time: '14:00', color: 'var(--orange)', bg: '#FFF8F0', title: 'Panel Interview — Vanna R.', sub: 'Marketing Coordinator · Room 3A' },
              { time: '15:30', color: '#6C63FF', bg: '#F0F0FF', title: 'Offer review — Chantrea N.', sub: 'UI/UX Designer · HR Office' },
            ].map(e => `
              <div style="background:${e.bg};border-radius:14px;padding:14px 16px">
                <p style="font-size:12px;font-weight:700;color:${e.color};margin-bottom:2px">${e.time}</p>
                <p style="font-size:13px;font-weight:600">${e.title}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${e.sub}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Hiring Progress by Department -->
        <div class="card card-lg" style="margin-bottom:20px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:14px">Hiring by Department</h3>
          ${[
            { dept: 'IT Department', open: 4, filled: 1, total: 5, color: 'var(--teal)' },
            { dept: 'HR Department', open: 1, filled: 0, total: 1, color: 'var(--red)' },
            { dept: 'Marketing', open: 1, filled: 0, total: 1, color: 'var(--orange)' },
            { dept: 'Operations', open: 1, filled: 0, total: 1, color: '#6C63FF' },
            { dept: 'Business Intel.', open: 1, filled: 0, total: 1, color: '#00A79D' },
          ].map(d => `
            <div style="margin-bottom:14px">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:12px;font-weight:600">${d.dept}</span>
                <span style="font-size:11px;color:var(--text-tertiary)">${d.filled}/${d.total} filled</span>
              </div>
              <div style="height:6px;border-radius:3px;background:rgba(255,255,255,0.1);overflow:hidden">
                <div style="height:100%;width:${(d.filled/d.total)*100}%;background:${d.color};border-radius:3px;transition:width 0.5s"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Quick Actions -->
        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:14px">Quick Actions</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            <a href="#/hr/jobs/create" style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:var(--radius-lg);background:rgba(0,167,157,0.08);color:var(--teal);text-decoration:none;font-size:13px;font-weight:600;transition:background 0.2s">
              📝 Post New Job
            </a>
            <a href="#/hr/applications" style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:var(--radius-lg);background:rgba(237,28,36,0.08);color:var(--red);text-decoration:none;font-size:13px;font-weight:600;transition:background 0.2s">
              📋 Review Applications
            </a>
            <a href="#/hr/candidates/rank" style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:var(--radius-lg);background:rgba(232,124,30,0.08);color:var(--orange);text-decoration:none;font-size:13px;font-weight:600;transition:background 0.2s">
              🏆 Talent Ranking
            </a>
            <a href="#/hr/messages" style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:var(--radius-lg);background:rgba(108,99,255,0.08);color:#6C63FF;text-decoration:none;font-size:13px;font-weight:600;transition:background 0.2s">
              💬 Messages (12 unread)
            </a>
          </div>
        </div>

        <!-- My Tasks -->
        <div class="card card-lg" style="margin-top:20px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:14px">My Tasks</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;background:rgba(0,167,157,0.04)">
              <span style="width:22px;height:22px;border-radius:50%;background:#00A79D;color:white;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0">✓</span>
              <p style="font-size:12px;color:var(--text-tertiary);text-decoration:line-through;flex:1">Review Sokha's application – Recruitment Officer</p>
              <span class="badge badge-green" style="font-size:10px">Done</span>
            </div>
            <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;background:rgba(232,124,30,0.04)">
              <span style="width:22px;height:22px;border-radius:50%;border:2px solid var(--orange);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0"></span>
              <p style="font-size:12px;flex:1">Schedule interview with Dara S. – Network Engineer</p>
              <span class="badge badge-orange" style="font-size:10px">Pending</span>
            </div>
            <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;background:rgba(232,124,30,0.04)">
              <span style="width:22px;height:22px;border-radius:50%;border:2px solid var(--orange);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0"></span>
              <p style="font-size:12px;flex:1">Send offer letter to accepted candidates</p>
              <span class="badge badge-orange" style="font-size:10px">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
