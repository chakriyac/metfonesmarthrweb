/* ─── Metfone Smart HR — Router + Glass Design System ─── */
const Router = {
  routes: {},
  current: null,
  _transitioning: false,

  register(path, renderFn) {
    this.routes[path] = renderFn;
  },

  navigate(path) {
    window.location.hash = '#' + path;
  },

  _resolve() {
    const hash = window.location.hash.slice(1) || '/';
    const app = document.getElementById('app');
    let renderFn = null;
    let args = [];

    if (this.routes[hash]) {
      renderFn = this.routes[hash];
    } else {
      for (const pattern of Object.keys(this.routes)) {
        const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, '([^/]+)') + '$');
        const match = hash.match(regex);
        if (match) {
          renderFn = this.routes[pattern];
          args = match.slice(1);
          break;
        }
      }
    }

    if (!renderFn) { this.navigate('/'); return; }
    if (this._transitioning) return;

    const oldContent = app.firstElementChild;
    const newPage = renderFn(...args);

    /* Smooth cross-fade transition */
    if (oldContent && !document.hidden) {
      this._transitioning = true;
      oldContent.style.transition = 'opacity 0.18s ease-out, transform 0.18s ease-out';
      oldContent.style.opacity = '0';
      oldContent.style.transform = 'translateY(6px)';

      setTimeout(() => {
        this.current = hash;
        app.innerHTML = '';
        newPage.classList.add('page-enter');
        app.appendChild(newPage);
        window.scrollTo({ top: 0, behavior: 'instant' });

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            newPage.classList.remove('page-enter');
            newPage.classList.add('page-enter-active');
            this._transitioning = false;
          });
        });
      }, 180);
    } else {
      this.current = hash;
      app.innerHTML = '';
      newPage.classList.add('page-enter-active');
      app.appendChild(newPage);
      window.scrollTo(0, 0);
    }
  },

  start() {
    window.addEventListener('hashchange', () => this._resolve());
    this._resolve();
  }
};

/* ─── Shared helpers ─── */
function el(tag, attrs, ...children) {
  const e = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'className') e.className = v;
      else if (k === 'onclick') e.addEventListener('click', v);
      else if (k === 'innerHTML') e.innerHTML = v;
      else if (k.startsWith('data')) e.setAttribute(k.replace(/([A-Z])/g, '-$1').toLowerCase(), v);
      else e.setAttribute(k, v);
    }
  }
  for (const c of children) {
    if (typeof c === 'string') e.appendChild(document.createTextNode(c));
    else if (c) e.appendChild(c);
  }
  return e;
}

function logoHTML(size) {
  return `<span class="logo-m ${size}"><span class="bar-left"></span><span class="bar-right"></span><span class="diamond"></span></span>`;
}

/* Background orbs injected once per page */
function bgOrbs() {
  return `<div class="app-bg-orbs"><div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div></div>`;
}

/* Tab switching helper */
function initTabs(container) {
  setTimeout(() => {
    const tabs = container.querySelectorAll('.tab');
    tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
    }));
  });
}

/* ─── Logout ─── */
function logout() {
  sessionStorage.removeItem('loginRole');
  Router.navigate('/');
}

/* ─── Sidebar + bottom nav (seeker vs HR) ─── */
function seekerSidebar(active) {
  const navItems = [
    { icon: '🏠', label: 'Home', route: '/home' },
    { icon: '📋', label: 'Applications', route: '/applications' },
    { icon: '📍', label: 'Tracking', route: '/tracking' },
    { icon: '', label: 'Profile', route: '/profile' },
  ];
  return sidebarTemplate(navItems, active, {
    initials: 'SC', name: 'Sokha Chan', role: 'Job Seeker',
    color: '#FDE8E8', textColor: '#ED1C24'
  });
}

function hrSidebar(active) {
  const navItems = [
    { icon: '📊', label: 'Dashboard', route: '/hr/dashboard' },
    { icon: '📃', label: 'Jobs', route: '/hr/jobs' },
    { icon: '📋', label: 'Applications', route: '/hr/applications' },
    { icon: '🏆', label: 'Talent Ranking', route: '/hr/candidates/rank' },
    { icon: '📅', label: 'Attendance', route: '/hr/attendance' },
    { icon: '👥', label: 'Employees', route: '/hr/employees' },
    { icon: '📒', label: 'Staff Directory', route: '/hr/directory' },
    { icon: '💬', label: 'Messages', route: '/hr/messages' },
    { icon: '👤', label: 'Profile', route: '/hr/profile' },
  ];
  return sidebarTemplate(navItems, active, {
    initials: 'DS', name: 'Dara Samnang', role: 'HR Officer',
    color: '#F0F9F8', textColor: '#00A79D'
  }, 'HR MANAGEMENT');
}

