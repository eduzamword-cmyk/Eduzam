const fs = require('fs');

const original = fs.readFileSync('/tmp/old_markbook.txt', 'utf-8');

// Find imports
const importEnd = original.indexOf('const SUBJECTS = [');
let imports = original.substring(0, importEnd);
if (!imports.includes('firebase')) {
    imports += `import { useEffect, useCallback } from 'react';\n`;
    imports += `import { collection, doc, setDoc, onSnapshot, writeBatch } from 'firebase/firestore';\n`;
    imports += `import { db } from '../lib/firebase';\n\n`;
}

// Find component start
const compStart = original.indexOf('export default function OfficialMarkbook() {');
const preComp = original.substring(importEnd, compStart);

const returnStart = original.indexOf('  return (', compStart);

const newState = `export default function OfficialMarkbook() {
  const [students, setStudents] = useState<any[]>([]);
  const [marksMap, setMarksMap] = useState<Record<string, Record<string, string>>>({});
  const [subjects, setSubjects] = useState(SUBJECTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);
  const [keypadExpanded, setKeypadExpanded] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'emerald' | 'navy'>('light');
  const isDarkMode = theme !== 'light';
  const [pasteData, setPasteData] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeModal, setActiveModal] = useState<'class' | 'record' | 'addStudent' | 'removeStudent' | 'term' | 'theme' | null>(null);
  
  const [selectedCell, setSelectedCell] = useState<{studentId: string; subject: string} | null>(null);
  const [tempMarkValue, setTempMarkValue] = useState<string>('');

  useEffect(() => {
     const unsubStudents = onSnapshot(collection(db, 'students'), (snap) => {
        if (snap.empty) {
           seedInitialData();
        } else {
           setStudents(snap.docs.map(d => ({ dbId: d.id, ...d.data() })));
        }
     });

     const unsubMarks = onSnapshot(collection(db, 'marks'), (snap) => {
        const newMap: Record<string, Record<string, string>> = {};
        snap.docs.forEach(d => {
           const data = d.data();
           if (data.studentId && data.subject && data.total !== undefined) {
              if (!newMap[data.studentId]) newMap[data.studentId] = {};
              newMap[data.studentId][data.subject] = data.total;
           }
        });
        setMarksMap(newMap);
     });

     return () => { unsubStudents(); unsubMarks(); };
  }, []);

  const seedInitialData = async () => {
      setIsSyncing(true);
      const batch = writeBatch(db);
      
      INITIAL_STUDENTS.forEach((stu, i) => {
         const studentId = 'stu_' + stu.id.replace(/[^a-zA-Z0-9]/g, '_');
         const studentRef = doc(collection(db, 'students'), studentId);
         batch.set(studentRef, {
            name: stu.name,
            nrc: stu.id,
            grade: 'Grade 12',
            school: 'National High'
         });
         
         SUBJECTS.forEach(sub => {
            if ((stu as any)[sub.code] !== undefined) {
               const markRef = doc(collection(db, 'marks'), studentId + '_' + sub.code);
               batch.set(markRef, {
                  studentId: studentId,
                  studentName: stu.name,
                  subject: sub.code,
                  total: String((stu as any)[sub.code])
               });
            }
         });
      });
      
      try {
          await batch.commit();
      } catch (e) {
          console.error("Failed to seed", e);
      }
      setIsSyncing(false);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  const handleLockAll = () => {
    const allLocked = subjects.every(s => s.locked);
    setSubjects(subjects.map(s => ({ ...s, locked: !allLocked })));
  };

  const handleCellClick = (studentId: string, subjectCode: string, currentValue: string) => {
     const sub = subjects.find(s => s.code === subjectCode);
     if (sub?.locked) return; 

     setSelectedCell({ studentId, subject: subjectCode });
     setTempMarkValue(currentValue || '');
     setShowKeypad(true);
  };

  const handleKeypadPress = (key: string) => {
     if (key === 'Del') {
        setTempMarkValue(prev => prev.slice(0, -1));
     } else {
        setTempMarkValue(prev => prev + key);
     }
  };

  const handleSubmitMark = async () => {
     if (!selectedCell) return;
     
     const student = students.find(s => s.dbId === selectedCell.studentId);
     const docId = selectedCell.studentId + '_' + selectedCell.subject;
     const markRef = doc(collection(db, 'marks'), docId);
     
     await setDoc(markRef, {
        studentId: selectedCell.studentId,
        studentName: student?.name || 'Unknown',
        subject: selectedCell.subject,
        total: tempMarkValue
     }, { merge: true });
     
     setSelectedCell(null);
     setTempMarkValue('');
  };

  const filteredStudents = students.filter(s => 
     s.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     s.nrc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     s.dbId?.toLowerCase().includes(searchTerm.toLowerCase())
  );
`;

