import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cleanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Skip dependencies, git folder and build outputs
        if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
          cleanDirectory(filePath);
        }
      } else {
        // AppleDouble files start with '._'
        if (file.startsWith('._')) {
          console.log(`Deleting AppleDouble file: ${filePath}`);
          fs.unlinkSync(filePath);
        }
      }
    } catch (err) {
      console.error(`Error processing path ${filePath}:`, err.message);
    }
  }
}

// Start cleaning from the root directory
const rootDir = path.resolve(__dirname, '..');
console.log(`Cleaning AppleDouble files recursively under: ${rootDir}`);
cleanDirectory(rootDir);
console.log('AppleDouble cleanup complete!');
