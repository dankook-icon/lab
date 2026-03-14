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
          <div class="professor-contact-inline">
            <a href="mailto:${prof.email}">${prof.email}</a>
            <span>&middot;</span>
            <span>${prof.phone}</span>
          </div>
        </div>
      </div>
      <div class="professor-details">
        <div class="detail-section">
          <h4>${lang === 'ko' ? '학력' : 'Education'}</h4>
          <ul class="detail-list">
            ${prof.education.map(e => `<li><span class="period">${e.year}</span><span>${lang === 'ko' ? e.degreeKo : e.degreeEn}, ${lang === 'ko' ? e.institutionKo : e.institutionEn}${e.detailEn ? '<br><small style="color:var(--color-text-subtle)">' + (lang === 'ko' ? e.detailKo : e.detailEn) + '</small>' : ''}</span></li>`).join('')}
          </ul>
        </div>
        <div class="detail-section">
          <h4>${lang === 'ko' ? '경력' : 'Experience'}</h4>
          <ul class="detail-list">
            ${prof.experience.map(e => `<li><span class="period">${e.period}</span><span>${lang === 'ko' ? e.roleKo : e.roleEn}, ${lang === 'ko' ? e.orgKo : e.orgEn}</span></li>`).join('')}
          </ul>
        </div>
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

  // Nodes sized by publication count. Scaffold is the largest research area (12+ papers)
  const nodes = [
    { id: 'center', x: 450, y: 260, r: 48, color: '#4F46E5', fixed: true,
      label: lang === 'ko' ? '스마트 건설' : 'Smart\nConstruction',
      desc: lang === 'ko' ? 'AI 기반 스마트 건설 기술' : 'AI-based Smart Construction' },
    { id: 'scaffold', x: 250, y: 160, r: 42, color: '#10B981',
      label: lang === 'ko' ? '비계 안전' : 'Scaffold\nSafety',
      desc: lang === 'ko' ? '비계 안전 검사 자동화 (12+ 논문)' : 'Scaffold safety automation (12+ papers)' },
    { id: 'pointcloud', x: 650, y: 160, r: 40, color: '#3B82F6',
      label: lang === 'ko' ? '3D 포인트\n클라우드' : '3D Point\nCloud',
      desc: lang === 'ko' ? '3D 재구성 및 의미론적 분할' : '3D reconstruction & semantic segmentation' },
    { id: 'deeplearning', x: 650, y: 380, r: 38, color: '#8B5CF6',
      label: lang === 'ko' ? '딥러닝' : 'Deep\nLearning',
      desc: lang === 'ko' ? '의미론적 분할, GAN, 객체 탐지' : 'Segmentation, GAN, object detection' },
    { id: 'uav', x: 250, y: 380, r: 36, color: '#F59E0B',
      label: lang === 'ko' ? 'UAV 검사' : 'UAV\nInspection',
      desc: lang === 'ko' ? '자율 UAV 항법, 근접 촬영 (5+ 논문)' : 'Autonomous navigation, close-range (5+ papers)' },
    { id: 'robotics', x: 120, y: 270, r: 32, color: '#EF4444',
      label: lang === 'ko' ? '로봇 개' : 'Robot\nDog',
      desc: lang === 'ko' ? '로봇 개 기반 자동 데이터 수집 (4 논문)' : 'Robot dog data acquisition (4 papers)' },
    { id: 'sensor', x: 780, y: 270, r: 30, color: '#0EA5E9',
      label: lang === 'ko' ? '센서 융합' : 'Sensor\nFusion',
      desc: lang === 'ko' ? 'LiDAR + 카메라 다중 센서 융합' : 'LiDAR + camera multi-sensor fusion' },
    { id: 'defect', x: 780, y: 160, r: 28, color: '#F97316',
      label: lang === 'ko' ? '결함 검출' : 'Defect\nDetection',
      desc: lang === 'ko' ? '건축물 품질 자동 검사' : 'Building quality inspection' },
    { id: 'bridge', x: 120, y: 420, r: 28, color: '#F59E0B',
      label: lang === 'ko' ? '교량 검사' : 'Bridge\nInspection',
      desc: lang === 'ko' ? 'UAV LiDAR 교량 부재 인식 (2 논문)' : 'UAV LiDAR bridge recognition (2 papers)' },
    { id: 'synthetic', x: 550, y: 450, r: 28, color: '#A855F7',
      label: lang === 'ko' ? '합성 데이터' : 'Synthetic\nData',
      desc: lang === 'ko' ? 'GAN 기반 합성 포인트 클라우드 생성' : 'GAN-based synthetic point cloud generation' },
    { id: 'disaster', x: 350, y: 450, r: 26, color: '#06B6D4',
      label: lang === 'ko' ? '재난 평가' : 'Disaster\nAssessment',
      desc: lang === 'ko' ? 'LiDAR 기반 재난 후 피해 평가' : 'Post-disaster damage assessment' },
  ];

  // Edges based on actual publication connections
  const edges = [
    // Center connections
    ['center', 'scaffold'], ['center', 'pointcloud'], ['center', 'deeplearning'],
    ['center', 'uav'], ['center', 'robotics'],
    // Scaffold connections (core research area)
    ['scaffold', 'pointcloud'],   // scaffold point cloud analysis (5+ papers)
    ['scaffold', 'uav'],          // UAV scaffold joint inspection (5+ papers)
    ['scaffold', 'robotics'],     // robot dog scaffold data (4 papers)
    ['scaffold', 'deeplearning'], // safety analysis via image generation
    // Point cloud connections
    ['pointcloud', 'deeplearning'], // semantic segmentation, 3D reconstruction
    ['pointcloud', 'sensor'],       // sensor fusion registration
    ['pointcloud', 'disaster'],     // LiDAR post-disaster assessment
    ['pointcloud', 'synthetic'],    // synthetic point cloud generation
    // Deep learning connections
    ['deeplearning', 'defect'],     // building quality inspection
    ['deeplearning', 'synthetic'],  // GAN, adversarial network
    // Sensor + defect
    ['sensor', 'defect'],           // multi-sensor defect inspection
    // UAV + bridge
    ['uav', 'bridge'],             // bridge component recognition with UAV LiDAR
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
  }
});
