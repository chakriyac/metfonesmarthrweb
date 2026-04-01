/* ─── Job Detail Page ─── */
Router.register('/jobs/:id', function renderJobDetail() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/jobs'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <!-- Hero -->
        <div class="hero-card" style="margin-bottom:24px;padding:32px 36px">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px">
            <button class="btn-glass" onclick="Router.navigate('/home')" style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;padding:0">←</button>
            <button class="btn-glass" style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;padding:0">🔖</button>
          </div>
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">
            <div class="logo-glass" style="width:56px;height:56px;border-radius:50%">
              ${logoHTML('md')}
            </div>
            <div>
              <h1 style="font-family:var(--font-display);font-size:24px;font-weight:800">Recruitment Officer</h1>
              <p style="font-size:13px;color:var(--text-secondary)">Metfone · Phnom Penh, Cambodia</p>
            </div>
          </div>
          <div style="display:flex;gap:8px;margin-bottom:12px">
            <span class="badge badge-gray">Full-time</span>
            <span class="badge badge-gray">Onsite</span>
            <span class="badge badge-red">Urgent</span>
          </div>
          <p style="font-family:var(--font-display);font-size:28px;font-weight:800">$800 <span style="font-size:14px;font-weight:400;color:var(--text-secondary)">/month</span></p>
        </div>

        <!-- Info Row -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px">
          <div class="card" style="text-align:center">
            <p style="font-size:10px;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:4px">EXPERIENCE</p>
            <p style="font-size:15px;font-weight:700">1-3 yrs</p>
          </div>
          <div class="card" style="text-align:center">
            <p style="font-size:10px;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:4px">LEVEL</p>
            <p style="font-size:15px;font-weight:700">Junior</p>
          </div>
          <div class="card" style="text-align:center">
            <p style="font-size:10px;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:4px">DEADLINE</p>
            <p style="font-size:15px;font-weight:700">Dec 31</p>
          </div>
        </div>

        <!-- Description -->
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:10px">Description</h3>
          <p style="font-size:13px;line-height:1.7;color:var(--text-secondary)">We are looking for a Recruitment Officer to manage the full hiring lifecycle, from sourcing candidates to onboarding new hires. You will collaborate with department heads to identify staffing needs.</p>
        </div>

        <!-- Requirements -->
        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Requirements</h3>
          <ul style="display:flex;flex-direction:column;gap:10px">
            ${[
              { color: 'var(--red)', text: "Bachelor's degree in HR or related field" },
              { color: 'var(--teal)', text: '1-3 years of recruitment experience' },
              { color: 'var(--orange)', text: 'Strong interpersonal & communication skills' },
              { color: 'var(--red)', text: 'Proficiency in HR software & ATS tools' },
              { color: 'var(--teal)', text: 'Fluent in Khmer and English' },
            ].map(r => `
              <li style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--text-secondary);line-height:1.5">
                <span style="width:8px;height:8px;border-radius:50%;background:${r.color};margin-top:5px;flex-shrink:0"></span>
                ${r.text}
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <!-- Right Panel: Quick Apply -->
      <div class="col-side">
        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:16px">Quick Apply</h3>

          <div style="border:2px dashed var(--glass-border);border-radius:16px;padding:32px 16px;text-align:center;margin-bottom:20px;cursor:pointer;background:var(--glass-bg-light);backdrop-filter:blur(8px)">
            <p style="font-size:20px;margin-bottom:4px">↑</p>
            <p style="font-size:13px;font-weight:600;margin-bottom:2px">Upload CV</p>
            <p style="font-size:11px;color:var(--text-tertiary)">PDF or DOCX, max 5MB</p>
          </div>

          <button class="btn btn-dark" style="width:100%;margin-bottom:16px">Apply Now</button>

          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn-glass" style="width:100%;justify-content:flex-start;gap:8px;color:var(--red);border-color:rgba(237,28,36,0.2)" onclick="Router.navigate('/chat/ai')">✦ Ask AI</button>
            <button class="btn-glass" style="width:100%;justify-content:flex-start;gap:8px;color:var(--teal);border-color:rgba(0,167,157,0.2)" onclick="Router.navigate('/chat/hr')">💬 Chat HR</button>
            <button class="btn-glass" style="width:100%;justify-content:flex-start;gap:8px;color:var(--orange);border-color:rgba(232,124,30,0.2)">📞 Call HR</button>
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
