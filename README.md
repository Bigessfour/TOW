# Town of Wiley - Official Government Website

A modern, accessible, and comprehensive municipal website built to serve the rural community of Wiley with excellence, transparency, and full ADA compliance.

## 🌟 Key Features

### ✅ ADA Compliance & Accessibility
- **WCAG 2.1 Level AA Compliant** - Meets 2024 ADA requirements for government websites
- Semantic HTML structure with proper heading hierarchy
- ARIA labels and live regions for screen readers
- Keyboard navigation support with visible focus indicators
- Skip links for easy navigation
- Alternative text for all images
- High contrast mode and adjustable text sizes
- Screen reader mode with enhanced announcements
- Multi-language support (English/Spanish toggle)

### 🚨 Emergency Management
- **Emergency Alerts Banner** - Real-time emergency notifications
- **Mass Notification System** - SMS, email, and voice alert signup
- Multiple alert types: Emergency, Service Disruptions, Meetings, Events
- Alert level indicators and timestamps
- Accessible emergency announcements

### 💼 Government Services
- **Online Payment Portal** - Utilities, taxes, permits, fines
- **Digital Forms & Applications** - Building permits, business licenses, service requests
- **Document Repository** - Searchable access to public documents
- **Meeting Calendar** - Town council and committee schedules
- **Official News & Announcements**

### 🏪 Community Features
- **Local Business Directory** - Searchable business listings with categories
- **Community Calendar** - Events and public meetings
- **Newsletter Signup** - Stay informed about town activities
- **Social Media Integration** - Connect with town social channels
- **Community Feedback System** - Public input and surveys

### 🔐 Privacy & Security
- **GDPR/CCPA Compliant** - Comprehensive privacy policy
- **Cookie Consent Management** - Granular cookie controls
- **Secure Payment Processing** - Encrypted financial transactions
- **Data Protection Measures** - SSL encryption and access controls

### 🔍 Advanced Functionality
- **Intelligent Site Search** - Search across all content with suggestions
- **Responsive Design** - Mobile-first approach for all devices
- **Progressive Enhancement** - Works without JavaScript
- **Performance Optimized** - Fast loading and efficient code
- **Analytics Integration** - Privacy-compliant usage tracking

## 📁 Project Structure

```
Town of Wiley/
├── index.html              # Main website file
├── styles.css              # Responsive CSS styling
├── script.js               # Interactive JavaScript
├── README.md               # This documentation
├── .github/
│   └── copilot-instructions.md  # Development guidelines
└── .vscode/
    └── tasks.json          # VS Code tasks
```

## 🛠️ Technical Implementation

### HTML5 Features
- Semantic markup with proper sections
- Form validation attributes
- Microdata for search engines
- Accessible form controls

### CSS3 Features
- CSS Grid and Flexbox layouts
- Custom properties (CSS variables)
- Media queries for responsive design
- CSS animations and transitions
- Print stylesheets

### JavaScript Features
- ES6+ modern syntax
- Progressive enhancement
- Event delegation
- Local storage for preferences
- Performance monitoring
- Accessibility enhancements

## 📱 Responsive Design

The website is fully responsive across all device sizes:

- **Mobile** (320px - 768px): Stack layout, touch-friendly controls
- **Tablet** (769px - 1024px): Balanced layout with readable content
- **Desktop** (1025px+): Full-width layout with sidebar content

## ♿ Accessibility Features

### Compliance Standards
- WCAG 2.1 Level AA compliance
- Section 508 compliance
- ADA Title II requirements for government websites

### Assistive Technology Support
- Screen reader compatibility (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation
- Voice recognition software support
- High contrast mode for vision impairments

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher) - For development tools and validation
- **Git** - For version control and deployment
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Web server** (Apache, Nginx, or Node.js for development)

### Development Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/Bigessfour/TOW.git
cd TOW
```

#### 2. Install Development Dependencies
```bash
npm install
```

#### 3. Run Quality Checks
```bash
# HTML validation
npm run test:html

# CSS validation
npm run test:css

# Accessibility testing
npm run test:accessibility

# Complete test suite
npm test
```

#### 4. Local Development Server
```bash
# Start development server
npm run serve

