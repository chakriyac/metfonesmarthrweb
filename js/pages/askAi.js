/* ─── Ask AI Chat Page ─── */
Router.register('/chat/ai', function renderAskAi() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/chat/hr'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div style="max-width:700px;display:flex;flex-direction:column;height:calc(100vh - 64px)">
      <!-- Header -->
      <div class="card" style="display:flex;align-items:center;gap:12px;padding:14px 20px;margin-bottom:12px">
        <div class="avatar avatar-md" style="background:linear-gradient(135deg,#ED1C24,#E87C1E);color:white;font-weight:700">AI</div>
        <div style="flex:1">
          <h1 style="font-family:var(--font-display);font-size:17px;font-weight:700">Ask AI</h1>
          <p style="font-size:11px;color:var(--text-tertiary)">About: Recruitment Officer · $800/mo</p>
        </div>
        <button class="btn-glass" style="font-size:12px;padding:8px 14px" onclick="Router.navigate('/jobs/recruitment-officer')">View Job →</button>
      </div>

      <!-- Messages -->
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
            <p>Great question! The key skills include:</p>
            <ul style="margin:8px 0 0 16px;display:flex;flex-direction:column;gap:4px">
              <li>Strong interpersonal & communication skills</li>
              <li>Experience with HR software & ATS tools</li>
              <li>Fluency in Khmer and English</li>
              <li>Knowledge of labor laws and hiring practices</li>
            </ul>
            <p style="margin-top:8px">Based on your profile, you already have excellent communication skills. Consider highlighting your customer service experience.</p>
          </div>
        </div>
      </div>

      <!-- Quick suggestions -->
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <button class="btn-glass" style="font-size:12px;padding:8px 14px">Salary range?</button>
        <button class="btn-glass" style="font-size:12px;padding:8px 14px">Interview process?</button>
        <button class="btn-glass" style="font-size:12px;padding:8px 14px">Benefits?</button>
      </div>

      <!-- Input -->
      <div class="chat-input-bar">
        <input type="text" placeholder="Ask anything about this job…">
        <button class="send-btn">↑</button>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
