/* ============================================
   ICON Lab Website - Main JavaScript
   ============================================ */

// Theme toggle
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  updateThemeButtons();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next === 'dark' ? 'dark' : '');
  if (next === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('theme', next);
  updateThemeButtons();
}

function updateThemeButtons() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const sunIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  const moonIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  // Desktop toggle
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.innerHTML = isDark ? sunIcon : moonIcon;
  });
  // Mobile toggle
  document.querySelectorAll('.mobile-theme-toggle').forEach(btn => {
    const icon = isDark
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    const isKo = !window.location.pathname.includes('/en/');
    const label = isDark
      ? (isKo ? '라이트 모드 전환' : 'Light Mode')
      : (isKo ? '다크 모드 전환' : 'Dark Mode');
    btn.innerHTML = icon + label;
  });
}

// Mobile menu
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  // Remove inline onclick to avoid double-toggle
  hamburger.removeAttribute('onclick');

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

// Active nav link
function setActiveNav() {
  const page = document.body.getAttribute('data-page');
  if (!page) return;
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    if (link.getAttribute('data-nav') === page) {
      link.classList.add('active');
    }
  });
}

// Fade-in animation with Intersection Observer
function initFadeIn() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// JSON loader
async function loadJSON(path) {
  try {
    const res = await fetch(path);
    return await res.json();
  } catch (e) {
    console.error('Failed to load:', path, e);
    return null;
  }
}

// Detect language from path
function getLang() {
  return window.location.pathname.includes('/en/') ? 'en' : 'ko';
}

// Get data path prefix (handle en/ subdirectory)
function getDataPath() {
  return window.location.pathname.includes('/en/') ? '../data/' : 'data/';
}

// Research icons (SVG)
const icons = {
  cube: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  brain: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 5 7v4h4v-4c3-1.5 5-4 5-7a7 7 0 0 0-7-7z"/><path d="M9 22h6"/></svg>',
  shield: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  drone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="10" width="8" height="6" rx="1"/><line x1="6" y1="8" x2="4" y2="6"/><line x1="18" y1="8" x2="20" y2="6"/><circle cx="4" cy="5" r="2"/><circle cx="20" cy="5" r="2"/><line x1="12" y1="16" x2="12" y2="20"/></svg>',
  robot: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/></svg>',
  building: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/><rect x="9" y="18" width="6" height="4"/></svg>'
};

// Render research cards
async function renderResearch() {
  const container = document.getElementById('research-cards');
  if (!container) return;
  const data = await loadJSON(getDataPath() + 'research.json');
  if (!data) return;
  const lang = getLang();

  container.innerHTML = data.map((item, i) => `
    <div class="card fade-in" data-delay="${i * 100}">
      <div class="card-icon" style="background: ${item.color}15; color: ${item.color}">
        ${icons[item.icon] || ''}
      </div>
      <h3>${lang === 'ko' ? item.titleKo : item.titleEn}</h3>
      <p>${lang === 'ko' ? item.descKo : item.descEn}</p>
    </div>
  `).join('');

  initFadeIn();
}

