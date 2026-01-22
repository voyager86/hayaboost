export const template = `
    <div class="p-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl">
        <p class="text-slate-400 text-xs font-bold uppercase mb-4 tracking-widest">Detected User Agent</p>
        <code class="text-emerald-400 font-mono break-all text-lg">${navigator.userAgent}</code>
    </div>
`;
export function init() {}