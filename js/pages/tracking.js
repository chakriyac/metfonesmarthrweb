/* ─── Application Tracking Page ─── */
Router.register('/tracking', function renderTracking() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/tracking'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div style="max-width:700px">
      <!-- Job Header -->
      <div class="card" style="display:flex;align-items:center;gap:14px;padding:16px 20px;margin-bottom:20px">
        <div class="logo-glass" style="width:42px;height:42px;border-radius:50%">
          ${logoHTML('sm')}
        </div>
        <div style="flex:1">
          <h1 style="font-family:var(--font-display);font-size:17px;font-weight:700">Recruitment Officer</h1>
          <p style="font-size:11px;color:var(--text-tertiary)">Metfone · Phnom Penh · Applied Dec 2, 2024</p>
        </div>
        <span class="badge badge-red">In Review</span>
      </div>

      <!-- Timeline -->
      <div class="card card-lg">
        <h3 style="font-family:var(--font-display);font-size:15px;font-weight:700;margin-bottom:20px">Progress Timeline</h3>
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

      <!-- Inline action -->
      <div style="margin-top:16px;display:flex;gap:10px">
        <button class="btn btn-dark" style="flex:1;font-size:13px" onclick="Router.navigate('/chat/ai')">✦ AI Interview Prep</button>
        <button class="btn-glass" style="flex:1;font-size:13px" onclick="Router.navigate('/chat/hr')">💬 Chat HR</button>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