// Render publications
async function renderPublications(limit) {
  const container = document.getElementById('publications-list');
  if (!container) return;
  const data = await loadJSON(getDataPath() + 'publications.json');
  if (!data) return;
  const lang = getLang();

  const sections = [
    { key: 'journals', titleEn: 'Journal Papers (SCIE)', titleKo: 'SCIE 저널 논문' },
    { key: 'conferences', titleEn: 'International Conferences', titleKo: '국제 학술대회' },
    { key: 'domesticConferences', titleEn: 'Domestic Conferences', titleKo: '국내 학술대회' },
    { key: 'patents', titleEn: 'Patents', titleKo: '특허' },
    { key: 'software', titleEn: 'Software Registrations', titleKo: '소프트웨어 등록' }
  ];

  let html = '';
  sections.forEach(sec => {
    let items = data[sec.key];
    if (!items || !items.length) return;
    if (limit && sec.key === 'journals') items = items.slice(0, limit);
    else if (limit) return;

    html += `<div class="pub-category fade-in">`;
    if (!limit) {
      html += `<div class="pub-category-title">${lang === 'ko' ? sec.titleKo : sec.titleEn} <span class="pub-count">${items.length}</span></div>`;
    }
    html += '<ul class="pub-list">';

    items.forEach(pub => {
      if (sec.key === 'patents') {
        html += `<li class="pub-item">
          <span class="pub-year">${pub.year}</span>
          <div class="pub-title">${lang === 'ko' ? pub.titleKo : pub.titleEn}</div>
          <div class="pub-venue">No. ${pub.number} (${pub.type === 'registered' ? (lang === 'ko' ? '등록' : 'Registered') : (lang === 'ko' ? '출원' : 'Application')})</div>
        </li>`;
      } else if (sec.key === 'software') {
        html += `<li class="pub-item">
          <span class="pub-year">${pub.year}</span>
          <div class="pub-title">${lang === 'ko' ? pub.titleKo : pub.titleEn}</div>
          <div class="pub-venue">Reg. No. ${pub.number}</div>
        </li>`;
      } else {
        const venue = pub.venue + (pub.detail ? `, ${pub.detail}` : '') + (pub.location ? `, ${pub.location}` : '');
        html += `<li class="pub-item">
          <span class="pub-year">${pub.year}</span>
          <div class="pub-title">${pub.title}</div>
          <div class="pub-authors">${pub.authors}</div>
          <div class="pub-venue">${venue}</div>
        </li>`;
      }
    });

    html += '</ul></div>';
  });

  container.innerHTML = html;
  initFadeIn();
}

