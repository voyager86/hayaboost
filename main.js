import { toolRegistry } from './registry.js';

const navContainer = document.getElementById('sidebar-nav');
const searchInput = document.getElementById('toolSearch');
const toolApp = document.getElementById('tool-app');
const themeIcon = document.getElementById('themeIcon');

// 1. Dark Mode Toggle
document.getElementById('darkToggle').onclick = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
    themeIcon.innerText = isDark ? '☀️' : '🌙';
};

// 2. Sidebar Rendering
function renderSidebar(filter = '') {
    navContainer.innerHTML = '';
    const currentPath = window.location.pathname;
    const filtered = toolRegistry.filter(t => t.name.toLowerCase().includes(filter.toLowerCase()));
    const categories = [...new Set(filtered.map(t => t.category))];

    categories.forEach(cat => {
        const section = document.createElement('div');
        section.className = "mb-4";
        section.innerHTML = `<h3 class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 px-3">${cat}</h3>`;
        
        filtered.filter(t => t.category === cat).forEach(t => {
            const link = document.createElement('a');
            link.href = t.path;
            const isActive = currentPath === t.path;
            link.className = `block px-3 py-2 text-sm rounded-lg transition-all mb-1 ${
                isActive 
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none font-medium" 
                : "text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600"
            }`;
            link.innerText = t.name;
            link.onclick = (e) => { e.preventDefault(); navigate(t.path); };
            section.appendChild(link);
        });
        navContainer.appendChild(section);
    });
}

// 3. Dynamic Tool Loader
async function loadTool() {
    const path = window.location.pathname;
    const toolInfo = toolRegistry.find(t => t.path === path) || toolRegistry[0];

    try {
        const tool = await import(`./tools${toolInfo.path}.js`);
        toolApp.innerHTML = `
            <div class="mb-8">
                <span class="text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-widest">${toolInfo.category}</span>
                <h2 class="text-4xl font-bold text-slate-800 dark:text-white mt-1">${toolInfo.name}</h2>
            </div>
            <div class="tool-content animation-fade-in">${tool.template}</div>
        `;
        tool.init();
        renderSidebar(searchInput.value); // Refresh active state
    } catch (err) {
        toolApp.innerHTML = `<div class="text-center mt-20 text-slate-500">Select a tool to begin</div>`;
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