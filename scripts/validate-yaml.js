const fs = require('fs');
const yaml = require('js-yaml');

// Valid GitHub Actions for semantic validation
const VALID_ACTIONS = {
  'actions/checkout': ['v2', 'v3', 'v4', 'v5'],
  'actions/setup-node': ['v2', 'v3', 'v4', 'v5'],
  'softprops/action-gh-release': ['v1', 'v2'],
  'treosh/lighthouse-ci-action': ['v3', 'v8', 'v9', 'v10', 'v11'],
  'pa11y/pa11y-ci': ['v1', 'v2', 'v3'],
  'actions/upload-artifact': ['v2', 'v3', 'v4'],
};

const DEPRECATED_ACTIONS = [
  'actions/create-release@v1',
  'actions/upload-release-asset@v1',
];

function validateYamlFile(filePath) {
  let isValid = true;
  let errors = [];
  let warnings = [];

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const document = yaml.load(content);

    console.log(`🔍 Validating ${filePath}...`);

    // Basic syntax validation
    console.log(`  ✅ YAML syntax is valid`);

    // Semantic validation for GitHub Actions workflows
    if (document && typeof document === 'object') {
      // Validate workflow structure
      if (document.on || document.jobs) {
        validateWorkflowStructure(document, errors, warnings, filePath);
      }

      // Validate jobs
      if (document.jobs) {
        validateJobs(document.jobs, errors, warnings);
      }
    }

    if (errors.length > 0) {
      isValid = false;
      console.log(`  ❌ Semantic errors found:`);
      errors.forEach(error => console.log(`    - ${error}`));
    }

    if (warnings.length > 0) {
      console.log(`  ⚠️  Warnings:`);
      warnings.forEach(warning => console.log(`    - ${warning}`));
    }

    if (isValid && warnings.length === 0) {
      console.log(`  ✅ All validations passed`);
    }

    return isValid;
  } catch (error) {
    console.log(`  ❌ YAML syntax errors:`);
    console.log(`    - ${error.message}`);
    return false;
  }
}

function validateWorkflowStructure(document, errors, warnings, filePath) {
  // Check for required fields
  if (!document.name) {
    warnings.push('Workflow name is not specified');
  }

  if (!document.on) {
    errors.push('Workflow trigger (on:) is missing');
  }

  if (!document.jobs || Object.keys(document.jobs).length === 0) {
    errors.push('No jobs defined in workflow');
  }
}

function validateJobs(jobs, errors, warnings) {
  Object.entries(jobs).forEach(([jobName, job]) => {
    // Validate job structure
    if (!job['runs-on']) {
      errors.push(`Job '${jobName}' is missing 'runs-on' field`);
    }

    if (!job.steps || !Array.isArray(job.steps) || job.steps.length === 0) {
      errors.push(`Job '${jobName}' has no steps defined`);
    }

    // Validate steps
    if (job.steps) {
      job.steps.forEach((step, index) => {
        validateStep(step, index, jobName, errors, warnings);
      });
    }
  });
}

function validateStep(step, index, jobName, errors, warnings) {
  const stepId = `${jobName}[${index}]`;

  // Check for step name
  if (!step.name) {
    warnings.push(`Step ${stepId} is missing a name`);
  }

  // Validate action usage
  if (step.uses) {
    const actionParts = step.uses.split('@');
    if (actionParts.length !== 2) {
      errors.push(`Step ${stepId} has invalid action format: ${step.uses}`);
      return;
    }

    const [actionName, version] = actionParts;

    // Check for deprecated actions
    if (DEPRECATED_ACTIONS.includes(step.uses)) {
      warnings.push(`Step ${stepId} uses deprecated action: ${step.uses}`);
    }

    // Check for valid action versions
    if (VALID_ACTIONS[actionName]) {
      if (!VALID_ACTIONS[actionName].includes(version)) {
        warnings.push(
          `Step ${stepId} may be using outdated version: ${step.uses}`
        );
      }
    }
  }

  // Validate environment variables and secrets
  if (step.env) {
    Object.entries(step.env).forEach(([key, value]) => {
      if (typeof value === 'string' && value.includes('secrets.')) {
        validateSecretReference(value, stepId, warnings);
      }
    });
  }
}

function validateSecretReference(secretRef, stepId, warnings) {
  // Check for common secret reference patterns
  if (secretRef.includes('LHCI_GITHUB_APP_TOKEN')) {
    warnings.push(
      `Step ${stepId} uses LHCI_GITHUB_APP_TOKEN - verify if GITHUB_TOKEN is sufficient`
    );
  }

  // Check for proper secret syntax
  if (!secretRef.match(/\$\{\{\s*secrets\.[A-Z_]+\s*\}\}/)) {
    warnings.push(
      `Step ${stepId} has potentially malformed secret reference: ${secretRef}`
    );
  }
}

// Validate workflow files
const files = ['.github/workflows/qa.yml', '.github/workflows/release.yml'];

let allValid = true;
let totalErrors = 0;
let totalWarnings = 0;

console.log('🔧 YAML Workflow Validation Report\n');

files.forEach(file => {
  if (fs.existsSync(file)) {
    const result = validateYamlFile(file);
    if (!result) {
      allValid = false;
      totalErrors++;
    }
  } else {
    console.log(`⚠️  File not found: ${file}`);
    totalWarnings++;
  }
  console.log(''); // Add spacing between files
});

console.log('📊 Validation Summary:');
console.log(`   Files checked: ${files.length}`);
console.log(`   Errors: ${totalErrors}`);
console.log(`   Warnings: ${totalWarnings}`);

if (allValid && totalWarnings === 0) {
  console.log('\n🎉 All YAML files are valid and follow best practices!');
} else if (allValid) {
  console.log('\n✅ All YAML files are syntactically valid (warnings present)');
} else {
  console.log('\n❌ Some YAML files have errors that need to be fixed');
}

process.exit(allValid ? 0 : 1);
