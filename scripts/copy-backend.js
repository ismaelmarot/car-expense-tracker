const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'car-expense-tracker-backend');
const destMac = path.join(__dirname, '..', 'dist', 'mac-arm64', 'Car_Expense_Tracker.app', 'Contents', 'Resources', 'car-expense-tracker-backend');

function copyFolder(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') {
        copyFolder(srcPath, destPath);
      } else if (entry.name !== '.git') {
        copyFolder(srcPath, destPath);
      }
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copiando backend a la app...');
copyFolder(src, destMac);
console.log('Backend copiado exitosamente!');
