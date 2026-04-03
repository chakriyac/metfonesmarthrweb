/* ─── HR Position Manage Page ─── */
/* Route: /hr/applications/manage/:positionSlug */

/* Position metadata keyed by slug */
const _positionMeta = {
  'recruitment-officer': { title:'Recruitment Officer', dept:'HR Department', slots:1, salary:'$800 – $1,200/month', badge:'badge-red', badgeText:'Urgent',
    reqs:['Sourcing','ATS Systems','Screening','Interviewing','Onboarding','Communication','Khmer/English'] },
  'network-engineer': { title:'Network Engineer', dept:'IT Department', slots:2, salary:'$1,000 – $1,500/month', badge:'badge-teal', badgeText:'Active',
    reqs:['Cisco','AWS','Networking','Security','Linux','Troubleshooting'] },
  'mobile-app-developer': { title:'Mobile App Developer', dept:'IT Department', slots:1, salary:'$1,200 – $2,000/month', badge:'badge-orange', badgeText:'Interview',
    reqs:['Swift','Kotlin','Flutter','Firebase','CI/CD','React Native'] },
  'data-analyst': { title:'Data Analyst', dept:'Business Intelligence', slots:1, salary:'$900 – $1,400/month', badge:'badge-gray', badgeText:'New',
    reqs:['Python','SQL','Tableau','Data Modeling','Statistics','Excel'] },
  'marketing-coordinator': { title:'Marketing Coordinator', dept:'Marketing', slots:1, salary:'$700 – $1,100/month', badge:'badge-teal', badgeText:'Active',
    reqs:['Campaign Management','Content Strategy','Analytics','Social Media','Event Coordination'] },
  'customer-service-lead': { title:'Customer Service Lead', dept:'Operations', slots:1, salary:'$900 – $1,300/month', badge:'badge-orange', badgeText:'Interview',
    reqs:['Team Leadership','CS Operations','CRM','Training','KPI Management'] },
  'hr-assistant': { title:'HR Assistant', dept:'HR Department', slots:1, salary:'$600 – $900/month', badge:'badge-orange', badgeText:'Interview',
    reqs:['HR Administration','Payroll','Onboarding','Record Keeping','Communication'] },
  'sr-network-engineer': { title:'Sr. Network Engineer', dept:'IT Department', slots:1, salary:'$1,500 – $2,500/month', badge:'badge-teal', badgeText:'Active',
    reqs:['Cisco','AWS','Linux','Network Security','SD-WAN'] },
  'ui-ux-designer': { title:'UI/UX Designer', dept:'Product', slots:1, salary:'$1,000 – $1,800/month', badge:'badge-orange', badgeText:'Interview',
    reqs:['Figma','Prototyping','User Research','Design Systems','Wireframing'] },
  'project-manager': { title:'Project Manager', dept:'Operations', slots:1, salary:'$1,200 – $2,000/month', badge:'badge-orange', badgeText:'Interview',
    reqs:['PMP','Agile','Budgeting','Stakeholder Management','Jira'] },
  'qa-engineer': { title:'QA Engineer', dept:'IT Department', slots:1, salary:'$1,000 – $1,600/month', badge:'badge-orange', badgeText:'Interview',
    reqs:['Selenium','Cypress','CI/CD','Test Automation','API Testing'] },
};

/* Helper: position title → slug */
function _posSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/* Get candidates for a position from the _hrCandidates DB */
function _positionCandidates(posTitle) {
  return Object.values(_hrCandidates)
    .filter(c => c.pos === posTitle)
    .sort((a, b) => b.score - a.score);
}

