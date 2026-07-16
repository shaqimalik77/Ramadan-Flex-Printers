const fs = require('fs');
const path = require('path');

const directories = ['data', 'components', 'app'];

function processDirectory(dir) {
  const absoluteDir = path.join(process.cwd(), dir);
  if (!fs.existsSync(absoluteDir)) return;
  
  const files = fs.readdirSync(absoluteDir);
  for (const file of files) {
    const filePath = path.join(absoluteDir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(path.join(dir, file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;
      if (content.includes('"/images/')) {
        content = content.replace(/"\/images\//g, '"/Images/');
        changed = true;
      }
      if (content.includes("'/images/")) {
        content = content.replace(/'\/images\//g, "'/Images/");
        changed = true;
      }
      if (changed) {
        console.log(`Fixing casing in: ${filePath}`);
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  }
}

processDirectory('data');
processDirectory('components');
processDirectory('app');
console.log('Casing fix completed successfully!');
