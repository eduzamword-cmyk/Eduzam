const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf-8');
const regex = /\{\/\* Top Right Decoration: Mirrored dashes for structural symmetry \*\/\}\s*<div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-40 flex items-center pointer-events-none">\s*<div className="p-1\.5 opacity-100 transform scale-x-\[-1\]">\s*<ThreeDashesIcon colorClass="bg-slate-800" \/>\s*<\/div>\s*<\/div>/;
code = code.replace(regex, '');
fs.writeFileSync('src/components/DashboardView.tsx', code);
