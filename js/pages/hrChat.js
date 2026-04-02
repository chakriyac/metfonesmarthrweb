/* ─── HR Chat Page ─── */
Router.register('/chat/hr', function renderHrChat() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/chat/hr'));

  const main = el('div', { className: 'main-content' });

  /* ── HR Officer fake reply bank ── */
  const hrReplies = [
    { keys: ['document','cv','resume','diploma','id card','upload','submit','file','certificate'], answer: 'Thank you! Please upload the documents through the <strong>Profile → Documents</strong> section. Once uploaded, I\'ll be able to verify them on our end. Let me know when they\'re ready!' },
    { keys: ['status','update','progress','how is','where is','application'], answer: 'Your application is currently in the <strong>Under Review</strong> stage. Our hiring team is reviewing all submissions this week. You should receive an update within <strong>3–5 business days</strong>. I\'ll notify you as soon as there\'s any change!' },
    { keys: ['interview','schedule','meeting','when','date','time','available'], answer: 'Great news! We\'d like to schedule your interview. Our available slots are:<ul style="margin:8px 0 0 16px;display:flex;flex-direction:column;gap:4px"><li>Monday, April 7 — 10:00 AM</li><li>Tuesday, April 8 — 2:00 PM</li><li>Wednesday, April 9 — 11:00 AM</li></ul><p style="margin-top:8px">Please let me know which time works best for you!</p>' },
    { keys: ['salary','pay','compensation','offer','package'], answer: 'The salary details will be discussed during the final interview stage. However, the listed range for this role is <strong>$700–$900/month</strong> depending on experience. Benefits are included on top of the base salary.' },
    { keys: ['thank','thanks','thx','appreciate'], answer: 'You\'re very welcome, Sokha! 😊 Don\'t hesitate to reach out if you have any other questions. We\'re here to help throughout the process.' },
    { keys: ['hello','hi','hey','good morning','good afternoon','sup'], answer: 'Hi Sokha! 👋 How can I help you today? Feel free to ask about your application status, documents, or interview schedule.' },
    { keys: ['yes','sure','okay','ok','can','will'], answer: 'Perfect! Take your time, and let me know once you\'re done or if you need any help along the way.' },
    { keys: ['no','not','don\'t','can\'t','haven\'t'], answer: 'No worries at all! If anything changes or you need assistance, just message me here. I\'m available during office hours (Mon–Fri, 8 AM–5 PM).' },
    { keys: ['benefit','insurance','health','leave','vacation'], answer: 'Metfone offers a comprehensive benefits package including health insurance, 18 days annual leave, phone allowance, and training opportunities. Full details will be shared with your offer letter.' },
    { keys: ['start','begin','join','when can','onboard'], answer: 'If selected, the expected start date would be <strong>May 1, 2026</strong>. The onboarding process takes about 1 week and includes orientation, IT setup, and team introductions.' },
    { keys: ['reject','fail','unsuccessful','not selected'], answer: 'I understand your concern. Rest assured, your application is still being actively considered. We value every candidate and will provide transparent feedback regardless of the outcome.' },
    { keys: ['dress','wear','attire','code'], answer: 'For the interview, we recommend <strong>business casual</strong> attire. Metfone\'s daily dress code is smart casual — jeans are fine on Fridays! 👔' },
  ];
  const hrFallback = 'Thank you for your message, Sokha. Let me check on that and get back to you shortly. In the meantime, is there anything else I can help with regarding your application?';

  function matchHrReply(text) {
    const lower = text.toLowerCase();
    for (const r of hrReplies) {
      if (r.keys.some(k => lower.includes(k))) return r.answer;
    }
    return hrFallback;
  }

  /* ── Messages state ── */
  const messages = [
    { from: 'hr', html: 'Hi Sokha! Thank you for applying. We need a few extra documents to proceed with your application.' },
    { from: 'user', html: 'Sure, what documents do you need?' },
    { from: 'hr', html: 'Please submit the following:<ol style="margin:8px 0 0 16px;display:flex;flex-direction:column;gap:4px"><li>Updated CV</li><li>University diploma</li><li>National ID card copy</li></ol>' },
  ];

  function renderMessages() {
    const container = main.querySelector('.chat-container');
    if (!container) return;
    container.innerHTML = messages.map(m => m.from === 'hr' ? `
      <div class="chat-msg">
        <div class="avatar avatar-sm" style="background:#F0F9F8;color:#00A79D;font-size:9px;flex-shrink:0">DS</div>
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
    typing.id = 'hrTyping';
    typing.innerHTML = `
      <div class="avatar avatar-sm" style="background:#F0F9F8;color:#00A79D;font-size:9px;flex-shrink:0">DS</div>
      <div class="bubble" style="display:flex;gap:4px;padding:14px 18px">
        <span style="width:6px;height:6px;border-radius:50%;background:var(--text-tertiary);animation:typingDot 1s ease-in-out infinite"></span>
        <span style="width:6px;height:6px;border-radius:50%;background:var(--text-tertiary);animation:typingDot 1s ease-in-out 0.2s infinite"></span>
        <span style="width:6px;height:6px;border-radius:50%;background:var(--text-tertiary);animation:typingDot 1s ease-in-out 0.4s infinite"></span>
      </div>`;
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('hrTyping');
    if (t) t.remove();
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    messages.push({ from: 'user', html: text.trim() });
    renderMessages();

    const input = main.querySelector('#hrChatInput');
    if (input) { input.value = ''; input.focus(); }

    showTyping();
    const delay = 1000 + Math.random() * 1500;
    setTimeout(() => {
      removeTyping();
      messages.push({ from: 'hr', html: matchHrReply(text) });
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
        <div class="avatar avatar-md" style="background:#F0F9F8;color:#00A79D;font-weight:700;position:relative">
          DS
          <span style="position:absolute;bottom:0;right:0;width:10px;height:10px;border-radius:50%;background:#34C759;border:2px solid white"></span>
        </div>
        <div style="flex:1">
          <h1 style="font-family:var(--font-display);font-size:17px;font-weight:700">Dara Samnang</h1>
          <p style="font-size:11px;color:var(--text-tertiary)">HR Officer · Online</p>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn-glass" style="width:34px;height:34px;border-radius:50%;padding:0;font-size:14px">📞</button>
          <button class="btn-glass" style="width:34px;height:34px;border-radius:50%;padding:0;font-size:14px">✉</button>
        </div>
      </div>

      <!-- Messages -->
      <div class="chat-container" style="flex:1;overflow-y:auto"></div>

      <!-- Input -->
      <div class="chat-input-bar">
        <button style="font-size:18px;color:var(--text-tertiary)">📎</button>
        <input type="text" id="hrChatInput" placeholder="Type your message…">
        <button class="send-btn" id="hrSendBtn" style="background:var(--teal)">↑</button>
      </div>
    </div>`;

  /* Render initial messages */
  renderMessages();

  /* ── Bind events ── */
  const input = main.querySelector('#hrChatInput');
  const sendBtn = main.querySelector('#hrSendBtn');
  sendBtn.onclick = () => sendMessage(input.value);
  input.onkeydown = (e) => { if (e.key === 'Enter') sendMessage(input.value); };

  page.appendChild(main);
  return page;
});
