# Netlify CMS Setup Guide for Town of Wiley Website

## ✅ Setup Complete

The Netlify CMS has been successfully set up for the Town of Wiley website with the following configuration:

### Files Created/Updated

1. **`admin/index.html`** - CMS interface entry point
2. **`admin/config.yml`** - CMS configuration with collections for Pages and Posts
3. **`netlify.toml`** - Netlify deployment configuration with Identity and Git Gateway settings
4. **`package.json`** - Updated Jekyll build scripts

### CMS Configuration

The CMS is configured with two main collections:

#### Pages Collection
- Manages content in the `_pages` folder
- Includes: Title and Body (Markdown) fields
- Supports creating new pages dynamically

#### Posts Collection
- Manages blog posts and news in the `_posts` folder  
- Includes: Title, Date, and Body (Markdown) fields
- Automatically generates URLs with date prefixes

### Media Management
- **Media Folder**: `assets/images`
- **Public Folder**: `/assets/images`
- Supports uploading and managing images through the CMS interface

## Next Steps for Deployment

### 1. Deploy to Netlify

To deploy the site:

1. **Connect Repository to Netlify**:
   - Sign up/log in at [netlify.com](https://netlify.com)
   - Click "New site from Git" → Select GitHub → Choose "Bigessfour/TOW" repo
   - Deploy settings are already configured in `netlify.toml`:
     - Branch: `main`
     - Build command: `bundle exec jekyll build`
     - Publish directory: `_site`

2. **Deploy the Site**:
   - The site will automatically deploy when you push to the main branch
   - Note your site URL (e.g., `yoursite.netlify.app`)

### 2. Enable Netlify Identity and Git Gateway

In the Netlify dashboard:

1. **Enable Identity**:
   - Go to Site Settings → Identity → Enable Identity
   - This allows user authentication for the CMS

2. **Enable Git Gateway**:
   - Click "Enable Git Gateway" to connect CMS edits to GitHub
   - This allows the CMS to commit changes directly to your repository

### 3. Invite Town Clerk

1. **Invite Users**:
   - In Netlify dashboard: Site Settings → Identity → Invite Users
   - Enter the Town Clerk's email and send the invite
   - They'll receive a link to set up a password

### 4. Test the CMS

1. **Access CMS**:
   - Go to `yoursite.netlify.app/admin`
   - Log in with the Town Clerk's credentials

2. **Edit Content**:
   - Update pages via the "Pages" collection
   - Add news/posts in the "Posts" collection
   - Upload images to `assets/images` via the interface
   - All changes automatically commit to GitHub and trigger rebuilds

### 5. Local Development

**Start Development Server**:
```bash
npm run dev:jekyll
```

**Access Local CMS**:
- Visit `http://localhost:5500/admin` (CMS will work in development but won't save to Git)

**Build for Production**:
```bash
npm run build:jekyll
```

## Technical Details

### Build Process
- Jekyll builds the static site to `_site` directory
- Netlify CMS files are included in the build
- All content management happens through Git commits

### Authentication Flow
1. User accesses `/admin`
2. Netlify Identity handles authentication
3. Git Gateway provides access to repository
4. Changes are committed to GitHub
5. Netlify automatically rebuilds and deploys

### Security Features
- Git-based workflow ensures all changes are tracked
- Identity management through Netlify
- Role-based access control available
- All CMS actions create Git commits with author attribution

## Maintenance

### Adding New Content Types
Edit `admin/config.yml` to add new collections for different content types.

### Customizing the CMS Interface
Modify the `fields` array in each collection to change the editing interface.

### Updating CMS Version
The CMS loads from CDN: `https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js`

## Support

For issues with:
- **Jekyll builds**: Check GitHub Actions in the repository
- **CMS functionality**: Check Netlify dashboard logs
- **Content editing**: Refer to [Netlify CMS documentation](https://www.netlifycms.org/docs/)

## Repository Status

✅ All files committed and pushed to GitHub
✅ Build scripts configured for Netlify
✅ CMS configuration ready for deployment
✅ Local development environment working

The site is now ready for Netlify deployment with full CMS functionality.
