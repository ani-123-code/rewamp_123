# 🚀 Complete Step-by-Step Railway Deployment Guide

This guide will walk you through deploying your Flownetics website to Railway from start to finish.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] A GitHub account
- [ ] Your code pushed to a GitHub repository
- [ ] A Railway account (free tier works)
- [ ] A MongoDB Atlas account (free tier works)
- [ ] Gmail API credentials (for email functionality)

---

## 🔧 Step 1: Prepare Your Code Repository

### 1.1 Push Your Code to GitHub

1. **If you haven't already, initialize git and push to GitHub:**
   ```bash
   cd C:\Users\LENOVO\Downloads\revampp4
   git init
   git add .
   git commit -m "Initial commit - Ready for Railway deployment"
   ```

2. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it (e.g., `flownetics-website`)
   - Don't initialize with README
   - Click "Create repository"

3. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/flownetics-website.git
   git branch -M main
   git push -u origin main
   ```

---

## 🗄️ Step 2: Set Up MongoDB Atlas (Database)

### 2.1 Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a new organization (or use default)

### 2.2 Create a Cluster

1. Click "Build a Database"
2. Choose **FREE** (M0) tier
3. Select a cloud provider and region (choose closest to you)
4. Name your cluster (e.g., `flownetics-cluster`)
5. Click "Create"

### 2.3 Configure Database Access

1. Go to **Database Access** (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password (save these!)
5. Set privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

### 2.4 Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (adds `0.0.0.0/0`)
4. Click "Confirm"

### 2.5 Get Connection String

1. Go to **Database** (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "5.5 or later"
5. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace `<password>` with your actual password**
7. **Add database name**: Change `?retryWrites=true` to `/flownetics_website?retryWrites=true`
8. Save this connection string - you'll need it for Railway!

---

## 📧 Step 3: Set Up Gmail API (For Email Functionality)

### 3.1 Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Click "Select a project" → "New Project"
3. Name it (e.g., `flownetics-email`)
4. Click "Create"

### 3.2 Enable Gmail API

1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Gmail API"
3. Click on it and click "Enable"

### 3.3 Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure OAuth consent screen:
   - User Type: External
   - App name: Flownetics
   - User support email: your email
   - Developer contact: your email
   - Click "Save and Continue" through all steps
4. Back to Credentials:
   - Application type: "Web application"
   - Name: "Flownetics Gmail API"
   - Authorized redirect URIs: `https://developers.google.com/oauthplayground`
   - Click "Create"
5. **Save the Client ID and Client Secret**

### 3.4 Get Refresh Token

1. Go to https://developers.google.com/oauthplayground
2. Click the gear icon (⚙️) in top right
3. Check "Use your own OAuth credentials"
4. Enter your Client ID and Client Secret
5. In left panel, find "Gmail API v1"
6. Check `https://www.googleapis.com/auth/gmail.send`
7. Click "Authorize APIs"
8. Sign in with the Gmail account you want to use
9. Click "Allow"
10. Click "Exchange authorization code for tokens"
11. **Copy the "Refresh token"** - you'll need this!

### 3.5 Save Gmail Credentials

You now have:
- ✅ Gmail Client ID
- ✅ Gmail Client Secret  
- ✅ Gmail Refresh Token
- ✅ Gmail User (the email address you authorized)

---

## 🚂 Step 4: Deploy to Railway

### 4.1 Create Railway Account

1. Go to https://railway.app
2. Click "Start a New Project"
3. Sign up with GitHub (recommended) or email
4. Authorize Railway to access your GitHub

### 4.2 Create New Project

1. In Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo"
3. Find and select your `flownetics-website` repository
4. Railway will start detecting your project

### 4.3 Configure Root Directory

1. Click on your project in Railway
2. Go to **Settings** tab
3. Scroll to **Root Directory**
4. Set it to: `project` (since your code is in the `project` folder)
5. Click "Update"

### 4.4 Set Environment Variables

1. In your Railway project, go to **Variables** tab
2. Click "New Variable" and add each of these:

#### Backend Variables (Required):

```
PORT=3001
```

```
NODE_ENV=production
```

```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/flownetics_website?retryWrites=true&w=majority
```
*(Replace with your actual MongoDB connection string from Step 2.5)*

```
GMAIL_CLIENT_ID=your-gmail-client-id-here
```
*(From Step 3.3)*

```
GMAIL_CLIENT_SECRET=your-gmail-client-secret-here
```
*(From Step 3.3)*

```
GMAIL_REFRESH_TOKEN=your-gmail-refresh-token-here
```
*(From Step 3.4)*

```
GMAIL_USER=your-email@gmail.com
```
*(The Gmail address you authorized in Step 3.4)*

