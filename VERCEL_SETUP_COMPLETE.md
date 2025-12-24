# Vercel Deployment - Quick Start

Your project is now configured for Vercel deployment! Here's what was done:

## ✅ Configuration Files Created

1. **vercel.json** - Deployment configuration for Vercel
2. **.env.example files** - Template for environment variables
3. **root package.json** - Monorepo scripts
4. **.gitignore** - Git ignore rules
5. **DEPLOYMENT.md** - Detailed deployment guide

## 📋 Files Modified

### Dashboard (Frontend)
- `src/sections/Menu.jsx` - Updated API endpoints to use environment variables
- `src/pages/Login.jsx` - Updated register endpoint
- `src/pages/admin/AddProduct.jsx` - Updated product API calls
- `src/pages/admin/ManageUsers.jsx` - Updated user API calls

### Server (Backend)
- `package.json` - Added dotenv dependency and build script
- `index.js` - Updated to use environment variables for MongoDB and PORT

## 🚀 Quick Deployment Steps

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **From your project root, run:**
   ```bash
   vercel
   ```

3. **In Vercel Dashboard, set environment variables:**
   - `MONGODB_URI` = Your MongoDB connection string (already configured)
   - `NODE_ENV` = production
   - `VITE_API_URL` = Your deployed domain + /api (e.g., https://your-app.vercel.app/api)

4. **Redeploy to apply the API URL variable**

## 📝 Important Notes

- **API URL**: The frontend needs to know where your backend is. After deployment, update `VITE_API_URL` environment variable with your Vercel domain.
- **File Uploads**: Currently uses local file system which is ephemeral on Vercel. For production, integrate cloud storage (AWS S3, Cloudinary, etc.)
- **MongoDB**: Your connection string is already set up and will work on Vercel.

## 🔗 Resources

- Full guide: See DEPLOYMENT.md
- Vercel Docs: https://vercel.com/docs
- GitHub: Push your code and link repository in Vercel dashboard for automatic deployments

That's it! Your app is ready for Vercel deployment. 🎉
