const fs = require('fs');
const path = require('path');

// Simple CSS minifier
function minifyCSS(css) {
    return css
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove whitespace around certain characters
        .replace(/\s*([{}:;,>+~])\s*/g, '$1')
        // Remove trailing semicolons
        .replace(/;}/g, '}')
        // Remove unnecessary whitespace
        .replace(/\s+/g, ' ')
        // Trim
        .trim();
}

// Simple JS minifier
function minifyJS(js) {
    return js
        // Remove comments (simple approach)
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')
        // Remove unnecessary whitespace
        .replace(/\s+/g, ' ')
        // Remove whitespace around operators
        .replace(/\s*([{}();,])\s*/g, '$1')
        .trim();
}

// Process CSS files
const cssFile = path.join(__dirname, 'assets', 'css', 'styles.css');
if (fs.existsSync(cssFile)) {
    const css = fs.readFileSync(cssFile, 'utf8');
    const minified = minifyCSS(css);
    fs.writeFileSync(path.join(__dirname, 'assets', 'css', 'styles.min.css'), minified);
    console.log('CSS minified successfully');
}

// Process JS files
const jsFile = path.join(__dirname, 'assets', 'js', 'script.js');
if (fs.existsSync(jsFile)) {
    const js = fs.readFileSync(jsFile, 'utf8');
    const minified = minifyJS(js);
    fs.writeFileSync(path.join(__dirname, 'assets', 'js', 'script.min.js'), minified);
    console.log('JS minified successfully');
}

const modernizrFile = path.join(__dirname, 'assets', 'js', 'modernizr-custom.js');
if (fs.existsSync(modernizrFile)) {
    const js = fs.readFileSync(modernizrFile, 'utf8');
    const minified = minifyJS(js);
    fs.writeFileSync(path.join(__dirname, 'assets', 'js', 'modernizr-custom.min.js'), minified);
    console.log('Modernizr minified successfully');
}

console.log('Build process completed!');
