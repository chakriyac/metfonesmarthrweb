/* ─── HR Chat Page ─── */
Router.register('/chat/hr', function renderHrChat() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/chat/hr'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div style="max-width:700px;display:flex;flex-direction:column;height:calc(100vh - 64px)">
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
      <div class="chat-container" style="flex:1;overflow-y:auto">
        <div class="chat-msg">
          <div class="avatar avatar-sm" style="background:#F0F9F8;color:#00A79D;font-size:9px;flex-shrink:0">DS</div>
          <div class="bubble">
            <p>Hi Sokha! Thank you for applying. We need a few extra documents to proceed with your application.</p>
          </div>
        </div>

        <div class="chat-msg self">
          <div class="avatar avatar-sm" style="background:#FDE8E8;color:#ED1C24;font-size:9px;flex-shrink:0">SC</div>
          <div class="bubble">
            <p>Sure, what documents do you need?</p>
          </div>
        </div>

        <div class="chat-msg">
          <div class="avatar avatar-sm" style="background:#F0F9F8;color:#00A79D;font-size:9px;flex-shrink:0">DS</div>
          <div class="bubble">
            <p>Please submit the following:</p>
            <ol style="margin:8px 0 0 16px;display:flex;flex-direction:column;gap:4px">
              <li>Updated CV</li>
              <li>University diploma</li>
              <li>National ID card copy</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="chat-input-bar">
        <button style="font-size:18px;color:var(--text-tertiary)">📎</button>
        <input type="text" placeholder="Type your message…">
        <button class="send-btn" style="background:var(--teal)">↑</button>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
