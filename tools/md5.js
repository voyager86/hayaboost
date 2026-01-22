// /tools/md5.js
export const template = `
    <div class="space-y-6">
        <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Input Text</label>
            <input type="text" id="md5Input" 
                   class="w-full p-4 border rounded-xl font-mono focus:ring-2 focus:ring-indigo-500 outline-none" 
                   placeholder="Type something to hash...">
        </div>
        
        <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <label class="block text-xs font-bold text-slate-400 uppercase mb-2">MD5 Hash Result</label>
            <div id="md5Output" class="font-mono text-xl text-indigo-600 break-all select-all cursor-pointer" title="Click to copy">
                ...
            </div>
        </div>
    </div>
`;

export function init() {
    const input = document.getElementById('md5Input');
    const output = document.getElementById('md5Output');

    input.addEventListener('input', () => {
        const val = input.value;
        if (val) {
            // CryptoJS is loaded in the main index.html head
            output.innerText = CryptoJS.MD5(val).toString();
        } else {
            output.innerText = "...";
        }
    });

    // Bonus: Click to copy functionality
    output.onclick = () => {
        if (output.innerText !== "...") {
            navigator.clipboard.writeText(output.innerText);
            const original = output.innerText;
            output.innerText = "Copied!";
            setTimeout(() => output.innerText = original, 1000);
        }
    };
}