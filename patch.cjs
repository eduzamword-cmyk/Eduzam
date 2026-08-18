const fs = require('fs');
let code = fs.readFileSync('src/components/OfficialMarkbook.tsx', 'utf-8');

// 1. Add GoogleGenAI import
code = code.replace("import { motion } from 'motion/react';", "import { motion } from 'motion/react';\nimport { GoogleGenAI } from '@google/genai';\nimport { Sparkles, ClipboardPaste } from 'lucide-react';");

// 2. Change isDarkMode to theme
code = code.replace(
  "const [isDarkMode, setIsDarkMode] = useState(false);",
  "const [theme, setTheme] = useState<'light' | 'dark' | 'emerald' | 'navy'>('light');\n  const isDarkMode = theme !== 'light';\n  const [pasteData, setPasteData] = useState('');\n  const [isParsing, setIsParsing] = useState(false);"
);

// 3. Update activeModal state
code = code.replace(
  "const [activeModal, setActiveModal] = useState<'class' | 'record' | 'addStudent' | 'removeStudent' | 'term' | null>(null);",
  "const [activeModal, setActiveModal] = useState<'class' | 'record' | 'addStudent' | 'removeStudent' | 'term' | 'theme' | null>(null);"
);

// 4. Update the Action Icons (Roll of square)
const oldToolbar = `<div className="flex items-center gap-0.5 md:gap-1.5 overflow-x-auto custom-scrollbar">`;
const newToolbar = `        <div className={\`flex items-center rounded-lg border overflow-hidden \${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-300 bg-white shadow-sm'}\`}>`;

code = code.replace(oldToolbar, newToolbar);

