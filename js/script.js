document.addEventListener('DOMContentLoaded', () => {
  // =========================================
  // 1. BURGER MENU TOGGLE
  // =========================================
  const burgerBtn = document.getElementById('burgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (burgerBtn && navMenu) {
    burgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  // =========================================
  // 2. ABOUT ME 4 INTERACTIVE CARDS
  // =========================================
  const cards = document.querySelectorAll('.section-card');
  const contentDisplay = document.getElementById('selected-content');

  const contentData = {
    myself: `<h3>About Myself</h3><p>Lulusan TKJ yang sehari-hari berkutat di dunia IT Support, infrastruktur jaringan, dan ngulik tampilan web.</p>`,
    hobbies: `<h3>My Hobbies</h3><p>Ngoprek proyek web, baca visual novel & manga, dengerin maidcore/alt-rock, dan main game simulasi.</p>`,
    facts: `<h3>Setup & Trivia</h3><p>Daily driver Windows LTSC, pencinta audio wired IEM, dan selalu nyari cara bikin UI kelihatan clean tapi berkarakter.</p>`,
    aesthetics: `<h3>My Aesthetics</h3><p>Monochrome glassmorphism, 2000s visual novel atmosphere, shoegaze / digicore soundscapes, dan clean dark interfaces.</p>`
  };

  if (cards.length && contentDisplay) {
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        contentDisplay.innerHTML = `<div class="content-fade">${contentData[card.id] || ''}</div>`;
      });
    });
  }

  // =========================================
  // 3. 3D CURSOR TILT ON PROJECT CARDS
  // =========================================
  const projectCards = document.querySelectorAll('.project-card');
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (projectCards.length && isFinePointer) {
    const maxTilt = 8;

    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.12s ease-out, border-color 0.35s ease, box-shadow 0.4s ease';
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease, box-shadow 0.4s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // =========================================
  // 4. INTERACTIVE SKILL PILLS INSPECTOR
  // =========================================
  const skillPills = document.querySelectorAll('.skill-pill');
  const skillTitle = document.getElementById('skillTitle');
  const skillCat = document.getElementById('skillCat');
  const skillDesc = document.getElementById('skillDesc');
  const skillDetailBox = document.getElementById('skillDetailBox');

  const skillData = {
    ad: {
      title: 'Active Directory',
      cat: 'Infrastructure',
      desc: 'Mengelola struktur Organizational Unit (OU), pembuatan & reset akun user korporat, penggabungan perangkat ke domain (domain join), serta penerapan kebijakan dasar akses klien.'
    },
    net: {
      title: 'Network Configuration',
      cat: 'Networking',
      desc: 'Konfigurasi IP static/DHCP, subnetting dasar, pengecekan jalur routing, crimping kabel LAN, serta troubleshooting koneksi jaringan kantor maupun perangkat klien.'
    },
    win: {
      title: 'Windows Server & LTSC',
      cat: 'Operating System',
      desc: 'Administrasi lingkungan Windows korporat (Windows 10/11 Pro & LTSC), optimasi service sistem, manajemen permission folder sharing, dan pemeliharaan stabilitas OS.'
    },
    prov: {
      title: 'System Provisioning',
      cat: 'Deployment',
      desc: 'Menyiapkan unit PC/laptop baru dari nol hingga siap pakai: instalasi OS, driver, standar software kantor, konfigurasi keamanan, hingga serah terima ke user.'
    },
    hw: {
      title: 'Hardware Troubleshooting',
      cat: 'IT Support',
      desc: 'Diagnosa kerusakan komponen PC & laptop (RAM, storage NVMe, thermal, power), penggantian sparepart, serta preventive maintenance rutin.'
    },
    htmlcss: {
      title: 'HTML5 & CSS3',
      cat: 'Frontend',
      desc: 'Membangun struktur halaman web semantik, layout responsif dengan CSS Grid & Flexbox, serta styling modern seperti glassmorphism dan animasi keyframe.'
    },
    js: {
      title: 'JavaScript (Vanilla)',
      cat: 'Frontend',
      desc: 'Manipulasi DOM untuk interaksi dinamis (seperti kartu interaktif dan efek 3D tilt di portfolio ini), event handling, dan logika antarmuka tanpa bergantung framework berat.'
    },
    laravel: {
      title: 'PHP & Laravel',
      cat: 'Backend / Fullstack',
      desc: 'Pengembangan aplikasi web dinamis menggunakan arsitektur MVC Laravel, routing, Blade templating, serta integrasi database relasional.'
    },
    git: {
      title: 'Git & GitHub',
      cat: 'Workflow',
      desc: 'Version control untuk melacak perubahan kode, manajemen branch repository, serta deployment proyek statis menggunakan GitHub Pages.'
    }
  };

  if (skillPills.length && skillDetailBox) {
    skillPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const key = pill.getAttribute('data-skill');
        const data = skillData[key];
        if (!data) return;

        skillPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        skillDetailBox.classList.remove('content-fade');
        void skillDetailBox.offsetWidth;
        if (skillTitle) skillTitle.textContent = data.title;
        if (skillCat) skillCat.textContent = data.cat;
        if (skillDesc) skillDesc.textContent = data.desc;
        skillDetailBox.classList.add('content-fade');
      });
    });
  }

  // =========================================
  // 5. SIGILCORE SIDE RAILS SCROLL RECOIL
  // =========================================
  const leftRail = document.querySelector('.sigil-left');
  const rightRail = document.querySelector('.sigil-right');
  const emblems = document.querySelectorAll('.sigil-emblem');

  if (leftRail && rightRail && window.matchMedia('(min-width: 961px)').matches) {
    let lastScrollY = window.scrollY;
    let targetRecoil = 0;
    let currentRecoil = 0;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      targetRecoil += delta * 0.32;
      targetRecoil = Math.max(-42, Math.min(42, targetRecoil));
    }, { passive: true });

    function updateSigilRecoil() {
      targetRecoil *= 0.84;
      currentRecoil += (targetRecoil - currentRecoil) * 0.14;

      const stretch = 1 + Math.abs(currentRecoil) * 0.0025;
      const tilt = currentRecoil * 0.35;

      leftRail.style.transform = `translate3d(0, ${currentRecoil.toFixed(2)}px, 0) scaleY(${stretch.toFixed(4)})`;
      rightRail.style.transform = `translate3d(0, ${(currentRecoil * 0.85).toFixed(2)}px, 0) scaleY(${stretch.toFixed(4)})`;

      emblems.forEach((emblem, idx) => {
        const dir = idx % 2 === 0 ? 1 : -1;
        emblem.style.transform = `rotate(${(tilt * dir).toFixed(2)}deg)`;
      });

      requestAnimationFrame(updateSigilRecoil);
    }

    requestAnimationFrame(updateSigilRecoil);
  }

  // =========================================
  // 6. BGM TOGGLE (MOBILE & DESKTOP)
  // =========================================
  const bgmWidget = document.getElementById('bgmWidget');
  const bgmToggle = document.getElementById('bgmToggle');
  const bgmAudio = document.getElementById('bgmAudio');
  const bgmStatus = document.getElementById('bgmStatus');
  const bgmTitle = document.getElementById('bgmTitle');

  let isPlaying = false;
  let audioCtx = null;
  let ambientNodes = [];

  function startFallbackAmbient() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const freqs = [174.61, 220.00, 261.63, 329.63];
    const masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.04;
    masterGain.connect(audioCtx.destination);

    freqs.forEach(f => {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      osc.connect(masterGain);
      osc.start();
      ambientNodes.push(osc);
    });
  }

  function stopFallbackAmbient() {
    ambientNodes.forEach(osc => { try { osc.stop(); } catch (e) {} });
    ambientNodes = [];
    if (audioCtx) { audioCtx.close(); audioCtx = null; }
  }

  if (bgmToggle && bgmAudio) {
    bgmAudio.volume = 0.4;

    bgmToggle.addEventListener('click', () => {
      if (!isPlaying) {
        if (bgmStatus) bgmStatus.textContent = 'LOADING...';
        const playPromise = bgmAudio.play();

        if (playPromise !== undefined) {
          playPromise.then(() => {
            isPlaying = true;
            bgmWidget?.classList.add('playing');
            if (bgmStatus) bgmStatus.textContent = 'BGM ON';
            if (bgmTitle) bgmTitle.textContent = 'Now Playing';
          }).catch(() => {
            startFallbackAmbient();
            isPlaying = true;
            bgmWidget?.classList.add('playing');
            if (bgmStatus) bgmStatus.textContent = 'BGM ON';
            if (bgmTitle) bgmTitle.textContent = 'Ambient Mode';
          });
        }
      } else {
        bgmAudio.pause();
        stopFallbackAmbient();
        isPlaying = false;
        bgmWidget?.classList.remove('playing');
        if (bgmStatus) bgmStatus.textContent = 'BGM OFF';
        if (bgmTitle) bgmTitle.textContent = 'Click to vibe';
      }
    });
  }

  // =========================================
  // 7. EASTER EGG MINI-TERMINAL (>_ )
  // =========================================
  const termModal = document.getElementById('termModal');
  const termOpenBtn = document.getElementById('termOpenBtn');
  const termCloseBtn = document.getElementById('termCloseBtn');
  const termForm = document.getElementById('termForm');
  const termInput = document.getElementById('termInput');
  const termBody = document.getElementById('termBody');
  const weatherEl = document.getElementById('jktWeather');

  const commands = {
    help: 'Commands: <span class="term-cmd">whoami</span>, <span class="term-cmd">neofetch</span>, <span class="term-cmd">skills</span>, <span class="term-cmd">weather</span>, <span class="term-cmd">socials</span>, <span class="term-cmd">bgm</span>, <span class="term-cmd">clear</span>, <span class="term-cmd">exit</span>',
    whoami: 'Zax (azhkrt) — IT Support & Network Administration @ DIKA. Web tinkerer & visual novel enjoyer.',
    neofetch: 'OS: Windows 11 LTSC | Host: ASUS TUF A15 | Shell: azhkrt-web 1.0 | Vibe: Monochrome / Sigilcore',
    skills: 'Infra: Active Directory, LAN/WLAN, Windows Server/LTSC | Web: HTML, CSS, Vanilla JS, Laravel, Git',
    socials: 'GitHub: github.com/azhkrt — cek dock kanan atau footer untuk link langsung.',
    weather: () => `Jakarta: ${weatherEl?.textContent.trim() || 'Checking weather...'}`,
    bgm: () => { bgmToggle?.click(); return 'Toggling background audio...'; }
  };

  function toggleTerminal(show) {
    if (!termModal) return;
    termModal.classList.toggle('open', show);
    if (show && termInput) setTimeout(() => termInput.focus(), 80);
  }

  if (termOpenBtn) {
    termOpenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTerminal(true);
    });
  }

  if (termCloseBtn) {
    termCloseBtn.addEventListener('click', () => toggleTerminal(false));
  }

  if (termModal) {
    termModal.addEventListener('click', (e) => {
      if (e.target === termModal) toggleTerminal(false);
    });
  }

  if (termBody && termInput) {
    termBody.addEventListener('click', () => termInput.focus());
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleTerminal(false);
  });

  if (termForm && termInput && termBody) {
    termForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const raw = termInput.value.trim();
      if (!raw) return;

      const cmd = raw.toLowerCase();
      termBody.innerHTML += `<div><span class="term-prompt">$</span> ${raw}</div>`;

      if (cmd === 'clear') {
        termBody.innerHTML = '';
      } else if (cmd === 'exit') {
        toggleTerminal(false);
      } else if (commands[cmd]) {
        const output = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
        termBody.innerHTML += `<div class="term-muted">${output}</div>`;
      } else {
        termBody.innerHTML += `<div class="term-muted">command not found: ${raw}. Ketik <span class="term-cmd">help</span>.</div>`;
      }

      termInput.value = '';
      termBody.scrollTop = termBody.scrollHeight;
    });
  }

  // =========================================
  // 8. SUBTLE SCROLL REVEAL
  // =========================================
  const revealTargets = document.querySelectorAll('.about, .experience, .projects');
  if (revealTargets.length && 'IntersectionObserver' in window) {
    revealTargets.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealTargets.forEach(el => revealObserver.observe(el));
  }

  // =========================================
  // 9. REALTIME JAKARTA CLOCK & WEATHER
  // =========================================
  const clockEl = document.getElementById('jktClock');

  function updateJakartaClock() {
    if (!clockEl) return;
    const now = new Date();
    const formatted = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(now);
    clockEl.textContent = `${formatted} WIB`;
  }

  updateJakartaClock();
  setInterval(updateJakartaClock, 1000);

  function mapWeatherCode(code, isDay) {
    if (code === 0) return { icon: isDay ? 'fa-sun' : 'fa-moon', label: 'Clear' };
    if (code <= 3) return { icon: isDay ? 'fa-cloud-sun' : 'fa-cloud-moon', label: 'Cloudy' };
    if (code === 45 || code === 48) return { icon: 'fa-smog', label: 'Haze' };
    if (code >= 51 && code <= 67) return { icon: 'fa-cloud-rain', label: 'Rain' };
    if (code >= 80 && code <= 82) return { icon: 'fa-cloud-showers-heavy', label: 'Showers' };
    if (code >= 95) return { icon: 'fa-bolt', label: 'Storm' };
    return { icon: 'fa-cloud', label: 'Overcast' };
  }

  async function fetchWithTimeout(url, ms = 5000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);
      if (!res.ok) throw new Error('HTTP error');
      return await res.json();
    } catch (e) {
      clearTimeout(timer);
      throw e;
    }
  }

  async function fetchJakartaWeather() {
    if (!weatherEl) return;

    const cacheKey = 'jkt_weather_v2';
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey));
      if (cached && Date.now() - cached.ts < 15 * 60 * 1000) {
        weatherEl.innerHTML = cached.html;
        return;
      }
    } catch (e) {}

    let weatherHTML = '';

    try {
      const data = await fetchWithTimeout(
        'https://api.open-meteo.com/v1/forecast?latitude=-6.2088&longitude=106.8456¤t_weather=true'
      );
      const cw = data.current_weather;
      const temp = Math.round(cw.temperature);
      const { icon, label } = mapWeatherCode(cw.weathercode, cw.is_day === 1);
      weatherHTML = `<i class="fas ${icon}"></i> ${temp}°C ${label}`;
    } catch (err1) {
      try {
        const data2 = await fetchWithTimeout('https://wttr.in/Jakarta?format=j1');
        const cond = data2.current_condition[0];
        const temp = cond.temp_C;
        const desc = cond.weatherDesc[0].value.split(',')[0];
        weatherHTML = `<i class="fas fa-cloud-sun"></i> ${temp}°C ${desc}`;
      } catch (err2) {
        weatherHTML = `<i class="fas fa-cloud"></i> 30°C JKT`;
      }
    }

    weatherEl.innerHTML = weatherHTML;
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ html: weatherHTML, ts: Date.now() }));
    } catch (e) {}
  }

  fetchJakartaWeather();
  setInterval(fetchJakartaWeather, 15 * 60 * 1000);
});