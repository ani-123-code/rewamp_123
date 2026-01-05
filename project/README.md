# Flownetics Website

A modern, full-stack web application for Flownetics Engineering, featuring continuous flow chemistry solutions, ROI calculator, blog management, and admin dashboard.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with GridFS for image storage)
- **Email**: Gmail API (OAuth2)
- **Deployment**: Railway

## Features

- 🧮 ROI Calculator with comprehensive financial analysis
- 📝 Blog management system with image uploads
- 📧 Contact form and newsletter subscription
- 👥 Admin dashboard for managing submissions
- 📊 Interactive charts and visualizations
- 📅 Cal.com integration for consultations
- 🎨 Modern, responsive UI with brand colors

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (MongoDB Atlas recommended)
- Gmail API credentials for email functionality (see [server/README.md](./server/README.md))

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

3. Set up environment variables:
   - Create `.env` in project root for frontend
   - Create `server/.env` for backend (see DEPLOYMENT.md)

4. Run development server:
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   cd server && npm run dev
   ```

## Troubleshooting

### ERR_CONNECTION_REFUSED Error

If you see `ERR_CONNECTION_REFUSED` when trying to download the ROI report:

1. **Ensure the backend server is running:**
   ```bash
   cd server
   npm start
   ```
   The server should start on `http://localhost:3001`

2. **Check environment variables:**
   - Verify `server/.env` file exists with all required variables
   - See [server/README.md](./server/README.md) for required variables

3. **Check MongoDB connection:**
   - Ensure MongoDB is running (local or Atlas)
   - Verify `MONGODB_URI` in `server/.env` is correct

4. **Check Gmail API credentials:**
   - Verify all Gmail OAuth2 credentials are set in `server/.env`
   - See [server/README.md](./server/README.md) for Gmail API setup

For more troubleshooting, see [server/README.md](./server/README.md)

## Project Structure

```
project/
├── server/              # Express backend
│   ├── index.js        # Main server file
│   └── package.json
├── src/                 # React frontend
│   ├── components/     # React components
│   ├── lib/            # API client
│   └── hooks/          # Custom hooks
├── public/              # Static assets
└── dist/               # Build output (generated)
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Railway deployment instructions.

## Environment Variables

### Frontend (.env)
- `VITE_API_URL` - Backend API URL
- `VITE_CAL_LINK` - Cal.com booking link

### Backend (server/.env)
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (production/development)
- `MONGODB_URI` - MongoDB connection string
- `GMAIL_CLIENT_ID` - Gmail OAuth2 Client ID
- `GMAIL_CLIENT_SECRET` - Gmail OAuth2 Client Secret
- `GMAIL_REFRESH_TOKEN` - Gmail OAuth2 Refresh Token
- `GMAIL_USER` - Gmail account email address

See [server/README.md](./server/README.md) for detailed setup instructions.

## Admin Access

- URL: `/gdhjeuebd/snhdhftT`
- Username: `flownetics`
- Password: `Flow@AV_2025`

## License

Copyright © 2024 Flownetics Engineering Private Limited. All rights reserved.

