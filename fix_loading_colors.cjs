const fs = require('fs');
let code = fs.readFileSync('src/components/StaffroomLoading.tsx', 'utf-8');

const oldColors = `{/* Loading Warm Colours Bar at the Top Edge */}
      <div className="absolute top-0 left-0 right-0 w-full grid grid-cols-5 h-2.5 shadow-sm z-20">
        <div className={\`transition-all duration-300 \${progress >= 20 ? 'bg-amber-400' : 'bg-slate-100'}\`} />
        <div className={\`transition-all duration-300 \${progress >= 40 ? 'bg-orange-500' : 'bg-slate-100'}\`} />
        <div className={\`transition-all duration-300 \${progress >= 60 ? 'bg-rose-500' : 'bg-slate-100'}\`} />
        <div className={\`transition-all duration-300 \${progress >= 80 ? 'bg-pink-500' : 'bg-slate-100'}\`} />
        <div className={\`transition-all duration-300 \${progress >= 100 ? 'bg-red-500' : 'bg-slate-100'}\`} />
      </div>`;

const newColors = `{/* Loading Warm Colours Bar at the Top Edge (Spaced and Softened) */}
      <div className="absolute top-0 left-0 right-0 w-full flex justify-center pt-2 z-20">
        <div className="w-full max-w-2xl grid grid-cols-5 gap-2 px-4 h-1.5">
          <div className={\`transition-all duration-500 rounded-full \${progress >= 20 ? 'bg-amber-300/80 shadow-[0_0_8px_rgba(252,211,77,0.4)]' : 'bg-slate-200'}\`} />
          <div className={\`transition-all duration-500 rounded-full \${progress >= 40 ? 'bg-orange-400/80 shadow-[0_0_8px_rgba(251,146,60,0.4)]' : 'bg-slate-200'}\`} />
          <div className={\`transition-all duration-500 rounded-full \${progress >= 60 ? 'bg-rose-400/80 shadow-[0_0_8px_rgba(251,113,133,0.4)]' : 'bg-slate-200'}\`} />
          <div className={\`transition-all duration-500 rounded-full \${progress >= 80 ? 'bg-pink-400/80 shadow-[0_0_8px_rgba(244,114,182,0.4)]' : 'bg-slate-200'}\`} />
          <div className={\`transition-all duration-500 rounded-full \${progress >= 100 ? 'bg-red-400/80 shadow-[0_0_8px_rgba(248,113,113,0.4)]' : 'bg-slate-200'}\`} />
        </div>
      </div>`;

code = code.replace(oldColors, newColors);
fs.writeFileSync('src/components/StaffroomLoading.tsx', code);
