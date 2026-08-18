const fs = require('fs');
let code = fs.readFileSync('src/components/OfficialMarkbook.tsx', 'utf-8');

// The mangled class from the previous regex:
// border-r ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} last:border-r ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}-0

const mangled = "border-r \\${isDarkMode ? 'border-slate-700' : 'border-slate-200'} last:border-r \\${isDarkMode ? 'border-slate-700' : 'border-slate-200'}-0";
const fixed = "border-r \\${isDarkMode ? 'border-slate-700' : 'border-slate-200'} last:border-r-0";

code = code.split(mangled).join(fixed);

// Now, let's merge the GraduationCap button into the Action Icons roll.
// Currently it looks like this:
/*
        {/* Far Left: Class Selection *\/}
        <div className="flex items-center">
          <button onClick={() => setActiveModal('class')} title="Select Class" className={`w-10 h-10 flex shrink-0 items-center justify-center transition-colors border-r ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} last:border-r-0 ${isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <GraduationCap className="w-5 h-5" />
          </button>
          <div className={`hidden sm:block h-6 w-px mx-2 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
        </div>

        {/* Action Icons *\/}
        <div className={`flex items-center rounded-lg border overflow-hidden ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : theme === 'emerald' ? 'bg-emerald-900 border-emerald-800' : theme === 'navy' ? 'bg-[#1e293b] border-blue-900' : 'bg-white border-slate-200'}`}>
*/

const oldBlock = `        {/* Far Left: Class Selection */}
        <div className="flex items-center">
          <button onClick={() => setActiveModal('class')} title="Select Class" className={\`w-10 h-10 flex shrink-0 items-center justify-center transition-colors border-r \${isDarkMode ? 'border-slate-700' : 'border-slate-200'} last:border-r-0 \${isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}\`}>
            <GraduationCap className="w-5 h-5" />
          </button>
          <div className={\`hidden sm:block h-6 w-px mx-2 \${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}\`} />
        </div>

        {/* Action Icons */}
        <div className={\`flex items-center rounded-lg border overflow-hidden \${theme === 'dark' ? 'bg-slate-800 border-slate-700' : theme === 'emerald' ? 'bg-emerald-900 border-emerald-800' : theme === 'navy' ? 'bg-[#1e293b] border-blue-900' : 'bg-white border-slate-200'}\`}>`;

const newBlock = `        {/* Action Icons Toolbar (All Actions Merged) */}
        <div className={\`flex items-center rounded-lg border overflow-hidden \${theme === 'dark' ? 'bg-slate-800 border-slate-700' : theme === 'emerald' ? 'bg-emerald-900 border-emerald-800' : theme === 'navy' ? 'bg-[#1e293b] border-blue-900' : 'bg-white border-slate-200'}\`}>
          <button onClick={() => setActiveModal('class')} title="Select Class" className={\`w-10 h-10 flex shrink-0 items-center justify-center transition-colors border-r \${isDarkMode ? 'border-slate-700' : 'border-slate-200'} last:border-r-0 \${isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}\`}>
            <GraduationCap className="w-5 h-5" />
          </button>`;

code = code.replace(oldBlock, newBlock);

fs.writeFileSync('src/components/OfficialMarkbook.tsx', code);
