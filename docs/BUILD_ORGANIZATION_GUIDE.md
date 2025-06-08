# Build & Organization Guide

This document consolidates the Jekyll build process and file organization guidance for the Town of Wiley website.

## Jekyll Build System
- Use `bundle exec jekyll build` to generate the static site in `_site/`.
- Use `bundle exec jekyll serve --livereload` for local development with live reload.
- `_site/` is excluded from version control via `.gitignore`.

## File Organization
- All layouts: `_layouts/`
- Includes: `_includes/`
- Content pages: `_pages/`
- Blog/news: `_posts/`
- Static assets: `assets/`
- Documentation: `docs/`

## Documentation
- This file replaces `JEKYLL_SUCCESS_REPORT.md` and `FILE_ORGANIZATION_UPDATE.md`.
- For dependency tracking, see `DEPENDENCIES_TRACKING.md`.
- For debugging, see `DEBUG_GUIDE.md`.

---
_Last updated: June 8, 2025_
