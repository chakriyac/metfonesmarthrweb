/* ─── HR Application Detail Page ─── */
Router.register('/hr/applications/:id', function renderHrAppDetail() {
  const page = el('div', { className: 'app-layout fade-in' });
  page.appendChild(hrSidebar('/hr/applications'));

  const main = el('div', { className: 'main-content' });
  main.innerHTML = `${bgOrbs()}
    <div class="two-col">
      <div class="col-main">
        <!-- Back -->
        <button class="btn-glass" onclick="Router.navigate('/hr/applications')" style="margin-bottom:20px">
          ← Application Detail
        </button>

        <!-- Candidate Hero -->
        <div class="hero-card" style="margin-bottom:24px;display:flex;align-items:center;gap:20px">
          <div class="avatar avatar-xl" style="background:#FDE8E8;color:#ED1C24;font-weight:700">SR</div>
          <div style="flex:1">
            <h2 style="font-family:var(--font-display);font-size:22px;font-weight:800;margin-bottom:4px">Sokha Rith</h2>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:6px">Applying for: Recruitment Officer</p>
            <div style="display:flex;align-items:center;gap:12px">
              <span class="badge badge-red">In Review</span>
              <span style="font-size:11px;color:var(--text-tertiary)">Applied Dec 2, 2024</span>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:12px">CONTACT INFORMATION</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
            <div>
              <p style="font-size:11px;color:var(--text-tertiary)">Phone</p>
              <p style="font-size:13px;font-weight:500">+855 12 345 678</p>
            </div>
            <div>
              <p style="font-size:11px;color:var(--text-tertiary)">Email</p>
              <p style="font-size:13px;font-weight:500">sokha.r@email.com</p>
            </div>
            <div>
              <p style="font-size:11px;color:var(--text-tertiary)">Location</p>
              <p style="font-size:13px;font-weight:500">Phnom Penh, Cambodia</p>
            </div>
          </div>
        </div>

        <!-- Experience -->
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:12px">EXPERIENCE</h3>
          <div style="display:flex;gap:12px;align-items:flex-start">
            <div style="width:36px;height:36px;border-radius:10px;background:var(--red-bg);display:flex;align-items:center;justify-content:center;flex-shrink:0">
              ${logoHTML('sm')}
            </div>
            <div>
              <p style="font-size:14px;font-weight:600">Customer Service Representative</p>
              <p style="font-size:12px;color:var(--text-tertiary)">Metfone · Jan 2023 – Dec 2024 · 2 years</p>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="card card-lg" style="margin-bottom:16px">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:12px">EDUCATION</h3>
          <p style="font-size:14px;font-weight:600">B.A. Business Administration</p>
          <p style="font-size:12px;color:var(--text-tertiary)">Royal University of Phnom Penh · 2022</p>
        </div>

        <!-- Documents -->
        <div class="card card-lg">
          <h3 style="font-size:12px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;margin-bottom:12px">DOCUMENTS</h3>
          <div style="display:flex;align-items:center;gap:12px">
            <div style="width:36px;height:36px;border-radius:10px;background:var(--bg-primary);display:flex;align-items:center;justify-content:center;font-size:16px">📄</div>
            <div style="flex:1">
              <p style="font-size:13px;font-weight:600">Sokha_Rith_CV.pdf</p>
              <p style="font-size:11px;color:var(--text-tertiary)">2.4 MB</p>
            </div>
            <a href="#" style="font-size:12px;font-weight:600;color:var(--teal)">Download</a>
          </div>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="col-side">
        <div class="card card-lg">
          <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:16px">Actions</h3>

          <div style="margin-bottom:16px">
            <label style="font-size:11px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;display:block;margin-bottom:6px">UPDATE STAGE</label>
            <select style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:12px 16px;font-size:13px;color:var(--text-secondary)">
              <option>Under Review</option>
              <option>Shortlisted</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>

          <div style="margin-bottom:16px">
            <label style="font-size:11px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;display:block;margin-bottom:6px">NOTES</label>
            <textarea style="width:100%;background:var(--glass-bg);backdrop-filter:var(--glass-blur);border:1px solid var(--glass-border);border-radius:14px;padding:12px 16px;font-size:13px;min-height:80px;resize:vertical;font-family:var(--font-text)" placeholder="Add internal notes…"></textarea>
          </div>

          <div style="margin-bottom:20px">
            <label style="font-size:11px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.8px;display:block;margin-bottom:6px">RATING</label>
            <div style="display:flex;gap:4px;font-size:20px;cursor:pointer" id="star-rating">
              <span data-star="1" style="color:#FFB861">★</span>
              <span data-star="2" style="color:#FFB861">★</span>
              <span data-star="3" style="color:#FFB861">★</span>
              <span data-star="4" style="color:#FFB861">★</span>
              <span data-star="5" style="color:var(--border)">★</span>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn-outline-red" style="width:100%">Reject</button>
            <button class="btn-dark" style="width:100%">Next Stage →</button>
            <button class="btn-glass" style="width:100%">📅 Schedule Interview</button>
          </div>
        </div>
      </div>
    </div>`;

  page.appendChild(main);

  // Star rating interaction
  setTimeout(() => {
    const stars = page.querySelectorAll('#star-rating span');
    stars.forEach(s => s.addEventListener('click', () => {
      const val = parseInt(s.dataset.star);
      stars.forEach((ss, i) => {
        ss.style.color = i < val ? '#FFB861' : 'var(--border)';
      });
    }));
  });

  return page;
});
