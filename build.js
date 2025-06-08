#!/usr/bin/env node

/**
 * Simple Jekyll-like Static Site Generator
 * Processes Markdown files and Jekyll-style includes without requiring Ruby
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

class SimpleJekyll {
    constructor(sourceDir = '.', outputDir = '_site') {
        this.sourceDir = sourceDir;
        this.outputDir = outputDir;
        this.config = this.loadConfig();
        this.includes = {};
        this.layouts = {};
    }    loadConfig() {
        try {
            const configPath = path.join(this.sourceDir, '_config.yml');
            if (fs.existsSync(configPath)) {
                // Simple YAML parser for basic config
                const content = fs.readFileSync(configPath, 'utf8');
                const config = {};
                content.split('\n').forEach(line => {
                    // Skip comments and empty lines
                    line = line.trim();
                    if (line.startsWith('#') || line === '') return;
                    
                    const match = line.match(/^(\w+):\s*(.+)$/);
                    if (match) {
                        let value = match[2].trim();
                        
                        // Remove inline comments
                        const commentIndex = value.indexOf(' #');
                        if (commentIndex > 0) {
                            value = value.substring(0, commentIndex).trim();
                        }
                        
                        // Remove quotes if present
                        if ((value.startsWith('"') && value.endsWith('"')) || 
                            (value.startsWith("'") && value.endsWith("'"))) {
                            value = value.slice(1, -1);
                        }
                        
                        // Handle empty strings
                        if (value === '""' || value === "''") {
                            value = '';
                        }
                        
                        config[match[1]] = value;
                    }
                });
                console.log('Loaded config:', config);
                return config;
            }
        } catch (err) {
            console.warn('Could not load _config.yml, using defaults:', err.message);
        }
        return {
            title: 'Town of Wiley',
            description: 'Official Website',
            baseurl: '',
            url: '',
            lang: 'en'
        };
    }

    loadIncludes() {
        const includesDir = path.join(this.sourceDir, '_includes');
        if (!fs.existsSync(includesDir)) return;

        fs.readdirSync(includesDir).forEach(file => {
            if (file.endsWith('.html')) {
                const name = path.basename(file, '.html');
                const content = fs.readFileSync(path.join(includesDir, file), 'utf8');
                this.includes[name] = content;
            }
        });
    }

    loadLayouts() {
        const layoutsDir = path.join(this.sourceDir, '_layouts');
        if (!fs.existsSync(layoutsDir)) return;

        fs.readdirSync(layoutsDir).forEach(file => {
            if (file.endsWith('.html')) {
                const name = path.basename(file, '.html');
                const content = fs.readFileSync(path.join(layoutsDir, file), 'utf8');
                this.layouts[name] = content;
            }
        });
    }

    processIncludes(content) {
        return content.replace(/\{\%\s*include\s+([^\s]+)\s*\%\}/g, (match, includeName) => {
            const name = includeName.replace('.html', '');
            return this.includes[name] || match;
        });
    }    processFrontMatter(content) {
        const frontMatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
        if (!frontMatterMatch) {
            return { frontMatter: {}, content };
        }

        const frontMatter = {};
        frontMatterMatch[1].split(/\r?\n/).forEach(line => {
            const match = line.match(/^(\w+):\s*(.+)$/);
            if (match) {
                let value = match[2].replace(/^["']|["']$/g, ''); // Remove quotes
                frontMatter[match[1]] = value;
            }
        });

        return {
            frontMatter,
            content: frontMatterMatch[2]
        };
    }    processVariables(content, variables = {}) {
        const allVars = { 
            site: this.config, 
            page: variables.page || {},
            ...variables 
        };
        
        // First handle relative_url filter specifically
        content = content.replace(/\{\{\s*['"]([^'"]*)['"]\s*\|\s*relative_url\s*\}\}/g, (match, path) => {
            return allVars.site.baseurl ? allVars.site.baseurl + path : path;
        });
        
        // Process Jekyll {{ variable }} syntax
        content = content.replace(/\{\{\s*([^}]+)\s*\}\}/g, (match, varExpression) => {
            try {
                // Handle filters like | default: 'value'
                const parts = varExpression.split('|').map(p => p.trim());
                let varPath = parts[0].trim();
                let value = this.getNestedValue(allVars, varPath);
                
                // Process filters
                for (let i = 1; i < parts.length; i++) {
                    const filter = parts[i];
                    if (filter.startsWith('default:')) {
                        const defaultValue = filter.replace('default:', '').trim().replace(/^["']|["']$/g, '');
                        if (value === undefined || value === null || value === '') {
                            value = defaultValue;
                        }
                    }
                }
                
                return value !== undefined && value !== null ? String(value) : '';
            } catch (e) {
                console.warn(`Error processing variable: ${varExpression}`, e);
                return '';
            }
        });

        // Process Jekyll liquid tags like {% seo %} (simple removal for now)
        content = content.replace(/\{\%\s*[^%]*\s*\%\}/g, '');

        // Replace {{ content }} in layouts
        content = content.replace(/\{\{\s*content\s*\}\}/g, variables.content || '');

        return content;
    }

    getNestedValue(obj, path) {
        try {
            return path.split('.').reduce((current, key) => {
                return current && current[key] !== undefined ? current[key] : undefined;
            }, obj);
        } catch (e) {
            return undefined;
        }
    }

    processPage(filePath, outputPath) {
        let content = fs.readFileSync(filePath, 'utf8');
        const { frontMatter, content: pageContent } = this.processFrontMatter(content);
        
        let processedContent = pageContent;
        
        // Convert Markdown to HTML if needed
        if (filePath.endsWith('.md')) {
            processedContent = marked(processedContent);
        }

        // Process includes
        processedContent = this.processIncludes(processedContent);

        // Apply layout if specified
        if (frontMatter.layout && this.layouts[frontMatter.layout]) {
            let layoutContent = this.layouts[frontMatter.layout];
            layoutContent = this.processIncludes(layoutContent);
            layoutContent = this.processVariables(layoutContent, {
                page: frontMatter,
                content: processedContent
            });
            processedContent = layoutContent;
        }

        // Process variables
        processedContent = this.processVariables(processedContent, {
            page: frontMatter
        });

        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write processed content
        fs.writeFileSync(outputPath, processedContent);
        console.log(`Generated: ${outputPath}`);
    }

    copyAssets() {
        const assetsDir = path.join(this.sourceDir, 'assets');
        const outputAssetsDir = path.join(this.outputDir, 'assets');

        if (fs.existsSync(assetsDir)) {
            this.copyDirectory(assetsDir, outputAssetsDir);
        }
    }

    copyDirectory(src, dest) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        fs.readdirSync(src).forEach(item => {
            const srcPath = path.join(src, item);
            const destPath = path.join(dest, item);

            if (fs.statSync(srcPath).isDirectory()) {
                this.copyDirectory(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
                console.log(`Copied: ${destPath}`);
            }
        });
    }

    build() {
        console.log('Building static site...');

        // Clean output directory
        if (fs.existsSync(this.outputDir)) {
            fs.rmSync(this.outputDir, { recursive: true });
        }
        fs.mkdirSync(this.outputDir);

        // Load templates
        this.loadIncludes();
        this.loadLayouts();

        // Process index page
        if (fs.existsSync('index.md')) {
            this.processPage('index.md', path.join(this.outputDir, 'index.html'));
        } else if (fs.existsSync('index.html')) {
            this.processPage('index.html', path.join(this.outputDir, 'index.html'));
        }

        // Process pages
        const pagesDir = '_pages';
        if (fs.existsSync(pagesDir)) {
            fs.readdirSync(pagesDir).forEach(file => {
                if (file.endsWith('.md') || file.endsWith('.html')) {
                    const basename = path.basename(file, path.extname(file));
                    const outputPath = path.join(this.outputDir, `${basename}.html`);
                    this.processPage(path.join(pagesDir, file), outputPath);
                }
            });
        }

        // Process posts (simplified - just copy to posts directory)
        const postsDir = '_posts';
        const outputPostsDir = path.join(this.outputDir, 'posts');
        if (fs.existsSync(postsDir)) {
            if (!fs.existsSync(outputPostsDir)) {
                fs.mkdirSync(outputPostsDir);
            }
            
            fs.readdirSync(postsDir).forEach(file => {
                if (file.endsWith('.md')) {
                    const match = file.match(/(\d{4}-\d{2}-\d{2})-(.*).md/);
                    if (match) {
                        const outputPath = path.join(outputPostsDir, `${match[2]}.html`);
                        this.processPage(path.join(postsDir, file), outputPath);
                    }
                }
            });
        }

        // Copy assets
        this.copyAssets();

        console.log('Build complete!');
    }

    serve(port = 3000) {
        console.log(`Starting development server on http://localhost:${port}`);
        
        // Simple HTTP server
        const http = require('http');
        const url = require('url');
        const mime = require('mime-types');

        const server = http.createServer((req, res) => {
            let pathname = url.parse(req.url).pathname;
            
            // Default to index.html
            if (pathname === '/') {
                pathname = '/index.html';
            }

            const filePath = path.join(this.outputDir, pathname);
            
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                const ext = path.extname(filePath);
                const mimeType = mime.lookup(ext) || 'text/plain';
                
                res.writeHead(200, { 'Content-Type': mimeType });
                fs.createReadStream(filePath).pipe(res);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
        });

        server.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`);
        });
    }
}

// CLI usage
if (require.main === module) {
    const command = process.argv[2];
    const jekyll = new SimpleJekyll();

    switch (command) {
        case 'build':
            jekyll.build();
            break;
        case 'serve':
            jekyll.build();
            jekyll.serve(3000);
            break;
        default:
            console.log('Usage: node build.js [build|serve]');
            console.log('  build - Build the static site');
            console.log('  serve - Build and serve the site locally');
    }
}

module.exports = SimpleJekyll;
