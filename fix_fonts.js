const fs = require('fs');
const path = require('path');
const dir = 'c:/KUKU-IO-LED/frontend/src/Components';

fs.readdirSync(dir).filter(f => f.endsWith('.css')).forEach(f => {
    let c = fs.readFileSync(path.join(dir, f), 'utf8');
    let o = c;

    // Replace Konkhmer Sleokchher font references
    c = c.replace(/font-family:\s*'Konkhmer Sleokchher'[^;]*;/g, "font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;");
    c = c.replace(/font-family:\s*"Konkhmer Sleokchher"[^;]*;/g, "font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;");
    
    // Replace generic Segoe UI references (not inter ones)
    c = c.replace(/font-family:\s*'Segoe UI', Roboto, Helvetica, Arial, sans-serif;/g, "font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;");
    c = c.replace(/font-family:\s*'Segoe UI', sans-serif;/g, "font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;");

    if (c !== o) {
        fs.writeFileSync(path.join(dir, f), c, 'utf8');
        console.log('Updated font-family in', f);
    }
});

// Also fix index.css
let ic = fs.readFileSync('c:/KUKU-IO-LED/frontend/src/index.css', 'utf8');
let io = ic;
ic = ic.replace(/font-family:\s*'Konkhmer Sleokchher'[^;]*;/g, "font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;");
if (ic !== io) {
    fs.writeFileSync('c:/KUKU-IO-LED/frontend/src/index.css', ic, 'utf8');
    console.log('Updated index.css');
}

console.log('Done');
