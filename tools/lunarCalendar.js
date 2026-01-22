// /tools/lunarCalendar.js
export const template = `
    <div class="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
                <label class="block text-sm font-bold text-slate-500 uppercase tracking-wide">Select Gregorian Date</label>
                <input type="date" id="dateInput" 
                       class="w-full p-4 bg-slate-950 text-white border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                <button id="todayBtn" class="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg text-sm transition-all border border-slate-700">
                    Reset to Today
                </button>
            </div>

            <div class="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-center items-center text-center">
                <span class="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2">Lunar Date Result</span>
                <div id="lunarFull" class="text-2xl font-bold text-white mb-2">---</div>
                <div id="lunarDetails" class="text-slate-400 font-mono text-sm italic">---</div>
            </div>
        </div>

        <div class="mt-8 p-4 bg-indigo-900/10 border border-indigo-900/30 rounded-lg">
            <p class="text-xs text-indigo-300 leading-relaxed">
                Note: This tool uses the <strong>Intl Chinese Calendar</strong> system to calculate the Lunar year, month, and day. It provides the traditional date format based on the selected Gregorian date.
            </p>
        </div>
    </div>
`;

export function init() {
    const dateInput = document.getElementById('dateInput');
    const todayBtn = document.getElementById('todayBtn');
    const lunarFull = document.getElementById('lunarFull');
    const lunarDetails = document.getElementById('lunarDetails');

    // Set initial date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    const convertDate = (dateString) => {
        if (!dateString) return;
        const date = new Date(dateString);
        
        try {
            // Use Intl.DateTimeFormat for Chinese Calendar
            const formatter = new Intl.DateTimeFormat('zh-u-ca-chinese', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const parts = formatter.formatToParts(date);
            const getPart = (type) => parts.find(p => p.type === type).value;

            // Display in Chinese format
            lunarFull.innerText = formatter.format(date);
            
            // Extract numeric parts for English detail view
            lunarDetails.innerText = `Year: ${getPart('year')} | Month: ${getPart('month')} | Day: ${getPart('day')}`;
        } catch (e) {
            lunarFull.innerText = "Error";
            lunarDetails.innerText = "Invalid Date Selection";
        }
    };

    dateInput.onchange = (e) => convertDate(e.target.value);
    todayBtn.onclick = () => {
        dateInput.value = today;
        convertDate(today);
    };

    // Run once on load
    convertDate(today);
}