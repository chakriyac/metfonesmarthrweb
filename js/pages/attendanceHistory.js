/* ─── Attendance History Page ─── */
Router.register('/employee/attendance', function renderAttendanceHistory() {
  const page = el('div', { className: 'app-layout fade-in' });
  const role = sessionStorage.getItem('loginRole');
  page.appendChild(role === 'manager' ? managerSidebar('/employee/attendance') : employeeSidebar('/employee/attendance'));

  /* ── Full attendance data per month ── */
  const allRecords = {
    'March 2026': [
      { date: 'Mar 31', day: 'Mon', cin: '8:05 AM', cout: '5:12 PM', hrs: '8h 07m', status: 'Present' },
      { date: 'Mar 28', day: 'Fri', cin: '8:00 AM', cout: '5:30 PM', hrs: '8h 30m', status: 'Present' },
      { date: 'Mar 27', day: 'Thu', cin: '8:25 AM', cout: '5:15 PM', hrs: '7h 50m', status: 'Late' },
      { date: 'Mar 26', day: 'Wed', cin: '7:55 AM', cout: '5:10 PM', hrs: '8h 15m', status: 'Present' },
      { date: 'Mar 25', day: 'Tue', cin: '8:02 AM', cout: '6:00 PM', hrs: '9h 58m', status: 'Overtime' },
      { date: 'Mar 24', day: 'Mon', cin: '8:00 AM', cout: '5:05 PM', hrs: '8h 05m', status: 'Present' },
      { date: 'Mar 22–23', day: 'Sat–Sun', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
      { date: 'Mar 21', day: 'Fri', cin: '—', cout: '—', hrs: '—', status: 'Leave' },
      { date: 'Mar 20', day: 'Thu', cin: '8:10 AM', cout: '5:08 PM', hrs: '7h 58m', status: 'Present' },
      { date: 'Mar 19', day: 'Wed', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Mar 18', day: 'Tue', cin: '7:50 AM', cout: '5:15 PM', hrs: '8h 25m', status: 'Present' },
      { date: 'Mar 17', day: 'Mon', cin: '8:30 AM', cout: '5:20 PM', hrs: '7h 50m', status: 'Late' },
      { date: 'Mar 15–16', day: 'Sat–Sun', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
      { date: 'Mar 14', day: 'Fri', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Mar 13', day: 'Thu', cin: '—', cout: '5:00 PM', hrs: '—', status: 'Missed Check-In' },
      { date: 'Mar 12', day: 'Wed', cin: '8:05 AM', cout: '5:10 PM', hrs: '8h 05m', status: 'Present' },
      { date: 'Mar 11', day: 'Tue', cin: '8:00 AM', cout: '—', hrs: '—', status: 'Missed Check-Out' },
      { date: 'Mar 10', day: 'Mon', cin: '7:58 AM', cout: '5:02 PM', hrs: '8h 04m', status: 'Present' },
      { date: 'Mar 8–9', day: 'Sat–Sun', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
      { date: 'Mar 7', day: 'Fri', cin: '8:00 AM', cout: '6:30 PM', hrs: '10h 30m', status: 'Overtime' },
      { date: 'Mar 6', day: 'Thu', cin: '8:05 AM', cout: '5:00 PM', hrs: '7h 55m', status: 'Present' },
      { date: 'Mar 5', day: 'Wed', cin: '8:00 AM', cout: '5:05 PM', hrs: '8h 05m', status: 'Present' },
      { date: 'Mar 4', day: 'Tue', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Mar 3', day: 'Mon', cin: '8:12 AM', cout: '5:15 PM', hrs: '8h 03m', status: 'Present' },
      { date: 'Mar 1–2', day: 'Sat–Sun', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
    ],
    'February 2026': [
      { date: 'Feb 28', day: 'Sat', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
      { date: 'Feb 27', day: 'Fri', cin: '8:00 AM', cout: '5:05 PM', hrs: '8h 05m', status: 'Present' },
      { date: 'Feb 26', day: 'Thu', cin: '8:20 AM', cout: '5:00 PM', hrs: '7h 40m', status: 'Late' },
      { date: 'Feb 25', day: 'Wed', cin: '8:00 AM', cout: '5:10 PM', hrs: '8h 10m', status: 'Present' },
      { date: 'Feb 24', day: 'Tue', cin: '8:05 AM', cout: '5:00 PM', hrs: '7h 55m', status: 'Present' },
      { date: 'Feb 23', day: 'Mon', cin: '7:55 AM', cout: '5:15 PM', hrs: '8h 20m', status: 'Present' },
      { date: 'Feb 21–22', day: 'Sat–Sun', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
      { date: 'Feb 20', day: 'Fri', cin: '—', cout: '—', hrs: '—', status: 'Leave' },
      { date: 'Feb 19', day: 'Thu', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Feb 18', day: 'Wed', cin: '—', cout: '5:00 PM', hrs: '—', status: 'Missed Check-In' },
      { date: 'Feb 17', day: 'Tue', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Feb 16', day: 'Mon', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Feb 14–15', day: 'Sat–Sun', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
      { date: 'Feb 13', day: 'Fri', cin: '8:05 AM', cout: '5:00 PM', hrs: '7h 55m', status: 'Present' },
      { date: 'Feb 12', day: 'Thu', cin: '8:00 AM', cout: '6:15 PM', hrs: '10h 15m', status: 'Overtime' },
      { date: 'Feb 11', day: 'Wed', cin: '8:00 AM', cout: '5:10 PM', hrs: '8h 10m', status: 'Present' },
      { date: 'Feb 10', day: 'Tue', cin: '—', cout: '—', hrs: '—', status: 'Leave' },
      { date: 'Feb 9', day: 'Mon', cin: '8:10 AM', cout: '5:00 PM', hrs: '7h 50m', status: 'Present' },
      { date: 'Feb 7–8', day: 'Sat–Sun', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
      { date: 'Feb 6', day: 'Fri', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Feb 5', day: 'Thu', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Feb 4', day: 'Wed', cin: '8:35 AM', cout: '5:30 PM', hrs: '7h 55m', status: 'Late' },
      { date: 'Feb 3', day: 'Tue', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Feb 2', day: 'Mon', cin: '8:00 AM', cout: '—', hrs: '—', status: 'Missed Check-Out' },
      { date: 'Feb 1', day: 'Sun', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
    ],
    'January 2026': [
      { date: 'Jan 31', day: 'Sat', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
      { date: 'Jan 30', day: 'Fri', cin: '8:00 AM', cout: '5:05 PM', hrs: '8h 05m', status: 'Present' },
      { date: 'Jan 29', day: 'Thu', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Jan 28', day: 'Wed', cin: '—', cout: '—', hrs: '—', status: 'Leave' },
      { date: 'Jan 27', day: 'Tue', cin: '—', cout: '—', hrs: '—', status: 'Leave' },
      { date: 'Jan 26', day: 'Mon', cin: '8:05 AM', cout: '5:00 PM', hrs: '7h 55m', status: 'Present' },
      { date: 'Jan 24–25', day: 'Sat–Sun', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
      { date: 'Jan 23', day: 'Fri', cin: '8:18 AM', cout: '5:10 PM', hrs: '7h 52m', status: 'Late' },
      { date: 'Jan 22', day: 'Thu', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Jan 21', day: 'Wed', cin: '8:00 AM', cout: '6:45 PM', hrs: '10h 45m', status: 'Overtime' },
      { date: 'Jan 20', day: 'Tue', cin: '7:58 AM', cout: '5:00 PM', hrs: '8h 02m', status: 'Present' },
      { date: 'Jan 19', day: 'Mon', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Jan 17–18', day: 'Sat–Sun', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
      { date: 'Jan 16', day: 'Fri', cin: '8:05 AM', cout: '5:00 PM', hrs: '7h 55m', status: 'Present' },
      { date: 'Jan 15', day: 'Thu', cin: '8:00 AM', cout: '5:10 PM', hrs: '8h 10m', status: 'Present' },
      { date: 'Jan 14', day: 'Wed', cin: '—', cout: '5:00 PM', hrs: '—', status: 'Missed Check-In' },
      { date: 'Jan 13', day: 'Tue', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Jan 12', day: 'Mon', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Jan 10–11', day: 'Sat–Sun', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
      { date: 'Jan 9', day: 'Fri', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Jan 8', day: 'Thu', cin: '—', cout: '—', hrs: '—', status: 'Leave' },
      { date: 'Jan 7', day: 'Wed', cin: '8:00 AM', cout: '—', hrs: '—', status: 'Missed Check-Out' },
      { date: 'Jan 6', day: 'Tue', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Jan 5', day: 'Mon', cin: '8:40 AM', cout: '5:00 PM', hrs: '7h 20m', status: 'Late' },
      { date: 'Jan 3–4', day: 'Sat–Sun', cin: '—', cout: '—', hrs: '—', status: 'Weekend' },
      { date: 'Jan 2', day: 'Fri', cin: '8:00 AM', cout: '5:00 PM', hrs: '8h 00m', status: 'Present' },
      { date: 'Jan 1', day: 'Thu', cin: '—', cout: '—', hrs: '—', status: 'Leave' },
    ],
  };

  const monthKeys = Object.keys(allRecords);
  let selectedMonth = monthKeys[0];
  let activeFilter = 'All';

  const badgeMap = {
    'Present': 'badge-green', 'Late': 'badge-orange', 'Overtime': 'badge-teal',
    'Weekend': 'badge-gray', 'Leave': 'badge-teal',
    'Missed Check-In': 'badge-red', 'Missed Check-Out': 'badge-red',
  };
  const iconMap = {
    'Present': '●', 'Late': '⏰', 'Overtime': '💪', 'Weekend': '—', 'Leave': '🏖️',
    'Missed Check-In': '⚠️', 'Missed Check-Out': '⚠️',
  };

  function getStats(records) {
    const working = records.filter(r => r.status !== 'Weekend');
    return {
      present: records.filter(r => r.status === 'Present').length,
      late: records.filter(r => r.status === 'Late').length,
      overtime: records.filter(r => r.status === 'Overtime').length,
      leave: records.filter(r => r.status === 'Leave').length,
      missedIn: records.filter(r => r.status === 'Missed Check-In').length,
      missedOut: records.filter(r => r.status === 'Missed Check-Out').length,
      total: working.length,
      onTime: working.length > 0 ? Math.round(records.filter(r => r.status === 'Present' || r.status === 'Overtime').length / working.filter(r => r.status !== 'Leave').length * 100) : 0,
    };
  }

  function filterRecords() {
    const recs = allRecords[selectedMonth] || [];
    if (activeFilter === 'All') return recs;
    if (activeFilter === 'Late') return recs.filter(r => r.status === 'Late');
    if (activeFilter === 'Missed') return recs.filter(r => r.status === 'Missed Check-In' || r.status === 'Missed Check-Out');
    if (activeFilter === 'Leave') return recs.filter(r => r.status === 'Leave');
    if (activeFilter === 'Overtime') return recs.filter(r => r.status === 'Overtime');
    if (activeFilter === 'Present') return recs.filter(r => r.status === 'Present');
    return recs;
  }

  const main = el('div', { className: 'main-content' });

  function buildPage() {
    const stats = getStats(allRecords[selectedMonth] || []);
    const filtered = filterRecords();

    main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px">
          <div>
            <h1 style="font-family:var(--font-display);font-size:24px;font-weight:700">Attendance</h1>
            <p style="font-size:12px;color:var(--text-tertiary)">Track your check-in & check-out history</p>
          </div>
        </div>

        <!-- Month Navigation -->
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
          <button id="prevMonth" style="width:34px;height:34px;border-radius:10px;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all 0.2s" ${monthKeys.indexOf(selectedMonth) >= monthKeys.length - 1 ? 'disabled style="opacity:0.3;cursor:default"' : ''}>‹</button>
          <div style="flex:1;text-align:center">
            <h2 style="font-family:var(--font-display);font-size:17px;font-weight:800;color:var(--black)">${selectedMonth}</h2>
          </div>
          <button id="nextMonth" style="width:34px;height:34px;border-radius:10px;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all 0.2s" ${monthKeys.indexOf(selectedMonth) <= 0 ? 'disabled style="opacity:0.3;cursor:default"' : ''}>›</button>
        </div>

        <!-- Stats Cards -->
        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:20px">
          ${[
            { num: stats.present, label: 'Present', color: 'var(--teal)', bg: 'rgba(0,167,157,0.06)' },
            { num: stats.late, label: 'Late', color: 'var(--orange)', bg: 'rgba(232,124,30,0.06)' },
            { num: stats.missedIn, label: 'Missed In', color: 'var(--red)', bg: 'rgba(237,28,36,0.06)' },
            { num: stats.missedOut, label: 'Missed Out', color: 'var(--red)', bg: 'rgba(237,28,36,0.06)' },
            { num: stats.overtime, label: 'Overtime', color: 'var(--teal)', bg: 'rgba(0,167,157,0.06)' },
            { num: stats.leave, label: 'Leave', color: 'var(--orange)', bg: 'rgba(232,124,30,0.06)' },
          ].map(s => `
          <div class="card" style="padding:14px 12px;border-radius:16px;text-align:center">
            <div style="font-family:var(--font-display);font-size:24px;font-weight:800;color:${s.color}">${s.num}</div>
            <p style="font-size:10px;color:var(--text-tertiary);font-weight:500;margin-top:2px">${s.label}</p>
          </div>`).join('')}
        </div>

        <!-- On-Time Rate Bar -->
        <div class="card" style="padding:14px 18px;border-radius:16px;margin-bottom:20px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:11px;font-weight:600;color:var(--text-tertiary)">ON-TIME RATE</span>
            <span style="font-size:13px;font-weight:800;color:${stats.onTime >= 90 ? 'var(--teal)' : stats.onTime >= 75 ? 'var(--orange)' : 'var(--red)'}">${stats.onTime}%</span>
          </div>
          <div style="height:6px;border-radius:3px;background:rgba(0,0,0,0.04)">
            <div style="height:100%;width:${stats.onTime}%;border-radius:3px;background:${stats.onTime >= 90 ? 'linear-gradient(90deg,var(--teal),var(--mint))' : stats.onTime >= 75 ? 'var(--orange)' : 'var(--red)'};transition:width 0.4s"></div>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="tab-row" style="margin-bottom:16px" id="att-tabs">
          ${['All','Present','Late','Missed','Overtime','Leave'].map(f => `
          <button class="tab ${f === activeFilter ? 'active' : ''}" data-filter="${f}">${f}${f !== 'All' ? ` (${f === 'Missed' ? stats.missedIn + stats.missedOut : stats[f.toLowerCase()] || 0})` : ''}</button>`).join('')}
        </div>

        <!-- Records List -->
        <div id="att-list" style="display:flex;flex-direction:column;gap:6px">
          ${filtered.length === 0
            ? `<div style="text-align:center;padding:40px 20px"><p style="font-size:28px;margin-bottom:6px">📭</p><p style="font-size:13px;font-weight:600;color:var(--text-secondary)">No ${activeFilter.toLowerCase()} records</p><p style="font-size:11px;color:var(--text-tertiary)">Try a different filter or month.</p></div>`
            : filtered.map(r => {
              const isOff = r.status === 'Weekend' || r.status === 'Leave';
              const isMissed = r.status.startsWith('Missed');
              return `
              <div class="card" style="display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:16px;${isOff ? 'opacity:0.55' : ''}${isMissed ? ';border-left:3px solid var(--red)' : r.status === 'Late' ? ';border-left:3px solid var(--orange)' : ''}">
                <div style="min-width:80px">
                  <p style="font-size:13px;font-weight:700;color:var(--black)">${r.date}</p>
                  <p style="font-size:10px;color:var(--text-tertiary)">${r.day}</p>
                </div>
                <div style="flex:1;display:flex;gap:16px;font-size:11px;color:var(--text-secondary)">
                  <span style="display:flex;align-items:center;gap:3px">${r.cin !== '—' ? '<span style="color:var(--teal);font-size:8px">●</span>' : ''} ${r.cin}</span>
                  <span style="display:flex;align-items:center;gap:3px">${r.cout !== '—' && r.cout ? '<span style="color:var(--red);font-size:8px">●</span>' : ''} ${r.cout}</span>
                  ${r.hrs !== '—' ? `<span style="font-weight:600;color:var(--black)">${r.hrs}</span>` : ''}
                </div>
                <span class="badge ${badgeMap[r.status] || 'badge-gray'}" style="font-size:10px;min-width:58px;text-align:center">${r.status}</span>
              </div>`;
            }).join('')}
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="col-side">
        <!-- Monthly Summary -->
        <div class="card card-lg" style="margin-bottom:14px;border-radius:22px;padding:22px 20px">
          <h3 style="font-family:var(--font-display);font-size:15px;font-weight:700;margin-bottom:14px">Monthly Summary</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${[
              { label: 'Working Days', value: stats.total - stats.leave + '', icon: '📅' },
              { label: 'Present', value: stats.present + '', icon: '✅' },
              { label: 'Late Arrivals', value: stats.late + '', icon: '⏰' },
              { label: 'Missed Check-In', value: stats.missedIn + '', icon: '⚠️' },
              { label: 'Missed Check-Out', value: stats.missedOut + '', icon: '⚠️' },
              { label: 'Overtime Days', value: stats.overtime + '', icon: '💪' },
              { label: 'Leave Taken', value: stats.leave + '', icon: '🏖️' },
            ].map(s => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:10px;background:rgba(0,0,0,0.015)">
              <span style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-secondary)"><span style="font-size:13px">${s.icon}</span>${s.label}</span>
              <span style="font-size:13px;font-weight:700;color:var(--black)">${s.value}</span>
            </div>`).join('')}
          </div>
        </div>

        <!-- Insights -->
        <div class="card card-lg" style="margin-bottom:14px;border-radius:22px;padding:22px 20px">
          <h3 style="font-family:var(--font-display);font-size:15px;font-weight:700;margin-bottom:12px">Insights</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${stats.onTime >= 90
              ? `<div style="display:flex;gap:8px"><span style="font-size:16px">🎉</span><div><p style="font-size:12px;font-weight:600;color:var(--teal)">Great attendance!</p><p style="font-size:10px;color:var(--text-tertiary)">${stats.onTime}% on-time this month</p></div></div>`
              : `<div style="display:flex;gap:8px"><span style="font-size:16px">📉</span><div><p style="font-size:12px;font-weight:600;color:var(--orange)">Needs improvement</p><p style="font-size:10px;color:var(--text-tertiary)">${stats.onTime}% on-time — try to check in before 8:15 AM</p></div></div>`}
            ${stats.late > 0 ? `<div style="display:flex;gap:8px"><span style="font-size:16px">⏰</span><div><p style="font-size:12px;font-weight:600;color:var(--orange)">${stats.late} late arrival${stats.late > 1 ? 's' : ''}</p><p style="font-size:10px;color:var(--text-tertiary)">Arrived after 8:15 AM</p></div></div>` : ''}
            ${stats.missedIn + stats.missedOut > 0 ? `<div style="display:flex;gap:8px"><span style="font-size:16px">⚠️</span><div><p style="font-size:12px;font-weight:600;color:var(--red)">${stats.missedIn + stats.missedOut} missed punch${stats.missedIn + stats.missedOut > 1 ? 'es' : ''}</p><p style="font-size:10px;color:var(--text-tertiary)">${stats.missedIn} check-in, ${stats.missedOut} check-out</p></div></div>` : ''}
            ${stats.overtime > 0 ? `<div style="display:flex;gap:8px"><span style="font-size:16px">💪</span><div><p style="font-size:12px;font-weight:600;color:var(--teal)">${stats.overtime} overtime day${stats.overtime > 1 ? 's' : ''}</p><p style="font-size:10px;color:var(--text-tertiary)">Worked beyond 9 hours</p></div></div>` : ''}
          </div>
        </div>

        <!-- Legend -->
        <div class="card card-lg" style="border-radius:22px;padding:22px 20px">
          <h3 style="font-family:var(--font-display);font-size:15px;font-weight:700;margin-bottom:10px">Status Legend</h3>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${[
              { badge: 'badge-green', label: 'Present', desc: 'On time' },
              { badge: 'badge-orange', label: 'Late', desc: 'After 8:15 AM' },
              { badge: 'badge-red', label: 'Missed', desc: 'Missing check-in/out' },
              { badge: 'badge-teal', label: 'Overtime', desc: 'Over 9 hours' },
              { badge: 'badge-teal', label: 'Leave', desc: 'Approved time off' },
              { badge: 'badge-gray', label: 'Weekend', desc: 'Non-working day' },
            ].map(l => `
            <div style="display:flex;align-items:center;gap:8px">
              <span class="badge ${l.badge}" style="min-width:62px;text-align:center;font-size:9px">${l.label}</span>
              <span style="font-size:11px;color:var(--text-tertiary)">${l.desc}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
  }

  buildPage();
  page.appendChild(main);

  function bindEvents() {
    /* Month nav */
    const prev = page.querySelector('#prevMonth');
    const next = page.querySelector('#nextMonth');
    if (prev) prev.onclick = () => {
      const idx = monthKeys.indexOf(selectedMonth);
      if (idx < monthKeys.length - 1) { selectedMonth = monthKeys[idx + 1]; activeFilter = 'All'; buildPage(); bindEvents(); }
    };
    if (next) next.onclick = () => {
      const idx = monthKeys.indexOf(selectedMonth);
      if (idx > 0) { selectedMonth = monthKeys[idx - 1]; activeFilter = 'All'; buildPage(); bindEvents(); }
    };

    /* Filter tabs */
    page.querySelectorAll('#att-tabs .tab').forEach(t => {
      t.onclick = () => {
        activeFilter = t.dataset.filter;
        buildPage();
        bindEvents();
      };
    });
  }

  setTimeout(bindEvents);

  return page;
});
