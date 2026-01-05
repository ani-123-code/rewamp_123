# Adding Blogs to Flownetics Website

✅ **Blogs have been successfully added to the database!**

The 4 pre-written blogs about flow chemistry and Flownetics have been added. You can now:

1. **View the blogs:**
   - Visit the blog section on your website
   - All 4 blogs should now be visible

2. **Upload images through Admin Panel (Recommended):**
   - Log in to the admin panel at `/gdhjeuebd/snhdhftT`
   - Go to the Blogs section
   - Edit each blog and upload appropriate images
   - The blogs currently use placeholder images

## Re-running the Script

If you need to add the blogs again (e.g., after clearing the database):

1. **Make sure your server is configured:**
   - Ensure `server/.env` has your `MONGODB_URI` set
   - Make sure MongoDB is running and accessible

2. **Run the script:**
   ```bash
   cd server
   npm run add-blogs
   ```
   
   Note: The script will skip blogs that already exist (based on slug).

## Option 2: Manual Entry via Admin Panel

If you prefer to add blogs manually:

1. Log in to the admin panel at `/gdhjeuebd/snhdhftT`
2. Navigate to the "Blogs" tab
3. Click "Create New Blog"
4. Fill in the details for each blog (see blog content below)

## The 4 Blogs Included

### 1. The Future of Chemical Manufacturing: Why Flow Chemistry is Revolutionizing the Industry
- **Category:** Technology
- **Slug:** `future-of-chemical-manufacturing-flow-chemistry`
- **Read Time:** 6 min read
- **Focus:** Introduction to flow chemistry, its advantages, and Flownetics' approach

### 2. Reducing Manufacturing Costs by 27%: The Economic Impact of Flow Chemistry
- **Category:** Business
- **Slug:** `reducing-manufacturing-costs-27-percent-flow-chemistry`
- **Read Time:** 7 min read
- **Focus:** Cost reduction benefits, real-world examples, ROI

### 3. Zero Risk Scale-Up: How Flow Chemistry Eliminates Traditional Manufacturing Hazards
- **Category:** Safety
- **Slug:** `zero-risk-scale-up-flow-chemistry-eliminates-hazards`
- **Read Time:** 8 min read
- **Focus:** Safety benefits, risk acknowledgment, case studies

### 4. Factory-as-a-Service: The New Model for Chemical Manufacturing
- **Category:** Business
- **Slug:** `factory-as-a-service-new-model-chemical-manufacturing`
- **Read Time:** 9 min read
- **Focus:** FaaS model, benefits, engagement paths

## Notes

- All blogs are written in HTML format with proper styling
- They include call-to-action sections linking to Flownetics services
- Images need to be uploaded separately through the admin panel
- The blogs use the Flownetics brand colors and styling
- All content is optimized for SEO and readability

## Troubleshooting

If the script fails:
- Check that MongoDB is running and accessible
- Verify `MONGODB_URI` in `server/.env` is correct
- Ensure you have write permissions to the database
- Check the console for specific error messages

