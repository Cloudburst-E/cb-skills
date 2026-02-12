const fs = require('fs');
const path = require('path');

// Simple adapter: map generated token names to our design-tokens keys.
const mapping = {
  'primary-color': 'color/primary/main',
  'secondary-color': 'color/secondary/main',
  'spacing-small': 'spacing/2',
};

function mapTokens(generated) {
  const mapped = {};
  for (const [k, v] of Object.entries(generated)) {
    const key = mapping[k] || k;
    mapped[key] = v;
  }
  return mapped;
}

function main() {
  const inputPath = path.resolve(process.argv[2] || 'experimental/output.json');
  if (!fs.existsSync(inputPath)) {
    console.error('No generated output found at', inputPath);
    process.exit(1);
  }
  const generated = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const mapped = mapTokens(generated.tokens || {});
  const out = { mappedTokens: mapped, notes: generated.notes || '' };
  console.log(JSON.stringify(out, null, 2));
}

if (require.main === module) main();
