const fs = require('fs');
let code = fs.readFileSync('src/components/OfficialMarkbook.tsx', 'utf-8');

code = code.replace(/h-screen overflow-hidden/g, 'h-full overflow-hidden');

fs.writeFileSync('src/components/OfficialMarkbook.tsx', code);
