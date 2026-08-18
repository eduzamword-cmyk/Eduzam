const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const oldMotion = `className="w-full"
            >
              {renderView()}
            </motion.div>`;
const newMotion = `className={\`w-full \${currentView === 'markbook' ? 'h-full flex flex-col' : ''}\`}
            >
              {renderView()}
            </motion.div>`;

code = code.replace(oldMotion, newMotion);
fs.writeFileSync('src/App.tsx', code);
