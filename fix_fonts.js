const fs = require('fs');
const path = require('path');
const dir = 'c:/KUKU-IO-LED/frontend/src/Components';

fs.readdirSync(dir).filter(f => f.endsWith('.css')).forEach(f => {
    let c = fs.readFileSync(path.join(dir, f), 'utf8');
    let o = c;

    // Standardize all button font-sizes to 13px (--font-size-base equivalent)
    // Match any CSS rule block that contains a class with btn- and has font-size
    // Strategy: find font-size inside blocks where selector contains btn
    c = c.replace(/(\.(?:[a-z-]*btn[a-z-]*)[^{]*\{[^}]*?)font-size:\s*\d+px([^}]*\})/g, (match, before, after) => {
        return before + 'font-size: 13px' + after;
    });

    // Also standardize font-weight inside btn blocks to 500
    c = c.replace(/(\.(?:[a-z-]*btn[a-z-]*)[^{]*\{[^}]*?)font-weight:\s*\d+([^}]*\})/g, (match, before, after) => {
        return before + 'font-weight: 500' + after;
    });

    if (c !== o) {
        fs.writeFileSync(path.join(dir, f), c, 'utf8');
        console.log('Updated buttons in', f);
    }
});
console.log('Done button typography');
