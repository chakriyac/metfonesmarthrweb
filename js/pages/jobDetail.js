/* ─── Job Detail Page ─── */
Router.register('/jobs/:id', function renderJobDetail() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/home'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div style="max-width:860px;margin:0 auto">
      <!-- Hero -->
      <div class="hero-card" style="margin-bottom:20px;padding:28px 32px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px">
          <button class="btn-glass" onclick="Router.navigate('/home')" style="width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;padding:0">←</button>
          <button class="btn-glass" style="width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;padding:0">🔖</button>
        </div>
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">
          <div class="logo-glass" style="width:48px;height:48px;border-radius:50%">
            ${logoHTML('sm')}
          </div>
          <div>
            <h1 style="font-family:var(--font-display);font-size:22px;font-weight:800">Recruitment Officer</h1>
            <p style="font-size:12px;color:var(--text-secondary)">Metfone · Phnom Penh, Cambodia</p>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span class="badge badge-gray">Full-time</span>
          <span class="badge badge-gray">Onsite</span>
          <span class="badge badge-red">Urgent</span>
          <span style="margin-left:auto;font-family:var(--font-display);font-size:22px;font-weight:800">$800<span style="font-size:13px;font-weight:400;color:var(--text-secondary)">/mo</span></span>
        </div>
      </div>

      <!-- Info Row -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">
        <div class="card" style="text-align:center;padding:14px 10px">
          <p style="font-size:10px;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:3px">EXPERIENCE</p>
          <p style="font-size:14px;font-weight:700">1-3 yrs</p>
        </div>
        <div class="card" style="text-align:center;padding:14px 10px">
          <p style="font-size:10px;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:3px">LEVEL</p>
          <p style="font-size:14px;font-weight:700">Junior</p>
        </div>
        <div class="card" style="text-align:center;padding:14px 10px">
          <p style="font-size:10px;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:3px">DEADLINE</p>
          <p style="font-size:14px;font-weight:700">Dec 31</p>
        </div>
      </div>

      <!-- Description -->
      <div class="card card-lg" style="margin-bottom:14px">
        <h3 style="font-family:var(--font-display);font-size:15px;font-weight:700;margin-bottom:8px">Description</h3>
        <p style="font-size:13px;line-height:1.7;color:var(--text-secondary)">We are looking for a Recruitment Officer to manage the full hiring lifecycle, from sourcing candidates to onboarding new hires. You will collaborate with department heads to identify staffing needs.</p>
      </div>

      <!-- Requirements -->
      <div class="card card-lg" style="margin-bottom:20px">
        <h3 style="font-family:var(--font-display);font-size:15px;font-weight:700;margin-bottom:10px">Requirements</h3>
        <ul style="display:flex;flex-direction:column;gap:8px">
          ${[
            { color: 'var(--red)', text: "Bachelor's degree in HR or related field" },
            { color: 'var(--teal)', text: '1-3 years of recruitment experience' },
            { color: 'var(--orange)', text: 'Strong interpersonal & communication skills' },
            { color: 'var(--red)', text: 'Proficiency in HR software & ATS tools' },
            { color: 'var(--teal)', text: 'Fluent in Khmer and English' },
          ].map(r => `
            <li style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--text-secondary);line-height:1.5">
              <span style="width:7px;height:7px;border-radius:50%;background:${r.color};margin-top:5px;flex-shrink:0"></span>
              ${r.text}
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Actions -->
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-dark" style="flex:1;min-width:140px">Apply Now</button>
        <button class="btn-glass" style="flex:1;min-width:100px;color:var(--red)" onclick="Router.navigate('/chat/ai')">✦ Ask AI</button>
        <button class="btn-glass" style="flex:1;min-width:100px;color:var(--teal)" onclick="Router.navigate('/chat/hr')">💬 Chat HR</button>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
