/* ─── Manager Team Overview Page ─── */
Router.register('/manager/team', function renderManagerTeam() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(managerSidebar('/manager/team'));

  /* ── Team Members Data ── */
  const team = [
    { id: 1, init: 'PC', name: 'Pisey Chea', position: 'Senior Developer', phone: '012 345 678', email: 'pisey.c@metfone.com.kh', joined: 'Mar 2022', skills: ['React', 'Node.js', 'AWS'], status: 'present', checkIn: '7:52 AM', checkOut: '5:05 PM', lat: 11.5564, lng: 104.9282, outLat: 11.5560, outLng: 104.9278, location: 'Metfone HQ Tower', outLocation: 'Metfone HQ Lobby', lateCount: 1, earlyCount: 14, photo: '#F0F9F8', color: '#00A79D' },
    { id: 2, init: 'SR', name: 'Srey Roth', position: 'UI/UX Designer', phone: '015 678 901', email: 'srey.r@metfone.com.kh', joined: 'Jun 2023', skills: ['Figma', 'Sketch', 'CSS'], status: 'present', checkIn: '8:10 AM', checkOut: '—', lat: 11.5548, lng: 104.9305, outLat: null, outLng: null, location: 'Metfone HQ Tower', outLocation: null, lateCount: 3, earlyCount: 8, photo: '#FDE8E8', color: '#ED1C24' },
    { id: 3, init: 'KV', name: 'Kosal Vann', position: 'Backend Developer', phone: '016 234 567', email: 'kosal.v@metfone.com.kh', joined: 'Jan 2021', skills: ['Java', 'Spring', 'PostgreSQL'], status: 'late', checkIn: '8:45 AM', checkOut: '—', lat: 11.5501, lng: 104.9188, outLat: null, outLng: null, location: 'Metfone Branch BKK', outLocation: null, lateCount: 7, earlyCount: 4, photo: '#FFF8F0', color: '#E87C1E' },
    { id: 4, init: 'TN', name: 'Thida Noun', position: 'QA Engineer', phone: '017 890 123', email: 'thida.n@metfone.com.kh', joined: 'Sep 2022', skills: ['Selenium', 'Jira', 'Python'], status: 'present', checkIn: '7:58 AM', checkOut: '5:15 PM', lat: 11.5564, lng: 104.9282, outLat: 11.5562, outLng: 104.9285, location: 'Metfone HQ Tower', outLocation: 'Metfone HQ Gate', lateCount: 2, earlyCount: 11, photo: '#F0F0FF', color: '#6C63FF' },
    { id: 5, init: 'DM', name: 'Dara Meas', position: 'DevOps Engineer', phone: '012 456 789', email: 'dara.m@metfone.com.kh', joined: 'Nov 2023', skills: ['Docker', 'K8s', 'CI/CD'], status: 'present', checkIn: '7:45 AM', checkOut: '—', lat: 11.5570, lng: 104.9290, outLat: null, outLng: null, location: 'Metfone HQ Tower', outLocation: null, lateCount: 0, earlyCount: 18, photo: '#F0F9F8', color: '#00A79D' },
    { id: 6, init: 'SL', name: 'Sokha Lim', position: 'Mobile Developer', phone: '015 345 678', email: 'sokha.l@metfone.com.kh', joined: 'Feb 2023', skills: ['Swift', 'Kotlin', 'Flutter'], status: 'absent', checkIn: '—', checkOut: '—', lat: null, lng: null, outLat: null, outLng: null, location: '—', outLocation: null, lateCount: 5, earlyCount: 6, photo: '#F7F7F8', color: '#A7A9AB' },
    { id: 7, init: 'VP', name: 'Veasna Phan', position: 'System Admin', phone: '016 789 012', email: 'veasna.p@metfone.com.kh', joined: 'Aug 2021', skills: ['Linux', 'Networking', 'Security'], status: 'present', checkIn: '8:02 AM', checkOut: '5:30 PM', lat: 11.5555, lng: 104.9275, outLat: 11.5552, outLng: 104.9270, location: 'Metfone HQ Tower', outLocation: 'Metfone HQ Parking', lateCount: 2, earlyCount: 10, photo: '#FDE8E8', color: '#BE1E2D' },
    { id: 8, init: 'CN', name: 'Chanthy Ngov', position: 'Data Analyst', phone: '017 012 345', email: 'chanthy.n@metfone.com.kh', joined: 'Apr 2024', skills: ['SQL', 'Python', 'Tableau'], status: 'late', checkIn: '9:12 AM', checkOut: '—', lat: 11.5490, lng: 104.9210, outLat: null, outLng: null, location: 'Metfone Branch TTP', outLocation: null, lateCount: 9, earlyCount: 2, photo: '#FFF8F0', color: '#E87C1E' },
    { id: 9, init: 'RM', name: 'Ratha Mon', position: 'Junior Developer', phone: '012 567 890', email: 'ratha.m@metfone.com.kh', joined: 'Jan 2025', skills: ['JavaScript', 'HTML', 'CSS'], status: 'present', checkIn: '7:55 AM', checkOut: '—', lat: 11.5564, lng: 104.9282, outLat: null, outLng: null, location: 'Metfone HQ Tower', outLocation: null, lateCount: 1, earlyCount: 15, photo: '#F0F9F8', color: '#00A79D' },
  ];

  const presentCount = team.filter(m => m.status === 'present').length;
  const lateCount = team.filter(m => m.status === 'late').length;
  const absentCount = team.filter(m => m.status === 'absent').length;

  let activeFilter = 'all';
  let selectedMember = null;
  let showMap = false;
  let viewMode = 'list'; /* 'list' or 'map' */

  function filterTeam() {
    if (activeFilter === 'all') return team;
    return team.filter(m => m.status === activeFilter);
  }

  function statusBadge(s) {
    const map = { present: 'badge-green', late: 'badge-orange', absent: 'badge-red' };
    const label = { present: 'Present', late: 'Late', absent: 'Absent' };
    return `<span class="badge ${map[s] || 'badge-neutral'}">${label[s] || s}</span>`;
  }

  function buildPage() {
    const filtered = filterTeam();
    const main = page.querySelector('.main-content');
    if (!main) return;

    main.innerHTML = `${bgOrbs()}
      <div class="two-col">
        <div class="col-main">
          <div class="page-header">
            <h1>👥 My Team</h1>
            <p>IT Department · ${team.length} members under your management</p>
          </div>

          <!-- Stats -->
          <div class="stats-row" style="margin-bottom:24px">
            <div class="stat-card"><div class="number" style="color:var(--teal)">${presentCount}</div><div class="label">Present</div></div>
            <div class="stat-card"><div class="number" style="color:var(--orange)">${lateCount}</div><div class="label">Late</div></div>
            <div class="stat-card"><div class="number" style="color:var(--red)">${absentCount}</div><div class="label">Absent</div></div>
            <div class="stat-card"><div class="number" style="color:var(--text-primary)">${team.length}</div><div class="label">Total</div></div>
          </div>

          <!-- View Mode Toggle -->
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px">
            <button class="view-mode-btn${viewMode==='list'?' active':''}" data-view="list" style="display:flex;align-items:center;gap:6px;padding:8px 18px;border-radius:var(--radius-pill);border:1.5px solid ${viewMode==='list'?'var(--teal)':'rgba(255,255,255,0.12)'};background:${viewMode==='list'?'rgba(0,167,157,0.15)':'rgba(255,255,255,0.04)'};color:${viewMode==='list'?'var(--teal)':'var(--text-secondary)'};cursor:pointer;font-size:13px;font-weight:600;transition:all 0.2s">
              📋 List View
            </button>
            <button class="view-mode-btn${viewMode==='map'?' active':''}" data-view="map" style="display:flex;align-items:center;gap:6px;padding:8px 18px;border-radius:var(--radius-pill);border:1.5px solid ${viewMode==='map'?'var(--teal)':'rgba(255,255,255,0.12)'};background:${viewMode==='map'?'rgba(0,167,157,0.15)':'rgba(255,255,255,0.04)'};color:${viewMode==='map'?'var(--teal)':'var(--text-secondary)'};cursor:pointer;font-size:13px;font-weight:600;transition:all 0.2s">
              🗺️ Map View
            </button>
          </div>

          ${viewMode === 'map' ? buildFullMapView() : buildListView(filtered)}
        </div>

        <!-- Sidebar -->
        <div class="col-side">
          ${buildAlertsSidebar()}
          ${buildRankingSidebar()}
          ${buildQuickActions()}
        </div>
      </div>`;
  }

  function buildListView(filtered) {
    return `
          <!-- Filter Tabs -->
          <div class="tab-row" style="margin-bottom:20px">
            <button class="tab${activeFilter==='all'?' active':''}" data-filter="all">All (${team.length})</button>
            <button class="tab${activeFilter==='present'?' active':''}" data-filter="present">Present (${presentCount})</button>
            <button class="tab${activeFilter==='late'?' active':''}" data-filter="late">Late (${lateCount})</button>
            <button class="tab${activeFilter==='absent'?' active':''}" data-filter="absent">Absent (${absentCount})</button>
          </div>

          <!-- Team Roster -->
          <div class="section-header" style="display:flex;align-items:center;justify-content:space-between">
            <h2>Team Roster</h2>
            <button id="toggle-map-btn" style="display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:var(--radius-pill);background:rgba(0,167,157,0.12);color:var(--teal);border:none;cursor:pointer;font-size:13px;font-weight:600">
              🗺️ ${showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>

          ${showMap ? buildMapSection() : ''}

          <div class="stagger-children" style="display:flex;flex-direction:column;gap:12px;margin-top:16px">
            ${filtered.length === 0 ? `
              <div class="card" style="text-align:center;padding:40px 20px">
                <div style="font-size:40px;margin-bottom:12px">🔍</div>
                <p style="font-size:14px;color:var(--text-secondary)">No team members match this filter</p>
              </div>
            ` : filtered.map(m => buildMemberCard(m)).join('')}
          </div>`;
  }

  function buildFullMapView() {
    const checkedIn = team.filter(m => m.lat);
    const centerLat = 11.5535;
    const centerLng = 104.9250;
    const sel = selectedMember ? team.find(m => m.id === selectedMember) : null;
    const mapLat = sel && sel.lat ? sel.lat : centerLat;
    const mapLng = sel && sel.lat ? sel.lng : centerLng;
    const mapZoom = sel && sel.lat ? 0.006 : 0.02;

    return `
      <!-- Map + Profile List Layout -->
      <div style="display:grid;grid-template-columns:320px 1fr;gap:0;border-radius:var(--radius-lg);overflow:hidden;border:1px solid rgba(255,255,255,0.1);margin-bottom:20px;min-height:620px">

        <!-- Left: Profile List -->
        <div style="background:rgba(255,255,255,0.03);border-right:1px solid rgba(255,255,255,0.08);overflow-y:auto;max-height:620px">
          <div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.08);position:sticky;top:0;background:rgba(20,20,30,0.95);z-index:2">
            <p style="font-size:13px;font-weight:700">👥 Team Members</p>
            <p style="font-size:11px;color:var(--text-tertiary)">${checkedIn.length}/${team.length} on map · Click to locate</p>
          </div>
          ${team.map(m => `
            <div class="map-profile-item" data-member-id="${m.id}"
                 style="display:flex;align-items:center;gap:10px;padding:12px 16px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s;${selectedMember === m.id ? 'background:rgba(0,167,157,0.12);' : ''}${m.status==='absent'?'opacity:0.55;':''}">
              <div class="avatar" style="width:38px;height:38px;font-size:13px;background:${m.photo};color:${m.color};font-weight:700;flex-shrink:0;border:2px solid ${selectedMember===m.id?'var(--teal)':m.status==='late'?'var(--orange)':m.status==='absent'?'var(--red)':'transparent'}">${m.init}</div>
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:6px">
                  <p style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m.name}</p>
                  ${m.status==='late'?'<span style="width:7px;height:7px;border-radius:50%;background:var(--orange);flex-shrink:0"></span>':m.status==='absent'?'<span style="width:7px;height:7px;border-radius:50%;background:var(--red);flex-shrink:0"></span>':'<span style="width:7px;height:7px;border-radius:50%;background:var(--green,#34C759);flex-shrink:0"></span>'}
                </div>
                <p style="font-size:11px;color:var(--text-tertiary)">${m.position}</p>
                <div style="display:flex;align-items:center;gap:8px;margin-top:3px">
                  ${m.checkIn !== '—' ? `<span style="font-size:10px;color:var(--teal);font-weight:600">↗ ${m.checkIn}</span>` : ''}
                  ${m.checkOut !== '—' ? `<span style="font-size:10px;color:var(--orange);font-weight:600">↙ ${m.checkOut}</span>` : ''}
                  ${m.status === 'absent' ? `<span style="font-size:10px;color:var(--red);font-weight:600">Absent</span>` : ''}
                </div>
              </div>
              ${m.lat ? `<span style="font-size:14px">📍</span>` : ''}
            </div>
          `).join('')}
        </div>

        <!-- Right: Map + Details -->
        <div style="display:flex;flex-direction:column">
          <!-- Map Header -->
          <div style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between;background:rgba(20,20,30,0.6)">
            <div>
              ${sel ? `
                <p style="font-size:14px;font-weight:700">${sel.name}</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${sel.lat ? sel.location + ' · ' + sel.lat.toFixed(4) + ', ' + sel.lng.toFixed(4) : 'No location'}</p>
              ` : `
                <p style="font-size:14px;font-weight:700">📍 All Team Locations</p>
                <p style="font-size:11px;color:var(--text-tertiary)">${checkedIn.length} pins on map</p>
              `}
            </div>
            <div style="display:flex;gap:10px;align-items:center">
              <span style="display:flex;align-items:center;gap:4px;font-size:10px"><span style="width:8px;height:8px;border-radius:50%;background:var(--teal);display:inline-block"></span>In</span>
              <span style="display:flex;align-items:center;gap:4px;font-size:10px"><span style="width:8px;height:8px;border-radius:50%;background:var(--orange);display:inline-block"></span>Out</span>
              <span style="display:flex;align-items:center;gap:4px;font-size:10px"><span style="width:8px;height:8px;border-radius:50%;background:var(--red);display:inline-block"></span>Late</span>
              ${sel ? `<button class="map-reset-btn" style="padding:4px 12px;border-radius:var(--radius-full);border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);color:var(--text-secondary);font-size:11px;cursor:pointer;font-weight:600">Show All</button>` : ''}
            </div>
          </div>

          <!-- Map iframe -->
          <iframe
            width="100%" style="border:0;flex:1;min-height:340px;display:block"
            loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            src="https://www.openstreetmap.org/export/embed.html?bbox=${mapLng-mapZoom}%2C${mapLat-mapZoom*0.6}%2C${mapLng+mapZoom}%2C${mapLat+mapZoom*0.6}&layer=mapnik${sel && sel.lat ? '&marker='+sel.lat+'%2C'+sel.lng : checkedIn.map(m => '&marker='+m.lat+'%2C'+m.lng).join('')}">
          </iframe>

          <!-- Selected Profile Detail -->
          ${sel ? `
            <div style="border-top:1px solid rgba(255,255,255,0.08);padding:16px;background:rgba(255,255,255,0.02)">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
                <div class="avatar" style="width:44px;height:44px;font-size:15px;background:${sel.photo};color:${sel.color};font-weight:700;border:2px solid ${sel.status==='present'?'var(--teal)':sel.status==='late'?'var(--orange)':'var(--red)'}">${sel.init}</div>
                <div style="flex:1">
                  <div style="display:flex;align-items:center;gap:8px">
                    <p style="font-size:15px;font-weight:700">${sel.name}</p>
                    ${statusBadge(sel.status)}
                  </div>
                  <p style="font-size:12px;color:var(--text-tertiary)">${sel.position} · Joined ${sel.joined}</p>
                </div>
                ${sel.lat ? `
                  <a href="https://www.google.com/maps?q=${sel.lat},${sel.lng}" target="_blank" rel="noopener noreferrer"
                     style="display:flex;align-items:center;gap:4px;padding:6px 14px;border-radius:var(--radius-full);background:rgba(0,167,157,0.12);color:var(--teal);text-decoration:none;font-size:12px;font-weight:600"
                     onclick="event.stopPropagation()">🗺️ Google Maps</a>
                ` : ''}
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;font-size:12px;color:var(--text-secondary)">
                <span>📱 ${sel.phone}</span>
                <span>📧 ${sel.email}</span>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px">
                ${sel.skills.map(s => `<span class="badge badge-green" style="font-size:10px">${s}</span>`).join('')}
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px">
                <div class="card" style="padding:10px;text-align:center">
                  <p style="font-size:10px;color:var(--text-tertiary)">Check In</p>
                  <p style="font-size:14px;font-weight:700;color:var(--teal)">${sel.checkIn}</p>
                </div>
                <div class="card" style="padding:10px;text-align:center">
                  <p style="font-size:10px;color:var(--text-tertiary)">Check Out</p>
                  <p style="font-size:14px;font-weight:700;color:${sel.checkOut !== '—' ? 'var(--orange)' : 'var(--text-placeholder)'}">${sel.checkOut}</p>
                </div>
                <div class="card" style="padding:10px;text-align:center">
                  <p style="font-size:10px;color:var(--text-tertiary)">Late</p>
                  <p style="font-size:14px;font-weight:700;color:${sel.lateCount > 5 ? 'var(--red)' : sel.lateCount > 2 ? 'var(--orange)' : 'var(--teal)'}">${sel.lateCount}×</p>
                </div>
                <div class="card" style="padding:10px;text-align:center">
                  <p style="font-size:10px;color:var(--text-tertiary)">Early</p>
                  <p style="font-size:14px;font-weight:700;color:var(--teal)">${sel.earlyCount}×</p>
                </div>
              </div>
              ${sel.outLat ? `
                <div style="margin-top:10px;padding:10px;border-radius:var(--radius-lg);background:rgba(232,124,30,0.06);border:1px solid rgba(232,124,30,0.12)">
                  <div style="display:flex;align-items:center;justify-content:space-between">
                    <div>
                      <p style="font-size:11px;font-weight:600;color:var(--orange)">📍 Check-out: ${sel.outLocation}</p>
                      <p style="font-size:10px;color:var(--text-tertiary);font-family:monospace">${sel.outLat.toFixed(4)}, ${sel.outLng.toFixed(4)}</p>
                    </div>
                    <a href="https://www.google.com/maps?q=${sel.outLat},${sel.outLng}" target="_blank" rel="noopener noreferrer"
                       style="padding:4px 10px;border-radius:var(--radius-full);background:rgba(232,124,30,0.12);color:var(--orange);text-decoration:none;font-size:11px;font-weight:600"
                       onclick="event.stopPropagation()">View ↗</a>
                  </div>
                </div>
              ` : ''}
            </div>
          ` : `
            <div style="border-top:1px solid rgba(255,255,255,0.08);padding:14px 16px;display:flex;flex-wrap:wrap;gap:6px;background:rgba(255,255,255,0.02)">
              ${checkedIn.map(m => `
                <div class="map-profile-chip" data-member-id="${m.id}" style="display:flex;align-items:center;gap:5px;padding:5px 10px;border-radius:var(--radius-full);background:rgba(255,255,255,0.06);font-size:11px;cursor:pointer;transition:background 0.2s;border:1px solid ${m.status==='late'?'rgba(232,124,30,0.2)':'rgba(255,255,255,0.08)'}">
                  <span class="avatar" style="width:18px;height:18px;font-size:8px;background:${m.photo};color:${m.color}">${m.init}</span>
                  <span style="font-weight:600">${m.name.split(' ')[0]}</span>
                  <span style="color:var(--text-tertiary)">${m.checkIn}</span>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>`;
  }

  function buildMemberCard(m) {
    const isExpanded = selectedMember === m.id;
    return `
      <div class="card card-lg member-card" data-member-id="${m.id}" style="cursor:pointer;transition:all 0.3s ease;${m.status==='late'?'border-left:3px solid var(--orange);':''}${m.status==='absent'?'border-left:3px solid var(--red);opacity:0.75;':''}">
        <div style="display:flex;align-items:center;gap:14px">
          <div class="avatar avatar-sm" style="background:${m.photo};color:${m.color};font-weight:700;flex-shrink:0">${m.init}</div>
          <div style="flex:1;min-width:0">
            <p style="font-size:14px;font-weight:600;margin-bottom:2px">${m.name}</p>
            <p style="font-size:12px;color:var(--text-tertiary)">${m.position}</p>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            ${statusBadge(m.status)}
            <span style="font-size:11px;color:var(--text-tertiary);white-space:nowrap">${m.checkIn !== '—' ? '↗ ' + m.checkIn : ''}</span>
            <span style="font-size:18px;color:var(--text-tertiary);transition:transform 0.3s">${isExpanded ? '▾' : '▸'}</span>
          </div>
        </div>

        ${isExpanded ? `
          <div style="margin-top:16px;padding-top:16px;border-top:1px dashed rgba(255,255,255,0.15);animation:fadeSlideUp 0.3s ease">
            <!-- Profile Details -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
              <div class="card" style="padding:12px">
                <p style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px">📱 Phone</p>
                <p style="font-size:13px;font-weight:600">${m.phone}</p>
              </div>
              <div class="card" style="padding:12px">
                <p style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px">📧 Email</p>
                <p style="font-size:13px;font-weight:600">${m.email}</p>
              </div>
              <div class="card" style="padding:12px">
                <p style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px">📅 Joined</p>
                <p style="font-size:13px;font-weight:600">${m.joined}</p>
              </div>
              <div class="card" style="padding:12px">
                <p style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px">📍 Location</p>
                <p style="font-size:13px;font-weight:600">${m.location}</p>
              </div>
            </div>

            <!-- Skills -->
            <div style="margin-bottom:16px">
              <p style="font-size:11px;color:var(--text-tertiary);margin-bottom:8px">🛠 Skills</p>
              <div style="display:flex;flex-wrap:wrap;gap:6px">
                ${m.skills.map(s => `<span class="badge badge-green" style="font-size:11px">${s}</span>`).join('')}
              </div>
            </div>

            <!-- Attendance Details -->
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px">
              <div class="card" style="padding:12px;text-align:center">
                <p style="font-size:11px;color:var(--text-tertiary)">Check In</p>
                <p style="font-size:16px;font-weight:700;color:var(--teal)">${m.checkIn}</p>
              </div>
              <div class="card" style="padding:12px;text-align:center">
                <p style="font-size:11px;color:var(--text-tertiary)">Check Out</p>
                <p style="font-size:16px;font-weight:700;color:${m.checkOut !== '—' ? 'var(--orange)' : 'var(--text-placeholder)'}">${m.checkOut}</p>
              </div>
              <div class="card" style="padding:12px;text-align:center">
                <p style="font-size:11px;color:var(--text-tertiary)">Late This Month</p>
                <p style="font-size:16px;font-weight:700;color:${m.lateCount > 5 ? 'var(--red)' : m.lateCount > 2 ? 'var(--orange)' : 'var(--teal)'}">${m.lateCount}</p>
              </div>
            </div>

            <!-- Map for this member -->
            ${m.lat ? `
              <div style="margin-bottom:12px">
                <p style="font-size:11px;color:var(--text-tertiary);margin-bottom:8px">📍 Check-in Location</p>
                <div style="border-radius:var(--radius-lg);overflow:hidden;border:1px solid rgba(255,255,255,0.12)">
                  <iframe
                    width="100%" height="200" style="border:0;border-radius:var(--radius-lg)"
                    loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=${m.lng-0.003}%2C${m.lat-0.002}%2C${m.lng+0.003}%2C${m.lat+0.002}&layer=mapnik&marker=${m.lat}%2C${m.lng}">
                  </iframe>
                  <a href="https://www.google.com/maps?q=${m.lat},${m.lng}" target="_blank" rel="noopener noreferrer"
                     style="display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;background:rgba(0,167,157,0.08);font-size:12px;font-weight:600;color:var(--teal);text-decoration:none;transition:background 0.2s"
                     onmouseover="this.style.background='rgba(0,167,157,0.15)'" onmouseout="this.style.background='rgba(0,167,157,0.08)'">
                    🗺️ Open in Google Maps
                  </a>
                </div>
              </div>
            ` : `
              <div class="card" style="padding:16px;text-align:center;opacity:0.6">
                <span style="font-size:20px">📍</span>
                <p style="font-size:12px;color:var(--text-tertiary);margin-top:4px">No location data — employee absent today</p>
              </div>
            `}
          </div>
        ` : ''}
      </div>`;
  }

  function buildMapSection() {
    const withLocation = team.filter(m => m.lat && m.status !== 'absent');
    const centerLat = 11.5545;
    const centerLng = 104.9260;
    const markers = withLocation.map(m =>
      `&marker=${m.lat}%2C${m.lng}`
    ).join('');
    return `
      <div class="card card-lg" style="margin-top:16px;padding:0;overflow:hidden">
        <div style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.1)">
          <p style="font-size:14px;font-weight:600">📍 Team Check-in Locations</p>
          <p style="font-size:12px;color:var(--text-tertiary)">${withLocation.length} members checked in today</p>
        </div>
        <iframe
          width="100%" height="350" style="border:0"
          loading="lazy" referrerpolicy="no-referrer-when-downgrade"
          src="https://www.openstreetmap.org/export/embed.html?bbox=${centerLng-0.015}%2C${centerLat-0.01}%2C${centerLng+0.015}%2C${centerLat+0.01}&layer=mapnik${markers}">
        </iframe>
        <div style="padding:12px 20px;display:flex;flex-wrap:wrap;gap:8px">
          ${withLocation.map(m => `
            <div style="display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:var(--radius-full);background:rgba(255,255,255,0.06);font-size:11px">
              <span class="avatar" style="width:20px;height:20px;font-size:9px;background:${m.photo};color:${m.color}">${m.init}</span>
              <span style="font-weight:600">${m.name.split(' ')[0]}</span>
              <span style="color:var(--text-tertiary)">${m.checkIn}</span>
            </div>
          `).join('')}
        </div>
      </div>`;
  }

  function buildAlertsSidebar() {
    const alerts = [];
    team.forEach(m => {
      if (m.status === 'late') alerts.push({ icon: '⚠️', text: `${m.name} checked in late at ${m.checkIn}`, color: 'var(--orange)', time: 'Today' });
      if (m.status === 'absent') alerts.push({ icon: '🚫', text: `${m.name} has not checked in`, color: 'var(--red)', time: 'Today' });
    });
    const highLate = team.filter(m => m.lateCount >= 5).sort((a, b) => b.lateCount - a.lateCount);
    highLate.forEach(m => {
      alerts.push({ icon: '🔴', text: `${m.name}: ${m.lateCount} lates this month`, color: 'var(--red)', time: 'This Month' });
    });

    return `
      <div class="card card-lg" style="margin-bottom:20px">
        <div class="section-header" style="margin-bottom:16px"><h3>🔔 Alerts</h3></div>
        ${alerts.length === 0 ? `
          <div style="text-align:center;padding:20px">
            <span style="font-size:28px">✅</span>
            <p style="font-size:13px;color:var(--text-secondary);margin-top:8px">No alerts today</p>
          </div>
        ` : alerts.map(a => `
          <div style="display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
            <span style="font-size:16px;flex-shrink:0">${a.icon}</span>
            <div style="flex:1">
              <p style="font-size:12px;font-weight:500;line-height:1.4">${a.text}</p>
              <p style="font-size:11px;color:var(--text-tertiary);margin-top:2px">${a.time}</p>
            </div>
          </div>
        `).join('')}
      </div>`;
  }

  function buildRankingSidebar() {
    const sortedLate = [...team].sort((a, b) => b.lateCount - a.lateCount).slice(0, 5);
    const sortedEarly = [...team].sort((a, b) => b.earlyCount - a.earlyCount).slice(0, 5);

    return `
      <div class="card card-lg" style="margin-bottom:20px">
        <div class="section-header" style="margin-bottom:12px"><h3>🕐 Most Late</h3></div>
        ${sortedLate.map((m, i) => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px 0;${i < sortedLate.length - 1 ? 'border-bottom:1px solid rgba(255,255,255,0.06);':''}">
            <span style="font-size:14px;font-weight:800;width:20px;color:${i === 0 ? 'var(--red)' : 'var(--text-tertiary)'}">${i + 1}</span>
            <div class="avatar" style="width:28px;height:28px;font-size:10px;background:${m.photo};color:${m.color}">${m.init}</div>
            <div style="flex:1">
              <p style="font-size:12px;font-weight:600">${m.name}</p>
              <p style="font-size:11px;color:var(--text-tertiary)">${m.position}</p>
            </div>
            <span style="font-size:13px;font-weight:700;color:${m.lateCount >= 5 ? 'var(--red)' : m.lateCount > 2 ? 'var(--orange)' : 'var(--teal)'}">${m.lateCount}×</span>
          </div>
        `).join('')}
      </div>

      <div class="card card-lg" style="margin-bottom:20px">
        <div class="section-header" style="margin-bottom:12px"><h3>⚡ Most Early</h3></div>
        ${sortedEarly.map((m, i) => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px 0;${i < sortedEarly.length - 1 ? 'border-bottom:1px solid rgba(255,255,255,0.06);':''}">
            <span style="font-size:14px;font-weight:800;width:20px;color:${i === 0 ? 'var(--teal)' : 'var(--text-tertiary)'}">${i + 1}</span>
            <div class="avatar" style="width:28px;height:28px;font-size:10px;background:${m.photo};color:${m.color}">${m.init}</div>
            <div style="flex:1">
              <p style="font-size:12px;font-weight:600">${m.name}</p>
              <p style="font-size:11px;color:var(--text-tertiary)">${m.position}</p>
            </div>
            <span style="font-size:13px;font-weight:700;color:var(--teal)">${m.earlyCount}×</span>
          </div>
        `).join('')}
      </div>`;
  }

  function buildQuickActions() {
    return `
      <div class="card card-lg">
        <div class="section-header" style="margin-bottom:12px"><h3>⚡ Quick Actions</h3></div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <a href="#/manager/leave" style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:var(--radius-lg);background:rgba(0,167,157,0.08);color:var(--teal);text-decoration:none;font-size:13px;font-weight:600;transition:background 0.2s"
             onmouseover="this.style.background='rgba(0,167,157,0.15)'" onmouseout="this.style.background='rgba(0,167,157,0.08)'">
            📝 Review Leave Requests
          </a>
          <a href="#/employee/attendance" style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:var(--radius-lg);background:rgba(237,28,36,0.08);color:var(--red);text-decoration:none;font-size:13px;font-weight:600;transition:background 0.2s"
             onmouseover="this.style.background='rgba(237,28,36,0.15)'" onmouseout="this.style.background='rgba(237,28,36,0.08)'">
            📅 View Full Attendance
          </a>
          <a href="#/notifications" style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:var(--radius-lg);background:rgba(232,124,30,0.08);color:var(--orange);text-decoration:none;font-size:13px;font-weight:600;transition:background 0.2s"
             onmouseover="this.style.background='rgba(232,124,30,0.15)'" onmouseout="this.style.background='rgba(232,124,30,0.08)'">
            🔔 View Notifications
          </a>
        </div>
      </div>`;
  }

  function bindEvents() {
    const container = page.querySelector('.main-content');
    if (!container) return;

    /* View mode toggle */
    container.querySelectorAll('.view-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        viewMode = btn.dataset.view;
        if (viewMode === 'list') selectedMember = null;
        buildPage();
        bindEvents();
      });
    });

    /* Map profile list items + chips */
    container.querySelectorAll('.map-profile-item, .map-profile-chip').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const id = parseInt(item.dataset.memberId);
        selectedMember = selectedMember === id ? null : id;
        buildPage();
        bindEvents();
      });
    });

    /* Map reset button */
    const resetBtn = container.querySelector('.map-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedMember = null;
        buildPage();
        bindEvents();
      });
    }

    /* Filter tabs (list view only) */
    container.querySelectorAll('.tab[data-filter]').forEach(tab => {
      tab.addEventListener('click', () => {
        activeFilter = tab.dataset.filter;
        buildPage();
        bindEvents();
      });
    });

    /* Toggle map (list view only) */
    const mapBtn = container.querySelector('#toggle-map-btn');
    if (mapBtn) {
      mapBtn.addEventListener('click', () => {
        showMap = !showMap;
        buildPage();
        bindEvents();
      });
    }

    /* Expand member cards */
    container.querySelectorAll('.member-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('iframe')) return;
        const id = parseInt(card.dataset.memberId);
        selectedMember = selectedMember === id ? null : id;
        buildPage();
        bindEvents();
        /* Scroll to expanded card */
        setTimeout(() => {
          const expanded = container.querySelector(`.member-card[data-member-id="${id}"]`);
          if (expanded && selectedMember === id) {
            expanded.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 50);
      });
    });
  }

  /* Initial render */
  const main = el('div', { className: 'main-content' });
  page.appendChild(main);
  buildPage();
  bindEvents();

  return page;
});
