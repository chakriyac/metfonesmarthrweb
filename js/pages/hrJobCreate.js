/* ─── HR Create / Post Job Page ─── */
Router.register('/hr/jobs/create', function renderHrJobCreate() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/jobs'));

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
        <div class="card card-lg" style="border-radius:24px;padding:28px;margin-bottom:16px">
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

        <!-- Photo Attachment -->
        <div class="card card-lg" style="border-radius:24px;padding:28px;margin-bottom:16px">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:16px">COVER IMAGE & ATTACHMENTS</h3>
          <div id="photo-drop-zone" style="border:2px dashed var(--glass-border);border-radius:20px;padding:32px 20px;text-align:center;cursor:pointer;transition:all 0.3s;background:var(--glass-bg)">
            <div style="font-size:40px;margin-bottom:8px">🖼️</div>
            <p style="font-size:13px;font-weight:700;margin-bottom:4px">Upload Cover Image</p>
            <p style="font-size:11px;color:var(--text-tertiary)">This image will appear on social media shares · JPG, PNG · Max 5MB</p>
            <input type="file" id="photo-file-input" accept="image/*" style="display:none">
          </div>
          <div id="photo-preview" style="display:none;margin-top:12px;position:relative">
            <img id="photo-preview-img" style="width:100%;border-radius:16px;max-height:200px;object-fit:cover">
            <button id="photo-remove" style="position:absolute;top:8px;right:8px;width:28px;height:28px;border-radius:50%;background:rgba(0,0,0,0.6);color:#fff;border:none;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center">✕</button>
          </div>
        </div>

        <!-- Schedule & Publish Options -->
        <div class="card card-lg" style="border-radius:24px;padding:28px;margin-bottom:16px">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:16px">PUBLISH OPTIONS</h3>
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
            <label style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;background:rgba(0,167,157,0.04);border:1.5px solid var(--glass-border);cursor:pointer;transition:all 0.2s" id="opt-publish-now">
              <input type="radio" name="publish-mode" value="now" checked style="accent-color:var(--teal);width:16px;height:16px">
              <span style="font-size:18px">🚀</span>
              <div style="flex:1">
                <p style="font-size:13px;font-weight:600">Publish Now</p>
                <p style="font-size:11px;color:var(--text-tertiary)">Job goes live immediately</p>
              </div>
            </label>
            <label style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,0.4);border:1.5px solid var(--glass-border);cursor:pointer;transition:all 0.2s" id="opt-schedule">
              <input type="radio" name="publish-mode" value="schedule" style="accent-color:var(--teal);width:16px;height:16px">
              <span style="font-size:18px">📅</span>
              <div style="flex:1">
                <p style="font-size:13px;font-weight:600">Schedule Post</p>
                <p style="font-size:11px;color:var(--text-tertiary)">Set a date & time to auto-publish</p>
              </div>
            </label>
          </div>
          <div id="schedule-fields" style="display:none;margin-bottom:16px;padding:16px;border-radius:16px;background:rgba(232,124,30,0.04);border:1px solid rgba(232,124,30,0.15)">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div class="input-group">
                <label>📅 Publish Date</label>
                <input type="date" id="schedule-date">
              </div>
              <div class="input-group">
                <label>🕐 Publish Time</label>
                <input type="time" id="schedule-time" value="09:00">
              </div>
            </div>
            <p style="font-size:10px;color:var(--orange);margin-top:8px;font-weight:600">⏰ Job will be automatically published at the scheduled time</p>
          </div>
        </div>

        <!-- Social Media Sharing -->
        <div class="card card-lg" style="border-radius:24px;padding:28px;margin-bottom:24px">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:6px">SHARE TO SOCIAL MEDIA</h3>
          <p style="font-size:11px;color:var(--text-tertiary);margin-bottom:16px">Post this job automatically to your company's social pages</p>

          <!-- LinkedIn -->
          <div class="social-share-card" id="social-linkedin" style="padding:16px;border-radius:16px;border:1.5px solid var(--glass-border);margin-bottom:10px;transition:all 0.2s">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <div style="width:36px;height:36px;border-radius:10px;background:#0A66C2;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:800">in</div>
              <div style="flex:1">
                <p style="font-size:13px;font-weight:700">LinkedIn</p>
                <p class="social-status" style="font-size:10px;color:var(--red);font-weight:600">⚠ Not connected</p>
              </div>
              <button class="social-connect-btn" data-platform="linkedin" style="padding:7px 16px;border-radius:10px;border:1.5px solid #0A66C2;background:rgba(10,102,194,0.06);color:#0A66C2;font-size:11px;font-weight:700;cursor:pointer;transition:all 0.15s">🔗 Connect</button>
              <label style="position:relative;width:44px;height:24px;display:none" class="social-toggle-wrap">
                <input type="checkbox" id="share-linkedin" style="display:none">
                <span class="toggle-track" style="position:absolute;left:0;top:0;width:44px;height:24px;border-radius:12px;background:var(--glass-border);transition:0.3s;cursor:pointer"></span>
                <span class="toggle-thumb" style="position:absolute;left:2px;top:2px;width:20px;height:20px;border-radius:50%;background:#fff;transition:0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.2);cursor:pointer"></span>
              </label>
            </div>
            <div id="linkedin-custom" style="display:none">
              <textarea id="linkedin-caption" placeholder="Customize your LinkedIn post caption…" style="width:100%;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:12px;padding:10px 14px;font-size:12px;min-height:60px;resize:vertical;font-family:var(--font-text);color:var(--black);margin-bottom:6px"></textarea>
              <p style="font-size:10px;color:var(--text-tertiary)">🔗 Cover image + job link will be attached automatically</p>
            </div>
          </div>

          <!-- Facebook -->
          <div class="social-share-card" id="social-facebook" style="padding:16px;border-radius:16px;border:1.5px solid var(--glass-border);margin-bottom:10px;transition:all 0.2s">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <div style="width:36px;height:36px;border-radius:10px;background:#1877F2;display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;font-weight:800">f</div>
              <div style="flex:1">
                <p style="font-size:13px;font-weight:700">Facebook Page</p>
                <p class="social-status" style="font-size:10px;color:var(--red);font-weight:600">⚠ Not connected</p>
              </div>
              <button class="social-connect-btn" data-platform="facebook" style="padding:7px 16px;border-radius:10px;border:1.5px solid #1877F2;background:rgba(24,119,242,0.06);color:#1877F2;font-size:11px;font-weight:700;cursor:pointer;transition:all 0.15s">🔗 Connect</button>
              <label style="position:relative;width:44px;height:24px;display:none" class="social-toggle-wrap">
                <input type="checkbox" id="share-facebook" style="display:none">
                <span class="toggle-track" style="position:absolute;left:0;top:0;width:44px;height:24px;border-radius:12px;background:var(--glass-border);transition:0.3s;cursor:pointer"></span>
                <span class="toggle-thumb" style="position:absolute;left:2px;top:2px;width:20px;height:20px;border-radius:50%;background:#fff;transition:0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.2);cursor:pointer"></span>
              </label>
            </div>
            <div id="facebook-custom" style="display:none">
              <textarea id="facebook-caption" placeholder="Customize your Facebook post caption…" style="width:100%;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:12px;padding:10px 14px;font-size:12px;min-height:60px;resize:vertical;font-family:var(--font-text);color:var(--black);margin-bottom:6px"></textarea>
              <p style="font-size:10px;color:var(--text-tertiary)">📷 Cover image + job description will be posted directly to your Page</p>
            </div>
          </div>

          <!-- Telegram -->
          <div class="social-share-card" id="social-telegram" style="padding:16px;border-radius:16px;border:1.5px solid var(--glass-border);transition:all 0.2s">
            <div style="display:flex;align-items:center;gap:10px">
              <div style="width:36px;height:36px;border-radius:10px;background:#2AABEE;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px">✈</div>
              <div style="flex:1">
                <p style="font-size:13px;font-weight:700">Telegram Channel</p>
                <p class="social-status" style="font-size:10px;color:var(--red);font-weight:600">⚠ Not connected</p>
              </div>
              <button class="social-connect-btn" data-platform="telegram" style="padding:7px 16px;border-radius:10px;border:1.5px solid #2AABEE;background:rgba(42,171,238,0.06);color:#2AABEE;font-size:11px;font-weight:700;cursor:pointer;transition:all 0.15s">🔗 Connect</button>
              <label style="position:relative;width:44px;height:24px;display:none" class="social-toggle-wrap">
                <input type="checkbox" id="share-telegram" style="display:none">
                <span class="toggle-track" style="position:absolute;left:0;top:0;width:44px;height:24px;border-radius:12px;background:var(--glass-border);transition:0.3s;cursor:pointer"></span>
                <span class="toggle-thumb" style="position:absolute;left:2px;top:2px;width:20px;height:20px;border-radius:50%;background:#fff;transition:0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.2);cursor:pointer"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div style="display:flex;gap:12px;justify-content:flex-end;margin-bottom:40px;flex-wrap:wrap">
          <button class="btn-glass" style="padding:14px 28px;font-size:14px" onclick="Router.navigate('/hr/jobs')">📋 View All Posts</button>
          <button class="btn-glass" style="padding:14px 28px;font-size:14px" id="save-draft-btn">Save as Draft</button>
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

          <div style="padding:14px;border-radius:14px;background:rgba(0,167,157,0.06);border:1px solid rgba(0,167,157,0.12);margin-bottom:14px">
            <p style="font-size:12px;font-weight:600;color:var(--teal);margin-bottom:4px">🤖 AI Matching</p>
            <p style="font-size:11px;color:var(--text-tertiary);line-height:1.5">Candidates will be automatically ranked based on experience, skills, and job requirements.</p>
          </div>

          <!-- Social sharing status -->
          <div id="preview-social" style="display:flex;flex-direction:column;gap:6px">
            <p style="font-size:10px;font-weight:700;color:var(--text-tertiary);letter-spacing:0.5px;margin-bottom:2px">SHARE TO</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap" id="preview-social-icons">
              <span style="font-size:10px;color:var(--text-tertiary);padding:3px 8px;border-radius:6px;background:var(--glass-bg);border:1px solid var(--glass-border)">No platforms selected</span>
            </div>
          </div>

          <!-- Cover image preview -->
          <div id="preview-cover" style="display:none;margin-top:12px">
            <p style="font-size:10px;font-weight:700;color:var(--text-tertiary);margin-bottom:6px">COVER IMAGE</p>
            <img id="preview-cover-img" style="width:100%;border-radius:12px;max-height:120px;object-fit:cover">
          </div>
        </div>

        <!-- ═══════════ AI Assistant Chat ═══════════ -->
        <div class="card card-lg" style="border-radius:24px;padding:0;overflow:hidden;margin-top:16px;position:sticky;top:420px;display:flex;flex-direction:column;max-height:480px">
          <!-- Header -->
          <div style="padding:14px 18px;background:linear-gradient(135deg,var(--red),var(--teal));color:#fff;display:flex;align-items:center;gap:10px">
            <div style="width:32px;height:32px;border-radius:10px;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:16px">🤖</div>
            <div style="flex:1">
              <p style="font-size:13px;font-weight:700">AI Job Assistant</p>
              <p style="font-size:9px;opacity:0.8">● Ask me to help fill any field</p>
            </div>
            <button id="ai-clear-chat" style="background:rgba(255,255,255,0.2);border:none;color:#fff;width:24px;height:24px;border-radius:8px;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center">🗑</button>
          </div>

          <!-- Messages -->
          <div id="ai-job-messages" style="flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:10px;min-height:180px;max-height:240px;background:rgba(255,255,255,0.3)">
            <div style="display:flex;gap:8px;align-items:flex-start">
              <div style="width:24px;height:24px;border-radius:8px;background:linear-gradient(135deg,var(--red),var(--teal));display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">🤖</div>
              <div style="background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:0 12px 12px 12px;padding:10px 12px;max-width:90%;font-size:11px;line-height:1.6;color:var(--text-primary)">
                <p>Hi! I can help you fill out this job posting. Try:</p>
                <ul style="margin:4px 0 0 14px;font-size:10px;color:var(--text-secondary);line-height:1.8">
                  <li>Suggest a description for [job title]</li>
                  <li>What requirements for a [role]?</li>
                  <li>Suggest benefits & salary range</li>
                  <li>Write a full job post for me</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Quick Suggestion Chips -->
          <div id="ai-job-chips" style="padding:6px 12px;display:flex;gap:4px;overflow-x:auto;border-top:1px solid var(--glass-border);flex-shrink:0">
            <button class="ai-prompt-chip ai-job-chip" data-prompt="Suggest a job description" style="font-size:10px;padding:4px 10px">📝 Description</button>
            <button class="ai-prompt-chip ai-job-chip" data-prompt="Suggest key requirements" style="font-size:10px;padding:4px 10px">📋 Requirements</button>
            <button class="ai-prompt-chip ai-job-chip" data-prompt="Suggest preferred skills" style="font-size:10px;padding:4px 10px">⚡ Skills</button>
            <button class="ai-prompt-chip ai-job-chip" data-prompt="Fill all fields for me" style="font-size:10px;padding:4px 10px">✨ Fill All</button>
          </div>

          <!-- Input -->
          <div style="padding:10px 12px;border-top:1px solid var(--glass-border);display:flex;gap:6px;align-items:center;flex-shrink:0">
            <input type="text" id="ai-job-input" placeholder="Ask AI to help fill fields…" style="flex:1;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:12px;padding:8px 12px;font-size:12px;outline:none">
            <button id="ai-job-send" style="width:34px;height:34px;border-radius:12px;background:linear-gradient(135deg,var(--red),var(--teal));border:none;color:#fff;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center">➤</button>
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

    /* ─── Photo Upload ─── */
    const photoZone = page.querySelector('#photo-drop-zone');
    const photoInput = page.querySelector('#photo-file-input');
    const photoPreview = page.querySelector('#photo-preview');
    const photoImg = page.querySelector('#photo-preview-img');
    let uploadedPhoto = null;

    photoZone.addEventListener('click', () => photoInput.click());
    photoZone.addEventListener('dragover', e => { e.preventDefault(); photoZone.style.borderColor = 'var(--teal)'; });
    photoZone.addEventListener('dragleave', () => { photoZone.style.borderColor = 'var(--glass-border)'; });
    photoZone.addEventListener('drop', e => {
      e.preventDefault(); photoZone.style.borderColor = 'var(--glass-border)';
      const f = Array.from(e.dataTransfer.files).find(f => f.type.startsWith('image/'));
      if (f) showPhoto(f);
    });
    photoInput.addEventListener('change', () => { if (photoInput.files[0]) showPhoto(photoInput.files[0]); });

    function showPhoto(file) {
      uploadedPhoto = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        photoImg.src = e.target.result;
        photoPreview.style.display = 'block';
        photoZone.style.display = 'none';
        // Update sidebar preview
        const pcv = page.querySelector('#preview-cover');
        pcv.style.display = 'block';
        page.querySelector('#preview-cover-img').src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    page.querySelector('#photo-remove').addEventListener('click', () => {
      uploadedPhoto = null; photoPreview.style.display = 'none'; photoZone.style.display = 'block';
      page.querySelector('#preview-cover').style.display = 'none';
    });

    /* ─── Schedule Toggle ─── */
    const scheduleFields = page.querySelector('#schedule-fields');
    page.querySelectorAll('input[name="publish-mode"]').forEach(r => {
      r.addEventListener('change', () => {
        scheduleFields.style.display = r.value === 'schedule' && r.checked ? 'block' : 'none';
        const pubBtn = page.querySelector('#publish-btn');
        if (r.value === 'schedule' && r.checked) {
          pubBtn.innerHTML = '📅 Schedule Post';
        } else {
          pubBtn.innerHTML = '🚀 Publish Job';
        }
      });
    });

    /* ─── Social Sharing – Connect & Toggles ─── */
    const socialPlatforms = {
      linkedin: { name:'LinkedIn', color:'#0A66C2', icon:'in', connected:false, page:'', followers:'' },
      facebook: { name:'Facebook Page', color:'#1877F2', icon:'f', connected:false, page:'', followers:'' },
      telegram: { name:'Telegram Channel', color:'#2AABEE', icon:'✈', connected:false, page:'', followers:'' },
    };

    function updateSocialPreview() {
      const li = page.querySelector('#share-linkedin').checked;
      const fb = page.querySelector('#share-facebook').checked;
      const tg = page.querySelector('#share-telegram').checked;
      page.querySelector('#linkedin-custom').style.display = li ? 'block' : 'none';
      page.querySelector('#facebook-custom').style.display = fb ? 'block' : 'none';
      const icons = [];
      if (li) icons.push('<span style="font-size:10px;padding:3px 10px;border-radius:6px;background:rgba(10,102,194,0.1);color:#0A66C2;font-weight:600">in LinkedIn</span>');
      if (fb) icons.push('<span style="font-size:10px;padding:3px 10px;border-radius:6px;background:rgba(24,119,242,0.1);color:#1877F2;font-weight:600">f Facebook</span>');
      if (tg) icons.push('<span style="font-size:10px;padding:3px 10px;border-radius:6px;background:rgba(42,171,238,0.1);color:#2AABEE;font-weight:600">✈ Telegram</span>');
      page.querySelector('#preview-social-icons').innerHTML = icons.length > 0 ? icons.join('') : '<span style="font-size:10px;color:var(--text-tertiary);padding:3px 8px;border-radius:6px;background:var(--glass-bg);border:1px solid var(--glass-border)">No platforms selected</span>';
    }

    /* Toggle switch styling + event (only works after connected) */
    page.querySelectorAll('.social-share-card input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', function() {
        const track = this.parentElement.querySelector('.toggle-track');
        const thumb = this.parentElement.querySelector('.toggle-thumb');
        if (this.checked) {
          track.style.background = 'var(--teal)'; thumb.style.left = '22px';
        } else {
          track.style.background = 'var(--glass-border)'; thumb.style.left = '2px';
        }
        updateSocialPreview();
      });
    });

    /* Connect button → opens linking modal */
    page.querySelectorAll('.social-connect-btn').forEach(btn => {
      btn.onclick = () => openSocialConnectModal(btn.dataset.platform);
    });

    function openSocialConnectModal(platform) {
      const existing = document.getElementById('socialConnectModal');
      if (existing) existing.remove();

      const p = socialPlatforms[platform];
      const fieldConfigs = {
        linkedin: {
          fields: [
            { id:'sc-page-url', label:'LinkedIn Company Page URL', placeholder:'https://www.linkedin.com/company/metfone', icon:'🔗' },
            { id:'sc-page-name', label:'Page / Company Name', placeholder:'Metfone Cambodia', icon:'🏢' },
          ],
          authLabel: 'Sign in with LinkedIn',
          authNote: 'You\'ll be redirected to LinkedIn to authorize Metfone Smart HR to post on behalf of your company page.',
          perms: ['Post job updates on your company page','View page follower count','Manage job postings'],
        },
        facebook: {
          fields: [
            { id:'sc-page-url', label:'Facebook Page URL', placeholder:'https://www.facebook.com/MetfoneCareers', icon:'🔗' },
            { id:'sc-page-name', label:'Page Name', placeholder:'Metfone Careers', icon:'📄' },
          ],
          authLabel: 'Continue with Facebook',
          authNote: 'You\'ll be redirected to Facebook to grant page posting permission to Metfone Smart HR.',
          perms: ['Publish posts to your Page','Upload photos and job cards','View Page insights & followers'],
        },
        telegram: {
          fields: [
            { id:'sc-page-url', label:'Telegram Channel Username', placeholder:'@MetfoneJobs', icon:'@' },
            { id:'sc-page-name', label:'Channel Name', placeholder:'Metfone Jobs Cambodia', icon:'📢' },
            { id:'sc-bot-token', label:'Bot Token (from @BotFather)', placeholder:'123456789:ABCdefGHIjklMNOpqrsTUVwxyz', icon:'🤖' },
          ],
          authLabel: 'Verify Channel Connection',
          authNote: 'Add the Metfone HR Bot as admin to your channel, then paste the bot token above.',
          perms: ['Send messages to channel','Post job cards with image','Pin important job posts'],
        },
      };
      const cfg = fieldConfigs[platform];

      const overlay = document.createElement('div');
      overlay.id = 'socialConnectModal';
      overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);backdrop-filter:blur(6px);animation:fadeIn 0.3s ease';
      overlay.innerHTML = `
        <div style="width:500px;max-width:95vw;max-height:90vh;background:var(--card-bg,#fff);border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,0.18);overflow:hidden;display:flex;flex-direction:column;animation:slideUp 0.35s cubic-bezier(0.25,0.1,0.25,1)">
          <!-- Header -->
          <div style="padding:20px 24px;border-bottom:1px solid var(--border);background:linear-gradient(135deg,${p.color}08,${p.color}03)">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:40px;height:40px;border-radius:12px;background:${p.color};display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;font-weight:800">${p.icon}</div>
                <div>
                  <h3 style="font-size:15px;font-weight:700">Connect ${p.name}</h3>
                  <p style="font-size:11px;color:var(--text-tertiary)">Link your account to share job postings</p>
                </div>
              </div>
              <button id="sc-close" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--text-tertiary)">✕</button>
            </div>
          </div>

          <!-- Body -->
          <div style="overflow-y:auto;flex:1;padding:20px 24px">
            <!-- Step Indicator -->
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px">
              <div style="display:flex;align-items:center;gap:4px">
                <span style="width:24px;height:24px;border-radius:50%;background:${p.color};color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center">1</span>
                <span style="font-size:11px;font-weight:600;color:${p.color}">Page Details</span>
              </div>
              <div style="flex:1;height:2px;background:var(--glass-border);border-radius:1px"></div>
              <div style="display:flex;align-items:center;gap:4px">
                <span style="width:24px;height:24px;border-radius:50%;background:var(--glass-border);color:var(--text-tertiary);font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center">2</span>
                <span style="font-size:11px;font-weight:600;color:var(--text-tertiary)">Authorize</span>
              </div>
            </div>

            ${cfg.fields.map(f => `
              <div style="margin-bottom:14px">
                <label style="font-size:10px;font-weight:700;color:var(--text-tertiary);display:block;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px">${f.icon} ${f.label}</label>
                <input id="${f.id}" type="text" placeholder="${f.placeholder}" style="width:100%;padding:11px 14px;border:1.5px solid var(--glass-border);border-radius:12px;font-size:12px;background:var(--glass-bg);transition:border-color 0.2s">
              </div>
            `).join('')}

            <!-- Permissions -->
            <div style="margin-top:18px;padding:14px 16px;border-radius:14px;background:rgba(0,167,157,0.03);border:1px solid rgba(0,167,157,0.1)">
              <p style="font-size:10px;font-weight:700;color:var(--teal);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">🔒 Permissions Required</p>
              ${cfg.perms.map(pm => `
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                  <span style="color:var(--teal);font-size:11px">✓</span>
                  <span style="font-size:11px;color:var(--text-secondary)">${pm}</span>
                </div>
              `).join('')}
            </div>

            <!-- Auth Note -->
            <div style="margin-top:14px;padding:12px 14px;border-radius:12px;background:rgba(232,124,30,0.04);border:1px solid rgba(232,124,30,0.1)">
              <p style="font-size:11px;color:var(--text-secondary);line-height:1.5">ℹ️ ${cfg.authNote}</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding:14px 24px;border-top:1px solid var(--border);display:flex;justify-content:space-between">
            <button id="sc-cancel" style="padding:10px 20px;border-radius:12px;border:1.5px solid var(--glass-border);background:transparent;font-size:12px;font-weight:600;cursor:pointer;color:var(--text-secondary)">Cancel</button>
            <button id="sc-authorize" style="padding:10px 24px;border-radius:12px;border:none;background:${p.color};color:#fff;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:6px;box-shadow:0 4px 14px ${p.color}40;transition:all 0.15s">${p.icon === 'in' ? '🔗' : p.icon === 'f' ? '🔗' : '🤖'} ${cfg.authLabel}</button>
          </div>
        </div>
        <style>@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}</style>
      `;

      document.body.appendChild(overlay);

      const closeSC = () => { overlay.style.opacity='0'; overlay.style.transition='opacity 0.2s'; setTimeout(()=>overlay.remove(),200); };
      overlay.querySelector('#sc-close').onclick = closeSC;
      overlay.querySelector('#sc-cancel').onclick = closeSC;
      overlay.onclick = (e) => { if (e.target === overlay) closeSC(); };

      /* Authorize / Connect */
      overlay.querySelector('#sc-authorize').onclick = () => {
        const pageUrl = overlay.querySelector('#sc-page-url').value.trim();
        const pageName = overlay.querySelector('#sc-page-name').value.trim();
        if (!pageUrl) { overlay.querySelector('#sc-page-url').style.borderColor = 'var(--red)'; overlay.querySelector('#sc-page-url').focus(); return; }
        if (!pageName) { overlay.querySelector('#sc-page-name').style.borderColor = 'var(--red)'; overlay.querySelector('#sc-page-name').focus(); return; }
        if (platform === 'telegram') {
          const botToken = overlay.querySelector('#sc-bot-token').value.trim();
          if (!botToken) { overlay.querySelector('#sc-bot-token').style.borderColor = 'var(--red)'; overlay.querySelector('#sc-bot-token').focus(); return; }
        }

        const authBtn = overlay.querySelector('#sc-authorize');
        authBtn.innerHTML = '<span style="display:inline-block;animation:spin 0.8s linear infinite">⏳</span> Connecting…';
        authBtn.style.opacity = '0.7';
        authBtn.disabled = true;

        /* Simulate OAuth / connection delay */
        setTimeout(() => {
          /* Update step indicator */
          const steps = overlay.querySelectorAll('[style*="border-radius:50%"]');
          if (steps[3]) { steps[3].style.background = p.color; steps[3].style.color = '#fff'; }

          authBtn.innerHTML = '✅ Connected Successfully!';
          authBtn.style.background = 'var(--teal)';
          authBtn.style.opacity = '1';

          /* Update platform state */
          socialPlatforms[platform].connected = true;
          socialPlatforms[platform].page = pageName;
          socialPlatforms[platform].followers = platform === 'linkedin' ? '12.5K followers'
            : platform === 'facebook' ? '45.2K followers' : '8.1K subscribers';

          /* Update the card in the page */
          const card = page.querySelector('#social-' + platform);
          const statusEl = card.querySelector('.social-status');
          const connectBtn = card.querySelector('.social-connect-btn');
          const toggleWrap = card.querySelector('.social-toggle-wrap');

          statusEl.textContent = '✅ ' + pageName + ' · ' + socialPlatforms[platform].followers;
          statusEl.style.color = 'var(--teal)';
          connectBtn.style.display = 'none';
          toggleWrap.style.display = 'block';

          /* Add disconnect link */
          const disconnectLink = document.createElement('button');
          disconnectLink.style.cssText = 'background:none;border:none;font-size:10px;color:var(--text-tertiary);cursor:pointer;text-decoration:underline;margin-top:2px;display:block';
          disconnectLink.textContent = 'Disconnect';
          disconnectLink.onclick = () => {
            socialPlatforms[platform].connected = false;
            statusEl.textContent = '⚠ Not connected';
            statusEl.style.color = 'var(--red)';
            connectBtn.style.display = 'inline-flex';
            toggleWrap.style.display = 'none';
            disconnectLink.remove();
            /* Uncheck toggle */
            const cb = card.querySelector('input[type="checkbox"]');
            if (cb.checked) { cb.checked = false; cb.dispatchEvent(new Event('change')); }
          };
          statusEl.parentElement.appendChild(disconnectLink);

          setTimeout(() => closeSC(), 1000);
        }, 1500);
      };
    }

    /* ─── Save Draft ─── */
    page.querySelector('#save-draft-btn').addEventListener('click', () => {
      const toast = document.createElement('div');
      toast.style.cssText = 'position:fixed;bottom:30px;right:30px;padding:16px 24px;border-radius:16px;background:var(--teal);color:#fff;font-size:13px;font-weight:700;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,0.2);animation:fadeIn 0.3s';
      toast.textContent = '💾 Draft saved successfully!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    });

    /* ─── Publish / Schedule ─── */
    page.querySelector('#publish-btn').addEventListener('click', () => {
      const title = page.querySelector('#job-title').value.trim();
      const dept = page.querySelector('#job-dept').value;
      const desc = page.querySelector('#job-desc').value.trim();
      if (!title || !dept || !desc) {
        alert('Please fill in required fields: Job Title, Department, and Description.');
        return;
      }

      const isScheduled = page.querySelector('input[name="publish-mode"][value="schedule"]').checked;
      const schedDate = page.querySelector('#schedule-date')?.value;
      const schedTime = page.querySelector('#schedule-time')?.value;
      const li = page.querySelector('#share-linkedin').checked;
      const fb = page.querySelector('#share-facebook').checked;
      const tg = page.querySelector('#share-telegram').checked;

      const btn = page.querySelector('#publish-btn');
      btn.innerHTML = '⏳ Processing…'; btn.disabled = true; btn.style.opacity = '0.7';

      setTimeout(() => {
        btn.innerHTML = '✅ Done!'; btn.style.opacity = '1';

        const socials = [li && 'LinkedIn', fb && 'Facebook', tg && 'Telegram'].filter(Boolean);
        let msg = isScheduled && schedDate
          ? '📅 "' + title + '" scheduled for ' + schedDate + ' at ' + (schedTime || '09:00')
          : '🚀 "' + title + '" published successfully!';
        if (socials.length > 0) msg += '\n📢 Shared to: ' + socials.join(', ');
        if (uploadedPhoto) msg += '\n🖼️ Cover image attached';

        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;bottom:30px;right:30px;padding:18px 26px;border-radius:18px;background:var(--teal);color:#fff;font-size:13px;font-weight:700;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,0.2);animation:fadeIn 0.3s;white-space:pre-line;max-width:380px;line-height:1.6';
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(() => { toast.remove(); Router.navigate('/hr/jobs'); }, 3500);
      }, 1800);
    });

    /* ═══════════ AI Job Assistant Chat ═══════════ */
    const aiMsgs = page.querySelector('#ai-job-messages');
    const aiInput = page.querySelector('#ai-job-input');
    const aiSend = page.querySelector('#ai-job-send');

    function aiAddUser(text) {
      const d = document.createElement('div');
      d.style.cssText = 'display:flex;justify-content:flex-end;animation:fadeIn 0.3s';
      d.innerHTML = `<div style="background:linear-gradient(135deg,var(--red),#BE1E2D);color:#fff;border-radius:12px 0 12px 12px;padding:8px 12px;max-width:85%;font-size:11px;line-height:1.5">${text}</div>`;
      aiMsgs.appendChild(d);
      aiMsgs.scrollTop = aiMsgs.scrollHeight;
    }

    function aiAddBot(html) {
      const d = document.createElement('div');
      d.style.cssText = 'display:flex;gap:8px;align-items:flex-start;animation:fadeIn 0.3s';
      d.innerHTML = `<div style="width:24px;height:24px;border-radius:8px;background:linear-gradient(135deg,var(--red),var(--teal));display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">🤖</div>` +
        `<div style="background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:0 12px 12px 12px;padding:10px 12px;max-width:90%;font-size:11px;line-height:1.6;color:var(--text-primary)">${html}</div>`;
      aiMsgs.appendChild(d);
      aiMsgs.scrollTop = aiMsgs.scrollHeight;
    }

    function aiShowTyping() {
      const d = document.createElement('div');
      d.id = 'ai-job-typing';
      d.style.cssText = 'display:flex;gap:8px;align-items:flex-start;animation:fadeIn 0.2s';
      d.innerHTML = `<div style="width:24px;height:24px;border-radius:8px;background:linear-gradient(135deg,var(--red),var(--teal));display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">🤖</div>` +
        `<div style="background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:0 12px 12px 12px;padding:8px 12px;font-size:11px;color:var(--text-tertiary)"><span class="typing-dots">Thinking<span>.</span><span>.</span><span>.</span></span></div>`;
      aiMsgs.appendChild(d);
      aiMsgs.scrollTop = aiMsgs.scrollHeight;
    }
    function aiRemoveTyping() { const t = page.querySelector('#ai-job-typing'); if (t) t.remove(); }

    function getFormCtx() {
      return {
        title: page.querySelector('#job-title').value.trim(),
        dept: page.querySelector('#job-dept').value,
        type: page.querySelector('#job-type').value,
      };
    }

    function aiRespond(query) {
      const q = query.toLowerCase();
      const ctx = getFormCtx();
      const role = ctx.title || 'the position';
      const dept = ctx.dept || 'your department';

      /* Fill All Fields */
      if (q.includes('fill all') || q.includes('fill everything') || q.includes('auto fill') || q.includes('complete all')) {
        const title = ctx.title || 'Software Engineer';
        const deptVal = ctx.dept || 'IT Department';
        if (!ctx.title) { page.querySelector('#job-title').value = title; page.querySelector('#job-title').dispatchEvent(new Event('input')); }
        if (!ctx.dept) { const sel = page.querySelector('#job-dept'); for (let o of sel.options) { if (o.text === deptVal) { o.selected = true; break; } } sel.dispatchEvent(new Event('change')); }
        if (!ctx.type) { const sel = page.querySelector('#job-type'); sel.selectedIndex = 1; sel.dispatchEvent(new Event('change')); }

        const descs = {
          'IT Department': `We are seeking a skilled ${title} to join our ${deptVal}. You will work on building and maintaining critical systems, collaborating with cross-functional teams, and contributing to Metfone\u2019s digital transformation.\n\nResponsibilities:\n\u2022 Design, develop, and maintain high-quality solutions\n\u2022 Collaborate with product managers and designers\n\u2022 Write clean, testable, and efficient code\n\u2022 Participate in code reviews and knowledge sharing\n\u2022 Troubleshoot and debug production issues`,
          'HR Department': `We are looking for a dedicated ${title} to strengthen our HR team. You will support recruitment, employee relations, and organizational development.\n\nResponsibilities:\n\u2022 Support end-to-end recruitment processes\n\u2022 Maintain employee records and HR documentation\n\u2022 Assist with onboarding and orientation programs\n\u2022 Handle employee inquiries and engagement\n\u2022 Prepare HR reports and analytics`,
          'Marketing': `Join our Marketing team as a ${title}! Drive brand awareness, execute campaigns, and contribute to market leadership.\n\nResponsibilities:\n\u2022 Plan and execute campaigns across channels\n\u2022 Create engaging content for digital platforms\n\u2022 Analyze campaign performance and optimize ROI\n\u2022 Coordinate with agencies and vendors\n\u2022 Support event planning and brand activations`,
          'Finance': `We seek an experienced ${title} for Finance. Maintain accurate financial records and support strategic planning.\n\nResponsibilities:\n\u2022 Prepare financial statements and reports\n\u2022 Manage accounts payable/receivable\n\u2022 Support budgeting and forecasting\n\u2022 Ensure regulatory compliance\n\u2022 Assist with audits`,
          'Operations': `We are hiring a ${title} to optimize operational processes and ensure excellent service delivery.\n\nResponsibilities:\n\u2022 Oversee daily operations\n\u2022 Identify process improvements\n\u2022 Manage vendor relationships\n\u2022 Track KPIs and prepare reports\n\u2022 Coordinate cross-departmental initiatives`,
        };
        page.querySelector('#job-desc').value = descs[deptVal] || descs['IT Department'];

        const reqSets = {
          'IT Department': ['3+ years of relevant technical experience', "Bachelor's degree in Computer Science or related field", 'Strong problem-solving and analytical skills', 'Experience with agile methodologies', 'Excellent English communication'],
          'HR Department': ['2+ years of HR experience', "Bachelor's in Human Resources or Business Admin", 'Knowledge of Cambodia labor laws', 'Strong interpersonal skills', 'Proficiency in HRIS systems'],
          'Marketing': ['2+ years marketing experience', "Bachelor's in Marketing or Communications", 'Digital marketing tools & analytics experience', 'Strong copywriting and creativity', 'Proficient in Khmer and English'],
          'Finance': ['3+ years accounting/finance experience', "Bachelor's in Accounting or Finance", 'Knowledge of IFRS standards', 'Advanced Excel and financial modeling', 'ACCA or CPA preferred'],
          'Operations': ['3+ years operations management', "Bachelor's in Business or related field", 'Strong project management skills', 'Process optimization experience', 'Excellent leadership abilities'],
        };
        const reqs = reqSets[deptVal] || reqSets['IT Department'];
        const reqList = page.querySelector('#req-list');
        reqList.innerHTML = '';
        reqs.forEach(r => {
          const row = document.createElement('div');
          row.className = 'req-item'; row.style.cssText = 'display:flex;gap:8px;align-items:center';
          row.innerHTML = `<input type="text" value="${r}" style="flex:1"><button class="remove-req" style="width:32px;height:32px;border-radius:50%;background:rgba(237,28,36,0.08);color:var(--red);border:none;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0">\u00d7</button>`;
          reqList.appendChild(row);
        });

        const skillSets = { 'IT Department':'Python, JavaScript, SQL, Git, CI/CD, Agile, Cloud (AWS)', 'HR Department':'Recruitment, ATS Systems, MS Office, Payroll, Onboarding, Khmer & English', 'Marketing':'Google Analytics, Social Media, Copywriting, SEO, Adobe Suite', 'Finance':'Excel, SAP, Financial Reporting, Budgeting, IFRS', 'Operations':'Project Management, Lean/Six Sigma, ERP, KPI Tracking, Leadership' };
        page.querySelector('#job-skills').value = skillSets[deptVal] || skillSets['IT Department'];
        page.querySelector('#job-min-exp').value = deptVal === 'HR Department' ? '2' : '3';

        // Check first 6 benefits
        page.querySelectorAll('#benefits-grid input[type="checkbox"]').forEach((cb, i) => { if (i < 6) cb.checked = true; });

        return `<p style="font-weight:700;color:var(--teal)">\u2705 All fields filled!</p>` +
          `<ul style="margin:4px 0 0 14px;font-size:10px;line-height:1.8"><li>\u2713 Description with responsibilities</li><li>\u2713 ${reqs.length} key requirements</li><li>\u2713 Preferred skills</li><li>\u2713 Min experience set</li><li>\u2713 6 benefits selected</li></ul>` +
          `<p style="margin-top:6px;font-size:10px;color:var(--text-tertiary)">\ud83d\udca1 Review and customize before publishing!</p>`;
      }

      /* Description */
      if (q.includes('description') || q.includes('describe') || q.includes('write about')) {
        page.querySelector('#job-desc').value = `We are seeking a talented ${role} to join our ${dept} at Metfone. This role is key to driving innovation and excellence.\n\nAs a ${role}, you will collaborate with cross-functional teams, contribute to strategic initiatives, and help shape Cambodia\u2019s telecom future.\n\nKey Responsibilities:\n\u2022 Lead and deliver projects within your domain\n\u2022 Collaborate with stakeholders to implement solutions\n\u2022 Mentor junior team members\n\u2022 Continuously improve processes\n\u2022 Report on progress and outcomes`;
        return `<p style="font-weight:700;color:var(--teal)">\u2705 Description filled!</p><p style="margin-top:4px;font-size:10px">Professional description for <strong>${role}</strong> in <strong>${dept}</strong>.</p><p style="margin-top:4px;font-size:10px;color:var(--text-tertiary)">\ud83d\udca1 Ask "make it more formal" to adjust tone.</p>`;
      }

      /* Requirements */
      if (q.includes('requirement') || q.includes('qualif') || q.includes('criteria')) {
        const reqs2 = ['3+ years of relevant professional experience', "Bachelor's degree in a related field", 'Strong analytical and problem-solving abilities', 'Excellent communication in Khmer and English', 'Proven ability to work in fast-paced teams'];
        const reqList2 = page.querySelector('#req-list'); reqList2.innerHTML = '';
        reqs2.forEach(r => {
          const row = document.createElement('div'); row.className = 'req-item'; row.style.cssText = 'display:flex;gap:8px;align-items:center';
          row.innerHTML = `<input type="text" value="${r}" style="flex:1"><button class="remove-req" style="width:32px;height:32px;border-radius:50%;background:rgba(237,28,36,0.08);color:var(--red);border:none;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0">\u00d7</button>`;
          reqList2.appendChild(row);
        });
        return `<p style="font-weight:700;color:var(--teal)">\u2705 ${reqs2.length} requirements added!</p><ul style="margin:6px 0 0 14px;font-size:10px;line-height:1.8">${reqs2.map(r => `<li>${r}</li>`).join('')}</ul>`;
      }

      /* Skills */
      if (q.includes('skill') || q.includes('competenc')) {
        const skills = ctx.dept === 'IT Department' ? 'Python, JavaScript, SQL, Git, Cloud (AWS), Agile, System Design'
          : ctx.dept === 'HR Department' ? 'Recruitment, ATS, Payroll, Onboarding, MS Office, Khmer & English'
          : ctx.dept === 'Marketing' ? 'Google Analytics, Social Media, Copywriting, SEO, Content Strategy'
          : ctx.dept === 'Finance' ? 'Excel, SAP, Financial Modeling, IFRS, Budgeting, Auditing'
          : 'Leadership, Communication, Problem-Solving, Project Management, MS Office';
        page.querySelector('#job-skills').value = skills;
        return `<p style="font-weight:700;color:var(--teal)">\u2705 Skills filled!</p><p style="margin-top:4px;font-size:10px">${skills}</p>`;
      }

      /* Salary */
      if (q.includes('salary') || q.includes('compensation') || q.includes('pay range')) {
        const ranges = { 'IT Department':{min:1000,max:2000}, 'HR Department':{min:700,max:1200}, 'Marketing':{min:700,max:1300}, 'Finance':{min:1000,max:1800}, 'Operations':{min:800,max:1500} };
        const rng = ranges[ctx.dept] || {min:800,max:1500};
        const salInputs = page.querySelectorAll('input[type="number"][placeholder="Min"], input[type="number"][placeholder="Max"]');
        if (salInputs.length >= 2) { salInputs[0].value = rng.min; salInputs[1].value = rng.max; }
        return `<p style="font-weight:700;color:var(--teal)">\u2705 Salary set!</p><p style="margin-top:4px;font-size:10px">Range: <strong>$${rng.min} \u2013 $${rng.max}/month</strong> based on Cambodia market data for ${dept}.</p>`;
      }

      /* Benefits */
      if (q.includes('benefit') || q.includes('perk')) {
        page.querySelectorAll('#benefits-grid input[type="checkbox"]').forEach((cb, i) => { if (i < 6) cb.checked = true; });
        return `<p style="font-weight:700;color:var(--teal)">\u2705 6 benefits selected!</p><p style="margin-top:4px;font-size:10px">Health Insurance, Annual Leave, Performance Bonus, Training, Meal & Transport Allowance.</p>`;
      }

      /* Formal tone */
      if (q.includes('formal') || q.includes('professional') || q.includes('tone')) {
        const cur = page.querySelector('#job-desc').value;
        if (cur) {
          page.querySelector('#job-desc').value = cur.replace(/We are seeking/g, 'Metfone invites applications from qualified professionals for the role of').replace(/you will/gi, 'the successful candidate will').replace(/Join our/gi, 'Metfone is pleased to announce an opening in our');
          return `<p style="font-weight:700;color:var(--teal)">\u2705 Tone updated to formal!</p><p style="margin-top:4px;font-size:10px;color:var(--text-tertiary)">Description has been rewritten in a more professional tone.</p>`;
        }
        return `<p>No description yet. Ask me to "suggest a description" first!</p>`;
      }

      /* Experience */
      if (q.includes('experience') || q.includes('years')) {
        const yrs = ctx.dept === 'Finance' || ctx.dept === 'IT Department' ? 3 : 2;
        page.querySelector('#job-min-exp').value = yrs;
        return `<p style="font-weight:700;color:var(--teal)">\u2705 Experience set to ${yrs} years</p><p style="margin-top:4px;font-size:10px">Based on market standards for ${dept}.</p>`;
      }

      /* Catch-all help */
      return `<p>I can help you fill the <strong>${role}</strong> posting:</p>` +
        `<ul style="margin:6px 0 0 14px;font-size:10px;line-height:1.8;color:var(--text-secondary)">` +
        `<li><strong>"Fill all fields"</strong> \u2014 auto-complete everything</li>` +
        `<li><strong>"Suggest description"</strong> \u2014 write job description</li>` +
        `<li><strong>"Suggest requirements"</strong> \u2014 add requirements</li>` +
        `<li><strong>"Suggest skills"</strong> \u2014 fill preferred skills</li>` +
        `<li><strong>"Salary range"</strong> \u2014 set competitive salary</li>` +
        `<li><strong>"Benefits"</strong> \u2014 select common perks</li>` +
        `<li><strong>"Make it formal"</strong> \u2014 adjust tone</li></ul>` +
        `<p style="margin-top:6px;font-size:10px;color:var(--text-tertiary)">\ud83d\udca1 Set Job Title & Department first for better suggestions!</p>`;
    }

    function aiSendMsg(text) {
      if (!text.trim()) return;
      aiAddUser(text);
      aiInput.value = '';
      aiShowTyping();
      setTimeout(() => {
        aiRemoveTyping();
        aiAddBot(aiRespond(text));
      }, 600 + Math.random() * 800);
    }

    aiSend.addEventListener('click', () => aiSendMsg(aiInput.value));
    aiInput.addEventListener('keydown', e => { if (e.key === 'Enter') aiSendMsg(aiInput.value); });
    page.querySelectorAll('.ai-job-chip').forEach(chip => {
      chip.addEventListener('click', () => aiSendMsg(chip.dataset.prompt));
    });
    page.querySelector('#ai-clear-chat').addEventListener('click', () => {
      aiMsgs.innerHTML = '';
      aiAddBot('Chat cleared! How can I help with your job posting? \ud83d\ude80');
    });
  });

  return page;
});
