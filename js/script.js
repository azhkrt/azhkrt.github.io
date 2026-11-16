document.addEventListener('DOMContentLoaded', () => {
  // 1. Burger Menu Toggle
  const burgerBtn = document.getElementById('burgerBtn');
  const navMenu = document.getElementById('navMenu');

  burgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });

  // 2. Click-based About Me Cards (Ramah HP & Desktop)
  const cards = document.querySelectorAll('.section-card');
  const contentDisplay = document.getElementById('selected-content');

  const contentData = {
    myself: `<h3>About Myself</h3><p>A Computer Engineering and Networking (TKJ) graduate who spends their days immersed in IT support, network infrastructure, and tinkering with web design.</p>`,
    hobbies: `<h3>My Hobbies</h3><p>Tinkering with web projects, reading visual novels & manga, listening to maidcore/alt-rock, and playing simulation games.</p>`,
    facts: `<h3>Setup & Trivia</h3><p>Uses Windows LTSC as a daily driver, a fan of wired IEMs for audio, and always looking for ways to make the UI look clean yet full of character.</p>`,
    aesthetics: `<h3>My Aesthetics</h3><p>Monochrome glassmorphism, 2000s visual novel atmosphere, shoegaze / digicore soundscapes, and clean dark interfaces.</p>`
  };

cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      contentDisplay.innerHTML = `<div class="content-fade">${contentData[card.id] || ''}</div>`;
    });
  });
});

