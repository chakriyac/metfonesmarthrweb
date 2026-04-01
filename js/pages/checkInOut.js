/* ─── Check In / Out Page ─── */
Router.register('/employee/checkin', function renderCheckInOut() {
  const page = el('div', { className: 'app-layout fade-in' });
  const role = sessionStorage.getItem('loginRole');
  page.appendChild(role === 'manager' ? managerSidebar('/employee/checkin') : employeeSidebar('/employee/checkin'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div class="page-header">
          <h1>Check In / Out</h1>
          <p>Live attendance tracking</p>
        </div>

        <!-- Live Clock Card -->
        <div class="hero-card" style="text-align:center;padding:32px 24px;margin-bottom:24px">
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:8px">
            <span style="width:10px;height:10px;border-radius:50%;background:var(--green);animation:pulse 2s infinite"></span>
            <span style="font-size:13px;font-weight:600;color:var(--green)">Currently Working</span>
          </div>
          <div id="live-clock" style="font-family:var(--font-display);font-size:48px;font-weight:800;letter-spacing:2px;margin-bottom:8px">08:15:32</div>
          <p style="font-size:12px;color:var(--text-tertiary)">Elapsed time since check-in</p>

          <div style="display:flex;justify-content:center;gap:32px;margin:20px 0">
            <div>
              <p style="font-size:11px;color:var(--text-tertiary)">Check In</p>
              <p style="font-size:16px;font-weight:700;color:var(--green)">8:05 AM</p>
            </div>
            <div style="width:1px;background:rgba(255,255,255,0.35)"></div>
            <div>
              <p style="font-size:11px;color:var(--text-tertiary)">Check Out</p>
              <p style="font-size:16px;font-weight:700;color:var(--text-placeholder)">— : —</p>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:20px">
            <span style="font-size:14px">📍</span>
            <span class="badge badge-green">GPS Verified</span>
            <span style="font-size:12px;color:var(--text-tertiary)">Metfone HQ, Phnom Penh</span>
          </div>

          <button id="checkout-btn" class="btn-gradient" style="width:240px;padding:16px 32px;font-size:16px;font-weight:700;border-radius:var(--radius-pill);background:linear-gradient(135deg,#E87C1E,#ED1C24)">
            Check Out
          </button>
        </div>

        <!-- Weekly Summary -->
        <div class="section-header"><h2>Weekly Summary</h2></div>
        <div class="stats-row" style="margin-bottom:24px">
          <div class="stat-card"><div class="number" style="color:var(--teal)">40h 15m</div><div class="label">Total Hours</div></div>
          <div class="stat-card"><div class="number" style="color:var(--green)">8h 03m</div><div class="label">Avg / Day</div></div>
          <div class="stat-card"><div class="number" style="color:var(--red)">0</div><div class="label">Absent</div></div>
          <div class="stat-card"><div class="number" style="color:var(--orange)">1</div><div class="label">Late</div></div>
        </div>

        <!-- Recent Records -->
        <div class="section-header"><h2>Recent Records</h2></div>
        <div class="stagger-children" style="display:flex;flex-direction:column;gap:8px">
          ${[
            { day: 'Mon Mar 31', cin: '8:05 AM', cout: '5:12 PM', hrs: '8h 07m', status: 'Present', badge: 'badge-green' },
            { day: 'Fri Mar 28', cin: '8:00 AM', cout: '5:30 PM', hrs: '8h 30m', status: 'Present', badge: 'badge-green' },
            { day: 'Thu Mar 27', cin: '8:25 AM', cout: '5:15 PM', hrs: '7h 50m', status: 'Late', badge: 'badge-orange' },
            { day: 'Wed Mar 26', cin: '7:55 AM', cout: '5:10 PM', hrs: '8h 15m', status: 'Present', badge: 'badge-green' },
            { day: 'Tue Mar 25', cin: '8:02 AM', cout: '6:00 PM', hrs: '9h 58m', status: 'Overtime', badge: 'badge-red' },
          ].map(r => `
            <div class="card" style="display:flex;align-items:center;gap:14px">
              <div style="min-width:90px">
                <p style="font-size:13px;font-weight:600">${r.day}</p>
              </div>
              <div style="flex:1;display:flex;gap:16px;font-size:12px;color:var(--text-secondary)">
                <span>🟢 ${r.cin}</span>
                <span>🔴 ${r.cout}</span>
                <span style="font-weight:600;color:var(--text-primary)">${r.hrs}</span>
              </div>
              <span class="badge ${r.badge}">${r.status}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="col-side">
        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Today's Breakdown</h3>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:12px;color:var(--text-tertiary)">Working Hours</span>
                <span style="font-size:12px;font-weight:600">8h 15m / 8h</span>
              </div>
              <div style="height:8px;border-radius:4px;background:var(--border)">
                <div style="height:100%;width:100%;border-radius:4px;background:linear-gradient(90deg,var(--teal),var(--green))"></div>
              </div>
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:12px;color:var(--text-tertiary)">Break Time</span>
                <span style="font-size:12px;font-weight:600">45m / 1h</span>
              </div>
              <div style="height:8px;border-radius:4px;background:var(--border)">
                <div style="height:100%;width:75%;border-radius:4px;background:var(--orange)"></div>
              </div>
            </div>
          </div>
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
            <p style="font-size:11px;color:var(--text-tertiary);margin-bottom:8px">LOCATION</p>
            <div style="background:#F0F9F8;border-radius:12px;padding:12px;text-align:center">
              <p style="font-size:13px;font-weight:600">📍 Metfone HQ</p>
              <p style="font-size:11px;color:var(--text-tertiary)">11.556, 104.928</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);

  // Live clock
  const clockEl = page.querySelector('#live-clock');
  if (clockEl) {
    const startTime = new Date();
    startTime.setHours(8, 5, 0);
    setInterval(() => {
      const diff = Math.floor((Date.now() - startTime.getTime()) / 1000);
      const h = String(Math.floor(diff / 3600)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      clockEl.textContent = `${h}:${m}:${s}`;
    }, 1000);
  }

  return page;
});
