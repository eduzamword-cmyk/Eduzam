const fs = require('fs');
let code = fs.readFileSync('src/components/OfficialMarkbook.tsx', 'utf-8');

// The mangled class from the previous regex:
const mangled = "border-r \\${isDarkMode ? 'border-slate-700' : 'border-slate-200'} last:border-r \\${isDarkMode ? 'border-slate-700' : 'border-slate-200'}-0";
const fixed = "border-r \\${isDarkMode ? 'border-slate-700' : 'border-slate-200'} last:border-r-0";
code = code.split(mangled).join(fixed);

// We need to merge GraduationCap into the Action Icons roll.
// We can just find "{/* Action Icons */}" and replace the lines around it.

let lines = code.split('\n');
let newLines = [];
let skip = false;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('{/* Far Left: Class Selection */}')) {
        skip = true;
        continue;
    }
    if (skip && lines[i].includes('{/* Action Icons */}')) {
        skip = false;
        newLines.push("        {/* Action Icons Toolbar */}");
        newLines.push(lines[i + 1]); // This is the <div className="flex items-center rounded-lg border overflow-hidden ...">
        newLines.push("          <button onClick={() => setActiveModal('class')} title=\"Select Class\" className={`w-10 h-10 flex shrink-0 items-center justify-center transition-colors border-r ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} last:border-r-0 ${isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>");
        newLines.push("            <GraduationCap className=\"w-5 h-5\" />");
        newLines.push("          </button>");
        i++; // skip the original `<div className="...">` since we just pushed it
        continue;
    }
    if (!skip) {
        newLines.push(lines[i]);
    }
}

fs.writeFileSync('src/components/OfficialMarkbook.tsx', newLines.join('\n'));
