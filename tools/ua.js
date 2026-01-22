// /tools/ua.js
export const template = `
    <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex items-center space-x-3 mb-6">
            <div class="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center rounded-lg">
                <span class="text-xl">🌐</span>
            </div>
            <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Detected Browser String</p>
                <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100">User Agent Display</h3>
            </div>
        </div>

        <div class="relative group">
            <div id="uaBox" class="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-indigo-600 dark:text-indigo-400 break-all leading-relaxed cursor-pointer transition-all hover:border-indigo-500">
                ${navigator.userAgent}
            </div>
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="text-[10px] bg-indigo-600 text-white px-2 py-1 rounded">Click to Copy</span>
            </div>
        </div>

        <div class="mt-8 grid grid-cols-2 gap-4">
            <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span class="block text-[10px] text-slate-400 uppercase font-bold">Platform</span>
                <span class="text-slate-700 dark:text-slate-300 font-medium">${navigator.platform}</span>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span class="block text-[10px] text-slate-400 uppercase font-bold">Language</span>
                <span class="text-slate-700 dark:text-slate-300 font-medium">${navigator.language}</span>
            </div>
        </div>
    </div>
`;

export function init() {
    const uaBox = document.getElementById('uaBox');
    uaBox.onclick = () => {
        navigator.clipboard.writeText(uaBox.innerText);
        const originalText = uaBox.innerText;
        uaBox.innerText = "Copied to clipboard!";
        uaBox.classList.add('text-emerald-500');
        setTimeout(() => {
            uaBox.innerText = originalText;
            uaBox.classList.remove('text-emerald-500');
        }, 1000);
    };
}