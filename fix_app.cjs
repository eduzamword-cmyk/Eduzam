const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Regex to remove the ThreeDashesIcon button in the sidebar header
const sidebarRegex = /<button\s*onClick=\{\(\) => setIsDrawerOpen\(true\)\}\s*className="p-1\.5 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center"\s*title="Open Navigation Menu"\s*>\s*<ThreeDashesIcon colorClass="bg-slate-700" \/>\s*<\/button>/;

code = code.replace(sidebarRegex, '');

fs.writeFileSync('src/App.tsx', code);
