/* ╔══════════════════════════════════════════════════════════════╗
   ║  DAMITHRI'S 25TH — ULTRA PREMIUM ENGINE v8 (FULL ENHANCED) ║
   ╚══════════════════════════════════════════════════════════════╝ */

const CONFIG = {
    name: "Damithri",
    nickname: "Friend",
    age: 25,
    birthDate: "2001-02-14", // YYYY-MM-DD
    themeColors: {
        primary: '#00f2ea',
        secondary: '#ff0055',
        accent: '#ffd700',
        soft: '#ff4d9e',
        deep: '#b026ff'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // ─── CONSTANTS & CONFIG ───
    const C = CONFIG.themeColors.primary,
          R = CONFIG.themeColors.secondary,
          G = CONFIG.themeColors.accent,
          PK = CONFIG.themeColors.soft,
          PU = CONFIG.themeColors.deep;
    const COLS = [C, R, G, PK, PU, '#00ccff', '#ff6600', '#00ff9d', '#ff33a1'];

    // ─── DYNAMIC CONTENT INITIALIZATION ───
    const initContent = () => {
        document.querySelectorAll('.hero-name, .fin-name').forEach(el => el.textContent = CONFIG.name);
        document.querySelectorAll('.cake-l.ct span').forEach(el => el.textContent = CONFIG.name);
        document.querySelectorAll('.ht2').forEach(el => {
            el.innerHTML = `${CONFIG.age}<sup>th</sup>`;
            el.setAttribute('data-text', `${CONFIG.age}th`);
        });
        document.querySelectorAll('.age-ring span').forEach(el => el.textContent = CONFIG.age);

        const dateObj = new Date(CONFIG.birthDate);
        const month = dateObj.toLocaleString('default', { month: 'long' });
        const day = dateObj.getDate();
        document.querySelector('.badge.el').textContent = `✨ ${month} ${day}, ${new Date().getFullYear()} ✨`;
    };
    initContent();

    // ─── PARTICLE CURSOR TRAIL ───
    const initCursorTrail = () => {
        const canvas = document.createElement('canvas');
        canvas.id = 'cursor-trail';
        Object.assign(canvas.style, {
            position: 'fixed', inset: '0', pointerEvents: 'none', zIndex: '99999', mixBlendMode: 'screen'
        });
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let mouse = { x: -100, y: -100 };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            // Spawn particles
            for(let i=0; i<3; i++) {
                particles.push({
                    x: mouse.x, y: mouse.y,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    life: 1,
                    size: Math.random() * 3 + 1,
                    color: COLS[Math.floor(Math.random() * COLS.length)]
                });
            }
        });

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for(let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
                p.size *= 0.95;

                if(p.life <= 0) {
                    particles.splice(i, 1);
                    i--;
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            requestAnimationFrame(animate);
        };
        animate();
    };
    initCursorTrail();

    // ─── STAR FIELD CANVAS ───
    const initStarField = () => {
        const canvas = document.getElementById('stars-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h, stars = [];

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        for (let i = 0; i < 250; i++) {
            stars.push({
                x: Math.random() * w, y: Math.random() * h,
                r: Math.random() * 1.2 + 0.1,
                alpha: Math.random(),
                twinkle: Math.random() * 0.01 + 0.002,
                dir: Math.random() > 0.5 ? 1 : -1
            });
        }

        const drawStars = () => {
            ctx.clearRect(0, 0, w, h);
            stars.forEach(s => {
                s.alpha += s.twinkle * s.dir;
                if (s.alpha >= 1) { s.alpha = 1; s.dir = -1; }
                if (s.alpha <= 0.1) { s.alpha = 0.1; s.dir = 1; }

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
                ctx.fill();
            });
            requestAnimationFrame(drawStars);
        };
        drawStars();
    };
    initStarField();

    // ─── PARALLAX EFFECT ───
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        document.querySelectorAll('.orb').forEach((el, i) => {
            const factor = (i + 1) * 15;
            el.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });

        const heroName = document.querySelector('.hero-name');
        if(heroName) heroName.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    });

    // ─── SCROLL PROGRESS BAR ───
    const scrollProgress = document.getElementById('scroll-progress');
    const updateScrollProgress = (pageIdx, totalPages) => {
        if (!scrollProgress) return;
        const pct = ((pageIdx + 1) / totalPages) * 100;
        scrollProgress.style.width = pct + '%';
    };

    // ─── PRELOADER ───
    const initSignature = () => {
        const path = document.getElementById('sig-path');
        const penTip = document.getElementById('pen-tip');
        const preloader = document.getElementById('preloader');

        if (!path || !preloader) return;

        const len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;

        let start = null;
        const dur = 3000;

        const step = (ts) => {
            if (!start) start = ts;
            const prog = Math.min((ts - start) / dur, 1);
            const ease = 1 - Math.pow(1 - prog, 3);

            const currentOffset = len * (1 - ease);
            path.style.strokeDashoffset = currentOffset;

            if (penTip) {
                try {
                    const point = path.getPointAtLength(len * ease);
                    const svg = path.closest('svg');
                    const svgRect = svg.getBoundingClientRect();
                    const viewBox = svg.viewBox.baseVal;
                    const scaleX = svgRect.width / viewBox.width;
                    const scaleY = svgRect.height / viewBox.height;
                    penTip.style.left = (svgRect.left - svg.parentElement.getBoundingClientRect().left + point.x * scaleX) + 'px';
                    penTip.style.top = (svgRect.top - svg.parentElement.getBoundingClientRect().top + point.y * scaleY) + 'px';
                    penTip.style.opacity = prog < 0.95 ? 1 : 0;
                } catch (e) { }
            }

            const plBar = document.querySelector('.pl-bar');
            const plPct = document.getElementById('pl-pct');
            if (plBar) plBar.style.width = (ease * 100) + '%';
            if (plPct) plPct.textContent = Math.floor(ease * 100) + '%';

            if (prog < 1) {
                requestAnimationFrame(step);
            } else {
                setTimeout(() => {
                    preloader.classList.add('out');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        activatePage(0);
                    }, 800);
                }, 400);
            }
        };
        requestAnimationFrame(step);
    };

    window.addEventListener('load', () => { setTimeout(initSignature, 500); });

    // ─── AUDIO SYSTEM ───
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.25;
    masterGain.connect(audioCtx.destination);

    const playTone = (freq, type, dur) => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const t = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.frequency.setValueAtTime(freq, t);
        osc.type = type === 'sine' ? 'triangle' : type;
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(Math.min(22000, freq * 4), t);
        filter.frequency.exponentialRampToValueAtTime(Math.max(100, freq), t + dur);
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.exponentialRampToValueAtTime(0.4, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

        osc.connect(filter); filter.connect(gain); gain.connect(masterGain);
        osc.start(t); osc.stop(t + dur);
    };

    const playTick = () => playTone(800, 'sine', 0.05);
    const playChime = () => { playTone(600, 'sine', 1); setTimeout(() => playTone(800, 'sine', 1), 100); setTimeout(() => playTone(1200, 'sine', 1.5), 200); };
    const playPop = () => playTone(300, 'triangle', 0.1);
    const playWhoosh = () => playTone(200, 'sine', 0.15);

    const playBirthdayMelody = () => {
        const notes = [
            { f: 392, d: 0.4 }, { f: 392, d: 0.4 }, { f: 440, d: 0.8 }, { f: 392, d: 0.8 }, { f: 523, d: 0.8 }, { f: 494, d: 1.2 },
            { f: 392, d: 0.4 }, { f: 392, d: 0.4 }, { f: 440, d: 0.8 }, { f: 392, d: 0.8 }, { f: 587, d: 0.8 }, { f: 523, d: 1.2 },
            { f: 392, d: 0.4 }, { f: 392, d: 0.4 }, { f: 784, d: 0.8 }, { f: 659, d: 0.8 }, { f: 523, d: 0.8 }, { f: 494, d: 0.8 }, { f: 440, d: 0.8 },
            { f: 698, d: 0.4 }, { f: 698, d: 0.4 }, { f: 659, d: 0.8 }, { f: 523, d: 0.8 }, { f: 587, d: 0.8 }, { f: 523, d: 1.5 }
        ];
        let t = audioCtx.currentTime;
        notes.forEach(n => {
            playTone(n.f, 'sine', n.d * 0.3);
            t += n.d * 0.4;
            setTimeout(() => playTone(n.f, 'triangle', n.d * 0.2), (t - audioCtx.currentTime) * 1000);
        });
    };

    const audioBtn = document.getElementById('audio-btn');
    let melodyInterval = null;
    if (audioBtn) {
        audioBtn.addEventListener('click', () => {
            audioBtn.classList.toggle('on');
            if (audioBtn.classList.contains('on')) {
                if (audioCtx.state === 'suspended') audioCtx.resume();
                playBirthdayMelody();
                if (!melodyInterval) melodyInterval = setInterval(playBirthdayMelody, 9000);
            } else {
                if (melodyInterval) { clearInterval(melodyInterval); melodyInterval = null; }
                audioCtx.suspend();
            }
        });
    }

    // ─── CONFETTI PHYSICS ───
    const burstConfetti = (n) => {
        for (let i = 0; i < n; i++) {
            const c = document.createElement('div');
            c.className = 'confetti';
            const color = COLS[Math.floor(Math.random() * COLS.length)];
            const size = Math.random() * 8 + 4;
            const isCircle = Math.random() > 0.5;

            // Physics vars
            let x = window.innerWidth / 2;
            let y = window.innerHeight / 2;
            let vx = (Math.random() - 0.5) * 20;
            let vy = (Math.random() - 1) * 20 - 5;
            let gravity = 0.5;
            let rot = Math.random() * 360;
            let rotSpeed = (Math.random() - 0.5) * 10;

            Object.assign(c.style, {
                position: 'fixed', left: '0', top: '0',
                backgroundColor: color, width: size + 'px', height: isCircle ? size + 'px' : (size * 0.6) + 'px',
                borderRadius: isCircle ? '50%' : '2px', zIndex: '9999', pointerEvents: 'none',
                boxShadow: `0 0 ${size}px ${color}40`, opacity: 1, willChange: 'transform'
            });
            document.body.appendChild(c);

            const animate = () => {
                vy += gravity;
                x += vx;
                y += vy;
                rot += rotSpeed;

                c.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;

                if (y < window.innerHeight + 20) {
                    requestAnimationFrame(animate);
                } else {
                    c.remove();
                }
            };
            requestAnimationFrame(animate);
        }
    };
    const launchFW = (n) => burstConfetti(n * 5);

    // ─── PAGE TRIGGERS ───
    const onPageEnter = (i) => {
        const pg = document.querySelectorAll('.pg')[i];
        if (!pg) return;
        const id = pg.id;
        if (id === 'pg-bal') makeBalloons();
        if (id === 'pg-tw') goTW(0);
        if (id === 'pg-guest') loadGuestbook();
        if (id === 'pg-count') startCountdown();
        if (id === 'pg-tw') spawnFloatingDecos();
    };

    // ─── 3D TILT EFFECT ───
    const tiltCards = document.querySelectorAll('.glass, .cnt-card, .wish');
    const handleTilt = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    const resetTilt = (e) => { e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'; };
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });

    // ─── MAGNETIC BUTTONS ───
    const magBtns = document.querySelectorAll('.ui-btn, .cta, .dot');
    magBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0, 0) scale(1)'; });
    });

    // ─── HACKER TEXT ───
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const scrambleText = (el) => {
        if (el.dataset.animating === "true") return;
        el.dataset.animating = "true";
        const original = el.innerText;
        let iteration = 0;
        const interval = setInterval(() => {
            el.innerText = original.split("").map((letter, index) => {
                if (index < iteration) return original[index];
                return letters[Math.floor(Math.random() * 36)];
            }).join("");
            if (iteration >= original.length) { clearInterval(interval); el.dataset.animating = "false"; }
            iteration += 1 / 3;
        }, 30);
    };
    document.querySelectorAll('.sec-title, .badge').forEach(h => {
        h.addEventListener('mouseover', () => { if (h.children.length === 0) scrambleText(h); });
    });

    // ─── PAGE NAVIGATION ───
    const pages = document.querySelectorAll('.pg');
    const dots = document.querySelectorAll('.dot');
    const pgCur = document.getElementById('pg-cur');
    const arrUp = document.getElementById('arr-up');
    const arrDn = document.getElementById('arr-dn');
    let cur = 0, busy = false;

    const activatePage = (idx) => {
        if (idx < 0 || idx >= pages.length || busy) return;
        if (idx === cur && pages[cur].classList.contains('active')) return;
        busy = true; playWhoosh();

        const dir = idx > cur ? 'down' : 'up';
        const next = pages[idx];
        const current = pages[cur];

        if (current !== next) current.classList.add(dir === 'down' ? 'cube-out-up' : 'cube-out-down');
        next.classList.add(dir === 'down' ? 'cube-in-up' : 'cube-in-down');
        next.classList.add('active');

        setTimeout(() => {
            if (current !== next) current.classList.remove('active', 'cube-out-up', 'cube-out-down');
            next.classList.remove('cube-in-up', 'cube-in-down');
            cur = idx; busy = false;

            const els = next.querySelectorAll('.el');
            els.forEach((el, k) => {
                el.classList.remove('show');
                setTimeout(() => el.classList.add('show'), 80 + k * 80);
            });

            updateUI(cur); onPageEnter(cur); updateScrollProgress(cur, pages.length);
        }, 1200);
    };

    const updateUI = (c) => {
        if (pgCur) pgCur.textContent = String(c + 1).padStart(2, '0');
        dots.forEach((dot, j) => dot.classList.toggle('active', j === c));
        if (arrUp) arrUp.disabled = (c === 0);
        if (arrDn) arrDn.disabled = (c === pages.length - 1);
    };

    setTimeout(() => {
        const els = pages[0].querySelectorAll('.el');
        els.forEach((el, k) => setTimeout(() => el.classList.add('show'), 100 + k * 100));
        updateUI(0); updateScrollProgress(0, pages.length); playTick();
    }, 1000);

    let scrollCooldown = false;
    document.addEventListener('wheel', (e) => {
        if (scrollCooldown || busy) return;
        scrollCooldown = true;
        if (e.deltaY > 0 && cur < pages.length - 1) activatePage(cur + 1);
        else if (e.deltaY < 0 && cur > 0) activatePage(cur - 1);
        setTimeout(() => scrollCooldown = false, 1500);
    }, { passive: true });

    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
    document.addEventListener('touchend', (e) => {
        if (busy) return;
        const diff = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(diff) > 60) {
            if (diff > 0 && cur < pages.length - 1) activatePage(cur + 1);
            else if (diff < 0 && cur > 0) activatePage(cur - 1);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (busy) return;
        if (['ArrowDown', 'PageDown', ' '].includes(e.key) && cur < pages.length - 1) { e.preventDefault(); activatePage(cur + 1); }
        else if (['ArrowUp', 'PageUp'].includes(e.key) && cur > 0) { e.preventDefault(); activatePage(cur - 1); }
    });

    if (arrUp) arrUp.addEventListener('click', () => { if (cur > 0) activatePage(cur - 1); });
    if (arrDn) arrDn.addEventListener('click', () => { if (cur < pages.length - 1) activatePage(cur + 1); });
    dots.forEach(dot => { dot.addEventListener('click', () => { const p = parseInt(dot.dataset.p); if (p !== cur) activatePage(p); }); });
    const startBtn = document.getElementById('start-btn');
    if (startBtn) startBtn.addEventListener('click', () => activatePage(1));

    // ─── COUNTDOWN ───
    const startCountdown = () => {
        const birthDate = new Date(`${CONFIG.birthDate}T00:00:00`);
        const update = () => {
            const now = new Date();
            let years = now.getFullYear() - birthDate.getFullYear();
            let months = now.getMonth() - birthDate.getMonth();
            let days = now.getDate() - birthDate.getDate();
            let hours = now.getHours();
            if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
            if (months < 0) { years--; months += 12; }
            animNum('yr', years, 1500); animNum('mo', months, 1200); animNum('dy', days, 1000); animNum('hr', hours, 800);
        };
        update();
    };

    // ─── CAKE ───
    let blown = false;
    const blowCandles = () => {
        if (blown) return;
        blown = true; playChime();
        document.querySelectorAll('.flame').forEach((flame, i) => setTimeout(() => flame.classList.add('out'), i * 120));
        setTimeout(() => {
            const m = document.getElementById('cake-msg');
            if (m) { m.textContent = '🎉 Wish Granted! ⭐'; m.classList.add('ok'); }
            const mh = document.getElementById('mic-hint');
            if (mh) mh.style.opacity = '0';
            burstConfetti(120); launchFW(7);
        }, 700);
    };

    const micBtn = document.getElementById('mic-btn');
    if (micBtn) {
        micBtn.addEventListener('click', async () => {
            try {
                if (audioCtx.state === 'suspended') await audioCtx.resume();
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const microphone = audioCtx.createMediaStreamSource(stream);
                const analyser = audioCtx.createAnalyser();
                analyser.fftSize = 256;
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                microphone.connect(analyser);
                micBtn.innerHTML = '<span>🎤 Listening...</span>';
                micBtn.style.background = 'rgba(255, 0, 85, 0.2)'; micBtn.disabled = true;
                const detectBlow = () => {
                    if (blown) return;
                    analyser.getByteFrequencyData(dataArray);
                    let sum = 0; for(let i=0; i<dataArray.length; i++) sum += dataArray[i];
                    if (sum / dataArray.length > 45) blowCandles();
                    requestAnimationFrame(detectBlow);
                };
                detectBlow();
            } catch (err) { micBtn.innerHTML = '<span>⚠️ Error</span>'; }
        });
    }
    const blowBtn = document.getElementById('blow-btn');
    if (blowBtn) blowBtn.addEventListener('click', blowCandles);

    // ─── TYPEWRITER ───
    const twMessages = ["To my partner in crime... 🤫", "My 3AM therapist... 🌙", "Happy 25th Bestie! 💖", "Here's to bad ideas... 🤪", "And making them great stories! 📚", "Love you endlessly! 👯‍♀️"];
    const twEl = document.getElementById('tw-text');
    const twDots = document.getElementById('tw-dots');
    let twIdx = 0, twTimer = null;

    if (twDots) twMessages.forEach((_, i) => {
        const td = document.createElement('div');
        td.className = `tw-d ${i === 0 ? 'on' : ''}`;
        td.addEventListener('click', () => goTW(i));
        twDots.appendChild(td);
    });

    const typeWriter = (text) => {
        let ci = 0; if (twEl) twEl.textContent = ''; playTick();
        const next = () => {
            if (ci < text.length) { twEl.textContent += text[ci]; ci++; twTimer = setTimeout(next, 50); }
            else twTimer = setTimeout(() => goTW((twIdx + 1) % twMessages.length), 3000);
        };
        next();
    };
    const goTW = (i) => {
        clearTimeout(twTimer); twIdx = i;
        if (twDots) twDots.querySelectorAll('.tw-d').forEach((td, j) => td.classList.toggle('on', j === i));
        typeWriter(twMessages[i]);
    };

    // ─── FLOATING DECOS ───
    const spawnFloatingDecos = () => {
        const c = document.getElementById('float-deco');
        if (!c) return;
        c.innerHTML = '';
        ['💖', '✨', '🦋', '🌟', '💎'].forEach(e => {
            for(let i=0; i<3; i++) {
                const d = document.createElement('div');
                d.className = 'fd'; d.textContent = e;
                d.style.left = Math.random()*100+'%'; d.style.top = Math.random()*100+'%';
                d.style.animationDelay = Math.random()*5+'s'; d.style.animationDuration = 6+Math.random()*4+'s';
                c.appendChild(d);
            }
        });
    };

    // ─── GUESTBOOK ───
    const loadGuestbook = () => {
        const board = document.getElementById('gb-board');
        if (!board) return;
        board.innerHTML = '';
        const saved = JSON.parse(localStorage.getItem('guestbook') || '[]');
        if (saved.length === 0) saved.push({ msg: "Happy 25th! 🎉", date: new Date().toLocaleDateString() });
        saved.forEach((n, i) => addNoteToBoard(n.msg, n.date, i));
    };
    const addNoteToBoard = (msg, date, idx) => {
        const board = document.getElementById('gb-board');
        const div = document.createElement('div');
        div.className = 'gb-note';
        div.innerHTML = `<p>${msg}</p><span class="gb-date">${date}</span><button class="gb-del">×</button>`;
        div.querySelector('.gb-del').onclick = () => {
            const s = JSON.parse(localStorage.getItem('guestbook') || '[]');
            s.splice(idx, 1); localStorage.setItem('guestbook', JSON.stringify(s));
            loadGuestbook(); playPop();
        };
        if (board) board.prepend(div);
    };
    const gbBtn = document.getElementById('gb-btn');
    if (gbBtn) gbBtn.addEventListener('click', () => {
        const txt = document.getElementById('gb-msg');
        if (txt && txt.value.trim()) {
            const s = JSON.parse(localStorage.getItem('guestbook') || '[]');
            s.push({ msg: txt.value.trim(), date: new Date().toLocaleDateString() });
            localStorage.setItem('guestbook', JSON.stringify(s));
            loadGuestbook(); txt.value = ''; burstConfetti(30); playPop();
        }
    });

    // ─── 3D GALLERY ───
    const initGallery = () => {
        const gal = document.querySelector('.gallery-3d');
        if (!gal) return;
        const items = gal.querySelectorAll('.g3d-item');
        const radius = 350;
        items.forEach((item, i) => {
            const angle = (i / items.length) * 360;
            item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
            const img = item.querySelector('img');
            if (img) item.addEventListener('click', () => { if(!isDrag) { document.getElementById('lb-img').src=img.src; document.getElementById('lightbox').classList.remove('hidden'); playPop(); } });
        });

        let currDeg = 0, isDrag = false, startX = 0, prevDeg = 0;
        const cont = document.querySelector('.gallery-3d-container');
        if(cont) {
            cont.addEventListener('mousedown', (e) => { isDrag = true; startX = e.clientX; prevDeg = currDeg; gal.classList.add('grabbing'); });
            window.addEventListener('mousemove', (e) => { if(isDrag) { currDeg = prevDeg - (e.clientX - startX) * 0.5; gal.style.transform = `rotateX(-5deg) rotateY(${currDeg}deg)`; } });
            window.addEventListener('mouseup', () => { isDrag = false; gal.classList.remove('grabbing'); });
        }
        const autoRot = () => { if(!isDrag) { currDeg += 0.2; gal.style.transform = `rotateX(-5deg) rotateY(${currDeg}deg)`; } requestAnimationFrame(autoRot); };
        autoRot();
    };
    initGallery();
    document.getElementById('lb-close')?.addEventListener('click', () => document.getElementById('lightbox').classList.add('hidden'));

    // ─── BALLOONS ───
    const makeBalloons = () => {
        const arena = document.getElementById('b-arena');
        if(!arena) return;
        arena.innerHTML = '';
        let popCount = 0;
        const score = document.getElementById('b-sc');
        if(score) score.textContent = '0';
        document.getElementById('b-prize')?.classList.add('hidden');

        for(let i=0; i<15; i++) {
            const b = document.createElement('div');
            b.className = 'balloon';
            b.style.setProperty('--color', COLS[i % COLS.length]);
            b.style.animationDelay = Math.random() + 's';
            b.addEventListener('click', function() {
                if(this.classList.contains('pop')) return;
                this.classList.add('pop'); popCount++; playPop();
                if(score) score.textContent = popCount;
                burstConfetti(10);
                if(popCount === 15) { document.getElementById('b-prize').classList.remove('hidden'); playChime(); launchFW(10); }
            });
            arena.appendChild(b);
        }
    };

    // ─── PUZZLE ───
    const pzDrop = document.getElementById('pz-drop');
    let lp = false, rp = false;
    const checkWin = () => { if(lp && rp) { document.getElementById('full-h').classList.remove('hidden'); document.getElementById('pz-win').classList.remove('hidden'); burstConfetti(50); playChime(); } };

    ['lh', 'rh'].forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            el.addEventListener('dragstart', (e) => e.dataTransfer.setData('text', id));
            el.addEventListener('click', () => { // Mobile fallback
                if(id === 'lh' && !lp) { lp=true; el.style.opacity=0; playPop(); }
                if(id === 'rh' && !rp) { rp=true; el.style.opacity=0; playPop(); }
                checkWin();
            });
        }
    });
    if(pzDrop) {
        pzDrop.addEventListener('dragover', e => { e.preventDefault(); pzDrop.classList.add('over'); });
        pzDrop.addEventListener('dragleave', () => pzDrop.classList.remove('over'));
        pzDrop.addEventListener('drop', e => {
            e.preventDefault(); pzDrop.classList.remove('over');
            const id = e.dataTransfer.getData('text');
            if(id === 'lh' && !lp) { lp=true; document.getElementById('lh').style.opacity=0; playPop(); }
            if(id === 'rh' && !rp) { rp=true; document.getElementById('rh').style.opacity=0; playPop(); }
            checkWin();
        });
    }

    // ─── GIFT ───
    const giftBox = document.getElementById('gift-box');
    if(giftBox) giftBox.addEventListener('click', function() {
        if(this.classList.contains('open')) return;
        this.classList.add('open');
        document.getElementById('gift-lid').classList.add('open');
        playChime(); burstConfetti(100); launchFW(5);
        setTimeout(() => { document.getElementById('gift-w').style.display='none'; document.getElementById('gift-reveal').classList.remove('hidden'); }, 800);
    });

    // ─── WISHES ───
    const wishes = document.querySelectorAll('.wish');
    let curW = 0;
    const wDots = document.getElementById('w-dots');
    if(wDots) wishes.forEach((_, i) => {
        const d = document.createElement('div'); d.className = `wd ${i===0?'on':''}`;
        d.addEventListener('click', () => goWish(i)); wDots.appendChild(d);
    });
    const goWish = (i) => {
        wishes.forEach((w, idx) => {
            w.classList.remove('active', 'exit');
            if(idx === curW && idx !== i) w.classList.add('exit');
            if(idx === i) setTimeout(() => w.classList.add('active'), 50);
        });
        curW = i;
        if(wDots) wDots.querySelectorAll('.wd').forEach((d, idx) => d.classList.toggle('on', idx === i));
    };
    document.getElementById('w-prev')?.addEventListener('click', () => goWish((curW - 1 + wishes.length) % wishes.length));
    document.getElementById('w-next')?.addEventListener('click', () => goWish((curW + 1) % wishes.length));

    // ─── SCRATCH ───
    const sc = document.getElementById('scratch-c');
    if(sc) {
        const ctx = sc.getContext('2d');
        ctx.fillStyle = '#1a2a45'; ctx.fillRect(0,0,320,120);
        ctx.fillStyle = '#fff'; ctx.fillText('✨ Scratch Here ✨', 110, 65);
        let scratching = false;
        const scratch = (e) => {
            if(!scratching) return;
            const r = sc.getBoundingClientRect();
            const x = (e.touches?e.touches[0].clientX:e.clientX) - r.left;
            const y = (e.touches?e.touches[0].clientY:e.clientY) - r.top;
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI*2); ctx.fill();
        };
        ['mousedown', 'touchstart'].forEach(e => sc.addEventListener(e, () => scratching=true));
        ['mousemove', 'touchmove'].forEach(e => sc.addEventListener(e, scratch));
        ['mouseup', 'touchend'].forEach(e => window.addEventListener(e, () => scratching=false));
    }

    // ─── CERTIFICATE ───
    const sBtn = document.getElementById('sign-btn');
    if(sBtn) sBtn.addEventListener('click', () => {
        playChime(); burstConfetti(150); launchFW(8);
        sBtn.style.display = 'none';
        document.getElementById('cert-stamp').classList.add('stamped');
        localStorage.setItem('friend-signed', 'true');
    });
    if(localStorage.getItem('friend-signed')) { sBtn.style.display='none'; document.getElementById('cert-stamp').classList.add('stamped'); }

    // ─── MEGA BUTTON ───
    const mBtn = document.getElementById('mega-btn');
    if(mBtn) mBtn.addEventListener('click', () => {
        playChime(); launchFW(20); burstConfetti(300);
        mBtn.innerHTML = '<span>❤️ FRIENDS FOREVER ❤️</span>';
        mBtn.classList.add('celebrated');
    });

    console.log(`%c🚀 Damithri's 25th Premium Engine v8 Loaded!`, 'color:#00f2ea;font-weight:bold;font-size:14px;background:#000;padding:5px;');
});
