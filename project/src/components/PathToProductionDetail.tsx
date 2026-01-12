import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
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
  const currentIndex = steps.findIndex((s) => s.id === stepId);
  const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
  const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const isLastStep = currentIndex === steps.length - 1;
  const isFirstStep = currentIndex === 0;

  // Get image path for each step - supports step-specific images
  const getImagePath = (stepId: string) => {
    const imageMap: Record<string, string> = {
      'feasibility-study': '/media/image.png',
      'process-optimization': '/media/image_2.PNG',
      'commercialization': '/media/image_2.PNG'
    };
    return imageMap[stepId] || '/media/image.png';
  };

  if (!step) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Step not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-brand-purple hover:text-brand-orange transition-colors font-semibold"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  // Determine accent color classes based on step color
  const accentColorClass = step.color === '#702594' ? 'text-brand-purple' :
                          step.color === '#057210' ? 'text-brand-green' :
                          step.color === '#1406b3' ? 'text-brand-blue' :
                          'text-brand-purple';
  
  const accentBorderClass = step.color === '#702594' ? 'border-brand-purple' :
                           step.color === '#057210' ? 'border-brand-green' :
                           step.color === '#1406b3' ? 'border-brand-blue' :
                           'border-brand-purple';
  
  // Use gradient similar to hero section (purple to green)
  const accentBgGradient = 'from-brand-purple/10 via-white to-brand-green/5';
  const accentCardGradient = 'from-brand-purple/5 via-white to-brand-green/5';
  
  const accentColorValue = step.color;

  const handleBackClick = () => {
    navigate('/', { state: { scrollToPath: 'advantage' } });
    setTimeout(() => {
      const pathSection = document.getElementById('advantage');
      if (pathSection) {
        pathSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNextClick = () => {
    if (nextStep) {
      navigate(`/path-to-production/${nextStep.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevClick = () => {
    if (prevStep) {
      navigate(`/path-to-production/${prevStep.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    navigate('/#contact');
    setTimeout(() => {
      const element = document.querySelector('#contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Dynamic Background Elements - Similar to Hero */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-gray-200/20 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[120px] animate-blob opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] bg-gray-300/15 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[120px] animate-blob animation-delay-2000 opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] bg-gray-200/15 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[120px] animate-blob animation-delay-4000 opacity-15"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
            <button
              onClick={handleBackClick}
              className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-xl sm:rounded-2xl bg-brand-black text-white text-[10px] sm:text-xs font-medium hover:bg-gradient-purple transition-all shadow-lg group"
              style={{ fontFamily: "'FF Nort', sans-serif" }}
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300 flex-shrink-0" />
              <span className="whitespace-nowrap text-center">Back to Path to Production</span>
            </button>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {!isFirstStep && prevStep && (
                <button
                  onClick={handlePrevClick}
                  className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-xl sm:rounded-2xl bg-brand-black text-white text-[10px] sm:text-xs font-medium hover:bg-gradient-purple transition-all shadow-lg group w-full sm:w-auto"
                  style={{ fontFamily: "'FF Nort', sans-serif" }}
                >
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300 flex-shrink-0" />
                  <span className="whitespace-nowrap">Prev: {prevStep.label}</span>
                </button>
              )}

              {!isLastStep && nextStep && (
                <button
                  onClick={handleNextClick}
                  className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-xl sm:rounded-2xl bg-brand-black text-white text-[10px] sm:text-xs font-medium hover:bg-gradient-purple transition-all shadow-lg group w-full sm:w-auto"
                  style={{ fontFamily: "'FF Nort', sans-serif" }}
                >
                  <span className="whitespace-nowrap">Next: {nextStep.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                </button>
              )}
            </div>
          </div>

          {/* Title Section */}
          <div className={`bg-gradient-to-br ${accentBgGradient} border-2 ${accentBorderClass}/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 mb-6 sm:mb-8 md:mb-10 shadow-xl`}>
            <div className="max-w-4xl">
              <span className={`inline-block text-[10px] sm:text-xs font-medium uppercase tracking-widest ${accentColorClass} mb-2 sm:mb-3`}
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                {step.number}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-tight leading-tight text-gray-900"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                <span>{step.title}</span>
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 font-light ml-2 sm:ml-3">
                  {step.description}
                </span>
              </h1>
            </div>
          </div>

        </div>
      </div>

      {/* Image Section - Aligned with Content */}
      {(step.id === 'feasibility-study' || step.id === 'process-optimization' || step.id === 'commercialization') && (
        <div className="relative z-10 w-full px-2 sm:px-4 lg:px-6 mb-8 sm:mb-12 md:mb-16">
          <div className="max-w-[95vw] mx-auto">
            <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gray-200 shadow-xl bg-gray-50">
              <img 
                src={getImagePath(step.id)}
                alt={step.label} 
                className="w-full h-full object-contain max-h-[400px] sm:max-h-[500px] md:max-h-[600px] lg:max-h-[700px] mx-auto block"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Overview */}
          {step.overview && (
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 sm:mb-4"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                Overview
              </h2>
              <div className={`bg-gradient-to-br ${accentCardGradient} rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border-2 ${accentBorderClass}/40 shadow-xl hover:shadow-2xl transition-all duration-300`}>
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-light"
                  style={{ fontFamily: "'FF Nort', sans-serif" }}>
                  {step.overview}
                </p>
              </div>
            </div>
          )}

          {/* What We Do */}
          {step.whatWeDo && step.whatWeDo.length > 0 && (
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 sm:mb-4"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                What We Do
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {step.whatWeDo.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 border-l-4 ${accentBorderClass} hover:shadow-2xl transition-all duration-300 border-r border-t border-b border-gray-200 group`}
                    style={{
                      borderLeftWidth: '4px',
                      borderLeftColor: accentColorValue
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderRightColor = accentColorValue;
                      e.currentTarget.style.borderTopColor = accentColorValue;
                      e.currentTarget.style.borderBottomColor = accentColorValue;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderRightColor = 'rgb(229, 231, 235)';
                      e.currentTarget.style.borderTopColor = 'rgb(229, 231, 235)';
                      e.currentTarget.style.borderBottomColor = 'rgb(229, 231, 235)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <p className="text-gray-800 leading-relaxed text-sm sm:text-base font-light"
                      style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Case Study */}
          {step.caseStudy && (
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 sm:mb-4"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                {step.caseStudy.title}
              </h2>
              <div className={`bg-gradient-to-br ${accentCardGradient} rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border-2 ${accentBorderClass}/40 shadow-xl hover:shadow-2xl transition-all duration-300`}>
                <div className="space-y-4 sm:space-y-6">
                  <div className="p-4 sm:p-6 rounded-xl bg-white border border-gray-100">
                    <h3 className="text-sm sm:text-base font-medium mb-2 sm:mb-3 text-gray-800 flex items-center gap-2"
                      style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      <div 
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: accentColorValue }}
                      ></div>
                      The Problem
                    </h3>
                    <p className="text-gray-800 leading-relaxed text-sm sm:text-base font-light"
                      style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      {step.caseStudy.problem}
                    </p>
                  </div>
                  <div className="p-4 sm:p-6 rounded-xl bg-white border border-gray-100">
                    <h3 className="text-sm sm:text-base font-medium mb-2 sm:mb-3 text-gray-800 flex items-center gap-2"
                      style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      <div 
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: accentColorValue }}
                      ></div>
                      The Essence
                    </h3>
                    <p className="text-gray-800 leading-relaxed text-sm sm:text-base font-light"
                      style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      {step.caseStudy.essence}
                    </p>
                  </div>
                  <div className="p-4 sm:p-6 rounded-xl bg-white border border-gray-100">
                    <h3 className="text-sm sm:text-base font-medium mb-2 sm:mb-3 text-gray-800 flex items-center gap-2"
                      style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      <div 
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: accentColorValue }}
                      ></div>
                      The Result
                    </h3>
                    <p className="text-gray-800 leading-relaxed text-sm sm:text-base font-light"
                      style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      {step.caseStudy.result}
                    </p>
                  </div>
                  <div className="p-4 sm:p-6 rounded-xl border-l-4 shadow-md bg-white"
                    style={{ 
                      borderLeftColor: accentColorValue
                    }}>
                    <h3 className="text-sm sm:text-base font-medium mb-2 sm:mb-3 text-gray-800"
                      style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      Business Takeaway
                    </h3>
                    <p className="text-gray-800 leading-relaxed text-sm sm:text-base font-light"
                      style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      {step.caseStudy.businessTakeaway}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business Value */}
          {step.businessValue && (
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 sm:mb-4"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                {step.businessValue.title}
              </h2>
              <div className={`bg-gradient-to-br ${accentCardGradient} rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border-2 ${accentBorderClass}/40 shadow-xl hover:shadow-2xl transition-all duration-300`}>
                <ul className="space-y-2 sm:space-y-3">
                  {step.businessValue.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{
                          backgroundColor: accentColorValue
                        }}
                      ></div>
                      <span className="text-gray-800 text-sm leading-relaxed font-light"
                        style={{ fontFamily: "'FF Nort', sans-serif" }}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Technical Capabilities */}
          {step.technicalCapabilities && step.technicalCapabilities.length > 0 && (
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 sm:mb-4"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                Technical Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {step.technicalCapabilities.map((capability, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 border-l-4 ${accentBorderClass} hover:shadow-2xl transition-all duration-300 border-r border-t border-b border-gray-200 group`}
                    style={{
                      borderLeftWidth: '4px',
                      borderLeftColor: accentColorValue
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderRightColor = accentColorValue;
                      e.currentTarget.style.borderTopColor = accentColorValue;
                      e.currentTarget.style.borderBottomColor = accentColorValue;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderRightColor = 'rgb(229, 231, 235)';
                      e.currentTarget.style.borderTopColor = 'rgb(229, 231, 235)';
                      e.currentTarget.style.borderBottomColor = 'rgb(229, 231, 235)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <p className="text-gray-800 leading-relaxed text-sm sm:text-base font-light"
                      style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      {capability}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables */}
          {step.deliverables && step.deliverables.length > 0 && (
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 sm:mb-4"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                Deliverables
              </h2>
              <div className={`bg-gradient-to-br ${accentCardGradient} rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border-2 ${accentBorderClass}/40 shadow-xl hover:shadow-2xl transition-all duration-300`}>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                  {step.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle 
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: accentColorValue }}
                      />
                      <span className="text-gray-800 text-sm sm:text-base leading-relaxed font-light"
                        style={{ fontFamily: "'FF Nort', sans-serif" }}>
                        {deliverable}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Benefits */}
          {step.benefits && step.benefits.length > 0 && (
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 sm:mb-4"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                Key Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {step.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 border-2 border-gray-200 transition-all duration-300 hover:shadow-2xl group"
                    style={{
                      borderColor: 'rgb(229, 231, 235)',
                      fontFamily: "'FF Nort', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = accentColorValue;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgb(229, 231, 235)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <p className="text-gray-800 text-sm sm:text-base font-light leading-relaxed"
                      style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-200">
            <button
              onClick={handleBackClick}
              className="inline-flex items-center justify-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-2xl bg-brand-black text-white text-xs font-medium hover:bg-gradient-purple transition-all shadow-lg group"
              style={{ fontFamily: "'FF Nort', sans-serif" }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 flex-shrink-0" />
              <span className="whitespace-nowrap">Back to Path to Production</span>
            </button>
            
            <div className="flex gap-3">
              {!isFirstStep && prevStep && (
                <button
                  onClick={handlePrevClick}
                  className="inline-flex items-center justify-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-2xl bg-brand-black text-white text-xs font-medium hover:bg-gradient-purple transition-all shadow-lg group"
                  style={{ fontFamily: "'FF Nort', sans-serif" }}
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 flex-shrink-0" />
                  <span className="whitespace-nowrap">Prev: {prevStep.label}</span>
                </button>
              )}

              {!isLastStep && nextStep && (
                <button
                  onClick={handleNextClick}
                  className="inline-flex items-center justify-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-2xl bg-brand-black text-white text-xs font-medium hover:bg-gradient-purple transition-all shadow-lg group"
                  style={{ fontFamily: "'FF Nort', sans-serif" }}
                >
                  <span className="whitespace-nowrap">Next: {nextStep.label}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
