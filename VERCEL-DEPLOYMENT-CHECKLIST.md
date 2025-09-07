# Vercel Deployment Checklist

## Prerequisites
- [ ] Node.js 16.14.0 or later
- [ ] npm 7.0.0 or later
- [ ] Vercel CLI installed (`npm install -g vercel`)

## Environment Variables
Ensure these variables are set in Vercel project settings:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string for JWT signing
- `NEXTAUTH_SECRET` - A secure random string for NextAuth
- `NEXTAUTH_URL` - Your deployment URL (e.g., https://your-app.vercel.app)
- `NODE_ENV=production`

## Configuration Files
- [ ] `next.config.mjs` - Configured with proper webpack settings
- [ ] `vercel.json` - Basic build configuration present
- [ ] `.gitignore` - Properly configured to exclude sensitive files

## Build Process
1. `npm install` - Install all dependencies
2. `npm run build` - Build the application
3. `npm run start` - Test the production build locally

## Common Issues & Solutions

### Build Fails with Webpack Errors
- Ensure all Node.js core modules are properly mocked in `next.config.mjs`
- Check for missing dependencies in `package.json`
- Verify all environment variables are properly set

### Module Not Found Errors
- Clear `node_modules` and `package-lock.json`
- Run `npm ci` for a clean install
- Check for case sensitivity in import paths

### Environment Variables Not Loading
- Ensure all required variables are set in Vercel project settings
- Check for typos in variable names
- Restart the deployment after making changes

## Deployment Steps
1. Push changes to your Git repository
2. Connect the repository to Vercel
3. Configure build settings (should be auto-detected)
4. Set environment variables in Vercel dashboard
5. Deploy!

## Post-Deployment Checks
- [ ] Verify all routes work correctly
- [ ] Check console for any client-side errors
- [ ] Test authentication flows
- [ ] Verify database connections
- [ ] Check mobile responsiveness
