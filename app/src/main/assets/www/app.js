/**
 * Mind Reader - Premium Feature Phone Remake
 * A complete, pure vanilla JavaScript single-page application.
 */

// Global Symbols List (30 high-quality celestial and mystic emojis acting as crisp full-color illustrations)
const SYMBOLS = [
    '🔮', '🧿', '🌌', '🌀', '🪐', '☄️', '🌟', '🛸', '🗝️', '👁️', 
    '🃏', '📿', '🕯️', '🧭', '🎭', '🧪', '🏺', '⚔️', '🛡️', '👑', 
    '💎', '⚜️', '🔱', '🧩', '🎯', '🎲', '🦄', '🐉', '🍀', '🦅'
];

// Sound Synthesis Engine using Web Audio API
class AudioSynthesizer {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playTap() {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    playTick() {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playRevealTrigger() {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 1.2);
        
        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.2);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 1.2);
    }

    playRevealChime() {
        this.init();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(freq + 10, this.ctx.currentTime + 0.8);
                
                gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.8);
            }, idx * 100);
        });
    }
}

// Background Particle Effects System
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('bg-particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.spawn(50);
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    spawn(count) {
        // High quality premium iOS-style soft bokeh blobs
        for (let i = 0; i < 12; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 80 + 50, // Elegant large soft bokeh blobs
                speedX: (Math.random() - 0.5) * 0.12,
                speedY: (Math.random() - 0.5) * 0.12,
                alpha: Math.random() * 0.12 + 0.03,
                color: Math.random() > 0.5 ? '#60a5fa' : '#c084fc', // Sky blue and Purple
                isBokeh: true
            });
        }
        // Small crisp floating stardust
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.25,
                speedY: (Math.random() - 0.5) * 0.25,
                alpha: Math.random() * 0.5 + 0.1,
                color: '#ffffff',
                isBokeh: false
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < -100) p.x = this.canvas.width + 100;
            if (p.x > this.canvas.width + 100) p.x = -100;
            if (p.y < -100) p.y = this.canvas.height + 100;
            if (p.y > this.canvas.height + 100) p.y = -100;

            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });

        // Draw connections for non-bokeh stars to keep the high-tech oracle feel
        this.ctx.strokeStyle = 'rgba(96, 165, 250, 0.05)';
        this.ctx.lineWidth = 0.5;
        const starParticles = this.particles.filter(p => !p.isBokeh);
        for (let i = 0; i < starParticles.length; i++) {
            for (let j = i + 1; j < starParticles.length; j++) {
                const dx = starParticles[i].x - starParticles[j].x;
                const dy = starParticles[i].y - starParticles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 80) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(starParticles[i].x, starParticles[i].y);
                    this.ctx.lineTo(starParticles[j].x, starParticles[j].y);
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Crystal Ball Magic Glow System (Fluid Interactive Plasma Globe)
class CrystalBallEnergy {
    constructor() {
        this.canvas = document.getElementById('canvas-crystal-energy');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = 160;
        this.height = this.canvas.height = 160;
        
        this.cx = this.width / 2;
        this.cy = this.height / 2;
        this.radius = 70; // Outer glass shell boundary

        // Touch tracking
        this.touchActive = false;
        this.touchX = this.cx;
        this.touchY = this.cy;

        // Active plasma beams
        this.beams = [];
        const beamColors = [
            { main: '#c084fc', glow: 'rgba(168, 85, 247, 0.4)', core: '#ffffff' }, // Purple
            { main: '#60a5fa', glow: 'rgba(59, 130, 246, 0.4)', core: '#ffffff' }, // Blue
            { main: '#38bdf8', glow: 'rgba(56, 189, 248, 0.4)', core: '#ffffff' }, // Cyan
            { main: '#f43f5e', glow: 'rgba(244, 63, 94, 0.4)', core: '#ffffff' }   // Magenta/Pink
        ];

        for (let i = 0; i < 5; i++) {
            this.beams.push({
                angle: Math.random() * Math.PI * 2,
                targetAngle: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.02 + 0.01,
                colors: beamColors[i % beamColors.length],
                wobbleOffset: Math.random() * 100
            });
        }

        // Floating ionization sparks
        this.sparks = [];
        for (let i = 0; i < 15; i++) {
            this.sparks.push(this.createSpark());
        }

        this.setupListeners();
        this.animate();
    }

    createSpark() {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * (this.radius - 15);
        return {
            x: this.cx + Math.cos(angle) * dist,
            y: this.cy + Math.sin(angle) * dist,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -Math.random() * 0.4 - 0.2, // Drifts upward
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.2,
            life: Math.random() * 100 + 50,
            maxLife: 150
        };
    }

    setupListeners() {
        const updateTouch = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            // Supports both touches and pointer events
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const rawX = clientX - rect.left;
            const rawY = clientY - rect.top;
            
            // Constrain touch inside the plasma sphere
            const dx = rawX - this.cx;
            const dy = rawY - this.cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < this.radius - 5) {
                this.touchX = rawX;
                this.touchY = rawY;
            } else {
                this.touchX = this.cx + (dx / dist) * (this.radius - 5);
                this.touchY = this.cy + (dy / dist) * (this.radius - 5);
            }
            this.touchActive = true;
        };

        this.canvas.addEventListener('pointerdown', (e) => {
            this.canvas.setPointerCapture(e.pointerId);
            updateTouch(e);
        });
        this.canvas.addEventListener('pointermove', (e) => {
            if (this.touchActive) updateTouch(e);
        });
        this.canvas.addEventListener('pointerup', (e) => {
            this.canvas.releasePointerCapture(e.pointerId);
            this.touchActive = false;
        });
        this.canvas.addEventListener('pointerleave', () => {
            this.touchActive = false;
        });

        // Touch fallbacks
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            updateTouch(e);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            updateTouch(e);
        });
        this.canvas.addEventListener('touchend', () => {
            this.touchActive = false;
        });
    }

    drawPlasmaBeam(startX, startY, endX, endY, colors, wobbleOffset, beamId) {
        const steps = 24;
        const dx = endX - startX;
        const dy = endY - startY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 5) return;

        const time = Date.now() * 0.005;
        const points = [];

        points.push({ x: startX, y: startY });

        for (let i = 1; i < steps; i++) {
            const t = i / steps;
            let px = startX + dx * t;
            let py = startY + dy * t;

            // Highly organic combination of multiple high-frequency sine waves for "fluid electricity" feel
            const freq1 = t * Math.PI * 2.2 - time + wobbleOffset;
            const freq2 = t * Math.PI * 4.5 + time * 1.5 - wobbleOffset;
            
            const wave1 = Math.sin(freq1) * 7;
            const wave2 = Math.cos(freq2) * 3.5;
            
            // Envelope to taper the wave at the core and the glass wall
            const envelope = Math.sin(t * Math.PI);
            const offset = (wave1 + wave2) * envelope;

            // Perpendicular unit vector
            const nx = -dy / dist;
            const ny = dx / dist;

            px += nx * offset;
            py += ny * offset;

            // Fine electrostatic jitter
            px += (Math.random() - 0.5) * 1.5;
            py += (Math.random() - 0.5) * 1.5;

            points.push({ x: px, y: py });
        }

        points.push({ x: endX, y: endY });

        // Multi-pass glow render pipeline
        // Pass 1: Outer wide background fog
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        this.ctx.strokeStyle = colors.glow;
        this.ctx.lineWidth = 8;
        this.ctx.shadowColor = colors.main;
        this.ctx.shadowBlur = 10;
        this.ctx.stroke();

        // Pass 2: Colored Plasma Beam Core
        this.ctx.shadowBlur = 0; // reset shadow for performance
        this.ctx.strokeStyle = colors.main;
        this.ctx.lineWidth = 2.5;
        this.ctx.stroke();

        // Pass 3: White-Hot Electrostatic Core Line
        this.ctx.strokeStyle = colors.core;
        this.ctx.lineWidth = 0.8;
        this.ctx.stroke();

        // Small glowing flare at destination point
        this.ctx.beginPath();
        this.ctx.arc(endX, endY, Math.random() * 4 + 2, 0, Math.PI * 2);
        this.ctx.fillStyle = colors.main;
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(endX, endY, Math.random() * 2 + 0.5, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
    }

    animate() {
        if (!this.canvas) return;
        
        // Slightly translucent clearing to create beautiful motion trails
        this.ctx.fillStyle = 'rgba(5, 6, 15, 0.2)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Update & Draw Background Ionization Sparks
        this.sparks.forEach((s, idx) => {
            s.x += s.vx;
            s.y += s.vy;
            s.life--;
            
            // Constrain sparks inside globe
            const dx = s.x - this.cx;
            const dy = s.y - this.cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > this.radius - 8) {
                s.life = 0;
            }

            if (s.life <= 0) {
                this.sparks[idx] = this.createSpark();
            } else {
                this.ctx.fillStyle = `rgba(192, 132, 252, ${s.alpha * (s.life / s.maxLife)})`;
                this.ctx.beginPath();
                this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });

        // Update and draw plasma filaments
        this.beams.forEach((b, i) => {
            // Update beam drifting
            if (Math.abs(b.angle - b.targetAngle) < 0.1) {
                b.targetAngle = Math.random() * Math.PI * 2;
                b.speed = Math.random() * 0.015 + 0.005;
            }
            // Smoothly drift towards the target angle
            const angleDiff = b.targetAngle - b.angle;
            b.angle += Math.sin(angleDiff) * b.speed;

            let endX, endY;

            if (this.touchActive) {
                if (i === 0 || i === 1) {
                    // Force primary filaments to attach directly to the touch position
                    endX = this.touchX;
                    endY = this.touchY;
                } else {
                    // Secondary filaments are drawn towards the touch point but with an offset
                    const touchAngle = Math.atan2(this.touchY - this.cy, this.touchX - this.cx);
                    const modifiedAngle = touchAngle + (i - 2.5) * 0.5;
                    endX = this.cx + Math.cos(modifiedAngle) * (this.radius - 4);
                    endY = this.cy + Math.sin(modifiedAngle) * (this.radius - 4);
                }
            } else {
                // Natural drifting state: terminate on outer glass surface
                endX = this.cx + Math.cos(b.angle) * (this.radius - 3);
                endY = this.cy + Math.sin(b.angle) * (this.radius - 3);
            }

            // Draw the plasma beam
            this.drawPlasmaBeam(this.cx, this.cy, endX, endY, b.colors, b.wobbleOffset, i);
        });

        // Draw center high-voltage electrode core
        const coreGradient = this.ctx.createRadialGradient(this.cx, this.cy, 1, this.cx, this.cy, 10);
        coreGradient.addColorStop(0, '#ffffff');
        coreGradient.addColorStop(0.2, '#a855f7');
        coreGradient.addColorStop(0.6, 'rgba(59, 130, 246, 0.4)');
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        this.ctx.fillStyle = coreGradient;
        this.ctx.beginPath();
        this.ctx.arc(this.cx, this.cy, 10, 0, Math.PI * 2);
        this.ctx.fill();

        // Delicate inner glass rim glow to complete the realism
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(this.cx, this.cy, this.radius - 2, 0, Math.PI * 2);
        this.ctx.stroke();

        requestAnimationFrame(() => this.animate());
    }
}

