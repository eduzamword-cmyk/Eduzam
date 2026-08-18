const fs = require('fs');
let code = fs.readFileSync('src/components/StaffPortal.tsx', 'utf-8');

const oldHeader = `<h2 className="text-3xl font-black text-slate-800 tracking-tight">NATIONAL STAFFROOM PORTAL</h2>`;
const newHeader = `<h2 className="text-3xl font-black text-slate-800 tracking-tight">Explore your staffroom space.</h2>`;
code = code.replace(oldHeader, newHeader);

// Professionalize buttons: Instead of loud gradients, use professional sleek cards
const oldButtons = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-5xl mx-auto px-4">
            <button
              onClick={() => setActiveTab('notices')}
              className="group py-6 px-4 rounded-[16px] text-xs font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-3 shadow-md bg-gradient-to-br from-purple-600 to-pink-600 text-white hover:scale-[1.02] active:scale-95"
            >
              <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                <Bell className="w-6 h-6" />
              </div>
              Notices
            </button>
            <button
              onClick={() => setActiveTab('directory')}
              className="group py-6 px-4 rounded-[16px] text-xs font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-3 shadow-md bg-gradient-to-br from-emerald-600 to-teal-700 text-white hover:scale-[1.02] active:scale-95"
            >
              <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              Directory
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className="group py-6 px-4 rounded-[16px] text-xs font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-3 shadow-md bg-gradient-to-br from-blue-600 to-cyan-600 text-white hover:scale-[1.02] active:scale-95"
            >
              <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              Documents
            </button>
            <button
              onClick={() => setActiveTab('leave')}
              className="group py-6 px-4 rounded-[16px] text-xs font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-3 shadow-md bg-gradient-to-br from-amber-600 to-orange-600 text-white hover:scale-[1.02] active:scale-95"
            >
              <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                <CalendarDays className="w-6 h-6" />
              </div>
              Leave & Admin
            </button>
          </div>`;

const newButtons = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto px-4">
            <button
              onClick={() => setActiveTab('notices')}
              className="group py-8 px-6 rounded-2xl transition-all flex flex-col items-center justify-center gap-4 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 active:scale-[0.98]"
            >
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                <Bell className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-700">Notices</span>
            </button>
            <button
              onClick={() => setActiveTab('directory')}
              className="group py-8 px-6 rounded-2xl transition-all flex flex-col items-center justify-center gap-4 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 active:scale-[0.98]"
            >
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-700">Directory</span>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className="group py-8 px-6 rounded-2xl transition-all flex flex-col items-center justify-center gap-4 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 active:scale-[0.98]"
            >
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-700">Documents</span>
            </button>
            <button
              onClick={() => setActiveTab('leave')}
              className="group py-8 px-6 rounded-2xl transition-all flex flex-col items-center justify-center gap-4 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 active:scale-[0.98]"
            >
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 group-hover:text-amber-600 group-hover:bg-amber-50 transition-colors">
                <CalendarDays className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-700">Leave & Admin</span>
            </button>
          </div>`;

code = code.replace(oldButtons, newButtons);
fs.writeFileSync('src/components/StaffPortal.tsx', code);
