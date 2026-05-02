const fs = require('fs');
const path = require('path');
const dir = 'c:/KUKU-IO-LED/frontend/src/Components';

// Definimos la jerarquía tipográfica proporcional por contexto:
// Konkhmer es la fuente de display/brand — Inter como fallback para caracteres especiales
const MAIN_FONT = "'Konkhmer Sleokchher', 'Inter', 'Segoe UI', system-ui, sans-serif";

fs.readdirSync(dir).filter(f => f.endsWith('.css')).forEach(f => {
    let c = fs.readFileSync(path.join(dir, f), 'utf8');
    let o = c;

    // Restaurar Konkhmer en todas las referencias de font-family que quedaron como solo Inter
    c = c.replace(/font-family:\s*'Inter',\s*'Segoe UI',\s*system-ui,\s*sans-serif;/g, `font-family: ${MAIN_FONT};`);
    c = c.replace(/font-family:\s*'Inter',\s*sans-serif;/g, `font-family: ${MAIN_FONT};`);
    c = c.replace(/font-family:\s*'Inter'[^;]*;/g, `font-family: ${MAIN_FONT};`);

    if (c !== o) {
        fs.writeFileSync(path.join(dir, f), c, 'utf8');
        console.log('Restored Konkhmer in', f);
    }
});

console.log('Done restoring Konkhmer font');