function employeeSidebar(active) {
  const navItems = [
    { icon: '🏠', label: 'Dashboard', route: '/employee/dashboard' },
    { icon: '✅', label: 'Check In/Out', route: '/employee/checkin' },
    { icon: '📅', label: 'Attendance', route: '/employee/attendance' },
    { icon: '🏖️', label: 'Leave', route: '/employee/leave' },
    { icon: '💰', label: 'Payslip', route: '/employee/payslip' },
    { icon: '🔔', label: 'Notifications', route: '/notifications' },
    { icon: '👤', label: 'Profile', route: '/employee/profile' },
  ];
  return sidebarTemplate(navItems, active, {
    initials: 'VN', name: 'Vanna Nob', role: 'Staff · HR Dept',
    color: '#E8F5E9', textColor: '#34C759'
  }, 'EMPLOYEE');
}

function managerSidebar(active) {
  const navItems = [
    { icon: '🏠', label: 'Dashboard', route: '/employee/dashboard' },
    { icon: '👥', label: 'My Team', route: '/manager/team' },
    { icon: '✅', label: 'Check In/Out', route: '/employee/checkin' },
    { icon: '📝', label: 'Leave Approvals', route: '/manager/leave' },
    { icon: '📅', label: 'Attendance', route: '/employee/attendance' },
    { icon: '💰', label: 'Payslip', route: '/employee/payslip' },
    { icon: '🔔', label: 'Notifications', route: '/notifications' },
    { icon: '👤', label: 'Profile', route: '/employee/profile' },
  ];
  return sidebarTemplate(navItems, active, {
    initials: 'SM', name: 'Sopheap Meas', role: 'Manager · IT Dept',
    color: '#FFF8F0', textColor: '#E87C1E'
  }, 'MANAGER');
}

function sidebarTemplate(items, active, profile, groupLabel) {
  const wrapper = el('div');

  /* Sidebar */
  const sidebar = el('aside', { className: 'sidebar' });
  const logoBlock = el('div', { className: 'sidebar-logo' });
  logoBlock.innerHTML = `
    <div class="logo-icon">${logoHTML('sm')}</div>
    <div class="logo-text"><h3>Metfone</h3><span>Smart HR</span></div>`;
  sidebar.appendChild(logoBlock);

  const nav = el('nav', { className: 'sidebar-nav' });
  if (groupLabel) nav.appendChild(el('div', { className: 'nav-label' }, groupLabel));
  items.forEach(item => {
    const a = el('a', { href: '#' + item.route, className: item.route === active ? 'active' : '' });
    a.innerHTML = `<span class="icon">${item.icon}</span>${item.label}`;
    nav.appendChild(a);
  });
  sidebar.appendChild(nav);

  const prof = el('div', { className: 'sidebar-profile' });
  prof.innerHTML = `
    <div class="avatar avatar-sm" style="background:${profile.color};color:${profile.textColor}">${profile.initials}</div>
    <div class="info"><div class="name">${profile.name}</div><div class="role">${profile.role}</div></div>`;
  sidebar.appendChild(prof);

  /* Logout button at bottom of sidebar */
  const logoutBtn = el('div', { className: 'sidebar-logout' });
  logoutBtn.innerHTML = `<button onclick="logout()" class="sidebar-logout-btn">🚪 Sign Out</button>`;
  sidebar.appendChild(logoutBtn);
  wrapper.appendChild(sidebar);

  /* Sidebar overlay for mobile */
  const overlay = el('div', { className: 'sidebar-overlay' });
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });
  wrapper.appendChild(overlay);

  /* Mobile bottom nav */
  const mobileItems = items.slice(0, 5);
  const bottomNav = el('div', { className: 'bottom-nav' });
  const bottomItems = el('div', { className: 'bottom-nav-items' });
  mobileItems.forEach(item => {
    const a = el('a', { href: '#' + item.route, className: item.route === active ? 'active' : '' });
    a.innerHTML = `<span class="nav-icon">${item.icon}</span>${item.label}`;
    bottomItems.appendChild(a);
  });
  bottomNav.appendChild(bottomItems);
  wrapper.appendChild(bottomNav);

  /* Mobile menu button */
  const menuBtn = el('button', { className: 'mobile-menu-btn' });
  menuBtn.textContent = '☰';
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });
  wrapper.appendChild(menuBtn);

  return wrapper;
}
