const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const oldMain = `<main className="flex-1 lg:ml-56 min-h-screen flex flex-col relative w-full">`;
const newMain = `<main className={\`flex-1 lg:ml-56 flex flex-col relative w-full \${currentView === 'markbook' ? 'h-screen overflow-hidden' : 'min-h-screen'}\`}>`;

const oldContainer = `<div className="flex-1 w-full px-4 sm:px-6 lg:px-10 py-6">`;
const newContainer = `<div className={\`flex-1 w-full \${currentView === 'markbook' ? 'p-0 h-full flex flex-col' : 'px-4 sm:px-6 lg:px-10 py-6'}\`}>`;

code = code.replace(oldMain, newMain);
code = code.replace(oldContainer, newContainer);

// Also remove "National " from "National Portal"
const oldPortalText = `<p className="text-[10px] font-bold text-teal-700 uppercase">National Portal</p>`;
const newPortalText = `<p className="text-[10px] font-bold text-teal-700 uppercase">Portal</p>`;
code = code.replace(oldPortalText, newPortalText);

const oldCommandPortal = `<p className="text-[10px] font-bold text-teal-700 uppercase tracking-wide mt-0.5 truncate">National Command Portal</p>`;
const newCommandPortal = `<p className="text-[10px] font-bold text-teal-700 uppercase tracking-wide mt-0.5 truncate">Command Portal</p>`;
code = code.replace(oldCommandPortal, newCommandPortal);

fs.writeFileSync('src/App.tsx', code);
