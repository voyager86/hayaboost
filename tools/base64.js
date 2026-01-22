// /tools/base64.js
export const template = `
    <div class="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm">
        <div class="mb-6">
            <label class="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Input Text</label>
            <textarea id="base64Input" 
                   class="w-full h-40 p-4 bg-slate-950 text-white border border-slate-800 rounded-xl font-mono focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                   placeholder="Type or paste text here..."></textarea>
        </div>
        
        <div class="flex gap-4 mb-6">
            <button id="encodeBtn" class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg">Encode to Base64</button>
            <button id="decodeBtn" class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-bold transition-all border border-slate-700">Decode from Base64</button>
        </div>

        <div>
            <label class="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Result</label>
            <div id="base64Output" class="w-full min-h-[100px] p-5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-indigo-400 break-all whitespace-pre-wrap group cursor-pointer relative">
                <span id="resultValue">...</span>
                <span class="absolute top-2 right-2 text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Click to Copy</span>
            </div>
        </div>
    </div>
`;

export function init() {
    const input = document.getElementById('base64Input');
    const resultValue = document.getElementById('resultValue');
    const outputContainer = document.getElementById('base64Output');

    // UTF-8 aware Base64 Encoding
    const encode = (str) => {
        const bytes = new TextEncoder().encode(str);
        const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
        return btoa(binString);
    };

    // UTF-8 aware Base64 Decoding
    const decode = (base64) => {
        try {
            const binString = atob(base64);
            const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
            return new TextDecoder().decode(bytes);
        } catch (e) {
            return "Error: Invalid Base64 string";
        }
    };

    document.getElementById('encodeBtn').onclick = () => {
        resultValue.innerText = input.value ? encode(input.value) : "...";
    };

    document.getElementById('decodeBtn').onclick = () => {
        resultValue.innerText = input.value ? decode(input.value) : "...";
    };

    outputContainer.onclick = () => {
        if (resultValue.innerText !== "..." && !resultValue.innerText.startsWith("Error")) {
            navigator.clipboard.writeText(resultValue.innerText);
            const original = resultValue.innerText;
            resultValue.innerText = "Copied!";
            setTimeout(() => resultValue.innerText = original, 1000);
        }
    };
}