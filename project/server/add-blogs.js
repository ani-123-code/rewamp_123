import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is required');
  process.exit(1);
}

const blogs = [
  {
    title: 'The Future of Chemical Manufacturing: Why Flow Chemistry is Revolutionizing the Industry',
    excerpt: 'Discover how continuous flow chemistry is transforming traditional batch manufacturing, offering unprecedented efficiency, safety, and sustainability in chemical production.',
    content: `
      <div style="font-family: 'FF Nort', sans-serif; line-height: 1.8; color: #1f2937;">
        <h2 style="color: #702594; font-size: 1.75rem; font-weight: 600; margin-bottom: 1.5rem;">Introduction to Flow Chemistry</h2>
        <p style="margin-bottom: 1.5rem; font-size: 1rem;">The chemical manufacturing industry is experiencing a paradigm shift. Traditional batch processes, which have dominated for decades, are being challenged by continuous flow chemistry—a revolutionary approach that offers superior control, efficiency, and safety.</p>
        
        <h3 style="color: #057210; font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">What is Flow Chemistry?</h3>
        <p style="margin-bottom: 1.5rem;">Flow chemistry, also known as continuous flow processing, involves performing chemical reactions in a continuously flowing stream rather than in discrete batches. This approach allows for precise control of reaction parameters, including temperature, pressure, and residence time.</p>
        
        <h3 style="color: #057210; font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">Key Advantages</h3>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.75rem;"><strong>Enhanced Safety:</strong> Smaller reaction volumes reduce the risk of runaway reactions and explosions, making it ideal for hazardous or exothermic processes.</li>
          <li style="margin-bottom: 0.75rem;"><strong>Improved Efficiency:</strong> Continuous processing eliminates downtime between batches, resulting in higher throughput and productivity.</li>
          <li style="margin-bottom: 0.75rem;"><strong>Better Quality Control:</strong> Precise parameter control leads to more consistent product quality and higher yields.</li>
          <li style="margin-bottom: 0.75rem;"><strong>Environmental Benefits:</strong> Reduced waste generation and lower energy consumption contribute to more sustainable manufacturing.</li>
        </ul>
        
        <h3 style="color: #057210; font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">Flownetics&apos; Approach</h3>
        <p style="margin-bottom: 1.5rem;">At Flownetics, we specialize in translating batch processes into efficient flow chemistry systems. Our Factory-as-a-Service (FaaS) model makes this technology accessible without the traditional capital investment barriers.</p>
        
        <p style="margin-bottom: 1.5rem;">Whether you're working with dangerous diazo-intermediates, high-temperature reactions, or complex multi-step syntheses, flow chemistry offers a safer, more efficient path to production.</p>
        
        <div style="background-color: #f0fdf4; border-left: 4px solid #057210; padding: 1.25rem; border-radius: 0.5rem; margin-top: 2rem;">
          <p style="margin: 0; color: #166534; font-weight: 600;">Ready to explore how flow chemistry can transform your manufacturing process? Contact Flownetics to discuss your specific needs →</p>
        </div>
      </div>
    `,
    category: 'Technology',
    date: new Date().toISOString(),
    slug: 'future-of-chemical-manufacturing-flow-chemistry',
    image: '/media/flownetics.png',
    imageId: null,
    author: 'Flownetics Team',
    readTime: '6 min read',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Reducing Manufacturing Costs by 27%: The Economic Impact of Flow Chemistry',
    excerpt: 'Learn how Flownetics helps companies achieve significant cost reductions through optimized flow chemistry processes, with real-world examples of 27% average savings.',
    content: `
      <div style="font-family: 'FF Nort', sans-serif; line-height: 1.8; color: #1f2937;">
        <h2 style="color: #702594; font-size: 1.75rem; font-weight: 600; margin-bottom: 1.5rem;">The Economics of Flow Chemistry</h2>
        <p style="margin-bottom: 1.5rem; font-size: 1rem;">Cost reduction is one of the most compelling reasons companies are switching to flow chemistry. At Flownetics, we've consistently helped clients achieve an average of 27% reduction in manufacturing costs through optimized continuous flow processes.</p>
        
        <h3 style="color: #057210; font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">Where Do the Savings Come From?</h3>
        
        <h4 style="color: #e07742; font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem;">1. Reduced Raw Material Consumption</h4>
        <p style="margin-bottom: 1.5rem;">Flow chemistry enables better mixing and more efficient reactions, leading to reduced solvent usage and lower raw material requirements. Our processes typically use 30-50% less solvent compared to batch methods.</p>
        
        <h4 style="color: #e07742; font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem;">2. Energy Efficiency</h4>
        <p style="margin-bottom: 1.5rem;">Continuous flow reactors have superior heat transfer capabilities, requiring less energy for heating and cooling. The compact design also reduces the energy needed for maintaining reaction conditions.</p>
        
        <h4 style="color: #e07742; font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem;">3. Higher Yields and Selectivity</h4>
        <p style="margin-bottom: 1.5rem;">Precise control of reaction parameters in flow systems often results in higher yields (up to 25% increase) and better selectivity, reducing the need for purification steps and minimizing waste.</p>
        
        <h4 style="color: #e07742; font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem;">4. Reduced Labor Costs</h4>
        <p style="margin-bottom: 1.5rem;">Automated flow systems require less manual intervention, reducing labor costs and human error. Our Factory-as-a-Service model further eliminates the need for specialized operators.</p>
        
        <h3 style="color: #057210; font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">Real-World Example</h3>
        <p style="margin-bottom: 1.5rem;">A client producing 5 tons per month of an API precursor achieved an 18% cost reduction and 44% effluent reduction through our flow chemistry platform. The ROI was achieved in just 15 months through savings alone, without any upfront capital investment.</p>
        
        <div style="background-color: #f0fdf4; border-left: 4px solid #057210; padding: 1.25rem; border-radius: 0.5rem; margin-top: 2rem;">
          <p style="margin: 0; color: #166534; font-weight: 600;">Calculate your potential savings with our ROI Calculator and discover how flow chemistry can reduce your manufacturing costs →</p>
        </div>
      </div>
    `,
    category: 'Business',
    date: new Date().toISOString(),
    slug: 'reducing-manufacturing-costs-27-percent-flow-chemistry',
    image: '/media/flownetics.png',
    imageId: null,
    author: 'Flownetics Team',
    readTime: '7 min read',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Zero Risk Scale-Up: How Flow Chemistry Eliminates Traditional Manufacturing Hazards',
    excerpt: 'Explore how Flownetics\' risk acknowledgment approach ensures safe scale-up of hazardous reactions, from lab validation to commercial production with zero upfront risk.',
    content: `
      <div style="font-family: 'FF Nort', sans-serif; line-height: 1.8; color: #1f2937;">
        <h2 style="color: #702594; font-size: 1.75rem; font-weight: 600; margin-bottom: 1.5rem;">The Scale-Up Challenge</h2>
        <p style="margin-bottom: 1.5rem; font-size: 1rem;">One of the biggest challenges in chemical manufacturing is safely scaling up reactions from the laboratory to commercial production. Traditional batch processes often introduce new risks at larger scales, leading to expensive failures and safety incidents.</p>
        
        <h3 style="color: #057210; font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">Why Batch Processes Fail at Scale</h3>
        <p style="margin-bottom: 1.5rem;">Batch reactors face significant challenges when scaling up:</p>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.75rem;"><strong>Heat Transfer Limitations:</strong> As reactor size increases, the surface area-to-volume ratio decreases, making temperature control difficult and dangerous for exothermic reactions.</li>
          <li style="margin-bottom: 0.75rem;"><strong>Mixing Inefficiencies:</strong> Larger batches often suffer from poor mixing, leading to hot spots, side reactions, and inconsistent product quality.</li>
          <li style="margin-bottom: 0.75rem;"><strong>Thermal Runaway Risk:</strong> The large volume of reactants in batch reactors can lead to catastrophic thermal runaways if temperature control is lost.</li>
        </ul>
        
        <h3 style="color: #057210; font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">Flow Chemistry: The Safe Alternative</h3>
        <p style="margin-bottom: 1.5rem;">Flow chemistry addresses these challenges through its inherent design:</p>
        
        <h4 style="color: #e07742; font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem;">Superior Heat Transfer</h4>
        <p style="margin-bottom: 1.5rem;">Flow reactors provide up to 60% higher heat transfer capacity in 1/10th of the space. This makes them ideal for managing hazardous or exothermic reactions safely, even at production scale.</p>
        
        <h4 style="color: #e07742; font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem;">Checkpoint-Based Validation</h4>
        <p style="margin-bottom: 1.5rem;">At Flownetics, we implement a rigorous validation process at each stage of development. Problems are identified and solved in the lab, not in your factory. This "Risk Acknowledgment" approach ensures zero upfront risk for clients.</p>
        
        <h3 style="color: #057210; font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">Case Study: Diazotization Reaction</h3>
        <p style="margin-bottom: 1.5rem;">A client needed to produce 5 tons per month of an API precursor using a highly unstable, hazardous, and exothermic reaction (100°C exotherm). Traditional batch methods were too dangerous.</p>
        <p style="margin-bottom: 1.5rem;">We developed and installed a modular, telescopic flow platform at the customer's site. The result: safe production with 18% cost reduction and 44% effluent reduction, with zero risk to the client.</p>
        
        <div style="background-color: #f0fdf4; border-left: 4px solid #057210; padding: 1.25rem; border-radius: 0.5rem; margin-top: 2rem;">
          <p style="margin: 0; color: #166534; font-weight: 600;">Have a challenging reaction that's too risky for batch processing? Contact Flownetics to explore safe flow chemistry solutions →</p>
        </div>
      </div>
    `,
    category: 'Safety',
    date: new Date().toISOString(),
    slug: 'zero-risk-scale-up-flow-chemistry-eliminates-hazards',
    image: '/media/flownetics.png',
    imageId: null,
    author: 'Flownetics Team',
    readTime: '8 min read',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Factory-as-a-Service: The New Model for Chemical Manufacturing',
    excerpt: 'Discover how Flownetics\' FaaS model eliminates capital barriers, providing access to advanced flow chemistry technology through a subscription-based approach with proven ROI.',
    content: `
      <div style="font-family: 'FF Nort', sans-serif; line-height: 1.8; color: #1f2937;">
        <h2 style="color: #702594; font-size: 1.75rem; font-weight: 600; margin-bottom: 1.5rem;">Rethinking Chemical Manufacturing</h2>
        <p style="margin-bottom: 1.5rem; font-size: 1rem;">Traditional chemical manufacturing requires massive capital investments in infrastructure, equipment, and specialized facilities. This creates significant barriers to entry and limits innovation. Flownetics&apos; Factory-as-a-Service (FaaS) model changes this paradigm entirely.</p>
        
        <h3 style="color: #057210; font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">What is Factory-as-a-Service?</h3>
        <p style="margin-bottom: 1.5rem;">Factory-as-a-Service is a subscription-based model where Flownetics installs, operates, and maintains modular flow chemistry platforms at your site. Instead of purchasing expensive equipment, you pay for the value delivered—typically a percentage of the cost savings achieved.</p>
        
        <h3 style="color: #057210; font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">Key Benefits of FaaS</h3>
        
        <h4 style="color: #e07742; font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem;">1. Zero Upfront Capital Investment</h4>
        <p style="margin-bottom: 1.5rem;">No need to invest millions in permanent infrastructure. Engagement begins with a one-time R&D service fee and a small refundable deposit (20-30%) upon equipment installation.</p>
        
        <h4 style="color: #e07742; font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem;">2. Shift from CAPEX to OPEX</h4>
        <p style="margin-bottom: 1.5rem;">Move the financial burden from your balance sheet (CAPEX) to a predictable operational expense (OPEX). This improves cash flow and financial flexibility.</p>
        
        <h4 style="color: #e07742; font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem;">3. Rapid ROI</h4>
        <p style="margin-bottom: 1.5rem;">Proven examples show ROI in savings achieved in as little as 15 months. You start saving immediately without waiting to recoup capital investments.</p>
        
        <h4 style="color: #e07742; font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem;">4. Continuous Innovation</h4>
        <p style="margin-bottom: 1.5rem;">Get exclusive access to software and hardware upgrades, keeping your plant at the cutting edge without additional capital investment.</p>
        
        <h3 style="color: #057210; font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">Two Engagement Paths</h3>
        <p style="margin-bottom: 1.5rem;">Flownetics offers flexibility in how you engage:</p>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.75rem;"><strong>Factory-as-a-Service (On-Site):</strong> We install and operate modular platforms directly at your facility.</li>
          <li style="margin-bottom: 0.75rem;"><strong>Product-as-a-Service:</strong> Production happens at Flownetics&apos; facility, and you receive the finished product.</li>
        </ul>
        
        <h3 style="color: #057210; font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem;">The Flownetics Advantage</h3>
        <p style="margin-bottom: 1.5rem;">Our FaaS model includes full automation with AI-driven, IoT-enabled systems allowing for remote monitoring and consistent, push-button manufacturing. We handle all operations and maintenance, so you can focus on your core business.</p>
        
        <div style="background-color: #f0fdf4; border-left: 4px solid #057210; padding: 1.25rem; border-radius: 0.5rem; margin-top: 2rem;">
          <p style="margin: 0; color: #166534; font-weight: 600;">Ready to explore Factory-as-a-Service? Use our ROI Calculator to see your potential savings and contact Flownetics to discuss your needs →</p>
        </div>
      </div>
    `,
    category: 'Business',
    date: new Date().toISOString(),
    slug: 'factory-as-a-service-new-model-chemical-manufacturing',
    image: '/media/flownetics.png',
    imageId: null,
    author: 'Flownetics Team',
    readTime: '9 min read',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function addBlogs() {
  let client;
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db('flownetics_website');
    const blogsCollection = db.collection('blogs');

    console.log('Adding blogs to database...');
    
    for (const blog of blogs) {
      // Check if blog with this slug already exists
      const existing = await blogsCollection.findOne({ slug: blog.slug });
      if (existing) {
        console.log(`Blog with slug "${blog.slug}" already exists. Skipping...`);
        continue;
      }

      // Since we're inserting directly into MongoDB, we can bypass API validation
      // Set a placeholder imageId - user can upload real images via admin panel later
      const blogData = {
        ...blog,
        image: blog.image || '/media/flownetics.png',
        imageId: 'placeholder-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      };

      const result = await blogsCollection.insertOne(blogData);
      console.log(`✓ Added blog: "${blog.title}" (ID: ${result.insertedId})`);
    }

    console.log('\n✅ All blogs added successfully!');
    console.log('\nNote: You may need to upload actual images for these blogs through the admin panel.');
    
  } catch (error) {
    console.error('Error adding blogs:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

addBlogs();

