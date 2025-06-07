const fs = require('fs');
const yaml = require('js-yaml');

function validateYamlFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    yaml.load(content);
    console.log(`✅ ${filePath} syntax is valid`);
    return true;
  } catch (error) {
    console.log(`❌ ${filePath} has syntax errors:`);
    console.log(error.message);
    return false;
  }
}

// Validate workflow files
const files = [
  '.github/workflows/qa.yml',
  '.github/workflows/release.yml'
];

let allValid = true;
files.forEach(file => {
  if (!validateYamlFile(file)) {
    allValid = false;
  }
});

console.log(allValid ? '\n🎉 All YAML files are valid!' : '\n⚠️  Some YAML files have errors');
process.exit(allValid ? 0 : 1);