// Confetti Burst System
class ConfettiSystem {
    constructor() {
        this.canvas = document.getElementById('canvas-confetti');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.active = false;
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    burst() {
        this.particles = [];
        this.active = true;
        const colors = ['#00f2fe', '#4facfe', '#9d4edd', '#ff007f', '#ffffff'];
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 3;

        for (let i = 0; i < 120; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 12 + 6;
            this.particles.push({
                x: cx,
                y: cy,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity - 3, // slightly upward push
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.2,
                opacity: 1
            });
        }
        
        this.animate();
    }

    animate() {
        if (!this.active) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let living = false;

        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.25; // gravity
            p.vx *= 0.98; // air drag
            p.rotation += p.rotSpeed;
            p.opacity -= 0.012;

            if (p.opacity > 0) {
                living = true;
                this.ctx.save();
                this.ctx.globalAlpha = p.opacity;
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.rotation);
                this.ctx.fillStyle = p.color;
                
                // Draw decorative shapes (rectangles, circles, stars)
                this.ctx.beginPath();
                this.ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
                this.ctx.fill();
                this.ctx.restore();
            }
        });

        if (living) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.active = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

// Game Coordinator
class Game {
    constructor() {
        this.audio = new AudioSynthesizer();
        this.confetti = new ConfettiSystem();
        
        // Load Game Statistics
        this.gamesPlayed = parseInt(localStorage.getItem('mr_games_played')) || 0;
        this.correctPredictions = parseInt(localStorage.getItem('mr_correct_predictions')) || 0;
        
        // Game state variables
        this.predictionSymbol = '';
        this.symbolGridElements = document.getElementById('symbol-grid-elements');
        
        this.setupUI();
        this.generateNewGrid();
    }

