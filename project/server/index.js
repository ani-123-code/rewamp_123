import express from 'express';
import cors from 'cors';
import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import FormData from 'form-data';
import { google } from 'googleapis';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file in server directory
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is required');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

let db;
let client;
let gridFSBucket;

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db('flownetics_website');
    console.log('Connected to MongoDB');
    
    // Create collections if they don't exist
    await db.createCollection('contacts').catch(() => {});
    await db.createCollection('newsletters').catch(() => {});
    await db.createCollection('roi_downloads').catch(() => {});
    await db.createCollection('blogs').catch(() => {});
    await db.createCollection('ai_analyses').catch(() => {});
    
    // Initialize GridFS bucket for image storage
    gridFSBucket = new GridFSBucket(db, { bucketName: 'blog_images' });
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToMongoDB();

// Gmail OAuth2 setup
const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const GMAIL_REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
const GMAIL_USER = process.env.GMAIL_USER;

console.log('Gmail OAuth2 Configuration:', {
  GMAIL_CLIENT_ID: GMAIL_CLIENT_ID ? `${GMAIL_CLIENT_ID.substring(0, 20)}...` : 'Missing',
  GMAIL_CLIENT_SECRET: GMAIL_CLIENT_SECRET ? 'Set' : 'Missing',
  GMAIL_REFRESH_TOKEN: GMAIL_REFRESH_TOKEN ? 'Set' : 'Missing',
  GMAIL_USER: GMAIL_USER || 'Missing'
});

if (!GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !GMAIL_REFRESH_TOKEN || !GMAIL_USER) {
  console.error('⚠️  Gmail OAuth2 credentials are missing!');
  console.error('Required environment variables: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_USER');
  console.error('Please ensure your .env file is in the server directory with these values.');
}

// Create OAuth2 client
let oauth2Client = null;

if (GMAIL_CLIENT_ID && GMAIL_CLIENT_SECRET && GMAIL_REFRESH_TOKEN) {
  try {
    oauth2Client = new google.auth.OAuth2(
      GMAIL_CLIENT_ID,
      GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI || 'https://developers.google.com/oauthplayground'
    );

    // Set refresh token - this allows the client to automatically refresh access tokens
    oauth2Client.setCredentials({
      refresh_token: GMAIL_REFRESH_TOKEN
    });

    console.log('✅ Gmail OAuth2 client initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Gmail OAuth2 client:', error.message);
  }
} else {
  console.error('❌ Cannot initialize Gmail OAuth2 client - missing required credentials');
}

