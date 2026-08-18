const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf-8');

const script = `
    <script>
      window.addEventListener('unhandledrejection', (event) => {
        const msg = event.reason?.message || String(event.reason);
        if (msg.toLowerCase().includes('database is closing') || msg.toLowerCase().includes('closing/hidden') || msg.toLowerCase().includes('database is hidden')) {
          event.stopImmediatePropagation();
          event.preventDefault();
        }
      }, { capture: true });
      window.addEventListener('error', (event) => {
        const msg = event.message || String(event.error);
        if (msg.toLowerCase().includes('database is closing') || msg.toLowerCase().includes('closing/hidden') || msg.toLowerCase().includes('database is hidden')) {
          event.stopImmediatePropagation();
          event.preventDefault();
        }
      }, { capture: true });
    </script>
`;

code = code.replace('<head>', '<head>' + script);
fs.writeFileSync('index.html', code);
