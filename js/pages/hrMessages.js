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

    const chatData = {
      1: [
        { from:'them', text:'Hello, I recently applied for the Senior Network Engineer position. I have over 8 years of experience in network infrastructure.', time:'Mar 28, 9:00 AM' },
        { from:'me', text:'Hi Sokha! Thank you for applying. Your profile looks impressive. Could you tell us more about your experience with Cisco and Juniper equipment?', time:'Mar 28, 10:15 AM' },
        { from:'them', text:'Sure! I have CCNP and JNCIP certifications. At my previous company, I managed a network serving 5,000+ users across 3 data centers.', time:'Mar 28, 11:30 AM' },
        { from:'me', text:'That\'s excellent. We\'d like to schedule a technical assessment. Would next Tuesday at 10 AM work for you?', time:'Mar 29, 9:00 AM' },
        { from:'them', text:'Tuesday at 10 AM works perfectly. Should I bring anything specific?', time:'Mar 29, 9:45 AM' },
        { from:'me', text:'Just your laptop. We\'ll provide the lab environment. Also, could you send us an updated CV with your latest certifications?', time:'Mar 29, 10:20 AM' },
        { from:'them', text:'Thank you! I have attached my updated CV as requested.', time:'Apr 3, 10:42 AM' },
      ],
      2: [
        { from:'them', text:'Hi, I\'m Vanna Ros. I submitted my application for the Marketing Coordinator role last week.', time:'Mar 25, 2:00 PM' },
        { from:'me', text:'Hello Vanna! We received your application. Your portfolio is very creative. We\'d like to invite you for an interview.', time:'Mar 26, 9:30 AM' },
        { from:'them', text:'That\'s wonderful news! When would be a good time?', time:'Mar 26, 10:00 AM' },
        { from:'me', text:'How about Thursday at 2 PM? It will be a 45-minute session with our marketing director and me.', time:'Mar 26, 11:00 AM' },
        { from:'them', text:'Thursday at 2 PM sounds great. Will it be in-person or online?', time:'Mar 26, 11:30 AM' },
        { from:'me', text:'It will be in-person at our Phnom Penh office, Room 3A. Please bring your portfolio.', time:'Mar 27, 9:00 AM' },
        { from:'them', text:'Could you confirm the interview time for Thursday?', time:'Apr 3, 9:15 AM' },
      ],
      3: [
        { from:'them', text:'Good morning, I applied for the Finance Analyst position. I have a CPA certification and 5 years of experience.', time:'Mar 20, 8:30 AM' },
        { from:'me', text:'Good morning Bopha! Thank you for your interest. Your qualifications are strong. We\'ve shortlisted you for the next round.', time:'Mar 21, 10:00 AM' },
        { from:'them', text:'Thank you so much! What does the next round involve?', time:'Mar 21, 10:30 AM' },
        { from:'me', text:'It\'s a case study presentation. You\'ll have 3 days to prepare a financial analysis on a scenario we\'ll send you. About 20 minutes presentation + 10 minutes Q&A.', time:'Mar 21, 11:00 AM' },
        { from:'them', text:'Understood. When will I receive the case study?', time:'Mar 21, 11:15 AM' },
        { from:'me', text:'I\'ll email it to you by end of day today. The presentation is scheduled for next Wednesday.', time:'Mar 21, 2:00 PM' },
        { from:'them', text:'I will prepare the presentation as discussed.', time:'Apr 2, 3:00 PM' },
      ],
      4: [
        { from:'them', text:'Hi there! I\'m very interested in the Software Developer role. I specialize in full-stack development with React and Node.js.', time:'Mar 22, 9:00 AM' },
        { from:'me', text:'Hello Piseth! Nice to hear from you. We noticed your GitHub profile — very active contributor!', time:'Mar 22, 10:00 AM' },
        { from:'them', text:'Thank you! I try to contribute to open source when I can. I also built a few production apps using your tech stack.', time:'Mar 22, 10:30 AM' },
        { from:'me', text:'That\'s great. We have a technical coding test we\'d like you to complete. It covers algorithms, system design, and a small project.', time:'Mar 23, 9:00 AM' },
        { from:'them', text:'I\'d be happy to take the test. How long do I have?', time:'Mar 23, 9:30 AM' },
        { from:'me', text:'You\'ll have 48 hours once you start. I\'ll send you the link shortly.', time:'Mar 23, 10:00 AM' },
        { from:'them', text:'I completed the test yesterday. When will I hear back about results?', time:'Apr 1, 2:00 PM' },
        { from:'me', text:'Our engineering team is reviewing it. We should have feedback by end of this week.', time:'Apr 1, 3:30 PM' },
        { from:'them', text:'Hi, I wanted to follow up on my application status.', time:'Apr 2, 10:00 AM' },
      ],
      5: [
        { from:'them', text:'Good afternoon! I\'m applying for the UI/UX Designer position. I\'ve been designing mobile apps for 4 years.', time:'Mar 15, 1:00 PM' },
        { from:'me', text:'Hi Chantrea! Your Dribbble portfolio caught our attention. Beautiful work on those fintech apps.', time:'Mar 15, 2:30 PM' },
        { from:'them', text:'Thank you! I\'m passionate about creating intuitive user experiences, especially for emerging markets.', time:'Mar 15, 3:00 PM' },
        { from:'me', text:'We\'d love to see you do a design challenge. Can you redesign our employee dashboard in 5 days?', time:'Mar 16, 9:00 AM' },
        { from:'them', text:'Absolutely! I\'ll start right away. Should I use Figma?', time:'Mar 16, 9:30 AM' },
        { from:'me', text:'Yes, Figma is perfect. Here\'s the brief and brand guidelines.', time:'Mar 16, 10:00 AM' },
        { from:'them', text:'I submitted the design challenge. I hope you like the direction!', time:'Mar 21, 5:00 PM' },
        { from:'me', text:'Chantrea, the team loved your work! We\'d like to extend an official offer. I\'ll send the details to your email.', time:'Mar 25, 11:00 AM' },
        { from:'them', text:'That\'s amazing! I\'m very excited!', time:'Mar 25, 11:30 AM' },
        { from:'me', text:'The offer letter has been sent. Please review the salary, benefits, and start date, then let us know.', time:'Mar 26, 9:00 AM' },
        { from:'them', text:'I accept the offer! When should I start?', time:'Mar 31, 10:00 AM' },
      ],
      6: [
        { from:'them', text:'Hello, I\'m Dara Pich. I applied for the Customer Service Lead position. I have 6 years in customer experience management.', time:'Mar 18, 10:00 AM' },
        { from:'me', text:'Hi Dara! Your experience managing a team of 20+ agents is exactly what we\'re looking for. Let\'s schedule an interview.', time:'Mar 19, 9:00 AM' },
        { from:'them', text:'Great! I\'m available anytime next week.', time:'Mar 19, 9:30 AM' },
        { from:'me', text:'How about Wednesday at 11 AM? It will be an in-person panel interview with our operations head.', time:'Mar 19, 10:00 AM' },
        { from:'them', text:'Wednesday at 11 AM is perfect. I\'ll be there.', time:'Mar 19, 10:15 AM' },
        { from:'me', text:'Great! Our office is at Metfone Tower, 3rd floor. Ask for Dara Samnang at reception.', time:'Mar 19, 11:00 AM' },
        { from:'them', text:'Is there a dress code for the in-person interview?', time:'Mar 31, 2:00 PM' },
      ],
      7: [
        { from:'them', text:'Hi, I\'m Kunthea Ly. I\'m applying for the HR Assistant role.', time:'Mar 30, 9:00 AM' },
        { from:'me', text:'Hello Kunthea! Thank you for your application. Can you elaborate on your experience with HR software systems?', time:'Mar 30, 10:30 AM' },
        { from:'them', text:'I have 3 years of experience in HR operations. I\'ve used SAP SuccessFactors, BambooHR, and managed payroll for 200+ employees.', time:'Mar 30, 11:00 AM' },
        { from:'me', text:'That\'s solid experience. We use a custom HRIS, but the principles are the same. We\'ll review your application and get back to you within a week.', time:'Mar 30, 2:00 PM' },
      ],
      8: [
        { from:'them', text:'Good morning! I noticed the Data Analyst opening and I\'m very interested. I have a Master\'s in Statistics.', time:'Mar 24, 8:00 AM' },
        { from:'me', text:'Hi Ratana! A Master\'s in Statistics — impressive. What tools do you primarily work with?', time:'Mar 24, 9:30 AM' },
        { from:'them', text:'I work extensively with Python, R, Tableau, and SQL. I also have experience with machine learning models for forecasting.', time:'Mar 24, 10:00 AM' },
        { from:'me', text:'Excellent! We\'ve shortlisted you. The next step is a data analysis exercise. We\'ll send you a real dataset to analyze.', time:'Mar 25, 9:00 AM' },
        { from:'them', text:'Looking forward to it! When should I expect the dataset?', time:'Mar 25, 9:30 AM' },
        { from:'me', text:'I\'ll send it tomorrow morning. You\'ll have 72 hours to complete the analysis and submit a report.', time:'Mar 25, 10:00 AM' },
        { from:'them', text:'Thank you for the update, looking forward to the next step.', time:'Mar 28, 11:00 AM' },
      ],
      9: [
        { from:'them', text:'Hello, I saw the Project Manager position on your careers page. I have PMP certification and 7 years of PM experience.', time:'Mar 26, 9:00 AM' },
        { from:'me', text:'Hi Sophal! PMP certified with 7 years — great background. What industries have you managed projects in?', time:'Mar 26, 10:30 AM' },
        { from:'them', text:'Primarily telecom and IT services. I\'ve led delivery of 15+ projects with budgets up to $2M.', time:'Mar 26, 11:00 AM' },
        { from:'me', text:'That\'s very relevant to what we do. Let me share your profile with the hiring manager.', time:'Mar 26, 2:00 PM' },
        { from:'them', text:'Thank you! Also, could you let me know the salary range for this role?', time:'Mar 27, 10:00 AM' },
      ],
      10: [
        { from:'them', text:'Hi! I applied for the QA Engineer position. I specialize in automated testing with Selenium and Cypress.', time:'Mar 20, 9:00 AM' },
        { from:'me', text:'Hello Nary! Automation testing is critical for us. Do you have experience with CI/CD integration?', time:'Mar 20, 10:00 AM' },
        { from:'them', text:'Yes! I\'ve set up test automation pipelines in Jenkins and GitHub Actions. My test suites run on every PR.', time:'Mar 20, 10:30 AM' },
        { from:'me', text:'Perfect. We\'d like to invite you for a technical interview. It will be a 1-hour session covering testing strategies and a live coding exercise.', time:'Mar 21, 9:00 AM' },
        { from:'them', text:'Sounds great! When would this be?', time:'Mar 21, 9:30 AM' },
        { from:'me', text:'Next Friday at 3 PM, online via Google Meet. I\'ll send you the link the day before.', time:'Mar 21, 10:00 AM' },
        { from:'them', text:'The technical test went well, I submitted it on time.', time:'Mar 26, 4:00 PM' },
      ],
    };

    const messages = chatData[c.id] || [
      { from:'them', text:`Hi, I'm ${c.name}. I applied for the ${c.role} position.`, time:'Today' },
      { from:'me', text:`Hello ${c.name.split(' ')[0]}! Thank you for your application.`, time:'Today' },
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
        <div id="msgArea" style="flex:1;overflow-y:auto;padding:16px 0;display:flex;flex-direction:column;gap:14px">
          ${messages.map(m => `
            <div class="chat-msg ${m.from === 'me' ? 'self' : ''}">
              <div class="avatar avatar-sm" style="background:${m.from === 'me' ? '#F0F9F8' : c.color};color:${m.from === 'me' ? '#00A79D' : c.textColor};font-size:9px;flex-shrink:0">${m.from === 'me' ? 'DS' : c.initials}</div>
              <div>
                <div class="bubble"><p>${m.text}</p></div>
                <p style="font-size:10px;color:var(--text-tertiary);margin-top:3px;${m.from === 'me' ? 'text-align:right' : ''}">${m.time}</p>
              </div>
            </div>`).join('')}
        </div>

        <!-- Input bar -->
        <div class="chat-input-bar" style="margin-top:8px">
          <button style="font-size:18px;color:var(--text-tertiary)">📎</button>
          <input id="chatInput" type="text" placeholder="Reply to ${c.name.split(' ')[0]}…" style="flex:1;border:none;background:none;font-size:13px;outline:none">
          <button id="sendBtn" class="send-btn" style="background:var(--teal)">↑</button>
        </div>
      </div>`;

    /* Scroll to bottom */
    const msgArea = document.getElementById('msgArea');
    if (msgArea) msgArea.scrollTop = msgArea.scrollHeight;

    /* Send message */
    function sendMessage() {
      const input = document.getElementById('chatInput');
      const area = document.getElementById('msgArea');
      if (!input || !area || !input.value.trim()) return;
      const text = input.value.trim();
      input.value = '';

      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit', hour12:true });

      area.insertAdjacentHTML('beforeend', `
        <div class="chat-msg self" style="animation:fadeSlideUp 0.25s ease">
          <div class="avatar avatar-sm" style="background:#F0F9F8;color:#00A79D;font-size:9px;flex-shrink:0">DS</div>
          <div>
            <div class="bubble"><p>${text.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p></div>
            <p style="font-size:10px;color:var(--text-tertiary);margin-top:3px;text-align:right">${timeStr}</p>
          </div>
        </div>`);
      area.scrollTop = area.scrollHeight;

      /* Fake reply after a short delay */
      const replies = [
        `Thank you for getting back to me, Dara!`,
        `Sure, I'll send that over right away.`,
        `That sounds good. I'm available anytime this week.`,
        `Great, I'll prepare everything as discussed.`,
        `Could you also share more details about the team structure?`,
        `I appreciate the update. Looking forward to the next steps!`,
        `Understood. I'll follow up with the documents by tomorrow.`,
      ];
      setTimeout(() => {
        const reply = replies[Math.floor(Math.random() * replies.length)];
        const replyTime = new Date().toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit', hour12:true });
        area.insertAdjacentHTML('beforeend', `
          <div class="chat-msg" style="animation:fadeSlideUp 0.25s ease">
            <div class="avatar avatar-sm" style="background:${c.color};color:${c.textColor};font-size:9px;flex-shrink:0">${c.initials}</div>
            <div>
              <div class="bubble"><p>${reply}</p></div>
              <p style="font-size:10px;color:var(--text-tertiary);margin-top:3px">${replyTime}</p>
            </div>
          </div>`);
        area.scrollTop = area.scrollHeight;
      }, 1200 + Math.random() * 1500);
    }

    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (chatInput) chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
  }

  renderList('all', '');

  /* ── Filters (deferred until DOM mounted) ── */
  setTimeout(() => {
    renderList('all', '');
    const searchEl = document.getElementById('msgSearch');
    const filterEl = document.getElementById('msgFilter');
    if (searchEl) searchEl.addEventListener('input', () => renderList(filterEl.value, searchEl.value));
    if (filterEl) filterEl.addEventListener('change', () => renderList(filterEl.value, searchEl.value));
  }, 200);

  return page;
});
