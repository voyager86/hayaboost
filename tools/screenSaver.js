export const template = `
    <div class="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm text-center">
        <div id="previewArea" class="w-full h-64 bg-black rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
            <canvas id="saverCanvas" class="w-full h-full"></canvas>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end justify-center pb-4">
                <p class="text-xs text-slate-400">Generative Engine: Infinite Patterns</p>
            </div>
        </div>
        
        <button id="startBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl">
            Launch Generative ScreenSaver
        </button>
        
        <p class="mt-4 text-slate-500 text-xs italic">Press 'ESC' or click anywhere to exit</p>
    </div>
`;

export function init() {
    const canvas = document.getElementById('saverCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startBtn');
    let animationId;
    let time = 0;
    
    // Pattern variables that randomize on every start
    let patternType, colorHue, speed, complexity;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const randomizePattern = () => {
        patternType = Math.floor(Math.random() * 3); // 0: Flow, 1: Geometry, 2: Particles
        colorHue = Math.random() * 360;
        speed = 0.01 + Math.random() * 0.05;
        complexity = 5 + Math.random() * 20;
    };

    const draw = () => {
        time += speed;
        
        // Semi-transparent clear for "trail" effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = `hsla(${colorHue + (time * 10) % 360}, 70%, 50%, 0.8)`;

        if (patternType === 0) {
            // Pattern: Sine Flow
            ctx.beginPath();
            for (let i = 0; i < complexity; i++) {
                let y = (canvas.height / complexity) * i;
                ctx.moveTo(0, y);
                for (let x = 0; x < canvas.width; x += 10) {
                    let offset = Math.sin(x * 0.01 + time + i) * 50;
                    ctx.lineTo(x, y + offset);
                }
            }
            ctx.stroke();
        } else if (patternType === 1) {
            // Pattern: Rotating Geometry
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(time);
            for (let i = 0; i < complexity; i++) {
                ctx.rotate((Math.PI * 2) / complexity);
                ctx.strokeRect(i * 10, i * 10, 100, 100);
            }
            ctx.restore();
        } else {
            // Pattern: Hyper-Grid
            for (let i = 0; i < complexity; i++) {
                let x = (Math.sin(time + i) * canvas.width / 3) + canvas.width / 2;
                let y = (Math.cos(time * 0.5 + i) * canvas.height / 3) + canvas.height / 2;
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        animationId = requestAnimationFrame(draw);
    };

    startBtn.onclick = () => {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
            resize();
            randomizePattern();
            draw();
        }
    };

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    });

    window.addEventListener('resize', resize);
    resize();
}