# Server will be available at http://localhost:3000
```

### Production Deployment

#### Option 1: GitHub Pages (Recommended)
1. Fork this repository to your GitHub account
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" → "main" branch
4. Your site will be live at `https://yourusername.github.io/TOW`

#### Option 2: Traditional Web Server
1. Upload all files to your web server's document root
2. Ensure proper file permissions (644 for files, 755 for directories)
3. Configure SSL certificate for HTTPS
4. Set up proper MIME types for all file extensions

#### Option 3: Cloud Hosting (AWS S3, Netlify, Vercel)
```bash
# For Netlify
npm run build  # If using build process
netlify deploy --prod

# For Vercel
vercel --prod

# For AWS S3
aws s3 sync . s3://your-bucket-name --exclude "node_modules/*" --exclude ".git/*"
```

### Server Configuration

#### Apache (.htaccess)
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

#### Nginx
```nginx
server {
    listen 443 ssl http2;
    server_name townofwiley.gov www.townofwiley.gov;
    
    root /var/www/townofwiley;
    index index.html;
    
    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    
    # Compression
    gzip on;
    gzip_types text/html text/css application/javascript application/json;
    
    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Environment-Specific Configuration

#### For Other Municipalities
To adapt this website for your municipality:

1. **Content Updates**:
   - Edit `index.html` to replace "Town of Wiley" with your municipality name
   - Update contact information, addresses, and phone numbers
   - Modify service offerings to match your municipality's services

2. **Styling Customization**:
   - Edit `styles.css` to change colors, fonts, and branding
   - Replace logo and images in appropriate directories
   - Adjust responsive breakpoints if needed

3. **Configuration Variables**:
   ```javascript
   // In script.js, update these values:
   const CONFIG = {
       municipalityName: "Your Town Name",
       contactEmail: "info@yourtown.gov",
       emergencyNumber: "911",
       nonEmergencyNumber: "(555) 123-4567",
       timeZone: "America/Denver"
   };
   ```

4. **Domain and SSL**:
   - Point your domain to the hosting service
   - Configure SSL certificate through your hosting provider
   - Update any hardcoded URLs in the configuration

### Troubleshooting

#### Common Issues

**Issue**: Forms not submitting
- **Solution**: Ensure web server supports the HTTP methods used
- **Check**: Server logs for any 405 Method Not Allowed errors

**Issue**: CSS/JS not loading
- **Solution**: Verify file paths and MIME type configuration
- **Check**: Browser developer tools Network tab for 404 errors

**Issue**: Accessibility tests failing
- **Solution**: Run `npm run test:accessibility` and fix reported issues
- **Check**: Ensure all images have alt text and forms have proper labels

#### Performance Optimization

1. **Image Optimization**:
   ```bash
   # Install imagemin for optimization
   npm install -g imagemin-cli imagemin-webp
   
   # Optimize images
   imagemin images/*.jpg --out-dir=images/optimized --plugin=imagemin-webp
   ```

2. **CSS/JS Minification** (if not using a build process):
   ```bash
   # Install minification tools
   npm install -g clean-css-cli uglify-js
   
   # Minify CSS
   cleancss -o styles.min.css styles.css
   
   # Minify JavaScript
   uglifyjs script.js -o script.min.js
   ```

3. **Performance Monitoring**:
   ```bash
   # Run Lighthouse audit
   npm run lighthouse
   
   # Check Core Web Vitals
   npm run performance
   ```

### Security Checklist

Before going live, ensure:
- [ ] SSL certificate is properly configured
- [ ] All forms have CSRF protection (if using server-side processing)
- [ ] File upload restrictions are in place
- [ ] Security headers are configured
- [ ] Regular security audits are scheduled
- [ ] Backup procedures are established
- [ ] Access logs are monitored

## 📞 Contact Information

**Town of Wiley Government**
- **Email**: info@townofwiley.gov
- **Phone**: (555) 123-4567
- **Address**: 123 Main Street, Wiley, State 12345

**Website Support**
- **Accessibility**: accessibility@townofwiley.gov
- **Privacy**: privacy@townofwiley.gov
- **Technical**: webmaster@townofwiley.gov

## 📄 License

This website code is released under the MIT License for use by other government entities. Content is subject to local government copyright and usage policies.

---

*Built with accessibility, transparency, and community service in mind.*
