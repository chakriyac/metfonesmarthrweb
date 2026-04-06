/* ─── HR Interview Management Page ─── */

Router.register('/hr/interviews', function renderHrInterviews() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/interviews'));

  /* ── Employee directory for panel invites ── */
  const companyStaff = [
    { id:'ds2',init:'DS',name:'Dara Samnang',role:'HR Officer',dept:'HR Department',bg:'#FDE8E8',color:'#ED1C24',email:'dara.s@metfone.com' },
    { id:'vd2',init:'VD',name:'Visal Deth',role:'HR Specialist',dept:'HR Department',bg:'#FDE8E8',color:'#ED1C24',email:'visal.d@metfone.com' },
    { id:'tk2',init:'TK',name:'Theary Kong',role:'Training Lead',dept:'HR Department',bg:'#FDE8E8',color:'#ED1C24',email:'theary.k@metfone.com' },
    { id:'vm2',init:'VM',name:'Mr. Vin',role:'IT Manager',dept:'IT Department',bg:'#F0F9F8',color:'#00A79D',email:'vin@metfone.com' },
    { id:'mn2',init:'MN',name:'Ms. Noun',role:'Mobile Team Lead',dept:'IT Department',bg:'#FFF8F0',color:'#E87C1E',email:'noun@metfone.com' },
    { id:'sm2',init:'SM',name:'Sopheap Meas',role:'Senior Developer',dept:'IT Department',bg:'#F0F9F8',color:'#00A79D',email:'sopheap.m@metfone.com' },
    { id:'rk2',init:'RK',name:'Rathana Kim',role:'QA Lead',dept:'IT Department',bg:'#F0F9F8',color:'#00A79D',email:'rathana.k@metfone.com' },
    { id:'kd2',init:'KD',name:'Mr. Khem',role:'Marketing Director',dept:'Marketing',bg:'#FFF8F0',color:'#E87C1E',email:'khem@metfone.com' },
    { id:'lm2',init:'LM',name:'Ms. Lim',role:'Operations Manager',dept:'Operations',bg:'#F0F9F8',color:'#00A79D',email:'lim@metfone.com' },
    { id:'bp2',init:'BP',name:'Mr. Pan',role:'BI Manager',dept:'Business Intelligence',bg:'#F0F0FF',color:'#6C63FF',email:'pan@metfone.com' },
    { id:'cl2',init:'CL',name:'Chanthy Lim',role:'Senior Analyst',dept:'Business Intelligence',bg:'#F0F0FF',color:'#6C63FF',email:'chanthy.l@metfone.com' },
    { id:'ps2',init:'PS',name:'Phally Sorn',role:'Finance Manager',dept:'Finance',bg:'#FFF8F0',color:'#E87C1E',email:'phally.s@metfone.com' },
    { id:'pm2',init:'PM',name:'Phearun Mak',role:'Product Manager',dept:'Product',bg:'#F0F0FF',color:'#6C63FF',email:'phearun.m@metfone.com' },
  ];

  /* ── Candidates available for interview (from _hrCandidates) ── */
  const allCandidates = typeof _hrCandidates !== 'undefined' ? Object.values(_hrCandidates) : [];

  /* ── Extract unique open positions ── */
  const openPositions = [...new Set(allCandidates.map(c => c.pos))].map(pos => {
    const candidates = allCandidates.filter(c => c.pos === pos);
    const dept = candidates[0].dept;
    return { pos, dept, count: candidates.length, candidates };
  });

  /* ── Pre-made scheduled interviews (fake data) ── */
  const scheduledInterviews = [
    { id:'iv1', title:'Mobile App Developer — Technical Round', pos:'Mobile App Developer', dept:'IT Department',
      date:'2026-04-08', time:'10:00', duration:'1 hour', type:'in-person', location:'Conference Room 3A, Metfone HQ',
      candidates: allCandidates.filter(c => c.pos==='Mobile App Developer' && c.status==='Interview').map(c => ({id:c.id,init:c.init,name:c.name,score:c.score,bg:c.bg,color:c.color})),
      panelMembers: [
        {id:'vm2',init:'VM',name:'Mr. Vin',role:'IT Manager',status:'accepted',bg:'#F0F9F8',color:'#00A79D'},
        {id:'mn2',init:'MN',name:'Ms. Noun',role:'Mobile Team Lead',status:'accepted',bg:'#FFF8F0',color:'#E87C1E'},
        {id:'ds2',init:'DS',name:'Dara Samnang',role:'HR Officer',status:'accepted',bg:'#FDE8E8',color:'#ED1C24'},
      ],
      status:'upcoming', agenda:'1. Introduction (5 min)\n2. Coding Challenge Review (20 min)\n3. System Design Question (15 min)\n4. Behavioral Questions (10 min)\n5. Q&A (10 min)'
    },
    { id:'iv2', title:'Marketing Coordinator — Panel Interview', pos:'Marketing Coordinator', dept:'Marketing',
      date:'2026-04-09', time:'14:00', duration:'45 minutes', type:'video', location:'https://meet.google.com/abc-defg-hij',
      candidates: allCandidates.filter(c => c.pos==='Marketing Coordinator').map(c => ({id:c.id,init:c.init,name:c.name,score:c.score,bg:c.bg,color:c.color})),
      panelMembers: [
        {id:'kd2',init:'KD',name:'Mr. Khem',role:'Marketing Director',status:'accepted',bg:'#FFF8F0',color:'#E87C1E'},
        {id:'ds2',init:'DS',name:'Dara Samnang',role:'HR Officer',status:'pending',bg:'#FDE8E8',color:'#ED1C24'},
      ],
      status:'upcoming', agenda:'1. Portfolio Review (10 min)\n2. Campaign Exercise (15 min)\n3. Team Fit Questions (15 min)\n4. Q&A (5 min)'
    },
    { id:'iv3', title:'Recruitment Officer — First Round', pos:'Recruitment Officer', dept:'HR Department',
      date:'2026-04-03', time:'09:30', duration:'45 minutes', type:'in-person', location:'Meeting Room 2B',
      candidates: allCandidates.filter(c => c.pos==='Recruitment Officer' && (c.status==='In Review' || c.status==='Interview')).map(c => ({id:c.id,init:c.init,name:c.name,score:c.score,bg:c.bg,color:c.color})),
      panelMembers: [
        {id:'ds2',init:'DS',name:'Dara Samnang',role:'HR Officer',status:'accepted',bg:'#FDE8E8',color:'#ED1C24'},
        {id:'vd2',init:'VD',name:'Visal Deth',role:'HR Specialist',status:'accepted',bg:'#FDE8E8',color:'#ED1C24'},
      ],
      status:'completed', agenda:'1. Introduction (5 min)\n2. Behavioral Questions (15 min)\n3. Scenario Exercise (15 min)\n4. Q&A (10 min)',
      evaluations: [
        {
          candidateId: allCandidates.find(c => c.pos==='Recruitment Officer' && c.name.includes('Sokha'))?.id || 'c10',
          candidateName: 'Sokha Rith', candidateInit: 'SR', candidateBg: '#FDE8E8', candidateColor: '#ED1C24', matchPct: 92,
          panelScores: [
            { panelId:'ds2', panelName:'Dara Samnang', panelRole:'HR Officer', panelInit:'DS', panelBg:'#FDE8E8', panelColor:'#ED1C24',
              scores: { 'Technical Knowledge': 88, 'Communication': 92, 'Problem Solving': 85, 'Culture Fit': 94, 'Experience': 90 },
              overall: 90, recommendation: 'Strong Hire', notes: 'Excellent communication skills and demonstrated strong understanding of recruitment processes. Very professional presentation.' },
            { panelId:'vd2', panelName:'Visal Deth', panelRole:'HR Specialist', panelInit:'VD', panelBg:'#FDE8E8', panelColor:'#ED1C24',
              scores: { 'Technical Knowledge': 86, 'Communication': 90, 'Problem Solving': 82, 'Culture Fit': 91, 'Experience': 88 },
              overall: 87, recommendation: 'Hire', notes: 'Good candidate with relevant experience. Handled scenario questions well. Would be a strong addition to the team.' },
          ],
          overallAvg: 88, finalRecommendation: 'Strong Hire'
        },
        {
          candidateId: allCandidates.find(c => c.pos==='Recruitment Officer' && c.name.includes('Kosal'))?.id || 'c11',
          candidateName: 'Kosal Vann', candidateInit: 'KV', candidateBg: '#F0F0FF', candidateColor: '#6C63FF', matchPct: 78,
          panelScores: [
            { panelId:'ds2', panelName:'Dara Samnang', panelRole:'HR Officer', panelInit:'DS', panelBg:'#FDE8E8', panelColor:'#ED1C24',
              scores: { 'Technical Knowledge': 72, 'Communication': 80, 'Problem Solving': 75, 'Culture Fit': 82, 'Experience': 70 },
              overall: 76, recommendation: 'Maybe', notes: 'Decent communication but lacked depth in recruitment methodologies. Could benefit from mentoring if hired.' },
            { panelId:'vd2', panelName:'Visal Deth', panelRole:'HR Specialist', panelInit:'VD', panelBg:'#FDE8E8', panelColor:'#ED1C24',
              scores: { 'Technical Knowledge': 68, 'Communication': 78, 'Problem Solving': 70, 'Culture Fit': 80, 'Experience': 65 },
              overall: 72, recommendation: 'Maybe', notes: 'Shows potential but lacks hands-on experience. Nervous during scenario exercises. Needs more development.' },
          ],
          overallAvg: 74, finalRecommendation: 'Maybe'
        }
      ]
    },
    { id:'iv4', title:'Data Analyst — Case Presentation', pos:'Data Analyst', dept:'Business Intelligence',
      date:'2026-04-10', time:'11:00', duration:'1.5 hours', type:'hybrid', location:'Room 3A + Google Meet',
      candidates: allCandidates.filter(c => c.pos==='Data Analyst').map(c => ({id:c.id,init:c.init,name:c.name,score:c.score,bg:c.bg,color:c.color})),
      panelMembers: [
        {id:'bp2',init:'BP',name:'Mr. Pan',role:'BI Manager',status:'accepted',bg:'#F0F0FF',color:'#6C63FF'},
        {id:'cl2',init:'CL',name:'Chanthy Lim',role:'Senior Analyst',status:'accepted',bg:'#F0F0FF',color:'#6C63FF'},
        {id:'ds2',init:'DS',name:'Dara Samnang',role:'HR Officer',status:'pending',bg:'#FDE8E8',color:'#ED1C24'},
      ],
      status:'upcoming', agenda:'1. Case Brief (10 min)\n2. Candidate Presentation (30 min)\n3. Panel Questions (25 min)\n4. SQL Exercise (15 min)\n5. Wrap-up (10 min)'
    },
  ];

  /* ── State ── */
  let interviews = [...scheduledInterviews];
  let currentTab = 'all';
  let createInvitedPanel = [];
  let createCandidates = [];

  /* ── Main Content ── */
  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <!-- Header -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
          <div>
            <h1 style="font-family:var(--font-display);font-size:22px;font-weight:700;margin-bottom:4px">📋 Interview Management</h1>
            <p style="font-size:13px;color:var(--text-tertiary)">Schedule & manage group interviews for open positions</p>
          </div>
          <button id="btn-create-interview" style="display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:14px;border:none;background:linear-gradient(135deg,var(--teal),#00C9BD);color:#fff;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(0,167,157,0.3);transition:transform 0.15s">
            ➕ Create Interview
          </button>
        </div>

        <!-- Stats Row -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px">
          <div class="card" style="padding:16px;text-align:center">
            <p style="font-size:24px;font-weight:800;color:var(--teal)">${interviews.filter(i => i.status==='upcoming').length}</p>
            <p style="font-size:11px;color:var(--text-tertiary);font-weight:600">Upcoming</p>
          </div>
          <div class="card" style="padding:16px;text-align:center">
            <p style="font-size:24px;font-weight:800;color:var(--orange)">${interviews.reduce((a,b) => a + b.candidates.length, 0)}</p>
            <p style="font-size:11px;color:var(--text-tertiary);font-weight:600">Candidates</p>
          </div>
          <div class="card" style="padding:16px;text-align:center">
            <p style="font-size:24px;font-weight:800;color:var(--red)">${interviews.reduce((a,b) => a + b.panelMembers.length, 0)}</p>
            <p style="font-size:11px;color:var(--text-tertiary);font-weight:600">Panel Members</p>
          </div>
          <div class="card" style="padding:16px;text-align:center">
            <p style="font-size:24px;font-weight:800;color:#6C63FF">${interviews.filter(i => i.status==='completed').length}</p>
            <p style="font-size:11px;color:var(--text-tertiary);font-weight:600">Completed</p>
          </div>
        </div>

        <!-- Tabs -->
        <div style="display:flex;gap:6px;margin-bottom:20px;flex-wrap:wrap" id="interview-tabs">
          <button class="iv-tab active" data-tab="all" style="padding:8px 18px;border-radius:12px;border:1.5px solid var(--teal);background:rgba(0,167,157,0.06);color:var(--teal);font-size:12px;font-weight:700;cursor:pointer">All (${interviews.length})</button>
          <button class="iv-tab" data-tab="upcoming" style="padding:8px 18px;border-radius:12px;border:1.5px solid var(--glass-border);background:transparent;color:var(--text-secondary);font-size:12px;font-weight:700;cursor:pointer">Upcoming (${interviews.filter(i=>i.status==='upcoming').length})</button>
          <button class="iv-tab" data-tab="completed" style="padding:8px 18px;border-radius:12px;border:1.5px solid var(--glass-border);background:transparent;color:var(--text-secondary);font-size:12px;font-weight:700;cursor:pointer">Completed (${interviews.filter(i=>i.status==='completed').length})</button>
        </div>

        <!-- Interview List -->
        <div id="interview-list" style="display:flex;flex-direction:column;gap:14px"></div>

      </div>

      <!-- Right Column – Sidebar -->
      <div class="col-side">
        <!-- Open Positions Summary -->
        <div class="card" style="padding:18px">
          <h3 style="font-size:13px;font-weight:700;margin-bottom:14px">📌 Open Positions</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${openPositions.map(p => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:12px;background:var(--glass-bg);border:1px solid var(--glass-border)">
                <div>
                  <p style="font-size:12px;font-weight:600">${p.pos}</p>
                  <p style="font-size:10px;color:var(--text-tertiary)">${p.dept}</p>
                </div>
                <span style="background:rgba(0,167,157,0.08);color:var(--teal);font-size:10px;font-weight:700;padding:3px 10px;border-radius:8px">${p.count} applicant${p.count>1?'s':''}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card" style="padding:18px;margin-top:14px">
          <h3 style="font-size:13px;font-weight:700;margin-bottom:14px">⚡ Quick Actions</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn-glass" id="qa-bulk-schedule" style="width:100%;text-align:left;padding:10px 14px;font-size:12px">📅 Bulk Schedule Interviews</button>
            <button class="btn-glass" onclick="Router.navigate('/hr/applications')" style="width:100%;text-align:left;padding:10px 14px;font-size:12px">📋 View All Applications</button>
            <button class="btn-glass" onclick="Router.navigate('/hr/candidates/rank')" style="width:100%;text-align:left;padding:10px 14px;font-size:12px">🏆 Talent Rankings</button>
          </div>
        </div>

        <!-- Today's Schedule -->
        <div class="card" style="padding:18px;margin-top:14px">
          <h3 style="font-size:13px;font-weight:700;margin-bottom:14px">📆 Upcoming This Week</h3>
          <div style="display:flex;flex-direction:column;gap:8px" id="upcoming-sidebar">
          </div>
        </div>
      </div>
    </div>
  `;

  page.appendChild(main);

  /* ═══════════════════════════════════════════════
     Event Handlers
     ═══════════════════════════════════════════════ */
  setTimeout(() => {

    /* ── Render interview cards ── */
    function renderInterviewList(filter) {
      const list = page.querySelector('#interview-list');
      const filtered = filter === 'all' ? interviews : interviews.filter(i => i.status === filter);

      if (filtered.length === 0) {
        list.innerHTML = `<div class="card" style="padding:40px;text-align:center">
          <p style="font-size:28px;margin-bottom:8px">📋</p>
          <p style="font-size:14px;font-weight:600;color:var(--text-secondary)">No interviews found</p>
          <p style="font-size:12px;color:var(--text-tertiary);margin-top:4px">Create a new interview to get started</p>
        </div>`;
        return;
      }

      list.innerHTML = filtered.map(iv => {
        const d = new Date(iv.date + 'T' + iv.time);
        const dateStr = d.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' });
        const isPast = iv.status === 'completed';
        const typeIcon = iv.type === 'in-person' ? '🏢' : iv.type === 'video' ? '📹' : '🔄';
        const statusBg = isPast ? 'rgba(0,167,157,0.08)' : 'rgba(232,124,30,0.08)';
        const statusColor = isPast ? 'var(--teal)' : 'var(--orange)';
        const statusLabel = isPast ? '✅ Completed' : '🔔 Upcoming';

        return `<div class="card interview-card" data-id="${iv.id}" style="padding:0;overflow:hidden;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s;border-left:4px solid ${isPast ? 'var(--teal)' : 'var(--orange)'}">
          <div style="padding:18px 20px">
            <!-- Header Row -->
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px">
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
                  <h3 style="font-size:14px;font-weight:700">${iv.title}</h3>
                  <span style="padding:3px 10px;border-radius:8px;font-size:10px;font-weight:700;background:${statusBg};color:${statusColor}">${statusLabel}</span>
                </div>
                <div style="display:flex;align-items:center;gap:12px;font-size:11px;color:var(--text-tertiary);flex-wrap:wrap">
                  <span>📅 ${dateStr}</span>
                  <span>🕐 ${iv.time}</span>
                  <span>⏱ ${iv.duration}</span>
                  <span>${typeIcon} ${iv.type === 'in-person' ? 'In-Person' : iv.type === 'video' ? 'Video Call' : 'Hybrid'}</span>
                  <span>📍 ${iv.location.length > 30 ? iv.location.substring(0,30)+'…' : iv.location}</span>
                </div>
              </div>
              <div style="text-align:right;flex-shrink:0">
                <p style="font-size:10px;font-weight:600;color:var(--text-tertiary);margin-bottom:2px">${iv.dept}</p>
              </div>
            </div>

            <!-- Candidates & Panel Row -->
            <div style="display:flex;gap:20px;flex-wrap:wrap">
              <!-- Candidates -->
              <div style="flex:1;min-width:180px">
                <p style="font-size:10px;font-weight:700;color:var(--text-tertiary);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">Candidates (${iv.candidates.length})</p>
                <div style="display:flex;flex-wrap:wrap;gap:6px">
                  ${iv.candidates.map(c => `
                    <div style="display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:10px;background:${c.bg};border:1px solid rgba(0,0,0,0.04);font-size:11px">
                      <span style="font-weight:700;color:${c.color};font-size:10px">${c.init}</span>
                      <span style="font-weight:600">${c.name.split(' ')[0]}</span>
                      <span style="font-size:9px;color:var(--text-tertiary)">${c.score}%</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Panel Members -->
              <div style="flex:1;min-width:180px">
                <p style="font-size:10px;font-weight:700;color:var(--text-tertiary);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">Interview Panel (${iv.panelMembers.length})</p>
                <div style="display:flex;flex-wrap:wrap;gap:6px">
                  ${iv.panelMembers.map(m => {
                    const sBg = m.status === 'accepted' ? 'rgba(0,167,157,0.08)' : 'rgba(232,124,30,0.08)';
                    const sIc = m.status === 'accepted' ? '✅' : '⏳';
                    return `<div style="display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:10px;background:${sBg};border:1px solid rgba(0,0,0,0.04);font-size:11px">
                      <span style="font-weight:700;color:${m.color};font-size:10px">${m.init}</span>
                      <span style="font-weight:600">${m.name.split(' ')[0]}</span>
                      <span style="font-size:9px">${sIc}</span>
                    </div>`;
                  }).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Expand footer -->
          <div class="iv-expand" data-id="${iv.id}" style="padding:10px 20px;background:var(--glass-bg);border-top:1px solid var(--glass-border);display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--text-tertiary)">
            <span>Click to view details & agenda</span>
            <span style="font-size:10px">▼</span>
          </div>

          <!-- Detail Panel (hidden) -->
          <div class="iv-detail" id="iv-detail-${iv.id}" style="display:none;padding:18px 20px;border-top:1px solid var(--glass-border);background:rgba(0,167,157,0.02)">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
              <div>
                <p style="font-size:10px;font-weight:700;color:var(--text-tertiary);margin-bottom:6px;text-transform:uppercase">Interview Agenda</p>
                <pre style="font-size:11px;line-height:1.6;white-space:pre-wrap;font-family:inherit;color:var(--text-secondary);margin:0">${iv.agenda}</pre>
              </div>
              <div>
                <p style="font-size:10px;font-weight:700;color:var(--text-tertiary);margin-bottom:6px;text-transform:uppercase">Location</p>
                <p style="font-size:12px;font-weight:600;margin-bottom:12px">${iv.location}</p>
                <p style="font-size:10px;font-weight:700;color:var(--text-tertiary);margin-bottom:6px;text-transform:uppercase">Duration</p>
                <p style="font-size:12px;font-weight:600;margin-bottom:12px">${iv.duration}</p>
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
                  ${!isPast ? `<button class="btn-glass iv-action-reschedule" data-id="${iv.id}" style="font-size:11px;padding:6px 14px">📅 Reschedule</button>` : ''}
                  ${!isPast ? `<button class="btn-glass iv-action-cancel" data-id="${iv.id}" style="font-size:11px;padding:6px 14px;color:var(--red)">✕ Cancel</button>` : ''}
                  ${isPast ? `<button class="btn-glass iv-action-eval" data-id="${iv.id}" style="font-size:11px;padding:6px 14px;color:var(--teal)">📊 View Evaluations</button>` : ''}
                  <button class="btn-glass iv-action-view" data-cid="${iv.candidates.length > 0 ? iv.candidates[0].id : ''}" style="font-size:11px;padding:6px 14px">👤 View Candidate</button>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      }).join('');

      /* Toggle detail */
      list.querySelectorAll('.interview-card').forEach(card => {
        card.onclick = (e) => {
          if (e.target.closest('button') && !e.target.closest('.iv-expand')) return;
          const id = card.dataset.id;
          const detail = card.querySelector('.iv-detail');
          const exp = card.querySelector('.iv-expand span:last-child');
          if (detail.style.display === 'none') {
            detail.style.display = 'block'; if(exp) exp.textContent = '▲';
          } else {
            detail.style.display = 'none'; if(exp) exp.textContent = '▼';
          }
        };
      });

      /* Action: View Candidate */
      list.querySelectorAll('.iv-action-view').forEach(btn => {
        btn.onclick = (e) => { e.stopPropagation(); if (btn.dataset.cid) Router.navigate('/hr/applications/' + btn.dataset.cid); };
      });

      /* Action: Cancel interview */
      list.querySelectorAll('.iv-action-cancel').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          if (confirm('Cancel this interview session?')) {
            interviews = interviews.filter(i => i.id !== btn.dataset.id);
            renderInterviewList(currentTab);
          }
        };
      });

      /* Action: Reschedule interview */
      list.querySelectorAll('.iv-action-reschedule').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const iv = interviews.find(i => i.id === btn.dataset.id);
          if (!iv) return;

          const existing = document.getElementById('rescheduleModal');
          if (existing) existing.remove();

          const overlay = document.createElement('div');
          overlay.id = 'rescheduleModal';
          overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);backdrop-filter:blur(6px);animation:fadeIn 0.3s ease';
          overlay.innerHTML = `
            <div style="width:480px;max-width:95vw;background:var(--card-bg,#fff);border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,0.18);overflow:hidden;animation:slideUp 0.35s cubic-bezier(0.25,0.1,0.25,1)">
              <div style="padding:20px 24px;border-bottom:1px solid var(--border)">
                <div style="display:flex;align-items:center;justify-content:space-between">
                  <div style="display:flex;align-items:center;gap:10px">
                    <span style="font-size:22px">📅</span>
                    <h3 style="font-size:15px;font-weight:700">Reschedule Interview</h3>
                  </div>
                  <button id="rsc-close" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--text-tertiary)">✕</button>
                </div>
                <p style="font-size:11px;color:var(--text-tertiary);margin-top:4px"><strong>${iv.title}</strong></p>
              </div>
              <div style="padding:20px 24px">
                <!-- Current schedule -->
                <div style="padding:12px 14px;border-radius:12px;background:rgba(237,28,36,0.04);border:1px solid rgba(237,28,36,0.1);margin-bottom:18px">
                  <p style="font-size:10px;font-weight:700;color:var(--red);margin-bottom:4px;text-transform:uppercase">Current Schedule</p>
                  <p style="font-size:12px;color:var(--text-secondary)">${new Date(iv.date+'T'+iv.time).toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})} at ${iv.time} · ${iv.duration}</p>
                  <p style="font-size:11px;color:var(--text-tertiary);margin-top:2px">📍 ${iv.location}</p>
                </div>

                <!-- New schedule -->
                <p style="font-size:10px;font-weight:700;color:var(--teal);margin-bottom:10px;text-transform:uppercase">New Schedule</p>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
                  <div>
                    <label style="font-size:10px;font-weight:600;color:var(--text-tertiary);display:block;margin-bottom:4px">DATE *</label>
                    <input id="rsc-date" type="date" value="${iv.date}" style="width:100%;padding:10px 12px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg)">
                  </div>
                  <div>
                    <label style="font-size:10px;font-weight:600;color:var(--text-tertiary);display:block;margin-bottom:4px">TIME *</label>
                    <input id="rsc-time" type="time" value="${iv.time}" style="width:100%;padding:10px 12px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg)">
                  </div>
                </div>
                <div style="margin-bottom:14px">
                  <label style="font-size:10px;font-weight:600;color:var(--text-tertiary);display:block;margin-bottom:4px">DURATION</label>
                  <select id="rsc-duration" style="width:100%;padding:10px 12px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg)">
                    <option ${iv.duration==='30 minutes'?'selected':''}>30 minutes</option>
                    <option ${iv.duration==='45 minutes'?'selected':''}>45 minutes</option>
                    <option ${iv.duration==='1 hour'?'selected':''}>1 hour</option>
                    <option ${iv.duration==='1.5 hours'?'selected':''}>1.5 hours</option>
                    <option ${iv.duration==='2 hours'?'selected':''}>2 hours</option>
                  </select>
                </div>
                <div style="margin-bottom:14px">
                  <label style="font-size:10px;font-weight:600;color:var(--text-tertiary);display:block;margin-bottom:4px">LOCATION / MEETING LINK</label>
                  <input id="rsc-location" type="text" value="${iv.location}" style="width:100%;padding:10px 12px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg)">
                </div>
                <div style="margin-bottom:14px">
                  <label style="font-size:10px;font-weight:600;color:var(--text-tertiary);display:block;margin-bottom:4px">REASON FOR RESCHEDULING (optional)</label>
                  <textarea id="rsc-reason" rows="2" placeholder="e.g. Panel member unavailable, candidate conflict…" style="width:100%;padding:10px 12px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg);font-family:inherit;resize:vertical"></textarea>
                </div>
                <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:12px;background:rgba(232,124,30,0.04);border:1px solid rgba(232,124,30,0.1)">
                  <input type="checkbox" id="rsc-notify" checked style="accent-color:var(--orange);width:14px;height:14px">
                  <div>
                    <p style="font-size:11px;font-weight:600">Notify all participants</p>
                    <p style="font-size:10px;color:var(--text-tertiary)">${iv.panelMembers.length} panel members + ${iv.candidates.length} candidate${iv.candidates.length>1?'s':''} will be notified</p>
                  </div>
                </div>
              </div>
              <div style="padding:14px 24px;border-top:1px solid var(--border);display:flex;justify-content:space-between">
                <button id="rsc-cancel" style="padding:10px 20px;border-radius:12px;border:1.5px solid var(--glass-border);background:transparent;font-size:12px;font-weight:600;cursor:pointer;color:var(--text-secondary)">Cancel</button>
                <button id="rsc-confirm" style="padding:10px 24px;border-radius:12px;border:none;background:linear-gradient(135deg,var(--teal),#00C9BD);color:#fff;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:0 4px 14px rgba(0,167,157,0.3)">📅 Confirm Reschedule</button>
              </div>
            </div>
            <style>@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}</style>`;

          document.body.appendChild(overlay);

          const closeRsc = () => { overlay.style.opacity='0'; overlay.style.transition='opacity 0.2s'; setTimeout(()=>overlay.remove(),200); };
          overlay.querySelector('#rsc-close').onclick = closeRsc;
          overlay.querySelector('#rsc-cancel').onclick = closeRsc;
          overlay.onclick = (ev) => { if (ev.target === overlay) closeRsc(); };

          overlay.querySelector('#rsc-confirm').onclick = () => {
            const newDate = overlay.querySelector('#rsc-date').value;
            const newTime = overlay.querySelector('#rsc-time').value;
            const newDuration = overlay.querySelector('#rsc-duration').value;
            const newLocation = overlay.querySelector('#rsc-location').value;

            if (!newDate || !newTime) { alert('Please select a date and time'); return; }

            iv.date = newDate;
            iv.time = newTime;
            iv.duration = newDuration;
            iv.location = newLocation;

            const confirmBtn = overlay.querySelector('#rsc-confirm');
            confirmBtn.innerHTML = '✅ Rescheduled!';
            confirmBtn.style.background = 'var(--teal)';
            setTimeout(() => {
              closeRsc();
              renderInterviewList(currentTab);
            }, 700);
          };
        };
      });

      /* Action: View Evaluations */
      list.querySelectorAll('.iv-action-eval').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const iv = interviews.find(i => i.id === btn.dataset.id);
          if (!iv) return;

          /* Generate evaluations if none exist */
          if (!iv.evaluations || iv.evaluations.length === 0) {
            iv.evaluations = iv.candidates.map(cand => ({
              candidateId: cand.id, candidateName: cand.name, candidateInit: cand.init, candidateBg: cand.bg, candidateColor: cand.color, matchPct: cand.score,
              panelScores: iv.panelMembers.map(pm => ({
                panelId: pm.id, panelName: pm.name, panelRole: pm.role, panelInit: pm.init, panelBg: pm.bg, panelColor: pm.color,
                scores: { 'Technical Knowledge': Math.floor(Math.random()*20+70), 'Communication': Math.floor(Math.random()*20+70), 'Problem Solving': Math.floor(Math.random()*20+70), 'Culture Fit': Math.floor(Math.random()*20+70), 'Experience': Math.floor(Math.random()*20+70) },
                overall: 0, recommendation: 'Pending', notes: 'Evaluation pending review.'
              })).map(ps => { const vals = Object.values(ps.scores); ps.overall = Math.round(vals.reduce((a,b)=>a+b,0)/vals.length); ps.recommendation = ps.overall >= 85 ? 'Hire' : ps.overall >= 70 ? 'Maybe' : 'No Hire'; return ps; }),
              overallAvg: 0, finalRecommendation: ''
            })).map(ev => { const avg = Math.round(ev.panelScores.reduce((a,b)=>a+b.overall,0)/ev.panelScores.length); ev.overallAvg = avg; ev.finalRecommendation = avg >= 85 ? 'Strong Hire' : avg >= 70 ? 'Maybe' : 'No Hire'; return ev; });
          }

          const existing = document.getElementById('evalModal');
          if (existing) existing.remove();

          const overlay = document.createElement('div');
          overlay.id = 'evalModal';
          overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);backdrop-filter:blur(6px);animation:fadeIn 0.3s ease';

          const criteria = ['Technical Knowledge','Communication','Problem Solving','Culture Fit','Experience'];
          let selectedCandIdx = 0;

          function buildEvalBody() {
            const evalData = iv.evaluations;
            const ev = evalData[selectedCandIdx];

            /* Candidate tabs */
            let candTabs = evalData.map((cd, idx) => {
              const active = idx === selectedCandIdx;
              return `<button class="eval-cand-tab" data-idx="${idx}" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:12px;border:1.5px solid ${active ? 'var(--teal)' : 'var(--glass-border)'};background:${active ? 'rgba(0,167,157,0.06)' : 'transparent'};cursor:pointer;font-size:11px;font-weight:${active?'700':'600'};color:${active?'var(--teal)':'var(--text-secondary)'}">
                <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${cd.candidateBg};color:${cd.candidateColor};font-size:9px;font-weight:700">${cd.candidateInit}</span>
                ${cd.candidateName.split(' ')[0]}
                <span style="padding:2px 7px;border-radius:6px;font-size:9px;font-weight:700;background:${cd.overallAvg>=85?'rgba(0,167,157,0.1)':cd.overallAvg>=70?'rgba(232,124,30,0.1)':'rgba(237,28,36,0.1)'};color:${cd.overallAvg>=85?'var(--teal)':cd.overallAvg>=70?'var(--orange)':'var(--red)'}">${cd.overallAvg}%</span>
              </button>`;
            }).join('');

            /* Summary card */
            const recColor = ev.finalRecommendation.includes('Hire') ? 'var(--teal)' : ev.finalRecommendation === 'Maybe' ? 'var(--orange)' : 'var(--red)';
            const recBg = ev.finalRecommendation.includes('Hire') ? 'rgba(0,167,157,0.08)' : ev.finalRecommendation === 'Maybe' ? 'rgba(232,124,30,0.08)' : 'rgba(237,28,36,0.08)';
            const recIcon = ev.finalRecommendation.includes('Strong') ? '🌟' : ev.finalRecommendation.includes('Hire') ? '✅' : ev.finalRecommendation === 'Maybe' ? '🤔' : '❌';

            let summaryCard = `
              <div style="display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:16px;background:${ev.candidateBg};border:1px solid rgba(0,0,0,0.04);margin-bottom:18px">
                <div class="avatar avatar-md" style="background:rgba(255,255,255,0.7);color:${ev.candidateColor};font-weight:700;font-size:14px">${ev.candidateInit}</div>
                <div style="flex:1">
                  <p style="font-size:14px;font-weight:700">${ev.candidateName}</p>
                  <p style="font-size:11px;color:var(--text-tertiary)">Match: ${ev.matchPct}% · ${ev.panelScores.length} evaluator${ev.panelScores.length>1?'s':''}</p>
                </div>
                <div style="text-align:center">
                  <div style="width:56px;height:56px;border-radius:50%;background:conic-gradient(${recColor} ${ev.overallAvg*3.6}deg, rgba(0,0,0,0.06) 0deg);display:flex;align-items:center;justify-content:center">
                    <div style="width:44px;height:44px;border-radius:50%;background:var(--card-bg,#fff);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:${recColor}">${ev.overallAvg}</div>
                  </div>
                </div>
                <div style="padding:6px 14px;border-radius:12px;background:${recBg};text-align:center">
                  <p style="font-size:14px;margin-bottom:2px">${recIcon}</p>
                  <p style="font-size:10px;font-weight:700;color:${recColor}">${ev.finalRecommendation}</p>
                </div>
              </div>`;

            /* Criteria averages bar chart */
            let criteriaAvgs = criteria.map(cr => {
              const avg = Math.round(ev.panelScores.reduce((a,ps) => a + (ps.scores[cr]||0), 0) / ev.panelScores.length);
              const barColor = avg >= 85 ? 'var(--teal)' : avg >= 70 ? 'var(--orange)' : 'var(--red)';
              return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                <p style="font-size:10px;font-weight:600;color:var(--text-tertiary);width:120px;text-align:right;flex-shrink:0">${cr}</p>
                <div style="flex:1;height:20px;border-radius:10px;background:var(--glass-bg);overflow:hidden;position:relative">
                  <div style="height:100%;width:${avg}%;background:${barColor};border-radius:10px;transition:width 0.6s ease"></div>
                </div>
                <p style="font-size:11px;font-weight:700;color:${barColor};width:32px">${avg}%</p>
              </div>`;
            }).join('');

            /* Panel member individual evaluations */
            let panelCards = ev.panelScores.map(ps => {
              const psColor = ps.overall >= 85 ? 'var(--teal)' : ps.overall >= 70 ? 'var(--orange)' : 'var(--red)';
              const psRecIcon = ps.recommendation.includes('Strong') ? '🌟' : ps.recommendation === 'Hire' ? '✅' : ps.recommendation === 'Maybe' ? '🤔' : '❌';
              const psRecBg = ps.recommendation.includes('Hire') ? 'rgba(0,167,157,0.06)' : ps.recommendation === 'Maybe' ? 'rgba(232,124,30,0.06)' : 'rgba(237,28,36,0.06)';

              const individualScores = criteria.map(cr => {
                const val = ps.scores[cr] || 0;
                const sc = val >= 85 ? 'var(--teal)' : val >= 70 ? 'var(--orange)' : 'var(--red)';
                return `<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0">
                  <span style="font-size:10px;color:var(--text-tertiary)">${cr}</span>
                  <div style="display:flex;align-items:center;gap:6px">
                    <div style="width:60px;height:6px;border-radius:3px;background:var(--glass-bg);overflow:hidden"><div style="height:100%;width:${val}%;background:${sc};border-radius:3px"></div></div>
                    <span style="font-size:10px;font-weight:700;color:${sc};width:28px;text-align:right">${val}</span>
                  </div>
                </div>`;
              }).join('');

              return `<div style="border:1.5px solid var(--glass-border);border-radius:16px;overflow:hidden;background:var(--glass-bg)">
                <!-- Panel member header -->
                <div style="display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--glass-border)">
                  <div class="avatar avatar-sm" style="background:${ps.panelBg};color:${ps.panelColor};font-weight:700;font-size:10px;width:30px;height:30px">${ps.panelInit}</div>
                  <div style="flex:1;min-width:0">
                    <p style="font-size:12px;font-weight:700">${ps.panelName}</p>
                    <p style="font-size:10px;color:var(--text-tertiary)">${ps.panelRole}</p>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px">
                    <span style="font-size:16px;font-weight:800;color:${psColor}">${ps.overall}%</span>
                    <span style="padding:3px 10px;border-radius:8px;font-size:9px;font-weight:700;background:${psRecBg};color:${psColor}">${psRecIcon} ${ps.recommendation}</span>
                  </div>
                </div>
                <!-- Scores -->
                <div style="padding:12px 16px">
                  ${individualScores}
                </div>
                <!-- Notes -->
                <div style="padding:10px 16px;border-top:1px solid var(--glass-border);background:rgba(0,0,0,0.01)">
                  <p style="font-size:9px;font-weight:700;color:var(--text-tertiary);margin-bottom:4px;text-transform:uppercase">Notes</p>
                  <p style="font-size:11px;color:var(--text-secondary);line-height:1.5">${ps.notes}</p>
                </div>
              </div>`;
            }).join('');

            return `
              <!-- Candidate Tabs -->
              <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px">${candTabs}</div>
              <!-- Summary -->
              ${summaryCard}
              <!-- Criteria Averages -->
              <div style="margin-bottom:20px">
                <p style="font-size:10px;font-weight:700;color:var(--teal);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px">📊 Average Scores by Criteria</p>
                ${criteriaAvgs}
              </div>
              <!-- Panel Evaluations -->
              <p style="font-size:10px;font-weight:700;color:var(--teal);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px">👥 Individual Panel Evaluations</p>
              <div style="display:flex;flex-direction:column;gap:12px">${panelCards}</div>
            `;
          }

          const d = new Date(iv.date + 'T' + iv.time);
          const dateStr = d.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });

          overlay.innerHTML = `
            <div style="width:680px;max-width:95vw;max-height:90vh;background:var(--card-bg,#fff);border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,0.18);overflow:hidden;display:flex;flex-direction:column;animation:slideUp 0.35s cubic-bezier(0.25,0.1,0.25,1)">
              <!-- Header -->
              <div style="padding:20px 24px;border-bottom:1px solid var(--border)">
                <div style="display:flex;align-items:center;justify-content:space-between">
                  <div style="display:flex;align-items:center;gap:10px">
                    <span style="font-size:22px">📊</span>
                    <div>
                      <h3 style="font-size:15px;font-weight:700">Interview Evaluations</h3>
                      <p style="font-size:11px;color:var(--text-tertiary)">${iv.title} · ${dateStr}</p>
                    </div>
                  </div>
                  <button id="eval-close" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--text-tertiary)">✕</button>
                </div>
                <!-- Stats bar -->
                <div style="display:flex;gap:12px;margin-top:14px">
                  <div style="flex:1;padding:10px 14px;border-radius:12px;background:rgba(0,167,157,0.05);text-align:center">
                    <p style="font-size:18px;font-weight:800;color:var(--teal)">${iv.evaluations.length}</p>
                    <p style="font-size:9px;font-weight:600;color:var(--text-tertiary)">Candidates</p>
                  </div>
                  <div style="flex:1;padding:10px 14px;border-radius:12px;background:rgba(232,124,30,0.05);text-align:center">
                    <p style="font-size:18px;font-weight:800;color:var(--orange)">${iv.panelMembers.length}</p>
                    <p style="font-size:9px;font-weight:600;color:var(--text-tertiary)">Evaluators</p>
                  </div>
                  <div style="flex:1;padding:10px 14px;border-radius:12px;background:rgba(108,99,255,0.05);text-align:center">
                    <p style="font-size:18px;font-weight:800;color:#6C63FF">${Math.round(iv.evaluations.reduce((a,e)=>a+e.overallAvg,0)/iv.evaluations.length)}%</p>
                    <p style="font-size:9px;font-weight:600;color:var(--text-tertiary)">Avg Score</p>
                  </div>
                  <div style="flex:1;padding:10px 14px;border-radius:12px;background:rgba(0,167,157,0.05);text-align:center">
                    <p style="font-size:18px;font-weight:800;color:var(--teal)">${iv.evaluations.filter(e=>e.finalRecommendation.includes('Hire')).length}</p>
                    <p style="font-size:9px;font-weight:600;color:var(--text-tertiary)">Recommended</p>
                  </div>
                </div>
              </div>
              <!-- Body -->
              <div id="eval-body" style="overflow-y:auto;flex:1;padding:20px 24px">
                ${buildEvalBody()}
              </div>
              <!-- Footer -->
              <div style="padding:14px 24px;border-top:1px solid var(--border);display:flex;justify-content:space-between;flex-shrink:0">
                <button id="eval-export" style="padding:10px 20px;border-radius:12px;border:1.5px solid var(--glass-border);background:transparent;font-size:12px;font-weight:600;cursor:pointer;color:var(--text-secondary);display:flex;align-items:center;gap:6px">📥 Export Report</button>
                <button id="eval-done" style="padding:10px 24px;border-radius:12px;border:none;background:linear-gradient(135deg,var(--teal),#00C9BD);color:#fff;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(0,167,157,0.3)">Done</button>
              </div>
            </div>
            <style>@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}</style>`;

          document.body.appendChild(overlay);

          /* Close */
          const closeEval = () => { overlay.style.opacity='0'; overlay.style.transition='opacity 0.2s'; setTimeout(()=>overlay.remove(),200); };
          overlay.querySelector('#eval-close').onclick = closeEval;
          overlay.querySelector('#eval-done').onclick = closeEval;
          overlay.onclick = (ev) => { if (ev.target === overlay) closeEval(); };

          /* Candidate tab switching */
          function bindCandTabs() {
            overlay.querySelectorAll('.eval-cand-tab').forEach(tab => {
              tab.onclick = () => {
                selectedCandIdx = parseInt(tab.dataset.idx);
                overlay.querySelector('#eval-body').innerHTML = buildEvalBody();
                bindCandTabs();
              };
            });
          }
          bindCandTabs();

          /* Export */
          overlay.querySelector('#eval-export').onclick = () => {
            const exportBtn = overlay.querySelector('#eval-export');
            exportBtn.innerHTML = '⏳ Generating…';
            exportBtn.style.opacity = '0.7';
            setTimeout(() => {
              exportBtn.innerHTML = '✅ Report Downloaded';
              exportBtn.style.color = 'var(--teal)';
              exportBtn.style.borderColor = 'var(--teal)';
              exportBtn.style.opacity = '1';
              /* Toast */
              const toast = document.createElement('div');
              toast.style.cssText = 'position:fixed;bottom:30px;right:30px;padding:16px 24px;border-radius:16px;background:var(--teal);color:#fff;font-size:13px;font-weight:700;z-index:99999;box-shadow:0 8px 30px rgba(0,0,0,0.2);animation:fadeIn 0.3s';
              toast.innerHTML = '📥 Evaluation report for <strong>' + iv.title + '</strong> exported as PDF';
              document.body.appendChild(toast);
              setTimeout(() => toast.remove(), 3500);
            }, 1200);
          };
        };
      });
    }

    renderInterviewList('all');

    /* ── Tab switching ── */
    page.querySelectorAll('.iv-tab').forEach(tab => {
      tab.onclick = () => {
        page.querySelectorAll('.iv-tab').forEach(t => { t.style.borderColor = 'var(--glass-border)'; t.style.background = 'transparent'; t.style.color = 'var(--text-secondary)'; t.classList.remove('active'); });
        tab.style.borderColor = 'var(--teal)'; tab.style.background = 'rgba(0,167,157,0.06)'; tab.style.color = 'var(--teal)'; tab.classList.add('active');
        currentTab = tab.dataset.tab;
        renderInterviewList(currentTab);
      };
    });

    /* ── Sidebar: Upcoming this week ── */
    const upcomingSidebar = page.querySelector('#upcoming-sidebar');
    const upcomingIVs = interviews.filter(i => i.status === 'upcoming').sort((a,b) => a.date.localeCompare(b.date));
    if (upcomingIVs.length === 0) {
      upcomingSidebar.innerHTML = '<p style="font-size:12px;color:var(--text-tertiary);text-align:center;padding:10px">No upcoming interviews</p>';
    } else {
      upcomingSidebar.innerHTML = upcomingIVs.map(iv => {
        const d = new Date(iv.date + 'T' + iv.time);
        const dateStr = d.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' });
        return `<div style="padding:10px 12px;border-radius:12px;background:var(--glass-bg);border:1px solid var(--glass-border)">
          <p style="font-size:11px;font-weight:700">${iv.title.split('—')[0].trim()}</p>
          <p style="font-size:10px;color:var(--text-tertiary);margin-top:2px">📅 ${dateStr} · ${iv.time} · ${iv.candidates.length} candidate${iv.candidates.length>1?'s':''}</p>
        </div>`;
      }).join('');
    }

    /* ═══════════════════════════════════════════════
       CREATE INTERVIEW MODAL
       ═══════════════════════════════════════════════ */
    page.querySelector('#btn-create-interview').onclick = () => openCreateModal();

    /* Bulk schedule also triggers create */
    const bulkBtn = page.querySelector('#qa-bulk-schedule');
    if (bulkBtn) bulkBtn.onclick = () => openCreateModal();

    function openCreateModal() {
      const existing = document.getElementById('createInterviewModal');
      if (existing) existing.remove();
      createInvitedPanel = [];
      createCandidates = [];

      const overlay = document.createElement('div');
      overlay.id = 'createInterviewModal';
      overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);backdrop-filter:blur(6px);animation:fadeIn 0.3s ease';

      overlay.innerHTML = `
        <div style="width:620px;max-width:95vw;max-height:90vh;background:var(--card-bg,#fff);border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,0.18);overflow:hidden;display:flex;flex-direction:column;animation:slideUp 0.35s cubic-bezier(0.25,0.1,0.25,1)">
          <!-- Header -->
          <div style="padding:20px 24px;border-bottom:1px solid var(--border)">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div style="display:flex;align-items:center;gap:10px">
                <span style="font-size:22px">📋</span>
                <h3 style="font-size:16px;font-weight:700">Create Interview Session</h3>
              </div>
              <button id="cim-close" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--text-tertiary)">✕</button>
            </div>
            <p style="font-size:11px;color:var(--text-tertiary);margin-top:4px">Invite panel members and select candidates for a specific position</p>
          </div>

          <!-- Body (scrollable) -->
          <div style="overflow-y:auto;flex:1;padding:20px 24px">

            <!-- Step 1: Position & Details -->
            <div style="margin-bottom:20px">
              <p style="font-size:11px;font-weight:700;color:var(--teal);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px">① Select Position</p>
              <select id="cim-position" style="width:100%;padding:11px 14px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg);font-weight:600">
                <option value="">Choose a position…</option>
                ${openPositions.map(p => `<option value="${p.pos}" data-dept="${p.dept}">${p.pos} — ${p.dept} (${p.count} applicants)</option>`).join('')}
              </select>
            </div>

            <div style="margin-bottom:20px">
              <p style="font-size:11px;font-weight:700;color:var(--teal);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px">② Interview Title</p>
              <input id="cim-title" type="text" placeholder="e.g. Mobile App Developer — Technical Round" style="width:100%;padding:11px 14px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg)">
            </div>

            <!-- Schedule -->
            <div style="margin-bottom:20px">
              <p style="font-size:11px;font-weight:700;color:var(--teal);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px">③ Schedule</p>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
                <div>
                  <label style="font-size:10px;font-weight:600;color:var(--text-tertiary);display:block;margin-bottom:4px">DATE</label>
                  <input id="cim-date" type="date" value="2026-04-12" style="width:100%;padding:10px 12px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg)">
                </div>
                <div>
                  <label style="font-size:10px;font-weight:600;color:var(--text-tertiary);display:block;margin-bottom:4px">TIME</label>
                  <input id="cim-time" type="time" value="10:00" style="width:100%;padding:10px 12px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg)">
                </div>
                <div>
                  <label style="font-size:10px;font-weight:600;color:var(--text-tertiary);display:block;margin-bottom:4px">DURATION</label>
                  <select id="cim-duration" style="width:100%;padding:10px 12px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg)">
                    <option>30 minutes</option><option selected>45 minutes</option><option>1 hour</option><option>1.5 hours</option><option>2 hours</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Interview Type -->
            <div style="margin-bottom:20px">
              <p style="font-size:11px;font-weight:700;color:var(--teal);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px">④ Interview Type & Location</p>
              <div style="display:flex;gap:8px;margin-bottom:10px" id="cim-type-btns">
                <button data-type="in-person" class="cim-type active" style="flex:1;padding:10px;border-radius:12px;border:1.5px solid var(--teal);background:rgba(0,167,157,0.06);color:var(--teal);font-size:11px;font-weight:700;cursor:pointer">🏢 In-Person</button>
                <button data-type="video" class="cim-type" style="flex:1;padding:10px;border-radius:12px;border:1.5px solid var(--glass-border);background:transparent;color:var(--text-secondary);font-size:11px;font-weight:700;cursor:pointer">📹 Video</button>
                <button data-type="hybrid" class="cim-type" style="flex:1;padding:10px;border-radius:12px;border:1.5px solid var(--glass-border);background:transparent;color:var(--text-secondary);font-size:11px;font-weight:700;cursor:pointer">🔄 Hybrid</button>
              </div>
              <input id="cim-location" type="text" value="Conference Room 3A, Metfone HQ" placeholder="Room name or meeting link" style="width:100%;padding:10px 12px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg)">
            </div>

            <!-- Candidates -->
            <div style="margin-bottom:20px">
              <p style="font-size:11px;font-weight:700;color:var(--teal);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px">⑤ Select Candidates to Interview</p>
              <div id="cim-candidates" style="display:flex;flex-direction:column;gap:6px;max-height:160px;overflow-y:auto;padding:2px">
                <p style="font-size:12px;color:var(--text-tertiary);text-align:center;padding:14px">Select a position first to see candidates</p>
              </div>
            </div>

            <!-- Panel Members -->
            <div style="margin-bottom:20px">
              <p style="font-size:11px;font-weight:700;color:var(--teal);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px">⑥ Invite Interview Panel</p>
              <div style="position:relative;margin-bottom:10px">
                <input id="cim-staff-search" type="text" placeholder="🔍 Search employees by name, role, or department…" style="width:100%;padding:11px 14px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg)">
                <div id="cim-staff-results" style="display:none;position:absolute;top:100%;left:0;right:0;background:var(--card-bg,#fff);border:1.5px solid var(--glass-border);border-radius:12px;margin-top:4px;max-height:180px;overflow-y:auto;box-shadow:0 8px 24px rgba(0,0,0,0.1);z-index:10"></div>
              </div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">
                <button class="cim-quick-role" data-role="hr" style="padding:6px 12px;border-radius:10px;border:1.5px solid rgba(237,28,36,0.2);background:rgba(237,28,36,0.04);font-size:10px;font-weight:700;cursor:pointer;color:var(--red)">👔 HR Team</button>
                <button class="cim-quick-role" data-role="dept" style="padding:6px 12px;border-radius:10px;border:1.5px solid rgba(0,167,157,0.2);background:rgba(0,167,157,0.04);font-size:10px;font-weight:700;cursor:pointer;color:var(--teal)">🏢 Department Head</button>
                <button class="cim-quick-role" data-role="lead" style="padding:6px 12px;border-radius:10px;border:1.5px solid rgba(232,124,30,0.2);background:rgba(232,124,30,0.04);font-size:10px;font-weight:700;cursor:pointer;color:var(--orange)">⭐ Team Lead</button>
              </div>
              <div id="cim-panel-list" style="display:flex;flex-direction:column;gap:6px">
                <div style="padding:16px;text-align:center;border-radius:12px;border:2px dashed var(--glass-border);color:var(--text-tertiary);font-size:11px">
                  <p style="font-size:18px;margin-bottom:4px">👥</p>
                  <p>Search or quick-invite panel members above</p>
                </div>
              </div>
            </div>

            <!-- Agenda -->
            <div style="margin-bottom:10px">
              <p style="font-size:11px;font-weight:700;color:var(--teal);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px">⑦ Agenda (optional)</p>
              <textarea id="cim-agenda" rows="3" style="width:100%;padding:10px 12px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg);font-family:inherit;resize:vertical" placeholder="e.g.&#10;1. Introduction (5 min)&#10;2. Technical Questions (15 min)&#10;3. Behavioral Questions (10 min)&#10;4. Q&A with candidate (10 min)"></textarea>
            </div>

            <!-- Notification -->
            <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:12px;background:rgba(232,124,30,0.04);border:1px solid rgba(232,124,30,0.1)">
              <input type="checkbox" id="cim-notify" checked style="accent-color:var(--orange);width:14px;height:14px">
              <div>
                <p style="font-size:11px;font-weight:600">Send invitations & calendar events</p>
                <p style="font-size:10px;color:var(--text-tertiary)">All panel members and candidates will be notified</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding:14px 24px;border-top:1px solid var(--border);display:flex;justify-content:space-between;flex-shrink:0">
            <button id="cim-cancel" style="padding:10px 20px;border-radius:12px;border:1.5px solid var(--glass-border);background:transparent;font-size:12px;font-weight:600;cursor:pointer;color:var(--text-secondary)">Cancel</button>
            <button id="cim-create" style="padding:10px 24px;border-radius:12px;border:none;background:linear-gradient(135deg,var(--teal),#00C9BD);color:#fff;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:0 4px 14px rgba(0,167,157,0.3)">📋 Create Interview</button>
          </div>
        </div>
        <style>@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}</style>
      `;

      document.body.appendChild(overlay);

      /* -- Close -- */
      const closeCIM = () => { overlay.style.opacity='0'; overlay.style.transition='opacity 0.2s'; setTimeout(() => overlay.remove(), 200); };
      overlay.querySelector('#cim-close').onclick = closeCIM;
      overlay.querySelector('#cim-cancel').onclick = closeCIM;
      overlay.onclick = (e) => { if (e.target === overlay) closeCIM(); };

      /* -- Interview type toggle -- */
      overlay.querySelectorAll('.cim-type').forEach(btn => {
        btn.onclick = () => {
          overlay.querySelectorAll('.cim-type').forEach(b => { b.style.borderColor='var(--glass-border)'; b.style.background='transparent'; b.style.color='var(--text-secondary)'; });
          btn.style.borderColor='var(--teal)'; btn.style.background='rgba(0,167,157,0.06)'; btn.style.color='var(--teal)';
          const loc = overlay.querySelector('#cim-location');
          if (btn.dataset.type === 'video') loc.value = 'https://meet.google.com/abc-defg-hij';
          else if (btn.dataset.type === 'in-person') loc.value = 'Conference Room 3A, Metfone HQ';
          else loc.value = 'Room 3A + Google Meet link';
        };
      });

      /* -- Position change → populate candidates -- */
      const posSelect = overlay.querySelector('#cim-position');
      const candBox = overlay.querySelector('#cim-candidates');
      const titleInput = overlay.querySelector('#cim-title');

      posSelect.onchange = () => {
        const pos = posSelect.value;
        createCandidates = [];
        if (!pos) { candBox.innerHTML = '<p style="font-size:12px;color:var(--text-tertiary);text-align:center;padding:14px">Select a position first</p>'; return; }
        const candidates = allCandidates.filter(c => c.pos === pos);

        if (!titleInput.value) titleInput.value = pos + ' — Interview Round';

        candBox.innerHTML = candidates.map(c => `
          <label data-cid="${c.id}" style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;border:1.5px solid var(--glass-border);cursor:pointer;transition:all 0.15s;background:var(--glass-bg)">
            <input type="checkbox" class="cim-cand-cb" data-cid="${c.id}" ${(c.status === 'Interview' || c.status === 'Shortlisted') ? 'checked' : ''} style="accent-color:var(--teal);width:15px;height:15px">
            <div class="avatar avatar-sm" style="background:${c.bg};color:${c.color};font-weight:700;font-size:10px;width:32px;height:32px;flex-shrink:0">${c.init}</div>
            <div style="flex:1;min-width:0">
              <p style="font-size:12px;font-weight:600">${c.name}</p>
              <p style="font-size:10px;color:var(--text-tertiary)">${c.status} · Match: ${c.matchPct}% · Score: ${c.score}</p>
            </div>
            <span style="padding:3px 10px;border-radius:8px;font-size:10px;font-weight:700;background:${c.score >= 85 ? 'rgba(0,167,157,0.08)' : c.score >= 70 ? 'rgba(232,124,30,0.08)' : 'rgba(0,0,0,0.04)'};color:${c.score >= 85 ? 'var(--teal)' : c.score >= 70 ? 'var(--orange)' : 'var(--text-tertiary)'}">${c.score}%</span>
          </label>
        `).join('');

        /* Check initial */
        candBox.querySelectorAll('.cim-cand-cb:checked').forEach(cb => {
          const cObj = allCandidates.find(x => x.id === cb.dataset.cid);
          if (cObj && !createCandidates.find(x => x.id === cObj.id)) createCandidates.push({ id:cObj.id, init:cObj.init, name:cObj.name, score:cObj.score, bg:cObj.bg, color:cObj.color });
          const label = cb.closest('label');
          if (label) { label.style.borderColor = 'var(--teal)'; label.style.background = 'rgba(0,167,157,0.04)'; }
        });

        /* Toggle candidate selection */
        candBox.querySelectorAll('.cim-cand-cb').forEach(cb => {
          cb.onchange = () => {
            const cObj = allCandidates.find(x => x.id === cb.dataset.cid);
            const label = cb.closest('label');
            if (cb.checked) {
              if (cObj && !createCandidates.find(x => x.id === cObj.id)) createCandidates.push({ id:cObj.id, init:cObj.init, name:cObj.name, score:cObj.score, bg:cObj.bg, color:cObj.color });
              if (label) { label.style.borderColor = 'var(--teal)'; label.style.background = 'rgba(0,167,157,0.04)'; }
            } else {
              createCandidates = createCandidates.filter(x => x.id !== cb.dataset.cid);
              if (label) { label.style.borderColor = 'var(--glass-border)'; label.style.background = 'var(--glass-bg)'; }
            }
          };
        });

        /* Auto-suggest relevant panel from dept */
        const dept = candidates[0]?.dept;
        if (dept && createInvitedPanel.length === 0) {
          const hrOfficer = companyStaff.find(s => s.id === 'ds2');
          if (hrOfficer) addCIMPanel(hrOfficer);
          const deptHead = companyStaff.find(s => s.dept === dept && (s.role.includes('Manager') || s.role.includes('Director') || s.role.includes('Head')));
          if (deptHead) addCIMPanel(deptHead);
          renderCIMPanel();
        }
      };

      /* -- Panel member helpers -- */
      function renderCIMPanel() {
        const list = overlay.querySelector('#cim-panel-list');
        if (createInvitedPanel.length === 0) {
          list.innerHTML = '<div style="padding:16px;text-align:center;border-radius:12px;border:2px dashed var(--glass-border);color:var(--text-tertiary);font-size:11px"><p style="font-size:18px;margin-bottom:4px">👥</p><p>Search or quick-invite panel members above</p></div>';
          return;
        }
        list.innerHTML = createInvitedPanel.map(m => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:12px;background:var(--glass-bg);border:1px solid var(--glass-border)">
            <div class="avatar avatar-sm" style="background:${m.bg};color:${m.color};font-weight:700;font-size:10px;width:28px;height:28px">${m.init}</div>
            <div style="flex:1;min-width:0">
              <p style="font-size:11px;font-weight:600">${m.name}</p>
              <p style="font-size:10px;color:var(--text-tertiary)">${m.role} · ${m.dept}</p>
            </div>
            <button class="cim-panel-rm" data-id="${m.id}" style="background:none;border:none;font-size:12px;cursor:pointer;color:var(--text-tertiary);padding:2px 4px">✕</button>
          </div>
        `).join('');
        list.querySelectorAll('.cim-panel-rm').forEach(btn => {
          btn.onclick = () => {
            createInvitedPanel = createInvitedPanel.filter(m => m.id !== btn.dataset.id);
            renderCIMPanel();
          };
        });
      }

      function addCIMPanel(emp) {
        if (createInvitedPanel.find(m => m.id === emp.id)) return;
        createInvitedPanel.push({ ...emp, status:'pending' });
      }

      /* -- Staff search -- */
      const staffSearch = overlay.querySelector('#cim-staff-search');
      const staffResults = overlay.querySelector('#cim-staff-results');
      staffSearch.addEventListener('input', () => {
        const q = staffSearch.value.toLowerCase().trim();
        if (q.length < 1) { staffResults.style.display = 'none'; return; }
        const matches = companyStaff.filter(e => !createInvitedPanel.find(m => m.id === e.id) &&
          (e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q) || e.dept.toLowerCase().includes(q)));
        if (matches.length === 0) {
          staffResults.innerHTML = '<div style="padding:12px;text-align:center;font-size:11px;color:var(--text-tertiary)">No matching employees</div>';
        } else {
          staffResults.innerHTML = matches.map(e => `
            <div class="cim-search-item" data-id="${e.id}" style="display:flex;align-items:center;gap:10px;padding:10px 14px;cursor:pointer;transition:background 0.15s;border-bottom:1px solid var(--glass-border)">
              <div class="avatar avatar-sm" style="background:${e.bg};color:${e.color};font-weight:700;font-size:10px;width:28px;height:28px">${e.init}</div>
              <div style="flex:1"><p style="font-size:11px;font-weight:600">${e.name}</p><p style="font-size:10px;color:var(--text-tertiary)">${e.role} · ${e.dept}</p></div>
              <span style="font-size:10px;color:var(--teal);font-weight:600">+ Invite</span>
            </div>`).join('');
        }
        staffResults.style.display = 'block';
        staffResults.querySelectorAll('.cim-search-item').forEach(item => {
          item.onmouseenter = () => item.style.background = 'rgba(0,167,157,0.04)';
          item.onmouseleave = () => item.style.background = '';
          item.onclick = () => {
            const emp = companyStaff.find(e => e.id === item.dataset.id);
            if (emp) { addCIMPanel(emp); renderCIMPanel(); }
            staffSearch.value = ''; staffResults.style.display = 'none';
          };
        });
      });
      staffSearch.addEventListener('blur', () => setTimeout(() => staffResults.style.display = 'none', 200));

      /* -- Quick role invite -- */
      overlay.querySelectorAll('.cim-quick-role').forEach(btn => {
        btn.onclick = () => {
          const role = btn.dataset.role;
          const selectedPos = posSelect.value;
          const dept = selectedPos ? (allCandidates.find(c => c.pos === selectedPos)?.dept || '') : '';
          let toInvite = [];
          if (role === 'hr') toInvite = companyStaff.filter(e => e.dept === 'HR Department');
          else if (role === 'dept') toInvite = companyStaff.filter(e => e.dept === dept && (e.role.includes('Manager') || e.role.includes('Director') || e.role.includes('Head')));
          else if (role === 'lead') toInvite = companyStaff.filter(e => e.dept === dept && (e.role.includes('Lead') || e.role.includes('Senior')));
          if (toInvite.length === 0 && dept) toInvite = companyStaff.filter(e => e.dept === dept).slice(0, 2);
          toInvite.forEach(e => addCIMPanel(e));
          renderCIMPanel();
          btn.textContent = '✓ ' + btn.textContent.replace('✓ ', '');
        };
      });

      /* -- Create Interview -- */
      overlay.querySelector('#cim-create').onclick = () => {
        const posVal = posSelect.value;
        const titleVal = titleInput.value.trim();
        if (!posVal) { posSelect.style.borderColor = 'var(--red)'; posSelect.focus(); return; }
        if (!titleVal) { titleInput.style.borderColor = 'var(--red)'; titleInput.focus(); return; }
        if (createCandidates.length === 0) { alert('Please select at least one candidate'); return; }
        if (createInvitedPanel.length === 0) { alert('Please invite at least one panel member'); return; }

        const dept = allCandidates.find(c => c.pos === posVal)?.dept || '';
        const activeType = overlay.querySelector('.cim-type.active, .cim-type[style*="border-color: var(--teal)"]');
        const typeVal = activeType ? activeType.dataset.type : 'in-person';

        const newIV = {
          id: 'iv' + (interviews.length + 1),
          title: titleVal,
          pos: posVal,
          dept: dept,
          date: overlay.querySelector('#cim-date').value,
          time: overlay.querySelector('#cim-time').value,
          duration: overlay.querySelector('#cim-duration').value,
          type: typeVal,
          location: overlay.querySelector('#cim-location').value,
          candidates: [...createCandidates],
          panelMembers: createInvitedPanel.map(m => ({ ...m, status:'pending' })),
          status: 'upcoming',
          agenda: overlay.querySelector('#cim-agenda').value || 'No agenda set',
        };

        interviews.unshift(newIV);
        renderInterviewList(currentTab);

        /* Close with confirmation */
        const createBtn = overlay.querySelector('#cim-create');
        createBtn.innerHTML = '✅ Interview Created!';
        createBtn.style.background = 'var(--teal)';
        setTimeout(() => closeCIM(), 800);
      };
    }

  });

  return page;
});
