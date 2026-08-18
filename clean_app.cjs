const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// We want to remove from `{/* Mobile Menu Overlay */}` to `</AnimatePresence>` for the mobile menu.
// Actually, let's just find `isMobileMenuOpen` and remove its useState and references.
code = code.replace(/const \[isMobileMenuOpen, setIsMobileMenuOpen\] = useState\(false\);\n/g, '');

const overlayRegex = /\{\/\* Mobile Menu Overlay \*\/\}\s*<AnimatePresence>\s*\{isMobileMenuOpen && \([\s\S]*?<\/motion\.div>\s*\)\}\s*<\/AnimatePresence>/g;
code = code.replace(overlayRegex, '');

fs.writeFileSync('src/App.tsx', code);