// Function to send email via Gmail API
async function sendEmailViaGmail(to, subject, html) {
  try {
    // Validate credentials
    if (!oauth2Client) {
      throw new Error('Gmail OAuth2 client not initialized. Please check your environment variables.');
    }

    // Ensure credentials are set (OAuth2 client will auto-refresh access token when needed)
    if (!oauth2Client.credentials || !oauth2Client.credentials.refresh_token) {
      oauth2Client.setCredentials({
        refresh_token: GMAIL_REFRESH_TOKEN
      });
    }

    // Create Gmail client with authenticated OAuth2 client
    // The OAuth2 client will automatically refresh the access token if needed
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Create email message
    const message = [
      `From: ${GMAIL_USER}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      'Content-Type: text/html; charset=utf-8',
      '',
      html
    ].join('\n');

    // Encode message in base64url format
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send email
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage
      }
    });

    return response.data;
  } catch (error) {
    console.error('Gmail API error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data
    });
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

// Helper function to generate enhanced email template HTML
function generateEmailTemplate(name, reportData) {
  // Safely handle missing or undefined values
  const roiMonths = reportData.roiMonths || 0;
  const roiYears = roiMonths / 12;
  const totalCost = reportData.totalCostClientINR || 0;
  const savings = reportData.savingsAfterFaasINR || 0;
  const roiPercentage = totalCost > 0
    ? ((savings / totalCost) * 100).toFixed(1)
    : '0';

  const formatMoney = (amount) => {
    if (!amount || amount === 0 || isNaN(amount)) return '0';
    const rate = reportData.currency === 'USD' ? 0.012 : reportData.currency === 'EUR' ? 0.011 : 1;
    const converted = amount * rate;
    const symbol = reportData.currencySymbol || '₹';
    return `${symbol} ${converted.toLocaleString('en-US', { maximumFractionDigits: 0 })} (approx)`;
  };

  // Helper to safely format numbers
  const formatNumber = (value, decimals = 1) => {
    if (value === null || value === undefined || isNaN(value)) return '0';
    return Number(value).toFixed(decimals);
  };

  // Helper to safely get string values
  const safeString = (value, defaultValue = 'N/A') => {
    return value !== null && value !== undefined ? String(value) : defaultValue;
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Flownetics ROI Analysis Report</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f7;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #e07742 0%, #702594 50%, #057210 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Flownetics ROI Analysis</h1>
                  <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Your Comprehensive Investment Report</p>
                </td>
              </tr>

              <!-- Greeting -->
              <tr>
                <td style="padding: 30px 30px 20px 30px;">
                  <p style="margin: 0; color: #050505; font-size: 16px; line-height: 1.6;">Dear ${name},</p>
                  <p style="margin: 15px 0 0 0; color: #86868b; font-size: 15px; line-height: 1.6;">Thank you for using the Flownetics ROI Calculator. We've prepared a comprehensive analysis of your potential savings and return on investment with our Factory-as-a-Service (FaaS) model.</p>
                </td>
              </tr>

              <!-- ROI Summary Card -->
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <div style="background: linear-gradient(135deg, #702594 0%, #057210 100%); border-radius: 12px; padding: 30px; text-align: center; color: #ffffff;">
                    <h2 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 600; opacity: 0.9;">Investment Return Summary</h2>
                    <div style="font-size: 48px; font-weight: 700; margin: 15px 0; letter-spacing: -1px;">${formatNumber(roiMonths)}</div>
                    <div style="font-size: 20px; font-weight: 500; margin-bottom: 10px;">Months to Breakeven</div>
                    <div style="font-size: 14px; opacity: 0.9; margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
                      <div style="margin-bottom: 5px;">${formatNumber(roiYears)} Years • ${roiPercentage}% Annual ROI</div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Key Metrics -->
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <h2 style="margin: 0 0 20px 0; color: #050505; font-size: 22px; font-weight: 600;">Key Metrics</h2>
                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #f5f5f7;">
                      <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #050505; font-weight: 600; font-size: 14px;">Annual Production Volume</td>
                      <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #86868b; font-size: 14px;">${safeString(reportData.annualQtyTons, '0')} tons</td>
                    </tr>
                    <tr>
                      <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #050505; font-weight: 600; font-size: 14px;">Total Investment Required</td>
                      <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #86868b; font-size: 14px;">${formatMoney(totalCost)}</td>
                    </tr>
                    <tr style="background-color: #f5f5f7;">
                      <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #050505; font-weight: 600; font-size: 14px;">Annual Cost Savings</td>
                      <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #057210; font-weight: 600; font-size: 14px;">${formatMoney(savings)}</td>
                    </tr>
                    <tr>
                      <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #050505; font-weight: 600; font-size: 14px;">Cost per Kg Reduction</td>
                      <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #86868b; font-size: 14px;">${formatMoney(reportData.savingsRmPerKgINR)}</td>
                    </tr>
                    <tr style="background-color: #f5f5f7;">
                      <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; color: #050505; font-weight: 600; font-size: 14px;">Number of Process Steps</td>
                      <td style="padding: 15px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #86868b; font-size: 14px;">${safeString(reportData.numSteps, '0')}</td>
                    </tr>
                    <tr>
                      <td style="padding: 15px; color: #050505; font-weight: 600; font-size: 14px;">FaaS Fee Structure</td>
                      <td style="padding: 15px; text-align: right; color: #86868b; font-size: 14px;">${safeString(reportData.faasPercent, '0')}% of savings</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- CTA Section -->
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <div style="background-color: #f5f5f7; border-left: 4px solid #e07742; border-radius: 8px; padding: 20px;">
                    <p style="margin: 0 0 10px 0; color: #050505; font-size: 16px; font-weight: 600;">💡 Next Steps</p>
                    <p style="margin: 0; color: #86868b; font-size: 14px; line-height: 1.6;">Ready to accelerate your path to production? Contact our team to discuss how Flownetics can help you achieve these savings and more.</p>
                  </div>
                </td>
              </tr>

              <!-- Closing -->
              <tr>
                <td style="padding: 0 30px 30px 30px;">
                  <p style="margin: 0 0 10px 0; color: #050505; font-size: 16px; line-height: 1.6;">If you have any questions or would like to discuss your results in detail, please don't hesitate to reach out.</p>
                  <p style="margin: 15px 0 0 0; color: #050505; font-size: 16px; line-height: 1.6;">Best regards,<br><strong style="color: #702594;">The Flownetics Team</strong></p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f5f5f7; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 10px 0; color: #050505; font-size: 14px; font-weight: 600;">FLOWNETICS Engineering Private Limited</p>
                  <p style="margin: 0 0 5px 0; color: #86868b; font-size: 12px; line-height: 1.6;">148/A, Industrial Suburb 1st Stage, Yeswanthpura-560022, Bangalore, India</p>
                  <p style="margin: 10px 0 0 0; color: #86868b; font-size: 12px;">
                    <a href="mailto:sales@flownetics-engg.com" style="color: #702594; text-decoration: none;">sales@flownetics-engg.com</a> | +91 90350 21855
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, message } = req.body;
    
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const contactData = {
      firstName,
      lastName,
      email,
      phone: phone || '',
      company: company || '',
      message: message || '',
      createdAt: new Date(),
    };

    const result = await db.collection('contacts').insertOne(contactData);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Newsletter subscription
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if email already exists
    const existing = await db.collection('newsletters').findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already subscribed' });
    }

    const newsletterData = {
      email,
      subscribedAt: new Date(),
    };

    const result = await db.collection('newsletters').insertOne(newsletterData);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (username === 'flownetics' && password === 'Flow@AV_2025') {
      // In production, use JWT tokens
      res.json({ success: true, token: 'admin-token' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get all contacts (admin only)
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const contacts = await db.collection('contacts')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Get all newsletter subscriptions (admin only)
app.get('/api/admin/newsletters', async (req, res) => {
  try {
    const newsletters = await db.collection('newsletters')
      .find({})
      .sort({ subscribedAt: -1 })
      .toArray();
    res.json(newsletters);
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    res.status(500).json({ error: 'Failed to fetch newsletters' });
  }
});

// Download ROI Report endpoint
app.post('/api/download-roi', async (req, res) => {
  try {
    const { name, email, reportData } = req.body;
    
    if (!name || !email || !reportData) {
      return res.status(400).json({ error: 'Missing required fields: name, email, and reportData are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Generate email template
    const emailHTML = generateEmailTemplate(name, reportData);

    // Send email via Gmail API
    try {
      await sendEmailViaGmail(
        email,
        'Your Flownetics ROI Analysis Report',
        emailHTML
      );
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Still save the record even if email fails
      // But return error to user
      throw new Error(`Failed to send email: ${emailError.message}`);
    }

    // Save download record to MongoDB
    try {
      const downloadRecord = {
        name,
        email,
        reportData: {
          currency: reportData.currency || 'INR',
          volumeTonsPerMonth: reportData.volumeTonsPerMonth || 0,
          annualQtyTons: reportData.annualQtyTons || (reportData.volumeTonsPerMonth ? reportData.volumeTonsPerMonth * 12 : 0),
          numSteps: reportData.numSteps || 0,
          reactions: reportData.reactions || [],
          roiMonths: reportData.roiMonths || 0,
          totalCostClientINR: reportData.totalCostClientINR || 0,
          savingsAfterFaasINR: reportData.savingsAfterFaasINR || 0,
          ksmCostINR: reportData.ksmCostINR || 0,
          flowneticsKsmINR: reportData.flowneticsKsmINR || 0,
          savingsRmPerKgINR: reportData.savingsRmPerKgINR || 0,
          faasPerKgINR: reportData.faasPerKgINR || 0,
          savingsRmPerAnnumINR: reportData.savingsRmPerAnnumINR || 0,
          flowneticsFeesPerYearINR: reportData.flowneticsFeesPerYearINR || 0,
          partA_INR: reportData.partA_INR || 0,
          partBC_INR: reportData.partBC_INR || 0,
          refundableINR: reportData.refundableINR || 0,
          interestRefundableINR: reportData.interestRefundableINR || 0,
          faasPercent: reportData.faasPercent || 50,
        },
        downloadedAt: new Date(),
      };

      await db.collection('roi_downloads').insertOne(downloadRecord);
    } catch (dbError) {
      console.error('Database error (non-critical):', dbError);
      // Don't fail the request if DB save fails, email was sent
    }

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Download ROI error:', error);
    const errorMessage = error.message || 'Failed to send email';
    res.status(500).json({ error: errorMessage });
  }
});

// Get ROI downloads (admin)
app.get('/api/admin/roi-downloads', async (req, res) => {
  try {
    const downloads = await db.collection('roi_downloads')
      .find({})
      .sort({ downloadedAt: -1 })
      .toArray();
    res.json(downloads);
  } catch (error) {
    console.error('Error fetching downloads:', error);
    res.status(500).json({ error: 'Failed to fetch downloads' });
  }
});

// Get dashboard stats
app.get('/api/admin/stats', async (req, res) => {
  try {
    const contactsCount = await db.collection('contacts').countDocuments();
    const newslettersCount = await db.collection('newsletters').countDocuments();
    const downloadsCount = await db.collection('roi_downloads').countDocuments();
    const blogsCount = await db.collection('blogs').countDocuments();
    const aiAnalysesCount = await db.collection('ai_analyses').countDocuments();
    
    res.json({
      contacts: contactsCount,
      newsletters: newslettersCount,
      downloads: downloadsCount,
      blogs: blogsCount,
      aiAnalyses: aiAnalysesCount,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// ========== BLOG ENDPOINTS ==========

// Get all blogs (public)
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await db.collection('blogs')
      .find({})
      .sort({ date: -1 })
      .toArray();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get single blog by slug (public)
app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const blog = await db.collection('blogs').findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Upload blog image (admin only)
app.post('/api/admin/blogs/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const filename = `blog_${Date.now()}_${req.file.originalname}`;
    const uploadStream = gridFSBucket.openUploadStream(filename, {
      contentType: req.file.mimetype,
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', () => {
      res.json({ 
        success: true, 
        imageId: uploadStream.id.toString(),
        filename: filename
      });
    });

    uploadStream.on('error', (error) => {
      console.error('GridFS upload error:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Get blog image (public)
app.get('/api/blogs/images/:imageId', async (req, res) => {
  try {
    const imageId = new ObjectId(req.params.imageId);
    
    // Get file metadata to determine content type
    const files = await gridFSBucket.find({ _id: imageId }).toArray();
    if (files.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    const file = files[0];
    res.setHeader('Content-Type', file.contentType || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    const downloadStream = gridFSBucket.openDownloadStream(imageId);
    
    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('end', () => {
      res.end();
    });

    downloadStream.on('error', (error) => {
      console.error('GridFS download error:', error);
      if (!res.headersSent) {
        res.status(404).json({ error: 'Image not found' });
      }
    });
  } catch (error) {
    console.error('Image retrieval error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to retrieve image' });
    }
  }
});

// Create blog (admin only)
app.post('/api/admin/blogs', async (req, res) => {
  try {
    const { title, excerpt, content, category, date, slug, imageId, author, readTime } = req.body;
    
    if (!title || !excerpt || !content || !category || !slug || !imageId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if slug already exists
    const existingBlog = await db.collection('blogs').findOne({ slug });
    if (existingBlog) {
      return res.status(409).json({ error: 'Blog with this slug already exists' });
    }

    const blogData = {
      title,
      excerpt,
      content,
      category,
      date: date || new Date().toISOString(),
      slug,
      image: `/api/blogs/images/${imageId}`, // Store the image URL
      imageId, // Store the image ID for reference
      author: author || 'Flownetics Team',
      readTime: readTime || '5 min read',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('blogs').insertOne(blogData);
    res.status(201).json({ success: true, id: result.insertedId, blog: blogData });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

// Update blog (admin only)
app.put('/api/admin/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, category, date, slug, imageId, author, readTime } = req.body;
    
    const updateData = {
      updatedAt: new Date(),
    };

    if (title) updateData.title = title;
    if (excerpt) updateData.excerpt = excerpt;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (date) updateData.date = date;
    if (slug) updateData.slug = slug;
    if (imageId) {
      updateData.image = `/api/blogs/images/${imageId}`;
      updateData.imageId = imageId;
    }
    if (author) updateData.author = author;
    if (readTime) updateData.readTime = readTime;

    // Check if slug already exists (excluding current blog)
    if (slug) {
      const existingBlog = await db.collection('blogs').findOne({ 
        slug, 
        _id: { $ne: new ObjectId(id) } 
      });
      if (existingBlog) {
        return res.status(409).json({ error: 'Blog with this slug already exists' });
      }
    }

    const result = await db.collection('blogs').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog updated successfully' });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

// Delete blog (admin only)
app.delete('/api/admin/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get blog to find image ID
    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(id) });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Delete image from GridFS if exists
    if (blog.imageId) {
      try {
        await gridFSBucket.delete(new ObjectId(blog.imageId));
      } catch (error) {
        console.error('Error deleting image from GridFS:', error);
        // Continue with blog deletion even if image deletion fails
      }
    }

    // Delete blog
    const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// Get all blogs (admin - for management)
app.get('/api/admin/blogs', async (req, res) => {
  try {
    const blogs = await db.collection('blogs')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// ========== AI ANALYSIS ENDPOINTS ==========

// Store AI analysis result
app.post('/api/ai-analysis', async (req, res) => {
  try {
    const { reactionName, feasibilityScore, analysisHtml } = req.body;
    
    if (!reactionName || !analysisHtml) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const analysisData = {
      reactionName,
      feasibilityScore: feasibilityScore || null,
      analysisHtml,
      analyzedAt: new Date(),
    };

    const result = await db.collection('ai_analyses').insertOne(analysisData);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('AI analysis storage error:', error);
    res.status(500).json({ error: 'Failed to store analysis' });
  }
});

// Get all AI analyses (admin only)
app.get('/api/admin/ai-analyses', async (req, res) => {
  try {
    const analyses = await db.collection('ai_analyses')
      .find({})
      .sort({ analyzedAt: -1 })
      .toArray();
    res.json(analyses);
  } catch (error) {
    console.error('Error fetching AI analyses:', error);
    res.status(500).json({ error: 'Failed to fetch analyses' });
  }
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));
  
  // Handle React routing - return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (process.env.NODE_ENV === 'production') {
    console.log('Serving static files from dist folder');
  }
});

