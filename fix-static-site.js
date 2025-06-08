const fs = require('fs');
const path = require('path');

// Simple template processor to replace Jekyll variables and build static HTML
class SimpleTemplateProcessor {
    constructor() {
        this.siteConfig = {
            title: "Town of Wiley",
            description: "Official website of the Town of Wiley - Your rural community government providing accessible services, programs, and activities to all residents",
            url: "",
            lang: "en",
            author: "Town of Wiley Government"
        };
    }    processFile(filePath) {
        console.log(`Processing: ${filePath}`);
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if this is a properly formed HTML file
        const hasHtmlTag = content.includes('<html');
        const hasHeadTag = content.includes('<head>');
        const hasBodyTag = content.includes('<body');
        
        if (!hasHtmlTag || !hasHeadTag || !hasBodyTag) {
            // This is a Jekyll partial that needs to be wrapped in proper HTML structure
            content = this.wrapInHtmlStructure(content, filePath);
        } else {
            // This is a complete HTML file, just fix variables
            content = this.fixHtmlVariables(content);
        }
        
        fs.writeFileSync(filePath, content);
        console.log(`Fixed: ${filePath}`);
    }

    wrapInHtmlStructure(content, filePath) {
        const fileName = path.basename(filePath, '.html');
        const pageTitle = this.getPageTitle(fileName);
        
        return `<!DOCTYPE html>
<html lang="${this.siteConfig.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${this.siteConfig.description}">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; connect-src 'self'; img-src 'self' data:;">
    <meta name="theme-color" content="#8B4513">
    <meta name="author" content="${this.siteConfig.author}">
    
    <title>${pageTitle} | ${this.siteConfig.title}</title>
    
    <link rel="stylesheet" href="/assets/css/styles.css">
    <link rel="manifest" href="/manifest.json">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Modernizr for feature detection -->
    <script src="/assets/js/modernizr-custom.js"></script>
</head>
<body class="bg-amber-50 text-amber-900 font-sans">
    ${this.getHeader()}
    
    <main class="container mx-auto px-4 py-8">
        ${content}
    </main>
    
    ${this.getFooter()}
    
    <script src="/assets/js/script.js"></script>
    
    <!-- Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }
    </script>
</body>
</html>`;
    }

    fixHtmlVariables(content) {
        // Replace Jekyll variables
        content = content.replace(/site\.lang/g, this.siteConfig.lang);
        content = content.replace(/site\.title/g, this.siteConfig.title);
        content = content.replace(/site\.description/g, this.siteConfig.description);
        content = content.replace(/site\.url/g, this.siteConfig.url);
        content = content.replace(/site\.author/g, this.siteConfig.author);
        
        // Fix duplicate title tags - keep the second one
        content = content.replace(/<title>Home \| Town of Wiley<\/title>\s*<title>/g, '<title>');
        
        // Fix meta description
        content = content.replace(
            /<meta name="description" content="">/g, 
            `<meta name="description" content="${this.siteConfig.description}">`
        );
        
        // Add missing meta description if not present
        if (!content.includes('<meta name="description"')) {
            content = content.replace(
                /<meta name="theme-color"/,
                `<meta name="description" content="${this.siteConfig.description}">\n    <meta name="theme-color"`
            );
        }
        
        return content;
    }

    getPageTitle(fileName) {
        const titles = {
            'index': 'Home',
            'services': 'Services',
            'contact': 'Contact',
            'government': 'Government',
            'news': 'News',
            'accessibility': 'Accessibility',
            'privacy': 'Privacy',
            'payments': 'Payments'
        };
        return titles[fileName] || fileName.charAt(0).toUpperCase() + fileName.slice(1);
    }

    getHeader() {
        return `<header class="bg-amber-800 text-amber-50 shadow-lg">
        <div class="container mx-auto px-4 py-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                <div class="text-center md:text-left mb-4 md:mb-0">
                    <h1 class="text-3xl md:text-4xl font-bold text-amber-100">Town of Wiley</h1>
                    <p class="text-amber-200 text-lg italic mt-1">"Down Wiley Way, It's Kids and Hay"</p>
                </div>
                
                <nav class="bg-amber-700 rounded-lg p-4 md:bg-transparent md:p-0" role="navigation" aria-label="Main navigation">
                    <ul class="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
                        <li><a href="/" class="block px-3 py-2 rounded text-amber-100 hover:bg-amber-600 transition-colors duration-200" aria-current="page">Home</a></li>
                        <li><a href="/services.html" class="block px-3 py-2 rounded text-amber-100 hover:bg-amber-600 transition-colors duration-200">Services</a></li>
                        <li><a href="/government.html" class="block px-3 py-2 rounded text-amber-100 hover:bg-amber-600 transition-colors duration-200">Government</a></li>
                        <li><a href="/news.html" class="block px-3 py-2 rounded text-amber-100 hover:bg-amber-600 transition-colors duration-200">News</a></li>
                        <li><a href="/contact.html" class="block px-3 py-2 rounded text-amber-100 hover:bg-amber-600 transition-colors duration-200">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>`;
    }

    getFooter() {
        return `<footer class="bg-amber-800 text-amber-50 mt-12">
        <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-semibold mb-4 text-amber-100">Contact Information</h3>
                    <address class="not-italic text-amber-200">
                        <p>Town of Wiley</p>
                        <p>123 Main Street</p>
                        <p>Wiley, CO 80000</p>
                        <p class="mt-2">
                            <strong>Phone:</strong> <a href="tel:+1234567890" class="text-amber-100 hover:text-white">(123) 456-7890</a><br>
                            <strong>Email:</strong> <a href="mailto:info@townofwiley.gov" class="text-amber-100 hover:text-white">info@townofwiley.gov</a>
                        </p>
                    </address>
                </div>
                
                <div>
                    <h3 class="text-xl font-semibold mb-4 text-amber-100">Quick Links</h3>
                    <ul class="space-y-2 text-amber-200">
                        <li><a href="/payments.html" class="hover:text-white transition-colors duration-200">Pay Bills Online</a></li>
                        <li><a href="/accessibility.html" class="hover:text-white transition-colors duration-200">Accessibility</a></li>
                        <li><a href="/privacy.html" class="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-xl font-semibold mb-4 text-amber-100">Office Hours</h3>
                    <div class="text-amber-200">
                        <p><strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM</p>
                        <p><strong>Saturday:</strong> 9:00 AM - 12:00 PM</p>
                        <p><strong>Sunday:</strong> Closed</p>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-amber-700 mt-8 pt-6 text-center text-amber-200">
                <p>&copy; 2025 Town of Wiley. All rights reserved.</p>
                <p class="mt-2 italic">"Down Wiley Way, It's Kids and Hay"</p>
            </div>
        </div>
    </footer>`;
    }

    processDirectory(dirPath) {
        const files = fs.readdirSync(dirPath);
        
        for (const file of files) {
            const fullPath = path.join(dirPath, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                this.processDirectory(fullPath);
            } else if (path.extname(file) === '.html') {
                this.processFile(fullPath);
            }
        }
    }
}

// Process the _site directory
const processor = new SimpleTemplateProcessor();
const siteDir = path.join(__dirname, '_site');

if (fs.existsSync(siteDir)) {
    processor.processDirectory(siteDir);
    console.log('✅ Static site processing complete!');
} else {
    console.log('❌ _site directory not found');
}
