/* ─── Application Tracking Page ─── */
Router.register('/tracking', function renderTracking() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/tracking'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div class="page-header">
          <h1>Application Tracking</h1>
          <p>Track your application progress in real time</p>
        </div>

        <!-- Job Hero Card -->
        <div class="hero-card" style="margin-bottom:28px;display:flex;align-items:center;gap:16px">
          <div class="logo-glass" style="width:48px;height:48px;border-radius:50%">
            ${logoHTML('sm')}
          </div>
          <div>
            <h2 style="font-family:var(--font-display);font-size:18px;font-weight:700">Recruitment Officer</h2>
            <p style="font-size:13px;color:var(--text-secondary)">Metfone · Phnom Penh</p>
            <p style="font-size:11px;color:var(--text-tertiary);margin-top:4px">Applied on Dec 2, 2024</p>
          </div>
        </div>

        <!-- Timeline -->
        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:20px">Progress Timeline</h3>
          <div class="timeline">
            <div class="timeline-step">
              <div class="dot done">✓</div>
              <h4>Application Submitted</h4>
              <p>Your application was successfully submitted.</p>
              <span class="date">Dec 2, 2024</span>
            </div>
            <div class="timeline-step">
              <div class="dot active"></div>
              <h4>Under Review</h4>
              <p>Your application is being reviewed by the hiring team.</p>
              <span class="date" style="color:var(--red)">In progress</span>
            </div>
            <div class="timeline-step">
              <div class="dot pending"></div>
              <h4 style="color:var(--text-tertiary)">Shortlisted</h4>
              <p>Awaiting shortlisting decision.</p>
              <span class="date">Pending</span>
            </div>
            <div class="timeline-step">
              <div class="dot pending"></div>
              <h4 style="color:var(--text-tertiary)">Interview Scheduled</h4>
              <p>Interview will be scheduled after shortlisting.</p>
              <span class="date">Pending</span>
            </div>
            <div class="timeline-step">
              <div class="dot pending"></div>
              <h4 style="color:var(--text-tertiary)">Offer / Result</h4>
              <p>Final decision on your application.</p>
              <span class="date">Pending</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Tips -->
      <div class="col-side">
        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:16px">Tips while you wait</h3>
          <ul style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px">
            ${[
              { color: 'var(--teal)', text: 'Keep your profile updated' },
              { color: 'var(--red)', text: 'Prepare common interview Q&A' },
              { color: 'var(--orange)', text: 'Research the company thoroughly' },
              { color: 'var(--teal)', text: 'Have references ready' },
            ].map(t => `
              <li style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--text-secondary);line-height:1.5">
                <span style="width:7px;height:7px;border-radius:50%;background:${t.color};margin-top:5px;flex-shrink:0"></span>
                ${t.text}
              </li>
            `).join('')}
          </ul>
          <button class="btn btn-dark" style="width:100%;font-size:13px;padding:12px 24px" onclick="Router.navigate('/chat/ai')">✦ Ask AI for interview prep</button>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