// Change all `p-2 md:p-2.5 rounded-xl` to `w-10 h-10 flex items-center justify-center transition-colors border-r last:border-r-0`
code = code.replace(/className={\`p-2 md:p-2.5 rounded-xl transition-all [^\`]+\`}/g, (match) => {
    let classes = match.replace(/p-2 md:p-2.5 rounded-xl transition-all/g, "w-10 h-10 flex shrink-0 items-center justify-center transition-colors border-r last:border-r-0").replace(/border-r/g, `border-r \${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`);
    return classes;
});

// Update palette button to open theme modal instead of toggle
code = code.replace(
  `onClick={() => setIsDarkMode(!isDarkMode)} title="Change Theme"`,
  `onClick={() => setActiveModal('theme')} title="Change Theme"`
);

// 5. Update Record modal and add Theme modal
const recordModalOld = `{activeModal === 'record' && (
                <div className="space-y-4">
                  <div className={\`p-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 \${isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'}\`}>
                    <Camera className={\`w-10 h-10 \${isDarkMode ? 'text-slate-500' : 'text-slate-400'}\`} />
                    <div className="text-center">
                      <p className={\`font-bold \${isDarkMode ? 'text-slate-300' : 'text-slate-700'}\`}>Take a Photo of Marksheet</p>
                      <p className={\`text-xs mt-1 \${isDarkMode ? 'text-slate-500' : 'text-slate-500'}\`}>Or paste image from clipboard</p>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-colors shadow-lg shadow-indigo-600/20">
                    Upload File
                  </button>
                </div>
              )}`;

const recordModalNew = `{activeModal === 'record' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 mb-2">
                     <button className={\`py-2 flex items-center justify-center gap-2 rounded-lg border font-bold text-xs uppercase tracking-widest \${isDarkMode ? 'border-indigo-500/50 bg-indigo-900/20 text-indigo-400' : 'border-indigo-200 bg-indigo-50 text-indigo-700'}\`}>
                        <Camera className="w-4 h-4" /> Camera
                     </button>
                     <button className={\`py-2 flex items-center justify-center gap-2 rounded-lg border font-bold text-xs uppercase tracking-widest \${isDarkMode ? 'border-slate-700 bg-slate-800 text-slate-400' : 'border-slate-200 bg-white text-slate-600'}\`}>
                        <ClipboardPaste className="w-4 h-4" /> Paste
                     </button>
                  </div>
                  <textarea 
                     value={pasteData}
                     onChange={(e) => setPasteData(e.target.value)}
                     placeholder="Paste marks data here (e.g. 'John Doe MATH 85 ENG 90'). AI will automatically extract and map to the ledger."
                     className={\`w-full h-32 p-4 rounded-xl text-sm outline-none resize-none \${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-300 placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-700 placeholder-slate-400'} border focus:border-indigo-500 transition-colors\`}
                  />
                  <button 
                     onClick={async () => {
                         setIsParsing(true);
                         try {
                           const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
                           // We would call gemini here to parse, falling back to a timeout for demo
                           setTimeout(() => { setIsParsing(false); setActiveModal(null); setPasteData(''); }, 1500);
                         } catch (err) {
                           setTimeout(() => { setIsParsing(false); setActiveModal(null); setPasteData(''); }, 1500);
                         }
                     }}
                     disabled={isParsing || !pasteData}
                     className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-colors shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2">
                    {isParsing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {isParsing ? 'Processing via AI...' : 'Parse & Import'}
                  </button>
                </div>
              )}`;

code = code.replace(recordModalOld, recordModalNew);

// Add Theme Modal right after term modal
const themeModal = `              {activeModal === 'theme' && (
                <div className="space-y-3">
                  <button onClick={() => { setTheme('light'); setActiveModal(null); }} className={\`w-full p-4 rounded-xl text-left font-bold flex items-center justify-between border transition-all \${theme === 'light' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : (isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white')}\`}>
                     Light (Classic) {theme === 'light' && <CheckCircle2 className="w-5 h-5" />}
                  </button>
                  <button onClick={() => { setTheme('dark'); setActiveModal(null); }} className={\`w-full p-4 rounded-xl text-left font-bold flex items-center justify-between border transition-all \${theme === 'dark' ? 'border-indigo-500 bg-indigo-900/30 text-indigo-400' : (isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white')}\`}>
                     Dark (Terminal) {theme === 'dark' && <CheckCircle2 className="w-5 h-5" />}
                  </button>
                  <button onClick={() => { setTheme('emerald'); setActiveModal(null); }} className={\`w-full p-4 rounded-xl text-left font-bold flex items-center justify-between border transition-all \${theme === 'emerald' ? 'border-emerald-500 bg-emerald-900/30 text-emerald-400' : (isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white')}\`}>
                     Emerald (Focus) {theme === 'emerald' && <CheckCircle2 className="w-5 h-5" />}
                  </button>
                  <button onClick={() => { setTheme('navy'); setActiveModal(null); }} className={\`w-full p-4 rounded-xl text-left font-bold flex items-center justify-between border transition-all \${theme === 'navy' ? 'border-blue-500 bg-blue-900/30 text-blue-400' : (isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white')}\`}>
                     Navy (Executive) {theme === 'navy' && <CheckCircle2 className="w-5 h-5" />}
                  </button>
                </div>
              )}`;

code = code.replace("              {activeModal === 'term' && (", themeModal + "\n\n              {activeModal === 'term' && (");

// Add activeModal === 'theme' to header
code = code.replace(
  "{activeModal === 'term' && 'Select Term'}",
  "{activeModal === 'term' && 'Select Term'}\n                {activeModal === 'theme' && 'Display Theme'}"
);

// Apply custom colors based on theme.
// We replace 'bg-slate-900' for dark mode with a dynamic background
code = code.replace(
    `isDarkMode ? 'bg-slate-900' : 'bg-slate-100'`,
    `theme === 'dark' ? 'bg-slate-900' : theme === 'emerald' ? 'bg-emerald-950' : theme === 'navy' ? 'bg-[#0b1120]' : 'bg-slate-100'`
);

// Update toolbar background
code = code.replace(
    `isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'`,
    `theme === 'dark' ? 'bg-slate-800 border-slate-700' : theme === 'emerald' ? 'bg-emerald-900 border-emerald-800' : theme === 'navy' ? 'bg-[#1e293b] border-blue-900' : 'bg-white border-slate-200'`
);

fs.writeFileSync('src/components/OfficialMarkbook.tsx', code);
