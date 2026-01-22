import { toolRegistry } from './registry.js';

const navContainer = document.getElementById('sidebar-nav');
const searchInput = document.getElementById('toolSearch');
const toolApp = document.getElementById('tool-app');

/**
 * 1. SEO Helper: Updates the page title and meta description dynamically.
 * This ensures that search engine crawlers see unique content for each tool.
 */
function updateMetaTags(title, description) {
    document.title = `${title} | DevToolbox`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', description);
    }
}

/**
 * 2. Sidebar Renderer: Groups tools by category and highlights the active tool.
 */
function renderSidebar(filter = '') {
    navContainer.innerHTML = '';
    const currentPath = window.location.pathname;
    
    // Filter tools based on search input
    const filtered = toolRegistry.filter(t => 
        t.name.toLowerCase().includes(filter.toLowerCase()) ||
        t.category.toLowerCase().includes(filter.toLowerCase())
    );

    const categories = [...new Set(filtered.map(t => t.category))];

    categories.forEach(cat => {
        const section = document.createElement('div');
        section.className = "mb-4";
        section.innerHTML = `<h3 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-3">${cat}</h3>`;
        
        filtered.filter(t => t.category === cat).forEach(t => {
            const link = document.createElement('a');
            link.href = t.path;
            const isActive = currentPath === t.path;
            
            link.className = `block px-3 py-2 text-sm rounded-lg transition-all mb-1 ${
                isActive 
                ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-900/20" 
                : "text-slate-400 hover:bg-slate-800 hover:text-indigo-400"
            }`;
            
            link.innerText = t.name;
            
            // Prevent page reload and use History API
            link.onclick = (e) => {
                e.preventDefault();
                if (currentPath !== t.path) {
                    window.history.pushState({ path: t.path }, '', t.path);
                    loadTool();
                }
            };
            section.appendChild(link);
        });
        navContainer.appendChild(section);
    });
}

/**
 * 3. Dynamic Tool Loader: Loads the specific JS module for the current URL.
 */
async function loadTool() {
    const path = window.location.pathname;
    // Default to the first tool if path is root '/'
    const toolInfo = toolRegistry.find(t => t.path === path) || toolRegistry[0];

    // Update SEO Meta Tags
    updateMetaTags(toolInfo.name, toolInfo.description);

    try {
        // Dynamically import the tool module from the /tools folder
        const tool = await import(`./tools${toolInfo.path}.js`);
        
        // Inject Header and Template
        toolApp.innerHTML = `
            <div class="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <span class="text-indigo-400 text-sm font-bold uppercase tracking-widest">${toolInfo.category}</span>
                <h2 class="text-4xl font-bold text-white mt-1">${toolInfo.name}</h2>
                <p class="mt-4 text-slate-400 max-w-2xl leading-relaxed">
                    ${toolInfo.description}
                </p>
            </div>
            <div class="tool-content">${tool.template}</div>
        `;
        
        // Initialize tool-specific logic (event listeners, etc.)
        if (tool.init) tool.init();
        
        // Update sidebar to highlight new active tool
        renderSidebar(searchInput.value);
        
    } catch (err) {
        console.error("Failed to load tool module:", err);
        toolApp.innerHTML = `
            <div class="text-center py-20">
                <h2 class="text-2xl font-bold text-white">Tool Not Found</h2>
                <p class="text-slate-500 mt-2">The tool at ${path} could not be loaded.</p>
                <a href="/" class="text-indigo-400 mt-4 inline-block underline">Return Home</a>
            </div>
        `;
    }
}

/**
 * 4. Event Listeners & Initialization
 */

// Handle search input
searchInput.addEventListener('input', (e) => renderSidebar(e.target.value));

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    loadTool();
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    loadTool();
});