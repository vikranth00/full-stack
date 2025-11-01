import { ESLint } from 'eslint';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log('Current directory:', process.cwd());
  console.log('ESLint config location:', resolve(__dirname, 'eslint.config.js'));
  
  try {
    const eslint = new ESLint({
      overrideConfig: await import('./eslint.config.js')
    });
    
    console.log('ESLint instance created');
    const results = await eslint.lintFiles(['src/**/*.{js,jsx}']);
    console.log('Files linted:', results.length);
    
    // Format the results
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = await formatter.format(results);
    
    // Output the results
    console.log(resultText);
    
    // Return exit code 1 if there are any errors
    process.exit(results.some(result => result.errorCount > 0) ? 1 : 0);
  } catch (error) {
    console.error('Detailed error:', error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Error running ESLint:', error);
  process.exit(1);
});