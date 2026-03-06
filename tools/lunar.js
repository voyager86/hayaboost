// /tools/lunar.js
export const template = `
    <div class="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
                <label class="block text-sm font-bold text-slate-500 uppercase tracking-wide">选择公历日期</label>
                <input type="date" id="lunarDateInput" 
                       class="w-full p-4 bg-slate-950 text-white border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            </div>

            <div class="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center">
                <div id="lunarResult" class="text-3xl font-bold text-indigo-400 mb-2">---</div>
                <div id="zodiacResult" class="text-slate-400 text-lg">---</div>
            </div>
        </div>

        <div class="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                <span class="block text-[10px] text-slate-500 uppercase font-bold">干支纪年</span>
                <span id="ganzhiYear" class="text-white font-medium">---</span>
            </div>
            <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                <span class="block text-[10px] text-slate-500 uppercase font-bold">干支纪月</span>
                <span id="ganzhiMonth" class="text-white font-medium">---</span>
            </div>
            <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                <span class="block text-[10px] text-slate-500 uppercase font-bold">干支纪日</span>
                <span id="ganzhiDay" class="text-white font-medium">---</span>
            </div>
        </div>
    </div>
`;

export function init() {
    const input = document.getElementById('lunarDateInput');
    const lunarResult = document.getElementById('lunarResult');
    const zodiacResult = document.getElementById('zodiacResult');
    const gzYear = document.getElementById('ganzhiYear');
    const gzMonth = document.getElementById('ganzhiMonth');
    const gzDay = document.getElementById('ganzhiDay');

    const updateCalendar = (dateStr) => {
        if (!dateStr) return;
        
        // Use local time parsing
        const [y, m, d] = dateStr.split('-');
        const date = new Date(y, m - 1, d);
        
        // Library logic
        const solar = Solar.fromDate(date);
        const lunar = solar.getLunar();

        // Output results
        lunarResult.innerText = `${lunar.getYearInChinese()}年 ${lunar.getMonthInChinese()}月 ${lunar.getDayInChinese()}`;
        zodiacResult.innerText = `生肖: ${lunar.getYearShengXiao()} (${lunar.getYearZhi()}年)`;
        
        // Stem-Branch details
        gzYear.innerText = `${lunar.getYearInGanZhi()} (${lunar.getYearNaYin()})`;
        gzMonth.innerText = lunar.getMonthInGanZhi();
        gzDay.innerText = lunar.getDayInGanZhi();
    };

    input.value = new Date().toISOString().split('T')[0];
    input.onchange = (e) => updateCalendar(e.target.value);
    updateCalendar(input.value);
}