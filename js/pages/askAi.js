/* ─── Ask AI Chat Page ─── */
Router.register('/chat/ai', function renderAskAi() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/chat/ai'));

  const main = el('div', { className: 'main-content' });

  /* ── AI Knowledge Base (fake responses keyed by topic) ── */
  const aiResponses = [
    { keys: ['salary','pay','compensation','money','how much','wage'], answer: 'The <strong>Recruitment Officer</strong> position offers a competitive salary of <strong>$800/month</strong>, with potential for performance bonuses up to 15%. After 6 months, there\'s a salary review based on KPIs.' },
    { keys: ['interview','process','stages','round','how long'], answer: 'The interview process has <strong>3 stages</strong>:<br><ol style="margin:8px 0 0 16px;display:flex;flex-direction:column;gap:4px"><li>Phone screening (15 min)</li><li>HR panel interview (45 min)</li><li>Final interview with Department Head</li></ol><br>The entire process typically takes <strong>2–3 weeks</strong>.' },
    { keys: ['benefit','insurance','health','vacation','leave','perks'], answer: 'Metfone offers a great benefits package:<ul style="margin:8px 0 0 16px;display:flex;flex-direction:column;gap:4px"><li>Health & dental insurance (employee + family)</li><li>18 days annual leave + 12 public holidays</li><li>Phone allowance ($30/month)</li><li>Training & development budget</li><li>Annual performance bonus</li></ul>' },
    { keys: ['skill','requirement','qualification','experience','need'], answer: 'The key skills and qualifications include:<ul style="margin:8px 0 0 16px;display:flex;flex-direction:column;gap:4px"><li>Strong interpersonal & communication skills</li><li>Experience with HR software & ATS tools</li><li>Fluency in Khmer and English</li><li>Knowledge of labor laws and hiring practices</li><li>1–3 years HR or recruitment experience preferred</li></ul><p style="margin-top:8px">Based on your profile, you already have excellent communication skills. Consider highlighting your customer service experience.</p>' },
    { keys: ['team','culture','environment','colleague','work life'], answer: 'The HR team at Metfone has <strong>12 members</strong> and is known for a collaborative, supportive culture. The team does weekly standups and monthly team lunches. Work-life balance is a priority — overtime is rare and flexible hours are available after probation.' },
    { keys: ['remote','work from home','wfh','hybrid','office'], answer: 'This role is primarily <strong>office-based</strong> at the Phnom Penh HQ. After the 3-month probation, a <strong>hybrid arrangement</strong> (2 days WFH/week) can be discussed with your manager.' },
    { keys: ['apply','application','submit','how to','start','next step'], answer: 'To apply, simply click <strong>"View Job →"</strong> at the top and hit the <strong>Apply Now</strong> button. Make sure your profile is complete — especially your CV, experience, and skills sections. Applications are reviewed within <strong>5 business days</strong>.' },
    { keys: ['growth','promotion','career','advance','path'], answer: 'Metfone has a clear career path for HR roles:<ul style="margin:8px 0 0 16px;display:flex;flex-direction:column;gap:4px"><li>Recruitment Officer (current opening)</li><li>Senior Recruitment Specialist (1–2 years)</li><li>Recruitment Team Lead (3+ years)</li><li>HR Manager</li></ul><p style="margin-top:8px">Internal promotions are encouraged — over 60% of leadership roles are filled internally.</p>' },
    { keys: ['deadline','close','when','expire','date'], answer: 'The application deadline for this position is <strong>April 15, 2026</strong>. We recommend applying as soon as possible — early applications are reviewed first and may get priority interview slots.' },
    { keys: ['probation','trial','first month'], answer: 'The probation period is <strong>3 months</strong>. During this time you\'ll receive full salary and benefits, with a mentor assigned to help you onboard. A performance review at the end of probation determines confirmation.' },
    { keys: ['hello','hi','hey','good morning','good afternoon'], answer: 'Hello! 👋 I\'m here to help you learn about the <strong>Recruitment Officer</strong> position at Metfone. You can ask me about the salary, interview process, benefits, required skills, team culture, or anything else!' },
    { keys: ['thank','thanks','thx','great','awesome','helpful'], answer: 'You\'re welcome! 😊 Feel free to ask anything else about the position. When you\'re ready, you can apply directly from the job page. Good luck!' },
  ];
  const fallback = 'That\'s a great question! While I don\'t have specific information about that topic, I\'d recommend reaching out to the HR team directly via <strong>Chat with HR</strong> for more details. Is there anything else about the role I can help with — like salary, benefits, or the interview process?';

  function matchResponse(text) {
    const lower = text.toLowerCase();
    for (const r of aiResponses) {
      if (r.keys.some(k => lower.includes(k))) return r.answer;
    }
    return fallback;
  }

  /* ── Messages state ── */
  const messages = [
    { from: 'ai', html: 'Hello! I\'m your AI job assistant. I can help you understand the <strong>Recruitment Officer</strong> position at Metfone. What would you like to know?' },
    { from: 'user', html: 'What skills do I need for this role?' },
    { from: 'ai', html: matchResponse('skills') },
  ];

  const suggestions = ['Salary range?', 'Interview process?', 'Benefits?', 'Career growth?', 'Work culture?', 'How to apply?'];

  function renderMessages() {
    const container = main.querySelector('.chat-container');
    if (!container) return;
    container.innerHTML = messages.map(m => m.from === 'ai' ? `
      <div class="chat-msg">
        <div class="avatar avatar-sm" style="background:linear-gradient(135deg,#ED1C24,#E87C1E);color:white;font-size:9px;flex-shrink:0">AI</div>
        <div class="bubble"><p>${m.html}</p></div>
      </div>` : `
      <div class="chat-msg self">
        <div class="avatar avatar-sm" style="background:#FDE8E8;color:#ED1C24;font-size:9px;flex-shrink:0">SC</div>
        <div class="bubble"><p>${m.html}</p></div>
      </div>`).join('');
    container.scrollTop = container.scrollHeight;
  }

  function showTyping() {
    const container = main.querySelector('.chat-container');
    const typing = document.createElement('div');
    typing.className = 'chat-msg';
    typing.id = 'aiTyping';
    typing.innerHTML = `
      <div class="avatar avatar-sm" style="background:linear-gradient(135deg,#ED1C24,#E87C1E);color:white;font-size:9px;flex-shrink:0">AI</div>
      <div class="bubble" style="display:flex;gap:4px;padding:14px 18px">
        <span style="width:6px;height:6px;border-radius:50%;background:var(--text-tertiary);animation:typingDot 1s ease-in-out infinite"></span>
        <span style="width:6px;height:6px;border-radius:50%;background:var(--text-tertiary);animation:typingDot 1s ease-in-out 0.2s infinite"></span>
        <span style="width:6px;height:6px;border-radius:50%;background:var(--text-tertiary);animation:typingDot 1s ease-in-out 0.4s infinite"></span>
      </div>`;
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('aiTyping');
    if (t) t.remove();
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    messages.push({ from: 'user', html: text.trim() });
    renderMessages();

    const input = main.querySelector('.chat-input-bar input');
    if (input) { input.value = ''; input.focus(); }

    /* Show typing indicator, then respond */
    showTyping();
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      removeTyping();
      messages.push({ from: 'ai', html: matchResponse(text) });
      renderMessages();
    }, delay);
  }

  /* ── Render page ── */
  main.innerHTML = `${bgOrbs()}
    <style>
      @keyframes typingDot { 0%,60%,100% { opacity:.3; transform:translateY(0) } 30% { opacity:1; transform:translateY(-4px) } }
    </style>
    <div style="max-width:860px;margin:0 auto;display:flex;flex-direction:column;height:calc(100vh - 64px)">
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
      <div class="chat-container" style="flex:1;overflow-y:auto"></div>

      <!-- Quick suggestions -->
      <div class="ai-suggestions" style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        ${suggestions.map(s => `<button class="btn-glass ai-suggestion" style="font-size:12px;padding:8px 14px">${s}</button>`).join('')}
      </div>

      <!-- Input -->
      <div class="chat-input-bar">
        <input type="text" id="aiChatInput" placeholder="Ask anything about this job…">
        <button class="send-btn" id="aiSendBtn">↑</button>
      </div>
    </div>`;

  /* Render initial messages */
  renderMessages();

  /* ── Bind events ── */
  const input = main.querySelector('#aiChatInput');
  const sendBtn = main.querySelector('#aiSendBtn');
  sendBtn.onclick = () => sendMessage(input.value);
  input.onkeydown = (e) => { if (e.key === 'Enter') sendMessage(input.value); };

  /* Quick suggestion clicks */
  main.querySelectorAll('.ai-suggestion').forEach(btn => {
    btn.onclick = () => sendMessage(btn.textContent);
  });

  page.appendChild(main);
  return page;
});
