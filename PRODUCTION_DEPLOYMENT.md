# Production Deployment Guide for Vercel

This document outlines all the production-readiness improvements and deployment steps for your Workout Planner application.

## ✅ Production Improvements Implemented

### 1. **Security Enhancements**

#### Environment Variables

- ✅ Created `.env.example` files documenting all required variables
- ✅ Added `.env` files to `.gitignore` to prevent credential leaks
- ✅ Implemented environment validation in `server/src/config/env.config.ts`

#### Security Headers

- ✅ Installed and configured **Helmet** middleware for HTTP security headers
- ✅ Provides protection against common vulnerabilities (XSS, clickjacking, etc.)

#### CORS Configuration

- ✅ Restricted CORS to specific domains via `CORS_ORIGINS` env variable
- ✅ Added proper CORS headers configuration
- ✅ Credentials are only allowed from whitelisted origins

#### Rate Limiting

- ✅ Installed and configured **express-rate-limit** middleware
- ✅ Limited to 100 requests per 15 minutes per IP
- ✅ Applied to all `/api/` endpoints

### 2. **Error Handling & Logging**

- ✅ Global error handling middleware in Express
- ✅ Environment-based error messages (hides sensitive info in production)
- ✅ Improved request logging for debugging
- ✅ Health check endpoint at `/health` for monitoring

### 3. **API Improvements**

#### Frontend API Client

- ✅ Added timeout handling (30s)
- ✅ Improved error messages with HTTP status codes
- ✅ Environment-based API URL configuration
- ✅ Request/response error handling

#### Backend Server

- ✅ Fixed typo: `porfileRoutes` → `profileRoutes`
- ✅ Proper port binding to `0.0.0.0` for Vercel compatibility
- ✅ Increased JSON payload limit to 10MB
- ✅ Added proper request body parsing

### 4. **Build Optimization**

- ✅ Configured Vite for production:
  - Minification with Terser
  - Code splitting (vendor chunks)
  - Disabled source maps in production
- ✅ Server TypeScript compilation optimized
- ✅ Both frontend and backend build successfully

### 5. **Deployment Configuration**

- ✅ Created `vercel.json` for Vercel build configuration
- ✅ Created `.vercelignore` to exclude unnecessary files
- ✅ Configured Node.js runtime (v20.x)

### 6. **Environment Validation**

- ✅ `DATABASE_URL` - Required, validated at startup
- ✅ `OPENROUTER_KEY` - Required, validated at startup
- ✅ `CORS_ORIGINS` - Optional with default value
- ✅ `NODE_ENV` - Set to 'production' in Vercel

## 📋 Pre-Deployment Checklist

Before deploying to Vercel, ensure:

### Environment Variables Setup

1. **Database Configuration**
   - [ ] `DATABASE_URL`: Your Neon PostgreSQL connection string with SSL enabled
   - Example: `postgresql://user:password@host-pooler.region.aws.neon.tech/dbname?sslmode=require&channel_binding=require`

2. **API Keys**
   - [ ] `OPENROUTER_KEY`: Your OpenRouter API key for AI plan generation

3. **Frontend Configuration**
   - [ ] `VITE_NEON_AUTH_URL`: Your Neon Auth URL (same as local)
   - [ ] `VITE_API_URL`: Your production backend URL (e.g., `https://yourdomain.com`)

4. **Backend Configuration**
   - [ ] `CORS_ORIGINS`: Include your frontend domain (e.g., `https://yourdomain.com,https://www.yourdomain.com`)
   - [ ] `FRONTEND_URL`: Your production frontend URL

### Code Quality

- [ ] Run `pnpm lint` in both root and server directories
- [ ] Run `pnpm build` in both directories to ensure production builds work
- [ ] Test locally with environment files set correctly

### Database

- [ ] Ensure Neon PostgreSQL database is set up
- [ ] Run Prisma migrations if not already done: `pnpm run prisma:migrate`
- [ ] Verify database tables are created

## 🚀 Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the project root directory

### 3. Configure Environment Variables in Vercel

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://...
OPENROUTER_KEY=sk-or-v1-...
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
FRONTEND_URL=https://yourdomain.com
NODE_ENV=production
VITE_NEON_AUTH_URL=https://...
VITE_API_URL=https://yourdomain.com
PORT=3000
BASE_URL=https://yourdomain.com
```

### 4. Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Test the application at the provided URL

### 5. Post-Deployment Testing

- [ ] Frontend loads without errors
- [ ] Authentication works (Neon Auth)
- [ ] API requests work (check Network tab)
- [ ] Profile can be saved
- [ ] Workout plan can be generated
- [ ] Health check: `https://yourdomain.com/health`

## 🔒 Security Best Practices

1. **Never commit `.env` files** - They're in `.gitignore` for a reason
2. **Use `.env.example`** - Document what variables are needed
3. **Rotate API keys** - If keys are exposed, regenerate them immediately
4. **Monitor rate limits** - Adjust `express-rate-limit` settings if needed
5. **Check security headers** - Verify Helmet headers with [securityheaders.com](https://securityheaders.com)
6. **Enable CORS only for necessary origins** - Don't use wildcards in production
7. **Use HTTPS only** - Vercel provides free SSL/TLS certificates
8. **Monitor errors** - Set up error tracking (Sentry, DataDog, etc.)

## 📊 Monitoring & Maintenance

### Logs

- Vercel provides logs at: https://vercel.com/[username]/[project]/logs
- Check logs for errors after deployment

### Performance

- Monitor build times
- Check API response times
- Monitor database query performance

### Updates

- Keep dependencies up to date: `pnpm update`
- Monitor security advisories: `pnpm audit`
- Review new Helmet/Rate Limit configurations periodically

## 🐛 Troubleshooting

### Build Fails

1. Check `pnpm run build` works locally
2. Verify all environment variables are set in Vercel
3. Check Node.js version compatibility

### API Errors

1. Verify `DATABASE_URL` and `OPENROUTER_KEY` in production
2. Check CORS settings match your domain
3. Test health endpoint: `/health`

### Slow Performance

1. Check database query performance
2. Monitor rate limiting (may be too aggressive)
3. Optimize bundle size: `pnpm run build` and review output

## 📞 Support

For issues:

1. Check Vercel documentation: https://vercel.com/docs
2. Review application logs in Vercel dashboard
3. Check environment variables are correctly set
4. Test locally with production environment values

---

**Last Updated**: May 25, 2026
**Version**: 1.0
