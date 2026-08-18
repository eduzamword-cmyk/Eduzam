const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const newDiv = `<div className={\`flex-1 w-full \${currentView === 'markbook' ? 'p-0 h-screen overflow-hidden' : 'px-4 sm:px-6 lg:px-10 py-6'}\`}>`;
const oldDiv = `<div className="flex-1 w-full px-4 sm:px-6 lg:px-10 py-6">`;

if (code.includes(newDiv)) {
  code = code.replace(newDiv, oldDiv);
  fs.writeFileSync('src/App.tsx', code);
  console.log('App.tsx reverted.');
} else {
  console.log('Could not find newDiv.');
}