let restOfFile = original.substring(returnStart);

restOfFile = restOfFile.replace(
    /onClick=\{\(\) => setShowKeypad\(!showKeypad\)\}/g,
    "onClick={() => { setShowKeypad(!showKeypad); setSelectedCell(null); }}"
);

const oldCellDiv = `<div className={\`inline-flex items-center justify-center w-12 h-9 md:w-14 md:h-10 rounded-lg md:rounded-xl border transition-all cursor-pointer \${isDarkMode ? 'bg-slate-800 border-slate-700 group-hover:border-indigo-500/50 text-slate-300' : 'bg-white border-slate-100 group-hover:border-indigo-200 group-hover:shadow-sm text-slate-700'}\`}>`;
const newCellDiv = `<div 
                      onClick={() => handleCellClick(student.dbId, sub.code, marksMap[student.dbId]?.[sub.code] || '')}
                      className={\`inline-flex items-center justify-center w-12 h-9 md:w-14 md:h-10 rounded-lg md:rounded-xl border transition-all \${sub.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} \${selectedCell?.studentId === student.dbId && selectedCell?.subject === sub.code ? 'ring-2 ring-indigo-500 bg-indigo-50/50 text-indigo-700' : isDarkMode ? 'bg-slate-800 border-slate-700 group-hover:border-indigo-500/50 text-slate-300' : 'bg-white border-slate-100 group-hover:border-indigo-200 group-hover:shadow-sm text-slate-700'}\`}>`;

restOfFile = restOfFile.replace(oldCellDiv, newCellDiv);

const oldSpan = `<span className="font-black text-sm md:text-base">{(student as any)[sub.code]}</span>`;
const newSpan = `<span className={\`font-black text-sm md:text-base \${selectedCell?.studentId === student.dbId && selectedCell?.subject === sub.code ? 'animate-pulse text-indigo-600' : ''}\`}>
                        {selectedCell?.studentId === student.dbId && selectedCell?.subject === sub.code ? tempMarkValue : (marksMap[student.dbId]?.[sub.code] || '-')}
                      </span>`;

restOfFile = restOfFile.replace(oldSpan, newSpan);

const oldIdSpan = `<span className={\`font-bold text-[10px] md:text-sm tracking-tight md:tracking-[0.1em] font-mono truncate max-w-[90px] md:max-w-none block \${isDarkMode ? 'text-slate-500' : 'text-slate-400'}\`}>{student.id}</span>`;
const newIdSpan = `<span className={\`font-bold text-[10px] md:text-sm tracking-tight md:tracking-[0.1em] font-mono truncate max-w-[90px] md:max-w-none block \${isDarkMode ? 'text-slate-500' : 'text-slate-400'}\`}>{student.nrc || student.dbId}</span>`;

restOfFile = restOfFile.replace(oldIdSpan, newIdSpan);


const oldKeyMap = `{['7','8','9','4','5','6','1','2','3','.','0','Del'].map(key => (
                <button key={key} className={\`bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-lg flex items-center justify-center font-bold transition-colors border border-slate-700/50 \${keypadExpanded ? 'py-4 text-xl rounded-xl' : 'py-2 text-base'}\`}>
                  {key}
                </button>
             ))}`;
const newKeyMap = `{['7','8','9','4','5','6','1','2','3','.','0','Del'].map(key => (
                <button key={key} onClick={() => handleKeypadPress(key)} className={\`bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-lg flex items-center justify-center font-bold transition-colors border border-slate-700/50 \${keypadExpanded ? 'py-4 text-xl rounded-xl' : 'py-2 text-base'}\`}>
                  {key}
                </button>
             ))}`;

restOfFile = restOfFile.replace(oldKeyMap, newKeyMap);

const oldSubmitMark = `<button className={\`\${keypadExpanded ? 'col-span-4 py-4 text-sm mt-4 rounded-xl' : 'col-span-3 py-2 text-[10px] mt-1 rounded-lg'} bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 font-black tracking-widest uppercase transition-colors shadow-lg shadow-indigo-900/50\`}>
               Submit Mark
             </button>`;
const newSubmitMark = `<button onClick={handleSubmitMark} disabled={!selectedCell} className={\`\${keypadExpanded ? 'col-span-4 py-4 text-sm mt-4 rounded-xl' : 'col-span-3 py-2 text-[10px] mt-1 rounded-lg'} bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-black tracking-widest uppercase transition-colors shadow-lg shadow-indigo-900/50\`}>
               {selectedCell ? 'Submit ' + selectedCell.subject : 'Submit Mark'}
             </button>`;

restOfFile = restOfFile.replace(oldSubmitMark, newSubmitMark);

fs.writeFileSync('src/components/OfficialMarkbook.tsx', imports + preComp + newState + restOfFile);
console.log("Rewrote OfficialMarkbook.tsx successfully");
