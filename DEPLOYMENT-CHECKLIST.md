# 🚀 Deployment Security Checklist

## 🔒 Environment Variables Security

### ❌ NEVER commit these to Git:
- [ ] Remove actual MongoDB credentials from `.env`
- [ ] Generate secure JWT_SECRET (32+ characters)
- [ ] Generate secure NEXTAUTH_SECRET (32+ characters)
- [ ] Update NEXTAUTH_URL to production domain
- [ ] Set NODE_ENV to "production"

### ✅ Before Deployment:
```bash
# Generate secure secrets
JWT_SECRET=$(openssl rand -base64 32)
NEXTAUTH_SECRET=$(openssl rand -base64 32)
```

## 🌐 Platform-Specific Setup

### Vercel Deployment:
1. **Environment Variables:**
   - Add all variables in Vercel dashboard
   - Set NEXTAUTH_URL to your Vercel domain
   - Set NODE_ENV=production

2. **Database:**
   - Ensure MongoDB Atlas allows Vercel IPs
   - Use connection pooling for better performance

### Netlify Deployment:
1. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18+

2. **Environment Variables:**
   - Add in Netlify dashboard under Site Settings

## 🔧 Pre-Deployment Steps

### 1. Security Review:
- [ ] No sensitive data in code
- [ ] All secrets in environment variables
- [ ] CORS properly configured
- [ ] Rate limiting implemented (if needed)

### 2. Performance Optimization:
- [ ] Images optimized
- [ ] Bundle size checked
- [ ] Database queries optimized
- [ ] Caching strategy implemented

### 3. Testing:
- [ ] Build process works: `npm run build`
- [ ] All pages load correctly
- [ ] Authentication flows work
- [ ] Cart functionality tested
- [ ] Mobile responsiveness verified

### 4. Database Setup:
- [ ] MongoDB Atlas cluster configured
- [ ] Database indexes created
- [ ] Connection limits set appropriately
- [ ] Backup strategy in place

## 🚀 Deployment Commands

### Quick Deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify:
```bash
# Build locally
npm run build

# Deploy with Netlify CLI
npm i -g netlify-cli
netlify deploy --prod --dir=.next
```

## 📋 Post-Deployment Verification

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Authentication works
- [ ] Cart functionality operational
- [ ] Database connections stable
- [ ] SSL certificate active
- [ ] Performance metrics acceptable

## 🔐 Security Best Practices

1. **Environment Variables:**
   - Use platform-specific secret management
   - Rotate secrets regularly
   - Never log sensitive data

2. **Database Security:**
   - Use strong passwords
   - Enable IP whitelisting
   - Regular security updates

3. **Application Security:**
   - Input validation on all forms
   - SQL injection prevention
   - XSS protection enabled

## 🆘 Emergency Rollback Plan

If deployment fails:
1. Check deployment logs
2. Verify environment variables
3. Test database connectivity
4. Rollback to previous version if needed

## 📞 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
