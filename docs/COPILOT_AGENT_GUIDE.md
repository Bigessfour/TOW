# GitHub Copilot Agentic Workflow Guide

_Town of Wiley Repository_

## Overview

This guide explains how to use GitHub Copilot in agent mode to automatically
make changes, create pull requests, and deploy updates to the Town of Wiley
website.

## Prerequisites

- VS Code with GitHub Copilot extension
- GitHub authentication configured
- Repository access to https://github.com/Bigessfour/TOW

## Setup Instructions

### 1. Initial Setup

Run the setup script to ensure all dependencies are installed:

```powershell
.\scripts\setup-copilot-agent.ps1
```

### 2. Open VS Code

```powershell
code .
```

### 3. Access Copilot Chat

- Press `Ctrl+Alt+I` to open Copilot Chat
- Ensure you're in "Agent" mode (look for the mode dropdown)

## Workflow Steps

### Step 1: Create or Use GitHub Issues

Create specific, actionable issues on GitHub:

- Go to https://github.com/Bigessfour/TOW/issues
- Click "New Issue"
- Use descriptive titles like "Improve header design" or "Add community
  calendar"

### Step 2: Assign to Copilot

- In the issue, click "Assignees"
- Add `@github-copilot[bot]` or use chat commands

### Step 3: Give Instructions

In VS Code Copilot Chat, use specific commands:

```
@github Improve header in index.html with smaller font (1.5em) and add a green background (#4CAF50)
```

```
@github Add a new section for community events below the news section
```

```
@github Fix accessibility issues in the navigation menu
```

### Step 4: Review Changes

- Copilot will analyze the code and propose changes
- Review the suggested modifications
- Approve or request adjustments

### Step 5: Automatic PR Creation

- Copilot creates a new branch
- Makes the requested changes
- Creates a pull request automatically
- Includes detailed commit messages

### Step 6: Review and Merge

- Check the PR at https://github.com/Bigessfour/TOW/pulls
- Review changes in the Files tab
- Test the deployment preview
- Merge when satisfied

## Best Practices

### Clear Instructions

✅ **Good**: "Add a green background (#4CAF50) to the header and reduce font
size to 1.5em" ❌ **Bad**: "Make the header look better"

### Specific Tasks

✅ **Good**: "Fix the mobile navigation menu accessibility by adding proper ARIA
labels" ❌ **Bad**: "Fix accessibility"

### Follow Guidelines

- Always maintain government website standards
- Ensure accessibility compliance
- Keep mobile responsiveness
- Test on multiple devices

## Common Commands

### Design Changes

```
@github Change the header background to #4CAF50 and reduce h1 font-size to 1.5em
```

### Content Updates

```
@github Add a new section called "Community Events" with a calendar integration
```

### Accessibility Fixes

```
@github Add missing alt text to all images in the services section
```

### Bug Fixes

```
@github Fix the mobile navigation menu not closing after clicking a link
```

## Monitoring Progress

### Check PR Status

- Visit https://github.com/Bigessfour/TOW/pulls
- Monitor build status and checks
- Review automated testing results

### Live Site

- Preview changes at https://townofwiley.netlify.app/
- Test functionality across devices
- Verify accessibility improvements

## Troubleshooting

### Authentication Issues

```powershell
gh auth login
```

### Extension Problems

1. Restart VS Code
2. Check extension updates
3. Reload window (Ctrl+Shift+P → "Reload Window")

### Git Issues

```powershell
git fetch origin
git reset --hard origin/main
```

## Advanced Usage

### Batch Operations

```
@github Process the following tasks:
1. Update footer copyright year to 2025
2. Add social media links
3. Improve form validation messages
```

### Integration with Issues

```
@github Fix issue #15 by implementing the requested contact form improvements
```

### Code Review Integration

```
@github Review the accessibility of the current navigation implementation and suggest improvements
```

## Security Considerations

- All changes go through PR review
- Automated security scanning enabled
- Content Security Policy maintained
- No sensitive data in commits

## Performance Monitoring

- Lighthouse CI runs on all PRs
- Performance budgets enforced
- Accessibility scores tracked
- SEO optimization verified

---

_For technical support, create an issue or contact the development team._
