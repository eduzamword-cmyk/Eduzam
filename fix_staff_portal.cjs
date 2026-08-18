const fs = require('fs');
let code = fs.readFileSync('src/components/StaffPortal.tsx', 'utf-8');

code = code.replace(/Official National Markbook/g, 'Official Markbook');

fs.writeFileSync('src/components/StaffPortal.tsx', code);