    setupUI() {
        this.updateStatsDisplay();

        // Screen Navigation Event Listeners
        document.getElementById('btn-start').addEventListener('click', () => {
            this.audio.playTap();
            this.switchScreen('screen-instructions');
        });

        document.getElementById('btn-continue').addEventListener('click', () => {
            this.audio.playTap();
            this.switchScreen('screen-grid');
        });

        document.getElementById('btn-reveal').addEventListener('click', () => {
            this.audio.playRevealTrigger();
            this.switchScreen('screen-reveal');
            this.startRevealRitual();
        });

        document.getElementById('btn-play-again').addEventListener('click', () => {
            this.audio.playTap();
            this.resetGame();
        });
    }

    switchScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(scr => {
            scr.classList.remove('active');
        });
        
        // Show selected screen with nice animations
        const activeScreen = document.getElementById(screenId);
        if (activeScreen) {
            activeScreen.classList.add('active');
        }
    }

    updateStatsDisplay() {
        document.getElementById('stat-played').textContent = this.gamesPlayed;
        const accuracy = this.gamesPlayed > 0 
            ? Math.round((this.correctPredictions / this.gamesPlayed) * 100) 
            : 100;
        document.getElementById('stat-accuracy').textContent = accuracy + '%';
    }

    saveStats() {
        localStorage.setItem('mr_games_played', this.gamesPlayed);
        localStorage.setItem('mr_correct_predictions', this.correctPredictions);
        this.updateStatsDisplay();
    }

    generateNewGrid() {
        // 1. Pick a random prediction symbol from list
        this.predictionSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

        // Clear existing elements
        this.symbolGridElements.innerHTML = '';

        // 2. Identify all indices that are NOT multiples of 9
        const nonMultiplesOf9 = [];
        for (let i = 0; i < 100; i++) {
            if (i % 9 !== 0) {
                nonMultiplesOf9.push(i);
            }
        }

        // 3. Select 18 random indices from non-multiples to also force-receive the prediction symbol.
        // This distributes the prediction symbol beautifully across other numbers so it is "with other images as well".
        const predictionSymbolExtras = new Set();
        const targetExtraCount = 18;
        while (predictionSymbolExtras.size < targetExtraCount && nonMultiplesOf9.length > 0) {
            const randIdx = Math.floor(Math.random() * nonMultiplesOf9.length);
            const cellIdx = nonMultiplesOf9.splice(randIdx, 1)[0];
            predictionSymbolExtras.add(cellIdx);
        }

        // Filter other symbols to avoid duplicating the prediction symbol as much as possible
        const otherSymbols = SYMBOLS.filter(s => s !== this.predictionSymbol);

        // 4. Map 0-99 numbers
        for (let i = 0; i < 100; i++) {
            let symbol;
            
            if (i % 9 === 0) {
                symbol = this.predictionSymbol;
            } else if (predictionSymbolExtras.has(i)) {
                symbol = this.predictionSymbol;
            } else {
                symbol = otherSymbols[Math.floor(Math.random() * otherSymbols.length)];
            }

            // Create Grid Cell
            const cell = document.createElement('div');
            cell.className = 'grid-cell';

            cell.innerHTML = `
                <span class="cell-num">${i}</span>
                <div class="symbol-orb">
                    <span class="cell-sym">${symbol}</span>
                </div>
            `;
            this.symbolGridElements.appendChild(cell);
        }

        // Set the prediction symbol on the results card front placeholder inside a majestic large orb
        document.getElementById('prediction-symbol').innerHTML = `
            <div class="symbol-orb" style="width: 120px; height: 120px; box-shadow: 0 0 35px rgba(168, 85, 247, 0.4), inset 0 8px 12px rgba(255, 255, 255, 0.4), inset 0 -8px 12px rgba(0, 0, 0, 0.8);">
                <span class="cell-sym" style="font-size: 4rem; text-shadow: 0 0 15px rgba(192, 132, 252, 0.6);">${this.predictionSymbol}</span>
            </div>
        `;
    }

    startRevealRitual() {
        const countdownNum = document.getElementById('countdown-number');
        const countdownStatus = document.getElementById('countdown-status');
        const revealPreparing = document.getElementById('reveal-preparing');
        const revealResult = document.getElementById('reveal-result');
        const flipCard = document.querySelector('.flip-card');

        // Reset visual states
        revealPreparing.classList.remove('hidden');
        revealResult.classList.add('hidden');
        flipCard.classList.remove('flipped');
        
        let counts = 3;
        countdownNum.textContent = counts;
        countdownStatus.textContent = "Tuning Mind Frequencies...";

        // Incremental countdown timer loop
        const timer = setInterval(() => {
            counts--;
            if (counts > 0) {
                this.audio.playTick();
                countdownNum.textContent = counts;
                if (counts === 2) countdownStatus.textContent = "Analyzing Cosmic Energy...";
                if (counts === 1) countdownStatus.textContent = "Synchronizing Telepathic Link...";
            } else {
                clearInterval(timer);
                
                // Transition countdown stage to full reveal stage
                revealPreparing.classList.add('hidden');
                revealResult.classList.remove('hidden');
                
                // Wait small tick and initiate card 3D flip animation
                setTimeout(() => {
                    flipCard.classList.add('flipped');
                    this.audio.playRevealChime();
                    this.confetti.burst();
                    
                    // Increment and persist games statistics
                    this.gamesPlayed++;
                    this.correctPredictions++; // This is a correct prediction every time!
                    this.saveStats();
                }, 200);
            }
        }, 1000);
    }

    resetGame() {
        // Regenerate grid & choose new prediction symbol
        this.generateNewGrid();
        
        // Switch screen back to Symbol grid directly for fast replay
        this.switchScreen('screen-grid');
    }
}

// Instantiate and kick off application when loaded
window.addEventListener('DOMContentLoaded', () => {
    new ParticleBackground();
    new CrystalBallEnergy();
    window.game = new Game();
});
