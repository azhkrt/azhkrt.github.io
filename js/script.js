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
    myself: `<h3>About Myself</h3><p>A vocational graduate in Computer and Network Engineering who spends daily life in IT support, network infrastructure, and web tinkering.</p>`,
    hobbies: `<h3>My Hobbies</h3><p>Building web projects, reading visual novels & manga, listening to maidcore/alt-rock, and playing simulation games.</p>`,
    facts: `<h3>Setup & Trivia</h3><p>Daily driver Windows LTSC, a fan of wired IEM audio, and always looking for ways to make interfaces look clean yet distinctive.</p>`,
    aesthetics: `<h3>My Aesthetics</h3><p>Monochrome glassmorphism, early-2000s visual novel atmosphere, shoegaze / digicore soundscapes, and clean dark interfaces.</p>`
  };

const isMobileView = () => window.matchMedia('(max-width: 768px)').matches;

  function clearMobileDetails() {
    document.querySelectorAll('.mobile-card-detail').forEach(el => el.remove());
  }

  if (cards.length && contentDisplay) {
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const html = contentData[card.id] || '';
        const wasActive = card.classList.contains('active');

        cards.forEach(c => c.classList.remove('active'));
        clearMobileDetails();

        if (isMobileView()) {
          // Khusus HP: Kalau kartu yang sama dipencet lagi, tutup deskripsinya
          if (wasActive) return;

          // Sisipkan kotak deskripsi tepat di bawah kartu yang dipencet
          card.classList.add('active');
          const detailBox = document.createElement('div');
          detailBox.className = 'mobile-card-detail content-fade';
          detailBox.innerHTML = html;
          card.insertAdjacentElement('afterend', detailBox);
        } else {
          // Khusus Desktop: Tetap tampil di box bawah grid 4 kolom
          card.classList.add('active');
          contentDisplay.innerHTML = `<div class="content-fade">${html}</div>`;
        }
      });
    });

    // Hapus box inline kalau layar di-resize balik ke desktop
    window.addEventListener('resize', () => {
      if (!isMobileView()) clearMobileDetails();
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
      desc: 'Managing the Organizational Unit (OU) structure, creating and resetting corporate user accounts, joining devices to the domain, and enforcing basic client access policies.'
    },
    net: {
      title: 'Network Configuration',
      cat: 'Networking',
      desc: 'Static/DHCP IP configuration, basic subnetting, route checking, LAN cable crimping, and troubleshooting office network connectivity for client devices.'
    },
    win: {
      title: 'Windows Server & LTSC',
      cat: 'Operating System',
      desc: 'Administration of corporate Windows environments (Windows 10/11 Pro & LTSC), system service optimization, shared-folder permission management, and maintaining OS stability.'
    },
    prov: {
      title: 'System Provisioning',
      cat: 'Deployment',
      desc: 'Preparing new PC/laptop units from scratch to ready-to-use: OS installation, drivers, office software standards, security setup, and user handover.'
    },
    hw: {
      title: 'Hardware Troubleshooting',
      cat: 'IT Support',
      desc: 'Diagnosing PC and laptop component failures (RAM, NVMe storage, thermal issues, power), replacing spare parts, and routine preventive maintenance.'
    },
    htmlcss: {
      title: 'HTML5 & CSS3',
      cat: 'Frontend',
      desc: 'Building semantic page structures, responsive layouts using CSS Grid and Flexbox, and modern styling such as glassmorphism and keyframe animations.'
    },
    js: {
      title: 'JavaScript (Vanilla)',
      cat: 'Frontend',
      desc: 'DOM manipulation for dynamic interactivity (like the interactive cards and 3D tilt effects on this portfolio), event handling, and interface logic without relying on heavy frameworks.'
    },
    laravel: {
      title: 'PHP & Laravel',
      cat: 'Backend / Fullstack',
      desc: 'Developing dynamic web applications using the Laravel MVC architecture, routing, Blade templating, and relational database integration.'
    },
    git: {
      title: 'Git & GitHub',
      cat: 'Workflow',
      desc: 'Version control for tracking code changes, managing repository branches, and deploying static projects via GitHub Pages.'
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
            if (bgmTitle) bgmTitle.textContent = 'Wish - Ailey Rain';
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

    function openSpotify() {
    window.open('https://open.spotify.com/user/314lykdmqdkzq2a3p62nq6qfalxq?si=20d5b1c4b7ee4f4c', '_blank');
    startMenu?.classList.remove('open');
  }

      function openInstagram() {
    window.open('https://www.instagram.com/azhkrt_/', '_blank');
    startMenu?.classList.remove('open');
  }

      function openLinkedIn() {
    window.open('https://www.linkedin.com/in/jxki-undefined/', '_blank');
    startMenu?.classList.remove('open');
  }

      function openDiscord() {
    window.open('https://ptb.discord.com/users/1494009864228438268', '_blank');
    startMenu?.classList.remove('open');
  }

      function openblankFirefox() {
    window.open('mailto:ahmadzakifaturahman@gmail.com', '_blank');
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
  
  document.getElementById('iconSpotify')?.addEventListener('click', openSpotify);
  document.getElementById('menuSpotify')?.addEventListener('click', openSpotify);

  document.getElementById('iconInstagram')?.addEventListener('click', openInstagram);
  document.getElementById('menuInstagram')?.addEventListener('click', openInstagram);

  document.getElementById('iconLinkedIn')?.addEventListener('click', openLinkedIn);
  document.getElementById('menuLinkedIn')?.addEventListener('click', openLinkedIn);

  document.getElementById('iconDiscord')?.addEventListener('click', openDiscord);
  document.getElementById('menuDiscord')?.addEventListener('click', openDiscord);

  document.getElementById('iconMail')?.addEventListener('click', openblankFirefox);

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
                                                                  
                        *         *                               
                      **        **                       *     
                      **        **                      **     
                      **        **                      **     
             ******   **        **      ***  ****     ******** 
   ****     ********  **  ***   **  ***  **** **** * ********  
  * ***  * *      **  ** * ***  ** * ***  **   ****     **     
 *   ****         *   ***   *** ***   *   **            **     
**    **         *    **     ** **   *    **            **     
**    **        ***   **     ** **  *     **            **     
**    **         ***  **     ** ** **     **            **     
**    **          *** **     ** ******    **            **     
**    **           ** **     ** **  ***   ***           **     
 ***** **          ** **     ** **   *** * ***           **    
  ***   **         *   **    **  **   ***                         
                  *          *                                    
                 *          *                                     
                *          *                                      
                          *                                       
                                                                  


  † azhkrt †</pre>
      <ul class="nf-info">
        <li><strong>zax@azhkrt</strong></li>
        <li>-------------------</li>
        <li><strong>OS:</strong> Windows 11 LTSC</li>
        <li><strong>Host:</strong> ASUS TUF A15 (Ryzen 5 / RTX 4050)</li>
        <li><strong>Environment:</strong> Deadland</li>
        <li><strong>Shell:</strong> azhkrt-zsh 2.0</li>
        <li><strong>Theme:</strong> Cathryzel</li>
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
    help: 'Commands: <span class="term-cmd">neofetch</span>, <span class="term-cmd">whoami</span>, <span class="term-cmd">skills</span>, <span class="term-cmd">projects</span>, <span class="term-cmd">weather</span>, <span class="term-cmd">files</span>, <span class="term-cmd">bgm</span>, <span class="term-cmd">clear</span>',
    neofetch: neofetchHTML,
    whoami: 'Zax (azhkrt) — IT Support & Network Administration @ DIKA. Web tinkerer & visual novel enjoyer. 18 Years Old born at 04 Nov 2008, Single, Yandere, Attachment Issues, Crazy asf, Have an obsession towards someone, can get jealous easily and possessive, and can be clingy. Likes: Visual Novels, Manga, Simulation Games. Loves Maidcore, Digicore, Shoegaze, Alt Rock, instrumental, etc.',
    skills: 'Infra: Active Directory, LAN/WLAN, Windows Server/LTSC | Web: HTML, CSS, Vanilla JS, Laravel, Git',
    projects: '1. Cloud 9 Web App (Laravel) | 2. azhkrt.github.io (Monochrome Sigilcore Portfolio)',
    weather: () => `Jakarta: ${weatherEl?.textContent.trim() || 'Checking weather...'}`,
    files: () => { openGitHubRepo(); return 'Opening GitHub repositories...'; },
    firefox: () => { openBlankFirefox(); return 'Launching new blank Firefox tab...'; },
    bgm: () => { bgmToggle?.click(); return 'Toggling background audio...'; }
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
      termBody.innerHTML += `<div class="term-muted">zsh: command not found: ${raw}. Type <span class="term-cmd">help</span>.</div>`;
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

    // =========================================
  // 10. SYSTEM SETTINGS APP (START MENU)
  // =========================================
  const settingsWindow = document.getElementById('settingsWindow');
  const settingsTitlebar = document.getElementById('settingsTitlebar');
  const settingsCloseBtn = document.getElementById('settingsCloseBtn');
  const taskSettingsBtn = document.getElementById('taskSettingsBtn');
  const menuSettings = document.getElementById('menuSettings');

  const themeOpts = document.querySelectorAll('.theme-opt');
  const optSigils = document.getElementById('optSigils');
  const optOpacity = document.getElementById('optOpacity');
  const optOpacityVal = document.getElementById('optOpacityVal');
  const optMotion = document.getElementById('optMotion');
  const resetSettingsBtn = document.getElementById('resetSettingsBtn');

  const defaultSettings = {
    theme: 'dark',
    sigils: true,
    opacity: 48,
    motion: true
  };

  let currentSettings = { ...defaultSettings };
  try {
    const saved = JSON.parse(localStorage.getItem('azhkrt_os_settings'));
    if (saved) currentSettings = { ...defaultSettings, ...saved };
  } catch (e) {}

  function applySettings(cfg) {
    // 1. Light / Dark Mode
    document.body.classList.toggle('light-mode', cfg.theme === 'light');
    themeOpts.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === cfg.theme);
    });

    // 2. Sigilcore Side Rails
    document.body.classList.toggle('no-sigils', !cfg.sigils);
    if (optSigils) optSigils.checked = cfg.sigils;

    // 3. Terminal Transparency
    if (termWindow) {
      termWindow.style.background = `rgba(14, 14, 14, ${(cfg.opacity / 100).toFixed(2)})`;
    }
    if (optOpacity) optOpacity.value = cfg.opacity;
    if (optOpacityVal) optOpacityVal.textContent = `${cfg.opacity}%`;

    // 4. Animations & Physics
    document.body.classList.toggle('reduce-motion', !cfg.motion);
    if (optMotion) optMotion.checked = cfg.motion;

    try {
      localStorage.setItem('azhkrt_os_settings', JSON.stringify(cfg));
    } catch (e) {}
  }

  applySettings(currentSettings);

  function openSettingsApp() {
    if (!settingsWindow) return;
    settingsWindow.classList.remove('minimized');
    settingsWindow.style.zIndex = '22';
    if (termWindow) termWindow.style.zIndex = '10';
    taskSettingsBtn?.classList.remove('hidden');
    taskSettingsBtn?.classList.add('active');
    startMenu?.classList.remove('open');
  }

  function closeSettingsApp() {
    settingsWindow?.classList.add('minimized');
    taskSettingsBtn?.classList.add('hidden');
    taskSettingsBtn?.classList.remove('active');
  }

  menuSettings?.addEventListener('click', openSettingsApp);
  settingsCloseBtn?.addEventListener('click', closeSettingsApp);
  taskSettingsBtn?.addEventListener('click', () => {
    if (!settingsWindow) return;
    const isHidden = settingsWindow.classList.contains('minimized');
    settingsWindow.classList.toggle('minimized', !isHidden);
    taskSettingsBtn.classList.toggle('active', isHidden);
  });

  // Fokus layer jendela saat diklik
  termWindow?.addEventListener('mousedown', () => {
    termWindow.style.zIndex = '20';
    if (settingsWindow) settingsWindow.style.zIndex = '15';
  });

  settingsWindow?.addEventListener('mousedown', () => {
    settingsWindow.style.zIndex = '20';
    if (termWindow) termWindow.style.zIndex = '15';
  });

  // Drag jendela Settings (Desktop Only)
  if (settingsTitlebar && settingsWindow && osScreen && window.matchMedia('(min-width: 821px)').matches) {
    let dragSet = false;
    let setOffX = 0;
    let setOffY = 0;

    settingsTitlebar.addEventListener('mousedown', (e) => {
      if (e.target.closest('button')) return;
      dragSet = true;
      const rect = settingsWindow.getBoundingClientRect();
      setOffX = e.clientX - rect.left;
      setOffY = e.clientY - rect.top;
    });

    window.addEventListener('mousemove', (e) => {
      if (!dragSet) return;
      const screenRect = osScreen.getBoundingClientRect();
      let left = e.clientX - screenRect.left - setOffX;
      let top = e.clientY - screenRect.top - setOffY;
      left = Math.max(0, Math.min(left, screenRect.width - settingsWindow.offsetWidth));
      top = Math.max(0, Math.min(top, screenRect.height - settingsWindow.offsetHeight - 46));
      settingsWindow.style.left = `${left}px`;
      settingsWindow.style.top = `${top}px`;
    });

    window.addEventListener('mouseup', () => { dragSet = false; });
  }

  // Event Listeners tiap opsi Settings
  themeOpts.forEach(btn => {
    btn.addEventListener('click', () => {
      currentSettings.theme = btn.getAttribute('data-theme');
      applySettings(currentSettings);
    });
  });

  optSigils?.addEventListener('change', (e) => {
    currentSettings.sigils = e.target.checked;
    applySettings(currentSettings);
  });

  optOpacity?.addEventListener('input', (e) => {
    currentSettings.opacity = Number(e.target.value);
    applySettings(currentSettings);
  });

  optMotion?.addEventListener('change', (e) => {
    currentSettings.motion = e.target.checked;
    applySettings(currentSettings);
  });

  resetSettingsBtn?.addEventListener('click', () => {
    currentSettings = { ...defaultSettings };
    applySettings(currentSettings);
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