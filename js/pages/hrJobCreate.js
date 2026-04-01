/* ─── HR Create / Post Job Page ─── */
Router.register('/hr/jobs/create', function renderHrJobCreate() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/jobs/create'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div class="page-header" style="margin-bottom:28px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:4px">
            <button class="btn-glass" onclick="Router.navigate('/hr/dashboard')" style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;padding:0">←</button>
            <h1>Create Job Posting</h1>
          </div>
          <p style="margin-left:48px">Fill in details to publish a new position</p>
        </div>

        <!-- Job Info -->
        <div class="card card-lg" style="border-radius:24px;padding:28px;margin-bottom:16px">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:16px">JOB INFORMATION</h3>
          <div class="input-group">
            <label>Job Title <span style="color:var(--red)">*</span></label>
            <input type="text" id="job-title" placeholder="e.g. Senior Software Engineer">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
            <div class="input-group">
              <label>Department <span style="color:var(--red)">*</span></label>
              <select id="job-dept">
                <option value="">Select department</option>
                <option>IT Department</option>
                <option>HR Department</option>
                <option>Finance</option>
                <option>Marketing</option>
                <option>Business Intelligence</option>
                <option>Operations</option>
                <option>Customer Service</option>
              </select>
            </div>
            <div class="input-group">
              <label>Employment Type <span style="color:var(--red)">*</span></label>
              <select id="job-type">
                <option value="">Select type</option>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
            <div class="input-group">
              <label>Location</label>
              <input type="text" placeholder="e.g. Phnom Penh, Cambodia">
            </div>
            <div class="input-group">
              <label>Number of Positions</label>
              <input type="number" min="1" value="1" placeholder="1">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
            <div class="input-group">
              <label>Salary Range (USD)</label>
              <div style="display:flex;gap:8px;align-items:center">
                <input type="number" placeholder="Min" style="flex:1">
                <span style="color:var(--text-tertiary)">—</span>
                <input type="number" placeholder="Max" style="flex:1">
              </div>
            </div>
            <div class="input-group">
              <label>Application Deadline</label>
              <input type="date">
            </div>
          </div>
        </div>

        <!-- Job Description -->
        <div class="card card-lg" style="border-radius:24px;padding:28px;margin-bottom:16px">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:16px">JOB DESCRIPTION</h3>
          <div class="input-group">
            <label>Description <span style="color:var(--red)">*</span></label>
            <textarea id="job-desc" style="width:100%;background:var(--glass-bg-light);backdrop-filter:blur(8px);border:1px solid var(--glass-border);border-radius:16px;padding:14px 16px;font-size:14px;min-height:120px;resize:vertical;font-family:var(--font-text);color:var(--black)" placeholder="Describe the role, team, and what the candidate will be working on..."></textarea>
          </div>
        </div>

        <!-- Requirements -->
        <div class="card card-lg" style="border-radius:24px;padding:28px;margin-bottom:16px">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:16px">REQUIREMENTS</h3>
          <div class="input-group">
            <label>Key Requirements <span style="color:var(--red)">*</span></label>
            <div id="req-list" style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px">
              <div class="req-item" style="display:flex;gap:8px;align-items:center">
                <input type="text" placeholder="e.g. 3+ years of experience in recruitment" style="flex:1">
                <button class="remove-req" style="width:32px;height:32px;border-radius:50%;background:rgba(237,28,36,0.08);color:var(--red);border:none;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0">×</button>
              </div>
              <div class="req-item" style="display:flex;gap:8px;align-items:center">
                <input type="text" placeholder="e.g. Bachelor's degree in related field" style="flex:1">
                <button class="remove-req" style="width:32px;height:32px;border-radius:50%;background:rgba(237,28,36,0.08);color:var(--red);border:none;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0">×</button>
              </div>
              <div class="req-item" style="display:flex;gap:8px;align-items:center">
                <input type="text" placeholder="e.g. Strong communication skills" style="flex:1">
                <button class="remove-req" style="width:32px;height:32px;border-radius:50%;background:rgba(237,28,36,0.08);color:var(--red);border:none;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0">×</button>
              </div>
            </div>
            <button id="add-req-btn" class="btn-glass" style="width:100%;padding:10px;font-size:13px">+ Add Requirement</button>
          </div>
          <div class="input-group" style="margin-top:16px">
            <label>Minimum Experience (years)</label>
            <input type="number" id="job-min-exp" min="0" value="2" placeholder="0">
          </div>
          <div class="input-group">
            <label>Preferred Skills (comma-separated)</label>
            <input type="text" id="job-skills" placeholder="e.g. Leadership, MS Office, Khmer & English fluency">
          </div>
        </div>

        <!-- Benefits -->
        <div class="card card-lg" style="border-radius:24px;padding:28px;margin-bottom:24px">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:16px">BENEFITS & PERKS</h3>
          <div id="benefits-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${[
              { icon: '🏥', label: 'Health Insurance' },
              { icon: '🏖️', label: 'Annual Leave (18 days)' },
              { icon: '💰', label: 'Performance Bonus' },
              { icon: '📚', label: 'Training & Development' },
              { icon: '🍽️', label: 'Meal Allowance' },
              { icon: '🚗', label: 'Transport Allowance' },
              { icon: '📱', label: 'Phone Allowance' },
              { icon: '🎯', label: 'Career Growth' },
            ].map(b => `
              <label style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,0.4);border:1.5px solid rgba(255,255,255,0.5);cursor:pointer;transition:all 0.2s">
                <input type="checkbox" style="width:16px;height:16px;accent-color:var(--teal)">
                <span style="font-size:16px">${b.icon}</span>
                <span style="font-size:13px;font-weight:500;color:var(--black)">${b.label}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Action buttons -->
        <div style="display:flex;gap:12px;justify-content:flex-end;margin-bottom:40px">
          <button class="btn-glass" style="padding:14px 28px;font-size:14px" onclick="Router.navigate('/hr/dashboard')">Save as Draft</button>
          <button class="btn-dark" id="publish-btn" style="padding:14px 36px;font-size:14px;font-weight:700;border-radius:var(--radius-pill)">
            🚀 Publish Job
          </button>
        </div>
      </div>

      <!-- Right sidebar: Preview -->
      <div class="col-side">
        <div class="card card-lg" style="border-radius:24px;padding:24px;position:sticky;top:24px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:16px">Preview</h3>

          <div style="background:linear-gradient(135deg,rgba(237,28,36,0.06),rgba(0,167,157,0.06));border-radius:18px;padding:20px;margin-bottom:16px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
              <div style="width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center">${logoHTML('sm')}</div>
              <div>
                <p id="preview-title" style="font-size:14px;font-weight:700;color:var(--black)">Job Title</p>
                <p style="font-size:11px;color:var(--text-tertiary)">Metfone · Phnom Penh</p>
              </div>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              <span class="badge badge-teal" style="font-size:10px;padding:3px 10px" id="preview-type">Full-Time</span>
              <span class="badge badge-gray" style="font-size:10px;padding:3px 10px" id="preview-dept">Department</span>
            </div>
          </div>

          <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:12px">This is how your job posting will appear to applicants.</div>

          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
            <div style="display:flex;align-items:center;gap:8px">
              <span style="width:6px;height:6px;border-radius:50%;background:var(--green)"></span>
              <span style="font-size:12px;color:var(--text-secondary)">Visible to all job seekers</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="width:6px;height:6px;border-radius:50%;background:var(--teal)"></span>
              <span style="font-size:12px;color:var(--text-secondary)">AI ranking enabled</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="width:6px;height:6px;border-radius:50%;background:var(--orange)"></span>
              <span style="font-size:12px;color:var(--text-secondary)">Auto-screen candidates</span>
            </div>
          </div>

          <div style="padding:14px;border-radius:14px;background:rgba(0,167,157,0.06);border:1px solid rgba(0,167,157,0.12)">
            <p style="font-size:12px;font-weight:600;color:var(--teal);margin-bottom:4px">🤖 AI Matching</p>
            <p style="font-size:11px;color:var(--text-tertiary);line-height:1.5">Candidates will be automatically ranked based on experience, skills, and job requirements.</p>
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);

  // Live preview updates
  setTimeout(() => {
    const titleInput = page.querySelector('#job-title');
    const deptSelect = page.querySelector('#job-dept');
    const typeSelect = page.querySelector('#job-type');
    if (titleInput) titleInput.addEventListener('input', () => {
      page.querySelector('#preview-title').textContent = titleInput.value || 'Job Title';
    });
    if (deptSelect) deptSelect.addEventListener('change', () => {
      page.querySelector('#preview-dept').textContent = deptSelect.value || 'Department';
    });
    if (typeSelect) typeSelect.addEventListener('change', () => {
      page.querySelector('#preview-type').textContent = typeSelect.value || 'Full-Time';
    });

    // Add requirement row
    page.querySelector('#add-req-btn').addEventListener('click', () => {
      const list = page.querySelector('#req-list');
      const row = document.createElement('div');
      row.className = 'req-item';
      row.style.cssText = 'display:flex;gap:8px;align-items:center';
      row.innerHTML = `
        <input type="text" placeholder="Add a requirement…" style="flex:1">
        <button class="remove-req" style="width:32px;height:32px;border-radius:50%;background:rgba(237,28,36,0.08);color:var(--red);border:none;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0">×</button>
      `;
      list.appendChild(row);
      row.querySelector('input').focus();
    });

    // Remove requirement rows
    page.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-req')) {
        const items = page.querySelectorAll('.req-item');
        if (items.length > 1) e.target.closest('.req-item').remove();
      }
    });

    // Publish button
    page.querySelector('#publish-btn').addEventListener('click', () => {
      const title = page.querySelector('#job-title').value.trim();
      const dept = page.querySelector('#job-dept').value;
      const desc = page.querySelector('#job-desc').value.trim();
      if (!title || !dept || !desc) {
        alert('Please fill in required fields: Job Title, Department, and Description.');
        return;
      }
      alert('Job "' + title + '" published successfully! Candidates will be auto-ranked by AI.');
      Router.navigate('/hr/applications');
    });
  });

  return page;
});