```
GMAIL_REDIRECT_URI=https://developers.google.com/oauthplayground
```

#### Frontend Variables (Required):

```
VITE_API_URL=https://your-app-name.railway.app
```
*(We'll update this after getting your Railway URL)*

```
VITE_CAL_LINK=https://cal.com/me-aniketh/30min
```

3. **Important:** After adding all variables, Railway will automatically redeploy

### 4.5 Get Your Railway URL

1. Go to **Settings** → **Networking** tab
2. Under "Custom Domain" or "Generate Domain"
3. Railway will give you a URL like: `your-app-name.up.railway.app`
4. **Copy this URL!**

### 4.6 Update VITE_API_URL

1. Go back to **Variables** tab
2. Find `VITE_API_URL`
3. Click to edit
4. Update it with your actual Railway URL:
   ```
   VITE_API_URL=https://your-app-name.up.railway.app
   ```
5. Save (Railway will auto-redeploy)

### 4.7 Monitor Deployment

1. Go to **Deployments** tab
2. Watch the build logs
3. Wait for "Build Successful" and "Deploy Successful"
4. This usually takes 3-5 minutes

---

## ✅ Step 5: Verify Deployment

### 5.1 Test Your Website

1. Visit your Railway URL: `https://your-app-name.up.railway.app`
2. Check if homepage loads correctly
3. Test navigation

### 5.2 Test Key Features

1. **Contact Form:**
   - Go to Contact page
   - Fill out and submit
   - Check if it works

2. **Blog Pages:**
   - Navigate to Blog section
   - Check if blogs load

3. **ROI Calculator:**
   - Test the calculator
   - Try downloading a report

4. **Admin Dashboard:**
   - Visit: `https://your-app-name.up.railway.app/gdhjeuebd/snhdhftT`
   - Login with:
     - Username: `flownetics`
     - Password: `Flow@AV_2025`
   - Check if dashboard loads

### 5.3 Check Server Logs

1. In Railway, go to **Deployments** tab
2. Click on the latest deployment
3. View logs to check for errors
4. Look for:
   - ✅ "Connected to MongoDB"
   - ✅ "Server running on port 3001"
   - ✅ "Serving static files from dist folder"

---

## 🔍 Step 6: Troubleshooting Common Issues

### Issue: Build Fails

**Solution:**
- Check build logs in Railway
- Ensure Node.js version is 18+ (already set in `nixpacks.toml`)
- Verify all dependencies are in `package.json`

### Issue: 404 Errors on Pages

**Solution:**
- Check if `dist/` folder was created during build
- Verify server is serving static files (check logs)
- Ensure `NODE_ENV=production` is set

### Issue: API Connection Errors

**Solution:**
- Verify `VITE_API_URL` matches your Railway domain exactly
- Check CORS settings in server (should allow all in production)
- Check server logs for API errors

### Issue: MongoDB Connection Fails

**Solution:**
- Verify `MONGODB_URI` is correct (check password encoding)
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check database name is `flownetics_website`

### Issue: Email Not Sending

**Solution:**
- Verify all Gmail API credentials are set correctly
- Check Gmail API is enabled in Google Cloud Console
- Verify refresh token is valid
- Check server logs for Gmail API errors

### Issue: Static Files Not Loading

**Solution:**
- Ensure build completed successfully (`dist/` folder exists)
- Check server logs for "Serving static files from dist folder"
- Verify `NODE_ENV=production` is set

---

## 📝 Step 7: Custom Domain (Optional)

### 7.1 Add Custom Domain

1. In Railway, go to **Settings** → **Networking**
2. Under "Custom Domain", click "Add Domain"
3. Enter your domain (e.g., `www.flownetics.com`)
4. Follow Railway's DNS instructions
5. Update `VITE_API_URL` to your custom domain

---

## 🎉 Success Checklist

Your deployment is successful when:

- [ ] Website loads at Railway URL
- [ ] All pages navigate correctly
- [ ] Contact form submits successfully
- [ ] Blog pages load
- [ ] ROI calculator works
- [ ] Admin dashboard accessible
- [ ] MongoDB connection successful (check logs)
- [ ] Email sending works (test ROI report download)

---

## 📞 Need Help?

If you encounter issues:

1. **Check Railway Logs:** Deployments → Latest → View Logs
2. **Check MongoDB Atlas:** Verify connection string and network access
3. **Check Gmail API:** Verify credentials in Google Cloud Console
4. **Verify Environment Variables:** All required variables are set in Railway

---

## 🔄 Updating Your Website

After making changes:

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```

2. Railway will automatically detect changes and redeploy
3. Monitor deployment in Railway dashboard

---

**Congratulations! Your Flownetics website is now live on Railway! 🎊**

