/* ─── Payslip Page ─── */
Router.register('/employee/payslip', function renderPayslip() {
  const page = el('div', { className: 'app-layout fade-in' });
  const role = sessionStorage.getItem('loginRole');
  page.appendChild(role === 'manager' ? managerSidebar('/employee/payslip') : employeeSidebar('/employee/payslip'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div class="page-header">
          <h1>Payslip</h1>
          <p>Your earnings & deductions</p>
        </div>

        <div style="margin-bottom:20px">
          <select style="background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:13px;font-weight:600">
            <option>March 2026</option>
            <option>February 2026</option>
            <option>January 2026</option>
            <option>December 2025</option>
            <option>November 2025</option>
          </select>
        </div>

        <!-- Net Pay Hero -->
        <div class="hero-card" style="text-align:center;padding:32px 24px;margin-bottom:24px;background:linear-gradient(135deg,rgba(237,28,36,0.85),rgba(232,124,30,0.85));backdrop-filter:var(--glass-blur-heavy)">
          <p style="font-size:13px;color:rgba(255,255,255,0.8);margin-bottom:4px">Net Pay</p>
          <div style="font-family:var(--font-display);font-size:42px;font-weight:800;color:white;margin-bottom:4px">$2,450.00</div>
          <p style="font-size:12px;color:rgba(255,255,255,0.7)">Paid on March 28, 2026</p>
          <div style="display:flex;justify-content:center;gap:32px;margin-top:16px">
            <div>
              <p style="font-size:11px;color:rgba(255,255,255,0.7)">Gross</p>
              <p style="font-size:16px;font-weight:700;color:white">$2,800</p>
            </div>
            <div style="width:1px;background:rgba(255,255,255,0.3)"></div>
            <div>
              <p style="font-size:11px;color:rgba(255,255,255,0.7)">Deductions</p>
              <p style="font-size:16px;font-weight:700;color:white">$350</p>
            </div>
          </div>
        </div>

        <!-- Earnings -->
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:12px">💰 EARNINGS</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${[
              { item: 'Basic Salary', amount: '$2,000.00' },
              { item: 'Housing Allowance', amount: '$500.00' },
              { item: 'Transport Allowance', amount: '$200.00' },
              { item: 'Overtime (8 hrs)', amount: '$100.00' },
            ].map(e => `
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:13px;color:var(--text-secondary)">${e.item}</span>
                <span style="font-size:13px;font-weight:600">${e.amount}</span>
              </div>
            `).join('')}
            <div style="border-top:1px solid var(--border);padding-top:10px;display:flex;justify-content:space-between">
              <span style="font-size:13px;font-weight:700">Total Earnings</span>
              <span style="font-size:14px;font-weight:800;color:var(--teal)">$2,800.00</span>
            </div>
          </div>
        </div>

        <!-- Deductions -->
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:12px">📉 DEDUCTIONS</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${[
              { item: 'Income Tax', amount: '$150.00' },
              { item: 'Social Security', amount: '$100.00' },
              { item: 'Health Insurance', amount: '$100.00' },
            ].map(d => `
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:13px;color:var(--text-secondary)">${d.item}</span>
                <span style="font-size:13px;font-weight:600;color:var(--red)">${d.amount}</span>
              </div>
            `).join('')}
            <div style="border-top:1px solid var(--border);padding-top:10px;display:flex;justify-content:space-between">
              <span style="font-size:13px;font-weight:700">Total Deductions</span>
              <span style="font-size:14px;font-weight:800;color:var(--red)">$350.00</span>
            </div>
          </div>
        </div>

        <!-- Attendance Summary -->
        <div class="card card-lg">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:12px">📅 ATTENDANCE SUMMARY</h3>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
            <div style="text-align:center">
              <div style="font-family:var(--font-display);font-size:20px;font-weight:800;color:var(--teal)">22</div>
              <p style="font-size:11px;color:var(--text-tertiary)">Days Worked</p>
            </div>
            <div style="text-align:center">
              <div style="font-family:var(--font-display);font-size:20px;font-weight:800;color:var(--orange)">8</div>
              <p style="font-size:11px;color:var(--text-tertiary)">Overtime Hrs</p>
            </div>
            <div style="text-align:center">
              <div style="font-family:var(--font-display);font-size:20px;font-weight:800;color:var(--teal)">1</div>
              <p style="font-size:11px;color:var(--text-tertiary)">Leave Taken</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-side">
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Actions</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn-dark" style="width:100%">📄 Download PDF</button>
            <button class="btn-glass" style="width:100%">📤 Share Payslip</button>
            <button class="btn-glass" style="width:100%" onclick="Router.navigate('/chat/ai')">🤖 Ask AI about payslip</button>
          </div>
        </div>

        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:12px">Pay History</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${[
              { month: 'March 2026', amount: '$2,450', status: 'Paid', badge: 'badge-green' },
              { month: 'February 2026', amount: '$2,350', status: 'Paid', badge: 'badge-green' },
              { month: 'January 2026', amount: '$2,400', status: 'Paid', badge: 'badge-green' },
              { month: 'December 2025', amount: '$2,600', status: 'Paid', badge: 'badge-green' },
            ].map(p => `
              <div style="display:flex;align-items:center;gap:10px">
                <span style="font-size:12px;color:var(--text-tertiary);width:100px">${p.month}</span>
                <span style="font-size:13px;font-weight:600;flex:1">${p.amount}</span>
                <span class="badge ${p.badge}">${p.status}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);
  return page;
});
