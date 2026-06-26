/**
 * Mind Reader - Premium Feature Phone Remake
 * A complete, pure vanilla JavaScript single-page application.
 */

// Global Symbols List (30 high-quality Unicode glyphs)
const SYMBOLS = [
    '★', '◆', '▲', '■', '●', '♠', '♣', '♥', '♦', '☀', 
    '☂', '☯', '☘', '⚡', '☾', '☁', '✦', '✪', '✿', '❖', 
    '⬟', '⬢', '⬣', '☮', '♛', '♜', '♞', '⚙', '⌘', '∞'
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
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgba(157, 78, 221, 0.4)';
        
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;

            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });

        // Draw connections
        this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.05)';
        this.ctx.lineWidth = 0.5;
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Crystal Ball Magic Glow System
class CrystalBallEnergy {
    constructor() {
        this.canvas = document.getElementById('canvas-crystal-energy');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.width = this.canvas.width = 160;
        this.height = this.canvas.height = 160;
        this.spawn(35);
        this.animate();
    }

    spawn(count) {
        const cx = this.width / 2;
        const cy = this.height / 2;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 50;
            this.particles.push({
                x: cx + Math.cos(angle) * dist,
                y: cy + Math.sin(angle) * dist,
                angle: angle,
                speed: Math.random() * 0.02 + 0.01,
                dist: dist,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.4 ? 'rgba(0, 242, 254, 0.8)' : 'rgba(255, 0, 127, 0.8)'
            });
        }
    }

    animate() {
        if (!this.canvas) return;
        this.ctx.clearRect(0, 0, this.width, this.height);
        const cx = this.width / 2;
        const cy = this.height / 2;

        this.particles.forEach(p => {
            p.angle += p.speed;
            p.dist -= 0.2;
            if (p.dist <= 2) {
                p.dist = 60;
                p.angle = Math.random() * Math.PI * 2;
            }

            p.x = cx + Math.cos(p.angle) * p.dist;
            p.y = cy + Math.sin(p.angle) * p.dist;

            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

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

        // Educational Toggle Handler
        const eduToggle = document.getElementById('toggle-educational');
        const eduPanel = document.getElementById('educational-panel');
        eduToggle.addEventListener('change', (e) => {
            this.audio.playTap();
            if (e.target.checked) {
                eduPanel.classList.remove('hidden');
            } else {
                eduPanel.classList.add('hidden');
            }
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

        // Get pool of symbols excluding the prediction symbol
        const otherSymbols = SYMBOLS.filter(s => s !== this.predictionSymbol);

        // Clear existing elements
        this.symbolGridElements.innerHTML = '';

        // 2. Map 0-99 numbers
        for (let i = 0; i < 100; i++) {
            let symbol;
            
            // Check if multiple of 9
            if (i % 9 === 0) {
                symbol = this.predictionSymbol;
            } else {
                // Pick a random other symbol
                symbol = otherSymbols[Math.floor(Math.random() * otherSymbols.length)];
            }

            // Create Grid Cell
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            if (i % 9 === 0) {
                cell.classList.add('highlight-multiple');
            }

            cell.innerHTML = `
                <span class="cell-num">${i}</span>
                <span class="cell-sym">${symbol}</span>
            `;
            this.symbolGridElements.appendChild(cell);
        }

        // Set the prediction symbol on the results card front placeholder
        document.getElementById('prediction-symbol').textContent = this.predictionSymbol;
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
        
        // Reset Educational Toggle if open
        const eduToggle = document.getElementById('toggle-educational');
        const eduPanel = document.getElementById('educational-panel');
        eduToggle.checked = false;
        eduPanel.classList.add('hidden');

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
