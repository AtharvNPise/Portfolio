/* ══════════════════════════════════════════════════
   ATHARV PISE PORTFOLIO — main.js  v4.0
══════════════════════════════════════════════════ */

/* ── 0. CINEMATIC INTRO SEQUENCE ── */
(function () {
  const overlay     = document.getElementById('intro-overlay');
  if (!overlay) return;

  document.body.classList.add('intro-active');

  const curtainTop  = overlay.querySelector('.curtain-top');
  const curtainBot  = overlay.querySelector('.curtain-bot');
  const termText    = document.getElementById('terminal-text');
  const tCursor     = document.getElementById('t-cursor');
  const nameWrap    = document.getElementById('intro-name-wrap');
  const glitchName  = document.getElementById('glitch-name');
  const ringOuter   = document.getElementById('ring-outer');
  const ringProg    = document.getElementById('ring-prog');
  const ringNum     = document.getElementById('ring-num');
  const ringStatus  = document.getElementById('ring-status');
  const tagsEl      = document.getElementById('intro-tags');

  // ─ AURORA CANVAS ──────────────────────────────
  const canvas = document.getElementById('intro-canvas');
  const ctx    = canvas.getContext('2d');
  let   aFrame;

  function resizeC() { canvas.width = innerWidth; canvas.height = innerHeight; }
  resizeC();
  window.addEventListener('resize', resizeC);

  const blobs = [
    { bx: 0.18, by: 0.28, r: 0.42, rgb: [124,111,255], phase: 0.0 },
    { bx: 0.82, by: 0.20, r: 0.36, rgb: [255,107,138], phase: 1.6 },
    { bx: 0.50, by: 0.82, r: 0.48, rgb: [ 45,212,191], phase: 3.1 },
    { bx: 0.10, by: 0.68, r: 0.30, rgb: [192,132,252], phase: 0.9 },
    { bx: 0.88, by: 0.72, r: 0.28, rgb: [ 56,189,248], phase: 2.3 },
  ];
  let tick = 0;

  function aurora() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#020510';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const t = tick * 0.006;
    blobs.forEach(b => {
      const x = (b.bx + Math.sin(t + b.phase)      * 0.09) * canvas.width;
      const y = (b.by + Math.cos(t * 0.7 + b.phase) * 0.09) * canvas.height;
      const r = b.r * Math.min(canvas.width, canvas.height);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${b.rgb},0.20)`);
      g.addColorStop(1, `rgba(${b.rgb},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
    tick++;
    aFrame = requestAnimationFrame(aurora);
  }
  aurora();

  // ─ PHASE 1: Curtains open ─────────────────────
  // Curtains start off-screen (already via CSS translateY(-100%)/translateY(100%))
  // They're already open by default in CSS — they slide IN only for the exit.
  // So no action needed here for entry.

  // ─ PHASE 2: Terminal typing (t=800ms) ─────────
  const BOOT_LINES = [
    'BOOT_SEQUENCE INITIATED…',
    'LOADING PORTFOLIO_SYSTEM v4.0',
  ];
  let lineIdx = 0, charIdx = 0;

  function typeNext() {
    if (lineIdx >= BOOT_LINES.length) {
      tCursor.style.display = 'none';
      setTimeout(revealName, 150);
      return;
    }
    const line = BOOT_LINES[lineIdx];
    if (charIdx < line.length) {
      termText.textContent = line.slice(0, ++charIdx);
      setTimeout(typeNext, 32);
    } else {
      setTimeout(() => {
        if (lineIdx + 1 < BOOT_LINES.length) {
          termText.textContent = '';
          charIdx = 0; lineIdx++;
          setTimeout(typeNext, 180);
        } else { lineIdx++; setTimeout(typeNext, 80); }
      }, 400);
    }
  }
  setTimeout(typeNext, 800);

  // ─ PHASE 3: Scramble name reveal ──────────────
  const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*!?/\\';
  const FINAL_NAME     = 'ATHARV PISE';

  function scrambleReveal() {
    const totalMs = 900, tickMs = 45;
    const totalTicks = totalMs / tickMs;
    let t = 0;
    glitchName.classList.add('go');
    const iv = setInterval(() => {
      const progress = t / totalTicks;
      glitchName.textContent = FINAL_NAME.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i / FINAL_NAME.length < progress) return ch;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join('');
      if (++t > totalTicks) {
        clearInterval(iv);
        glitchName.textContent = FINAL_NAME;
      }
    }, tickMs);
  }

  function revealName() {
    nameWrap.classList.add('visible');
    scrambleReveal();
    setTimeout(startLoader, 700);
  }

  // ─ PHASE 4: Ring loader ───────────────────────
  const CIRC = 2 * Math.PI * 56; // 351.86
  const STATUS_MSGS = [
    'Calibrating Systems…',
    'Mounting Experience Volumes…',
    'Compiling Skill Matrix…',
    'Resolving Infrastructure Nodes…',
    'Establishing Secure Session…',
    'Portfolio Ready.',
  ];

  function startLoader() {
    ringOuter.classList.add('visible');
    tagsEl.classList.add('visible');
    ringProg.style.strokeDasharray  = CIRC;
    ringProg.style.strokeDashoffset = CIRC;

    let progress  = 0;
    const TOTAL   = 2000, TICK = 28;
    const BASE    = (TICK / TOTAL) * 100;
    let   msgIdx  = 0;

    const iv = setInterval(() => {
      progress = Math.min(progress + BASE + Math.random() * BASE * 0.5, 100);
      ringProg.style.strokeDashoffset = CIRC * (1 - progress / 100);
      ringNum.textContent = Math.floor(progress);

      const newMsgIdx = Math.min(Math.floor((progress / 100) * STATUS_MSGS.length),
                                  STATUS_MSGS.length - 1);
      if (newMsgIdx !== msgIdx) {
        msgIdx = newMsgIdx;
        ringStatus.textContent = STATUS_MSGS[msgIdx];
      }

      if (progress >= 100) {
        clearInterval(iv);
        ringNum.textContent = '100';
        ringStatus.textContent = 'Portfolio Ready.';
        setTimeout(exitIntro, 380);
      }
    }, TICK);
  }

  // ─ PHASE 5: Curtain slam + fade ───────────────
  function exitIntro() {
    curtainTop.classList.add('slam');
    curtainBot.classList.add('slam');
    setTimeout(() => {
      overlay.classList.add('hide');
      document.body.classList.remove('intro-active');
      cancelAnimationFrame(aFrame);
      setTimeout(() => overlay.remove(), 1000);
    }, 560);
  }
})();


