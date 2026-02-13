/* ╔══════════════════════════════════════════════════════════════╗
   ║  DAMITHRI'S 25TH — ULTRA PREMIUM ENGINE v7 (FULL ENHANCED) ║
   ╚══════════════════════════════════════════════════════════════╝ */

const CONFIG = {
    name: "Damithri",
    nickname: "Friend",
    age: 25,
    birthDate: "2001-02-14", // YYYY-MM-DD
    themeColors: {
        primary: '#00FFDE',
        secondary: '#FF0055',
        accent: '#FFD700',
        soft: '#FF69B4',
        deep: '#A855F7'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // ─── CONSTANTS & CONFIG ───
    const C = CONFIG.themeColors.primary,
          R = CONFIG.themeColors.secondary,
          G = CONFIG.themeColors.accent,
          PK = CONFIG.themeColors.soft,
          PU = CONFIG.themeColors.deep;
    const COLS = [C, R, G, PK, PU, '#00CCFF', '#FF6600', '#33FF88', '#FF33A1'];

    // ─── DYNAMIC CONTENT INITIALIZATION ───
    const initContent = () => {
        // Update Name
        document.querySelectorAll('.hero-name, .fin-name').forEach(el => el.textContent = CONFIG.name);
        document.querySelectorAll('.cake-l.ct span').forEach(el => el.textContent = CONFIG.name);

        // Update Age
        document.querySelectorAll('.ht2').forEach(el => {
            el.innerHTML = `${CONFIG.age}<sup>th</sup>`;
            el.setAttribute('data-text', `${CONFIG.age}th`);
        });
        document.querySelectorAll('.age-ring span').forEach(el => el.textContent = CONFIG.age);

        // Update Date Badge
        const dateObj = new Date(CONFIG.birthDate);
        const month = dateObj.toLocaleString('default', { month: 'long' });
        const day = dateObj.getDate();
        document.querySelector('.badge.el').textContent = `✨ ${month} ${day}, ${new Date().getFullYear()} ✨`;

        // Update Countdown Target
        // (Handled in startCountdown, but we need to pass the date)
    };
    initContent();

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

        // Create stars
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.5 + 0.3,
                alpha: Math.random(),
                twinkle: Math.random() * 0.02 + 0.005,
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
                ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * 0.8})`;
                ctx.fill();

                // Star glow
                if (s.r > 1) {
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${CONFIG.themeColors.primary === '#00FFDE' ? '0, 255, 222' : '255, 255, 255'}, ${s.alpha * 0.15})`;
                    ctx.fill();
                }
            });
            requestAnimationFrame(drawStars);
        };
        drawStars();
    };
    initStarField();

    // ─── CURSOR GLOW FOLLOWER ───
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        let mouseX = 0, mouseY = 0;
        let ticking = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    cursorGlow.style.left = mouseX + 'px';
                    cursorGlow.style.top = mouseY + 'px';
                    cursorGlow.style.opacity = '1';
                    ticking = false;
                });
                ticking = true;
            }
        });
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }

    // ─── SCROLL PROGRESS BAR ───
    const scrollProgress = document.getElementById('scroll-progress');
    const updateScrollProgress = (pageIdx, totalPages) => {
        if (!scrollProgress) return;
        const pct = ((pageIdx + 1) / totalPages) * 100;
        scrollProgress.style.width = pct + '%';
    };

    // ─── PRELOADER: SIGNATURE ANIMATION ───
    const initSignature = () => {
        const path = document.getElementById('sig-path');
        const penTip = document.getElementById('pen-tip');
        const preloader = document.getElementById('preloader');

        if (!path || !preloader) return;

        const len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;

        let start = null;
        const dur = 3500;

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
                    }, 1000);
                }, 500);
            }
        };

        requestAnimationFrame(step);
    };

    window.addEventListener('load', () => {
        setTimeout(initSignature, 500);
    });

    // ─── AUDIO SYSTEM ───
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(audioCtx.destination);

    const playTone = (freq, type, dur) => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const t = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.frequency.setValueAtTime(freq, t);
        osc.type = type === 'sine' ? 'triangle' : type; // Enrich sine waves

        // Lowpass filter to soften the harsh edges
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(Math.min(22000, freq * 4), t);
        filter.frequency.exponentialRampToValueAtTime(Math.max(100, freq), t + dur);

        // ADSR Envelope (Attack, Decay, Sustain, Release)
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.exponentialRampToValueAtTime(0.4, t + 0.04); // Attack
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur); // Release

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start(t);
        osc.stop(t + dur);
    };

    const playTick = () => playTone(800, 'sine', 0.05);
    const playChime = () => {
        playTone(600, 'sine', 1);
        setTimeout(() => playTone(800, 'sine', 1), 100);
        setTimeout(() => playTone(1200, 'sine', 1.5), 200);
    };
    const playPop = () => playTone(300, 'triangle', 0.1);
    const playWhoosh = () => playTone(200, 'sine', 0.15);

    // HAPPY BIRTHDAY MELODY
    const playBirthdayMelody = () => {
        const notes = [
            { f: 392, d: 0.4 }, { f: 392, d: 0.4 }, { f: 440, d: 0.8 }, { f: 392, d: 0.8 }, { f: 523, d: 0.8 }, { f: 494, d: 1.2 },
            { f: 392, d: 0.4 }, { f: 392, d: 0.4 }, { f: 440, d: 0.8 }, { f: 392, d: 0.8 }, { f: 587, d: 0.8 }, { f: 523, d: 1.2 },
            { f: 392, d: 0.4 }, { f: 392, d: 0.4 }, { f: 784, d: 0.8 }, { f: 659, d: 0.8 }, { f: 523, d: 0.8 }, { f: 494, d: 0.8 }, { f: 440, d: 0.8 },
            { f: 698, d: 0.4 }, { f: 698, d: 0.4 }, { f: 659, d: 0.8 }, { f: 523, d: 0.8 }, { f: 587, d: 0.8 }, { f: 523, d: 1.5 }
        ];
        let t = audioCtx.currentTime;
        notes.forEach(n => {
            playTone(n.f, 'sine', n.d * 0.3); // Shorten duration for staccato feel
            t += n.d * 0.4;
            setTimeout(() => playTone(n.f, 'triangle', n.d * 0.2), (t - audioCtx.currentTime) * 1000); // Layered sound
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
                if (!melodyInterval) {
                    melodyInterval = setInterval(playBirthdayMelody, 9000); // Loop approx
                }
            } else {
                if (melodyInterval) {
                    clearInterval(melodyInterval);
                    melodyInterval = null;
                }
                audioCtx.suspend();
            }
        });
    }

    // ─── CONFETTI SYSTEM (PHYSICS-ENHANCED) ───
    const burstConfetti = (n) => {
        for (let i = 0; i < n; i++) {
            const c = document.createElement('div');
            c.className = 'confetti';
            const color = COLS[Math.floor(Math.random() * COLS.length)];
            const size = Math.random() * 8 + 4;
            const isCircle = Math.random() > 0.5;
            Object.assign(c.style, {
                left: '50%', top: '50%',
                backgroundColor: color,
                width: size + 'px',
                height: isCircle ? size + 'px' : (size * 0.6) + 'px',
                borderRadius: isCircle ? '50%' : '2px',
                position: 'fixed', zIndex: '9999',
                transition: `all ${0.8 + Math.random() * 0.6}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                boxShadow: `0 0 ${size}px ${color}40`
            });
            document.body.appendChild(c);

            const x = (Math.random() - 0.5) * window.innerWidth * 1.2;
            const y = (Math.random() - 1.2) * window.innerHeight;
            const rot = Math.random() * 1080;

            requestAnimationFrame(() => {
                c.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
                c.style.opacity = 0;
            });
            setTimeout(() => c.remove(), 1500);
        }
    };
    const launchFW = (n) => burstConfetti(n * 3);

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
    const tiltCards = document.querySelectorAll('.glass, .cnt-card');

    const handleTilt = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const resetTilt = (e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

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
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // ─── AMBIENT LIFE: SHOOTING STARS ───
    const spawnShootingStar = () => {
        const s = document.createElement('div');
        s.className = 'shooting-star';
        s.style.top = Math.random() * 40 + '%';
        s.style.left = Math.random() * 90 + '%';
        s.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 4000);
    };
    setInterval(spawnShootingStar, 3000);

    // ─── INTERACTIVE TYPOGRAPHY: HACKER TEXT ───
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const scrambleText = (el) => {
        if (el.dataset.animating === "true") return;
        el.dataset.animating = "true";
        const original = el.innerText;
        let iteration = 0;
        const interval = setInterval(() => {
            el.innerText = original
                .split("")
                .map((letter, index) => {
                    if (index < iteration) return original[index];
                    return letters[Math.floor(Math.random() * 36)];
                })
                .join("");

            if (iteration >= original.length) {
                clearInterval(interval);
                el.dataset.animating = "false";
            }
            iteration += 1 / 3;
        }, 30);
    };

    document.querySelectorAll('.sec-title, .badge').forEach(h => {
        h.addEventListener('mouseover', () => {
            if (h.children.length === 0) scrambleText(h);
        });
    });

    // ─── PAGE NAVIGATION (CINEMATIC CUBE) ───
    const pages = document.querySelectorAll('.pg');
    const dots = document.querySelectorAll('.dot');
    const pgCur = document.getElementById('pg-cur');
    const arrUp = document.getElementById('arr-up');
    const arrDn = document.getElementById('arr-dn');
    let cur = 0;
    let busy = false;

    const activatePage = (idx) => {
        if (idx < 0 || idx >= pages.length || busy) return;
        if (idx === cur && pages[cur].classList.contains('active')) return;
        busy = true;
        playWhoosh();

        const dir = idx > cur ? 'down' : 'up';
        const next = pages[idx];
        const current = pages[cur];

        // Apply animation classes
        if (current !== next) {
            current.classList.add(dir === 'down' ? 'cube-out-up' : 'cube-out-down');
        }
        next.classList.add(dir === 'down' ? 'cube-in-up' : 'cube-in-down');
        next.classList.add('active');

        setTimeout(() => {
            if (current !== next) {
                current.classList.remove('active', 'cube-out-up', 'cube-out-down');
            }
            next.classList.remove('cube-in-up', 'cube-in-down');

            cur = idx;
            busy = false;

            // Stagger entrance animations
            const els = next.querySelectorAll('.el');
            els.forEach((el, k) => {
                el.classList.remove('show');
                setTimeout(() => el.classList.add('show'), 80 + k * 90);
            });

            updateUI(cur);
            onPageEnter(cur);
            updateScrollProgress(cur, pages.length);
        }, 1200);
    };

    const updateUI = (c) => {
        if (pgCur) pgCur.textContent = String(c + 1).padStart(2, '0');
        dots.forEach((dot, j) => {
            dot.classList.toggle('active', j === c);
        });
        if (arrUp) arrUp.disabled = (c === 0);
        if (arrDn) arrDn.disabled = (c === pages.length - 1);
    };

    // Initial page activation
    setTimeout(() => {
        const els = pages[0].querySelectorAll('.el');
        els.forEach((el, k) => setTimeout(() => el.classList.add('show'), 100 + k * 100));
        updateUI(0);
        updateScrollProgress(0, pages.length);
        playTick();
    }, 1000);

    // Scroll / Wheel Navigation
    let scrollCooldown = false;
    document.addEventListener('wheel', (e) => {
        if (scrollCooldown || busy) return;
        scrollCooldown = true;
        if (e.deltaY > 0 && cur < pages.length - 1) activatePage(cur + 1);
        else if (e.deltaY < 0 && cur > 0) activatePage(cur - 1);
        setTimeout(() => scrollCooldown = false, 1500);
    }, { passive: true });

    // Touch Navigation
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

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (busy) return;
        if (['ArrowDown', 'PageDown', ' '].includes(e.key) && cur < pages.length - 1) {
            e.preventDefault(); activatePage(cur + 1);
        } else if (['ArrowUp', 'PageUp'].includes(e.key) && cur > 0) {
            e.preventDefault(); activatePage(cur - 1);
        }
    });

    // Arrow Buttons
    if (arrUp) arrUp.addEventListener('click', () => { if (cur > 0) activatePage(cur - 1); });
    if (arrDn) arrDn.addEventListener('click', () => { if (cur < pages.length - 1) activatePage(cur + 1); });

    // Dot Navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const p = parseInt(dot.dataset.p);
            if (p !== cur) activatePage(p);
        });
    });

    // Start Button
    const startBtn = document.getElementById('start-btn');
    if (startBtn) startBtn.addEventListener('click', () => activatePage(1));

    // ─── LIVE COUNTDOWN ───
    const startCountdown = () => {
        const birthDate = new Date(`${CONFIG.birthDate}T00:00:00`);
        const update = () => {
            const now = new Date();
            let years = now.getFullYear() - birthDate.getFullYear();
            let months = now.getMonth() - birthDate.getMonth();
            let days = now.getDate() - birthDate.getDate();
            let hours = now.getHours();

            if (days < 0) {
                months--;
                days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            animNum('yr', years, 1500);
            animNum('mo', months, 1200);
            animNum('dy', days, 1000);
            animNum('hr', hours, 800);
        };
        update();
    };

    // ─── CAKE ───
    let blown = false;
    const blowCandles = () => {
        if (blown) return;
        blown = true;
        playChime();
        const flames = document.querySelectorAll('.flame');
        flames.forEach((flame, i) => setTimeout(() => flame.classList.add('out'), i * 120));

        setTimeout(() => {
            const m = document.getElementById('cake-msg');
            if (m) {
                m.textContent = '🎉 Your wish is commanded to the stars! ⭐';
                m.classList.add('ok');
            }
            const mh = document.getElementById('mic-hint');
            if (mh) mh.style.opacity = '0';

            burstConfetti(120);
            launchFW(7);
        }, 700);
    };

    // Microphone Logic
    const initMicrophone = async () => {
        try {
            if (audioCtx.state === 'suspended') await audioCtx.resume();
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const microphone = audioCtx.createMediaStreamSource(stream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            microphone.connect(analyser);

            const micBtn = document.getElementById('mic-btn');
            if (micBtn) {
                micBtn.innerHTML = '<span>🎤 Listening... Blow!</span>';
                micBtn.style.background = 'rgba(255, 0, 85, 0.2)';
                micBtn.disabled = true;
            }

            const detectBlow = () => {
                if (blown) return;
                analyser.getByteFrequencyData(dataArray);
                let sum = 0;
                for(let i = 0; i < bufferLength; i++) {
                    sum += dataArray[i];
                }
                const average = sum / bufferLength;

                // Threshold for blowing
                if (average > 45) {
                    blowCandles();
                }
                requestAnimationFrame(detectBlow);
            };
            detectBlow();
        } catch (err) {
            console.error('Microphone error:', err);
            const micBtn = document.getElementById('mic-btn');
            if (micBtn) micBtn.innerHTML = '<span>⚠️ Mic Blocked</span>';
        }
    };

    const micBtn = document.getElementById('mic-btn');
    if (micBtn) micBtn.addEventListener('click', initMicrophone);

    const blowBtn = document.getElementById('blow-btn');
    if (blowBtn) blowBtn.addEventListener('click', blowCandles);
    document.addEventListener('keydown', (e) => {
        if (pages[cur] && pages[cur].id === 'pg-cake' && !blown) {
            if (!['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '].includes(e.key)) blowCandles();
        }
    });

    // ─── TYPEWRITER (ENHANCED) ───
    const twMessages = [
        "To the one who knows all my secrets... 🤫",
        "And still chooses to be seen in public with me! 💖",
        "Happy 25th to my ride or die! 🏍️",
        "Here's to a lifetime of questionable decisions... 🤪",
        "And memories we'll never tell our kids! 🤐",
        "You are my favorite notification! 📱",
        "Love you more than pizza (and that's a lot) 🍕",
        "Forever and always, my best friend. 👯‍♀️"
    ];
    const twEl = document.getElementById('tw-text');
    const twDots = document.getElementById('tw-dots');
    let twIdx = 0, twTimer = null;

    if (twDots) {
        twMessages.forEach((_, tdi) => {
            const td = document.createElement('div');
            td.className = `tw-d ${tdi === 0 ? 'on' : ''}`;
            td.addEventListener('click', () => goTW(tdi));
            twDots.appendChild(td);
        });
    }

    const typeWriter = (text) => {
        let ci = 0;
        if (twEl) twEl.textContent = '';
        playTick();
        const next = () => {
            if (ci < text.length) {
                twEl.textContent += text[ci]; ci++;
                twTimer = setTimeout(next, 40 + Math.random() * 25);
            } else {
                twTimer = setTimeout(() => goTW((twIdx + 1) % twMessages.length), 3500);
            }
        };
        next();
    };

    const goTW = (i) => {
        clearTimeout(twTimer);
        twIdx = i;
        if (twDots) {
            const tds = twDots.querySelectorAll('.tw-d');
            tds.forEach((td, j) => td.classList.toggle('on', j === i));
        }
        typeWriter(twMessages[i]);
    };

    // ─── FLOATING EMOJI DECORATIONS ───
    const spawnFloatingDecos = () => {
        const container = document.getElementById('float-deco');
        if (!container) return;
        container.innerHTML = '';
        const emojis = ['💖', '✨', '🦋', '🌟', '💕', '🌸', '💎'];
        for (let i = 0; i < 12; i++) {
            const d = document.createElement('div');
            d.className = 'fd';
            d.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            d.style.left = Math.random() * 100 + '%';
            d.style.top = Math.random() * 100 + '%';
            d.style.animationDelay = (Math.random() * 5) + 's';
            d.style.animationDuration = (6 + Math.random() * 4) + 's';
            d.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
            container.appendChild(d);
        }
    };

    // ─── GUESTBOOK ───
    const loadGuestbook = () => {
        const board = document.getElementById('gb-board');
        if (!board) return;
        board.innerHTML = '';
        const saved = JSON.parse(localStorage.getItem('guestbook') || '[]');
        if (saved.length === 0) {
            saved.push({ msg: "Happy 25th! This is the start of something amazing! 🎉", date: new Date().toLocaleDateString() });
        }
        saved.forEach((n, i) => addNoteToBoard(n.msg, n.date, i));
    };

    const deleteNote = (idx) => {
        const saved = JSON.parse(localStorage.getItem('guestbook') || '[]');
        if (idx > -1 && idx < saved.length) {
            saved.splice(idx, 1);
            localStorage.setItem('guestbook', JSON.stringify(saved));
            loadGuestbook();
            playPop();
        }
    };

    const addNoteToBoard = (msg, date, idx) => {
        const board = document.getElementById('gb-board');
        const div = document.createElement('div');
        div.className = 'gb-note';
        div.innerHTML = `<p>${msg}</p><span class="gb-date">${date}</span><button class="gb-del" aria-label="Delete Note">×</button>`;

        // Attach event listener directly to avoid global scope issues
        const delBtn = div.querySelector('.gb-del');
        delBtn.onclick = () => deleteNote(idx);

        if (board) board.prepend(div);
    };

    const gbBtn = document.getElementById('gb-btn');
    if (gbBtn) {
        gbBtn.addEventListener('click', () => {
            const txt = document.getElementById('gb-msg');
            if (txt && txt.value.trim()) {
                const note = { msg: txt.value.trim(), date: new Date().toLocaleDateString() };
                const saved = JSON.parse(localStorage.getItem('guestbook') || '[]');
                saved.push(note);
                localStorage.setItem('guestbook', JSON.stringify(saved));
                loadGuestbook(); // Reload to update indices
                txt.value = '';
                burstConfetti(25);
                playPop();
            }
        });
    }

    // ─── 3D GALLERY & LIGHTBOX ───
    const initGallery = () => {
        const gal = document.querySelector('.gallery-3d');
        if (!gal) return;

        const items = gal.querySelectorAll('.g3d-item');
        const count = items.length;
        const radius = 350;

        items.forEach((item, i) => {
            const angle = (i / count) * 360;
            item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

            // Lightbox Trigger
            const img = item.querySelector('img');
            if (img) {
                item.addEventListener('click', (e) => {
                    // Only open if not dragging
                    if (!isDrag) openLightbox(img.src);
                });
            }
        });

        // Lightbox Logic
        const lb = document.getElementById('lightbox');
        const lbImg = document.getElementById('lb-img');
        const lbClose = document.getElementById('lb-close');

        const openLightbox = (src) => {
            if (!lb || !lbImg) return;
            lbImg.src = src;
            lb.classList.remove('hidden');
            playPop();
        };

        if (lbClose) lbClose.addEventListener('click', () => lb.classList.add('hidden'));
        if (lb) lb.addEventListener('click', (e) => { if(e.target === lb) lb.classList.add('hidden'); });

        let currDeg = 0, isDrag = false, startX = 0, prevDeg = 0, autoRot = true;

        const container = document.querySelector('.gallery-3d-container');

        if (container) {
            // Touch Action Hack
            container.style.touchAction = 'none';

            container.addEventListener('mousedown', (e) => {
                isDrag = true; autoRot = false;
                startX = e.clientX; prevDeg = currDeg;
                gal.classList.add('grabbing');
            });
            window.addEventListener('mousemove', (e) => {
                if (!isDrag) return;
                currDeg = prevDeg - (e.clientX - startX) * 0.5;
                gal.style.transform = `rotateX(-5deg) rotateY(${currDeg}deg)`;
            });
            window.addEventListener('mouseup', () => {
                isDrag = false;
                gal.classList.remove('grabbing');
                setTimeout(() => autoRot = true, 3000);
            });

            // Touch support
            container.addEventListener('touchstart', (e) => {
                isDrag = true; autoRot = false;
                startX = e.touches[0].clientX; prevDeg = currDeg;
            });
            window.addEventListener('touchmove', (e) => {
                if (!isDrag) return;
                currDeg = prevDeg - (e.touches[0].clientX - startX) * 0.5;
                gal.style.transform = `rotateX(-5deg) rotateY(${currDeg}deg)`;
            });
            window.addEventListener('touchend', () => {
                isDrag = false;
                setTimeout(() => autoRot = true, 3000);
            });
        }

        const loop = () => {
            if (autoRot && !isDrag) {
                currDeg += 0.15;
                gal.style.transform = `rotateX(-5deg) rotateY(${currDeg}deg)`;
            }
            requestAnimationFrame(loop);
        };
        loop();
    };
    initGallery();

    // ─── EMOJI RAIN ───
    const emojiRain = () => {
        const emojis = ['🎂', '🎁', '🎈', '🎊', '🎉', '💖', '🌟', '✨', '🦋', '🌹', '💎'];
        let count = 0;
        const int = setInterval(() => {
            if (count >= 25) { clearInterval(int); return; }
            const e = document.createElement('div');
            e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            e.className = 'confetti';
            e.style.cssText = `position:fixed;left:${Math.random() * 100}vw;top:-22px;font-size:${15 + Math.random() * 16}px;pointer-events:none;z-index:10001;opacity:.65;background:none;`;
            e.style.animationDuration = `${3 + Math.random() * 2.5}s`;
            document.body.appendChild(e);
            setTimeout(() => e.remove(), 5500);
            count++;
        }, 140);
    };

    // ─── BALLOONS ───
    const bArena = document.getElementById('b-arena');
    const bScore = document.getElementById('b-sc');
    const bPrize = document.getElementById('b-prize');
    const bTexts = ['Friend!', 'Love!', 'Joy!', '25!', 'Gift!', 'Hugs!', 'Pizza!', 'Travel!', 'Laughs!', 'Secrets!', 'Party!', 'Dreams!', 'Shine!', 'Win!', 'Forever!'];
    let popCount = 0;

    const makeBalloons = () => {
        if (!bArena) return;
        bArena.innerHTML = '';
        popCount = 0;
        if (bScore) bScore.textContent = '0';
        if (bPrize) bPrize.classList.add('hidden');

        for (let i = 0; i < 15; i++) {
            const b = document.createElement('div');
            b.className = 'balloon';
            const c = COLS[i % COLS.length];
            b.style.background = `radial-gradient(circle at 30% 20%, rgba(255,255,255,.4), ${c} 60%)`;
            b.style.animationDelay = `${Math.random() * 2}s`;
            b.style.animationDuration = `${3 + Math.random() * 2}s`;

            b.addEventListener('click', function () {
                if (this.classList.contains('pop')) return;
                this.classList.add('pop');
                popCount++;
                playPop();
                if (bScore) bScore.textContent = popCount;

                const msg = document.createElement('div');
                msg.textContent = bTexts[i];
                msg.style.cssText = `position:absolute;left:${this.offsetLeft}px;top:${this.offsetTop - 12}px;font-size:.85rem;color:${C};pointer-events:none;transition:all .7s ease;font-weight:700;white-space:nowrap;z-index:99;`;
                bArena.appendChild(msg);
                setTimeout(() => { msg.style.transform = 'translateY(-35px)'; msg.style.opacity = '0'; }, 10);
                setTimeout(() => msg.remove(), 750);

                burstConfetti(6);
                if (popCount >= 15) {
                    setTimeout(() => {
                        if (bPrize) bPrize.classList.remove('hidden');
                        playChime(); burstConfetti(80); launchFW(5);
                    }, 350);
                }
            });
            bArena.appendChild(b);
        }
    };

    // ─── HELPER FUNC: ANIM NUM ───
    const animNum = (id, target, duration) => {
        const el = document.getElementById(id);
        if (!el) return;
        const start = performance.now();
        const step = (ts) => {
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.floor(eased * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString();
        };
        requestAnimationFrame(step);
    };

    // ─── PUZZLE (CLICK-TO-PLACE FOR MOBILE) ───
    const pzDrop = document.getElementById('pz-drop');
    const lhPiece = document.getElementById('lh');
    const rhPiece = document.getElementById('rh');
    const fullHeart = document.getElementById('full-h');
    const pzWin = document.getElementById('pz-win');
    let leftPlaced = false, rightPlaced = false;

    const completePuzzle = () => {
        if (leftPlaced && rightPlaced) {
            if (fullHeart) fullHeart.classList.remove('hidden');
            if (pzWin) pzWin.classList.remove('hidden');
            burstConfetti(60);
            playChime();
        }
    };

    // Click-to-place for mobile
    if (lhPiece) {
        lhPiece.addEventListener('click', () => {
            if (leftPlaced) return;
            leftPlaced = true;
            lhPiece.classList.add('placed');
            lhPiece.style.opacity = '0';
            lhPiece.style.transform = 'scale(0)';
            playPop();
            completePuzzle();
        });
    }
    if (rhPiece) {
        rhPiece.addEventListener('click', () => {
            if (rightPlaced) return;
            rightPlaced = true;
            rhPiece.classList.add('placed');
            rhPiece.style.opacity = '0';
            rhPiece.style.transform = 'scale(0)';
            playPop();
            completePuzzle();
        });
    }

    // Drag support
    if (pzDrop) {
        pzDrop.addEventListener('dragover', (e) => { e.preventDefault(); pzDrop.classList.add('over'); });
        pzDrop.addEventListener('dragleave', () => pzDrop.classList.remove('over'));
        pzDrop.addEventListener('drop', (e) => {
            e.preventDefault();
            pzDrop.classList.remove('over');
            const id = e.dataTransfer.getData('text/plain');
            if (id === 'lh' && !leftPlaced) {
                leftPlaced = true;
                if (lhPiece) { lhPiece.classList.add('placed'); lhPiece.style.opacity = '0'; lhPiece.style.transform = 'scale(0)'; }
                playPop();
            }
            if (id === 'rh' && !rightPlaced) {
                rightPlaced = true;
                if (rhPiece) { rhPiece.classList.add('placed'); rhPiece.style.opacity = '0'; rhPiece.style.transform = 'scale(0)'; }
                playPop();
            }
            completePuzzle();
        });
    }

    // Drag start
    [lhPiece, rhPiece].forEach(piece => {
        if (piece) {
            piece.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', piece.id);
                piece.classList.add('dragging');
            });
            piece.addEventListener('dragend', () => piece.classList.remove('dragging'));
        }
    });

    // ─── GIFT LOGIC ───
    let giftOpened = false;
    const giftBox = document.getElementById('gift-box');
    if (giftBox) {
        giftBox.addEventListener('click', () => {
            if (giftOpened) return;
            giftOpened = true;
            document.getElementById('gift-lid').classList.add('open');
            playChime(); burstConfetti(80); launchFW(5);
            setTimeout(() => {
                document.getElementById('gift-w').style.display = 'none';
                document.getElementById('gift-reveal').classList.remove('hidden');
            }, 800);
        });
    }

    // ─── WISHES CAROUSEL (SWIPE SUPPORT) ───
    const wishes = document.querySelectorAll('.wish');
    let curW = 0;
    const wDotsC = document.getElementById('w-dots');

    if (wDotsC && wishes.length > 0) {
        wishes.forEach((_, wi) => {
            const d = document.createElement('div');
            d.className = `wd ${wi === 0 ? 'on' : ''}`;
            d.addEventListener('click', () => goWish(wi));
            wDotsC.appendChild(d);
        });
    }

    const goWish = (idx) => {
        wishes.forEach((w, i) => {
            w.classList.remove('active', 'exit');
            if (i === curW && i !== idx) w.classList.add('exit');
            if (i === idx) setTimeout(() => w.classList.add('active'), 50);
        });
        curW = idx;
        if (wDotsC) {
            wDotsC.querySelectorAll('.wd').forEach((d, i) => d.classList.toggle('on', i === idx));
        }
    };

    const wPrev = document.getElementById('w-prev');
    const wNext = document.getElementById('w-next');
    if (wPrev) wPrev.addEventListener('click', () => goWish((curW - 1 + wishes.length) % wishes.length));
    if (wNext) wNext.addEventListener('click', () => goWish((curW + 1) % wishes.length));

    // Swipe support for wishes
    const wishBox = document.getElementById('wishes-box');
    if (wishBox) {
        let wTouchStart = 0;
        wishBox.addEventListener('touchstart', (e) => { wTouchStart = e.touches[0].clientX; });
        wishBox.addEventListener('touchend', (e) => {
            const diff = wTouchStart - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) goWish((curW + 1) % wishes.length);
                else goWish((curW - 1 + wishes.length) % wishes.length);
            }
        });
    }

    // ─── SCRATCH ───
    const initScratch = () => {
        const sc = document.getElementById('scratch-c');
        if (!sc) return;
        const ctx = sc.getContext('2d');
        let scratching = false;

        // Draw cover
        const grad = ctx.createLinearGradient(0, 0, sc.width, sc.height);
        grad.addColorStop(0, '#0a1628');
        grad.addColorStop(1, '#1a2a45');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, sc.width, sc.height);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '16px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✨ Scratch Me! ✨', sc.width / 2, sc.height / 2 + 5);

        // Add sparkle dots
        for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * sc.width, Math.random() * sc.height, Math.random() * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 222, ${Math.random() * 0.3})`;
            ctx.fill();
        }

        const scratch = (x, y) => {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 18, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        };

        const getPos = (e) => {
            const r = sc.getBoundingClientRect();
            const cx = e.touches ? e.touches[0].clientX : e.clientX;
            const cy = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: cx - r.left, y: cy - r.top };
        };

        ['mousedown', 'touchstart'].forEach(ev => sc.addEventListener(ev, (e) => {
            scratching = true; const p = getPos(e); scratch(p.x, p.y);
        }));
        ['mousemove', 'touchmove'].forEach(ev => sc.addEventListener(ev, (e) => {
            if (scratching) {
                e.preventDefault();
                const p = getPos(e);
                scratch(p.x, p.y);
            }
        }));
        ['mouseup', 'touchend'].forEach(ev => window.addEventListener(ev, () => scratching = false));
    };

    // ─── FRIEND CERTIFICATE ───
    const signBtn = document.getElementById('sign-btn');
    const certStamp = document.getElementById('cert-stamp');
    if (signBtn && certStamp) {
        signBtn.addEventListener('click', () => {
            playChime();
            burstConfetti(120);
            launchFW(6);
            signBtn.style.transform = 'scale(0)';
            setTimeout(() => {
                signBtn.style.display = 'none';
                certStamp.classList.remove('hidden');
                setTimeout(() => certStamp.classList.add('stamped'), 50);
            }, 300);
            localStorage.setItem('friend-signed', 'true');
        });

        if (localStorage.getItem('friend-signed') === 'true') {
            signBtn.style.display = 'none';
            certStamp.classList.remove('hidden');
            certStamp.classList.add('stamped');
        }
    }

    // ─── MEGA BUTTON ───
    const megaBtn = document.getElementById('mega-btn');
    if (megaBtn) {
        megaBtn.addEventListener('click', () => {
            playChime();
            launchFW(15);
            burstConfetti(250);
            emojiRain();
            megaBtn.innerHTML = '<span>🍻 Friends Forever! 🍻</span>';
            megaBtn.classList.add('celebrated');
        });
    }

    // Init Scratch
    initScratch();

    console.log(`%c🚀 Damithri's 25th Premium Engine v7 Loaded!`, 'color:#00FFDE;font-weight:bold;font-size:16px;background:#000;padding:4px 12px;border-radius:4px;');
});
