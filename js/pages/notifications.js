/* ─── Notifications Page ─── */
Router.register('/notifications', function renderNotifications() {
  const page = el('div', { className: 'app-layout fade-in' });
  const role = sessionStorage.getItem('loginRole') || 'seeker';

  /* Pick the correct sidebar for the logged-in role */
  if (role === 'employee') page.appendChild(employeeSidebar('/notifications'));
  else if (role === 'manager') page.appendChild(managerSidebar('/notifications'));
  else if (role === 'hr') page.appendChild(hrSidebar('/notifications'));
  else page.appendChild(seekerSidebar('/notifications'));

  /* Role-specific notification data */
  const seekerNotifs = [
    { icon: '📋', iconBg: '#FDE8E8', border: '#ED1C24', title: 'Application received', desc: 'Your application for Recruitment Officer has been received and is under review.', time: '2 hours ago', unread: true },
    { icon: '✓', iconBg: '#F0F9F8', border: '#00A79D', title: 'Profile shortlisted!', desc: 'You have been shortlisted for Network Engineer. Prepare for the next step.', time: '5 hours ago', unread: true },
    { icon: '📅', iconBg: '#FFF8F0', border: '#E87C1E', title: 'Interview scheduled', desc: 'Your interview for Mobile App Developer is scheduled for Dec 15 at 10:00 AM.', time: 'Yesterday', unread: true },
    { icon: '💬', iconBg: '#F0F9F8', border: '#00A79D', title: 'New message from HR', desc: 'Dara from HR team has sent you a message regarding your application documents.', time: '2 days ago', unread: true },
    { icon: '🔔', iconBg: '#F7F7F8', border: 'transparent', title: 'Welcome to Metfone Smart HR', desc: 'Complete your profile to get personalized job recommendations.', time: '1 week ago', unread: false },
  ];

  const employeeNotifs = [
    { icon: '✅', iconBg: '#F0F9F8', border: '#00A79D', title: 'Leave approved', desc: 'Your annual leave request for Apr 10–12 has been approved by your manager.', time: '1 hour ago', unread: true },
    { icon: '💰', iconBg: '#FFF8F0', border: '#E87C1E', title: 'Payslip ready', desc: 'Your March 2026 payslip is now available. View it in the Payslip section.', time: '3 hours ago', unread: true },
    { icon: '📅', iconBg: '#FDE8E8', border: '#ED1C24', title: 'Attendance reminder', desc: 'You missed your check-in yesterday. Please contact HR if this was an error.', time: 'Yesterday', unread: true },
    { icon: '📢', iconBg: '#F0F9F8', border: '#00A79D', title: 'Company announcement', desc: 'Team building event scheduled for Apr 18. See details in the HR portal.', time: '2 days ago', unread: true },
    { icon: '🔔', iconBg: '#F7F7F8', border: 'transparent', title: 'Profile updated', desc: 'Your emergency contact information was updated successfully.', time: '1 week ago', unread: false },
  ];

  const managerNotifs = [
    { icon: '📋', iconBg: '#FDE8E8', border: '#ED1C24', title: 'Leave request pending', desc: 'Sokha Chea has requested annual leave for Apr 14–16. Review and respond.', time: '30 min ago', unread: true },
    { icon: '👥', iconBg: '#F0F9F8', border: '#00A79D', title: 'New team member', desc: 'Dara Pich has been assigned to your department starting next week.', time: '2 hours ago', unread: true },
    { icon: '📊', iconBg: '#FFF8F0', border: '#E87C1E', title: 'Monthly report ready', desc: 'Your team attendance report for March 2026 is ready for review.', time: 'Yesterday', unread: true },
    { icon: '⚠️', iconBg: '#FDE8E8', border: '#ED1C24', title: 'Late check-in alert', desc: '2 team members checked in late today. View attendance details.', time: 'Yesterday', unread: true },
    { icon: '🔔', iconBg: '#F7F7F8', border: 'transparent', title: 'System update', desc: 'Metfone Smart HR has been updated with new reporting features.', time: '1 week ago', unread: false },
  ];

  const hrNotifs = [
    { icon: '📋', iconBg: '#FDE8E8', border: '#ED1C24', title: 'New application', desc: '15 new applications received for Senior Network Engineer position.', time: '1 hour ago', unread: true },
    { icon: '👥', iconBg: '#F0F9F8', border: '#00A79D', title: 'Onboarding due', desc: '3 new hires starting next week. Ensure onboarding documents are ready.', time: '3 hours ago', unread: true },
    { icon: '📅', iconBg: '#FFF8F0', border: '#E87C1E', title: 'Interview reminder', desc: '5 interviews scheduled for tomorrow. Check schedule for details.', time: 'Yesterday', unread: true },
    { icon: '💰', iconBg: '#F0F9F8', border: '#00A79D', title: 'Payroll processed', desc: 'March 2026 payroll has been processed for 245 employees.', time: '2 days ago', unread: true },
    { icon: '🔔', iconBg: '#F7F7F8', border: 'transparent', title: 'Policy update', desc: 'Remote work policy has been updated. Review and distribute to all staff.', time: '1 week ago', unread: false },
  ];

  const notifMap = { seeker: seekerNotifs, employee: employeeNotifs, manager: managerNotifs, hr: hrNotifs };
  const notifs = notifMap[role] || seekerNotifs;

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div style="max-width:860px;margin:0 auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
        <div>
          <h1 style="font-family:var(--font-display);font-size:24px;font-weight:700">Notifications</h1>
        </div>
        <div style="display:flex;align-items:center;gap:12px">
          <span class="badge badge-red" style="font-size:11px;font-weight:700">4</span>
          <a href="#" style="font-size:13px;color:var(--red);font-weight:600">Mark all as read</a>
        </div>
      </div>

      <div class="tab-row" style="margin-bottom:20px">
        <button class="tab active">All</button>
        <button class="tab">${role === 'seeker' ? 'Applications' : role === 'hr' ? 'Recruitment' : 'Leave & Attendance'}</button>
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
