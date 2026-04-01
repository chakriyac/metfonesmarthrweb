/* ─── Notifications Page ─── */
Router.register('/notifications', function renderNotifications() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(seekerSidebar('/notifications'));

  const notifs = [
    { icon: '📋', iconBg: '#FDE8E8', border: '#ED1C24', title: 'Application received', desc: 'Your application for Recruitment Officer has been received and is under review.', time: '2 hours ago', unread: true },
    { icon: '✓', iconBg: '#F0F9F8', border: '#00A79D', title: 'Profile shortlisted!', desc: 'You have been shortlisted for Network Engineer. Prepare for the next step.', time: '5 hours ago', unread: true },
    { icon: '📅', iconBg: '#FFF8F0', border: '#E87C1E', title: 'Interview scheduled', desc: 'Your interview for Mobile App Developer is scheduled for Dec 15 at 10:00 AM.', time: 'Yesterday', unread: true },
    { icon: '💬', iconBg: '#F0F9F8', border: '#00A79D', title: 'New message from HR', desc: 'Dara from HR team has sent you a message regarding your application documents.', time: '2 days ago', unread: true },
    { icon: '🔔', iconBg: '#F7F7F8', border: 'transparent', title: 'Welcome to Metfone Smart HR', desc: 'Complete your profile to get personalized job recommendations.', time: '1 week ago', unread: false },
  ];

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div style="max-width:800px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
        <div>
          <h1 style="font-family:var(--font-display);font-size:24px;font-weight:700">Notifications</h1>
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <span class="badge badge-red" style="font-size:11px;font-weight:700">4</span>
          <a href="#" style="font-size:13px;color:var(--teal);font-weight:600">Mark all as read</a>
        </div>
      </div>

      <div class="tab-row" style="margin-bottom:20px">
        <button class="tab active">All</button>
        <button class="tab">Applications</button>
        <button class="tab">Messages</button>
        <button class="tab">System</button>
      </div>

      <div class="stagger-children">
        ${notifs.map(n => `
          <div class="notif-card" style="border-left-color:${n.border};${n.unread ? '' : 'opacity:0.6'}">
            <div class="notif-icon" style="background:${n.iconBg}">${n.icon}</div>
            <div class="notif-body">
              <h4>${n.title}</h4>
              <p>${n.desc}</p>
            </div>
            <div class="notif-time">${n.time}</div>
            ${n.unread ? '<div class="unread-dot"></div>' : ''}
          </div>
        `).join('')}
      </div>
    </div>`;

  page.appendChild(main);
  initTabs(page);
  return page;
});
