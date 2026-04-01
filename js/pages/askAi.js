/* ─── Ask AI Chat Page ─── */
Router.register('/chat/ai', function renderAskAi() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/chat/hr'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col" style="height:calc(100vh - 64px)">
      <div class="col-main" style="display:flex;flex-direction:column">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
          <div class="avatar avatar-md" style="background:linear-gradient(135deg,#ED1C24,#E87C1E);color:white;font-weight:700">AI</div>
          <div>
            <h1 style="font-family:var(--font-display);font-size:20px;font-weight:700">Ask AI</h1>
            <p style="font-size:12px;color:var(--text-tertiary)">AI-powered job assistant · About: Recruitment Officer</p>
          </div>
        </div>

        <div class="chat-container" style="flex:1;overflow-y:auto">
          <div class="chat-msg">
            <div class="avatar avatar-sm" style="background:linear-gradient(135deg,#ED1C24,#E87C1E);color:white;font-size:9px;flex-shrink:0">AI</div>
            <div class="bubble">
              <p>Hello! I'm your AI job assistant. I can help you understand the <strong>Recruitment Officer</strong> position at Metfone. What would you like to know?</p>
            </div>
          </div>

          <div class="chat-msg self">
            <div class="avatar avatar-sm" style="background:#FDE8E8;color:#ED1C24;font-size:9px;flex-shrink:0">SC</div>
            <div class="bubble">
              <p>What skills do I need for this role?</p>
            </div>
          </div>

          <div class="chat-msg">
            <div class="avatar avatar-sm" style="background:linear-gradient(135deg,#ED1C24,#E87C1E);color:white;font-size:9px;flex-shrink:0">AI</div>
            <div class="bubble">
              <p>Great question! The key skills for the Recruitment Officer role include:</p>
              <ul style="margin:8px 0 0 16px;display:flex;flex-direction:column;gap:4px">
                <li>Strong interpersonal & communication skills</li>
                <li>Experience with HR software & ATS tools</li>
                <li>Fluency in Khmer and English</li>
                <li>Knowledge of labor laws and hiring practices</li>
              </ul>
              <p style="margin-top:8px">Based on your profile, you already have excellent communication skills and language proficiency. Consider highlighting your customer service experience as it directly relates to this role.</p>
            </div>
          </div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
          <button class="btn-glass" style="font-size:12px;padding:8px 16px">What is the salary range?</button>
          <button class="btn-glass" style="font-size:12px;padding:8px 16px">How long is the interview process?</button>
          <button class="btn-glass" style="font-size:12px;padding:8px 16px">What benefits does Metfone offer?</button>
        </div>

        <div class="chat-input-bar">
          <input type="text" placeholder="Ask anything about this job…">
          <button class="send-btn">↑</button>
        </div>
      </div>

      <div class="col-side">
        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:14px">About this job</h3>
          <div style="display:flex;flex-direction:column;gap:10px;font-size:13px">
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-tertiary)">Position</span><span style="font-weight:600">Recruitment Officer</span></div>
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-tertiary)">Company</span><span style="font-weight:600">Metfone</span></div>
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-tertiary)">Location</span><span style="font-weight:600">Phnom Penh</span></div>
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-tertiary)">Salary</span><span style="font-weight:700;color:var(--red)">$800/month</span></div>
          </div>
          <button class="btn btn-dark" style="width:100%;margin-top:16px;font-size:13px;padding:12px" onclick="Router.navigate('/jobs/recruitment-officer')">Apply Now</button>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
