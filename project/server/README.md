# Flownetics Backend Server

This is the backend server for the Flownetics website, handling API requests, email sending, and database operations.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB database (local or cloud)
- Gmail API credentials for sending emails

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/flownetics_website
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flownetics_website

# Gmail OAuth2 Configuration
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token
GMAIL_USER=your_email@gmail.com
GMAIL_REDIRECT_URI=https://developers.google.com/oauthplayground
```

### 3. Gmail API Setup

To send emails via Gmail API, you need to:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Gmail API
4. Create OAuth 2.0 credentials
5. Use [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/) to get a refresh token:
   - Select Gmail API v1
   - Authorize and get the refresh token
   - Add it to your `.env` file

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Public Endpoints

- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter
- `POST /api/download-roi` - Download ROI report (sends email)
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:slug` - Get single blog post
- `GET /api/blogs/images/:imageId` - Get blog image

### Admin Endpoints (require authentication)

- `POST /api/admin/login` - Admin login
- `GET /api/admin/contacts` - Get all contacts
- `GET /api/admin/newsletters` - Get all newsletter subscriptions
- `GET /api/admin/roi-downloads` - Get all ROI downloads
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/blogs` - Get all blogs (admin)
- `POST /api/admin/blogs` - Create blog
- `PUT /api/admin/blogs/:id` - Update blog
- `DELETE /api/admin/blogs/:id` - Delete blog
- `POST /api/admin/blogs/upload-image` - Upload blog image
- `GET /api/admin/ai-analyses` - Get all AI analyses

## Troubleshooting

### Connection Refused Error

If you see `ERR_CONNECTION_REFUSED`:

1. **Check if the server is running:**
   ```bash
   cd server
   npm start
   ```

2. **Check if the port is correct:**
   - Default port is 3001
   - Make sure no other application is using this port

3. **Check environment variables:**
   - Ensure `.env` file exists in the `server` directory
   - Verify all required variables are set

### Email Sending Issues

If emails are not being sent:

1. **Check Gmail API credentials:**
   - Verify all Gmail OAuth2 credentials are correct
   - Ensure the refresh token is valid
   - Check that Gmail API is enabled in Google Cloud Console

2. **Check server logs:**
   - Look for error messages in the console
   - Common issues: expired refresh token, invalid credentials

### MongoDB Connection Issues

If you see MongoDB connection errors:

1. **Check MongoDB URI:**
   - Verify the connection string is correct
   - For local MongoDB: `mongodb://localhost:27017/flownetics_website`
   - For MongoDB Atlas: Ensure the connection string includes authentication

2. **Check if MongoDB is running:**
   - For local MongoDB: `mongod` should be running
   - For MongoDB Atlas: Check your cluster status

## Development

The server uses:
- **Express.js** - Web framework
- **MongoDB** - Database
- **Google APIs (Gmail)** - Email sending
- **Multer** - File uploads
- **GridFS** - Image storage

## Production Deployment

For production:

1. Set `NODE_ENV=production` in your `.env` file
2. Ensure all environment variables are set
3. The server will serve static files from the `dist` folder if built
4. Use a process manager like PM2 for production:
   ```bash
   pm2 start index.js --name flownetics-server
   ```

