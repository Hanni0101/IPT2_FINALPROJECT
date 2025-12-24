# Vercel Deployment Guide for Sizzle App

## Prerequisites
- Node.js 18+ installed
- A Vercel account (https://vercel.com)
- Git repository with your code

## Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Prepare Environment Variables
Before deployment, you need to set up environment variables in Vercel:

#### Server Environment Variables (.env)
- `MONGODB_URI`: Your MongoDB connection string (already configured)
- `NODE_ENV`: Set to `production`

#### Dashboard Environment Variables (.env)
- `VITE_API_URL`: Your deployed API URL (will be your Vercel domain + `/api`)

### 3. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)
```bash
# From the root directory of your project
cd c:\Users\User\Documents\XTRA\IPT2_FINALPROJECT
vercel
```

The CLI will guide you through:
1. Linking to your Vercel account
2. Confirming the project settings
3. Selecting the framework (choose "Other" for monorepo)

#### Option B: Using Vercel Web Dashboard
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Connect your Git repository
4. Configure the project:
   - Framework: Other
   - Root Directory: ./
   - Build Command: `npm run build:dashboard && npm run build:server`
   - Output Directory: `dashboard/dist`

### 4. Configure Environment Variables in Vercel Dashboard

After deployment is initiated:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: `production`

### 5. Update Dashboard Environment Variables

Once your app is deployed and you know the Vercel domain:
1. In Vercel dashboard, go to your project settings
2. Add environment variable:
   - `VITE_API_URL`: `https://your-domain.vercel.app/api`

### 6. Redeploy Dashboard

After setting the `VITE_API_URL`:
1. Push a new commit to trigger a redeploy, or
2. Click "Redeploy" in the Vercel dashboard

## Vercel Configuration

The `vercel.json` file in the root directory configures:
- Dashboard as static build (Vite output)
- Server as Node.js function
- Routes to serve API calls to the server
- Static file serving for uploads

## Important Notes

- **MongoDB**: Your MongoDB Atlas connection is already configured and will work on Vercel
- **File Uploads**: Uploads are stored in the `/uploads` directory, which is ephemeral on Vercel. For production, consider using a cloud storage solution (AWS S3, Cloudinary, etc.)
- **CORS**: CORS is enabled for all origins in development. Consider restricting this in production.
- **Static Files**: The `uploads` directory will be reset on each deployment. For persistent storage, integrate a cloud storage service.

## Troubleshooting

### API calls failing
- Check that `VITE_API_URL` is set correctly in dashboard environment variables
- Ensure `MONGODB_URI` is set in server environment variables

### Uploads not working
- File uploads require cloud storage setup (MongoDB doesn't store files directly)
- Consider integrating AWS S3, Cloudinary, or similar service

### Build errors
- Check that all dependencies are listed in package.json files
- Run `npm install:all` locally to verify all packages are installable

## Local Testing Before Deployment

Test locally first:
```bash
npm install:all
npm run build
```

To test the production build:
```bash
cd dashboard
npm run preview
```

## Support

For more information:
- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev
- Express.js Docs: https://expressjs.com
