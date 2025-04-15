import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get all test files in the tests directory
const testsDir = join(__dirname, 'tests');
const testFiles = fs.readdirSync(testsDir)
  .filter(file => file.endsWith('.test.js'))
  .map(file => join(testsDir, file));

console.log(`Found ${testFiles.length} test files to run:`);
testFiles.forEach(file => console.log(`- ${file}`));

// Run each test file sequentially
async function runTests() {
  for (const testFile of testFiles) {
    console.log(`\n========================================`);
    console.log(`Running test: ${testFile}`);
    console.log(`========================================\n`);
    
    try {
      // Run the test file as a child process
      await new Promise((resolve, reject) => {
        const process = spawn('node', [testFile], { stdio: 'inherit' });
        
        process.on('close', code => {
          if (code === 0) {
            console.log(`\n✅ Test ${testFile} completed successfully`);
            resolve();
          } else {
            console.error(`\n❌ Test ${testFile} failed with exit code ${code}`);
            resolve(); // Continue to next test even if this one fails
          }
        });
        
        process.on('error', err => {
          console.error(`\n❌ Failed to start test ${testFile}:`, err);
          resolve(); // Continue to next test even if this one fails
        });
      });
    } catch (error) {
      console.error(`Error running test ${testFile}:`, error);
    }
  }
  
  console.log(`\n========================================`);
  console.log(`All tests completed`);
  console.log(`========================================\n`);
}

runTests().catch(error => {
  console.error('Error running tests:', error);
  process.exit(1);
});
