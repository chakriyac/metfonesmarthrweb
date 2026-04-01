/* ─── HR Internal Promotion — Match Staff to Positions ─── */
Router.register('/hr/promotions', function renderHrPromotions() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/promotions'));

  const openPositions = [
    { id: 'rec-officer', title: 'Recruitment Officer', dept: 'HR Department', level: 'Mid-Level', reqs: ['3+ yrs HR experience', 'Communication skills', 'Khmer & English', 'Leadership'] },
    { id: 'net-eng', title: 'Senior Network Engineer', dept: 'IT Department', level: 'Senior', reqs: ['5+ yrs networking', 'CCNA/CCNP', 'Security protocols', 'Team leadership'] },
    { id: 'mob-lead', title: 'Mobile Team Lead', dept: 'IT Department', level: 'Lead', reqs: ['4+ yrs mobile dev', 'Flutter/Swift', 'Team management', 'Architecture design'] },
    { id: 'bi-mgr', title: 'BI Manager', dept: 'Business Intelligence', level: 'Manager', reqs: ['5+ yrs analytics', 'SQL/Python', 'Data visualization', 'Strategic thinking'] },
  ];

  const staff = [
    {
      init: 'CL', name: 'Chanthy Lim', currentRole: 'Senior Developer', dept: 'IT', tenure: '5 yrs',
      skills: ['Flutter', 'Swift', 'React Native', 'Team mentoring', 'Architecture design'],
      education: 'M.Sc. Computer Science · ITC',
      performance: 94, potential: 'High',
      matchPositions: [
        { pos: 'Mobile Team Lead', match: 92, matched: ['4+ yrs mobile dev', 'Flutter/Swift', 'Architecture design'], partial: ['Team management'] },
      ],
      bg: 'rgba(0,167,157,0.08)', color: 'var(--teal)', avatar: '#E0F7F5'
    },
    {
      init: 'VN', name: 'Vanna Nob', currentRole: 'HR Assistant', dept: 'HR', tenure: '4 yrs',
      skills: ['Recruitment support', 'Employee onboarding', 'Communication', 'Khmer & English', 'Leadership training'],
      education: 'B.A. Human Resources · RUPP',
      performance: 91, potential: 'High',
      matchPositions: [
        { pos: 'Recruitment Officer', match: 88, matched: ['3+ yrs HR experience', 'Communication skills', 'Khmer & English'], partial: ['Leadership'] },
      ],
      bg: 'rgba(52,199,89,0.08)', color: 'var(--green)', avatar: '#E8F5E9'
    },
    {
      init: 'SP', name: 'Sokha Pen', currentRole: 'IT Support', dept: 'IT', tenure: '3 yrs',
      skills: ['Network admin', 'Linux', 'Cisco basics', 'Troubleshooting', 'CCNA in progress'],
      education: 'B.Eng. IT · NPIC',
      performance: 85, potential: 'High',
      matchPositions: [
        { pos: 'Senior Network Engineer', match: 72, matched: ['Security protocols'], partial: ['5+ yrs networking', 'CCNA/CCNP', 'Team leadership'] },
      ],
      bg: 'rgba(232,124,30,0.08)', color: 'var(--orange)', avatar: '#FFF8F0'
    },
    {
      init: 'PT', name: 'Pheakdey Thun', currentRole: 'Accountant', dept: 'Finance', tenure: '3 yrs',
      skills: ['Financial reporting', 'Excel advanced', 'SQL basics', 'Data entry', 'Khmer & English'],
      education: 'B.Sc. Accounting · NUM',
      performance: 82, potential: 'Medium',
      matchPositions: [
        { pos: 'BI Manager', match: 58, matched: ['SQL/Python'], partial: ['5+ yrs analytics', 'Data visualization', 'Strategic thinking'] },
      ],
      bg: 'rgba(142,142,147,0.08)', color: 'var(--text-tertiary)', avatar: '#F7F7F8'
    },
    {
      init: 'RK', name: 'Rathana Kim', currentRole: 'Marketing Lead', dept: 'Marketing', tenure: '4 yrs',
      skills: ['Campaign strategy', 'Data analysis', 'Team leadership', 'Presentation', 'Strategic planning'],
      education: 'MBA · RULE',
      performance: 88, potential: 'High',
      matchPositions: [
        { pos: 'BI Manager', match: 68, matched: ['Strategic thinking'], partial: ['5+ yrs analytics', 'SQL/Python', 'Data visualization'] },
        { pos: 'Recruitment Officer', match: 62, matched: ['Communication skills', 'Leadership'], partial: ['3+ yrs HR experience', 'Khmer & English'] },
      ],
      bg: 'rgba(237,28,36,0.08)', color: 'var(--red)', avatar: '#FDE8E8'
    },
  ];

  // Sort staff by their best match score
  const ranked = [...staff].sort((a, b) => {
    const bestA = Math.max(...a.matchPositions.map(m => m.match));
    const bestB = Math.max(...b.matchPositions.map(m => m.match));
    return bestB - bestA;
  });

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div style="max-width:1040px">
      <div class="page-header" style="margin-bottom:28px">
        <h1>Internal Promotion</h1>
        <p>AI matches current staff to open positions based on skills, experience &amp; performance</p>
      </div>

      <!-- Open positions selector -->
      <div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap">
        <select id="pos-filter" style="background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px;min-width:200px">
          <option value="all">All Open Positions</option>
          ${openPositions.map(p => `<option value="${p.title}">${p.title} — ${p.dept}</option>`).join('')}
        </select>
        <select id="potential-filter" style="background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px">
          <option value="all">All Potential</option>
          <option value="High">High Potential</option>
          <option value="Medium">Medium Potential</option>
        </select>
        <div style="flex:1;min-width:180px">
          <input type="text" id="search-staff" placeholder="🔍  Search staff…" style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px">
        </div>
      </div>

      <!-- Summary -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px">
        <div class="card" style="padding:18px 20px;border-radius:20px;text-align:center">
          <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:var(--teal)">235</div>
          <div style="font-size:12px;color:var(--text-tertiary)">Total Staff</div>
        </div>
        <div class="card" style="padding:18px 20px;border-radius:20px;text-align:center">
          <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:var(--green)">${ranked.filter(s => Math.max(...s.matchPositions.map(m => m.match)) >= 80).length}</div>
          <div style="font-size:12px;color:var(--text-tertiary)">Strong Matches (80%+)</div>
        </div>
        <div class="card" style="padding:18px 20px;border-radius:20px;text-align:center">
          <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:var(--orange)">${openPositions.length}</div>
          <div style="font-size:12px;color:var(--text-tertiary)">Open Positions</div>
        </div>
        <div class="card" style="padding:18px 20px;border-radius:20px;text-align:center">
          <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:var(--red)">${ranked.filter(s => s.potential === 'High').length}</div>
          <div style="font-size:12px;color:var(--text-tertiary)">High Potential</div>
        </div>
      </div>

      <!-- AI insight banner -->
      <div class="card" style="background:linear-gradient(135deg,rgba(0,167,157,0.08),rgba(52,199,89,0.08));border-left:4px solid var(--teal);margin-bottom:28px;display:flex;gap:14px;align-items:center;padding:20px 24px;border-radius:18px">
        <span style="font-size:28px">🤖</span>
        <div>
          <p style="font-size:14px;font-weight:700;color:var(--teal);margin-bottom:2px">AI Promotion Insights</p>
          <p style="font-size:12px;color:var(--text-secondary);line-height:1.5">${ranked.filter(s => Math.max(...s.matchPositions.map(m => m.match)) >= 80).length} employees are strong internal candidates. Promoting internally can save up to 40% in recruitment costs and improve retention.</p>
        </div>
      </div>

      <!-- Matched staff list -->
      <div class="section-header" style="margin-bottom:16px"><h2>Promotion Candidates</h2></div>
      <div id="promo-list" class="stagger-children" style="display:flex;flex-direction:column;gap:14px">
        ${ranked.map((s, idx) => {
          const bestMatch = s.matchPositions.reduce((a, b) => a.match > b.match ? a : b);
          return `
          <div class="card promo-card" data-name="${s.name.toLowerCase()}" data-potential="${s.potential}" data-positions="${s.matchPositions.map(m => m.pos).join(',')}" style="padding:0;border-radius:22px;overflow:hidden">
            <div style="display:flex;align-items:stretch">
              <!-- Rank -->
              <div style="width:50px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:${idx === 0 ? 'linear-gradient(135deg,#FFD700,#FFA500)' : idx === 1 ? 'linear-gradient(135deg,#C0C0C0,#A0A0A0)' : idx === 2 ? 'linear-gradient(135deg,#CD7F32,#A0652F)' : 'rgba(0,0,0,0.03)'};flex-shrink:0">
                <span style="font-family:var(--font-display);font-size:${idx < 3 ? '18px' : '15px'};font-weight:800;color:${idx < 3 ? 'white' : 'var(--text-tertiary)'}">#${idx + 1}</span>
                ${idx < 3 ? '<span style="font-size:11px;margin-top:2px">' + ['🥇','🥈','🥉'][idx] + '</span>' : ''}
              </div>

              <!-- Content -->
              <div style="flex:1;padding:22px 24px;min-width:0">
                <!-- Staff info -->
                <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">
                  <div style="width:48px;height:48px;border-radius:50%;background:${s.avatar};color:${s.color};display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;flex-shrink:0;border:2px solid rgba(255,255,255,0.6)">${s.init}</div>
                  <div style="flex:1;min-width:0">
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                      <span style="font-size:15px;font-weight:700;color:var(--black)">${s.name}</span>
                      <span class="badge ${s.potential === 'High' ? 'badge-green' : 'badge-orange'}" style="font-size:10px;padding:3px 10px">${s.potential} Potential</span>
                    </div>
                    <p style="font-size:12px;color:var(--text-tertiary);margin-top:2px">${s.currentRole} · ${s.dept} Dept · ${s.tenure}</p>
                  </div>
                  <div style="text-align:right;flex-shrink:0">
                    <p style="font-size:11px;color:var(--text-tertiary)">Performance</p>
                    <p style="font-size:18px;font-weight:800;color:${s.performance >= 90 ? 'var(--green)' : s.performance >= 80 ? 'var(--teal)' : 'var(--orange)'}">${s.performance}%</p>
                  </div>
                </div>

                <!-- Current skills -->
                <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px">
                  ${s.skills.map(sk => `<span style="font-size:10px;padding:3px 10px;border-radius:20px;background:rgba(0,0,0,0.03);color:var(--text-secondary);border:1px solid rgba(0,0,0,0.05)">${sk}</span>`).join('')}
                </div>

                <!-- Position matches -->
                ${s.matchPositions.map(mp => `
                  <div style="background:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.5);border-radius:16px;padding:16px 18px;margin-bottom:8px">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
                      <div>
                        <span style="font-size:10px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.5px">RECOMMENDED FOR</span>
                        <p style="font-size:14px;font-weight:700;color:var(--black);margin-top:2px">→ ${mp.pos}</p>
                      </div>
                      <div style="position:relative;width:50px;height:50px">
                        <svg width="50" height="50" viewBox="0 0 50 50" style="transform:rotate(-90deg)">
                          <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="5"/>
                          <circle cx="25" cy="25" r="20" fill="none" stroke="${mp.match >= 80 ? 'var(--green)' : mp.match >= 65 ? 'var(--teal)' : 'var(--orange)'}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${2 * Math.PI * 20}" stroke-dashoffset="${2 * Math.PI * 20 * (1 - mp.match / 100)}"/>
                        </svg>
                        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
                          <span style="font-size:13px;font-weight:800;color:${mp.match >= 80 ? 'var(--green)' : mp.match >= 65 ? 'var(--teal)' : 'var(--orange)'}">${mp.match}%</span>
                        </div>
                      </div>
                    </div>

                    <!-- Requirement matching -->
                    <div style="display:flex;flex-wrap:wrap;gap:6px">
                      ${mp.matched.map(r => `<span style="font-size:10px;padding:4px 10px;border-radius:20px;background:rgba(52,199,89,0.08);color:var(--green);border:1px solid rgba(52,199,89,0.15)">✓ ${r}</span>`).join('')}
                      ${mp.partial.map(r => `<span style="font-size:10px;padding:4px 10px;border-radius:20px;background:rgba(232,124,30,0.08);color:var(--orange);border:1px solid rgba(232,124,30,0.15)">◐ ${r}</span>`).join('')}
                    </div>
                  </div>
                `).join('')}

                <!-- Education -->
                <p style="font-size:11px;color:var(--text-tertiary);margin-top:6px">🎓 ${s.education}</p>
              </div>

              <!-- Actions -->
              <div style="width:130px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px;flex-shrink:0;border-left:1px solid rgba(0,0,0,0.04)">
                <button class="btn-dark promote-btn" data-name="${s.name}" data-pos="${bestMatch.pos}" style="width:100%;font-size:11px;padding:10px 8px;border-radius:var(--radius-pill)">Promote</button>
                <button class="btn-glass" style="width:100%;font-size:11px;padding:8px 8px;border-radius:var(--radius-pill)">Review</button>
                <button class="btn-glass" style="width:100%;font-size:11px;padding:8px 8px;border-radius:var(--radius-pill)">📅 Interview</button>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>

      <!-- Open positions detail -->
      <div class="section-header" style="margin-top:36px;margin-bottom:16px"><h2>Open Positions — Requirements</h2></div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-bottom:40px">
        ${openPositions.map(p => `
          <div class="card" style="padding:22px;border-radius:20px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
              <div style="width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center">${logoHTML('sm')}</div>
              <div>
                <p style="font-size:14px;font-weight:700;color:var(--black)">${p.title}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${p.dept} · ${p.level}</p>
              </div>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              ${p.reqs.map(r => `<span style="font-size:10px;padding:4px 10px;border-radius:20px;background:rgba(0,0,0,0.03);color:var(--text-secondary);border:1px solid rgba(0,0,0,0.06)">${r}</span>`).join('')}
            </div>
            <div style="margin-top:10px;font-size:11px;color:var(--teal);font-weight:600">
              ${ranked.filter(s => s.matchPositions.some(m => m.pos === p.title && m.match >= 70)).length} internal candidates match
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;

  page.appendChild(main);

  // Interactions
  setTimeout(() => {
    const posFilter = page.querySelector('#pos-filter');
    const potentialFilter = page.querySelector('#potential-filter');
    const searchInput = page.querySelector('#search-staff');
    const list = page.querySelector('#promo-list');

    function applyFilters() {
      const posVal = posFilter.value;
      const potVal = potentialFilter.value;
      const searchVal = searchInput.value.toLowerCase();
      const cards = Array.from(list.querySelectorAll('.promo-card'));

      cards.forEach(card => {
        const matchPos = posVal === 'all' || card.dataset.positions.includes(posVal);
        const matchPot = potVal === 'all' || card.dataset.potential === potVal;
        const matchSearch = !searchVal || card.dataset.name.includes(searchVal);
        card.style.display = matchPos && matchPot && matchSearch ? '' : 'none';
      });
    }

    posFilter.addEventListener('change', applyFilters);
    potentialFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);

    // Promote button
    page.querySelectorAll('.promote-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const name = btn.dataset.name;
        const pos = btn.dataset.pos;
        if (confirm('Promote ' + name + ' to ' + pos + '?\n\nThis will create a promotion record and notify the employee.')) {
          btn.textContent = '✓ Promoted';
          btn.style.background = 'var(--green)';
          btn.disabled = true;
        }
      });
    });
  });

  return page;
});
