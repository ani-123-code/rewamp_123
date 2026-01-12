import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import Pillars from './components/Pillars';
import AIArchitect from './components/AIArchitect';
import CalculatorWizard from './components/CalculatorWizard';
import Advantage from './components/Advantage';
import FactoryAsAService from './components/FactoryAsAService';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PillarDetail from './components/PillarDetail';
import BlogDetail from './components/BlogDetail';
import AdminDashboard from './components/AdminDashboard';
import PathToProductionDetail from './components/PathToProductionDetail';
import SEO from './components/SEO';

function HomePage() {
  return (
    <>
      <SEO
        title="Flownetics - Flow Chemistry Solutions | Continuous Flow Processing | Factory-as-a-Service"
        description="Flownetics Engineering provides continuous flow chemistry solutions, Factory-as-a-Service (FaaS), and process optimization services. Transform batch chemistry to flow chemistry with 27% cost reduction and zero upfront risk. Expert in flow chemistry, batch chemistry, chemical manufacturing, and sustainable process development."
        keywords="flow chemistry, continuous flow chemistry, batch chemistry, flow chemistry solutions, chemical manufacturing, process optimization, Factory-as-a-Service, FaaS, flow reactors, continuous flow processing, chemical process development, sustainable chemistry, green chemistry, flow synthesis, microreactors, flow chemistry technology, chemical engineering, process chemistry, API manufacturing, pharmaceutical chemistry, fine chemicals, flow chemistry equipment, flow chemistry services, Flownetics, flownetics engineering"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Flownetics - Flow Chemistry Solutions",
          "description": "Flownetics Engineering provides continuous flow chemistry solutions and Factory-as-a-Service for chemical manufacturing",
          "url": "https://flownetics.com",
          "mainEntity": {
            "@type": "Organization",
            "name": "Flownetics Engineering Private Limited",
            "description": "Leading provider of flow chemistry solutions and continuous flow processing technology"
          }
        }}
      />
      <Hero />
      <VideoSection />
      <Pillars />
      <AIArchitect />
      <CalculatorWizard />
      <Advantage />
      <FactoryAsAService />
      <About />
      <Blog />
      <Contact />
    </>
  );
}

function App() {
  return (
    <div className="bg-white text-brand-black selection:bg-brand-purple selection:text-white">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pillar/:pillarId" element={<PillarDetail />} />
        <Route path="/blog/:blogId" element={<BlogDetail />} />
        <Route path="/path-to-production/:stepId" element={<PathToProductionDetail />} />
        <Route path="/gdhjeuebd/snhdhftT" element={<AdminDashboard />} />
      </Routes>
      <div className="w-full relative overflow-hidden">
        <img 
          src="/media/bar.jpg" 
          alt="Flownetics Engineering - Flow Chemistry Solutions" 
          className="w-full h-3 object-cover"
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
