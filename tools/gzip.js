// /tools/gzip.js
export const template = `
    <div class="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm">
        <div class="mb-6">
            <label class="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Input Text / GZip Base64</label>
            <textarea id="gzipInput" 
                   class="w-full h-40 p-4 bg-slate-950 text-white border border-slate-800 rounded-xl font-mono focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                   placeholder="Type text to compress or paste GZip Base64 to decompress..."></textarea>
        </div>
        
        <div class="flex gap-4 mb-6">
            <button id="compressBtn" class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg">Compress (to Base64)</button>
            <button id="decompressBtn" class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-bold transition-all border border-slate-700">Decompress</button>
        </div>

        <div>
            <label class="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Result</label>
            <div id="gzipOutput" class="w-full min-h-[100px] p-5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-indigo-400 break-all whitespace-pre-wrap group cursor-pointer relative">
                <span id="resultValue">...</span>
                <span class="absolute top-2 right-2 text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Click to Copy</span>
            </div>
        </div>
    </div>
`;

export function init() {
    const input = document.getElementById('gzipInput');
    const resultValue = document.getElementById('resultValue');
    const outputContainer = document.getElementById('gzipOutput');

    /**
     * Helper to perform JSON-style unescaping
     * Converts "\\n" to "\n", "\\u0041" to "A", etc.
     */
    const jsonUnescape = (str) => {
        try {
            // Wrap in quotes and parse as a JSON string to handle all escape sequences
            return JSON.parse('"' + str.replace(/"/g, '\\"') + '"');
        } catch (e) {
            return str; // Fallback to original if parsing fails
        }
    };

    const compress = async (str) => {
        try {
            const stream = new Blob([str]).stream();
            const compressedStream = stream.pipeThrough(new CompressionStream("gzip"));
            const chunks = [];
            const reader = compressedStream.getReader();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
            }
            const blob = new Blob(chunks);
            const buffer = await blob.arrayBuffer();
            return btoa(String.fromCharCode(...new Uint8Array(buffer)));
        } catch (e) {
            return "Error: Compression failed";
        }
    };

    const decompress = async (source) => {
        try {
            // FIX: Use JSON-style unescaping on the input string
            const unescapedSource = jsonUnescape(source.trim());
            
            const binary = atob(unescapedSource);
            const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
            const stream = new Blob([bytes]).stream();
            const decompressedStream = stream.pipeThrough(new DecompressionStream("gzip"));
            const result = await new Response(decompressedStream).text();
            return result;
        } catch (e) {
            return "Error: Invalid GZip/Base64 data or malformed JSON escapes";
        }
    };

    document.getElementById('compressBtn').onclick = async () => {
        if (!input.value) return;
        resultValue.innerText = "Compressing...";
        resultValue.innerText = await compress(input.value);
    };

    document.getElementById('decompressBtn').onclick = async () => {
        if (!input.value) return;
        resultValue.innerText = "Decompressing...";
        resultValue.innerText = await decompress(input.value);
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