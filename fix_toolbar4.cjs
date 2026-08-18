const fs = require('fs');
let code = fs.readFileSync('src/components/OfficialMarkbook.tsx', 'utf-8');

code = code.replace(
  "className={`flex items-center rounded-lg border overflow-hidden ${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-300 bg-white shadow-sm'}`}",
  "className={`flex items-center rounded-lg border overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : theme === 'emerald' ? 'bg-emerald-900 border-emerald-800' : theme === 'navy' ? 'bg-[#1e293b] border-blue-900' : 'bg-white border-slate-200'}`}"
);

fs.writeFileSync('src/components/OfficialMarkbook.tsx', code);
