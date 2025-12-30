import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { steps } from './Advantage';

interface CaseStudy {
  title: string;
  problem: string;
  essence: string;
  result: string;
  businessTakeaway: string;
}

interface BusinessValue {
  title: string;
  points: string[];
}

interface ExtendedStep {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  color: string;
  labelColor: string;
  delay: string;
  overview: string;
  whatWeDo?: string[];
  caseStudy?: CaseStudy;
  businessValue?: BusinessValue;
  technicalCapabilities?: string[];
  deliverables?: string[];
  benefits?: string[];
}

export default function PathToProductionDetail() {
  const { stepId } = useParams<{ stepId: string }>();
  const navigate = useNavigate();

  const step = steps.find((s) => s.id === stepId) as ExtendedStep | undefined;

  if (!step) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Step not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-brand-purple hover:underline"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  const handleContactClick = () => {
    // Navigate to home page with hash to contact section
    navigate('/#contact');
    
    // Ensure smooth scroll after navigation
    setTimeout(() => {
      const element = document.querySelector('#contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand-light">
      {/* Hero Section with Image */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden mb-12">
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 opacity-90"
          style={{
            background: `linear-gradient(135deg, ${step.color}15 0%, ${step.color}05 50%, transparent 100%)`
          }}
        ></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: step.color }}
        ></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: step.color }}
        ></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6 w-fit backdrop-blur-sm bg-black/10 px-4 py-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Path to Production</span>
          </button>
          
          <div className="mb-4">
            <span 
              className="text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm inline-block"
              style={{ 
                color: step.color,
                backgroundColor: `${step.color}20`
              }}
            >
              {step.number} {step.label}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            {step.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl drop-shadow-md">
            {step.description}
          </p>
        </div>
        
        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20 -mt-8">

        {/* Overview */}
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl mb-8 border border-gray-100 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-1 h-full"
            style={{ backgroundColor: step.color }}
          ></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-brand-black flex items-center gap-3">
              <div 
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: step.color }}
              ></div>
              Overview
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {step.overview}
            </p>
          </div>
        </div>

        {/* What We Do */}
        {step.whatWeDo && step.whatWeDo.length > 0 && (
          <div className="bg-gradient-to-br from-brand-light to-white rounded-2xl p-8 md:p-10 shadow-xl mb-8 border border-gray-100 relative overflow-hidden">
            <div 
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10"
              style={{ backgroundColor: step.color }}
            ></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6 text-brand-black flex items-center gap-3">
                <div 
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: step.color }}
                ></div>
                What We Do
              </h2>
              <ul className="space-y-4">
                {step.whatWeDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors">
                    <div 
                      className="w-3 h-3 rounded-full mt-2 flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: step.color }}
                    ></div>
                    <span className="text-gray-700 text-base leading-relaxed flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Case Study */}
        {step.caseStudy && (
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl mb-8 border-2 relative overflow-hidden" style={{ borderColor: step.color }}>
            <div 
              className="absolute top-0 left-0 w-full h-2"
              style={{ backgroundColor: step.color }}
            ></div>
            <div 
              className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-5"
              style={{ backgroundColor: step.color }}
            ></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-8 text-brand-black flex items-center gap-3">
                <div 
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: step.color }}
                ></div>
                {step.caseStudy.title}
              </h2>
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3 text-brand-black flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: step.color }}
                    ></div>
                    The Problem
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{step.caseStudy.problem}</p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3 text-brand-black flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: step.color }}
                    ></div>
                    The Essence
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{step.caseStudy.essence}</p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3 text-brand-black flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: step.color }}
                    ></div>
                    The Result
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{step.caseStudy.result}</p>
                </div>
                <div className="p-6 rounded-xl border-l-4 shadow-md" style={{ 
                  borderLeftColor: step.color,
                  background: `linear-gradient(135deg, ${step.color}10 0%, ${step.color}05 100%)`
                }}>
                  <h3 className="text-lg font-semibold mb-3 text-brand-black">Business Takeaway</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">{step.caseStudy.businessTakeaway}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business Value */}
        {step.businessValue && (
          <div className="bg-gradient-to-br from-brand-light to-white rounded-2xl p-8 md:p-10 shadow-xl mb-8 border border-gray-100 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-1 h-full"
              style={{ backgroundColor: step.color }}
            ></div>
            <div 
              className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10"
              style={{ backgroundColor: step.color }}
            ></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6 text-brand-black flex items-center gap-3">
                <div 
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: step.color }}
                ></div>
                {step.businessValue.title}
              </h2>
              <ul className="space-y-4">
                {step.businessValue.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors">
                    <CheckCircle 
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: step.color }}
                    />
                    <span className="text-gray-700 text-base leading-relaxed flex-1">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Technical Capabilities */}
        {step.technicalCapabilities && step.technicalCapabilities.length > 0 && (
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-brand-black">Technical Capabilities</h2>
            <ul className="space-y-4">
              {step.technicalCapabilities.map((capability, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: step.color }}
                  ></div>
                  <span className="text-gray-700 text-base leading-relaxed flex-1">{capability}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Deliverables */}
        {step.deliverables && step.deliverables.length > 0 && (
          <div className="bg-gradient-to-br from-brand-light to-white rounded-2xl p-8 md:p-10 shadow-lg mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-brand-black">Deliverables</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {step.deliverables.map((deliverable, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle 
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: step.color }}
                  />
                  <span className="text-gray-700 text-base leading-relaxed">{deliverable}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        {step.benefits && step.benefits.length > 0 && (
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-brand-black">Key Benefits</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {step.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-4 bg-brand-light rounded-xl border-l-4"
                  style={{ borderLeftColor: step.color }}
                >
                  <span className="text-gray-700 text-base font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div 
          className="bg-gradient-to-r rounded-2xl p-8 md:p-12 text-white text-center shadow-xl"
          style={{ 
            background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}dd 100%)`
          }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Contact our team to discuss how {step.title.toLowerCase()} can accelerate your path to production.
          </p>
          <button
            onClick={handleContactClick}
            className="inline-block bg-white text-brand-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}

