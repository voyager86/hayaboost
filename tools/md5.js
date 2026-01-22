// /tools/md5.js
export const template = `
    <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="mb-6">
            <label class="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">Input String</label>
            <input type="text" id="md5Input" 
                   class="w-full p-4 bg-slate-50 dark:bg-slate-950 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-mono focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                   placeholder="Enter text to hash...">
        </div>
        
        <div class="relative">
            <label class="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">MD5 Hash Result</label>
            <div id="md5Output" class="w-full p-5 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl font-mono text-xl text-indigo-700 dark:text-indigo-300 break-all min-h-[68px] flex items-center justify-between group cursor-pointer">
                <span id="hashValue">...</span>
                <span class="text-xs font-sans bg-indigo-200 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
            </div>
        </div>

        <div class="mt-6 flex items-center space-x-2 text-slate-400 text-xs italic">
            <span>🛡️ MD5 is processed entirely in your browser. No data is sent to our servers.</span>
        </div>
    </div>
`;

export function init() {
    const input = document.getElementById('md5Input');
    const hashDisplay = document.getElementById('hashValue');
    const outputContainer = document.getElementById('md5Output');

    input.addEventListener('input', () => {
        const val = input.value;
        if (val) {
            // CryptoJS is globally available from the CDN in index.html
            hashDisplay.innerText = CryptoJS.MD5(val).toString();
        } else {
            hashDisplay.innerText = "...";
        }
    });

    outputContainer.onclick = () => {
        if (hashDisplay.innerText !== "...") {
            navigator.clipboard.writeText(hashDisplay.innerText);
            const original = hashDisplay.innerText;
            hashDisplay.innerText = "Hash Copied!";
            setTimeout(() => hashDisplay.innerText = original, 1000);
        }
    };
}