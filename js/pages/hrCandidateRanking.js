/* ─── HR Candidate Ranking Page ─── */
Router.register('/hr/candidates/rank', function renderHrCandidateRanking() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/candidates/rank'));

  const jobs = [
    { id: 'rec-officer', title: 'Recruitment Officer', dept: 'HR Department' },
    { id: 'net-eng', title: 'Network Engineer', dept: 'IT Department' },
    { id: 'mob-dev', title: 'Mobile App Developer', dept: 'IT Department' },
    { id: 'data-analyst', title: 'Data Analyst', dept: 'Business Intelligence' },
  ];

  const candidates = [
    {
      init: 'PK', name: 'Piseth Keo', job: 'Mobile App Developer',
      overall: 95, experience: 98, skills: 94, education: 90, requirements: 96,
      bg: '#FFF8F0', color: '#E87C1E', status: 'Interview', badge: 'badge-orange',
      exp: '5 yrs · Flutter, React Native, Swift',
      edu: 'M.Sc. Computer Science · RUPP',
      match: ['5+ years mobile dev', 'Cross-platform experience', 'Published apps'],
      applied: 'Nov 25'
    },
    {
      init: 'SR', name: 'Sokha Rith', job: 'Recruitment Officer',
      overall: 92, experience: 88, skills: 95, education: 90, requirements: 93,
      bg: '#FDE8E8', color: '#ED1C24', status: 'In Review', badge: 'badge-red',
      exp: '2 yrs · Customer service, HR support',
      edu: 'B.A. Business Admin · RUPP',
      match: ['Communication skills', 'HR experience', 'Khmer & English'],
      applied: 'Dec 2'
    },
    {
      init: 'DS', name: 'Dara Sophal', job: 'Network Engineer',
      overall: 88, experience: 90, skills: 86, education: 85, requirements: 89,
      bg: '#F0F9F8', color: '#00A79D', status: 'Shortlisted', badge: 'badge-teal',
      exp: '4 yrs · Cisco, network security, VPN',
      edu: 'B.Eng. IT · ITC',
      match: ['CCNA certified', 'Network architecture', 'Security protocols'],
      applied: 'Nov 28'
    },
    {
      init: 'SL', name: 'Sreyleak Lim', job: 'Mobile App Developer',
      overall: 80, experience: 75, skills: 85, education: 82, requirements: 78,
      bg: '#F7F7F8', color: '#8E8E93', status: 'In Review', badge: 'badge-red',
      exp: '2 yrs · Flutter, Firebase',
      edu: 'B.Sc. Computer Science · NUM',
      match: ['Flutter experience', 'Firebase expertise'],
      applied: 'Nov 22'
    },
    {
      init: 'KV', name: 'Kosal Vann', job: 'Recruitment Officer',
      overall: 78, experience: 72, skills: 80, education: 85, requirements: 76,
      bg: '#F7F7F8', color: '#8E8E93', status: 'In Review', badge: 'badge-red',
      exp: '1 yr · Admin assistant',
      edu: 'B.A. Management · RULE',
      match: ['Office administration', 'Khmer & English'],
      applied: 'Dec 1'
    },
    {
      init: 'PT', name: 'Pheakdey Thun', job: 'Network Engineer',
      overall: 72, experience: 68, skills: 75, education: 78, requirements: 70,
      bg: '#F7F7F8', color: '#8E8E93', status: 'In Review', badge: 'badge-red',
      exp: '1 yr · Junior network admin',
      edu: 'B.Eng. Telecom · NPIC',
      match: ['Basic networking', 'Linux administration'],
      applied: 'Nov 26'
    },
    {
      init: 'VT', name: 'Vanna Tith', job: 'Data Analyst',
      overall: 70, experience: 65, skills: 78, education: 72, requirements: 68,
      bg: '#F7F7F8', color: '#8E8E93', status: 'In Review', badge: 'badge-red',
      exp: '1 yr · Data entry, Excel reporting',
      edu: 'B.Sc. Statistics · RUPP',
      match: ['Excel proficiency', 'SQL basics'],
      applied: 'Nov 20'
    },
    {
      init: 'MS', name: 'Mony Sam', job: 'Recruitment Officer',
      overall: 65, experience: 60, skills: 68, education: 70, requirements: 62,
      bg: '#F7F7F8', color: '#8E8E93', status: 'New', badge: 'badge-gray',
      exp: 'Fresh graduate',
      edu: 'B.A. HR Management · UC',
      match: ['HR degree', 'Internship experience'],
      applied: 'Nov 30'
    },
  ];

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div style="max-width:1040px">
      <div class="page-header" style="margin-bottom:28px">
        <h1>Candidate Ranking</h1>
        <p>AI-powered ranking based on experience, skills, education &amp; job requirements</p>
      </div>

      <!-- Filters -->
      <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap">
        <select id="job-filter" style="background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px;min-width:200px">
          <option value="all">All Positions</option>
          ${jobs.map(j => `<option value="${j.title}">${j.title}</option>`).join('')}
        </select>
        <select id="sort-filter" style="background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px">
          <option value="overall">Sort: Overall Score</option>
          <option value="experience">Sort: Experience</option>
          <option value="skills">Sort: Skills</option>
          <option value="education">Sort: Education</option>
          <option value="requirements">Sort: Requirements Match</option>
        </select>
        <div style="flex:1;min-width:180px">
          <input type="text" id="search-candidates" placeholder="🔍  Search candidates…" style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px">
        </div>
      </div>

      <!-- Summary cards -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px">
        <div class="card" style="padding:18px 20px;border-radius:20px;text-align:center">
          <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:var(--teal)">${candidates.length}</div>
          <div style="font-size:12px;color:var(--text-tertiary)">Total Candidates</div>
        </div>
        <div class="card" style="padding:18px 20px;border-radius:20px;text-align:center">
          <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:var(--green)">${candidates.filter(c => c.overall >= 90).length}</div>
          <div style="font-size:12px;color:var(--text-tertiary)">Top Matches (90%+)</div>
        </div>
        <div class="card" style="padding:18px 20px;border-radius:20px;text-align:center">
          <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:var(--orange)">${jobs.length}</div>
          <div style="font-size:12px;color:var(--text-tertiary)">Open Positions</div>
        </div>
        <div class="card" style="padding:18px 20px;border-radius:20px;text-align:center">
          <div style="font-family:var(--font-display);font-size:28px;font-weight:800;color:var(--red)">${Math.round(candidates.reduce((s, c) => s + c.overall, 0) / candidates.length)}%</div>
          <div style="font-size:12px;color:var(--text-tertiary)">Avg Match Score</div>
        </div>
      </div>

      <!-- Ranking list -->
      <div id="ranking-list" class="stagger-children" style="display:flex;flex-direction:column;gap:12px">
        ${candidates.map((c, i) => `
          <div class="card candidate-rank-card" data-job="${c.job}" data-name="${c.name.toLowerCase()}" data-overall="${c.overall}" data-experience="${c.experience}" data-skills="${c.skills}" data-education="${c.education}" data-requirements="${c.requirements}" style="padding:0;border-radius:22px;overflow:hidden;cursor:pointer" onclick="Router.navigate('/hr/applications/1')">
            <div style="display:flex;align-items:stretch">
              <!-- Rank badge -->
              <div style="width:56px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:${i === 0 ? 'linear-gradient(135deg,#FFD700,#FFA500)' : i === 1 ? 'linear-gradient(135deg,#C0C0C0,#A0A0A0)' : i === 2 ? 'linear-gradient(135deg,#CD7F32,#A0652F)' : 'rgba(0,0,0,0.03)'};flex-shrink:0">
                <span style="font-family:var(--font-display);font-size:${i < 3 ? '20px' : '16px'};font-weight:800;color:${i < 3 ? 'white' : 'var(--text-tertiary)'}">#${i + 1}</span>
                ${i < 3 ? '<span style="font-size:12px;margin-top:2px">' + ['🥇','🥈','🥉'][i] + '</span>' : ''}
              </div>

              <!-- Main content -->
              <div style="flex:1;padding:20px 24px;min-width:0">
                <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px">
                  <div style="width:46px;height:46px;border-radius:50%;background:${c.bg};color:${c.color};display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;flex-shrink:0;border:2px solid rgba(255,255,255,0.6)">${c.init}</div>
                  <div style="flex:1;min-width:0">
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                      <span style="font-size:15px;font-weight:700;color:var(--black)">${c.name}</span>
                      <span class="badge ${c.badge}" style="font-size:10px;padding:3px 10px">${c.status}</span>
                    </div>
                    <p style="font-size:12px;color:var(--text-tertiary);margin-top:2px">${c.job} · Applied ${c.applied}</p>
                  </div>
                </div>

                <!-- Score bars -->
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:12px">
                  ${[
                    { label: 'Experience', val: c.experience, color: 'var(--teal)' },
                    { label: 'Skills', val: c.skills, color: 'var(--orange)' },
                    { label: 'Education', val: c.education, color: 'var(--green)' },
                    { label: 'Requirements', val: c.requirements, color: 'var(--red)' },
                  ].map(s => `
                    <div>
                      <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                        <span style="font-size:10px;color:var(--text-tertiary)">${s.label}</span>
                        <span style="font-size:10px;font-weight:700;color:${s.color}">${s.val}%</span>
                      </div>
                      <div style="height:5px;border-radius:3px;background:rgba(0,0,0,0.04)">
                        <div style="height:100%;border-radius:3px;width:${s.val}%;background:${s.color};opacity:0.7;transition:width 0.6s ease"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>

                <!-- Details row -->
                <div style="display:flex;gap:16px;flex-wrap:wrap">
                  <span style="font-size:11px;color:var(--text-secondary)">
                    <strong style="color:var(--text-tertiary)">Exp:</strong> ${c.exp}
                  </span>
                  <span style="font-size:11px;color:var(--text-secondary)">
                    <strong style="color:var(--text-tertiary)">Edu:</strong> ${c.edu}
                  </span>
                </div>

                <!-- Matching criteria tags -->
                <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">
                  ${c.match.map(m => `
                    <span style="font-size:10px;padding:4px 10px;border-radius:20px;background:rgba(0,167,157,0.06);color:var(--teal);border:1px solid rgba(0,167,157,0.12)">✓ ${m}</span>
                  `).join('')}
                </div>
              </div>

              <!-- Overall score -->
              <div style="width:100px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;flex-shrink:0;border-left:1px solid rgba(0,0,0,0.04)">
                <div style="position:relative;width:56px;height:56px;margin-bottom:6px">
                  <svg width="56" height="56" viewBox="0 0 56 56" style="transform:rotate(-90deg)">
                    <circle cx="28" cy="28" r="23" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="5"/>
                    <circle cx="28" cy="28" r="23" fill="none" stroke="${c.overall >= 90 ? 'var(--green)' : c.overall >= 75 ? 'var(--teal)' : 'var(--orange)'}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${2 * Math.PI * 23}" stroke-dashoffset="${2 * Math.PI * 23 * (1 - c.overall / 100)}"/>
                  </svg>
                  <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
                    <span style="font-family:var(--font-display);font-size:16px;font-weight:800;color:${c.overall >= 90 ? 'var(--green)' : c.overall >= 75 ? 'var(--teal)' : 'var(--orange)'}">${c.overall}</span>
                  </div>
                </div>
                <span style="font-size:10px;color:var(--text-tertiary);font-weight:600">SCORE</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;

  page.appendChild(main);

  // Filtering & sorting
  setTimeout(() => {
    const jobFilter = page.querySelector('#job-filter');
    const sortFilter = page.querySelector('#sort-filter');
    const searchInput = page.querySelector('#search-candidates');
    const list = page.querySelector('#ranking-list');

    function applyFilters() {
      const jobVal = jobFilter.value;
      const sortVal = sortFilter.value;
      const searchVal = searchInput.value.toLowerCase();
      const cards = Array.from(list.querySelectorAll('.candidate-rank-card'));

      cards.forEach(card => {
        const matchJob = jobVal === 'all' || card.dataset.job === jobVal;
        const matchSearch = !searchVal || card.dataset.name.includes(searchVal);
        card.style.display = matchJob && matchSearch ? '' : 'none';
      });

      // Sort visible cards
      const visible = cards.filter(c => c.style.display !== 'none');
      visible.sort((a, b) => parseFloat(b.dataset[sortVal]) - parseFloat(a.dataset[sortVal]));
      visible.forEach((card, i) => {
        list.appendChild(card);
        // Update rank number
        const rankEl = card.querySelector('div > div > span');
        if (rankEl) rankEl.textContent = '#' + (i + 1);
      });
    }

    jobFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
  });

  return page;
});
