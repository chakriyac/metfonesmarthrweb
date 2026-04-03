/* ─── Payslip Page ─── */
Router.register('/employee/payslip', function renderPayslip() {
  const page = el('div', { className: 'app-layout fade-in' });
  const role = sessionStorage.getItem('loginRole');
  page.appendChild(role === 'manager' ? managerSidebar('/employee/payslip') : employeeSidebar('/employee/payslip'));

  /* ── Payslip data per month ── */
  const payslips = {
    'March 2026': {
      paid: 'March 28, 2026', gross: 2800, deductions: 350, net: 2450,
      earnings: [
        { item: 'Basic Salary', amount: 2000 },
        { item: 'Housing Allowance', amount: 500 },
        { item: 'Transport Allowance', amount: 200 },
        { item: 'Overtime (8 hrs)', amount: 100 },
      ],
      deductionList: [
        { item: 'Income Tax', amount: 150 },
        { item: 'Social Security', amount: 100 },
        { item: 'Health Insurance', amount: 100 },
      ],
      attendance: { worked: 22, overtime: 8, leave: 1 }
    },
    'February 2026': {
      paid: 'February 27, 2026', gross: 2650, deductions: 300, net: 2350,
      earnings: [
        { item: 'Basic Salary', amount: 2000 },
        { item: 'Housing Allowance', amount: 500 },
        { item: 'Transport Allowance', amount: 150 },
        { item: 'Overtime (0 hrs)', amount: 0 },
      ],
      deductionList: [
        { item: 'Income Tax', amount: 120 },
        { item: 'Social Security', amount: 100 },
        { item: 'Health Insurance', amount: 80 },
      ],
      attendance: { worked: 20, overtime: 0, leave: 2 }
    },
    'January 2026': {
      paid: 'January 30, 2026', gross: 2750, deductions: 350, net: 2400,
      earnings: [
        { item: 'Basic Salary', amount: 2000 },
        { item: 'Housing Allowance', amount: 500 },
        { item: 'Transport Allowance', amount: 200 },
        { item: 'Overtime (4 hrs)', amount: 50 },
      ],
      deductionList: [
        { item: 'Income Tax', amount: 140 },
        { item: 'Social Security', amount: 110 },
        { item: 'Health Insurance', amount: 100 },
      ],
      attendance: { worked: 21, overtime: 4, leave: 1 }
    },
    'December 2025': {
      paid: 'December 29, 2025', gross: 3050, deductions: 450, net: 2600,
      earnings: [
        { item: 'Basic Salary', amount: 2000 },
        { item: 'Housing Allowance', amount: 500 },
        { item: 'Transport Allowance', amount: 200 },
        { item: 'Year-End Bonus', amount: 350 },
      ],
      deductionList: [
        { item: 'Income Tax', amount: 200 },
        { item: 'Social Security', amount: 150 },
        { item: 'Health Insurance', amount: 100 },
      ],
      attendance: { worked: 23, overtime: 12, leave: 0 }
    },
  };

  const months = Object.keys(payslips);
  let selectedMonth = months[0];

  /* ── AI Chat data ── */
  const aiResponses = {
    'how is my salary calculated': 'Your net pay = Gross Pay – Deductions.\n\n• **Gross pay** includes your Basic Salary ($2,000), Housing ($500), Transport ($200), plus any overtime.\n• **Deductions** include Income Tax, Social Security, and Health Insurance.\n\nFor March 2026: $2,800 – $350 = **$2,450 net**.',
    'why my salary is different this month': 'Your March 2026 payslip shows $2,450 vs February\'s $2,350. The $100 increase is from **8 hours overtime** in March (worth $100), while February had 0 overtime hours.',
    'what is overtime rate': 'Your overtime rate is **$12.50/hr** (1.5× your hourly base of ~$8.33). In March you worked 8 overtime hours = $100 extra.',
    'when is next pay day': 'Based on the payment pattern, your next payslip for **April 2026** will be paid around **April 28, 2026**.',
    'how much tax do i pay': 'For March 2026 you paid **$150 in Income Tax** (about 5.4% of gross). This follows Cambodia\'s progressive tax brackets for salaried employees.',
    'can i get a raise': 'Salary reviews are typically conducted during annual performance evaluations. Your next review is scheduled for **April 15, 2026**. I recommend discussing this with your manager or HR.',
  };

  function fmt(n) { return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  function buildPayslipContent(data, month) {
    const pctChange = months.indexOf(month) < months.length - 1
      ? ((data.net - payslips[months[months.indexOf(month) + 1]].net) / payslips[months[months.indexOf(month) + 1]].net * 100).toFixed(1)
      : null;
    return `
    <!-- Month Selector -->
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px">
      <button id="prevMonth" style="width:34px;height:34px;border-radius:10px;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all 0.2s" ${months.indexOf(month) >= months.length - 1 ? 'disabled style="opacity:0.3;cursor:default"' : ''}>‹</button>
      <div style="flex:1;text-align:center">
        <h2 style="font-family:var(--font-display);font-size:18px;font-weight:800;color:var(--black)">${month}</h2>
        <p style="font-size:11px;color:var(--text-tertiary)">Paid on ${data.paid}</p>
      </div>
      <button id="nextMonth" style="width:34px;height:34px;border-radius:10px;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all 0.2s" ${months.indexOf(month) <= 0 ? 'disabled style="opacity:0.3;cursor:default"' : ''}>›</button>
    </div>

    <!-- Net Pay Card -->
    <div style="background:linear-gradient(135deg,#ED1C24,#E87C1E);border-radius:24px;padding:28px 30px;margin-bottom:20px;color:white;position:relative;overflow:hidden">
      <div style="position:absolute;top:-30px;right:-30px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,0.08)"></div>
      <div style="position:absolute;bottom:-20px;right:40px;width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.05)"></div>
      <div style="display:flex;align-items:center;justify-content:space-between;position:relative">
        <div>
          <p style="font-size:11px;opacity:0.7;margin-bottom:2px;letter-spacing:0.5px">NET PAY</p>
          <div style="font-family:var(--font-display);font-size:38px;font-weight:800;letter-spacing:-1px">${fmt(data.net)}</div>
          ${pctChange !== null ? `<div style="display:inline-flex;align-items:center;gap:3px;margin-top:6px;padding:3px 10px;background:rgba(255,255,255,0.15);border-radius:8px;font-size:10px;font-weight:600">${parseFloat(pctChange) >= 0 ? '↑' : '↓'} ${Math.abs(pctChange)}% vs last month</div>` : ''}
        </div>
        <div style="display:flex;gap:20px;text-align:center">
          <div>
            <p style="font-size:10px;opacity:0.65;margin-bottom:2px">Gross</p>
            <p style="font-size:18px;font-weight:700">${fmt(data.gross)}</p>
          </div>
          <div style="width:1px;background:rgba(255,255,255,0.2)"></div>
          <div>
            <p style="font-size:10px;opacity:0.65;margin-bottom:2px">Deductions</p>
            <p style="font-size:18px;font-weight:700">${fmt(data.deductions)}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Earnings & Deductions side-by-side -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">
      <div class="card" style="padding:20px;border-radius:20px">
        <h3 style="font-size:10px;font-weight:700;color:var(--teal);letter-spacing:1px;margin-bottom:12px">EARNINGS</h3>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${data.earnings.map(e => `
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:12px;color:var(--text-secondary)">${e.item}</span>
            <span style="font-size:12px;font-weight:600;color:var(--black)">${fmt(e.amount)}</span>
          </div>`).join('')}
          <div style="border-top:1px dashed var(--border);padding-top:8px;display:flex;justify-content:space-between;margin-top:4px">
            <span style="font-size:12px;font-weight:700">Total</span>
            <span style="font-size:13px;font-weight:800;color:var(--teal)">${fmt(data.gross)}</span>
          </div>
        </div>
      </div>
      <div class="card" style="padding:20px;border-radius:20px">
        <h3 style="font-size:10px;font-weight:700;color:var(--red);letter-spacing:1px;margin-bottom:12px">DEDUCTIONS</h3>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${data.deductionList.map(d => `
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:12px;color:var(--text-secondary)">${d.item}</span>
            <span style="font-size:12px;font-weight:600;color:var(--red)">-${fmt(d.amount)}</span>
          </div>`).join('')}
          <div style="border-top:1px dashed var(--border);padding-top:8px;display:flex;justify-content:space-between;margin-top:4px">
            <span style="font-size:12px;font-weight:700">Total</span>
            <span style="font-size:13px;font-weight:800;color:var(--red)">-${fmt(data.deductions)}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Attendance Summary -->
    <div class="card" style="padding:18px 20px;border-radius:20px;margin-bottom:16px">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;text-align:center">
        <div>
          <div style="font-family:var(--font-display);font-size:22px;font-weight:800;color:var(--teal)">${data.attendance.worked}</div>
          <p style="font-size:10px;color:var(--text-tertiary);font-weight:500">Days Worked</p>
        </div>
        <div>
          <div style="font-family:var(--font-display);font-size:22px;font-weight:800;color:var(--orange)">${data.attendance.overtime}h</div>
          <p style="font-size:10px;color:var(--text-tertiary);font-weight:500">Overtime</p>
        </div>
        <div>
          <div style="font-family:var(--font-display);font-size:22px;font-weight:800;color:var(--red)">${data.attendance.leave}</div>
          <p style="font-size:10px;color:var(--text-tertiary);font-weight:500">Leave Taken</p>
        </div>
      </div>
    </div>

    <!-- Net Pay Breakdown Bar -->
    <div class="card" style="padding:18px 20px;border-radius:20px">
      <p style="font-size:10px;font-weight:700;color:var(--text-tertiary);letter-spacing:1px;margin-bottom:10px">PAY BREAKDOWN</p>
      <div style="display:flex;height:10px;border-radius:5px;overflow:hidden;gap:2px">
        <div style="flex:${data.net};background:linear-gradient(90deg,var(--teal),var(--mint));border-radius:5px" title="Net Pay"></div>
        <div style="flex:${data.deductions};background:var(--red);border-radius:5px;opacity:0.5" title="Deductions"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:8px">
        <div style="display:flex;align-items:center;gap:5px"><div style="width:8px;height:8px;border-radius:50%;background:var(--teal)"></div><span style="font-size:10px;color:var(--text-tertiary)">Net Pay ${(data.net / data.gross * 100).toFixed(0)}%</span></div>
        <div style="display:flex;align-items:center;gap:5px"><div style="width:8px;height:8px;border-radius:50%;background:var(--red);opacity:0.5"></div><span style="font-size:10px;color:var(--text-tertiary)">Deductions ${(data.deductions / data.gross * 100).toFixed(0)}%</span></div>
      </div>
    </div>`;
  }

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <div>
            <h1 style="font-family:var(--font-display);font-size:24px;font-weight:700">Payslip</h1>
            <p style="font-size:12px;color:var(--text-tertiary)">Your earnings & deductions</p>
          </div>
          <div style="display:flex;gap:8px">
            <button id="downloadPDF" class="btn-dark" style="padding:10px 18px;font-size:12px;border-radius:14px">📄 Download PDF</button>
          </div>
        </div>
        <div id="payslipContent">
          ${buildPayslipContent(payslips[selectedMonth], selectedMonth)}
        </div>
      </div>

      <div class="col-side">
        <!-- Pay History -->
        <div class="card card-lg" style="margin-bottom:14px;border-radius:22px;padding:22px 20px">
          <h3 style="font-family:var(--font-display);font-size:15px;font-weight:700;margin-bottom:14px">Pay History</h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${months.map((m, i) => `
            <div class="pay-history-item" data-month="${m}" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;cursor:pointer;transition:all 0.2s;${i === 0 ? 'background:rgba(0,167,157,0.06);border:1px solid rgba(0,167,157,0.15)' : 'border:1px solid transparent'}">
              <div style="width:6px;height:6px;border-radius:50%;background:${i === 0 ? 'var(--teal)' : '#ddd'};flex-shrink:0"></div>
              <span style="font-size:12px;color:var(--text-tertiary);flex:1">${m}</span>
              <span style="font-size:13px;font-weight:700">${fmt(payslips[m].net)}</span>
              <span class="badge badge-green" style="font-size:9px;padding:3px 8px">Paid</span>
            </div>`).join('')}
          </div>
          <!-- Mini chart -->
          <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border)">
            <p style="font-size:10px;font-weight:600;color:var(--text-tertiary);margin-bottom:10px">4-MONTH TREND</p>
            <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:6px;height:60px">
              ${months.slice().reverse().map(m => {
                const pct = ((payslips[m].net - 2000) / 800 * 100);
                return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px">
                  <span style="font-size:8px;font-weight:700;color:var(--text-tertiary)">${fmt(payslips[m].net).replace('.00','')}</span>
                  <div style="width:100%;height:${Math.max(pct, 15)}%;background:linear-gradient(180deg,var(--teal),var(--mint));border-radius:6px 6px 4px 4px;min-height:8px;transition:height 0.3s"></div>
                  <span style="font-size:8px;color:var(--text-tertiary)">${m.split(' ')[0].slice(0,3)}</span>
                </div>`;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- AI Salary Assistant -->
        <div class="card card-lg" style="margin-bottom:14px;border-radius:22px;padding:22px 20px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
            <div style="width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,rgba(0,167,157,0.12),rgba(0,167,157,0.06));display:flex;align-items:center;justify-content:center;font-size:16px">🤖</div>
            <div>
              <h3 style="font-family:var(--font-display);font-size:14px;font-weight:700">AI Salary Assistant</h3>
              <p style="font-size:10px;color:var(--text-tertiary)">Ask about your pay</p>
            </div>
          </div>
          <div id="aiChatBox" style="max-height:220px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;margin-bottom:10px">
            <div style="padding:10px 12px;background:rgba(0,167,157,0.06);border-radius:12px 12px 12px 4px;font-size:11px;color:var(--text-secondary);line-height:1.5">
              Hi Vanna! 👋 I can help you understand your payslip. Try asking me about your salary, deductions, overtime, or next pay day.
            </div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px" id="aiQuickBtns">
            ${['How is my salary calculated', 'Why salary different this month', 'What is overtime rate', 'When is next pay day', 'How much tax do I pay'].map(q => `
            <button class="ai-quick-q" style="padding:5px 10px;font-size:9px;font-weight:600;background:rgba(0,167,157,0.06);color:var(--teal);border:1px solid rgba(0,167,157,0.15);border-radius:8px;cursor:pointer;transition:all 0.2s">${q}</button>`).join('')}
          </div>
          <div style="display:flex;gap:6px">
            <input id="aiInput" type="text" placeholder="Ask about your salary…" style="flex:1;padding:9px 12px;border:1px solid var(--border);border-radius:12px;font-size:11px;background:var(--glass-bg);outline:none">
            <button id="aiSendBtn" style="width:34px;height:34px;border-radius:10px;background:var(--teal);color:white;border:none;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0">↑</button>
          </div>
        </div>

        <!-- Contact HR -->
        <div class="card card-lg" style="border-radius:22px;padding:22px 20px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
            <div style="width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,rgba(237,28,36,0.12),rgba(237,28,36,0.06));display:flex;align-items:center;justify-content:center;font-size:16px">💬</div>
            <div>
              <h3 style="font-family:var(--font-display);font-size:14px;font-weight:700">Contact HR</h3>
              <p style="font-size:10px;color:var(--text-tertiary)">Questions or concerns</p>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px">
            <button class="hr-action-btn" data-type="question" style="display:flex;align-items:center;gap:10px;padding:11px 14px;background:rgba(0,167,157,0.04);border:1px solid rgba(0,167,157,0.12);border-radius:14px;cursor:pointer;transition:all 0.2s;text-align:left;width:100%">
              <span style="font-size:16px">❓</span>
              <div style="flex:1"><p style="font-size:12px;font-weight:600;color:var(--black)">Ask a Question</p><p style="font-size:10px;color:var(--text-tertiary)">About salary, benefits, policy</p></div>
              <span style="font-size:12px;color:var(--text-tertiary)">→</span>
            </button>
            <button class="hr-action-btn" data-type="complaint" style="display:flex;align-items:center;gap:10px;padding:11px 14px;background:rgba(232,124,30,0.04);border:1px solid rgba(232,124,30,0.12);border-radius:14px;cursor:pointer;transition:all 0.2s;text-align:left;width:100%">
              <span style="font-size:16px">⚠️</span>
              <div style="flex:1"><p style="font-size:12px;font-weight:600;color:var(--black)">File a Complaint</p><p style="font-size:10px;color:var(--text-tertiary)">Report payroll discrepancy</p></div>
              <span style="font-size:12px;color:var(--text-tertiary)">→</span>
            </button>
            <button class="hr-action-btn" data-type="chat" style="display:flex;align-items:center;gap:10px;padding:11px 14px;background:rgba(0,167,157,0.04);border:1px solid rgba(0,167,157,0.12);border-radius:14px;cursor:pointer;transition:all 0.2s;text-align:left;width:100%">
              <span style="font-size:16px">💬</span>
              <div style="flex:1"><p style="font-size:12px;font-weight:600;color:var(--black)">Chat with HR</p><p style="font-size:10px;color:var(--text-tertiary)">Direct message to HR team</p></div>
              <span style="font-size:12px;color:var(--text-tertiary)">→</span>
            </button>
          </div>
          <div id="hrFormArea" style="display:none"></div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);

  /* ── Event binding ── */
  setTimeout(() => {
    function refreshPayslip() {
      const container = page.querySelector('#payslipContent');
      if (!container) return;
      container.innerHTML = buildPayslipContent(payslips[selectedMonth], selectedMonth);
      bindPayslipNav();
      highlightHistory();
    }

    function bindPayslipNav() {
      const prev = page.querySelector('#prevMonth');
      const next = page.querySelector('#nextMonth');
      if (prev) prev.onclick = () => {
        const idx = months.indexOf(selectedMonth);
        if (idx < months.length - 1) { selectedMonth = months[idx + 1]; refreshPayslip(); }
      };
      if (next) next.onclick = () => {
        const idx = months.indexOf(selectedMonth);
        if (idx > 0) { selectedMonth = months[idx - 1]; refreshPayslip(); }
      };
    }

    function highlightHistory() {
      page.querySelectorAll('.pay-history-item').forEach(item => {
        const m = item.dataset.month;
        const isActive = m === selectedMonth;
        item.style.background = isActive ? 'rgba(0,167,157,0.06)' : 'transparent';
        item.style.border = isActive ? '1px solid rgba(0,167,157,0.15)' : '1px solid transparent';
        item.querySelector('div').style.background = isActive ? 'var(--teal)' : '#ddd';
      });
    }

    /* Pay history click */
    page.querySelectorAll('.pay-history-item').forEach(item => {
      item.onclick = () => {
        selectedMonth = item.dataset.month;
        refreshPayslip();
      };
    });

    bindPayslipNav();

    /* Download PDF */
    const dlBtn = page.querySelector('#downloadPDF');
    if (dlBtn) dlBtn.onclick = () => {
      dlBtn.innerHTML = '✓ Downloaded';
      dlBtn.style.opacity = '0.7';
      setTimeout(() => { dlBtn.innerHTML = '📄 Download PDF'; dlBtn.style.opacity = ''; }, 1500);
    };

    /* ── AI Chat ── */
    const chatBox = page.querySelector('#aiChatBox');
    const aiInput = page.querySelector('#aiInput');
    const aiSend = page.querySelector('#aiSendBtn');

    function addAiMessage(text, isUser) {
      const div = document.createElement('div');
      div.style.cssText = isUser
        ? 'padding:8px 12px;background:var(--teal);color:white;border-radius:12px 12px 4px 12px;font-size:11px;align-self:flex-end;max-width:85%'
        : 'padding:10px 12px;background:rgba(0,167,157,0.06);border-radius:12px 12px 12px 4px;font-size:11px;color:var(--text-secondary);line-height:1.5;max-width:90%';
      div.innerHTML = isUser ? text : text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    function handleAiQuery(question) {
      addAiMessage(question, true);
      const key = Object.keys(aiResponses).find(k => question.toLowerCase().includes(k) || k.includes(question.toLowerCase().replace(/[?.,!]/g, '').trim().slice(0, 15)));
      setTimeout(() => {
        if (key) {
          addAiMessage(aiResponses[key], false);
        } else {
          const data = payslips[selectedMonth];
          addAiMessage('For <strong>' + selectedMonth + '</strong>: Your gross pay is ' + fmt(data.gross) + ', with ' + fmt(data.deductions) + ' in deductions, giving you a net pay of <strong>' + fmt(data.net) + '</strong>. Can you rephrase your question? I can help with salary calculations, overtime, tax, or pay dates.', false);
        }
      }, 600);
    }

    if (aiSend) aiSend.onclick = () => {
      const q = aiInput.value.trim();
      if (!q) return;
      aiInput.value = '';
      handleAiQuery(q);
    };
    if (aiInput) aiInput.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); aiSend.click(); } };

    page.querySelectorAll('.ai-quick-q').forEach(btn => {
      btn.onclick = () => handleAiQuery(btn.textContent);
    });

    /* ── HR Contact Form ── */
    const hrFormArea = page.querySelector('#hrFormArea');
    page.querySelectorAll('.hr-action-btn').forEach(btn => {
      btn.onclick = () => {
        const type = btn.dataset.type;
        if (type === 'chat') {
          Router.navigate('/chat/hr');
          return;
        }
        const isComplaint = type === 'complaint';
        const color = isComplaint ? 'var(--orange)' : 'var(--teal)';
        hrFormArea.style.display = 'block';
        hrFormArea.innerHTML = `
          <div style="padding:16px;background:${isComplaint ? 'rgba(232,124,30,0.04)' : 'rgba(0,167,157,0.04)'};border:1px solid ${isComplaint ? 'rgba(232,124,30,0.15)' : 'rgba(0,167,157,0.15)'};border-radius:16px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
              <h4 style="font-size:13px;font-weight:700">${isComplaint ? '⚠️ File Complaint' : '❓ Ask HR'}</h4>
              <button id="closeHrForm" style="background:none;border:none;cursor:pointer;font-size:16px;color:var(--text-tertiary)">✕</button>
            </div>
            <div style="margin-bottom:10px">
              <label style="font-size:10px;font-weight:600;color:var(--text-tertiary);display:block;margin-bottom:4px">SUBJECT</label>
              <select id="hrSubject" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:10px;font-size:11px;background:white">
                ${isComplaint
                  ? '<option>Payroll discrepancy</option><option>Missing overtime pay</option><option>Incorrect deduction</option><option>Late payment</option><option>Other</option>'
                  : '<option>Salary inquiry</option><option>Benefits question</option><option>Leave balance</option><option>Tax certificate</option><option>Other</option>'}
              </select>
            </div>
            <div style="margin-bottom:10px">
              <label style="font-size:10px;font-weight:600;color:var(--text-tertiary);display:block;margin-bottom:4px">DETAILS</label>
              <textarea id="hrMessage" rows="3" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:10px;font-size:11px;font-family:inherit;resize:vertical;background:white" placeholder="${isComplaint ? 'Describe the issue in detail…' : 'What would you like to know?'}"></textarea>
            </div>
            <div style="display:flex;gap:6px">
              <button id="submitHrForm" style="flex:1;padding:9px;font-size:11px;font-weight:700;background:${color};color:white;border:none;border-radius:10px;cursor:pointer">${isComplaint ? 'Submit Complaint' : 'Send Question'}</button>
            </div>
          </div>`;
        hrFormArea.querySelector('#closeHrForm').onclick = () => { hrFormArea.style.display = 'none'; };
        hrFormArea.querySelector('#submitHrForm').onclick = () => {
          const btn2 = hrFormArea.querySelector('#submitHrForm');
          btn2.innerHTML = '✓ Sent to HR';
          btn2.style.opacity = '0.7';
          setTimeout(() => { hrFormArea.style.display = 'none'; }, 1500);
        };
      };
    });
  });

  return page;
});