Router.register('/hr/applications/manage/:slug', function renderHrPositionManage(slug) {
  const pos = _positionMeta[slug];
  if (!pos) { Router.navigate('/hr/applications'); return document.createElement('div'); }

  const candidates = _positionCandidates(pos.title);
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/applications'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div style="max-width:1000px">
      <!-- Back + Header -->
      <a href="#/hr/applications" style="display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--text-tertiary);margin-bottom:12px;text-decoration:none">
        ← Back to Applications
      </a>

      <div class="glass-card" style="padding:20px 24px;margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
          <div style="width:48px;height:48px;border-radius:16px;background:linear-gradient(135deg,var(--red),var(--red-light));display:flex;align-items:center;justify-content:center;font-size:22px">💼</div>
          <div style="flex:1;min-width:200px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <h1 style="font-size:20px;font-weight:800">${pos.title}</h1>
              <span class="badge ${pos.badge}">${pos.badgeText}</span>
            </div>
            <p style="font-size:12px;color:var(--text-tertiary)">${pos.dept} · ${pos.slots} position${pos.slots > 1 ? 's' : ''} · ${candidates.length} applicant${candidates.length !== 1 ? 's' : ''} · ${pos.salary}</p>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn-glass" onclick="Router.navigate('/hr/jobs/create')" style="font-size:12px">✏️ Edit Job</button>
            <button class="btn-red" onclick="Router.navigate('/hr/applications')" style="font-size:12px;padding:8px 16px;border-radius:12px">📋 All Positions</button>
          </div>
        </div>
        <!-- Requirements Tags -->
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:14px">
          ${pos.reqs.map(r => `<span style="font-size:10px;padding:4px 10px;border-radius:8px;background:rgba(0,167,157,0.08);color:var(--teal);font-weight:600">${r}</span>`).join('')}
        </div>
      </div>

      <!-- Tabs -->
      <div class="tab-row" id="manage-tabs" style="margin-bottom:20px">
        <button class="tab active" data-tab="ranked">🏆 Ranked Candidates</button>
        <button class="tab" data-tab="upload">📄 Upload CVs</button>
        <button class="tab" data-tab="ai-chat">🤖 HR AI Chat</button>
      </div>

      <!-- ═══════════ TAB 1: Ranked Candidates ═══════════ -->
      <div id="tab-ranked" class="tab-content stagger-children" style="display:flex;flex-direction:column;gap:12px">
        ${candidates.length === 0 ? `
          <div class="glass-card" style="padding:40px;text-align:center">
            <p style="font-size:36px;margin-bottom:10px">📭</p>
            <p style="font-size:14px;font-weight:700;margin-bottom:4px">No Candidates Yet</p>
            <p style="font-size:12px;color:var(--text-tertiary)">Upload CVs or wait for applicants</p>
          </div>
        ` : candidates.map((c, i) => `
          <div class="glass-card candidate-manage-row" style="padding:16px 20px;cursor:pointer;transition:all 0.2s" onclick="Router.navigate('/hr/applications/${c.id}')">
            <div style="display:flex;align-items:center;gap:14px">
              <!-- Rank Badge -->
              <div style="width:36px;height:36px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;
                ${i === 0 ? 'background:linear-gradient(135deg,#FFD700,#FFA500);color:#fff;box-shadow:0 4px 12px rgba(255,215,0,0.3)' :
                  i === 1 ? 'background:linear-gradient(135deg,#C0C0C0,#A0A0A0);color:#fff' :
                  i === 2 ? 'background:linear-gradient(135deg,#CD7F32,#B87333);color:#fff' :
                  'background:var(--glass-bg);color:var(--text-tertiary)'}">
                ${i < 3 ? ['🥇','🥈','🥉'][i] : '#' + (i + 1)}
              </div>

              <!-- Avatar -->
              <div class="avatar avatar-sm" style="background:${c.bg};color:${c.color};font-weight:700">${c.init}</div>

              <!-- Info -->
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px">
                  <p style="font-size:14px;font-weight:700">${c.name}</p>
                  <span class="badge ${c.badge}" style="font-size:10px">${c.status}</span>
                </div>
                <p style="font-size:11px;color:var(--text-tertiary)">${c.experience[0] ? c.experience[0].title + ' at ' + c.experience[0].company + ' · ' + c.experience[0].duration : 'No experience listed'}</p>
                <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">
                  ${c.skills.filter(s => s.match).slice(0, 5).map(s => `<span style="font-size:9px;padding:2px 8px;border-radius:6px;background:rgba(0,167,157,0.08);color:var(--teal);font-weight:600">${s.skill}</span>`).join('')}
                  ${c.skills.filter(s => !s.match).length > 0 ? `<span style="font-size:9px;padding:2px 8px;border-radius:6px;background:rgba(237,28,36,0.06);color:var(--red)">+${c.skills.filter(s => !s.match).length} missing</span>` : ''}
                </div>
              </div>

              <!-- Score -->
              <div style="text-align:center;min-width:80px">
                <div style="position:relative;width:56px;height:56px;margin:0 auto 4px">
                  <svg viewBox="0 0 36 36" style="width:56px;height:56px;transform:rotate(-90deg)">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--glass-border)" stroke-width="2.5"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="${c.score >= 90 ? 'var(--teal)' : c.score >= 75 ? 'var(--orange)' : 'var(--red)'}" stroke-width="2.5"
                      stroke-dasharray="${c.score} ${100 - c.score}" stroke-linecap="round"/>
                  </svg>
                  <span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:14px;font-weight:800;color:${c.score >= 90 ? 'var(--teal)' : c.score >= 75 ? 'var(--orange)' : 'var(--red)'}">${c.score}</span>
                </div>
                <p style="font-size:9px;color:var(--text-tertiary);font-weight:600">Match Score</p>
              </div>

              <!-- Actions -->
              <div style="display:flex;flex-direction:column;gap:6px;min-width:100px">
                <button class="btn-red" style="font-size:11px;padding:6px 12px;border-radius:10px" onclick="event.stopPropagation();Router.navigate('/hr/applications/${c.id}')">View Profile →</button>
                ${c.status === 'Interview' || c.status === 'Shortlisted' ? `<button class="btn-glass" style="font-size:10px;padding:5px 10px;border-radius:8px" onclick="event.stopPropagation()">📅 Schedule</button>` : ''}
              </div>
            </div>
          </div>
        `).join('')}

        ${candidates.length > 0 ? `
        <!-- Summary Card -->
        <div class="glass-card" style="padding:16px 20px;margin-top:4px">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
            <div>
              <p style="font-size:11px;color:var(--text-tertiary);font-weight:600;margin-bottom:4px">RANKING SUMMARY</p>
              <p style="font-size:13px"><strong>${candidates.length}</strong> candidates · Average score: <strong style="color:var(--teal)">${(candidates.reduce((s,c) => s + c.score, 0) / candidates.length).toFixed(0)}%</strong> · Top match: <strong style="color:var(--teal)">${candidates[0].name} (${candidates[0].score}%)</strong></p>
            </div>
            <div style="display:flex;gap:8px">
              <span style="font-size:10px;padding:4px 10px;border-radius:8px;background:rgba(0,167,157,0.08);color:var(--teal);font-weight:600">${candidates.filter(c=>c.score>=90).length} Excellent</span>
              <span style="font-size:10px;padding:4px 10px;border-radius:8px;background:rgba(232,124,30,0.08);color:var(--orange);font-weight:600">${candidates.filter(c=>c.score>=75&&c.score<90).length} Good</span>
              <span style="font-size:10px;padding:4px 10px;border-radius:8px;background:rgba(237,28,36,0.06);color:var(--red);font-weight:600">${candidates.filter(c=>c.score<75).length} Below Avg</span>
            </div>
          </div>
        </div>
        ` : ''}
      </div>

      <!-- ═══════════ TAB 2: Upload CVs ═══════════ -->
      <div id="tab-upload" class="tab-content" style="display:none">
        <div class="glass-card" style="padding:24px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
            <span style="font-size:20px">📄</span>
            <div>
              <h3 style="font-size:15px;font-weight:700">Upload Candidate CVs for AI Ranking</h3>
              <p style="font-size:12px;color:var(--text-tertiary)">Upload up to <strong>5 PDF files</strong>. Our AI will analyze each CV against the <strong>${pos.title}</strong> requirements and rank them.</p>
            </div>
          </div>

          <!-- Upload Zone -->
          <div id="cv-drop-zone" style="border:2px dashed var(--glass-border);border-radius:20px;padding:40px 20px;text-align:center;cursor:pointer;transition:all 0.3s;background:var(--glass-bg)">
            <div style="font-size:48px;margin-bottom:12px">📤</div>
            <p style="font-size:14px;font-weight:700;margin-bottom:4px">Drop PDF files here or click to browse</p>
            <p style="font-size:11px;color:var(--text-tertiary)">Supports PDF format only · Max 5 files · 10MB per file</p>
            <input type="file" id="cv-file-input" accept=".pdf" multiple style="display:none">
          </div>

          <!-- File Queue -->
          <div id="cv-file-queue" style="margin-top:16px;display:flex;flex-direction:column;gap:8px"></div>

          <!-- Upload Counter -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px">
            <p style="font-size:11px;color:var(--text-tertiary)">Files: <strong id="cv-file-count">0</strong>/5</p>
            <button id="btn-rank-cvs" class="btn-red" style="padding:10px 24px;border-radius:14px;font-size:13px;font-weight:700;opacity:0.5;cursor:not-allowed" disabled>
              🤖 Rank Candidates with AI
            </button>
          </div>
        </div>

        <!-- AI Ranking Results -->
        <div id="cv-ranking-results" style="display:none;margin-top:16px">
          <div class="glass-card" style="padding:20px 24px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
              <span style="font-size:18px">🏆</span>
              <div style="flex:1">
                <h3 style="font-size:15px;font-weight:700">AI Ranking Results</h3>
                <p style="font-size:11px;color:var(--text-tertiary)">Based on skills match, experience relevance, and education alignment for <strong>${pos.title}</strong></p>
              </div>
              <div id="rank-progress" style="font-size:11px;padding:4px 12px;border-radius:8px;background:rgba(0,167,157,0.08);color:var(--teal);font-weight:700">Analyzed</div>
            </div>
            <div id="cv-ranked-list" style="display:flex;flex-direction:column;gap:10px"></div>
          </div>
        </div>
      </div>

      <!-- ═══════════ TAB 3: HR AI Chat ═══════════ -->
      <div id="tab-ai-chat" class="tab-content" style="display:none">
        <div style="display:grid;grid-template-columns:1fr 300px;gap:16px">
          <!-- Chat Area -->
          <div class="glass-card" style="padding:0;display:flex;flex-direction:column;height:600px;overflow:hidden;border-radius:20px">
            <!-- Chat Header -->
            <div style="padding:16px 20px;border-bottom:1px solid var(--glass-border);display:flex;align-items:center;gap:10px">
              <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,var(--red),var(--teal));display:flex;align-items:center;justify-content:center;font-size:18px">🤖</div>
              <div style="flex:1">
                <p style="font-size:13px;font-weight:700">Metfone HR AI Assistant</p>
                <p style="font-size:10px;color:var(--teal)">● Online — Analyzing ${pos.title} candidates</p>
              </div>
              <button id="btn-clear-chat" class="btn-glass" style="font-size:10px;padding:5px 12px">🗑 Clear</button>
            </div>

            <!-- Messages -->
            <div id="ai-chat-messages" style="flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:12px">
              <!-- Welcome Message -->
              <div class="chat-msg-ai" style="display:flex;gap:10px;align-items:flex-start">
                <div style="width:28px;height:28px;border-radius:10px;background:linear-gradient(135deg,var(--red),var(--teal));display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">🤖</div>
                <div style="background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:0 16px 16px 16px;padding:12px 16px;max-width:85%">
                  <p style="font-size:12px;line-height:1.6;color:var(--text-primary)">
                    Hello! I'm your <strong>HR AI Assistant</strong> for the <strong>${pos.title}</strong> position.
                  </p>
                  <p style="font-size:12px;line-height:1.6;color:var(--text-secondary);margin-top:6px">
                    I have access to <strong>${candidates.length} candidate profiles</strong> for this position. I can help you:
                  </p>
                  <ul style="font-size:11px;color:var(--text-secondary);line-height:1.8;margin-top:6px;padding-left:16px">
                    <li>Compare candidates side-by-side</li>
                    <li>Analyze strengths & weaknesses</li>
                    <li>Suggest interview questions</li>
                    <li>Recommend top picks based on requirements</li>
                    <li>Identify skill gaps for any candidate</li>
                  </ul>
                  <p style="font-size:11px;color:var(--text-tertiary);margin-top:8px">Try asking something below ↓</p>
                </div>
              </div>
            </div>

            <!-- Quick Prompts -->
            <div id="ai-quick-prompts" style="padding:8px 20px;border-top:1px solid var(--glass-border);display:flex;gap:6px;overflow-x:auto;flex-shrink:0">
              <button class="ai-prompt-chip" data-prompt="Who is the best candidate for this position and why?">🏆 Best candidate?</button>
              <button class="ai-prompt-chip" data-prompt="Compare the top 3 candidates side by side">📊 Compare top 3</button>
              <button class="ai-prompt-chip" data-prompt="What skill gaps do the candidates have?">⚠️ Skill gaps</button>
              <button class="ai-prompt-chip" data-prompt="Suggest 5 interview questions for the top candidate">💬 Interview Qs</button>
              <button class="ai-prompt-chip" data-prompt="Which candidate has the most relevant experience?">📋 Best experience</button>
            </div>

            <!-- Input -->
            <div style="padding:12px 16px;border-top:1px solid var(--glass-border);display:flex;gap:8px;align-items:center">
              <input type="text" id="ai-chat-input" placeholder="Ask about candidates, compare, analyze…" style="flex:1;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px;outline:none">
              <button id="btn-ai-send" style="width:40px;height:40px;border-radius:14px;background:linear-gradient(135deg,var(--red),var(--teal));border:none;color:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform 0.2s">➤</button>
            </div>
          </div>

          <!-- Sidebar: Candidate Quick View -->
          <div style="display:flex;flex-direction:column;gap:12px">
            <div class="glass-card" style="padding:16px">
              <p style="font-size:11px;font-weight:700;color:var(--text-tertiary);margin-bottom:10px">CANDIDATES FOR THIS POSITION</p>
              ${candidates.map((c, i) => `
                <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:12px;cursor:pointer;transition:background 0.2s;margin-bottom:4px" class="ai-cand-chip" data-name="${c.name}" onclick="Router.navigate('/hr/applications/${c.id}')">
                  <div class="avatar avatar-xs" style="width:28px;height:28px;font-size:10px;background:${c.bg};color:${c.color}">${c.init}</div>
                  <div style="flex:1;min-width:0">
                    <p style="font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.name}</p>
                    <p style="font-size:9px;color:var(--text-tertiary)">${c.score}% match</p>
                  </div>
                  <span style="font-size:12px;font-weight:800;color:${c.score >= 90 ? 'var(--teal)' : c.score >= 75 ? 'var(--orange)' : 'var(--red)'}">#${i + 1}</span>
                </div>
              `).join('')}
            </div>

            <div class="glass-card" style="padding:16px">
              <p style="font-size:11px;font-weight:700;color:var(--text-tertiary);margin-bottom:10px">POSITION REQUIREMENTS</p>
              <div style="display:flex;flex-wrap:wrap;gap:4px">
                ${pos.reqs.map(r => `<span style="font-size:10px;padding:3px 8px;border-radius:6px;background:rgba(0,167,157,0.06);color:var(--teal);font-weight:600">${r}</span>`).join('')}
              </div>
            </div>

            <div class="glass-card" style="padding:16px">
              <p style="font-size:11px;font-weight:700;color:var(--text-tertiary);margin-bottom:8px">AI ANALYSIS STATS</p>
              <div style="display:flex;flex-direction:column;gap:6px">
                <div style="display:flex;justify-content:space-between;font-size:11px"><span style="color:var(--text-secondary)">Messages sent</span><strong id="ai-msg-count">0</strong></div>
                <div style="display:flex;justify-content:space-between;font-size:11px"><span style="color:var(--text-secondary)">Candidates analyzed</span><strong>${candidates.length}</strong></div>
                <div style="display:flex;justify-content:space-between;font-size:11px"><span style="color:var(--text-secondary)">Avg match score</span><strong style="color:var(--teal)">${candidates.length ? (candidates.reduce((s,c)=>s+c.score,0)/candidates.length).toFixed(0) : 0}%</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>`;

  page.appendChild(main);

  /* ═══════════ JavaScript Handlers ═══════════ */
  setTimeout(() => {

    /* ─── Tab Switching ─── */
    const tabBtns = page.querySelectorAll('#manage-tabs .tab');
    const tabPanels = { ranked: page.querySelector('#tab-ranked'), upload: page.querySelector('#tab-upload'), 'ai-chat': page.querySelector('#tab-ai-chat') };
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        Object.values(tabPanels).forEach(p => p.style.display = 'none');
        tabPanels[btn.dataset.tab].style.display = btn.dataset.tab === 'ai-chat' ? 'grid' : (btn.dataset.tab === 'ranked' ? 'flex' : 'block');
      });
    });

    /* ─── CV Upload ─── */
    const dropZone = page.querySelector('#cv-drop-zone');
    const fileInput = page.querySelector('#cv-file-input');
    const fileQueue = page.querySelector('#cv-file-queue');
    const fileCountEl = page.querySelector('#cv-file-count');
    const rankBtn = page.querySelector('#btn-rank-cvs');
    let uploadedFiles = [];

    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.style.borderColor = 'var(--teal)'; dropZone.style.background = 'rgba(0,167,157,0.04)'; });
    dropZone.addEventListener('dragleave', () => { dropZone.style.borderColor = 'var(--glass-border)'; dropZone.style.background = 'var(--glass-bg)'; });
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--glass-border)'; dropZone.style.background = 'var(--glass-bg)';
      handleFiles(Array.from(e.dataTransfer.files));
    });
    fileInput.addEventListener('change', () => { handleFiles(Array.from(fileInput.files)); fileInput.value = ''; });

    function handleFiles(files) {
      const pdfs = files.filter(f => f.type === 'application/pdf' || f.name.endsWith('.pdf'));
      if (pdfs.length === 0) { alert('Please upload PDF files only.'); return; }
      const remaining = 5 - uploadedFiles.length;
      if (remaining <= 0) { alert('Maximum 5 files allowed.'); return; }
      const toAdd = pdfs.slice(0, remaining);
      toAdd.forEach(f => {
        const id = 'f-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
        uploadedFiles.push({ id, file: f, name: f.name, size: (f.size / 1024 / 1024).toFixed(1) });
      });
      renderFileQueue();
    }

    function renderFileQueue() {
      fileQueue.innerHTML = uploadedFiles.map((f, i) => `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:14px;background:var(--glass-bg);border:1px solid var(--glass-border);animation:fadeIn 0.3s" data-fid="${f.id}">
          <span style="font-size:20px">📄</span>
          <div style="flex:1;min-width:0">
            <p style="font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${f.name}</p>
            <p style="font-size:10px;color:var(--text-tertiary)">${f.size} MB</p>
          </div>
          <span style="font-size:10px;padding:3px 8px;border-radius:6px;background:rgba(0,167,157,0.08);color:var(--teal);font-weight:600">Ready</span>
          <button class="cv-remove-btn" data-fid="${f.id}" style="width:24px;height:24px;border-radius:8px;border:none;background:rgba(237,28,36,0.08);color:var(--red);cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center">✕</button>
        </div>
      `).join('');
      fileCountEl.textContent = uploadedFiles.length;
      if (uploadedFiles.length > 0) {
        rankBtn.disabled = false; rankBtn.style.opacity = '1'; rankBtn.style.cursor = 'pointer';
      } else {
        rankBtn.disabled = true; rankBtn.style.opacity = '0.5'; rankBtn.style.cursor = 'not-allowed';
      }
      // Remove buttons
      fileQueue.querySelectorAll('.cv-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          uploadedFiles = uploadedFiles.filter(f => f.id !== btn.dataset.fid);
          renderFileQueue();
        });
      });
    }

    /* ─── AI Rank CVs ─── */
    rankBtn.addEventListener('click', function() {
      if (uploadedFiles.length === 0) return;
      this.innerHTML = '⏳ Analyzing CVs…'; this.disabled = true; this.style.opacity = '0.7';

      // Simulate AI analysis with fake names extracted from "filenames"
      setTimeout(() => {
        const fakeResults = uploadedFiles.map((f, i) => {
          const namePart = f.name.replace(/[_-]/g, ' ').replace('.pdf', '').replace('.PDF', '');
          const score = Math.floor(Math.random() * 30) + 65;
          const skills = pos.reqs.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 2);
          const missing = pos.reqs.filter(r => !skills.includes(r)).slice(0, 2);
          return { name: namePart, file: f.name, score, skills, missing, exp: Math.floor(Math.random() * 8) + 1 };
        }).sort((a, b) => b.score - a.score);

        const resultsEl = page.querySelector('#cv-ranked-list');
        resultsEl.innerHTML = fakeResults.map((r, i) => `
          <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:14px;border:1px solid ${i === 0 ? 'rgba(0,167,157,0.3)' : 'var(--glass-border)'};background:${i === 0 ? 'rgba(0,167,157,0.03)' : 'var(--glass-bg)'};animation:fadeIn ${0.3 + i * 0.15}s ease">
            <div style="width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;
              ${i === 0 ? 'background:linear-gradient(135deg,#FFD700,#FFA500);color:#fff' : i === 1 ? 'background:linear-gradient(135deg,#C0C0C0,#A0A0A0);color:#fff' : 'background:var(--glass-bg);color:var(--text-tertiary)'}">
              ${i < 3 ? ['🥇','🥈','🥉'][i] : '#' + (i + 1)}
            </div>
            <div style="flex:1;min-width:0">
              <p style="font-size:13px;font-weight:700">${r.name}</p>
              <p style="font-size:10px;color:var(--text-tertiary)">${r.file} · ${r.exp} yrs experience</p>
              <div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:4px">
                ${r.skills.map(s => `<span style="font-size:9px;padding:2px 6px;border-radius:5px;background:rgba(0,167,157,0.08);color:var(--teal)">✓ ${s}</span>`).join('')}
                ${r.missing.map(s => `<span style="font-size:9px;padding:2px 6px;border-radius:5px;background:rgba(237,28,36,0.06);color:var(--red)">✗ ${s}</span>`).join('')}
              </div>
            </div>
            <div style="text-align:center">
              <div style="font-size:18px;font-weight:800;color:${r.score >= 85 ? 'var(--teal)' : r.score >= 70 ? 'var(--orange)' : 'var(--red)'}">${r.score}%</div>
              <p style="font-size:9px;color:var(--text-tertiary)">AI Score</p>
            </div>
          </div>
        `).join('');

        page.querySelector('#cv-ranking-results').style.display = 'block';
        this.innerHTML = '✅ Analysis Complete'; this.style.opacity = '1';
        setTimeout(() => { this.innerHTML = '🤖 Re-Rank Candidates'; this.disabled = false; }, 2000);
      }, 2500);
    });

    /* ─── HR AI Chat ─── */
    const chatMessages = page.querySelector('#ai-chat-messages');
    const chatInput = page.querySelector('#ai-chat-input');
    const sendBtn = page.querySelector('#btn-ai-send');
    const msgCountEl = page.querySelector('#ai-msg-count');
    let msgCount = 0;

    function addUserMsg(text) {
      const div = document.createElement('div');
      div.style.cssText = 'display:flex;justify-content:flex-end;animation:fadeIn 0.3s';
      div.innerHTML = `<div style="background:linear-gradient(135deg,var(--red),#BE1E2D);color:#fff;border-radius:16px 0 16px 16px;padding:10px 16px;max-width:80%;font-size:12px;line-height:1.6">${text}</div>`;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addAIMsg(html) {
      const div = document.createElement('div');
      div.style.cssText = 'display:flex;gap:10px;align-items:flex-start;animation:fadeIn 0.3s';
      div.innerHTML = `
        <div style="width:28px;height:28px;border-radius:10px;background:linear-gradient(135deg,var(--red),var(--teal));display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">🤖</div>
        <div style="background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:0 16px 16px 16px;padding:12px 16px;max-width:85%;font-size:12px;line-height:1.6;color:var(--text-primary)">${html}</div>`;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
      const div = document.createElement('div');
      div.id = 'typing-indicator';
      div.style.cssText = 'display:flex;gap:10px;align-items:flex-start;animation:fadeIn 0.2s';
      div.innerHTML = `
        <div style="width:28px;height:28px;border-radius:10px;background:linear-gradient(135deg,var(--red),var(--teal));display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">🤖</div>
        <div style="background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:0 16px 16px 16px;padding:12px 16px;font-size:12px;color:var(--text-tertiary)">
          <span class="typing-dots">Analyzing<span>.</span><span>.</span><span>.</span></span>
        </div>`;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    function removeTyping() {
      const t = page.querySelector('#typing-indicator');
      if (t) t.remove();
    }

    function generateAIResponse(query) {
      const q = query.toLowerCase();
      const topC = candidates[0];
      const top3 = candidates.slice(0, 3);

      // Best candidate
      if (q.includes('best') || q.includes('top candidate') || q.includes('recommend') || q.includes('who should')) {
        if (!topC) return '<p>No candidates available for this position yet.</p>';
        return `
          <p style="font-weight:700;margin-bottom:8px">🏆 Recommended: ${topC.name} (${topC.score}% match)</p>
          <p style="margin-bottom:6px"><strong>${topC.name}</strong> stands out as the strongest candidate for the <strong>${pos.title}</strong> position. Here's why:</p>
          <ul style="padding-left:16px;margin:6px 0;line-height:2">
            <li><strong>Experience:</strong> ${topC.experience[0] ? topC.experience[0].title + ' at ' + topC.experience[0].company + ' (' + topC.experience[0].duration + ')' : 'N/A'}</li>
            <li><strong>Education:</strong> ${topC.education.degree} — ${topC.education.school}</li>
            <li><strong>Key Skills:</strong> ${topC.skills.filter(s=>s.match).map(s=>s.skill).join(', ')}</li>
            <li><strong>Match Score:</strong> <span style="color:var(--teal);font-weight:700">${topC.matchPct}%</span> skills alignment</li>
          </ul>
          <p style="margin-top:6px;font-size:11px;color:var(--text-tertiary)">💡 I suggest scheduling a final interview with ${topC.name.split(' ')[0]} soon to secure this candidate.</p>`;
      }

      // Compare
      if (q.includes('compare') || q.includes('side by side') || q.includes('versus') || q.includes('vs')) {
        if (top3.length < 2) return '<p>Need at least 2 candidates to compare.</p>';
        return `
          <p style="font-weight:700;margin-bottom:10px">📊 Top ${Math.min(3, top3.length)} Candidate Comparison</p>
          <table style="width:100%;font-size:11px;border-collapse:collapse">
            <thead>
              <tr style="border-bottom:1px solid var(--glass-border)">
                <th style="text-align:left;padding:6px 8px;color:var(--text-tertiary)">Metric</th>
                ${top3.map(c => `<th style="text-align:center;padding:6px 8px">${c.name.split(' ')[0]}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding:6px 8px;color:var(--text-secondary)">Match Score</td>${top3.map(c => `<td style="text-align:center;padding:6px 8px;font-weight:700;color:${c.score >= 90 ? 'var(--teal)' : 'var(--orange)'}">${c.score}%</td>`).join('')}</tr>
              <tr style="background:rgba(0,0,0,0.02)"><td style="padding:6px 8px;color:var(--text-secondary)">Skills Match</td>${top3.map(c => `<td style="text-align:center;padding:6px 8px">${c.matchPct}%</td>`).join('')}</tr>
              <tr><td style="padding:6px 8px;color:var(--text-secondary)">Experience</td>${top3.map(c => `<td style="text-align:center;padding:6px 8px;font-size:10px">${c.experience[0] ? c.experience[0].duration : '—'}</td>`).join('')}</tr>
              <tr style="background:rgba(0,0,0,0.02)"><td style="padding:6px 8px;color:var(--text-secondary)">Status</td>${top3.map(c => `<td style="text-align:center;padding:6px 8px"><span class="badge ${c.badge}" style="font-size:9px">${c.status}</span></td>`).join('')}</tr>
              <tr><td style="padding:6px 8px;color:var(--text-secondary)">Matched Skills</td>${top3.map(c => `<td style="text-align:center;padding:6px 8px;font-size:10px">${c.skills.filter(s=>s.match).length}/${c.skills.length}</td>`).join('')}</tr>
            </tbody>
          </table>
          <p style="margin-top:10px;font-size:11px;color:var(--teal);font-weight:600">✅ Recommendation: ${top3[0].name} leads in overall qualifications.</p>`;
      }

      // Skill gaps
      if (q.includes('skill gap') || q.includes('missing skill') || q.includes('weakness') || q.includes('lack')) {
        return `
          <p style="font-weight:700;margin-bottom:8px">⚠️ Candidate Skill Gap Analysis</p>
          ${candidates.map(c => {
            const missing = c.skills.filter(s => !s.match);
            return `<div style="margin-bottom:8px;padding:8px 12px;border-radius:10px;border:1px solid var(--glass-border)">
              <p style="font-size:11px;font-weight:700">${c.name} <span style="color:var(--text-tertiary)">(${c.matchPct}% match)</span></p>
              <div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:4px">
                ${missing.length > 0 ? missing.map(s => `<span style="font-size:9px;padding:2px 6px;border-radius:5px;background:rgba(237,28,36,0.06);color:var(--red)">✗ ${s.skill}</span>`).join('') : `<span style="font-size:9px;color:var(--teal)">✓ No critical gaps</span>`}
              </div>
            </div>`;
          }).join('')}
          <p style="margin-top:6px;font-size:11px;color:var(--text-tertiary)">💡 Tip: Consider if missing skills are trainable or must-haves.</p>`;
      }

      // Interview questions
      if (q.includes('interview question') || q.includes('interview q') || q.includes('ask in interview') || q.includes('questions for')) {
        const target = topC;
        return `
          <p style="font-weight:700;margin-bottom:8px">💬 Suggested Interview Questions for ${target.name}</p>
          <ol style="padding-left:18px;line-height:2.2;font-size:11px">
            <li>Tell me about your experience with <strong>${target.skills.filter(s=>s.match)[0]?.skill || pos.reqs[0]}</strong> and how you applied it in your previous role at ${target.experience[0]?.company || 'your previous company'}?</li>
            <li>How do you handle tight deadlines when working on ${pos.reqs[0]} tasks?</li>
            <li>Can you walk me through a project where you used ${pos.reqs[1] || pos.reqs[0]} and ${pos.reqs[2] || pos.reqs[0]}?</li>
            <li>What interests you about the ${pos.title} role at Metfone specifically?</li>
            <li>How would you rate yourself on ${target.skills.filter(s=>!s.match)[0]?.skill || pos.reqs[3] || 'teamwork'}? This role requires it.</li>
          </ol>
          <p style="margin-top:6px;font-size:10px;color:var(--text-tertiary)">🎯 These questions target both proven skills and identified gaps for ${target.name.split(' ')[0]}.</p>`;
      }

      // Experience
      if (q.includes('experience') || q.includes('most experienced') || q.includes('work history')) {
        const sorted = [...candidates].sort((a, b) => {
          const durA = a.experience[0] ? parseFloat(a.experience[0].duration) || 0 : 0;
          const durB = b.experience[0] ? parseFloat(b.experience[0].duration) || 0 : 0;
          return durB - durA;
        });
        return `
          <p style="font-weight:700;margin-bottom:8px">📋 Candidates Ranked by Experience</p>
          ${sorted.map((c, i) => `
            <div style="display:flex;align-items:center;gap:8px;padding:6px 0;${i < sorted.length - 1 ? 'border-bottom:1px solid var(--glass-border)' : ''}">
              <span style="font-size:12px;font-weight:800;color:${i === 0 ? 'var(--teal)' : 'var(--text-tertiary)'};">#${i + 1}</span>
              <div style="flex:1">
                <p style="font-size:11px;font-weight:600">${c.name}</p>
                <p style="font-size:10px;color:var(--text-tertiary)">${c.experience[0] ? c.experience[0].title + ' at ' + c.experience[0].company + ' — ' + c.experience[0].duration : 'No experience listed'}</p>
              </div>
              <span style="font-size:11px;font-weight:700;color:${c.score >= 90 ? 'var(--teal)' : 'var(--orange)'}">${c.score}%</span>
            </div>
          `).join('')}`;
      }

      // Salary / offer
      if (q.includes('salary') || q.includes('offer') || q.includes('compensation') || q.includes('budget')) {
        return `<p style="font-weight:700;margin-bottom:8px">💰 Salary Range for ${pos.title}</p>
          <p>The approved salary range is <strong style="color:var(--teal)">${pos.salary}</strong> per month.</p>
          <p style="margin-top:6px">With <strong>${candidates.length}</strong> candidates and <strong>${pos.slots}</strong> open position(s), you have good leverage in the market. I recommend offering at the midpoint for <strong>${topC?.name || 'the top candidate'}</strong> given their experience.</p>`;
      }

      // Generic / catch-all
      return `
        <p>Here's a summary of the <strong>${pos.title}</strong> position:</p>
        <ul style="padding-left:16px;margin:6px 0;line-height:2">
          <li><strong>Department:</strong> ${pos.dept}</li>
          <li><strong>Open Slots:</strong> ${pos.slots}</li>
          <li><strong>Salary:</strong> ${pos.salary}</li>
          <li><strong>Candidates:</strong> ${candidates.length} (Avg score: ${candidates.length ? (candidates.reduce((s,c)=>s+c.score,0)/candidates.length).toFixed(0) : 0}%)</li>
          <li><strong>Top Candidate:</strong> ${topC ? topC.name + ' (' + topC.score + '%)' : 'None yet'}</li>
        </ul>
        <p style="margin-top:6px;font-size:11px;color:var(--text-tertiary)">💡 Try asking: "Who is the best candidate?", "Compare top 3", "What skill gaps exist?", or "Suggest interview questions"</p>`;
    }

    function sendMessage(text) {
      if (!text.trim()) return;
      addUserMsg(text);
      chatInput.value = '';
      msgCount++;
      msgCountEl.textContent = msgCount;

      showTyping();
      const delay = 800 + Math.random() * 1200;
      setTimeout(() => {
        removeTyping();
        addAIMsg(generateAIResponse(text));
      }, delay);
    }

    sendBtn.addEventListener('click', () => sendMessage(chatInput.value));
    chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(chatInput.value); });

    // Quick prompts
    page.querySelectorAll('.ai-prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => sendMessage(chip.dataset.prompt));
    });

    // Clear chat
    page.querySelector('#btn-clear-chat').addEventListener('click', () => {
      chatMessages.innerHTML = '';
      msgCount = 0;
      msgCountEl.textContent = '0';
      addAIMsg(`Chat cleared. I'm ready to help analyze <strong>${pos.title}</strong> candidates. What would you like to know?`);
    });

  }); /* end setTimeout */

  return page;
});
