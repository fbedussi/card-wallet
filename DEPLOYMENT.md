# GitHub Pages Deployment Checklist

## Pre-deployment Setup

### 1. Repository Setup
- [ ] Create GitHub repository named `card-wallet`
- [ ] Initialize git repository locally: `git init`
- [ ] Add remote origin: `git remote add origin https://github.com/[username]/card-wallet.git`
- [ ] Add all files: `git add .`
- [ ] Initial commit: `git commit -m "Initial commit: Card Wallet PWA"`
- [ ] Push to GitHub: `git push -u origin main`

### 2. GitHub Pages Configuration
- [ ] Go to repository Settings
- [ ] Navigate to "Pages" section
- [ ] Set Source to "GitHub Actions" (not "Deploy from a branch")
- [ ] Save settings

### 3. Repository Permissions (if needed)
- [ ] Ensure GitHub Actions have write permissions:
  - Go to Settings > Actions > General
  - Under "Workflow permissions", select "Read and write permissions"
  - Check "Allow GitHub Actions to create and approve pull requests"

## Deployment Process

### Automatic Deployment
- [ ] Push changes to main branch
- [ ] GitHub Actions will automatically build and deploy
- [ ] Check Actions tab for deployment status
- [ ] App will be available at: `https://[username].github.io/card-wallet/`

### Manual Deployment (Alternative)
```bash
# Build and deploy manually
npm run deploy
```

## Verification Steps

- [ ] Visit the deployed URL
- [ ] Test PWA installation on mobile device
- [ ] Verify barcode scanning works
- [ ] Test offline functionality
- [ ] Check that all routes work correctly

## Troubleshooting

### Common Issues:

1. **404 Error on refresh**: 
   - Ensure `navigateFallback` is properly configured in `vite.config.ts`
   - Check that base path is set correctly

2. **PWA not installing**:
   - Verify manifest.json is served correctly
   - Check service worker registration
   - Ensure HTTPS is used (GitHub Pages uses HTTPS by default)

3. **Build fails**:
   - Check TypeScript errors: `npm run check`
   - Check linting errors: `npm run lint`
   - Verify all dependencies are installed

4. **Assets not loading**:
   - Verify base path configuration in `vite.config.ts`
   - Check that asset paths use relative URLs

## Environment Variables (if needed)

For production builds, you can set environment variables in GitHub Actions:

```yaml
# In .github/workflows/deploy.yml
- name: Build
  run: npm run build
  env:
    NODE_ENV: production
    VITE_API_URL: https://api.example.com
```

## Updates and Maintenance

- [ ] Regularly update dependencies: `npm update`
- [ ] Monitor GitHub Actions for failed deployments
- [ ] Test PWA features after major updates
- [ ] Update service worker cache version if needed
