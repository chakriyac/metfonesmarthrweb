/* ─── HR Messages / Candidate Inbox ─── */
Router.register('/hr/messages', function renderHrMessages() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/messages'));

  const conversations = [
    { id:1, name:'Sokha Chan', initials:'SC', role:'Senior Network Engineer', status:'applied', unread:3, lastMsg:'Thank you! I have attached my updated CV as requested.', time:'10:42 AM', online:true, color:'#FDE8E8', textColor:'#ED1C24' },
    { id:2, name:'Vanna Ros', initials:'VR', role:'Marketing Coordinator', status:'interview', unread:1, lastMsg:'Could you confirm the interview time for Thursday?', time:'9:15 AM', online:true, color:'#FFF8F0', textColor:'#E87C1E' },
    { id:3, name:'Bopha Meas', initials:'BM', role:'Finance Analyst', status:'shortlisted', unread:0, lastMsg:'I will prepare the presentation as discussed.', time:'Yesterday', online:false, color:'#F0F9F8', textColor:'#00A79D' },
    { id:4, name:'Piseth Keo', initials:'PK', role:'Software Developer', status:'applied', unread:5, lastMsg:'Hi, I wanted to follow up on my application status.', time:'Yesterday', online:true, color:'#FFF8F0', textColor:'#E87C1E' },
    { id:5, name:'Chantrea Nhem', initials:'CN', role:'UI/UX Designer', status:'offer', unread:0, lastMsg:'I accept the offer! When should I start?', time:'Mon', online:false, color:'#F0F9F8', textColor:'#00A79D' },
    { id:6, name:'Dara Pich', initials:'DP', role:'Customer Service Lead', status:'interview', unread:2, lastMsg:'Is there a dress code for the in-person interview?', time:'Mon', online:false, color:'#F0F9F8', textColor:'#00A79D' },
    { id:7, name:'Kunthea Ly', initials:'KL', role:'HR Assistant', status:'applied', unread:0, lastMsg:'I have 3 years of experience in HR operations.', time:'Sun', online:false, color:'#FDE8E8', textColor:'#ED1C24' },
    { id:8, name:'Ratana Sim', initials:'RS', role:'Data Analyst', status:'shortlisted', unread:0, lastMsg:'Thank you for the update, looking forward to the next step.', time:'Apr 28', online:false, color:'#FFF8F0', textColor:'#E87C1E' },
    { id:9, name:'Sophal Tep', initials:'ST', role:'Project Manager', status:'applied', unread:1, lastMsg:'Could you let me know the salary range for this role?', time:'Apr 27', online:false, color:'#FDE8E8', textColor:'#ED1C24' },
    { id:10, name:'Nary Kong', initials:'NK', role:'QA Engineer', status:'interview', unread:0, lastMsg:'The technical test went well, I submitted it on time.', time:'Apr 26', online:false, color:'#F0F9F8', textColor:'#00A79D' },
  ];

  const statusLabel = s => ({ applied:'Applied', interview:'Interview', shortlisted:'Shortlisted', offer:'Offer Sent' }[s] || s);
  const statusColor = s => ({ applied:'var(--teal)', interview:'var(--orange)', shortlisted:'var(--red)', offer:'var(--green)' }[s] || 'var(--text-tertiary)');

  const main = el('div', { className: 'main-content' });

  const totalUnread = conversations.reduce((s,c) => s + c.unread, 0);

  main.innerHTML = `${bgOrbs()}
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-family:var(--font-display);font-size:26px;font-weight:800">Messages</h1>
        <p style="font-size:13px;color:var(--text-tertiary);margin-top:2px">${conversations.length} conversations · ${totalUnread} unread</p>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
        <div class="card" style="padding:8px 14px;display:flex;align-items:center;gap:8px;min-width:240px">
          <span style="color:var(--text-tertiary)">🔍</span>
          <input id="msgSearch" type="text" placeholder="Search candidates…" style="border:none;background:none;font-size:13px;flex:1;outline:none">
        </div>
        <select id="msgFilter" class="card" style="padding:8px 14px;border:none;font-size:13px;cursor:pointer;color:var(--text-secondary)">
          <option value="all">All Status</option>
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer Sent</option>
        </select>
      </div>
    </div>

    <!-- Summary cards -->
    <div class="stats-row" style="margin-bottom:24px">
      <div class="stat-card" style="border-left:4px solid var(--teal)">
        <p style="font-size:12px;color:var(--text-tertiary)">Total Chats</p>
        <p style="font-size:22px;font-weight:800">${conversations.length}</p>
      </div>
      <div class="stat-card" style="border-left:4px solid var(--red)">
        <p style="font-size:12px;color:var(--text-tertiary)">Unread</p>
        <p style="font-size:22px;font-weight:800;color:var(--red)">${totalUnread}</p>
      </div>
      <div class="stat-card" style="border-left:4px solid var(--teal)">
        <p style="font-size:12px;color:var(--text-tertiary)">Online Now</p>
        <p style="font-size:22px;font-weight:800;color:var(--green)">${conversations.filter(c=>c.online).length}</p>
      </div>
      <div class="stat-card" style="border-left:4px solid var(--orange)">
        <p style="font-size:12px;color:var(--text-tertiary)">Pending Reply</p>
        <p style="font-size:22px;font-weight:800;color:var(--orange)">${conversations.filter(c=>c.unread>0).length}</p>
      </div>
    </div>

    <!-- Conversation list -->
    <div class="two-col" style="gap:0;align-items:flex-start">
      <div class="col-main" style="padding-right:0">
        <div id="convoList"></div>
      </div>
      <div class="col-side" id="chatPanel" style="position:sticky;top:24px">
        <div class="card card-lg" style="text-align:center;padding:48px 24px">
          <div style="font-size:48px;margin-bottom:16px;opacity:0.4">💬</div>
          <p style="font-size:15px;font-weight:600;color:var(--text-secondary)">Select a conversation</p>
          <p style="font-size:12px;color:var(--text-tertiary);margin-top:4px">Choose a candidate to view the chat</p>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  document.getElementById('app').innerHTML = '';
  document.getElementById('app').appendChild(page);

  /* ── render conversation list ── */
  function renderList(filter, search) {
    let list = conversations;
    if (filter && filter !== 'all') list = list.filter(c => c.status === filter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || c.lastMsg.toLowerCase().includes(q));
    }

    const container = document.getElementById('convoList');
    if (!container) return;
    if (!list.length) {
      container.innerHTML = '<div class="card" style="text-align:center;padding:32px"><p style="color:var(--text-tertiary)">No conversations found</p></div>';
      return;
    }
    container.innerHTML = list.map(c => `
      <div class="card convo-row" data-id="${c.id}" style="display:flex;align-items:center;gap:14px;padding:16px 20px;margin-bottom:8px;cursor:pointer;transition:all .2s">
        <div style="position:relative;flex-shrink:0">
          <div class="avatar avatar-md" style="background:${c.color};color:${c.textColor};font-weight:700;font-size:13px">${c.initials}</div>
          ${c.online ? '<span style="position:absolute;bottom:1px;right:1px;width:10px;height:10px;border-radius:50%;background:#34C759;border:2px solid white"></span>' : ''}
        </div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
            <p style="font-size:14px;font-weight:${c.unread ? '700' : '600'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.name}</p>
            <span style="font-size:11px;color:var(--text-tertiary);flex-shrink:0">${c.time}</span>
          </div>
          <p style="font-size:11px;color:var(--text-tertiary);margin:2px 0 4px">${c.role}</p>
          <div style="display:flex;align-items:center;gap:8px">
            <p style="font-size:12px;color:${c.unread ? 'var(--text-primary)' : 'var(--text-tertiary)'};font-weight:${c.unread ? '600' : '400'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1">${c.lastMsg}</p>
            ${c.unread ? `<span style="background:var(--red);color:white;font-size:10px;font-weight:700;min-width:20px;height:20px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${c.unread}</span>` : ''}
          </div>
          <span style="display:inline-block;margin-top:4px;font-size:10px;font-weight:600;padding:2px 8px;border-radius:8px;background:${statusColor(c.status)}15;color:${statusColor(c.status)}">${statusLabel(c.status)}</span>
        </div>
      </div>`).join('');

    container.querySelectorAll('.convo-row').forEach(row => {
      row.addEventListener('click', () => openChat(list.find(c => c.id === +row.dataset.id)));
    });
  }

  /* ── open chat panel ── */
  function openChat(c) {
    const panel = document.getElementById('chatPanel');
    if (!panel || !c) return;

    // Mark active row
    document.querySelectorAll('.convo-row').forEach(r => r.style.borderLeft = 'none');
    const activeRow = document.querySelector(`.convo-row[data-id="${c.id}"]`);
    if (activeRow) activeRow.style.borderLeft = '3px solid var(--teal)';

    const sampleMessages = [
      { from: 'them', text: `Hi, I'm ${c.name}. I applied for the ${c.role} position.` },
      { from: 'me', text: `Hello ${c.name.split(' ')[0]}! Thank you for your application. Let me review your profile.` },
      { from: 'them', text: c.lastMsg },
    ];

    panel.innerHTML = `
      <div class="card card-lg" style="display:flex;flex-direction:column;height:calc(100vh - 200px);min-height:400px">
        <!-- Chat header -->
        <div style="display:flex;align-items:center;gap:12px;padding-bottom:14px;border-bottom:1px solid rgba(0,0,0,0.06)">
          <div style="position:relative">
            <div class="avatar avatar-md" style="background:${c.color};color:${c.textColor};font-weight:700;font-size:13px">${c.initials}</div>
            ${c.online ? '<span style="position:absolute;bottom:1px;right:1px;width:10px;height:10px;border-radius:50%;background:#34C759;border:2px solid white"></span>' : ''}
          </div>
          <div style="flex:1">
            <p style="font-size:15px;font-weight:700">${c.name}</p>
            <p style="font-size:11px;color:var(--text-tertiary)">${c.role} · <span style="color:${statusColor(c.status)}">${statusLabel(c.status)}</span></p>
          </div>
          <div style="display:flex;gap:6px">
            <button class="btn-glass" style="padding:6px 10px;font-size:12px" title="View Application">📋</button>
            <button class="btn-glass" style="padding:6px 10px;font-size:12px" title="Schedule Interview">📅</button>
          </div>
        </div>

        <!-- Messages area -->
        <div style="flex:1;overflow-y:auto;padding:16px 0;display:flex;flex-direction:column;gap:14px">
          ${sampleMessages.map(m => `
            <div class="chat-msg ${m.from === 'me' ? 'self' : ''}">
              <div class="avatar avatar-sm" style="background:${m.from === 'me' ? '#F0F9F8' : c.color};color:${m.from === 'me' ? '#00A79D' : c.textColor};font-size:9px;flex-shrink:0">${m.from === 'me' ? 'DS' : c.initials}</div>
              <div class="bubble"><p>${m.text}</p></div>
            </div>`).join('')}
        </div>

        <!-- Input bar -->
        <div class="chat-input-bar" style="margin-top:8px">
          <button style="font-size:18px;color:var(--text-tertiary)">📎</button>
          <input type="text" placeholder="Reply to ${c.name.split(' ')[0]}…" style="flex:1;border:none;background:none;font-size:13px;outline:none">
          <button class="send-btn" style="background:var(--teal)">↑</button>
        </div>
      </div>`;
  }

  renderList('all', '');

  /* ── Filters ── */
  const searchEl = document.getElementById('msgSearch');
  const filterEl = document.getElementById('msgFilter');
  if (searchEl) searchEl.addEventListener('input', () => renderList(filterEl.value, searchEl.value));
  if (filterEl) filterEl.addEventListener('change', () => renderList(filterEl.value, searchEl.value));
});
