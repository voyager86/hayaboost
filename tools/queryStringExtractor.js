// /tools/queryStringExtractor.js
export const template = `
    <div class="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm">
        <div class="mb-6">
            <label class="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Input URL</label>
            <input type="text" id="urlInput" 
                   class="w-full p-4 bg-slate-950 text-white border border-slate-800 rounded-xl font-mono focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                   placeholder="Paste URL here (e.g., https://example.com?id=1&name=test)">
        </div>
        
        <div class="overflow-x-auto rounded-xl border border-slate-800">
            <table class="w-full text-left border-collapse bg-slate-950">
                <thead>
                    <tr class="border-b border-slate-800">
                        <th id="sortName" class="p-4 text-xs font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:text-indigo-400 transition-colors">
                            Parameter Name <span id="nameIcon">↕</span>
                        </th>
                        <th id="sortValue" class="p-4 text-xs font-black text-slate-500 uppercase tracking-widest cursor-pointer hover:text-indigo-400 transition-colors">
                            Value <span id="valueIcon">↕</span>
                        </th>
                    </tr>
                </thead>
                <tbody id="gridBody" class="font-mono text-sm text-indigo-400">
                    <tr>
                        <td colspan="2" class="p-8 text-center text-slate-600 italic">Enter a URL above to see parameters</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
`;

export function init() {
    const input = document.getElementById('urlInput');
    const gridBody = document.getElementById('gridBody');
    let currentData = [];
    let sortConfig = { key: null, direction: 'asc' };

    const renderGrid = (data) => {
        if (data.length === 0) {
            gridBody.innerHTML = '<tr><td colspan="2" class="p-8 text-center text-slate-600 italic">No parameters found</td></tr>';
            return;
        }
        gridBody.innerHTML = data.map(item => `
            <tr class="border-b border-slate-800 hover:bg-slate-900/50 transition-colors">
                <td class="p-4 border-r border-slate-800 break-all">${item.name}</td>
                <td class="p-4 break-all">${item.value}</td>
            </tr>
        `).join('');
    };

    const handleSort = (key) => {
        sortConfig.direction = (sortConfig.key === key && sortConfig.direction === 'asc') ? 'desc' : 'asc';
        sortConfig.key = key;
        
        const sorted = [...currentData].sort((a, b) => {
            const valA = a[key].toLowerCase();
            const valB = b[key].toLowerCase();
            return sortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        });

        document.getElementById('nameIcon').innerText = sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕';
        document.getElementById('valueIcon').innerText = sortConfig.key === 'value' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕';
        renderGrid(sorted);
    };

    input.addEventListener('input', () => {
        try {
            const urlString = input.value.trim();
            if (!urlString) {
                currentData = [];
                renderGrid([]);
                return;
            }

            // Extract search params from URL or string
            const searchParams = urlString.includes('?') 
                ? new URL(urlString).searchParams 
                : new URLSearchParams(urlString);
            
            currentData = [];
            for (const [name, value] of searchParams) {
                currentData.push({ name, value });
            }
            renderGrid(currentData);
        } catch (e) {
            gridBody.innerHTML = '<tr><td colspan="2" class="p-8 text-center text-red-900 italic">Invalid URL format</td></tr>';
        }
    });

    document.getElementById('sortName').onclick = () => handleSort('name');
    document.getElementById('sortValue').onclick = () => handleSort('value');
}