import { toolRegistry } from './registry.js';

const navContainer = document.getElementById('sidebar-nav');
const searchInput = document.getElementById('toolSearch');
const toolApp = document.getElementById('tool-app');

// 1. Render Sidebar with Search
function renderSidebar(filter = '') {
    navContainer.innerHTML = '';
    const filtered = toolRegistry.filter(t => t.name.toLowerCase().includes(filter.toLowerCase()));
    const categories = [...new Set(filtered.map(t => t.category))];

    categories.forEach(cat => {
        const section = document.createElement('div');
        section.innerHTML = `<h3 class="text-xs font-bold text-slate-400 uppercase mt-4 mb-2 px-2">${cat}</h3>`;
        filtered.filter(t => t.category === cat).forEach(t => {
            const link = document.createElement('a');
            link.href = t.path;
            link.className = "block px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-all";
            link.innerText = t.name;
            link.onclick = (e) => { e.preventDefault(); navigate(t.path); };
            section.appendChild(link);
        });
        navContainer.appendChild(section);
    });
}

// 2. Load Tool Module
async function loadTool() {
    const path = window.location.pathname;
    const toolInfo = toolRegistry.find(t => t.path === path) || toolRegistry[0];

    try {
        const tool = await import(`./tools${toolInfo.path}.js`);
        toolApp.innerHTML = `<h2 class="text-3xl font-bold mb-8 text-slate-800">${toolInfo.name}</h2>` + tool.template;
        tool.init();
    } catch (err) {
        toolApp.innerHTML = `<p class="text-red-500">Error loading tool: ${path}</p>`;
    }
}

function navigate(path) {
    window.history.pushState({}, '', path);
    loadTool();
}

searchInput.addEventListener('input', (e) => renderSidebar(e.target.value));
window.onpopstate = loadTool;
renderSidebar();
loadTool();