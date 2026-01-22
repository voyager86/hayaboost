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
    </div>
`;

export function init() {
    const dateInput = document.getElementById('dateInput');
    const todayBtn = document.getElementById('todayBtn');
    const lunarFull = document.getElementById('lunarFull');
    const lunarDetails = document.getElementById('lunarDetails');

    const convertDate = (dateString) => {
        if (!dateString) return;

        // Use local time initialization to prevent off-by-one errors
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);
        
        if (isNaN(date.getTime())) {
            lunarFull.innerText = "Error";
            lunarDetails.innerText = "Invalid Date Selection";
            return;
        }

        try {
            // Options for Chinese Calendar
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            
            // Try standard BCP 47 locale tag first
            const formatter = new Intl.DateTimeFormat('zh-Hans-CN-u-ca-chinese', options);
            
            const formatted = formatter.format(date);
            const parts = formatter.formatToParts(date);
            
            const getPart = (type) => {
                const part = parts.find(p => p.type === type);
                return part ? part.value : 'N/A';
            };

            lunarFull.innerText = formatted;
            lunarDetails.innerText = `Year: ${getPart('year')} | Month: ${getPart('month')} | Day: ${getPart('day')}`;
        } catch (e) {
            console.error("Intl error:", e);
            lunarFull.innerText = "Not Supported";
            lunarDetails.innerText = "Please use a modern version of Chrome or Edge.";
        }
    };

    dateInput.onchange = (e) => convertDate(e.target.value);
    
    todayBtn.onclick = () => {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        const todayStr = `${y}-${m}-${d}`;
        dateInput.value = todayStr;
        convertDate(todayStr);
    };

    // Auto-trigger on first load
    todayBtn.click();
}