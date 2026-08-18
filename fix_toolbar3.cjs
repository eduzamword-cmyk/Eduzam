const fs = require('fs');
let code = fs.readFileSync('src/components/OfficialMarkbook.tsx', 'utf-8');

// Replace the mangled `last:border-r ${...}-0` with `last:border-r-0`
// The literal text in the file is:
// border-r ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} last:border-r ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}-0

code = code.replace(/last:border-r \$\{isDarkMode \? 'border-slate-700' : 'border-slate-200'\}-0/g, 'last:border-r-0');

fs.writeFileSync('src/components/OfficialMarkbook.tsx', code);
