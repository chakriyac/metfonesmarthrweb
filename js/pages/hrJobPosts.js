/* ─── HR Job Posts List Page ─── */
Router.register('/hr/jobs', function renderHrJobPosts() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/jobs/create'));

  const jobPosts = [
    { id:'jp1', title:'Recruitment Officer', dept:'HR Department', type:'Full-Time', location:'Phnom Penh',
      status:'open', applicants:3, views:142, posted:'Mar 15, 2026', deadline:'Apr 30, 2026',
      salary:'$800 – $1,200', shared:['linkedin','facebook'], photo:true, scheduled:false,
      desc:'We are looking for a motivated Recruitment Officer to join our HR team…' },
    { id:'jp2', title:'Network Engineer', dept:'IT Department', type:'Full-Time', location:'Phnom Penh',
      status:'open', applicants:4, views:218, posted:'Mar 10, 2026', deadline:'Apr 25, 2026',
      salary:'$1,000 – $1,500', shared:['linkedin'], photo:true, scheduled:false,
      desc:'Join our network infrastructure team to design and maintain enterprise-level systems…' },
    { id:'jp3', title:'Mobile App Developer', dept:'IT Department', type:'Full-Time', location:'Phnom Penh',
      status:'open', applicants:2, views:305, posted:'Mar 5, 2026', deadline:'Apr 15, 2026',
      salary:'$1,200 – $2,000', shared:['linkedin','facebook','telegram'], photo:true, scheduled:false,
      desc:'Build next-generation mobile applications for Metfone digital products…' },
    { id:'jp4', title:'Data Analyst', dept:'Business Intelligence', type:'Full-Time', location:'Phnom Penh',
      status:'open', applicants:2, views:98, posted:'Mar 20, 2026', deadline:'May 5, 2026',
      salary:'$900 – $1,400', shared:[], photo:false, scheduled:false,
      desc:'Analyze business data to drive decision-making across departments…' },
    { id:'jp5', title:'UI/UX Designer', dept:'Product', type:'Full-Time', location:'Phnom Penh',
      status:'open', applicants:1, views:176, posted:'Feb 25, 2026', deadline:'Apr 10, 2026',
      salary:'$1,000 – $1,800', shared:['facebook'], photo:true, scheduled:false,
      desc:'Design beautiful, user-centered interfaces for Metfone digital products…' },
    { id:'jp6', title:'Marketing Intern', dept:'Marketing', type:'Internship', location:'Phnom Penh',
      status:'scheduled', applicants:0, views:0, posted:'—', deadline:'May 30, 2026',
      salary:'$300 – $500', shared:['facebook','telegram'], photo:false, scheduled:'Apr 10, 2026 09:00',
      desc:'3-month internship program for marketing students…' },
    { id:'jp7', title:'Senior Accountant', dept:'Finance', type:'Full-Time', location:'Phnom Penh',
      status:'closed', applicants:6, views:310, posted:'Jan 5, 2026', deadline:'Feb 28, 2026',
      salary:'$1,500 – $2,200', shared:['linkedin'], photo:true, scheduled:false,
      desc:'Senior accounting position overseeing financial reporting and compliance…' },
    { id:'jp8', title:'Customer Service Rep', dept:'Operations', type:'Full-Time', location:'Siem Reap',
      status:'closed', applicants:12, views:487, posted:'Dec 10, 2025', deadline:'Jan 31, 2026',
      salary:'$500 – $800', shared:['facebook'], photo:false, scheduled:false,
      desc:'Front-line customer service for our Siem Reap regional office…' },
    { id:'jp9', title:'QA Engineer', dept:'IT Department', type:'Full-Time', location:'Phnom Penh',
      status:'draft', applicants:0, views:0, posted:'—', deadline:'—',
      salary:'$1,000 – $1,600', shared:[], photo:false, scheduled:false,
      desc:'Ensure quality of Metfone software products through automated testing…' },
  ];

  const totalApplicants = jobPosts.reduce((s, j) => s + j.applicants, 0);
  const openJobs = jobPosts.filter(j => j.status === 'open').length;
  const closedJobs = jobPosts.filter(j => j.status === 'closed').length;

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div style="max-width:1000px">
      <div class="page-header" style="margin-bottom:20px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <h1>Job Posts</h1>
            <p>${jobPosts.length} total posts · ${totalApplicants} applicants · ${openJobs} active</p>
          </div>
          <button class="btn-red" onclick="Router.navigate('/hr/jobs/create')" style="padding:10px 20px;border-radius:14px;font-size:13px;font-weight:700">
            ＋ Create New Post
          </button>
        </div>
      </div>

      <!-- Stats Row -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">
        <div class="glass-card" style="padding:16px;text-align:center">
          <p style="font-size:24px;font-weight:800;color:var(--teal)">${openJobs}</p>
          <p style="font-size:11px;color:var(--text-tertiary);font-weight:600">Active Jobs</p>
        </div>
        <div class="glass-card" style="padding:16px;text-align:center">
          <p style="font-size:24px;font-weight:800;color:var(--orange)">${jobPosts.filter(j=>j.status==='scheduled').length}</p>
          <p style="font-size:11px;color:var(--text-tertiary);font-weight:600">Scheduled</p>
        </div>
        <div class="glass-card" style="padding:16px;text-align:center">
          <p style="font-size:24px;font-weight:800;color:var(--text-secondary)">${closedJobs}</p>
          <p style="font-size:11px;color:var(--text-tertiary);font-weight:600">Closed</p>
        </div>
        <div class="glass-card" style="padding:16px;text-align:center">
          <p style="font-size:24px;font-weight:800;color:var(--red)">${totalApplicants}</p>
          <p style="font-size:11px;color:var(--text-tertiary);font-weight:600">Total Applicants</p>
        </div>
      </div>

      <!-- Search & Filter -->
      <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
        <div style="flex:1;min-width:200px;position:relative">
          <input type="text" id="job-search" placeholder="🔍  Search job posts…" style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:16px;padding:12px 16px;font-size:13px">
        </div>
        <select id="job-dept-filter" style="background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:12px;cursor:pointer;min-width:150px">
          <option value="">All Departments</option>
          <option>IT Department</option>
          <option>HR Department</option>
          <option>Finance</option>
          <option>Marketing</option>
          <option>Business Intelligence</option>
          <option>Operations</option>
          <option>Product</option>
        </select>
        <select id="job-type-filter" style="background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:14px;padding:10px 16px;font-size:12px;cursor:pointer;min-width:130px">
          <option value="">All Types</option>
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
      </div>

      <!-- Tabs -->
      <div class="tab-row" id="job-tabs" style="margin-bottom:20px">
        <button class="tab active" data-filter="all">All Posts</button>
        <button class="tab" data-filter="open">🟢 Open</button>
        <button class="tab" data-filter="scheduled">📅 Scheduled</button>
        <button class="tab" data-filter="draft">📝 Drafts</button>
        <button class="tab" data-filter="closed">🔴 Closed</button>
      </div>

      <!-- Job List -->
      <div id="job-list" class="stagger-children" style="display:flex;flex-direction:column;gap:12px">
      </div>
    </div>`;

  page.appendChild(main);

  setTimeout(() => {

    const statusMeta = {
      open: { label:'Open', color:'var(--teal)', bg:'rgba(0,167,157,0.08)', icon:'🟢' },
      scheduled: { label:'Scheduled', color:'var(--orange)', bg:'rgba(232,124,30,0.08)', icon:'📅' },
      draft: { label:'Draft', color:'var(--text-tertiary)', bg:'rgba(167,169,171,0.08)', icon:'📝' },
      closed: { label:'Closed', color:'var(--red)', bg:'rgba(237,28,36,0.06)', icon:'🔴' },
    };

    const socialIcons = {
      linkedin: { label:'LinkedIn', color:'#0A66C2', icon:'in' },
      facebook: { label:'Facebook', color:'#1877F2', icon:'f' },
      telegram: { label:'Telegram', color:'#2AABEE', icon:'✈' },
    };

    let currentFilter = 'all';
    let searchQuery = '';
    let deptFilter = '';
    let typeFilter = '';

    function renderJobs() {
      const listEl = page.querySelector('#job-list');
      let filtered = jobPosts.filter(j => {
        if (currentFilter !== 'all' && j.status !== currentFilter) return false;
        if (deptFilter && j.dept !== deptFilter) return false;
        if (typeFilter && j.type !== typeFilter) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return j.title.toLowerCase().includes(q) || j.dept.toLowerCase().includes(q) || j.location.toLowerCase().includes(q);
        }
        return true;
      });

      if (filtered.length === 0) {
        listEl.innerHTML = `
          <div class="glass-card" style="padding:40px;text-align:center">
            <p style="font-size:36px;margin-bottom:10px">📭</p>
            <p style="font-size:14px;font-weight:700;margin-bottom:4px">No Job Posts Found</p>
            <p style="font-size:12px;color:var(--text-tertiary)">Try adjusting your filters or create a new post</p>
          </div>`;
        return;
      }

      listEl.innerHTML = filtered.map(j => {
        const sm = statusMeta[j.status];
        return `
          <div class="glass-card job-post-row" style="padding:20px;transition:all 0.2s" data-id="${j.id}">
            <div style="display:flex;align-items:flex-start;gap:14px">
              <!-- Left: Job icon -->
              <div style="width:48px;height:48px;border-radius:16px;background:linear-gradient(135deg,rgba(237,28,36,0.08),rgba(0,167,157,0.08));display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${j.photo ? '🖼️' : '💼'}</div>

              <!-- Middle: Info -->
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap">
                  <h3 style="font-size:15px;font-weight:700">${j.title}</h3>
                  <span style="font-size:10px;padding:3px 10px;border-radius:8px;background:${sm.bg};color:${sm.color};font-weight:700">${sm.icon} ${sm.label}</span>
                  ${j.scheduled ? `<span style="font-size:10px;padding:3px 8px;border-radius:6px;background:rgba(232,124,30,0.06);color:var(--orange)">📅 ${j.scheduled}</span>` : ''}
                </div>
                <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:6px">${j.dept} · ${j.type} · ${j.location} · ${j.salary}</p>
                <p style="font-size:11px;color:var(--text-secondary);line-height:1.5;margin-bottom:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${j.desc}</p>

                <!-- Stats Row -->
                <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px">
                  <span style="font-size:11px;color:var(--text-secondary)">👥 <strong>${j.applicants}</strong> applicants</span>
                  <span style="font-size:11px;color:var(--text-secondary)">👁 <strong>${j.views}</strong> views</span>
                  <span style="font-size:11px;color:var(--text-secondary)">📅 Posted ${j.posted}</span>
                  <span style="font-size:11px;color:var(--text-secondary)">⏰ Deadline ${j.deadline}</span>
                </div>

                <!-- Social badges -->
                <div style="display:flex;gap:6px;flex-wrap:wrap">
                  ${j.shared.map(s => {
                    const si = socialIcons[s];
                    return `<span style="font-size:9px;padding:2px 8px;border-radius:6px;background:${si.color}15;color:${si.color};font-weight:600">${si.icon} ${si.label}</span>`;
                  }).join('')}
                  ${j.shared.length === 0 ? '<span style="font-size:9px;color:var(--text-tertiary)">Not shared to social</span>' : ''}
                </div>
              </div>

              <!-- Right: Actions -->
              <div style="display:flex;flex-direction:column;gap:6px;min-width:120px;flex-shrink:0">
                ${j.status === 'open' ? `
                  <button class="btn-glass job-action" data-action="close" data-id="${j.id}" style="font-size:11px;padding:7px 12px;border-radius:10px;width:100%">🔴 Close Job</button>
                  <button class="btn-glass job-action" data-action="edit" data-id="${j.id}" style="font-size:11px;padding:7px 12px;border-radius:10px;width:100%">✏️ Edit</button>
                  <button class="btn-glass job-action" data-action="reshare" data-id="${j.id}" style="font-size:11px;padding:7px 12px;border-radius:10px;width:100%">📢 Reshare</button>
                ` : j.status === 'closed' ? `
                  <button class="btn-glass job-action" data-action="reopen" data-id="${j.id}" style="font-size:11px;padding:7px 12px;border-radius:10px;width:100%">🟢 Reopen</button>
                  <button class="btn-glass job-action" data-action="duplicate" data-id="${j.id}" style="font-size:11px;padding:7px 12px;border-radius:10px;width:100%">📋 Duplicate</button>
                ` : j.status === 'draft' ? `
                  <button class="btn-red job-action" data-action="publish" data-id="${j.id}" style="font-size:11px;padding:7px 14px;border-radius:10px;width:100%">🚀 Publish</button>
                  <button class="btn-glass job-action" data-action="edit" data-id="${j.id}" style="font-size:11px;padding:7px 12px;border-radius:10px;width:100%">✏️ Edit</button>
                ` : `
                  <button class="btn-glass job-action" data-action="edit" data-id="${j.id}" style="font-size:11px;padding:7px 12px;border-radius:10px;width:100%">✏️ Edit</button>
                `}
              </div>
            </div>
          </div>`;
      }).join('');

      // Bind action buttons
      listEl.querySelectorAll('.job-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const action = btn.dataset.action;
          const id = btn.dataset.id;
          const job = jobPosts.find(j => j.id === id);
          if (!job) return;

          if (action === 'close') {
            job.status = 'closed';
            showToast('🔴 "' + job.title + '" has been closed');
            renderJobs();
          } else if (action === 'reopen') {
            job.status = 'open';
            showToast('🟢 "' + job.title + '" has been reopened');
            renderJobs();
          } else if (action === 'edit') {
            Router.navigate('/hr/jobs/create');
          } else if (action === 'publish') {
            job.status = 'open';
            job.posted = new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
            showToast('🚀 "' + job.title + '" published successfully!');
            renderJobs();
          } else if (action === 'duplicate') {
            showToast('📋 "' + job.title + '" duplicated as draft');
            Router.navigate('/hr/jobs/create');
          } else if (action === 'reshare') {
            showReshareModal(job);
          }
        });
      });

      // Click whole card to navigate
      listEl.querySelectorAll('.job-post-row').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          const id = card.dataset.id;
          const job = jobPosts.find(j => j.id === id);
          if (job && job.applicants > 0) {
            Router.navigate('/hr/applications');
          }
        });
      });
    }

    function showToast(msg) {
      const toast = document.createElement('div');
      toast.style.cssText = 'position:fixed;bottom:30px;right:30px;padding:16px 24px;border-radius:16px;background:var(--teal);color:#fff;font-size:13px;font-weight:700;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,0.2);animation:fadeIn 0.3s';
      toast.textContent = msg;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }

    function showReshareModal(job) {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.4);backdrop-filter:blur(6px);z-index:9998;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s';
      overlay.innerHTML = `
        <div style="background:var(--glass-bg-light);backdrop-filter:blur(24px);border:1px solid var(--glass-border);border-radius:24px;padding:28px;max-width:460px;width:90%;box-shadow:0 24px 80px rgba(0,0,0,0.2);animation:fadeIn 0.3s">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
            <h3 style="font-size:16px;font-weight:800">📢 Reshare "${job.title}"</h3>
            <button id="close-reshare" style="width:28px;height:28px;border-radius:50%;background:var(--glass-bg);border:1px solid var(--glass-border);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center">✕</button>
          </div>

          <p style="font-size:12px;color:var(--text-secondary);margin-bottom:16px">Customize and share this job post to social media platforms</p>

          <div class="input-group" style="margin-bottom:14px">
            <label style="font-size:11px;font-weight:700;color:var(--text-tertiary)">Caption / Description</label>
            <textarea id="reshare-caption" style="width:100%;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:12px;padding:10px 14px;font-size:12px;min-height:80px;resize:vertical;font-family:var(--font-text);color:var(--black)">🔥 We're hiring! ${job.title} at Metfone (${job.dept})\n\n${job.desc}\n\n💰 ${job.salary}/month\n📍 ${job.location}\n\nApply now: careers.metfone.com.kh\n\n#MetfoneJobs #Hiring #Cambodia</textarea>
          </div>

          ${job.photo ? '<p style="font-size:10px;color:var(--teal);font-weight:600;margin-bottom:12px">🖼️ Cover image will be included</p>' : '<p style="font-size:10px;color:var(--text-tertiary);margin-bottom:12px">No cover image — consider adding one for better engagement</p>'}

          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
            <label style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;border:1.5px solid var(--glass-border);cursor:pointer">
              <input type="checkbox" id="rs-linkedin" ${job.shared.includes('linkedin') ? 'checked' : ''} style="accent-color:#0A66C2;width:16px;height:16px">
              <div style="width:28px;height:28px;border-radius:8px;background:#0A66C2;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:800">in</div>
              <span style="font-size:12px;font-weight:600">LinkedIn</span>
              <span style="font-size:10px;color:var(--text-tertiary);margin-left:auto">12.5K followers</span>
            </label>
            <label style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;border:1.5px solid var(--glass-border);cursor:pointer">
              <input type="checkbox" id="rs-facebook" ${job.shared.includes('facebook') ? 'checked' : ''} style="accent-color:#1877F2;width:16px;height:16px">
              <div style="width:28px;height:28px;border-radius:8px;background:#1877F2;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:800">f</div>
              <span style="font-size:12px;font-weight:600">Facebook Page</span>
              <span style="font-size:10px;color:var(--text-tertiary);margin-left:auto">45.2K followers</span>
            </label>
            <label style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;border:1.5px solid var(--glass-border);cursor:pointer">
              <input type="checkbox" id="rs-telegram" ${job.shared.includes('telegram') ? 'checked' : ''} style="accent-color:#2AABEE;width:16px;height:16px">
              <div style="width:28px;height:28px;border-radius:8px;background:#2AABEE;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px">✈</div>
              <span style="font-size:12px;font-weight:600">Telegram Channel</span>
              <span style="font-size:10px;color:var(--text-tertiary);margin-left:auto">8.1K subscribers</span>
            </label>
          </div>

          <div style="display:flex;gap:10px">
            <button id="cancel-reshare" class="btn-glass" style="flex:1;padding:12px;font-size:13px">Cancel</button>
            <button id="confirm-reshare" class="btn-dark" style="flex:1;padding:12px;font-size:13px;font-weight:700;border-radius:14px">📢 Share Now</button>
          </div>
        </div>`;

      document.body.appendChild(overlay);

      overlay.querySelector('#close-reshare').addEventListener('click', () => overlay.remove());
      overlay.querySelector('#cancel-reshare').addEventListener('click', () => overlay.remove());
      overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

      overlay.querySelector('#confirm-reshare').addEventListener('click', () => {
        const newShared = [];
        if (overlay.querySelector('#rs-linkedin').checked) newShared.push('linkedin');
        if (overlay.querySelector('#rs-facebook').checked) newShared.push('facebook');
        if (overlay.querySelector('#rs-telegram').checked) newShared.push('telegram');

        if (newShared.length === 0) { alert('Please select at least one platform.'); return; }

        job.shared = [...new Set([...job.shared, ...newShared])];
        overlay.remove();
        showToast('📢 "' + job.title + '" shared to ' + newShared.map(s => socialIcons[s].label).join(', '));
        renderJobs();
      });
    }

    /* ─── Tab Filter ─── */
    page.querySelectorAll('#job-tabs .tab').forEach(tab => {
      tab.addEventListener('click', () => {
        page.querySelectorAll('#job-tabs .tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.dataset.filter;
        renderJobs();
      });
    });

    /* ─── Search ─── */
    page.querySelector('#job-search').addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderJobs();
    });

    /* ─── Dept Filter ─── */
    page.querySelector('#job-dept-filter').addEventListener('change', (e) => {
      deptFilter = e.target.value;
      renderJobs();
    });

    /* ─── Type Filter ─── */
    page.querySelector('#job-type-filter').addEventListener('change', (e) => {
      typeFilter = e.target.value;
      renderJobs();
    });

    // Initial render
    renderJobs();

  }); /* end setTimeout */

  return page;
});
