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
      { id:1, lang:'Khmer', level:'Native', pct:100 },
      { id:2, lang:'English', level:'Fluent', pct:85 },
    ],
    certifications: [
      { id:1, name:'Customer Success Fundamentals', issuer:'Coursera', year:'2023' },
    ],
    documents: [
      { name:'Sokha_Rith_CV.pdf', size:'2.4 MB', date:'Mar 2026' },
      { name:'Cover_Letter.pdf', size:'890 KB', date:'Mar 2026' },
    ],
  };

  let nextExpId = 3, nextEduId = 2, nextCertId = 2, nextLangId = 3;
  let editingExpId = null, editingEduId = null, editingCertId = null, editingLangId = null;

  const cvTemplates = [
    { id: 'professional', name: 'Professional', desc: 'Classic layout with Metfone red header', color: '#ED1C24' },
    { id: 'modern', name: 'Modern', desc: 'Two-column teal accent design', color: '#00A79D' },
    { id: 'minimal', name: 'Minimal', desc: 'Clean, simple typography', color: '#2D2D2D' },
  ];

  const main = el('div', { className: 'main-content' });

  function render() {
    const completeness = calcCompleteness();
    main.innerHTML = `${bgOrbs()}
    <div style="max-width:860px;margin:0 auto">
      <!-- Profile Header -->
      <div class="card" style="display:flex;align-items:center;gap:16px;padding:20px 24px;margin-bottom:20px">
        <div class="avatar avatar-lg" style="background:#FDE8E8;color:#ED1C24;font-weight:700;font-size:18px;flex-shrink:0">${profile.initials}</div>
        <div style="flex:1;min-width:0">
          <div id="headerDisplay">
            <div style="display:flex;align-items:center;gap:8px">
              <h1 style="font-family:var(--font-display);font-size:20px;font-weight:800;margin-bottom:2px">${profile.name}</h1>
              <button id="editHeaderBtn" style="font-size:11px;color:var(--red);background:none;border:none;cursor:pointer;font-weight:600">Edit</button>
            </div>
            <p style="font-size:12px;color:var(--text-tertiary)">${profile.location}</p>
          </div>
          <div id="headerEdit" style="display:none">
            <div style="display:flex;gap:8px;margin-bottom:6px;flex-wrap:wrap">
              <div style="flex:1;min-width:120px"><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:2px">Full Name</label><input id="editName" value="${profile.name}" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)"></div>
              <div style="width:70px"><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:2px">Initials</label><input id="editInitials" value="${profile.initials}" maxlength="3" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg);text-align:center"></div>
            </div>
            <div style="display:flex;gap:6px;justify-content:flex-end">
              <button id="cancelHeaderEdit" class="btn-glass" style="padding:5px 12px;font-size:11px">Cancel</button>
              <button id="saveHeaderEdit" class="btn-dark" style="padding:5px 12px;font-size:11px">Save</button>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:8px">
            <div style="flex:1;max-width:140px;height:5px;border-radius:3px;background:var(--border)"><div style="height:100%;width:${completeness}%;border-radius:3px;background:linear-gradient(90deg,var(--teal),var(--mint))"></div></div>
            <span style="font-size:11px;color:var(--text-tertiary)">${completeness}%</span>
          </div>
        </div>
        <button class="btn-outline-red" style="padding:8px 16px;font-size:12px" onclick="logout()">Sign Out</button>
      </div>

      <!-- CV Upload -->
      <div id="cvSection" class="card" style="display:flex;align-items:center;gap:14px;padding:16px 20px;margin-bottom:20px;position:relative">
        <div style="width:40px;height:40px;border-radius:12px;background:rgba(0,167,157,0.08);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">📄</div>
        <div style="flex:1;min-width:0">
          <p style="font-size:13px;font-weight:600">Upload or Update CV</p>
          <p style="font-size:11px;color:var(--text-tertiary)">AI auto-extracts your experience, skills & education</p>
        </div>
        <input type="file" id="cvFileInput" accept=".pdf,.doc,.docx" style="display:none">
        <button id="cvUploadBtn" class="btn-dark" style="padding:8px 18px;font-size:12px;flex-shrink:0">Choose File</button>
        <div id="cvExtracting" style="display:none;position:absolute;inset:0;background:var(--glass-bg);backdrop-filter:blur(8px);border-radius:inherit;display:none;align-items:center;justify-content:center;gap:10px">
          <div style="width:18px;height:18px;border:2px solid var(--border);border-top-color:var(--teal);border-radius:50%;animation:spin 1s linear infinite"></div>
          <span style="font-size:12px;font-weight:600;color:var(--red)">Extracting…</span>
        </div>
        <div id="cvSuccess" style="display:none;position:absolute;inset:0;background:var(--glass-bg);backdrop-filter:blur(8px);border-radius:inherit;align-items:center;justify-content:center;padding:0 20px">
          <p id="cvExtractSummary" style="font-size:12px;color:var(--teal);font-weight:600;text-align:center"></p>
        </div>
      </div>

      <!-- Documents -->
      ${profile.documents.length ? `
      <div style="display:flex;gap:10px;margin-bottom:20px;overflow-x:auto;-webkit-overflow-scrolling:touch">
        ${profile.documents.map((d, i) => `
          <div class="card" style="display:flex;align-items:center;gap:10px;padding:12px 16px;min-width:200px;flex-shrink:0">
            <span style="font-size:16px">📎</span>
            <div style="flex:1;min-width:0">
              <p style="font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d.name}</p>
              <p style="font-size:10px;color:var(--text-tertiary)">${d.size} · ${d.date}</p>
            </div>
            <button class="remove-doc" data-idx="${i}" style="background:none;border:none;font-size:11px;cursor:pointer;color:var(--text-tertiary);padding:2px;line-height:1">✕</button>
          </div>`).join('')}
      </div>` : ''}

      <!-- CV Templates -->
      <div class="card" style="padding:20px 22px;margin-bottom:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <div>
            <h3 style="font-size:11px;font-weight:700;color:var(--text-tertiary);letter-spacing:0.8px">CREATE YOUR CV</h3>
            <p style="font-size:11px;color:var(--text-tertiary);margin-top:2px">Choose a template and generate from your profile</p>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
          ${cvTemplates.map(t => `
            <button class="cv-tpl-btn card" data-tpl="${t.id}" style="padding:0;border:2px solid transparent;cursor:pointer;text-align:left;overflow:hidden;transition:all 0.3s cubic-bezier(0.25,0.1,0.25,1)">
              <div style="height:80px;background:${t.color};position:relative;display:flex;align-items:center;justify-content:center">
                <div style="width:46px;height:58px;background:white;border-radius:3px;box-shadow:0 2px 8px rgba(0,0,0,0.15);padding:5px">
                  <div style="width:100%;height:3px;background:${t.color};border-radius:1px;margin-bottom:3px"></div>
                  <div style="width:65%;height:2px;background:#ddd;border-radius:1px;margin-bottom:2px"></div>
                  <div style="width:85%;height:1.5px;background:#eee;border-radius:1px;margin-bottom:2px"></div>
                  <div style="width:75%;height:1.5px;background:#eee;border-radius:1px;margin-bottom:2px"></div>
                  <div style="width:50%;height:1.5px;background:#eee;border-radius:1px;margin-bottom:3px"></div>
                  <div style="width:45%;height:2px;background:#ddd;border-radius:1px;margin-bottom:2px"></div>
                  <div style="width:80%;height:1.5px;background:#eee;border-radius:1px;margin-bottom:2px"></div>
                  <div style="width:70%;height:1.5px;background:#eee;border-radius:1px"></div>
                </div>
              </div>
              <div style="padding:10px 12px">
                <p style="font-size:12px;font-weight:700">${t.name}</p>
                <p style="font-size:10px;color:var(--text-tertiary)">${t.desc}</p>
              </div>
            </button>`).join('')}
        </div>
      </div>

      <!-- About -->
      <div class="card" style="padding:18px 22px;margin-bottom:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <h3 style="font-size:11px;font-weight:700;color:var(--text-tertiary);letter-spacing:0.8px">ABOUT</h3>
          <button class="edit-section-btn" data-section="about" style="font-size:11px;color:var(--red);background:none;border:none;cursor:pointer;font-weight:600">Edit</button>
        </div>
        <div id="aboutDisplay"><p style="font-size:13px;color:var(--text-secondary);line-height:1.6">${profile.about}</p></div>
        <div id="aboutEdit" style="display:none">
          <textarea id="aboutInput" style="width:100%;min-height:70px;border:1px solid var(--border);border-radius:10px;padding:10px;font-size:13px;font-family:inherit;resize:vertical;background:var(--glass-bg)">${profile.about}</textarea>
          <div style="display:flex;gap:8px;margin-top:8px;justify-content:flex-end">
            <button class="btn-glass cancel-edit" data-section="about" style="padding:6px 14px;font-size:11px">Cancel</button>
            <button class="btn-dark save-edit" data-section="about" style="padding:6px 14px;font-size:11px">Save</button>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <div class="card" style="padding:18px 22px;margin-bottom:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <h3 style="font-size:11px;font-weight:700;color:var(--text-tertiary);letter-spacing:0.8px">CONTACT</h3>
          <button class="edit-section-btn" data-section="contact" style="font-size:11px;color:var(--red);background:none;border:none;cursor:pointer;font-weight:600">Edit</button>
        </div>
        <div id="contactDisplay">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            ${[
              { icon:'📱', label:'Phone', value: profile.phone },
              { icon:'✉️', label:'Email', value: profile.email },
              { icon:'📍', label:'Location', value: profile.location },
              { icon:'🌐', label:'LinkedIn', value: profile.linkedin },
            ].map(c => `<div style="display:flex;gap:8px;align-items:center"><span style="font-size:14px">${c.icon}</span><div><p style="font-size:10px;color:var(--text-tertiary)">${c.label}</p><p style="font-size:13px;font-weight:500">${c.value}</p></div></div>`).join('')}
          </div>
        </div>
        <div id="contactEdit" style="display:none">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:3px">Phone</label><input id="editPhone" value="${profile.phone}" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
            <div><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:3px">Email</label><input id="editEmail" value="${profile.email}" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
            <div><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:3px">Location</label><input id="editLocation" value="${profile.location}" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
            <div><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:3px">LinkedIn</label><input id="editLinkedin" value="${profile.linkedin}" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:10px;font-size:12px;background:var(--glass-bg)"></div>
          </div>
          <div style="display:flex;gap:8px;margin-top:10px;justify-content:flex-end">
            <button class="btn-glass cancel-edit" data-section="contact" style="padding:6px 14px;font-size:11px">Cancel</button>
            <button class="btn-dark save-edit" data-section="contact" style="padding:6px 14px;font-size:11px">Save</button>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div class="card" style="padding:18px 22px;margin-bottom:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <h3 style="font-size:11px;font-weight:700;color:var(--text-tertiary);letter-spacing:0.8px">EXPERIENCE</h3>
          <button id="addExpBtn" style="font-size:11px;color:var(--red);background:none;border:none;cursor:pointer;font-weight:600">+ Add</button>
        </div>
        <div id="addExpForm" style="display:none;margin-bottom:14px;padding:14px;border:1px dashed var(--teal);border-radius:12px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
            <div><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:2px">Title *</label><input id="newExpTitle" placeholder="e.g. Software Engineer" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)"></div>
            <div><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:2px">Company *</label><input id="newExpCompany" placeholder="e.g. Metfone" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)"></div>
            <div><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:2px">From</label><input id="newExpFrom" placeholder="Jan 2023" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)"></div>
            <div><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:2px">To</label><input id="newExpTo" placeholder="Present" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)"></div>
          </div>
          <div><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:2px">Description</label><textarea id="newExpDesc" rows="2" placeholder="Key responsibilities…" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;font-family:inherit;resize:vertical;background:var(--glass-bg)"></textarea></div>
          <div style="display:flex;gap:8px;margin-top:8px;justify-content:flex-end">
            <button id="cancelAddExp" class="btn-glass" style="padding:5px 12px;font-size:11px">Cancel</button>
            <button id="saveAddExp" class="btn-dark" style="padding:5px 12px;font-size:11px">Add</button>
          </div>
        </div>
        ${profile.experience.map(w => `
          <div style="display:flex;gap:12px;${profile.experience.indexOf(w) < profile.experience.length - 1 ? 'margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid var(--border)' : ''}">
            <div style="width:32px;height:32px;border-radius:8px;background:#FDE8E8;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px">${logoHTML('sm')}</div>
            <div style="flex:1;min-width:0">
              <p style="font-size:13px;font-weight:600">${w.title}</p>
              <p style="font-size:11px;color:var(--text-tertiary);margin-bottom:3px">${w.company} · ${w.from} – ${w.to}</p>
              ${w.desc ? `<p style="font-size:12px;color:var(--text-secondary);line-height:1.5">${w.desc}</p>` : ''}
            </div>
            <div style="display:flex;gap:2px;align-self:flex-start;flex-shrink:0">
              <button class="edit-item" data-type="exp" data-id="${w.id}" style="background:none;border:none;font-size:11px;cursor:pointer;color:var(--teal);padding:2px" title="Edit">✎</button>
              <button class="remove-item" data-type="exp" data-id="${w.id}" style="background:none;border:none;font-size:12px;cursor:pointer;color:var(--text-tertiary);padding:2px">✕</button>
            </div>
          </div>`).join('')}
      </div>

      <!-- Education -->
      <div class="card" style="padding:18px 22px;margin-bottom:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <h3 style="font-size:11px;font-weight:700;color:var(--text-tertiary);letter-spacing:0.8px">EDUCATION</h3>
          <button id="addEduBtn" style="font-size:11px;color:var(--red);background:none;border:none;cursor:pointer;font-weight:600">+ Add</button>
        </div>
        <div id="addEduForm" style="display:none;margin-bottom:14px;padding:14px;border:1px dashed var(--teal);border-radius:12px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
            <div style="grid-column:span 2"><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:2px">Degree *</label><input id="newEduDegree" placeholder="e.g. B.Sc. Computer Science" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)"></div>
            <div><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:2px">School *</label><input id="newEduSchool" placeholder="e.g. RUPP" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)"></div>
            <div style="display:flex;gap:6px">
              <div style="flex:1"><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:2px">From</label><input id="newEduFrom" placeholder="2018" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)"></div>
              <div style="flex:1"><label style="font-size:10px;color:var(--text-tertiary);display:block;margin-bottom:2px">To</label><input id="newEduTo" placeholder="2022" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)"></div>
            </div>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end">
            <button id="cancelAddEdu" class="btn-glass" style="padding:5px 12px;font-size:11px">Cancel</button>
            <button id="saveAddEdu" class="btn-dark" style="padding:5px 12px;font-size:11px">Add</button>
          </div>
        </div>
        ${profile.education.map(e => `
          <div style="display:flex;gap:12px;${profile.education.indexOf(e) < profile.education.length - 1 ? 'margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--border)' : ''}">
            <div style="width:32px;height:32px;border-radius:8px;background:#F0F9F8;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">🎓</div>
            <div style="flex:1;min-width:0">
              <p style="font-size:13px;font-weight:600">${e.degree}</p>
              <p style="font-size:11px;color:var(--text-tertiary)">${e.school} · ${e.from} – ${e.to}</p>
            </div>
            <div style="display:flex;gap:2px;align-self:flex-start;flex-shrink:0">
              <button class="edit-item" data-type="edu" data-id="${e.id}" style="background:none;border:none;font-size:11px;cursor:pointer;color:var(--teal);padding:2px" title="Edit">✎</button>
              <button class="remove-item" data-type="edu" data-id="${e.id}" style="background:none;border:none;font-size:12px;cursor:pointer;color:var(--text-tertiary);padding:2px">✕</button>
            </div>
          </div>`).join('')}
      </div>

      <!-- Skills -->
      <div class="card" style="padding:18px 22px;margin-bottom:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <h3 style="font-size:11px;font-weight:700;color:var(--text-tertiary);letter-spacing:0.8px">SKILLS</h3>
          <button id="addSkillBtn" style="font-size:11px;color:var(--red);background:none;border:none;cursor:pointer;font-weight:600">+ Add</button>
        </div>
        <div id="addSkillForm" style="display:none;margin-bottom:10px">
          <div style="display:flex;gap:6px;align-items:center">
            <input id="newSkillInput" placeholder="Type a skill…" style="flex:1;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)">
            <button id="saveAddSkill" class="btn-dark" style="padding:5px 12px;font-size:11px">Add</button>
            <button id="cancelAddSkill" class="btn-glass" style="padding:5px 12px;font-size:11px">Cancel</button>
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${profile.skills.map((s,i) => `<span class="badge badge-gray" style="display:inline-flex;align-items:center;gap:5px;font-size:11px">${s}<button class="remove-skill" data-idx="${i}" style="background:none;border:none;font-size:11px;cursor:pointer;color:var(--text-tertiary);padding:0;line-height:1">✕</button></span>`).join('')}
        </div>
      </div>

      <!-- Certifications + Languages row -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
        <!-- Certifications -->
        <div class="card" style="padding:18px 22px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <h3 style="font-size:11px;font-weight:700;color:var(--text-tertiary);letter-spacing:0.8px">CERTIFICATIONS</h3>
            <button id="addCertBtn" style="font-size:11px;color:var(--red);background:none;border:none;cursor:pointer;font-weight:600">+ Add</button>
          </div>
          <div id="addCertForm" style="display:none;margin-bottom:12px;padding:12px;border:1px dashed var(--teal);border-radius:10px">
            <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:6px">
              <input id="newCertName" placeholder="Certification name *" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)">
              <div style="display:flex;gap:6px">
                <input id="newCertIssuer" placeholder="Issuer" style="flex:1;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)">
                <input id="newCertYear" placeholder="Year" style="width:70px;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)">
              </div>
            </div>
            <div style="display:flex;gap:6px;justify-content:flex-end">
              <button id="cancelAddCert" class="btn-glass" style="padding:5px 10px;font-size:11px">Cancel</button>
              <button id="saveAddCert" class="btn-dark" style="padding:5px 10px;font-size:11px">Add</button>
            </div>
          </div>
          ${profile.certifications.map(c => `
            <div style="display:flex;gap:10px;${profile.certifications.indexOf(c) < profile.certifications.length - 1 ? 'margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid var(--border)' : ''}">
              <span style="font-size:14px;margin-top:1px">🏅</span>
              <div style="flex:1;min-width:0">
                <p style="font-size:12px;font-weight:600">${c.name}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${c.issuer}${c.year ? ' · ' + c.year : ''}</p>
              </div>
              <div style="display:flex;gap:2px;align-self:flex-start;flex-shrink:0">
                <button class="edit-item" data-type="cert" data-id="${c.id}" style="background:none;border:none;font-size:10px;cursor:pointer;color:var(--teal);padding:2px" title="Edit">✎</button>
                <button class="remove-item" data-type="cert" data-id="${c.id}" style="background:none;border:none;font-size:11px;cursor:pointer;color:var(--text-tertiary);padding:2px">✕</button>
              </div>
            </div>`).join('')}
        </div>

        <!-- Languages -->
        <div class="card" style="padding:18px 22px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <h3 style="font-size:11px;font-weight:700;color:var(--text-tertiary);letter-spacing:0.8px">LANGUAGES</h3>
            <button id="addLangBtn" style="font-size:11px;color:var(--red);background:none;border:none;cursor:pointer;font-weight:600">+ Add</button>
          </div>
          <div id="addLangForm" style="display:none;margin-bottom:12px;padding:12px;border:1px dashed var(--teal);border-radius:10px">
            <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:6px">
              <input id="newLangName" placeholder="Language *" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)">
              <div style="display:flex;gap:6px">
                <select id="newLangLevel" style="flex:1;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg)">
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Fluent" selected>Fluent</option>
                  <option value="Native">Native</option>
                </select>
                <input id="newLangPct" type="number" min="10" max="100" value="70" placeholder="%" style="width:60px;padding:7px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--glass-bg);text-align:center">
              </div>
            </div>
            <div style="display:flex;gap:6px;justify-content:flex-end">
              <button id="cancelAddLang" class="btn-glass" style="padding:5px 10px;font-size:11px">Cancel</button>
              <button id="saveAddLang" class="btn-dark" style="padding:5px 10px;font-size:11px">Add</button>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${profile.languages.map(l => `
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
                  <span style="font-size:12px;font-weight:600">${l.lang}</span>
                  <div style="display:flex;align-items:center;gap:6px">
                    <span style="font-size:10px;color:var(--text-tertiary)">${l.level}</span>
                    <button class="edit-item" data-type="lang" data-id="${l.id}" style="background:none;border:none;font-size:10px;cursor:pointer;color:var(--teal);padding:0;line-height:1" title="Edit">✎</button>
                    <button class="remove-item" data-type="lang" data-id="${l.id}" style="background:none;border:none;font-size:11px;cursor:pointer;color:var(--text-tertiary);padding:0;line-height:1">✕</button>
                  </div>
                </div>
                <div style="height:5px;border-radius:3px;background:var(--border)"><div style="height:100%;width:${l.pct}%;border-radius:3px;background:var(--teal)"></div></div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;

    /* Bind events – defer until main is in the DOM (Router appends after render returns) */
    if (main.isConnected) {
      bindEvents();
    } else {
      new MutationObserver(function(_, obs) {
        if (main.isConnected) { obs.disconnect(); bindEvents(); }
      }).observe(document.documentElement, { childList: true, subtree: true });
    }
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
        document.getElementById('cvExtracting').style.display = 'flex';
        /* Simulate AI extraction */
        setTimeout(() => {
          profile.experience.push({ id: nextExpId++, title:'Project Coordinator', company:'Cellcard', from:'Mar 2020', to:'May 2021', desc:'Coordinated cross-functional projects, managed timelines, and stakeholder communications.' });
          profile.education.push({ id: nextEduId++, degree:'Diploma in Project Management', school:'National Institute of Management', from:'2019', to:'2020' });
          profile.certifications.push({ id: nextCertId++, name:'Google Project Management Certificate', issuer:'Google / Coursera', year:'2024' });
          ['Project Management','Stakeholder Communication','Agile Methodology','Risk Assessment'].forEach(s => {
            if (!profile.skills.includes(s)) profile.skills.push(s);
          });
          profile.languages.push({ id: nextLangId++, lang:'Chinese', level:'Basic', pct:30 });
          profile.documents.unshift({ name: file.name, size: (file.size / 1024 / 1024).toFixed(1) + ' MB', date: 'Apr 2026' });
          document.getElementById('cvExtracting').style.display = 'none';
          document.getElementById('cvSuccess').style.display = 'flex';
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
    if (addExpBtn) addExpBtn.onclick = () => {
      editingExpId = null;
      addExpForm.style.display = addExpForm.style.display === 'none' ? 'block' : 'none';
      if (addExpForm.style.display === 'block') {
        document.getElementById('newExpTitle').value = '';
        document.getElementById('newExpCompany').value = '';
        document.getElementById('newExpFrom').value = '';
        document.getElementById('newExpTo').value = '';
        document.getElementById('newExpDesc').value = '';
        document.getElementById('saveAddExp').textContent = 'Add';
      }
    };
    const cancelExp = document.getElementById('cancelAddExp');
    if (cancelExp) cancelExp.onclick = () => { editingExpId = null; addExpForm.style.display = 'none'; };
    const saveExp = document.getElementById('saveAddExp');
    if (saveExp) saveExp.onclick = () => {
      const t = document.getElementById('newExpTitle').value.trim();
      const c = document.getElementById('newExpCompany').value.trim();
      if (!t || !c) return;
      if (editingExpId) {
        const item = profile.experience.find(e => e.id === editingExpId);
        if (item) { item.title = t; item.company = c; item.from = document.getElementById('newExpFrom').value.trim() || 'N/A'; item.to = document.getElementById('newExpTo').value.trim() || 'Present'; item.desc = document.getElementById('newExpDesc').value.trim(); }
        editingExpId = null;
      } else {
        profile.experience.unshift({ id: nextExpId++, title: t, company: c, from: document.getElementById('newExpFrom').value.trim() || 'N/A', to: document.getElementById('newExpTo').value.trim() || 'Present', desc: document.getElementById('newExpDesc').value.trim() });
      }
      render();
    };

    /* Add Education */
    const addEduBtn = document.getElementById('addEduBtn');
    const addEduForm = document.getElementById('addEduForm');
    if (addEduBtn) addEduBtn.onclick = () => {
      editingEduId = null;
      addEduForm.style.display = addEduForm.style.display === 'none' ? 'block' : 'none';
      if (addEduForm.style.display === 'block') {
        document.getElementById('newEduDegree').value = '';
        document.getElementById('newEduSchool').value = '';
        document.getElementById('newEduFrom').value = '';
        document.getElementById('newEduTo').value = '';
        document.getElementById('saveAddEdu').textContent = 'Add';
      }
    };
    const cancelEdu = document.getElementById('cancelAddEdu');
    if (cancelEdu) cancelEdu.onclick = () => { editingEduId = null; addEduForm.style.display = 'none'; };
    const saveEdu = document.getElementById('saveAddEdu');
    if (saveEdu) saveEdu.onclick = () => {
      const d = document.getElementById('newEduDegree').value.trim();
      const s = document.getElementById('newEduSchool').value.trim();
      if (!d || !s) return;
      if (editingEduId) {
        const item = profile.education.find(e => e.id === editingEduId);
        if (item) { item.degree = d; item.school = s; item.from = document.getElementById('newEduFrom').value.trim() || ''; item.to = document.getElementById('newEduTo').value.trim() || ''; }
        editingEduId = null;
      } else {
        profile.education.unshift({ id: nextEduId++, degree: d, school: s, from: document.getElementById('newEduFrom').value.trim() || '', to: document.getElementById('newEduTo').value.trim() || '' });
      }
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
    if (addCertBtn) addCertBtn.onclick = () => {
      editingCertId = null;
      addCertForm.style.display = addCertForm.style.display === 'none' ? 'block' : 'none';
      if (addCertForm.style.display === 'block') {
        document.getElementById('newCertName').value = '';
        document.getElementById('newCertIssuer').value = '';
        document.getElementById('newCertYear').value = '';
        document.getElementById('saveAddCert').textContent = 'Add';
      }
    };
    const cancelCert = document.getElementById('cancelAddCert');
    if (cancelCert) cancelCert.onclick = () => { editingCertId = null; addCertForm.style.display = 'none'; };
    const saveCert = document.getElementById('saveAddCert');
    if (saveCert) saveCert.onclick = () => {
      const n = document.getElementById('newCertName').value.trim();
      if (!n) return;
      if (editingCertId) {
        const item = profile.certifications.find(c => c.id === editingCertId);
        if (item) { item.name = n; item.issuer = document.getElementById('newCertIssuer').value.trim() || ''; item.year = document.getElementById('newCertYear').value.trim() || ''; }
        editingCertId = null;
      } else {
        profile.certifications.push({ id: nextCertId++, name: n, issuer: document.getElementById('newCertIssuer').value.trim() || '', year: document.getElementById('newCertYear').value.trim() || '' });
      }
      render();
    };

    /* Remove experience / education / certification / language */
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.onclick = () => {
        const type = btn.dataset.type;
        const id = +btn.dataset.id;
        if (type === 'exp') profile.experience = profile.experience.filter(e => e.id !== id);
        else if (type === 'edu') profile.education = profile.education.filter(e => e.id !== id);
        else if (type === 'cert') profile.certifications = profile.certifications.filter(c => c.id !== id);
        else if (type === 'lang') profile.languages = profile.languages.filter(l => l.id !== id);
        render();
      };
    });

    /* Edit Profile Header (name / initials) */
    const editHeaderBtn = document.getElementById('editHeaderBtn');
    if (editHeaderBtn) editHeaderBtn.onclick = () => {
      document.getElementById('headerDisplay').style.display = 'none';
      document.getElementById('headerEdit').style.display = 'block';
    };
    const cancelHeader = document.getElementById('cancelHeaderEdit');
    if (cancelHeader) cancelHeader.onclick = () => {
      document.getElementById('headerDisplay').style.display = '';
      document.getElementById('headerEdit').style.display = 'none';
    };
    const saveHeader = document.getElementById('saveHeaderEdit');
    if (saveHeader) saveHeader.onclick = () => {
      const n = document.getElementById('editName').value.trim();
      const i = document.getElementById('editInitials').value.trim();
      if (n) profile.name = n;
      if (i) profile.initials = i;
      render();
    };

    /* Add Language */
    const addLangBtn = document.getElementById('addLangBtn');
    const addLangForm = document.getElementById('addLangForm');
    if (addLangBtn) addLangBtn.onclick = () => {
      editingLangId = null;
      addLangForm.style.display = addLangForm.style.display === 'none' ? 'block' : 'none';
      if (addLangForm.style.display === 'block') {
        document.getElementById('newLangName').value = '';
        document.getElementById('newLangLevel').value = 'Fluent';
        document.getElementById('newLangPct').value = '70';
        document.getElementById('saveAddLang').textContent = 'Add';
      }
    };
    const cancelLang = document.getElementById('cancelAddLang');
    if (cancelLang) cancelLang.onclick = () => { editingLangId = null; addLangForm.style.display = 'none'; };
    const saveLang = document.getElementById('saveAddLang');
    if (saveLang) saveLang.onclick = () => {
      const name = document.getElementById('newLangName').value.trim();
      if (!name) return;
      const level = document.getElementById('newLangLevel').value;
      const pct = Math.min(100, Math.max(10, +document.getElementById('newLangPct').value || 70));
      if (editingLangId) {
        const item = profile.languages.find(l => l.id === editingLangId);
        if (item) { item.lang = name; item.level = level; item.pct = pct; }
        editingLangId = null;
      } else {
        profile.languages.push({ id: nextLangId++, lang: name, level: level, pct: pct });
      }
      render();
    };

    /* Remove document */
    document.querySelectorAll('.remove-doc').forEach(btn => {
      btn.onclick = (e) => { e.stopPropagation(); profile.documents.splice(+btn.dataset.idx, 1); render(); };
    });

    /* Edit existing items (experience, education, certification, language) */
    document.querySelectorAll('.edit-item').forEach(btn => {
      btn.onclick = () => {
        const type = btn.dataset.type;
        const id = +btn.dataset.id;
        if (type === 'exp') {
          editingExpId = id;
          const item = profile.experience.find(e => e.id === id);
          if (!item) return;
          const form = document.getElementById('addExpForm');
          form.style.display = 'block';
          document.getElementById('newExpTitle').value = item.title;
          document.getElementById('newExpCompany').value = item.company;
          document.getElementById('newExpFrom').value = item.from;
          document.getElementById('newExpTo').value = item.to;
          document.getElementById('newExpDesc').value = item.desc || '';
          document.getElementById('saveAddExp').textContent = 'Update';
          form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (type === 'edu') {
          editingEduId = id;
          const item = profile.education.find(e => e.id === id);
          if (!item) return;
          const form = document.getElementById('addEduForm');
          form.style.display = 'block';
          document.getElementById('newEduDegree').value = item.degree;
          document.getElementById('newEduSchool').value = item.school;
          document.getElementById('newEduFrom').value = item.from;
          document.getElementById('newEduTo').value = item.to;
          document.getElementById('saveAddEdu').textContent = 'Update';
          form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (type === 'cert') {
          editingCertId = id;
          const item = profile.certifications.find(c => c.id === id);
          if (!item) return;
          const form = document.getElementById('addCertForm');
          form.style.display = 'block';
          document.getElementById('newCertName').value = item.name;
          document.getElementById('newCertIssuer').value = item.issuer || '';
          document.getElementById('newCertYear').value = item.year || '';
          document.getElementById('saveAddCert').textContent = 'Update';
          form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (type === 'lang') {
          editingLangId = id;
          const item = profile.languages.find(l => l.id === id);
          if (!item) return;
          const form = document.getElementById('addLangForm');
          form.style.display = 'block';
          document.getElementById('newLangName').value = item.lang;
          document.getElementById('newLangLevel').value = item.level;
          document.getElementById('newLangPct').value = item.pct;
          document.getElementById('saveAddLang').textContent = 'Update';
          form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      };
    });

    /* CV Template buttons */
    document.querySelectorAll('.cv-tpl-btn').forEach(btn => {
      btn.onclick = () => openCVPreview(btn.dataset.tpl);
    });
  }

  /* ── CV Builder Modal (full editor + live preview) ── */
  let cvPhotoUrl = null;
  let cvDraft = {};

  function openCVPreview(templateId) {
    const existing = document.getElementById('cvPreviewModal');
    if (existing) existing.remove();

    const tpl = cvTemplates.find(t => t.id === templateId);

    /* Deep-clone profile into a draft the user can edit freely */
    cvDraft = {
      name: profile.name,
      initials: profile.initials,
      location: profile.location,
      phone: profile.phone,
      email: profile.email,
      linkedin: profile.linkedin,
      about: profile.about,
      jobTitle: '',
      experience: profile.experience.map(e => ({...e})),
      education: profile.education.map(e => ({...e})),
      skills: [...profile.skills],
      certifications: profile.certifications.map(c => ({...c})),
      languages: profile.languages.map(l => ({...l})),
    };

    const overlay = document.createElement('div');
    overlay.id = 'cvPreviewModal';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,0.5);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn 0.25s ease';
    overlay.innerHTML = buildCVEditorHTML(templateId, tpl);
    document.body.appendChild(overlay);
    refreshCVPreview(templateId);
    bindCVEditorEvents(overlay, templateId, tpl);
  }

  function buildCVEditorHTML(templateId, tpl) {
    const inputStyle = 'width:100%;padding:7px 10px;border:1px solid #e0e0e0;border-radius:8px;font-size:12px;background:#fafafa;outline:none;transition:border 0.2s';
    const labelStyle = 'font-size:10px;font-weight:600;color:#888;display:block;margin-bottom:3px;letter-spacing:0.3px';
    const sectionHead = (title) => `<div style="font-size:10px;font-weight:700;color:#999;letter-spacing:0.8px;margin:16px 0 8px 0;padding-bottom:4px;border-bottom:1px solid #f0f0f0">${title}</div>`;

    return `
    <div style="width:100%;max-width:1100px;max-height:94vh;background:white;border-radius:16px;box-shadow:0 25px 60px rgba(0,0,0,0.3);display:flex;flex-direction:column;overflow:hidden">
      <!-- Header -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid #eee;flex-shrink:0">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:8px;height:8px;border-radius:50%;background:${tpl.color}"></div>
          <h3 style="font-size:15px;font-weight:700;color:#1a1a1a">CV Builder — ${tpl.name}</h3>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <select id="cvTplSwitch" style="padding:6px 10px;font-size:11px;border:1px solid #e0e0e0;border-radius:8px;background:#fafafa;cursor:pointer">
            ${cvTemplates.map(t => `<option value="${t.id}" ${t.id === templateId ? 'selected' : ''}>${t.name}</option>`).join('')}
          </select>
          <button id="printCV" style="display:inline-flex;align-items:center;gap:4px;padding:7px 14px;font-size:11px;font-weight:600;background:#fafafa;border:1px solid #e0e0e0;border-radius:8px;cursor:pointer">🖨 Print</button>
          <button id="downloadCV" style="display:inline-flex;align-items:center;gap:4px;padding:7px 14px;font-size:11px;font-weight:600;background:${tpl.color};color:white;border:none;border-radius:8px;cursor:pointer">⬇ Download</button>
          <button id="closeCVModal" style="background:none;border:none;font-size:22px;cursor:pointer;color:#999;padding:4px;line-height:1">&times;</button>
        </div>
      </div>
      <!-- Body: Editor + Preview -->
      <div style="display:flex;flex:1;overflow:hidden">
        <!-- Left: Editor Panel -->
        <div id="cvEditorPanel" style="width:340px;flex-shrink:0;overflow-y:auto;padding:16px 18px;border-right:1px solid #eee;background:#fafafa">
          <!-- Photo -->
          <div style="text-align:center;margin-bottom:12px">
            <div id="cvPhotoPreview" style="width:90px;height:90px;border-radius:50%;background:#f0f0f0;margin:0 auto 8px;overflow:hidden;display:flex;align-items:center;justify-content:center;border:3px solid #e0e0e0;cursor:pointer;position:relative" title="Click to upload photo">
              ${cvPhotoUrl ? `<img src="${cvPhotoUrl}" style="width:100%;height:100%;object-fit:cover">` : `<span style="font-size:28px;color:#ccc">📷</span>`}
            </div>
            <input type="file" id="cvPhotoInput" accept="image/*" style="display:none">
            <button id="cvPhotoBtn" style="font-size:10px;color:${tpl.color};background:none;border:none;cursor:pointer;font-weight:600">${cvPhotoUrl ? 'Change Photo' : 'Upload Photo'}</button>
            ${cvPhotoUrl ? `<button id="cvPhotoRemove" style="font-size:10px;color:#999;background:none;border:none;cursor:pointer;margin-left:6px">Remove</button>` : ''}
          </div>

          ${sectionHead('PERSONAL INFO')}
          <div style="display:flex;flex-direction:column;gap:8px">
            <div><label style="${labelStyle}">Full Name</label><input id="cvName" value="${cvDraft.name}" style="${inputStyle}"></div>
            <div><label style="${labelStyle}">Job Title / Headline</label><input id="cvJobTitle" value="${cvDraft.jobTitle}" placeholder="e.g. Customer Service Specialist" style="${inputStyle}"></div>
            <div><label style="${labelStyle}">Location</label><input id="cvLocation" value="${cvDraft.location}" style="${inputStyle}"></div>
            <div style="display:flex;gap:6px">
              <div style="flex:1"><label style="${labelStyle}">Phone</label><input id="cvPhone" value="${cvDraft.phone}" style="${inputStyle}"></div>
              <div style="flex:1"><label style="${labelStyle}">Email</label><input id="cvEmail" value="${cvDraft.email}" style="${inputStyle}"></div>
            </div>
            <div><label style="${labelStyle}">LinkedIn</label><input id="cvLinkedin" value="${cvDraft.linkedin}" style="${inputStyle}"></div>
          </div>

          ${sectionHead('SUMMARY')}
          <textarea id="cvAbout" rows="3" style="${inputStyle};resize:vertical;font-family:inherit">${cvDraft.about}</textarea>

          ${sectionHead('EXPERIENCE')}
          <div id="cvExpList">
            ${cvDraft.experience.map((e, i) => `
            <div class="cv-exp-item" data-idx="${i}" style="padding:8px 10px;background:white;border:1px solid #eee;border-radius:8px;margin-bottom:6px">
              <div style="display:flex;justify-content:space-between;align-items:start">
                <div style="flex:1;min-width:0">
                  <p style="font-size:12px;font-weight:600;margin:0">${e.title}</p>
                  <p style="font-size:10px;color:#888;margin:1px 0 0 0">${e.company} · ${e.from}–${e.to}</p>
                </div>
                <div style="display:flex;gap:2px;flex-shrink:0">
                  <button class="cv-edit-exp" data-idx="${i}" style="background:none;border:none;font-size:10px;cursor:pointer;color:${tpl.color}">✎</button>
                  <button class="cv-del-exp" data-idx="${i}" style="background:none;border:none;font-size:11px;cursor:pointer;color:#ccc">✕</button>
                </div>
              </div>
            </div>`).join('')}
          </div>

          ${sectionHead('EDUCATION')}
          <div id="cvEduList">
            ${cvDraft.education.map((e, i) => `
            <div class="cv-edu-item" data-idx="${i}" style="padding:8px 10px;background:white;border:1px solid #eee;border-radius:8px;margin-bottom:6px">
              <div style="display:flex;justify-content:space-between;align-items:start">
                <div style="flex:1;min-width:0">
                  <p style="font-size:12px;font-weight:600;margin:0">${e.degree}</p>
                  <p style="font-size:10px;color:#888;margin:1px 0 0 0">${e.school} · ${e.from}–${e.to}</p>
                </div>
                <div style="display:flex;gap:2px;flex-shrink:0">
                  <button class="cv-edit-edu" data-idx="${i}" style="background:none;border:none;font-size:10px;cursor:pointer;color:${tpl.color}">✎</button>
                  <button class="cv-del-edu" data-idx="${i}" style="background:none;border:none;font-size:11px;cursor:pointer;color:#ccc">✕</button>
                </div>
              </div>
            </div>`).join('')}
          </div>

          ${sectionHead('SKILLS')}
          <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px" id="cvSkillTags">
            ${cvDraft.skills.map((s, i) => `<span style="display:inline-flex;align-items:center;gap:3px;padding:3px 8px;background:white;border:1px solid #eee;border-radius:6px;font-size:10px">${s}<button class="cv-del-skill" data-idx="${i}" style="background:none;border:none;font-size:10px;cursor:pointer;color:#ccc;padding:0;line-height:1">✕</button></span>`).join('')}
          </div>
          <div style="display:flex;gap:4px">
            <input id="cvNewSkill" placeholder="Add skill…" style="${inputStyle};flex:1">
            <button id="cvAddSkillBtn" style="padding:6px 10px;font-size:10px;font-weight:600;background:${tpl.color};color:white;border:none;border-radius:8px;cursor:pointer;white-space:nowrap">+ Add</button>
          </div>

          ${sectionHead('CERTIFICATIONS')}
          <div id="cvCertList">
            ${cvDraft.certifications.map((c, i) => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:white;border:1px solid #eee;border-radius:6px;margin-bottom:4px">
              <span style="font-size:11px;font-weight:500">${c.name}</span>
              <button class="cv-del-cert" data-idx="${i}" style="background:none;border:none;font-size:10px;cursor:pointer;color:#ccc">✕</button>
            </div>`).join('')}
          </div>

          ${sectionHead('LANGUAGES')}
          <div id="cvLangList">
            ${cvDraft.languages.map((l, i) => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:white;border:1px solid #eee;border-radius:6px;margin-bottom:4px">
              <span style="font-size:11px"><strong>${l.lang}</strong> — ${l.level}</span>
              <button class="cv-del-lang" data-idx="${i}" style="background:none;border:none;font-size:10px;cursor:pointer;color:#ccc">✕</button>
            </div>`).join('')}
          </div>

          <!-- Save to profile button -->
          <div style="margin-top:20px;padding-top:14px;border-top:1px solid #eee">
            <button id="cvSaveToProfile" style="width:100%;padding:10px;font-size:12px;font-weight:700;background:${tpl.color};color:white;border:none;border-radius:10px;cursor:pointer;transition:opacity 0.2s">💾 Save Changes to Profile</button>
          </div>
        </div>

        <!-- Right: Live Preview -->
        <div id="cvPreviewArea" style="flex:1;overflow-y:auto;background:#e8e8e8;padding:20px;display:flex;justify-content:center">
          <div id="cvPreviewPaper" style="width:100%;max-width:620px;background:white;box-shadow:0 2px 16px rgba(0,0,0,0.08);min-height:800px"></div>
        </div>
      </div>
    </div>`;
  }

  function bindCVEditorEvents(overlay, templateId, tpl) {
    let currentTpl = templateId;

    const close = () => overlay.remove();
    overlay.querySelector('#closeCVModal').onclick = close;
    overlay.onclick = (e) => { if (e.target === overlay) close(); };

    /* Photo upload */
    const photoPreview = overlay.querySelector('#cvPhotoPreview');
    const photoInput = overlay.querySelector('#cvPhotoInput');
    const photoBtn = overlay.querySelector('#cvPhotoBtn');
    photoPreview.onclick = () => photoInput.click();
    photoBtn.onclick = () => photoInput.click();
    photoInput.onchange = () => {
      const file = photoInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        cvPhotoUrl = ev.target.result;
        photoPreview.innerHTML = `<img src="${cvPhotoUrl}" style="width:100%;height:100%;object-fit:cover">`;
        photoBtn.textContent = 'Change Photo';
        refreshCVPreview(currentTpl);
      };
      reader.readAsDataURL(file);
    };
    const photoRemove = overlay.querySelector('#cvPhotoRemove');
    if (photoRemove) photoRemove.onclick = () => {
      cvPhotoUrl = null;
      photoPreview.innerHTML = '<span style="font-size:28px;color:#ccc">📷</span>';
      photoBtn.textContent = 'Upload Photo';
      refreshCVPreview(currentTpl);
    };

    /* Live refresh on text input changes */
    const refreshFields = () => {
      cvDraft.name = overlay.querySelector('#cvName').value;
      cvDraft.jobTitle = overlay.querySelector('#cvJobTitle').value;
      cvDraft.location = overlay.querySelector('#cvLocation').value;
      cvDraft.phone = overlay.querySelector('#cvPhone').value;
      cvDraft.email = overlay.querySelector('#cvEmail').value;
      cvDraft.linkedin = overlay.querySelector('#cvLinkedin').value;
      cvDraft.about = overlay.querySelector('#cvAbout').value;
      refreshCVPreview(currentTpl);
    };
    ['cvName','cvJobTitle','cvLocation','cvPhone','cvEmail','cvLinkedin','cvAbout'].forEach(id => {
      const el = overlay.querySelector('#' + id);
      if (el) el.addEventListener('input', refreshFields);
    });

    /* Delete experience */
    overlay.querySelectorAll('.cv-del-exp').forEach(btn => {
      btn.onclick = () => { cvDraft.experience.splice(+btn.dataset.idx, 1); reopenEditor(currentTpl); };
    });
    /* Edit experience (inline prompt) */
    overlay.querySelectorAll('.cv-edit-exp').forEach(btn => {
      btn.onclick = () => {
        const idx = +btn.dataset.idx;
        const item = cvDraft.experience[idx];
        const parent = btn.closest('.cv-exp-item');
        parent.innerHTML = `
          <div style="display:flex;flex-direction:column;gap:4px">
            <input class="cv-exp-edit-title" value="${item.title}" style="padding:5px 8px;border:1px solid #ddd;border-radius:6px;font-size:11px">
            <div style="display:flex;gap:4px">
              <input class="cv-exp-edit-company" value="${item.company}" placeholder="Company" style="flex:1;padding:5px 8px;border:1px solid #ddd;border-radius:6px;font-size:11px">
              <input class="cv-exp-edit-from" value="${item.from}" placeholder="From" style="width:70px;padding:5px 8px;border:1px solid #ddd;border-radius:6px;font-size:11px">
              <input class="cv-exp-edit-to" value="${item.to}" placeholder="To" style="width:70px;padding:5px 8px;border:1px solid #ddd;border-radius:6px;font-size:11px">
            </div>
            <textarea class="cv-exp-edit-desc" rows="2" style="padding:5px 8px;border:1px solid #ddd;border-radius:6px;font-size:11px;font-family:inherit;resize:vertical">${item.desc || ''}</textarea>
            <div style="display:flex;gap:4px;justify-content:flex-end">
              <button class="cv-exp-cancel" style="padding:4px 10px;font-size:10px;background:#f5f5f5;border:1px solid #ddd;border-radius:6px;cursor:pointer">Cancel</button>
              <button class="cv-exp-save" style="padding:4px 10px;font-size:10px;background:${tpl.color};color:white;border:none;border-radius:6px;cursor:pointer">Save</button>
            </div>
          </div>`;
        parent.querySelector('.cv-exp-cancel').onclick = () => reopenEditor(currentTpl);
        parent.querySelector('.cv-exp-save').onclick = () => {
          item.title = parent.querySelector('.cv-exp-edit-title').value.trim() || item.title;
          item.company = parent.querySelector('.cv-exp-edit-company').value.trim() || item.company;
          item.from = parent.querySelector('.cv-exp-edit-from').value.trim() || item.from;
          item.to = parent.querySelector('.cv-exp-edit-to').value.trim() || item.to;
          item.desc = parent.querySelector('.cv-exp-edit-desc').value.trim();
          reopenEditor(currentTpl);
        };
      };
    });

    /* Delete / edit education */
    overlay.querySelectorAll('.cv-del-edu').forEach(btn => {
      btn.onclick = () => { cvDraft.education.splice(+btn.dataset.idx, 1); reopenEditor(currentTpl); };
    });
    overlay.querySelectorAll('.cv-edit-edu').forEach(btn => {
      btn.onclick = () => {
        const idx = +btn.dataset.idx;
        const item = cvDraft.education[idx];
        const parent = btn.closest('.cv-edu-item');
        parent.innerHTML = `
          <div style="display:flex;flex-direction:column;gap:4px">
            <input class="cv-edu-edit-degree" value="${item.degree}" style="padding:5px 8px;border:1px solid #ddd;border-radius:6px;font-size:11px">
            <div style="display:flex;gap:4px">
              <input class="cv-edu-edit-school" value="${item.school}" placeholder="School" style="flex:1;padding:5px 8px;border:1px solid #ddd;border-radius:6px;font-size:11px">
              <input class="cv-edu-edit-from" value="${item.from}" placeholder="From" style="width:60px;padding:5px 8px;border:1px solid #ddd;border-radius:6px;font-size:11px">
              <input class="cv-edu-edit-to" value="${item.to}" placeholder="To" style="width:60px;padding:5px 8px;border:1px solid #ddd;border-radius:6px;font-size:11px">
            </div>
            <div style="display:flex;gap:4px;justify-content:flex-end">
              <button class="cv-edu-cancel" style="padding:4px 10px;font-size:10px;background:#f5f5f5;border:1px solid #ddd;border-radius:6px;cursor:pointer">Cancel</button>
              <button class="cv-edu-save" style="padding:4px 10px;font-size:10px;background:${tpl.color};color:white;border:none;border-radius:6px;cursor:pointer">Save</button>
            </div>
          </div>`;
        parent.querySelector('.cv-edu-cancel').onclick = () => reopenEditor(currentTpl);
        parent.querySelector('.cv-edu-save').onclick = () => {
          item.degree = parent.querySelector('.cv-edu-edit-degree').value.trim() || item.degree;
          item.school = parent.querySelector('.cv-edu-edit-school').value.trim() || item.school;
          item.from = parent.querySelector('.cv-edu-edit-from').value.trim() || item.from;
          item.to = parent.querySelector('.cv-edu-edit-to').value.trim() || item.to;
          reopenEditor(currentTpl);
        };
      };
    });

    /* Skills: delete + add */
    overlay.querySelectorAll('.cv-del-skill').forEach(btn => {
      btn.onclick = () => { cvDraft.skills.splice(+btn.dataset.idx, 1); reopenEditor(currentTpl); };
    });
    const addSkillBtn = overlay.querySelector('#cvAddSkillBtn');
    const newSkillInput = overlay.querySelector('#cvNewSkill');
    if (addSkillBtn) addSkillBtn.onclick = () => {
      const v = newSkillInput.value.trim();
      if (v && !cvDraft.skills.includes(v)) { cvDraft.skills.push(v); reopenEditor(currentTpl); }
    };
    if (newSkillInput) newSkillInput.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); addSkillBtn.click(); } };

    /* Certifications: delete */
    overlay.querySelectorAll('.cv-del-cert').forEach(btn => {
      btn.onclick = () => { cvDraft.certifications.splice(+btn.dataset.idx, 1); reopenEditor(currentTpl); };
    });
    /* Languages: delete */
    overlay.querySelectorAll('.cv-del-lang').forEach(btn => {
      btn.onclick = () => { cvDraft.languages.splice(+btn.dataset.idx, 1); reopenEditor(currentTpl); };
    });

    /* Template switcher */
    overlay.querySelector('#cvTplSwitch').onchange = (e) => {
      currentTpl = e.target.value;
      refreshCVPreview(currentTpl);
    };

    /* Print */
    overlay.querySelector('#printCV').onclick = () => {
      const html = document.getElementById('cvPreviewPaper').innerHTML;
      const cvW = window.open('', '_blank');
      cvW.document.write('<html><head><title>CV - ' + cvDraft.name + '</title><style>body{margin:0;font-family:Helvetica,Arial,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}@media print{body{margin:0}}</style></head><body>' + html + '</body></html>');
      cvW.document.close();
      cvW.print();
    };

    /* Download */
    overlay.querySelector('#downloadCV').onclick = () => {
      const btn = overlay.querySelector('#downloadCV');
      btn.innerHTML = '✓ Downloaded';
      btn.style.opacity = '0.7';
      setTimeout(() => { btn.innerHTML = '⬇ Download'; btn.style.opacity = ''; }, 2000);
    };

    /* Save to profile */
    overlay.querySelector('#cvSaveToProfile').onclick = () => {
      profile.name = cvDraft.name || profile.name;
      profile.location = cvDraft.location || profile.location;
      profile.phone = cvDraft.phone || profile.phone;
      profile.email = cvDraft.email || profile.email;
      profile.linkedin = cvDraft.linkedin;
      profile.about = cvDraft.about;
      profile.experience = cvDraft.experience.map(e => ({...e}));
      profile.education = cvDraft.education.map(e => ({...e}));
      profile.skills = [...cvDraft.skills];
      profile.certifications = cvDraft.certifications.map(c => ({...c}));
      profile.languages = cvDraft.languages.map(l => ({...l}));
      const btn = overlay.querySelector('#cvSaveToProfile');
      btn.innerHTML = '✓ Saved to Profile';
      btn.style.opacity = '0.7';
      setTimeout(() => { btn.innerHTML = '💾 Save Changes to Profile'; btn.style.opacity = ''; }, 1500);
      render();
    };
  }

  function reopenEditor(templateId) {
    const existing = document.getElementById('cvPreviewModal');
    if (existing) existing.remove();
    const tpl = cvTemplates.find(t => t.id === templateId);
    const overlay = document.createElement('div');
    overlay.id = 'cvPreviewModal';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,0.5);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:16px';
    overlay.innerHTML = buildCVEditorHTML(templateId, tpl);
    document.body.appendChild(overlay);
    refreshCVPreview(templateId);
    bindCVEditorEvents(overlay, templateId, tpl);
  }

  function refreshCVPreview(templateId) {
    const paper = document.getElementById('cvPreviewPaper');
    if (!paper) return;
    if (templateId === 'professional') paper.innerHTML = cvProfessional();
    else if (templateId === 'modern') paper.innerHTML = cvModern();
    else paper.innerHTML = cvMinimal();
  }

  /* ── Professional CV Template ── */
  function cvProfessional() {
    const d = cvDraft;
    const photoCircle = cvPhotoUrl
      ? `<img src="${cvPhotoUrl}" style="width:70px;height:70px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.4);flex-shrink:0">`
      : '';
    return `
      <div style="font-family:Georgia,'Times New Roman',serif;color:#333">
        <div style="background:#ED1C24;color:white;padding:28px 36px;display:flex;align-items:center;gap:18px">
          ${photoCircle}
          <div style="flex:1">
            <h1 style="font-size:24px;font-weight:800;margin:0 0 2px 0;letter-spacing:0.5px;font-family:Helvetica,Arial,sans-serif">${d.name}</h1>
            ${d.jobTitle ? `<p style="font-size:13px;opacity:0.9;margin:0 0 4px 0;font-family:Helvetica,Arial,sans-serif">${d.jobTitle}</p>` : ''}
            <p style="font-size:12px;opacity:0.8;margin:0">${d.location}</p>
            <div style="display:flex;gap:16px;margin-top:8px;font-size:10px;opacity:0.8;flex-wrap:wrap">
              <span>📱 ${d.phone}</span>
              <span>✉️ ${d.email}</span>
              ${d.linkedin ? `<span>🌐 ${d.linkedin}</span>` : ''}
            </div>
          </div>
        </div>
        <div style="padding:24px 36px">
          ${d.about ? `
          <div style="margin-bottom:20px">
            <h2 style="font-size:11px;font-weight:700;color:#ED1C24;letter-spacing:1.5px;border-bottom:2px solid #ED1C24;padding-bottom:4px;margin:0 0 8px 0;font-family:Helvetica,Arial,sans-serif">PROFESSIONAL SUMMARY</h2>
            <p style="font-size:11px;line-height:1.7;color:#555;margin:0">${d.about}</p>
          </div>` : ''}
          ${d.experience.length ? `
          <div style="margin-bottom:20px">
            <h2 style="font-size:11px;font-weight:700;color:#ED1C24;letter-spacing:1.5px;border-bottom:2px solid #ED1C24;padding-bottom:4px;margin:0 0 10px 0;font-family:Helvetica,Arial,sans-serif">EXPERIENCE</h2>
            ${d.experience.map(e => `
            <div style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;align-items:baseline"><p style="font-size:12px;font-weight:700;margin:0">${e.title}</p><span style="font-size:9px;color:#888;white-space:nowrap">${e.from} – ${e.to}</span></div>
              <p style="font-size:10px;color:#ED1C24;font-weight:600;margin:2px 0 3px 0">${e.company}</p>
              ${e.desc ? `<p style="font-size:10px;color:#555;line-height:1.6;margin:0">${e.desc}</p>` : ''}
            </div>`).join('')}
          </div>` : ''}
          ${d.education.length ? `
          <div style="margin-bottom:20px">
            <h2 style="font-size:11px;font-weight:700;color:#ED1C24;letter-spacing:1.5px;border-bottom:2px solid #ED1C24;padding-bottom:4px;margin:0 0 10px 0;font-family:Helvetica,Arial,sans-serif">EDUCATION</h2>
            ${d.education.map(e => `<div style="margin-bottom:8px"><p style="font-size:12px;font-weight:700;margin:0">${e.degree}</p><p style="font-size:10px;color:#888;margin:2px 0 0 0">${e.school} | ${e.from} – ${e.to}</p></div>`).join('')}
          </div>` : ''}
          ${d.skills.length ? `
          <div style="margin-bottom:20px">
            <h2 style="font-size:11px;font-weight:700;color:#ED1C24;letter-spacing:1.5px;border-bottom:2px solid #ED1C24;padding-bottom:4px;margin:0 0 8px 0;font-family:Helvetica,Arial,sans-serif">SKILLS</h2>
            <div style="display:flex;flex-wrap:wrap;gap:5px">${d.skills.map(s => `<span style="padding:2px 8px;background:#FDE8E8;color:#ED1C24;border-radius:8px;font-size:9px;font-weight:600">${s}</span>`).join('')}</div>
          </div>` : ''}
          ${d.certifications.length ? `
          <div style="margin-bottom:20px">
            <h2 style="font-size:11px;font-weight:700;color:#ED1C24;letter-spacing:1.5px;border-bottom:2px solid #ED1C24;padding-bottom:4px;margin:0 0 10px 0;font-family:Helvetica,Arial,sans-serif">CERTIFICATIONS</h2>
            ${d.certifications.map(c => `<div style="margin-bottom:5px"><p style="font-size:11px;font-weight:600;margin:0">${c.name}</p><p style="font-size:9px;color:#888;margin:1px 0 0 0">${c.issuer}${c.year ? ' · ' + c.year : ''}</p></div>`).join('')}
          </div>` : ''}
          ${d.languages.length ? `
          <div>
            <h2 style="font-size:11px;font-weight:700;color:#ED1C24;letter-spacing:1.5px;border-bottom:2px solid #ED1C24;padding-bottom:4px;margin:0 0 8px 0;font-family:Helvetica,Arial,sans-serif">LANGUAGES</h2>
            <div style="display:flex;gap:16px">${d.languages.map(l => `<span style="font-size:11px"><strong>${l.lang}</strong> — ${l.level}</span>`).join('')}</div>
          </div>` : ''}
        </div>
      </div>`;
  }

  /* ── Modern CV Template ── */
  function cvModern() {
    const d = cvDraft;
    const photoBlock = cvPhotoUrl
      ? `<img src="${cvPhotoUrl}" style="width:70px;height:70px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.3);margin-bottom:14px">`
      : `<div style="width:70px;height:70px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;margin-bottom:14px">${d.initials || d.name.split(' ').map(w=>w[0]).join('')}</div>`;
    return `
      <div style="font-family:Helvetica,Arial,sans-serif;color:#333;display:flex;min-height:800px">
        <div style="width:210px;background:#00A79D;color:white;padding:26px 20px;flex-shrink:0">
          ${photoBlock}
          <h1 style="font-size:17px;font-weight:800;margin:0 0 2px 0">${d.name}</h1>
          ${d.jobTitle ? `<p style="font-size:10px;opacity:0.85;margin:0 0 4px 0;font-weight:600">${d.jobTitle}</p>` : ''}
          <p style="font-size:10px;opacity:0.75;margin:0 0 18px 0">${d.location}</p>
          <div style="margin-bottom:20px">
            <h3 style="font-size:9px;font-weight:700;letter-spacing:1.2px;opacity:0.6;margin:0 0 6px 0">CONTACT</h3>
            <p style="font-size:10px;margin:0 0 4px 0">📱 ${d.phone}</p>
            <p style="font-size:10px;margin:0 0 4px 0">✉️ ${d.email}</p>
            ${d.linkedin ? `<p style="font-size:10px;margin:0">🌐 ${d.linkedin}</p>` : ''}
          </div>
          ${d.skills.length ? `
          <div style="margin-bottom:20px">
            <h3 style="font-size:9px;font-weight:700;letter-spacing:1.2px;opacity:0.6;margin:0 0 8px 0">SKILLS</h3>
            <div style="display:flex;flex-direction:column;gap:4px">${d.skills.map(s => `<div style="display:flex;align-items:center;gap:5px"><div style="width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,0.5);flex-shrink:0"></div><span style="font-size:9px;line-height:1.3">${s}</span></div>`).join('')}</div>
          </div>` : ''}
          ${d.languages.length ? `
          <div>
            <h3 style="font-size:9px;font-weight:700;letter-spacing:1.2px;opacity:0.6;margin:0 0 8px 0">LANGUAGES</h3>
            ${d.languages.map(l => `<div style="margin-bottom:6px"><div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:9px;font-weight:600">${l.lang}</span><span style="font-size:8px;opacity:0.7">${l.level}</span></div><div style="height:3px;border-radius:2px;background:rgba(255,255,255,0.2)"><div style="height:100%;width:${l.pct}%;border-radius:2px;background:rgba(255,255,255,0.8)"></div></div></div>`).join('')}
          </div>` : ''}
        </div>
        <div style="flex:1;padding:26px 24px">
          ${d.about ? `
          <div style="margin-bottom:20px">
            <h2 style="font-size:12px;font-weight:700;color:#00A79D;letter-spacing:1px;margin:0 0 6px 0">ABOUT ME</h2>
            <p style="font-size:11px;line-height:1.7;color:#555;margin:0">${d.about}</p>
          </div>` : ''}
          ${d.experience.length ? `
          <div style="margin-bottom:20px">
            <h2 style="font-size:12px;font-weight:700;color:#00A79D;letter-spacing:1px;margin:0 0 12px 0">EXPERIENCE</h2>
            ${d.experience.map(e => `
            <div style="margin-bottom:14px;padding-left:12px;border-left:3px solid #00A79D">
              <p style="font-size:12px;font-weight:700;margin:0">${e.title}</p>
              <p style="font-size:10px;color:#00A79D;font-weight:600;margin:2px 0">${e.company}</p>
              <p style="font-size:9px;color:#999;margin:0 0 3px 0">${e.from} – ${e.to}</p>
              ${e.desc ? `<p style="font-size:10px;color:#555;line-height:1.5;margin:0">${e.desc}</p>` : ''}
            </div>`).join('')}
          </div>` : ''}
          ${d.education.length ? `
          <div style="margin-bottom:20px">
            <h2 style="font-size:12px;font-weight:700;color:#00A79D;letter-spacing:1px;margin:0 0 12px 0">EDUCATION</h2>
            ${d.education.map(e => `
            <div style="margin-bottom:10px;padding-left:12px;border-left:3px solid #9ED6C4">
              <p style="font-size:12px;font-weight:700;margin:0">${e.degree}</p>
              <p style="font-size:10px;color:#888;margin:2px 0 0 0">${e.school} · ${e.from} – ${e.to}</p>
            </div>`).join('')}
          </div>` : ''}
          ${d.certifications.length ? `
          <div>
            <h2 style="font-size:12px;font-weight:700;color:#00A79D;letter-spacing:1px;margin:0 0 10px 0">CERTIFICATIONS</h2>
            ${d.certifications.map(c => `<div style="margin-bottom:5px"><p style="font-size:11px;font-weight:600;margin:0">${c.name}</p><p style="font-size:9px;color:#888;margin:1px 0 0 0">${c.issuer}${c.year ? ' · ' + c.year : ''}</p></div>`).join('')}
          </div>` : ''}
        </div>
      </div>`;
  }

  /* ── Minimal CV Template ── */
  function cvMinimal() {
    const d = cvDraft;
    const photoLine = cvPhotoUrl
      ? `<img src="${cvPhotoUrl}" style="width:60px;height:60px;border-radius:50%;object-fit:cover;margin-bottom:10px;border:2px solid #eee">`
      : '';
    return `
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#2D2D2D;padding:36px 32px">
        <div style="text-align:center;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #ddd">
          ${photoLine}
          <h1 style="font-size:26px;font-weight:300;letter-spacing:3px;margin:0 0 4px 0;text-transform:uppercase">${d.name}</h1>
          ${d.jobTitle ? `<p style="font-size:12px;color:#666;margin:0 0 4px 0;font-weight:500">${d.jobTitle}</p>` : ''}
          <p style="font-size:11px;color:#888;margin:0;letter-spacing:1px">${d.location}</p>
          <div style="display:flex;justify-content:center;gap:14px;margin-top:8px;font-size:10px;color:#666">
            <span>${d.phone}</span><span>·</span>
            <span>${d.email}</span>
            ${d.linkedin ? `<span>·</span><span>${d.linkedin}</span>` : ''}
          </div>
        </div>
        ${d.about ? `
        <div style="margin-bottom:20px">
          <h2 style="font-size:10px;font-weight:600;letter-spacing:2px;color:#2D2D2D;margin:0 0 6px 0;text-transform:uppercase">Profile</h2>
          <p style="font-size:11px;line-height:1.7;color:#555;margin:0">${d.about}</p>
        </div>` : ''}
        ${d.experience.length ? `
        <div style="margin-bottom:20px">
          <h2 style="font-size:10px;font-weight:600;letter-spacing:2px;color:#2D2D2D;margin:0 0 10px 0;text-transform:uppercase">Experience</h2>
          ${d.experience.map(e => `
          <div style="margin-bottom:12px">
            <div style="display:flex;justify-content:space-between;align-items:baseline"><p style="font-size:12px;font-weight:600;margin:0">${e.title}</p><span style="font-size:9px;color:#999">${e.from} – ${e.to}</span></div>
            <p style="font-size:10px;color:#888;margin:2px 0 3px 0;font-style:italic">${e.company}</p>
            ${e.desc ? `<p style="font-size:10px;color:#555;line-height:1.6;margin:0">${e.desc}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}
        ${d.education.length ? `
        <div style="margin-bottom:20px">
          <h2 style="font-size:10px;font-weight:600;letter-spacing:2px;color:#2D2D2D;margin:0 0 10px 0;text-transform:uppercase">Education</h2>
          ${d.education.map(e => `
          <div style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:baseline">
            <div><p style="font-size:12px;font-weight:600;margin:0">${e.degree}</p><p style="font-size:10px;color:#888;margin:2px 0 0 0">${e.school}</p></div>
            <span style="font-size:9px;color:#999">${e.from} – ${e.to}</span>
          </div>`).join('')}
        </div>` : ''}
        <div style="display:flex;gap:24px">
          ${d.skills.length ? `
          <div style="flex:1">
            <h2 style="font-size:10px;font-weight:600;letter-spacing:2px;color:#2D2D2D;margin:0 0 6px 0;text-transform:uppercase">Skills</h2>
            <p style="font-size:10px;color:#555;line-height:1.8;margin:0">${d.skills.join(' · ')}</p>
          </div>` : ''}
          ${d.languages.length ? `
          <div style="width:130px;flex-shrink:0">
            <h2 style="font-size:10px;font-weight:600;letter-spacing:2px;color:#2D2D2D;margin:0 0 6px 0;text-transform:uppercase">Languages</h2>
            ${d.languages.map(l => `<p style="font-size:10px;margin:0 0 3px 0"><strong>${l.lang}</strong> — ${l.level}</p>`).join('')}
          </div>` : ''}
        </div>
        ${d.certifications.length ? `
        <div style="margin-top:20px">
          <h2 style="font-size:10px;font-weight:600;letter-spacing:2px;color:#2D2D2D;margin:0 0 8px 0;text-transform:uppercase">Certifications</h2>
          ${d.certifications.map(c => `<p style="font-size:10px;margin:0 0 3px 0">${c.name} <span style="color:#999">— ${c.issuer}${c.year ? ', ' + c.year : ''}</span></p>`).join('')}
        </div>` : ''}
      </div>`;
  }

  render();
  page.appendChild(main);
  return page;
});