// 3. 3D Cursor Tilt Effect pada Project Cards (Desktop / Pointer devices)
  const projectCards = document.querySelectorAll('.project-card');
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (isFinePointer) {
    const maxTilt = 8; // Derajat kemiringan maksimal (makin besar makin ekstrem)

    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.12s ease-out, border-color 0.35s ease, box-shadow 0.4s ease';
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update koordinat spotlight glow
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Hitung rotasi X & Y berdasarkan jarak kursor dari titik tengah card
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        // Kembalikan ke posisi datar dengan transisi smooth
        card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease, box-shadow 0.4s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
      // 4. Interactive Skill Pills Inspector
  const skillPills = document.querySelectorAll('.skill-pill');
  const skillTitle = document.getElementById('skillTitle');
  const skillCat = document.getElementById('skillCat');
  const skillDesc = document.getElementById('skillDesc');
  const skillDetailBox = document.getElementById('skillDetailBox');

  const skillData = {
    ad: {
      title: 'Active Directory',
      cat: 'Infrastructure',
      desc: 'Managing the Organizational Unit (OU) structure, creating and resetting corporate user accounts, joining devices to the domain, and implementing basic client access policies.'
    },
    net: {
      title: 'Network Configuration',
      cat: 'Networking',
      desc: 'Static/DHCP IP configuration, basic subnetting, checking routing paths, crimping LAN cables, and troubleshooting office network connections as well as client devices.'
    },
    win: {
      title: 'Windows Server & LTSC',
      cat: 'Operating System',
      desc: 'Administration of corporate Windows environments (Windows 10/11 Pro & LTSC), optimization of system services, management of folder-sharing permissions, and maintenance of OS stability.'
    },
    prov: {
      title: 'System Provisioning',
      cat: 'Deployment',
      desc: 'Setting up a new PC/laptop from scratch and making it ready for use: installing the OS, drivers, and standard office software, configuring security settings, and handing it over to the user.'
    },
    hw: {
      title: 'Hardware Troubleshooting',
      cat: 'IT Support',
      desc: 'Diagnosis of PC and laptop component issues (RAM, NVMe storage, thermal, power), spare part replacement, and routine preventive maintenance.'
    },
    htmlcss: {
      title: 'HTML5 & CSS3',
      cat: 'Frontend',
      desc: 'Building semantic web page structures, responsive layouts using CSS Grid & Flexbox, and applying modern styling such as glassmorphism and keyframe animations.'
    },
    js: {
      title: 'JavaScript (Vanilla)',
      cat: 'Frontend',
      desc: 'DOM manipulation for dynamic interactions (such as interactive cards and 3D tilt effects in this portfolio), event handling, and interface logic—all without relying on heavy frameworks.'
    },
    laravel: {
      title: 'PHP & Laravel',
      cat: 'Backend / Fullstack',
      desc: 'Development of dynamic web applications using the Laravel MVC architecture, routing, Blade templating, and relational database integration.'
    },
    git: {
      title: 'Git & GitHub',
      cat: 'Workflow',
      desc: 'Version control for tracking code changes, managing repository branches, and deploying static projects using GitHub Pages.'
    }
  };

  skillPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const key = pill.getAttribute('data-skill');
      const data = skillData[key];
      if (!data) return;

      skillPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // Reset animasi fade halus tiap ganti skill
      skillDetailBox.classList.remove('content-fade');
      void skillDetailBox.offsetWidth;
      skillTitle.textContent = data.title;
      skillCat.textContent = data.cat;
      skillDesc.textContent = data.desc;
      skillDetailBox.classList.add('content-fade');
    });
  });
  // 5. Sigilcore Side Rails Scroll Recoil Physics
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

      // Tambah impuls recoil berdasarkan kecepatan scroll (dibatasi max ±42px)
      targetRecoil += delta * 0.32;
      targetRecoil = Math.max(-42, Math.min(42, targetRecoil));
    }, { passive: true });

    function updateSigilRecoil() {
      // Redam target kembali ke 0 (posisi netral) & kejar dengan spring easing
      targetRecoil *= 0.84;
      currentRecoil += (targetRecoil - currentRecoil) * 0.14;

      const stretch = 1 + Math.abs(currentRecoil) * 0.0025;
      const tilt = currentRecoil * 0.35;

      // Kiri dan kanan diberi sedikit perbedaan fase biar kerasa organik
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

  // 6. BGM Toggle (Mendukung file bgm.mp3 + fallback ambient synth otomatis)
  const bgmWidget = document.getElementById('bgmWidget');
  const bgmToggle = document.getElementById('bgmToggle');
  const bgmAudio = document.getElementById('bgmAudio');
  const bgmStatus = document.getElementById('bgmStatus');
  const bgmTitle = document.getElementById('bgmTitle');

  let isPlaying = false;
  let audioCtx = null;
  let ambientNodes = [];

  function startFallbackAmbient() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const freqs = [174.61, 220.00, 261.63, 329.63]; // Chord Fmaj7 ambient halus
    const masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.035;
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

  if (bgmToggle) {
    bgmAudio.volume = 0.35;

    bgmToggle.addEventListener('click', async () => {
      if (!isPlaying) {
        try {
          await bgmAudio.play();
          bgmTitle.textContent = 'Wish - Ailey Rain';
        } catch (err) {
          // Jika bgm.mp3 belum ditaruh di folder, nyalakan ambient synth halus
          startFallbackAmbient();
          bgmTitle.textContent = 'Ambient Mode';
        }
        isPlaying = true;
        bgmWidget.classList.add('playing');
        bgmStatus.textContent = 'BGM ON';
      } else {
        bgmAudio.pause();
        stopFallbackAmbient();
        isPlaying = false;
        bgmWidget.classList.remove('playing');
        bgmStatus.textContent = 'BGM OFF';
        bgmTitle.textContent = 'Click to vibe';
      }
    });
  }

  // 7. Easter Egg Mini-Terminal (>_ )
  const termModal = document.getElementById('termModal');
  const termOpenBtn = document.getElementById('termOpenBtn');
  const termCloseBtn = document.getElementById('termCloseBtn');
  const termForm = document.getElementById('termForm');
  const termInput = document.getElementById('termInput');
  const termBody = document.getElementById('termBody');

  const commands = {
    help: 'Available commands: <span class="term-cmd">whoami</span>, <span class="term-cmd">neofetch</span>, <span class="term-cmd">skills</span>, <span class="term-cmd">socials</span>, <span class="term-cmd">bgm</span>, <span class="term-cmd">clear</span>, <span class="term-cmd">exit</span>',
    whoami: 'Zax (azhkrt) — IT Support & Network Administration @ DIKA. Web tinkerer & visual novel enjoyer.',
    neofetch: 'OS: Windows 11 LTSC | Host: ASUS TUF A15 | Shell: azhkrt-web 1.0 | Vibe: Monochrome / Sigilcore',
    skills: 'Infra: Active Directory, LAN/WLAN, Windows Server/LTSC | Web: HTML, CSS, Vanilla JS, Laravel, Git',
    socials: 'GitHub: github.com/azhkrt — check the right dock or footer for direct links.',
    bgm: () => { bgmToggle?.click(); return 'Toggling background audio...'; }
  };

  function toggleTerminal(show) {
    termModal.classList.toggle('open', show);
    if (show) setTimeout(() => termInput.focus(), 50);
  }

  termOpenBtn?.addEventListener('click', () => toggleTerminal(true));
  termCloseBtn?.addEventListener('click', () => toggleTerminal(false));
  termModal?.addEventListener('click', (e) => { if (e.target === termModal) toggleTerminal(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleTerminal(false); });

  termForm?.addEventListener('submit', (e) => {
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

  // 8. Subtle Scroll Reveal
  const revealTargets = document.querySelectorAll('.about, .experience, .projects');
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => revealObserver.observe(el));
  // 9. Realtime Jakarta Clock (WIB) & Open-Meteo Weather
  const clockEl = document.getElementById('jktClock');
  const weatherEl = document.getElementById('jktWeather');

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

  async function fetchJakartaWeather() {
    if (!weatherEl) return;
    try {
      // Koordinat Jakarta (-6.2088, 106.8456)
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=-6.2088&longitude=106.8456¤t=temperature_2m,weather_code,is_day&timezone=Asia%2FJakarta';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather fetch failed');
      const data = await res.json();

      const temp = Math.round(data.current.temperature_2m);
      const code = data.current.weather_code;
      const isDay = data.current.is_day === 1;
      const { icon, label } = mapWeatherCode(code, isDay);

      weatherEl.innerHTML = `<i class="fas ${icon}"></i> ${temp}°C ${label}`;
    } catch (err) {
      weatherEl.innerHTML = `<i class="fas fa-cloud"></i> JKT`;
    }
  }

  fetchJakartaWeather();
  // Auto-update cuaca tiap 15 menit
  setInterval(fetchJakartaWeather, 15 * 60 * 1000);

    });
  }