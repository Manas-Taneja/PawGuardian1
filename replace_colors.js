const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('components');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Hex codes
    content = content.replace(/#2563EB/gi, '#003F7D');
    content = content.replace(/#3B82F6/gi, '#003366');
    content = content.replace(/#F97316/gi, '#FD7702');
    content = content.replace(/#EA580C/gi, '#FF5003');
    content = content.replace(/#6272E8/gi, '#FF8E00'); 
    content = content.replace(/#7B93F0/gi, '#FD7702');
    content = content.replace(/#FFE66D/gi, '#FF8E00');
    content = content.replace(/#282239/gi, '#002347');
    content = content.replace(/#60A5FA/gi, '#003366');
    
    // RGB replacements
    content = content.replace(/37,\s*99,\s*235/g, '0,63,125'); // #2563EB
    content = content.replace(/98,\s*114,\s*232/g, '255,142,0'); // #6272E8
    content = content.replace(/40,\s*34,\s*57/g, '0,35,71'); // #282239
    content = content.replace(/30,\s*52,\s*112/g, '0,35,71'); // #1e3470 shadows

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated ' + file);
    }
});