// Render members
async function renderMembers() {
  const profContainer = document.getElementById('professor-section');
  const studContainer = document.getElementById('students-section');
  if (!profContainer) return;

  const data = await loadJSON(getDataPath() + 'members.json');
  if (!data) return;
  const lang = getLang();
  const prof = data.professor;

  const imgBase = window.location.pathname.includes('/en/') ? '../' : '';
  let profHtml = `
    <div class="professor-card fade-in">
      <div class="professor-header">
        <img src="${imgBase}images/professor_kim.jpg" alt="${lang === 'ko' ? prof.nameKo : prof.nameEn}" class="professor-photo">
        <div class="professor-info">
          <h2>${lang === 'ko' ? prof.nameKo : prof.nameEn}</h2>
          <div class="title-text">${lang === 'ko' ? prof.titleKo : prof.titleEn}</div>
          <div class="dept-text">${lang === 'ko' ? prof.departmentKo : prof.departmentEn}</div>
          <div class="professor-contact-block">
            <div class="professor-contact-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>
              <a href="mailto:${prof.email}">${prof.email}</a>
            </div>
            <div class="professor-contact-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>${prof.phone}</span>
            </div>
            <div class="professor-social-links">
              <a href="https://scholar.google.com/citations?user=igUpCwEAAAAJ&hl" target="_blank" rel="noopener" class="professor-social-btn" title="Google Scholar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5L12 0l12 9.5l-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14a7 7 0 0 0 0-14z"/></svg>
                Google Scholar
              </a>
              <a href="https://www.linkedin.com/in/juhyeon-kim-1587291a7/" target="_blank" rel="noopener" class="professor-social-btn" title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="professor-details">
        <div class="detail-section">
          <h4>${lang === 'ko' ? '학력' : 'Education'}</h4>
          <ul class="detail-list">
            ${prof.education.map(e => {
              const detail = lang === 'ko' ? e.detailKo : e.detailEn;
              const detailHtml = detail ? detail.split(' | ').map(d => '<br><small style="color:var(--color-text-subtle)">' + d + '</small>').join('') : '';
              return `<li><span class="period">${e.year}</span><span>${lang === 'ko' ? e.degreeKo : e.degreeEn}, ${lang === 'ko' ? e.institutionKo : e.institutionEn}${detailHtml}</span></li>`;
            }).join('')}
          </ul>
        </div>
        <div class="detail-section">
          <h4>${lang === 'ko' ? '경력' : 'Experience'}</h4>
          <ul class="detail-list">
            ${prof.experience.map(e => `<li><span class="period">${e.period}</span><span>${lang === 'ko' ? e.roleKo : e.roleEn}, ${lang === 'ko' ? e.orgKo : e.orgEn}</span></li>`).join('')}
          </ul>
        </div>
        ${prof.awards && prof.awards.length ? `<div class="detail-section">
          <h4>${lang === 'ko' ? '수상' : 'Awards & Honors'}</h4>
          <ul class="detail-list">
            ${prof.awards.map(a => `<li><span>${lang === 'ko' ? a.titleKo : a.titleEn}<br><small style="color:var(--color-text-subtle)">${lang === 'ko' ? a.orgKo : a.orgEn}</small></span></li>`).join('')}
          </ul>
        </div>` : ''}
        ${prof.committees && prof.committees.length ? `<div class="detail-section">
          <h4>${lang === 'ko' ? '학회 활동' : 'Professional Service'}</h4>
          <ul class="detail-list">
            ${prof.committees.map(c => `<li><span>${lang === 'ko' ? c.roleKo : c.roleEn}, ${lang === 'ko' ? c.orgKo : c.orgEn}</span></li>`).join('')}
          </ul>
        </div>` : ''}
        ${prof.reviewer && prof.reviewer.length ? `<div class="detail-section">
          <h4>${lang === 'ko' ? '논문 심사' : 'Reviewer'}</h4>
          <ul class="detail-list">
            ${prof.reviewer.map(r => `<li><span>${r}</span></li>`).join('')}
          </ul>
        </div>` : ''}
      </div>
    </div>`;
  profContainer.innerHTML = profHtml;

  if (studContainer) {
    const categories = [
      { key: 'all', labelKo: '전체', labelEn: 'All' },
      { key: 'postdocs', labelKo: '박사후 연구원', labelEn: 'Postdoc' },
      { key: 'phdStudents', labelKo: '박사과정', labelEn: 'Ph.D.' },
      { key: 'msStudents', labelKo: '석사과정', labelEn: 'M.S.' },
      { key: 'undergraduateInterns', labelKo: '학부 인턴', labelEn: 'Undergraduate' },
    ];

    function renderStudentGrid(members, roleLabel) {
      if (!members || !members.length) return '';
      return members.map(s => `
        <div class="student-card fade-in">
          <div class="student-avatar">${(lang === 'ko' ? s.nameKo : s.nameEn).charAt(0)}</div>
          <div class="name">${lang === 'ko' ? s.nameKo : s.nameEn}</div>
          <div class="role">${roleLabel || (lang === 'ko' ? s.roleKo : s.roleEn)}</div>
        </div>`).join('');
    }

    function renderStudents(filter) {
      let html = '<div class="student-tabs">';
      categories.forEach(cat => {
        const active = filter === cat.key ? ' active' : '';
        html += `<button class="student-tab${active}" data-filter="${cat.key}">${lang === 'ko' ? cat.labelKo : cat.labelEn}</button>`;
      });
      html += '</div>';

      const sections = [
        { key: 'postdocs', labelKo: '박사후 연구원', labelEn: 'Postdoctoral Researchers' },
        { key: 'phdStudents', labelKo: '박사과정', labelEn: 'Ph.D. Students' },
        { key: 'msStudents', labelKo: '석사과정', labelEn: 'M.S. Students' },
        { key: 'undergraduateInterns', labelKo: '학부 인턴', labelEn: 'Undergraduate Interns' },
      ];

      let hasAny = false;
      sections.forEach(sec => {
        const members = data[sec.key];
        if (filter !== 'all' && filter !== sec.key) return;
        if (!members || !members.length) {
          if (filter === sec.key || filter === 'all') {
            html += `<div class="student-category">
              <h3 class="student-category-title">${lang === 'ko' ? sec.labelKo : sec.labelEn}</h3>
              <p style="color:var(--color-text-subtle);font-size:0.9rem;padding:8px 0">${lang === 'ko' ? '모집 중' : 'Recruiting'}</p>
            </div>`;
          }
          return;
        }
        hasAny = true;
        html += `<div class="student-category">
          <h3 class="student-category-title">${lang === 'ko' ? sec.labelKo : sec.labelEn}
            <span class="student-count">${members.length}</span>
          </h3>
          <div class="student-grid">${renderStudentGrid(members)}</div>
        </div>`;
      });

      html += `<div class="recruiting-banner fade-in mt-4">
        <h3>${lang === 'ko' ? '대학원생 모집' : 'Graduate Students Wanted'}</h3>
        <p>${lang === 'ko' ? data.recruiting.messageKo : data.recruiting.messageEn}</p>
      </div>`;

      studContainer.innerHTML = html;
      initFadeIn();

      // Attach tab click handlers
      studContainer.querySelectorAll('.student-tab').forEach(tab => {
        tab.addEventListener('click', () => renderStudents(tab.dataset.filter));
      });
    }

    renderStudents('all');
  }

  initFadeIn();

  // Member toggle
  document.querySelectorAll('.member-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.member-toggle').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      document.getElementById('professor-section').style.display = target === 'professor' ? '' : 'none';
      document.getElementById('students-section').style.display = target === 'students' ? '' : 'none';
    });
  });
}

