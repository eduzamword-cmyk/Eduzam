const fs = require('fs');
let code = fs.readFileSync('src/components/OfficialMarkbook.tsx', 'utf-8');

// Change w-5 h-5 to w-6 h-6 for the icons in the toolbar
// We can just regex replace them in that block.
const toolbarStart = code.indexOf('{/* Action Icons Toolbar */}');
const toolbarEnd = code.indexOf('{/* Roster Information Bar */}');

if (toolbarStart !== -1 && toolbarEnd !== -1) {
  let toolbarCode = code.substring(toolbarStart, toolbarEnd);
  // replace all w-5 h-5 with w-[22px] h-[22px] or w-6 h-6
  toolbarCode = toolbarCode.replace(/className="w-5 h-5"/g, 'className="w-6 h-6"');
  toolbarCode = toolbarCode.replace(/className={`w-5 h-5/g, 'className={`w-6 h-6');
  
  code = code.substring(0, toolbarStart) + toolbarCode + code.substring(toolbarEnd);
  fs.writeFileSync('src/components/OfficialMarkbook.tsx', code);
  console.log("Updated OfficialMarkbook.tsx icon sizes.");
} else {
  console.log("Could not find toolbar bounds.");
}
