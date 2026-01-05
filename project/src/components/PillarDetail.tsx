import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { pillars } from './Pillars';
import SEO from './SEO';

export default function PillarDetail() {
  const { pillarId } = useParams<{ pillarId: string }>();
  const navigate = useNavigate();
  const currentPillarId = parseInt(pillarId || '0');
  const pillar = pillars.find((p) => p.id === currentPillarId);
  const currentIndex = pillars.findIndex((p) => p.id === currentPillarId);
  const nextPillar = currentIndex < pillars.length - 1 ? pillars[currentIndex + 1] : null;
  const isLastPillar = currentIndex === pillars.length - 1;

  const handleBackClick = () => {
    navigate('/', { state: { scrollToPillar: currentPillarId } });
    setTimeout(() => {
      const pillarsSection = document.getElementById('pillars');
      if (pillarsSection) {
        pillarsSection.scrollIntoView({ behavior: 'smooth' });
        // Trigger the pillar selection after scroll
        setTimeout(() => {
          const event = new CustomEvent('selectPillar', { detail: { pillarId: currentPillarId } });
          window.dispatchEvent(event);
        }, 500);
      }
    }, 100);
  };

  const handleNextClick = () => {
    if (nextPillar) {
      navigate(`/pillar/${nextPillar.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  };


  if (!pillar) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Pillar not found</h1>
          <button
            onClick={handleBackClick}
            className="text-brand-purple hover:text-brand-orange transition-colors font-semibold"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  const accentColorClass = pillar.accentColor.includes('orange') ? 'text-brand-orange' :
                          pillar.accentColor.includes('purple') ? 'text-brand-purple' :
                          'text-brand-green';
  
  const accentBorderClass = pillar.accentColor.includes('orange') ? 'border-brand-orange' :
                           pillar.accentColor.includes('purple') ? 'border-brand-purple' :
                           'border-brand-green';
  
  // Use gradient similar to hero section (purple to green)
  const accentBgGradient = 'from-brand-purple/10 via-white to-brand-green/5';
  const accentCardGradient = 'from-brand-purple/5 via-white to-brand-green/5';
  
  const accentColorValue = pillar.accentColor.includes('orange') ? '#e07742' :
                          pillar.accentColor.includes('purple') ? '#702594' :
                          '#057210';

  const pillarUrl = `https://flownetics.com/pillar/${pillar.id}`;
  const pillarDescription = `Learn about ${pillar.title} - ${pillar.description.substring(0, 150)}...`;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <SEO
        title={`${pillar.title} - Flow Chemistry Solutions | Flownetics`}
        description={pillarDescription}
        keywords={`${pillar.title}, flow chemistry, continuous flow chemistry, ${pillar.title.toLowerCase()}, chemical manufacturing, process optimization, Flownetics, flow chemistry technology`}
        url={pillarUrl}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": pillar.title,
          "description": pillarDescription,
          "url": pillarUrl,
          "author": {
            "@type": "Organization",
            "name": "Flownetics Engineering"
          }
        }}
      />
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
              className="inline-flex items-center justify-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-2xl bg-brand-black text-white text-xs font-medium hover:bg-gradient-purple transition-all shadow-lg group"
              style={{ fontFamily: "'FF Nort', sans-serif" }}
          >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 flex-shrink-0" />
              <span className="whitespace-nowrap">Back to Pillars</span>
          </button>

            {!isLastPillar && nextPillar && (
              <button
                onClick={handleNextClick}
                className="inline-flex items-center justify-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-2xl bg-brand-black text-white text-xs font-medium hover:bg-gradient-purple transition-all shadow-lg group"
                style={{ fontFamily: "'FF Nort', sans-serif" }}
              >
                <span className="whitespace-nowrap">Next: {nextPillar.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </button>
            )}
          </div>

          {/* Title Section */}
          <div className={`bg-gradient-to-br ${accentBgGradient} border-2 ${accentBorderClass}/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 mb-8 sm:mb-12 md:mb-16 shadow-xl`}>
          <div className="max-w-4xl">
              <span className={`inline-block text-xs sm:text-sm font-medium uppercase tracking-widest ${accentColorClass} mb-3 sm:mb-4`}
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
              {pillar.number}
            </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-3 sm:mb-4 md:mb-6 tracking-tight leading-tight text-gray-900"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
              {pillar.title}
            </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 font-light leading-relaxed"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
              {pillar.description}
            </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Overview */}
          {pillar.overview && (
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 sm:mb-4"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                Overview
              </h2>
              <div className={`bg-gradient-to-br ${accentCardGradient} rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border-2 ${accentBorderClass}/40 shadow-xl hover:shadow-2xl transition-all duration-300`}>
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-light"
                  style={{ fontFamily: "'FF Nort', sans-serif" }}>
                  {pillar.overview}
                </p>
              </div>
            </div>
          )}

          {/* Technical Capabilities */}
          {pillar.technicalCapabilities && pillar.technicalCapabilities.length > 0 && (
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 sm:mb-4"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                Technical Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {pillar.technicalCapabilities.map((capability, index) => (
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

          {/* Business Impact */}
          {pillar.businessImpact && pillar.businessImpact.length > 0 && (
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 sm:mb-4"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                Business Impact
              </h2>
              <div className={`bg-gradient-to-br ${accentCardGradient} rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border-2 ${accentBorderClass}/40 shadow-xl hover:shadow-2xl transition-all duration-300`}>
                <ul className="space-y-2 sm:space-y-3">
                  {pillar.businessImpact.map((impact, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{
                          backgroundColor: accentColorValue
                        }}
                      ></div>
                      <span className="text-gray-800 text-sm leading-relaxed font-light"
                        style={{ fontFamily: "'FF Nort', sans-serif" }}>
                        {impact}
                      </span>
              </li>
                  ))}
            </ul>
          </div>
        </div>
          )}

          {/* Key Benefits */}
          {pillar.keyBenefits && pillar.keyBenefits.length > 0 && (
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 sm:mb-4"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                Key Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {pillar.keyBenefits.map((benefit, index) => (
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

          {/* Path to Production */}
          {pillar.pathToProduction && pillar.pathToProduction.length > 0 && (
            <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3 sm:mb-4"
                style={{ fontFamily: "'FF Nort', sans-serif" }}>
                Path to Production
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {pillar.pathToProduction.map((step, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${accentCardGradient} rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border-2 ${accentBorderClass}/40 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${accentColorValue}20`
                        }}
                      >
                        <span className={`text-xl font-medium ${accentColorClass}`}
                          style={{ fontFamily: "'FF Nort', sans-serif" }}>
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-2"
                      style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      {step}
                    </h3>
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
              <span className="whitespace-nowrap">Back to Pillars</span>
            </button>
            
            {!isLastPillar && nextPillar && (
          <button
                onClick={handleNextClick}
                className="inline-flex items-center justify-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-2xl bg-brand-black text-white text-xs font-medium hover:bg-gradient-purple transition-all shadow-lg group"
                style={{ fontFamily: "'FF Nort', sans-serif" }}
          >
                <span className="whitespace-nowrap">Next: {nextPillar.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
          </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