// Render teaching
async function renderTeaching() {
  const container = document.getElementById('teaching-list');
  if (!container) return;
  const data = await loadJSON(getDataPath() + 'teaching.json');
  if (!data) return;
  const lang = getLang();

  container.innerHTML = data.map(sem => `
    <div class="semester-block fade-in">
      <h2 class="section-title">${lang === 'ko' ? sem.semesterKo : sem.semester}</h2>
      <div class="teaching-items">
        ${sem.courses.map((c, i) => `
          <div class="teaching-item fade-in" data-delay="${i * 80}">
            <div class="teaching-accent"></div>
            <div class="teaching-body">
              <div class="teaching-name">${lang === 'ko' ? c.nameKo : c.nameEn}</div>
              <div class="teaching-grade">${lang === 'ko' ? c.gradeKo : c.gradeEn}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  initFadeIn();
}

// Render contact
async function renderContact() {
  const container = document.getElementById('contact-cards');
  if (!container) return;
  const data = await loadJSON(getDataPath() + 'site.json');
  if (!data) return;
  const lang = getLang();
  const c = data.contact;

  container.innerHTML = `
    <div class="contact-card fade-in">
      <div class="label">${lang === 'ko' ? '주소' : 'Address'}</div>
      <div class="value">${lang === 'ko' ? c.addressKo : c.addressEn}</div>
    </div>
    <div class="contact-card fade-in" data-delay="100">
      <div class="label">${lang === 'ko' ? '이메일' : 'Email'}</div>
      <div class="value"><a href="mailto:${c.email}">${c.email}</a></div>
    </div>
    <div class="contact-card fade-in" data-delay="200">
      <div class="label">${lang === 'ko' ? '전화' : 'Phone'}</div>
      <div class="value">${c.phone}</div>
    </div>
    <div class="contact-card fade-in" data-delay="300">
      <div class="label">${lang === 'ko' ? '소속' : 'Affiliation'}</div>
      <div class="value">${lang === 'ko' ? data.lab.institutionKo + ' ' + data.lab.departmentKo : data.lab.institution + ', ' + data.lab.department}</div>
    </div>
  `;

  initFadeIn();
}

// Force-directed research graph
function renderResearchGraph() {
  const svg = document.getElementById('researchGraph');
  if (!svg) return;
  const lang = getLang();
  const W = 900, H = 520;
  const tooltip = document.getElementById('graphTooltip');
  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  // 3-level hierarchy: Root > Category > Sub-topic
  const nodes = [
    // Level 1 - Root
    { id: 'center', x: 450, y: 180, r: 48, color: '#4F46E5', fixed: true,
      label: lang === 'ko' ? '스마트 건설' : 'Smart\nConstruction',
      desc: lang === 'ko' ? 'AI 기반 스마트 건설 기술' : 'AI-based Smart Construction' },
    // Level 2 - Main categories
    { id: 'automation', x: 150, y: 160, r: 38, color: '#10B981',
      label: lang === 'ko' ? '건설 자동화' : 'Construction\nAutomation',
      desc: lang === 'ko' ? '건설 프로세스 자동화 기술' : 'Construction process automation' },
    { id: 'robotics', x: 300, y: 400, r: 38, color: '#EF4444',
      label: lang === 'ko' ? '건설\n로보틱스' : 'Construction\nRobotics',
      desc: lang === 'ko' ? '로봇 기반 건설 기술' : 'Robot-based construction technology' },
    { id: 'digitaltwin', x: 600, y: 400, r: 38, color: '#3B82F6',
      label: lang === 'ko' ? '디지털 트윈' : 'Digital\nTwin',
      desc: lang === 'ko' ? '디지털 트윈 기반 건설 관리' : 'Digital twin-based construction management' },
    { id: 'aimonitor', x: 750, y: 160, r: 38, color: '#8B5CF6',
      label: lang === 'ko' ? 'AI 기반\n모니터링' : 'AI-based\nMonitoring',
      desc: lang === 'ko' ? 'AI 기반 건설 현장 모니터링' : 'AI-based construction site monitoring' },
    // Level 3 - Sub-topics
    { id: 'dataprocess', x: 60, y: 60, r: 28, color: '#059669',
      label: lang === 'ko' ? '데이터 처리\n자동화' : 'Data Processing\nAutomation',
      desc: lang === 'ko' ? '건설 데이터 수집 및 처리 자동화' : 'Construction data collection & processing automation' },
    { id: 'robotinspect', x: 160, y: 460, r: 28, color: '#DC2626',
      label: lang === 'ko' ? '로봇 기반\n점검' : 'Robot-based\nInspection',
      desc: lang === 'ko' ? '로봇을 활용한 건설 현장 점검' : 'Robot-based construction site inspection' },
    { id: 'autonomous', x: 420, y: 480, r: 28, color: '#F97316',
      label: lang === 'ko' ? '자율주행 및\n자율이동' : 'Autonomous\nNavigation',
      desc: lang === 'ko' ? '건설 현장 자율주행 및 자율이동 기술' : 'Autonomous driving & navigation technology' },
    { id: 'pointcloud', x: 520, y: 480, r: 28, color: '#2563EB',
      label: lang === 'ko' ? '점군 기반\n모델링' : 'Point Cloud\nModeling',
      desc: lang === 'ko' ? '3D 포인트 클라우드 기반 모델링' : '3D point cloud-based modeling' },
    { id: 'scantobim', x: 720, y: 460, r: 28, color: '#0EA5E9',
      label: 'Scan-to-BIM',
      desc: lang === 'ko' ? '스캔 데이터에서 BIM 모델 생성' : 'BIM model generation from scan data' },
    { id: 'damage', x: 840, y: 60, r: 28, color: '#7C3AED',
      label: lang === 'ko' ? '손상 평가' : 'Damage\nAssessment',
      desc: lang === 'ko' ? 'AI 기반 구조물 손상 평가' : 'AI-based structural damage assessment' },
    { id: 'safety', x: 830, y: 280, r: 28, color: '#A855F7',
      label: lang === 'ko' ? '안전\n모니터링' : 'Safety\nMonitoring',
      desc: lang === 'ko' ? 'AI 기반 건설 현장 안전 모니터링' : 'AI-based construction site safety monitoring' },
  ];

  // Tree edges: Root → Level 2 → Level 3
  const edges = [
    // Center to Level 2
    ['center', 'automation'],
    ['center', 'robotics'],
    ['center', 'digitaltwin'],
    ['center', 'aimonitor'],
    // Level 2 to Level 3
    ['automation', 'dataprocess'],
    ['robotics', 'robotinspect'],
    ['robotics', 'autonomous'],
    ['digitaltwin', 'pointcloud'],
    ['digitaltwin', 'scantobim'],
    ['aimonitor', 'damage'],
    ['aimonitor', 'safety'],
  ];

  nodes.forEach(n => { n.vx = 0; n.vy = 0; });
  let running = true, dragNode = null, hoverNode = null, frameCount = 0;

  function simulate() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        let dx = a.x - b.x, dy = a.y - b.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 1;
        let force = 8000 / (dist * dist);
        let fx = (dx / dist) * force, fy = (dy / dist) * force;
        if (!a.fixed && a !== dragNode) { a.vx += fx; a.vy += fy; }
        if (!b.fixed && b !== dragNode) { b.vx -= fx; b.vy -= fy; }
      }
    }
    edges.forEach(([aId, bId]) => {
      const a = nodes.find(n => n.id === aId), b = nodes.find(n => n.id === bId);
      let dx = b.x - a.x, dy = b.y - a.y;
      let dist = Math.sqrt(dx * dx + dy * dy) || 1;
      let force = (dist - 160) * 0.008;
      let fx = (dx / dist) * force, fy = (dy / dist) * force;
      if (!a.fixed && a !== dragNode) { a.vx += fx; a.vy += fy; }
      if (!b.fixed && b !== dragNode) { b.vx -= fx; b.vy -= fy; }
    });
    let totalV = 0;
    const damp = frameCount < 60 ? 0.85 : frameCount < 120 ? 0.5 : 0.15;
    nodes.forEach(n => {
      if (n.fixed || n === dragNode) return;
      n.vx *= damp; n.vy *= damp;
      n.x += n.vx; n.y += n.vy;
      n.x = Math.max(n.r + 5, Math.min(W - n.r - 5, n.x));
      n.y = Math.max(n.r + 5, Math.min(H - n.r - 5, n.y));
      totalV += Math.abs(n.vx) + Math.abs(n.vy);
    });
    frameCount++;
    if (totalV < 0.3 && frameCount > 150 && !dragNode) running = false;
  }

  function draw() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const ns = 'http://www.w3.org/2000/svg';
    const dark = isDark();
    const borderColor = dark ? '#334155' : '#d0d7e2';

    // Defs: gradients + filters
    const defs = document.createElementNS(ns, 'defs');
    nodes.forEach(n => {
      const grad = document.createElementNS(ns, 'radialGradient');
      grad.id = 'grad-' + n.id;
      grad.innerHTML = `<stop offset="0%" stop-color="${n.color}" stop-opacity="1"/><stop offset="100%" stop-color="${n.color}" stop-opacity="0.75"/>`;
      defs.appendChild(grad);
    });
    defs.innerHTML += '<filter id="shadow"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15"/></filter>';
    defs.innerHTML += '<filter id="glow"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    svg.appendChild(defs);

    // Edges
    edges.forEach(([aId, bId]) => {
      const a = nodes.find(n => n.id === aId), b = nodes.find(n => n.id === bId);
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const dx = b.x - a.x, dy = b.y - a.y;
      const cx = mx - dy * 0.12, cy = my + dx * 0.12;
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      if (hoverNode) {
        const connected = aId === hoverNode.id || bId === hoverNode.id;
        path.setAttribute('stroke', connected ? hoverNode.color : borderColor);
        path.setAttribute('stroke-width', connected ? '3' : '1.5');
        path.setAttribute('opacity', connected ? '0.8' : '0.1');
      } else {
        path.setAttribute('stroke', borderColor);
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('opacity', '0.4');
      }
      svg.appendChild(path);
    });

    // Center pulse
    const c = nodes[0];
    for (let i = 0; i < 2; i++) {
      const ring = document.createElementNS(ns, 'circle');
      ring.setAttribute('cx', c.x); ring.setAttribute('cy', c.y);
      ring.setAttribute('fill', 'none'); ring.setAttribute('stroke', c.color);
      ring.setAttribute('stroke-width', '1.5');
      const aR = document.createElementNS(ns, 'animate');
      aR.setAttribute('attributeName', 'r'); aR.setAttribute('values', `${c.r};${c.r+30}`);
      aR.setAttribute('dur', '3s'); aR.setAttribute('begin', `${i*1.5}s`); aR.setAttribute('repeatCount', 'indefinite');
      ring.appendChild(aR);
      const aO = document.createElementNS(ns, 'animate');
      aO.setAttribute('attributeName', 'stroke-opacity'); aO.setAttribute('values', '0.4;0');
      aO.setAttribute('dur', '3s'); aO.setAttribute('begin', `${i*1.5}s`); aO.setAttribute('repeatCount', 'indefinite');
      ring.appendChild(aO);
      svg.appendChild(ring);
    }

    // Nodes
    nodes.forEach(n => {
      const g = document.createElementNS(ns, 'g');
      g.style.cursor = n.fixed ? 'default' : 'grab';
      const isHovered = hoverNode && hoverNode.id === n.id;
      const isConnected = hoverNode && edges.some(([a,b]) => (a === hoverNode.id && b === n.id) || (b === hoverNode.id && a === n.id));
      const dimmed = hoverNode && !isHovered && !isConnected && n.id !== 'center';

      // Circle
      const circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('cx', n.x); circle.setAttribute('cy', n.y);
      circle.setAttribute('r', isHovered ? n.r + 4 : n.r);
      circle.setAttribute('fill', `url(#grad-${n.id})`);
      circle.setAttribute('filter', isHovered ? 'url(#glow)' : 'url(#shadow)');
      circle.setAttribute('opacity', dimmed ? '0.3' : '1');
      g.appendChild(circle);

      // Label
      const lines = n.label.split('\n');
      const fontSize = n.r > 40 ? 15 : n.r > 34 ? 13 : 11;
      const lineH = fontSize + 2;
      const startY = n.y - ((lines.length - 1) * lineH) / 2;
      lines.forEach((line, i) => {
        const text = document.createElementNS(ns, 'text');
        text.setAttribute('x', n.x); text.setAttribute('y', startY + i * lineH);
        text.setAttribute('text-anchor', 'middle'); text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('font-size', fontSize); text.setAttribute('font-weight', '700');
        text.setAttribute('fill', 'white'); text.setAttribute('opacity', dimmed ? '0.3' : '1');
        text.textContent = line;
        g.appendChild(text);
      });
      g.dataset.id = n.id;
      svg.appendChild(g);
    });
  }

  // Animation loop
  function tick() {
    simulate();
    draw();
    if (running) requestAnimationFrame(tick);
  }
  tick();

  // SVG coords helper
  function svgCoords(e) {
    const rect = svg.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (W / rect.width),
      y: (clientY - rect.top) * (H / rect.height)
    };
  }

  function hitTest(mx, my) {
    for (const n of nodes) {
      const dx = mx - n.x, dy = my - n.y;
      if (dx * dx + dy * dy < (n.r + 8) * (n.r + 8)) return n;
    }
    return null;
  }

  // Mouse drag
  svg.addEventListener('mousedown', (e) => {
    const p = svgCoords(e);
    const hit = hitTest(p.x, p.y);
    if (hit && !hit.fixed) {
      dragNode = hit;
      svg.style.cursor = 'grabbing';
      e.preventDefault();
    }
  });

  window.addEventListener('mousemove', (e) => {
    const p = svgCoords(e);
    if (dragNode) {
      dragNode.x = Math.max(dragNode.r + 5, Math.min(W - dragNode.r - 5, p.x));
      dragNode.y = Math.max(dragNode.r + 5, Math.min(H - dragNode.r - 5, p.y));
      dragNode.vx = 0; dragNode.vy = 0;
      if (!running) { running = true; frameCount = 200; tick(); }
      draw();
    } else {
      // Hover
      const hit = hitTest(p.x, p.y);
      if (hit !== hoverNode) {
        hoverNode = hit;
        if (hit && tooltip) {
          tooltip.textContent = hit.desc;
          tooltip.style.opacity = '1';
          tooltip.style.left = (e.clientX + 14) + 'px';
          tooltip.style.top = (e.clientY - 10) + 'px';
        } else if (tooltip) {
          tooltip.style.opacity = '0';
        }
        draw();
      } else if (hit && tooltip) {
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
      }
    }
  });

  window.addEventListener('mouseup', () => {
    if (dragNode) {
      dragNode = null;
      svg.style.cursor = 'grab';
      running = true; frameCount = 100;
      tick();
    }
  });

  // Touch drag
  svg.addEventListener('touchstart', (e) => {
    const p = svgCoords(e);
    const hit = hitTest(p.x, p.y);
    if (hit && !hit.fixed) {
      dragNode = hit;
      e.preventDefault();
    }
  }, { passive: false });

  svg.addEventListener('touchmove', (e) => {
    if (!dragNode) return;
    e.preventDefault();
    const p = svgCoords(e);
    dragNode.x = Math.max(dragNode.r + 5, Math.min(W - dragNode.r - 5, p.x));
    dragNode.y = Math.max(dragNode.r + 5, Math.min(H - dragNode.r - 5, p.y));
    dragNode.vx = 0; dragNode.vy = 0;
    if (!running) { running = true; frameCount = 200; tick(); }
    draw();
  }, { passive: false });

  svg.addEventListener('touchend', () => {
    if (dragNode) {
      dragNode = null;
      running = true; frameCount = 100;
      tick();
    }
  });

  svg.addEventListener('mouseleave', () => {
    hoverNode = null;
    if (tooltip) tooltip.style.opacity = '0';
    draw();
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  setActiveNav();
  initFadeIn();

  // Page-specific rendering
  const page = document.body.getAttribute('data-page');
  if (page === 'home') {
    renderResearchGraph();
    renderPublications(4);
  } else if (page === 'research') {
    renderResearch();
  } else if (page === 'publications') {
    renderPublications();
  } else if (page === 'members') {
    renderMembers();
  } else if (page === 'teaching') {
    renderTeaching();
  } else if (page === 'contact') {
    renderContact();
  } else if (page === 'album') {
    renderAlbum();
  }
});

