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
    myself: `<h3>Tentang Saya</h3><p>Lulusan vokasi di bidang Teknik Komputer dan Jaringan yang sehari-hari berkecimpung di layanan IT, infrastruktur jaringan, dan eksperimen web.</p>`,
    hobbies: `<h3>Hobi</h3><p>Membangun proyek web, membaca visual novel & manga, mendengarkan maidcore/alt-rock, serta bermain game simulasi.</p>`,
    facts: `<h3>Pengaturan & Fakta</h3><p>Daily driver Windows LTSC, penggemar audio IEM kabel, dan selalu mencari cara agar antarmuka terlihat rapi namun khas.</p>`,
    aesthetics: `<h3>Estetikku</h3><p>Glassmorphism monokrom, atmosfer visual novel awal 2000-an, lanskap suara shoegaze / digicore, dan antarmuka gelap yang bersih.</p>`
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
      cat: 'Infrastruktur',
      desc: 'Mengelola struktur Organizational Unit (OU), membuat dan mereset akun pengguna perusahaan, menghubungkan perangkat ke domain, serta menerapkan kebijakan akses client dasar.'
    },
    net: {
      title: 'Konfigurasi Jaringan',
      cat: 'Jaringan',
      desc: 'Konfigurasi IP statis/DHCP, subnetting dasar, pengecekan rute, pemasangan kabel LAN, serta troubleshooting konektivitas jaringan kantor untuk perangkat klien.'
    },
    win: {
      title: 'Windows Server & LTSC',
      cat: 'Sistem Operasi',
      desc: 'Administrasi lingkungan Windows perusahaan (Windows 10/11 Pro & LTSC), optimasi layanan sistem, pengelolaan izin folder bersama, serta menjaga stabilitas OS.'
    },
    prov: {
      title: 'Provisioning Sistem',
      cat: 'Deployment',
      desc: 'Menyiapkan unit PC/laptop baru dari nol hingga siap pakai: instalasi OS, driver, standar perangkat lunak kantor, pengaturan keamanan, dan serah terima pengguna.'
    },
    hw: {
      title: 'Troubleshooting Perangkat Keras',
      cat: 'IT Support',
      desc: 'Mendiagnosis kerusakan komponen PC dan laptop (RAM, penyimpanan NVMe, masalah termal, daya), mengganti spare part, serta pemeliharaan preventif rutin.'
    },
    htmlcss: {
      title: 'HTML5 & CSS3',
      cat: 'Frontend',
      desc: 'Membangun struktur halaman yang semantik, layout responsif menggunakan CSS Grid dan Flexbox, serta styling modern seperti glassmorphism dan animasi keyframe.'
    },
    js: {
      title: 'JavaScript (Vanilla)',
      cat: 'Frontend',
      desc: 'Manipulasi DOM untuk interaktivitas dinamis (seperti kartu interaktif dan efek tilt 3D di portofolio ini), penanganan event, serta logika antarmuka tanpa bergantung pada framework berat.'
    },
    laravel: {
      title: 'PHP & Laravel',
      cat: 'Backend / Fullstack',
      desc: 'Mengembangkan aplikasi web dinamis menggunakan arsitektur MVC Laravel, routing, templating Blade, dan integrasi database relasional.'
    },
    git: {
      title: 'Git & GitHub',
      cat: 'Alur Kerja',
      desc: 'Kontrol versi untuk melacak perubahan kode, mengelola branch repositori, dan mendeploy proyek statis melalui GitHub Pages.'
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
        if (bgmStatus) bgmStatus.textContent = 'MEMUAT...';
        const playPromise = bgmAudio.play();

        if (playPromise !== undefined) {
          playPromise.then(() => {
            isPlaying = true;
            bgmWidget?.classList.add('playing');
            if (bgmStatus) bgmStatus.textContent = 'MUSIK AKTIF';
            if (bgmTitle) bgmTitle.textContent = 'Wish - Ailey Rain';
          }).catch(() => {
            startFallbackAmbient();
            isPlaying = true;
            bgmWidget?.classList.add('playing');
            if (bgmStatus) bgmStatus.textContent = 'MUSIK AKTIF';
            if (bgmTitle) bgmTitle.textContent = 'Mode Ambient';
          });
        }
      } else {
        bgmAudio.pause();
        stopFallbackAmbient();
        isPlaying = false;
        bgmWidget?.classList.remove('playing');
        if (bgmStatus) bgmStatus.textContent = 'MUSIK MATI';
        if (bgmTitle) bgmTitle.textContent = 'Klik untuk bersantai';
      }
    });
  }

