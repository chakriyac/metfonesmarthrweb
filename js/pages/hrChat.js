/* ─── HR Chat Page ─── */
Router.register('/chat/hr', function renderHrChat() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/chat/hr'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col" style="height:calc(100vh - 64px)">
      <div class="col-main" style="display:flex;flex-direction:column">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
          <div class="avatar avatar-md" style="background:#F0F9F8;color:#00A79D;font-weight:700;position:relative">
            DS
            <span style="position:absolute;bottom:0;right:0;width:10px;height:10px;border-radius:50%;background:#34C759;border:2px solid white"></span>
          </div>
          <div>
            <h1 style="font-family:var(--font-display);font-size:20px;font-weight:700">Chat with HR</h1>
            <p style="font-size:12px;color:var(--text-tertiary)">Dara S. · HR Department</p>
          </div>
        </div>

        <div class="card" style="border-left:4px solid var(--orange);margin-bottom:16px">
          <p style="font-size:13px;font-weight:600;margin-bottom:2px">📎 Upload additional documents</p>
          <p style="font-size:12px;color:var(--text-tertiary)">Drag and drop or click to attach files (PDF, DOCX, images).</p>
        </div>

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

          <div class="card" style="margin:8px 0 8px 44px;max-width:500px;border-left:3px solid var(--teal)">
            <p style="font-size:12px;color:var(--teal)">💡 <strong>Tip:</strong> Upload clear, high-resolution documents for faster processing.</p>
          </div>
        </div>

        <div class="chat-input-bar">
          <button style="font-size:18px;color:var(--text-tertiary)">📎</button>
          <input type="text" placeholder="Type your message…">
          <button class="send-btn" style="background:var(--teal)">↑</button>
        </div>
      </div>

      <div class="col-side">
        <div class="card card-lg" style="text-align:center">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:16px">HR Contact</h3>
          <div class="avatar avatar-xl" style="background:#F0F9F8;color:#00A79D;font-weight:700;margin:0 auto 12px">DS</div>
          <p style="font-size:15px;font-weight:700">Dara Samnang</p>
          <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:16px">HR Officer · Phnom Penh</p>
          <div style="display:flex;flex-direction:column;gap:8px;text-align:left;margin-bottom:16px">
            <p style="font-size:12px;color:var(--text-secondary)">📞 +855 12 456 789</p>
            <p style="font-size:12px;color:var(--text-secondary)">✉ dara.s@metfone.com.kh</p>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn-glass" style="flex:1">📞 Call</button>
            <button class="btn-glass" style="flex:1">✉ Email</button>
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
