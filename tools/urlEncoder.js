export const template = `
    <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <textarea id="input" class="w-full h-48 p-4 bg-slate-50 dark:bg-slate-950 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl font-mono mb-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Enter text or URL here..."></textarea>
        <div class="flex gap-4">
            <button id="encBtn" class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-all">Encode</button>
            <button id="decBtn" class="flex-1 bg-slate-200 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 py-3 rounded-xl font-bold transition-all">Decode</button>
        </div>
    </div>
`;

export function init() {
    const input = document.getElementById('input');
    document.getElementById('encBtn').onclick = () => input.value = encodeURIComponent(input.value);
    document.getElementById('decBtn').onclick = () => input.value = decodeURIComponent(input.value);
}