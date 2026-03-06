// /tools/maze3d.js
export const template = `
    <div class="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm text-center">
        <div id="previewArea" class="w-full h-64 bg-black rounded-xl mb-6 flex items-center justify-center overflow-hidden relative border-2 border-indigo-900 shadow-inner">
            <canvas id="mazeCanvas" class="w-full h-full"></canvas>
            <div class="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-indigo-400 font-mono tracking-tighter">RENDER_ENGINE: RAYCAST_V1</div>
        </div>
        
        <button id="startMazeBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-xl font-bold transition-all shadow-xl active:scale-95">
            Launch Fullscreen Maze
        </button>
        
        <p class="mt-4 text-slate-500 text-xs font-mono uppercase tracking-widest">Windows 95 Retro Style • Auto-Navigation</p>
    </div>
`;

export function init() {
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startMazeBtn');
    let animationId;

    // 16x16 Maze Map (1 = Wall, 0 = Empty)
    const mapSize = 16;
    const map = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1,
        1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,
        1,0,1,0,1,1,1,1,1,0,1,1,0,1,0,1,
        1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,
        1,1,1,0,1,0,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,
        1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,
        1,0,1,0,1,1,1,1,1,1,0,1,1,1,0,1,
        1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,
        1,1,1,1,1,0,1,1,0,1,1,1,0,1,0,1,
        1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,0,1,1,1,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];

    // Player State
    let player = { x: 1.5, y: 1.5, dir: 0, moveSpeed: 0.04, rotSpeed: 0.05 };
    let isTurning = false;
    let targetDir = 0;

    const resize = () => {
        // Pixelate for retro feel: render at lower res
        canvas.width = window.innerWidth / 2.5;
        canvas.height = window.innerHeight / 2.5;
        ctx.imageSmoothingEnabled = false;
    };

    const draw = () => {
        // Draw Ceiling & Floor
        ctx.fillStyle = "#111"; ctx.fillRect(0, 0, canvas.width, canvas.height/2);
        ctx.fillStyle = "#222"; ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);

        // Raycasting Logic
        const numRays = canvas.width;
        const fov = Math.PI / 3;

        for (let i = 0; i < numRays; i++) {
            const rayAngle = (player.dir - fov / 2) + (i / numRays) * fov;
            const cosA = Math.cos(rayAngle);
            const sinA = Math.sin(rayAngle);

            let distance = 0;
            let hit = false;
            let wallSide = 0;

            // DDA-like step
            while (!hit && distance < 20) {
                distance += 0.05;
                const testX = Math.floor(player.x + cosA * distance);
                const testY = Math.floor(player.y + sinA * distance);

                if (testX < 0 || testX >= mapSize || testY < 0 || testY >= mapSize) {
                    hit = true; distance = 20;
                } else if (map[testY * mapSize + testX] > 0) {
                    hit = true;
                    // Determine which side of the wall was hit for shading
                    const blockX = player.x + cosA * distance;
                    const blockY = player.y + sinA * distance;
                    wallSide = Math.abs(blockX - Math.floor(blockX) - 0.5) > Math.abs(blockY - Math.floor(blockY) - 0.5) ? 0 : 1;
                }
            }

            // Correct fisheye distortion
            const correctedDist = distance * Math.cos(rayAngle - player.dir);
            const lineHeight = canvas.height / correctedDist;

            // Draw Wall Slice
            ctx.fillStyle = wallSide === 0 ? "#800" : "#b00"; // Shaded Brick Red
            ctx.fillRect(i, (canvas.height - lineHeight) / 2, 1, lineHeight);
        }

        // --- SMOOTH AUTO-PILOT LOGIC ---
        if (!isTurning) {
            const checkWall = (angle, dist = 0.8) => {
                const tx = Math.floor(player.x + Math.cos(angle) * dist);
                const ty = Math.floor(player.y + Math.sin(angle) * dist);
                return map[ty * mapSize + tx] !== 0;
            };

            const rightBlocked = checkWall(player.dir + Math.PI / 2);
            const frontBlocked = checkWall(player.dir);

            if (!rightBlocked) {
                isTurning = true;
                targetDir = player.dir + Math.PI / 2;
            } else if (frontBlocked) {
                isTurning = true;
                targetDir = player.dir - Math.PI / 2;
            } else {
                player.x += Math.cos(player.dir) * player.moveSpeed;
                player.y += Math.sin(player.dir) * player.moveSpeed;
            }
        } else {
            // Gradual rotation toward target
            const diff = targetDir - player.dir;
            if (Math.abs(diff) > 0.01) {
                player.dir += Math.sign(diff) * player.rotSpeed;
            } else {
                player.dir = targetDir;
                isTurning = false;
                // Keep angles within 0-2PI range
                player.dir %= (Math.PI * 2);
            }
        }

        animationId = requestAnimationFrame(draw);
    };

    startBtn.onclick = () => {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
            resize();
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