/* ── 1. CANVAS PARTICLE NETWORK ── */
(function () {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  document.getElementById('particles').appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const colors = [
    'rgba(124,111,255,', 'rgba(255,107,138,',
    'rgba(45,212,191,',  'rgba(56,189,248,',
    'rgba(192,132,252,'
  ];
  let pts = [];

  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  function spawn() {
    return {
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      vx: (Math.random() - .5) * .38, vy: (Math.random() - .5) * .38,
      r: Math.random() * 2 + .4,
      c: colors[Math.floor(Math.random() * colors.length)],
      o: Math.random() * .45 + .08
    };
  }

  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 75; i++) pts.push(spawn());

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;  if (p.x > canvas.width)  p.x = 0;
      if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c + p.o + ')';
      ctx.fill();
    });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 115) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = 'rgba(124,111,255,' + (0.07 * (1 - d / 115)) + ')';
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();


/* ── 2. SCROLL FADE-IN ── */
const fadeEls = document.querySelectorAll('.fade-in');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: .10 });

// Immediately show elements already in viewport on load
function initFade() {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      io.observe(el);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFade);
} else {
  initFade();
}


/* ── 3. NAVBAR scroll + active link ── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('#nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});


/* ── 4. HAMBURGER / DRAWER ── */
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('mobile-drawer');

hamburger.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

document.addEventListener('click', e => {
  if (drawer && !hamburger.contains(e.target) && !drawer.contains(e.target)) {
    drawer.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  }
});

function closeDrawer() {
  drawer.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', false);
}
window.closeDrawer = closeDrawer;


/* ── 5. TYPEWRITER EFFECT ── */
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const lines = [
    'HPC Cluster Specialist',
    'Data Center Engineer',
    'Linux & Automation Expert',
    'OpenStack Cloud Engineer',
    'Ansible Infrastructure Dev'
  ];
  let li = 0, ci = 0, deleting = false;
  const cursor = document.getElementById('tw-cursor');

  function tick() {
    const word = lines[li];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(tick, 1800); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; li = (li + 1) % lines.length; }
    }
    setTimeout(tick, deleting ? 48 : 72);
  }
  setTimeout(tick, 600);
})();


/* ── 6. CONTACT FORM ── */
function sendMail(e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim() || 'Portfolio Enquiry';
  const message = document.getElementById('message').value.trim();
  const msgEl   = document.getElementById('form-msg');
  const btn     = document.getElementById('mail-link');

  msgEl.style.display = 'none';

  if (!name || !email || !message) {
    msgEl.style.display = 'block';
    msgEl.style.color   = '#f87171';
    msgEl.style.background = 'rgba(248,113,113,0.08)';
    msgEl.style.borderColor = 'rgba(248,113,113,0.25)';
    msgEl.innerHTML = '⚠️ Please fill in your Name, Email and Message.';
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msgEl.style.display = 'block';
    msgEl.style.color   = '#f87171';
    msgEl.style.background = 'rgba(248,113,113,0.08)';
    msgEl.style.borderColor = 'rgba(248,113,113,0.25)';
    msgEl.innerHTML = '⚠️ Please enter a valid email address.';
    return false;
  }

  const body =
    'Hi Atharv,' +
    '\n\nMy name is ' + name + '.' +
    '\nMy email: ' + email +
    '\n\n' + message +
    '\n\n---\nSent via portfolio contact form.';

  const mailtoURL =
    'mailto:atharv.spise@gmail.com' +
    '?subject=' + encodeURIComponent(subject) +
    '&body='    + encodeURIComponent(body);

  btn.href = mailtoURL;

  btn.style.background = 'linear-gradient(135deg,#10b981,#34d399)';
  btn.style.boxShadow  = '0 0 32px rgba(16,185,129,0.5)';
  btn.innerHTML        = '✅ Email App Opening...';

  msgEl.style.display    = 'block';
  msgEl.style.color      = '#2DD4BF';
  msgEl.style.background = 'rgba(45,212,191,0.07)';
  msgEl.style.borderColor= 'rgba(45,212,191,0.22)';
  msgEl.innerHTML =
    '📬 <strong>Your email app is opening</strong> with the message pre-filled.<br/>' +
    'Just click <strong>Send</strong> in your email app — it goes straight to Atharv\'s inbox.<br/>' +
    '<span style="opacity:.65;font-size:.85em;">Using Gmail? Make sure Gmail is set as your default mail app.</span>';

  return true;
}
window.sendMail = sendMail;


/* ── 7. SMOOTH BACK TO TOP ── */
document.querySelector('.footer-top')?.addEventListener('click', e => {
  e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });
});
