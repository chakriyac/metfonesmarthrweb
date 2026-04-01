/* ─── Seeker Profile Page ─── */
Router.register('/profile', function renderSeekerProfile() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/profile'));

  /* ── Editable data model ── */
  const profile = {
    name: 'Sokha Rith', initials: 'SR', location: 'Phnom Penh, Cambodia',
    phone: '+855 12 345 678', email: 'sokha.r@email.com', linkedin: 'linkedin.com/in/sokha',
    about: 'Motivated professional with 2 years of customer service experience at Metfone. Seeking opportunities in HR to leverage strong interpersonal skills and knowledge of recruitment processes.',
    experience: [
      { id:1, title:'Customer Service Representative', company:'Metfone', from:'Jan 2023', to:'Present', desc:'Handled customer inquiries, resolved complaints, and maintained 95% satisfaction rating.' },
      { id:2, title:'Sales Associate (Part-time)', company:'Smart Axiata', from:'Jun 2021', to:'Dec 2022', desc:'Assisted walk-in customers with plan selections and device purchases.' },
    ],
    education: [
      { id:1, degree:'B.A. Business Administration', school:'Royal University of Phnom Penh', from:'2018', to:'2022' },
    ],
    skills: ['Customer Service','Communication','Khmer (Native)','English (Fluent)','MS Office','CRM Systems','Recruitment','Team Collaboration'],
    languages: [
      { lang:'Khmer', level:'Native', pct:100 },
      { lang:'English', level:'Fluent', pct:85 },
    ],
    certifications: [
      { id:1, name:'Customer Success Fundamentals', issuer:'Coursera', year:'2023' },
    ],
    documents: [
      { name:'Sokha_Rith_CV.pdf', size:'2.4 MB', date:'Mar 2026' },
      { name:'Cover_Letter.pdf', size:'890 KB', date:'Mar 2026' },
    ],
  };

  let nextExpId = 3, nextEduId = 2, nextCertId = 2;

  const main = el('div', { className: 'main-content' });

  function render() {
    const completeness = calcCompleteness();
    main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <!-- Hero -->
        <div class="hero-card" style="margin-bottom:24px;text-align:center;padding:32px 24px">
          <div class="avatar avatar-xl" style="margin:0 auto 12px;background:#FDE8E8;color:#ED1C24;font-weight:700;font-size:22px">${profile.initials}</div>
          <h2 style="font-family:var(--font-display);font-size:22px;font-weight:800;margin-bottom:2px">${profile.name}</h2>
          <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px">Job Seeker · ${profile.location}</p>
          <div style="display:flex;justify-content:center;gap:20px">
            <div><span style="font-family:var(--font-display);font-size:18px;font-weight:700">5</span><p style="font-size:11px;color:var(--text-tertiary)">Applied</p></div>
            <div style="width:1px;background:rgba(255,255,255,0.35)"></div>
            <div><span style="font-family:var(--font-display);font-size:18px;font-weight:700">2</span><p style="font-size:11px;color:var(--text-tertiary)">Interviews</p></div>
            <div style="width:1px;background:rgba(255,255,255,0.35)"></div>
            <div><span style="font-family:var(--font-display);font-size:18px;font-weight:700">1</span><p style="font-size:11px;color:var(--text-tertiary)">Offers</p></div>
          </div>
        </div>

        <!-- CV Upload + AI Extract -->
        <div id="cvSection" class="card card-lg" style="margin-bottom:24px;border:2px dashed var(--border);text-align:center;padding:28px;position:relative;transition:all .3s">
          <div style="font-size:36px;margin-bottom:10px">📄</div>
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:4px">Upload or Update Your CV</h3>
          <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:16px">AI will extract your experience, education, skills and more automatically</p>
          <input type="file" id="cvFileInput" accept=".pdf,.doc,.docx" style="display:none">
          <button id="cvUploadBtn" class="btn-dark" style="margin:0 auto">📤 Choose File (PDF, DOC)</button>
          <div id="cvExtracting" style="display:none;margin-top:16px">
            <div style="display:flex;align-items:center;justify-content:center;gap:10px">
              <div style="width:20px;height:20px;border:3px solid var(--border);border-top-color:var(--teal);border-radius:50%;animation:spin 1s linear infinite"></div>
              <span style="font-size:13px;font-weight:600;color:var(--teal)">AI is extracting your profile data…</span>
            </div>
          </div>
          <div id="cvSuccess" style="display:none;margin-top:16px">
            <div class="card" style="border-left:4px solid var(--green);text-align:left;padding:14px 18px">
              <p style="font-size:13px;font-weight:600;color:var(--green);margin-bottom:4px">✅ CV Processed Successfully</p>
              <p id="cvExtractSummary" style="font-size:12px;color:var(--text-secondary);line-height:1.5"></p>
            </div>
          </div>
        </div>

        <!-- About (editable) -->
        <div class="profile-section" style="position:relative">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <h3 class="section-label">ABOUT ME</h3>
            <button class="edit-section-btn" data-section="about" style="font-size:11px;color:var(--teal);background:none;border:none;cursor:pointer;font-weight:600">✏️ Edit</button>
          </div>
          <div id="aboutDisplay"><p style="font-size:13px;color:var(--text-secondary);line-height:1.6">${profile.about}</p></div>
          <div id="aboutEdit" style="display:none">
            <textarea id="aboutInput" style="width:100%;min-height:80px;border:1px solid var(--border);border-radius:12px;padding:12px;font-size:13px;font-family:inherit;resize:vertical;background:var(--glass-bg);backdrop-filter:blur(8px)">${profile.about}</textarea>
            <div style="display:flex;gap:8px;margin-top:8px;justify-content:flex-end">
              <button class="btn-glass cancel-edit" data-section="about" style="padding:6px 14px;font-size:12px">Cancel</button>
              <button class="btn-dark save-edit" data-section="about" style="padding:6px 14px;font-size:12px">Save</button>
            </div>
          </div>
        </div>

        <!-- Contact Info (editable) -->
        <div class="profile-section">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <h3 class="section-label">CONTACT INFORMATION</h3>
            <button class="edit-section-btn" data-section="contact" style="font-size:11px;color:var(--teal);background:none;border:none;cursor:pointer;font-weight:600">✏️ Edit</button>
          </div>
          <div id="contactDisplay">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
              ${[
                { icon:'📱', label:'Phone', value: profile.phone },
                { icon:'✉️', label:'Email', value: profile.email },
                { icon:'📍', label:'Location', value: profile.location },
                { icon:'🌐', label:'LinkedIn', value: profile.linkedin },
              ].map(c => `<div style="display:flex;gap:10px;align-items:start"><span style="font-size:16px">${c.icon}</span><div><p style="font-size:11px;color:var(--text-tertiary)">${c.label}</p><p style="font-size:13px;font-weight:500">${c.value}</p></div></div>`).join('')}
            </div>
          </div>
          <div id="contactEdit" style="display:none">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:4px">Phone</label><input id="editPhone" value="${profile.phone}" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:10px;font-size:13px;background:var(--glass-bg)"></div>
              <div><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:4px">Email</label><input id="editEmail" value="${profile.email}" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:10px;font-size:13px;background:var(--glass-bg)"></div>
              <div><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:4px">Location</label><input id="editLocation" value="${profile.location}" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:10px;font-size:13px;background:var(--glass-bg)"></div>
              <div><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:4px">LinkedIn</label><input id="editLinkedin" value="${profile.linkedin}" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:10px;font-size:13px;background:var(--glass-bg)"></div>
            </div>
            <div style="display:flex;gap:8px;margin-top:10px;justify-content:flex-end">
              <button class="btn-glass cancel-edit" data-section="contact" style="padding:6px 14px;font-size:12px">Cancel</button>
              <button class="btn-dark save-edit" data-section="contact" style="padding:6px 14px;font-size:12px">Save</button>
            </div>
          </div>
        </div>

        <!-- Work Experience (editable + add) -->
        <div class="profile-section">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <h3 class="section-label">WORK EXPERIENCE</h3>
            <button id="addExpBtn" style="font-size:11px;color:var(--teal);background:none;border:none;cursor:pointer;font-weight:600">+ Add Experience</button>
          </div>
          <div id="addExpForm" style="display:none;margin-bottom:16px">
            <div class="card" style="padding:16px;border:1px dashed var(--teal)">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
                <div><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:3px">Job Title *</label><input id="newExpTitle" placeholder="e.g. Software Engineer" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
                <div><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:3px">Company *</label><input id="newExpCompany" placeholder="e.g. Metfone" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
                <div><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:3px">From</label><input id="newExpFrom" placeholder="e.g. Jan 2023" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
                <div><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:3px">To</label><input id="newExpTo" placeholder="e.g. Present" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
              </div>
              <div><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:3px">Description</label><textarea id="newExpDesc" rows="2" placeholder="Key responsibilities and achievements…" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;font-family:inherit;resize:vertical;background:var(--glass-bg)"></textarea></div>
              <div style="display:flex;gap:8px;margin-top:10px;justify-content:flex-end">
                <button id="cancelAddExp" class="btn-glass" style="padding:6px 14px;font-size:12px">Cancel</button>
                <button id="saveAddExp" class="btn-dark" style="padding:6px 14px;font-size:12px">Add</button>
              </div>
            </div>
          </div>
          ${profile.experience.map(w => `
            <div style="display:flex;gap:14px;margin-bottom:16px;align-items:flex-start">
              <div style="width:36px;height:36px;border-radius:10px;background:var(--red-bg);display:flex;align-items:center;justify-content:center;flex-shrink:0">${logoHTML('sm')}</div>
              <div style="flex:1">
                <p style="font-size:14px;font-weight:600">${w.title}</p>
                <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:4px">${w.company} · ${w.from} – ${w.to}</p>
                <p style="font-size:12px;color:var(--text-secondary);line-height:1.5">${w.desc}</p>
              </div>
              <button class="remove-item" data-type="exp" data-id="${w.id}" style="background:none;border:none;font-size:14px;cursor:pointer;color:var(--text-tertiary);padding:4px" title="Remove">✕</button>
            </div>`).join('')}
        </div>

        <!-- Education (editable + add) -->
        <div class="profile-section">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <h3 class="section-label">EDUCATION</h3>
            <button id="addEduBtn" style="font-size:11px;color:var(--teal);background:none;border:none;cursor:pointer;font-weight:600">+ Add Education</button>
          </div>
          <div id="addEduForm" style="display:none;margin-bottom:16px">
            <div class="card" style="padding:16px;border:1px dashed var(--teal)">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
                <div style="grid-column:span 2"><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:3px">Degree / Certificate *</label><input id="newEduDegree" placeholder="e.g. B.Sc. Computer Science" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
                <div><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:3px">School / Institution *</label><input id="newEduSchool" placeholder="e.g. Royal University of Phnom Penh" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
                <div style="display:flex;gap:8px">
                  <div style="flex:1"><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:3px">From</label><input id="newEduFrom" placeholder="2018" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
                  <div style="flex:1"><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:3px">To</label><input id="newEduTo" placeholder="2022" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
                </div>
              </div>
              <div style="display:flex;gap:8px;justify-content:flex-end">
                <button id="cancelAddEdu" class="btn-glass" style="padding:6px 14px;font-size:12px">Cancel</button>
                <button id="saveAddEdu" class="btn-dark" style="padding:6px 14px;font-size:12px">Add</button>
              </div>
            </div>
          </div>
          ${profile.education.map(e => `
            <div style="display:flex;gap:14px;margin-bottom:14px;align-items:flex-start">
              <div style="width:36px;height:36px;border-radius:10px;background:#F0F9F8;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">🎓</div>
              <div style="flex:1">
                <p style="font-size:14px;font-weight:600">${e.degree}</p>
                <p style="font-size:12px;color:var(--text-tertiary)">${e.school} · ${e.from} – ${e.to}</p>
              </div>
              <button class="remove-item" data-type="edu" data-id="${e.id}" style="background:none;border:none;font-size:14px;cursor:pointer;color:var(--text-tertiary);padding:4px" title="Remove">✕</button>
            </div>`).join('')}
        </div>

        <!-- Skills (editable + add) -->
        <div class="profile-section">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <h3 class="section-label">SKILLS</h3>
            <button id="addSkillBtn" style="font-size:11px;color:var(--teal);background:none;border:none;cursor:pointer;font-weight:600">+ Add Skill</button>
          </div>
          <div id="addSkillForm" style="display:none;margin-bottom:12px">
            <div style="display:flex;gap:8px;align-items:center">
              <input id="newSkillInput" placeholder="Type a skill…" style="flex:1;padding:8px 12px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)">
              <button id="saveAddSkill" class="btn-dark" style="padding:6px 14px;font-size:12px">Add</button>
              <button id="cancelAddSkill" class="btn-glass" style="padding:6px 14px;font-size:12px">Cancel</button>
            </div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${profile.skills.map((s,i) => `<span class="badge badge-gray" style="display:inline-flex;align-items:center;gap:6px">${s}<button class="remove-skill" data-idx="${i}" style="background:none;border:none;font-size:12px;cursor:pointer;color:var(--text-tertiary);padding:0;line-height:1">✕</button></span>`).join('')}
          </div>
        </div>

        <!-- Certifications (editable + add) -->
        <div class="profile-section">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <h3 class="section-label">CERTIFICATIONS</h3>
            <button id="addCertBtn" style="font-size:11px;color:var(--teal);background:none;border:none;cursor:pointer;font-weight:600">+ Add Certification</button>
          </div>
          <div id="addCertForm" style="display:none;margin-bottom:14px">
            <div class="card" style="padding:16px;border:1px dashed var(--teal)">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                <div style="grid-column:span 2"><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:3px">Certification Name *</label><input id="newCertName" placeholder="e.g. AWS Cloud Practitioner" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
                <div><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:3px">Issuer</label><input id="newCertIssuer" placeholder="e.g. Amazon" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
                <div><label style="font-size:11px;color:var(--text-tertiary);display:block;margin-bottom:3px">Year</label><input id="newCertYear" placeholder="e.g. 2025" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
              </div>
              <div style="display:flex;gap:8px;margin-top:10px;justify-content:flex-end">
                <button id="cancelAddCert" class="btn-glass" style="padding:6px 14px;font-size:12px">Cancel</button>
                <button id="saveAddCert" class="btn-dark" style="padding:6px 14px;font-size:12px">Add</button>
              </div>
            </div>
          </div>
          ${profile.certifications.map(c => `
            <div style="display:flex;gap:14px;margin-bottom:12px;align-items:flex-start">
              <div style="width:36px;height:36px;border-radius:10px;background:#FFF3E0;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">🏅</div>
              <div style="flex:1">
                <p style="font-size:14px;font-weight:600">${c.name}</p>
                <p style="font-size:12px;color:var(--text-tertiary)">${c.issuer} · ${c.year}</p>
              </div>
              <button class="remove-item" data-type="cert" data-id="${c.id}" style="background:none;border:none;font-size:14px;cursor:pointer;color:var(--text-tertiary);padding:4px" title="Remove">✕</button>
            </div>`).join('')}
        </div>

        <!-- Languages -->
        <div class="profile-section">
          <h3 class="section-label">LANGUAGES</h3>
          <div style="display:flex;gap:16px">
            ${profile.languages.map(l => `
              <div style="flex:1">
                <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                  <span style="font-size:13px;font-weight:600">${l.lang}</span>
                  <span style="font-size:11px;color:var(--text-tertiary)">${l.level}</span>
                </div>
                <div style="height:6px;border-radius:3px;background:var(--border)"><div style="height:100%;width:${l.pct}%;border-radius:3px;background:var(--teal)"></div></div>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Right: Profile Actions -->
      <div class="col-side">
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:4px">Profile Completeness</h3>
          <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:12px">${completeness}% complete</p>
          <div style="height:8px;border-radius:4px;background:var(--border);margin-bottom:16px">
            <div style="height:100%;width:${completeness}%;border-radius:4px;background:linear-gradient(90deg,var(--teal),var(--green))"></div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn-glass" style="width:100%">⚙️ Settings</button>
            <button class="btn-outline-red" style="width:100%" onclick="logout()">🚪 Sign Out</button>
          </div>
        </div>

        <!-- Documents & CV -->
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Documents</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${profile.documents.map(d => `
              <div style="display:flex;align-items:center;gap:10px">
                <span style="font-size:18px">📄</span>
                <div style="flex:1">
                  <p style="font-size:13px;font-weight:500">${d.name}</p>
                  <p style="font-size:11px;color:var(--text-tertiary)">${d.size} · ${d.date}</p>
                </div>
                <a href="#" style="font-size:12px;font-weight:600;color:var(--teal)">View</a>
              </div>`).join('')}
          </div>
        </div>

        <!-- AI Suggestions -->
        <div class="card card-lg" style="border-left:4px solid var(--orange)">
          <h3 style="font-family:var(--font-display);font-size:14px;font-weight:700;margin-bottom:8px">🤖 AI Suggestions</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${completeness < 100 ? '<p style="font-size:12px;color:var(--text-secondary);line-height:1.5">Upload your latest CV to auto-fill missing sections and boost your profile score.</p>' : ''}
            ${profile.skills.length < 10 ? '<p style="font-size:12px;color:var(--text-secondary);line-height:1.5">💡 Adding more skills increases your match rate with job postings by up to 35%.</p>' : ''}
            ${profile.certifications.length < 2 ? '<p style="font-size:12px;color:var(--text-secondary);line-height:1.5">📜 Candidates with certifications get 2× more interview invitations.</p>' : ''}
          </div>
        </div>
      </div>
    </div>`;

    bindEvents();
  }

  function calcCompleteness() {
    let score = 0, total = 7;
    if (profile.about) score++;
    if (profile.phone && profile.email) score++;
    if (profile.experience.length) score++;
    if (profile.education.length) score++;
    if (profile.skills.length >= 3) score++;
    if (profile.certifications.length) score++;
    if (profile.documents.length) score++;
    return Math.round((score / total) * 100);
  }

  function bindEvents() {
    /* CV upload */
    const cvBtn = document.getElementById('cvUploadBtn');
    const cvInput = document.getElementById('cvFileInput');
    if (cvBtn && cvInput) {
      cvBtn.onclick = () => cvInput.click();
      cvInput.onchange = () => {
        const file = cvInput.files[0];
        if (!file) return;
        cvBtn.style.display = 'none';
        document.getElementById('cvExtracting').style.display = 'block';
        /* Simulate AI extraction */
        setTimeout(() => {
          profile.experience.push({ id: nextExpId++, title:'Project Coordinator', company:'Cellcard', from:'Mar 2020', to:'May 2021', desc:'Coordinated cross-functional projects, managed timelines, and stakeholder communications.' });
          profile.education.push({ id: nextEduId++, degree:'Diploma in Project Management', school:'National Institute of Management', from:'2019', to:'2020' });
          profile.certifications.push({ id: nextCertId++, name:'Google Project Management Certificate', issuer:'Google / Coursera', year:'2024' });
          ['Project Management','Stakeholder Communication','Agile Methodology','Risk Assessment'].forEach(s => {
            if (!profile.skills.includes(s)) profile.skills.push(s);
          });
          profile.languages.push({ lang:'Chinese', level:'Basic', pct:30 });
          profile.documents.unshift({ name: file.name, size: (file.size / 1024 / 1024).toFixed(1) + ' MB', date: 'Apr 2026' });
          document.getElementById('cvExtracting').style.display = 'none';
          document.getElementById('cvSuccess').style.display = 'block';
          document.getElementById('cvExtractSummary').textContent =
            'Extracted: 1 new work experience, 1 education, 1 certification, 4 skills, 1 language from "' + file.name + '"';
          setTimeout(() => render(), 2000);
        }, 2500);
      };
    }

    /* Section edit toggles */
    document.querySelectorAll('.edit-section-btn').forEach(btn => {
      btn.onclick = () => {
        const s = btn.dataset.section;
        document.getElementById(s + 'Display').style.display = 'none';
        document.getElementById(s + 'Edit').style.display = 'block';
      };
    });
    document.querySelectorAll('.cancel-edit').forEach(btn => {
      btn.onclick = () => {
        const s = btn.dataset.section;
        document.getElementById(s + 'Display').style.display = '';
        document.getElementById(s + 'Edit').style.display = 'none';
      };
    });
    document.querySelectorAll('.save-edit').forEach(btn => {
      btn.onclick = () => {
        const s = btn.dataset.section;
        if (s === 'about') {
          profile.about = document.getElementById('aboutInput').value.trim();
        } else if (s === 'contact') {
          profile.phone = document.getElementById('editPhone').value.trim();
          profile.email = document.getElementById('editEmail').value.trim();
          profile.location = document.getElementById('editLocation').value.trim();
          profile.linkedin = document.getElementById('editLinkedin').value.trim();
        }
        render();
      };
    });

    /* Add Experience */
    const addExpBtn = document.getElementById('addExpBtn');
    const addExpForm = document.getElementById('addExpForm');
    if (addExpBtn) addExpBtn.onclick = () => addExpForm.style.display = addExpForm.style.display === 'none' ? 'block' : 'none';
    const cancelExp = document.getElementById('cancelAddExp');
    if (cancelExp) cancelExp.onclick = () => addExpForm.style.display = 'none';
    const saveExp = document.getElementById('saveAddExp');
    if (saveExp) saveExp.onclick = () => {
      const t = document.getElementById('newExpTitle').value.trim();
      const c = document.getElementById('newExpCompany').value.trim();
      if (!t || !c) return;
      profile.experience.unshift({ id: nextExpId++, title: t, company: c, from: document.getElementById('newExpFrom').value.trim() || 'N/A', to: document.getElementById('newExpTo').value.trim() || 'Present', desc: document.getElementById('newExpDesc').value.trim() });
      render();
    };

    /* Add Education */
    const addEduBtn = document.getElementById('addEduBtn');
    const addEduForm = document.getElementById('addEduForm');
    if (addEduBtn) addEduBtn.onclick = () => addEduForm.style.display = addEduForm.style.display === 'none' ? 'block' : 'none';
    const cancelEdu = document.getElementById('cancelAddEdu');
    if (cancelEdu) cancelEdu.onclick = () => addEduForm.style.display = 'none';
    const saveEdu = document.getElementById('saveAddEdu');
    if (saveEdu) saveEdu.onclick = () => {
      const d = document.getElementById('newEduDegree').value.trim();
      const s = document.getElementById('newEduSchool').value.trim();
      if (!d || !s) return;
      profile.education.unshift({ id: nextEduId++, degree: d, school: s, from: document.getElementById('newEduFrom').value.trim() || '', to: document.getElementById('newEduTo').value.trim() || '' });
      render();
    };

    /* Add Skill */
    const addSkillBtn = document.getElementById('addSkillBtn');
    const addSkillForm = document.getElementById('addSkillForm');
    if (addSkillBtn) addSkillBtn.onclick = () => { addSkillForm.style.display = addSkillForm.style.display === 'none' ? 'flex' : 'none'; const inp = document.getElementById('newSkillInput'); if (inp) inp.focus(); };
    const cancelSkill = document.getElementById('cancelAddSkill');
    if (cancelSkill) cancelSkill.onclick = () => addSkillForm.style.display = 'none';
    const saveSkill = document.getElementById('saveAddSkill');
    if (saveSkill) saveSkill.onclick = () => {
      const v = document.getElementById('newSkillInput').value.trim();
      if (v && !profile.skills.includes(v)) { profile.skills.push(v); render(); }
    };
    const skillInput = document.getElementById('newSkillInput');
    if (skillInput) skillInput.onkeydown = (e) => { if (e.key === 'Enter') saveSkill.click(); };

    /* Remove skill */
    document.querySelectorAll('.remove-skill').forEach(btn => {
      btn.onclick = (e) => { e.stopPropagation(); profile.skills.splice(+btn.dataset.idx, 1); render(); };
    });

    /* Add Certification */
    const addCertBtn = document.getElementById('addCertBtn');
    const addCertForm = document.getElementById('addCertForm');
    if (addCertBtn) addCertBtn.onclick = () => addCertForm.style.display = addCertForm.style.display === 'none' ? 'block' : 'none';
    const cancelCert = document.getElementById('cancelAddCert');
    if (cancelCert) cancelCert.onclick = () => addCertForm.style.display = 'none';
    const saveCert = document.getElementById('saveAddCert');
    if (saveCert) saveCert.onclick = () => {
      const n = document.getElementById('newCertName').value.trim();
      if (!n) return;
      profile.certifications.push({ id: nextCertId++, name: n, issuer: document.getElementById('newCertIssuer').value.trim() || '', year: document.getElementById('newCertYear').value.trim() || '' });
      render();
    };

    /* Remove experience / education / certification */
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.onclick = () => {
        const type = btn.dataset.type;
        const id = +btn.dataset.id;
        if (type === 'exp') profile.experience = profile.experience.filter(e => e.id !== id);
        else if (type === 'edu') profile.education = profile.education.filter(e => e.id !== id);
        else if (type === 'cert') profile.certifications = profile.certifications.filter(c => c.id !== id);
        render();
      };
    });
  }

  render();
  page.appendChild(main);
  return page;
});
