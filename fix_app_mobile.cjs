const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Remove the right side button in mobile header
const rightMenuRegex = /<button\s*onClick=\{\(\) => setIsMobileMenuOpen\(!isMobileMenuOpen\)\}\s*className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"\s*>\s*\{isMobileMenuOpen \? <X className="w-6 h-6" \/> : <Menu className="w-6 h-6" \/>\}\s*<\/button>/g;

code = code.replace(rightMenuRegex, '');

fs.writeFileSync('src/App.tsx', code);