// Render album
async function renderAlbum() {
  const container = document.getElementById('album-content');
  if (!container) return;
  const data = await loadJSON(getDataPath() + 'album.json');
  if (!data || !data.length) {
    container.innerHTML = `<div class="album-empty fade-in">
      <div class="album-empty-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
      <h3>${getLang() === 'ko' ? '사진이 곧 업로드될 예정입니다' : 'Photos coming soon'}</h3>
      <p>${getLang() === 'ko' ? '연구실 활동, 세미나, 학술대회 등의 사진이 이곳에 공유됩니다.' : 'Photos of lab activities, seminars, and conferences will be shared here.'}</p>
    </div>`;
    initFadeIn();
    return;
  }
  const lang = getLang();
  const imgBase = window.location.pathname.includes('/en/') ? '../' : '';
  let html = '';
  data.forEach(cat => {
    if (!cat.photos || !cat.photos.length) return;
    html += `<div class="album-category fade-in">
      <h2 class="section-title">${lang === 'ko' ? cat.title : cat.titleEn}</h2>
      <div class="album-grid">`;
    cat.photos.forEach((photo, i) => {
      html += `<div class="album-item fade-in" data-delay="${i * 80}">
        <img src="${imgBase}${photo.src}" alt="${lang === 'ko' ? photo.caption : photo.captionEn}" class="album-photo" loading="lazy">
        ${photo.caption ? `<div class="album-caption">${lang === 'ko' ? photo.caption : photo.captionEn}</div>` : ''}
        ${photo.date ? `<div class="album-date">${photo.date}</div>` : ''}
      </div>`;
    });
    html += '</div></div>';
  });
  container.innerHTML = html;
  initFadeIn();
}
