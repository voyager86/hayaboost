export const template = `
    <textarea id="input" class="w-full h-40 p-4 border rounded-xl font-mono mb-4 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Enter text..."></textarea>
    <div class="flex gap-4">
        <button id="encBtn" class="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold">Encode</button>
        <button id="decBtn" class="bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-bold">Decode</button>
    </div>
`;

export function init() {
    const input = document.getElementById('input');
    document.getElementById('encBtn').onclick = () => input.value = encodeURIComponent(input.value);
    document.getElementById('decBtn').onclick = () => input.value = decodeURIComponent(input.value);
}