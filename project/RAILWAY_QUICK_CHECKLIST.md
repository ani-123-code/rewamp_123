# ✅ Railway Deployment Quick Checklist

Use this checklist to ensure everything is set up correctly before and during deployment.

## 📦 Pre-Deployment Checklist

### Code Repository
- [ ] Code pushed to GitHub
- [ ] `.env` files are in `.gitignore` (they are!)
- [ ] All configuration files present:
  - [ ] `railway.json` ✅
  - [ ] `nixpacks.toml` ✅
  - [ ] `Procfile` ✅

### MongoDB Atlas
- [ ] Account created
- [ ] Cluster created (free tier M0)
- [ ] Database user created (username & password saved)
- [ ] Network access configured (0.0.0.0/0 allowed)
- [ ] Connection string copied and formatted correctly
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/flownetics_website?retryWrites=true&w=majority`

### Gmail API
- [ ] Google Cloud project created
- [ ] Gmail API enabled
- [ ] OAuth 2.0 credentials created
- [ ] Client ID saved
- [ ] Client Secret saved
- [ ] Refresh token obtained from OAuth Playground
- [ ] Gmail user email noted

## 🚂 Railway Setup Checklist

### Project Configuration
- [ ] Railway account created
- [ ] GitHub repository connected
- [ ] Root directory set to `project`
- [ ] Build configuration detected correctly

### Environment Variables (Set in Railway Dashboard)
- [ ] `PORT=3001`
- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI=your-mongodb-connection-string`
- [ ] `GMAIL_CLIENT_ID=your-client-id`
- [ ] `GMAIL_CLIENT_SECRET=your-client-secret`
- [ ] `GMAIL_REFRESH_TOKEN=your-refresh-token`
- [ ] `GMAIL_USER=your-email@gmail.com`
- [ ] `GMAIL_REDIRECT_URI=https://developers.google.com/oauthplayground`
- [ ] `VITE_API_URL=https://your-app-name.up.railway.app` (update after getting URL)
- [ ] `VITE_CAL_LINK=https://cal.com/me-aniketh/30min`

### Deployment
- [ ] Build started successfully
- [ ] Build completed without errors
- [ ] Deployment successful
- [ ] Railway URL obtained
- [ ] `VITE_API_URL` updated with Railway URL
- [ ] Redeployed after updating `VITE_API_URL`

## ✅ Post-Deployment Verification

### Website Functionality
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Contact form submits successfully
- [ ] Newsletter subscription works
- [ ] Blog pages load
- [ ] ROI calculator works
- [ ] ROI report download works (sends email)
- [ ] Admin dashboard accessible at `/gdhjeuebd/snhdhftT`
- [ ] Admin login works (username: `flownetics`, password: `Flow@AV_2025`)

### Server Logs Check
- [ ] "Connected to MongoDB" message appears
- [ ] "Server running on port 3001" message appears
- [ ] "Serving static files from dist folder" message appears (production mode)
- [ ] No error messages in logs

### Database Check
- [ ] MongoDB connection successful
- [ ] Collections created automatically:
  - [ ] `contacts`
  - [ ] `newsletters`
  - [ ] `roi_downloads`
  - [ ] `blogs`
  - [ ] `ai_analyses`

## 🔧 Troubleshooting Checklist

If something doesn't work:

- [ ] Check Railway deployment logs
- [ ] Verify all environment variables are set correctly
- [ ] Check MongoDB Atlas connection string
- [ ] Verify MongoDB network access allows all IPs
- [ ] Check Gmail API credentials
- [ ] Verify `VITE_API_URL` matches Railway domain exactly
- [ ] Check if `dist/` folder was created during build
- [ ] Verify `NODE_ENV=production` is set

## 📝 Environment Variables Reference

Copy-paste this list when setting up Railway variables:

```
PORT=3001
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flownetics_website?retryWrites=true&w=majority
GMAIL_CLIENT_ID=your-gmail-client-id
GMAIL_CLIENT_SECRET=your-gmail-client-secret
GMAIL_REFRESH_TOKEN=your-gmail-refresh-token
GMAIL_USER=your-email@gmail.com
GMAIL_REDIRECT_URI=https://developers.google.com/oauthplayground
VITE_API_URL=https://your-app-name.up.railway.app
VITE_CAL_LINK=https://cal.com/me-aniketh/30min
```

---

**Tip:** Keep this checklist open while deploying and check off items as you complete them!