// =========================================
  // 7. FULL DESKTOP ENVIRONMENT & TERMINAL
  // =========================================
  const osScreen = document.getElementById('osScreen');
  const termWindow = document.getElementById('termWindow');
  const termTitlebar = document.getElementById('termTitlebar');
  const termForm = document.getElementById('termForm');
  const termInput = document.getElementById('termInput');
  const termBody = document.getElementById('termBody');
  const cmdChips = document.querySelectorAll('.cmd-chip');
  const weatherEl = document.getElementById('jktWeather');

  // Window & Taskbar Controls
  const winMinBtn = document.getElementById('winMinBtn');
  const winMaxBtn = document.getElementById('winMaxBtn');
  const winCloseBtn = document.getElementById('winCloseBtn');
  const taskTermBtn = document.getElementById('taskTermBtn');

  // Start Menu & Desktop Shortcuts
  const startBtn = document.getElementById('startBtn');
  const startMenu = document.getElementById('startMenu');

  function openGitHubRepo() {
    window.open('https://github.com/azhkrt?tab=repositories', '_blank', 'noopener');
    startMenu?.classList.remove('open');
  }

  function openPinterest() {
    window.open('https://pin.it/5BnWW2ciG', '_blank');
    startMenu?.classList.remove('open');
  }

  function openTerminalApp() {
    if (!termWindow) return;
    termWindow.classList.remove('minimized');
    taskTermBtn?.classList.add('active');
    startMenu?.classList.remove('open');
    setTimeout(() => termInput?.focus(), 60);
  }

  // Desktop Icons & Start Menu Bindings
  document.getElementById('iconFiles')?.addEventListener('click', openGitHubRepo);
  document.getElementById('menuFiles')?.addEventListener('click', openGitHubRepo);

  document.getElementById('iconPinterest')?.addEventListener('click', openPinterest);
  document.getElementById('menuPinterest')?.addEventListener('click', openPinterest);

  document.getElementById('iconTerm')?.addEventListener('click', openTerminalApp);
  document.getElementById('menuTerm')?.addEventListener('click', openTerminalApp);

  document.getElementById('menuReset')?.addEventListener('click', () => {
    if (termWindow) {
      termWindow.classList.remove('minimized', 'maximized');
      termWindow.style.top = '';
      termWindow.style.left = '';
    }
    taskTermBtn?.classList.add('active');
    startMenu?.classList.remove('open');
  });

  // Start Button Toggle
  startBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    startMenu?.classList.toggle('open');
  });

  osScreen?.addEventListener('click', (e) => {
    if (startMenu && !startMenu.contains(e.target) && e.target !== startBtn) {
      startMenu.classList.remove('open');
    }
  });

  // Window Buttons (Minimize, Maximize, Close)
  winMinBtn?.addEventListener('click', () => {
    termWindow?.classList.add('minimized');
    taskTermBtn?.classList.remove('active');
  });

  winCloseBtn?.addEventListener('click', () => {
    termWindow?.classList.add('minimized');
    taskTermBtn?.classList.remove('active');
  });

  winMaxBtn?.addEventListener('click', () => {
    termWindow?.classList.toggle('maximized');
  });

  taskTermBtn?.addEventListener('click', () => {
    if (!termWindow) return;
    const isHidden = termWindow.classList.contains('minimized');
    termWindow.classList.toggle('minimized', !isHidden);
    taskTermBtn.classList.toggle('active', isHidden);
    if (isHidden) termInput?.focus();
  });

  // Window Dragging (Desktop Only)
  if (termTitlebar && termWindow && osScreen && window.matchMedia('(min-width: 821px)').matches) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    termTitlebar.addEventListener('mousedown', (e) => {
      if (e.target.closest('button') || termWindow.classList.contains('maximized')) return;
      isDragging = true;
      const winRect = termWindow.getBoundingClientRect();
      offsetX = e.clientX - winRect.left;
      offsetY = e.clientY - winRect.top;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const screenRect = osScreen.getBoundingClientRect();
      let newLeft = e.clientX - screenRect.left - offsetX;
      let newTop = e.clientY - screenRect.top - offsetY;

      // Batasi agar jendela tidak keluar dari layar desktop
      const maxLeft = screenRect.width - termWindow.offsetWidth;
      const maxTop = screenRect.height - termWindow.offsetHeight - 46;
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));

      termWindow.style.left = `${newLeft}px`;
      termWindow.style.top = `${newTop}px`;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }

  // Custom Neofetch HTML + Terminal Commands
  const neofetchHTML = `
    <div class="nf-box">
      <pre class="nf-ascii">  
                               _
   / |    ___| |___ | / /___ _ | |__ 
  / _ |  |_  / '_  ||/ /  '__|    __|
 / ___ |  / /| | | || <  | |   | | 
/_/    _|/___|_| |_||_|| |_|   | |
                               | |


  † azhkrt †</pre>
      <ul class="nf-info">
        <li><strong>zax@azhkrt</strong></li>
        <li>-------------------</li>
        <li><strong>Sistem Operasi:</strong> Windows 11 LTSC</li>
        <li><strong>Host:</strong> ASUS TUF A15 (Ryzen 5 / RTX 4050)</li>
        <li><strong>Peran:</strong> IT Support & NetAdmin @ DIKA</li>
        <li><strong>Shell:</strong> azhkrt-zsh 2.0</li>
        <li><strong>Tema:</strong> Monochrome Sigilcore</li>
        <li class="nf-swatches">
          <span style="background:#ffffff"></span>
          <span style="background:#a3a3a3"></span>
          <span style="background:#525252"></span>
          <span style="background:#262626"></span>
          <span style="background:#4ade80"></span>
        </li>
      </ul>
    </div>
  `;

  const commands = {
    help: 'Perintah: <span class="term-cmd">neofetch</span>, <span class="term-cmd">whoami</span>, <span class="term-cmd">skills</span>, <span class="term-cmd">projects</span>, <span class="term-cmd">weather</span>, <span class="term-cmd">files</span>, <span class="term-cmd">firefox</span>, <span class="term-cmd">bgm</span>, <span class="term-cmd">clear</span>',
    neofetch: neofetchHTML,
    whoami: 'Zax (azhkrt) — IT Support & Administrasi Jaringan @ DIKA. Web tinkerer & pecinta visual novel. Berusia 18 tahun, lahir 04 Nov 2008, single, yandere, masalah attachment, gila, punya obsesi pada seseorang, mudah cemburu dan posesif, serta bisa clingy. Suka: Visual Novel, Manga, Game Simulasi. Menyukai Maidcore, Digicore, Shoegaze, Alt Rock, instrumental, dll.',
    skills: 'Infra: Active Directory, LAN/WLAN, Windows Server/LTSC | Web: HTML, CSS, Vanilla JS, Laravel, Git',
    projects: '1. Cloud 9 Web App (Laravel) | 2. azhkrt.github.io (Portofolio Sigilcore Monokrom)',
    weather: () => `Jakarta: ${weatherEl?.textContent.trim() || 'Memeriksa cuaca...'}`,
    files: () => { openGitHubRepo(); return 'Membuka repository GitHub...'; },
    firefox: () => { openBlankFirefox(); return 'Meluncurkan tab Firefox baru yang kosong...'; },
    bgm: () => { bgmToggle?.click(); return 'Mengalihkan audio latar...'; }
  };

  function runTerminalCommand(raw) {
    if (!raw || !termBody) return;
    const cmd = raw.toLowerCase();
    termBody.innerHTML += `<div><span class="term-prompt">zax@azhkrt:~$</span> ${raw}</div>`;

    if (cmd === 'clear') {
      termBody.innerHTML = '';
    } else if (commands[cmd]) {
      const output = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
      termBody.innerHTML += `<div class="term-muted">${output}</div>`;
    } else {
      termBody.innerHTML += `<div class="term-muted">zsh: perintah tidak ditemukan: ${raw}. Ketik <span class="term-cmd">help</span>.</div>`;
    }

    termBody.scrollTop = termBody.scrollHeight;
  }

  // Otomatis tampilkan neofetch saat halaman pertama kali dibuka
  runTerminalCommand('neofetch');

  termForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = termInput.value.trim();
    if (!raw) return;
    runTerminalCommand(raw);
    termInput.value = '';
  });

  cmdChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) runTerminalCommand(cmd);
    });
  });
  
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
    const trayClock = document.getElementById('osTrayClock'); if (trayClock) trayClock.textContent = formatted + ' WIB';
  }

  updateJakartaClock();
  setInterval(updateJakartaClock, 1000);

  function mapWeatherCode(code, isDay) {
    if (code === 0) return { icon: isDay ? 'fa-sun' : 'fa-moon', label: 'Cerah' };
    if (code <= 3) return { icon: isDay ? 'fa-cloud-sun' : 'fa-cloud-moon', label: 'Berawan' };
    if (code === 45 || code === 48) return { icon: 'fa-smog', label: 'Kabut' };
    if (code >= 51 && code <= 67) return { icon: 'fa-cloud-rain', label: 'Hujan' };
    if (code >= 80 && code <= 82) return { icon: 'fa-cloud-showers-heavy', label: 'Hujan Lebat' };
    if (code >= 95) return { icon: 'fa-bolt', label: 'Badai' };
    return { icon: 'fa-cloud', label: 'Mendung' };
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