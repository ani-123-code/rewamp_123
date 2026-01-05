import { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const pillars = [
  {
    id: 1,
    title: 'Cost Reduction',
    description: 'Average manufacturing cost decrease of 27%.',
    overview: 'Flownetics addresses the financial inefficiencies of conventional batch manufacturing, Where too much capital is often stuck; by utilizing flow chemistry it enable predictable output and lower costs. Our model achieves an average manufacturing cost decrease of 27%.',
    technicalCapabilities: [
      'Process Intensification: Maximizing yield while minimizing resource requirements.',
      'Optimized Resource Usage: Reduced raw material requirements and significantly lower solvent and agent volumes.',
      'Energy Efficiency: Lower energy consumption through advanced flow reactor heat management.',
      'Automation: Intelligent protocols that reduce man-power requirements.'
    ],
    businessImpact: [
      'Increased Margins: Efficiencies in material and energy consumption directly improve profitability.',
      'Accelerated Development: Faster development cycles reduce the time-to-market for new products.',
      'Inventory Efficiency: High-speed production (e.g., achieving 60 days of batch output in just 5 days) reduces carrying costs.'
    ],
    keyBenefits: [
      'Up to 35% proven savings in specific applications.',
      'Better selectivity and higher yields (up to 25% increase).',
      'Lower catalyst loading and optimized pressure/temperature parameters.'
    ],
    pathToProduction: [
      'Feasibility study',
      'Process optimization & scale up',
      'Commercialization'
    ],
    number: '01',
    accentColor: 'text-brand-orange',
    borderColor: 'border-brand-orange'
  },
  {
    id: 2,
    title: 'Risk Acknowledgment',
    description: 'Safety engineered into every step with 0% upfront risk.',
    overview: 'Safety is engineered into every step of the Flownetics process. Our "Risk Acknowledgment" pillar ensures early identification and validation, solving problems during development before they reach the scale-up phase.',
    technicalCapabilities: [
      'Checkpoint-Based Validation: Every stage of development acts as a validation checkpoint to catch risks while they are small.',
      'Superior Thermal Control: Flow reactors provide up to 60% higher heat transfer capacity in 1/10th of the space, managing hazardous or exothermic reactions safely.',
      'Process Mapping: Continuous flow parameters are meticulously mapped to replace less predictable batch methods.'
    ],
    businessImpact: [
      'Reduced Liability: Early risk mitigation prevents expensive failures during large-scale commercial runs.',
      'Confident Scaling: Full validation is required before any capital investment is made, eliminating financial uncertainty.'
    ],
    keyBenefits: [
      '0% upfront risk for clients.',
      'Enhanced safety for highly unstable or unstable diazo-intermediates.',
      'Validation and compliance-ready processes for regulated industries.'
    ],
    pathToProduction: [
      'Feasibility study',
      'Process optimization & scale up',
      'Commercialization'
    ],
    number: '02',
    accentColor: 'text-brand-purple',
    borderColor: 'border-brand-purple'
  },
  {
    id: 3,
    title: 'CAPEX-Free Engagement',
    description: 'Factory-as-a-Service model with ROI in as little as 15 months.',
    overview: 'We remove the burden of building and maintaining infrastructure through a "Factory-as-a-Service" (FaaS) model. This approach allows organizations to scale without large capital investments, paying for performance and outcomes rather than plant walls.',
    technicalCapabilities: [
      'Modular Platforms: Deployment of custom reactors and modular platforms directly to the customer site.',
      'Subscription Infrastructure: Full O&M (Operations and Maintenance) of equipment is handled by Flownetics.',
      'Continuous Upgrades: Ongoing access to both hardware and software advancements.'
    ],
    businessImpact: [
      'Shift from CAPEX to OPEX: Transparent monthly fees tied to the savings and value created.',
      'Eliminated Financial Barriers: No upfront investment in infrastructure is required to adopt flow chemistry.',
      'Rapid ROI: Proven examples show an ROI in savings achieved in as little as 15 months.'
    ],
    keyBenefits: [
      'Two Engagement Paths: Choose between Factory-as-a-Service (on-site) or Product-as-a-Service (at Flownetics\' facility).',
      'Minimal Entry Cost: Engagement begins with a one-time R&D service fee and a small refundable deposit (20–30%) upon equipment installation.'
    ],
    pathToProduction: [
      'Feasibility study',
      'Process optimization & scale up',
      'Commercialization'
    ],
    number: '03',
    accentColor: 'text-brand-blue',
    borderColor: 'border-brand-blue'
  },
  {
    id: 4,
    title: 'Sustainability Focus',
    description: '93% isolated yield with up to 80% reduction in effluents.',
    overview: 'Sustainability is a core pillar where greener processes meet better economics. By embedding eco-friendly operations into the process core, we help companies meet regulatory and ESG mandates ahead of schedule.',
    technicalCapabilities: [
      'Waste Minimization: Significant reduction in effluents (up to 80% reduction observed in case studies).',
      'Solvent Reduction: Inherently cleaner processes that use far fewer solvents and generate less waste.',
      'Compact Footprint: Reactors use a fraction of the real estate compared to traditional plants while maintaining high efficiency.'
    ],
    businessImpact: [
      'Compliance Future-Proofing: Strengthened compliance reduces environmental load and long-term regulatory risk.',
      'Profitability through Greenery: Environmental benefits, such as better yields and lower resource consumption, drive long-term financial gain.'
    ],
    keyBenefits: [
      '93% isolated yield in hazardous processes (like diazotization) with dramatically reduced impurities.',
      'Reduced emissions and lower overall carbon footprint.'
    ],
    pathToProduction: [
      'Feasibility study',
      'Process optimization & scale up',
      'Commercialization'
    ],
    number: '04',
    accentColor: 'text-brand-green',
    borderColor: 'border-brand-green'
  },
  {
    id: 5,
    title: 'Supply Chain Resilience',
    description: 'Self-reliant, scalable production ecosystems.',
    overview: 'Supply chain dependency increases cost and risk. Flownetics builds resilience by creating self-reliant, scalable production ecosystems that turn dependency into a competitive strength.',
    technicalCapabilities: [
      'Flexible Systems: Design of agile manufacturing systems that can adapt to changing needs.',
      'Diverse Vendor Networks: Utilization of geographically diverse networks to reduce reliance on imported materials.',
      'In-House Capability: Building flow chemistry capabilities from the initial stage to minimize external disruption risks.'
    ],
    businessImpact: [
      'Predictable Operations: Stability even during periods of market volatility.',
      'Reduced Logistics Cost: Streamlined logistics networks and reduced dependency on external suppliers.'
    ],
    keyBenefits: [
      'Faster time-to-market through de-risked operations.',
      'Geographic risk diversification.'
    ],
    pathToProduction: [
      'Feasibility study',
      'Process optimization & scale up',
      'Commercialization'
    ],
    number: '05',
    accentColor: 'text-brand-green',
    borderColor: 'border-brand-green'
  },
  {
    id: 6,
    title: 'Manufacturing Versatility',
    description: 'Full chemistry spectrum from standard to high-risk continuous processing.',
    overview: 'Our expertise spans the full chemistry spectrum, from standard pharmaceutical manufacturing to highly complex, high-risk continuous processing. This allows clients to scale any molecule confidently without technical limitations.',
    technicalCapabilities: [
      'Hazardous Chemistry Mastery: Safe handling of fast, exothermic, and pyrophoric reactions.',
      'Advanced Synthesis: Capabilities in solvent-free, high temperature/pressure (T/P) synthesis, and slurry phase reactions.',
      'Catalysis: Expertise in heterogeneous catalysis and simplified downstream processing.'
    ],
    businessImpact: [
      'Portfolio Flexibility: Ability to handle everything from basic molecules to high-value, low-volume specialty chemicals.',
      'Scale-Up Consistency: Elimination of the yield bottlenecks and inconsistencies often found in traditional scale-up.'
    ],
    keyBenefits: [
      'Multistep, high-risk continuous processing capabilities.',
      'Consistent product quality meeting USP & EP specifications.'
    ],
    pathToProduction: [
      'Feasibility study',
      'Process optimization & scale up',
      'Commercialization'
    ],
    number: '06',
    accentColor: 'text-brand-purple',
    borderColor: 'border-brand-purple'
  },
];

export default function Pillars() {
  const location = useLocation();
  const [activePillar, setActivePillar] = useState<number | null>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const handlePillarClick = (pillarId: number) => {
    if (pillarId !== activePillar && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setActivePillar(pillarId);
        setTimeout(() => setIsAnimating(false), 400);
      }, 300);
      
      // Scroll to the detail panel to ensure it's visible at the top
      setTimeout(() => {
        if (detailPanelRef.current) {
          const element = detailPanelRef.current;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 120; // Offset for navigation bar and spacing
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // Fallback: scroll to the pillars section
          const pillarsSection = document.getElementById('pillars');
          if (pillarsSection) {
            const elementPosition = pillarsSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 120;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 150);
    }
  };

  // Handle navigation from detail page
  useEffect(() => {
    const state = location.state as { scrollToPillar?: number } | null;
    if (state?.scrollToPillar && state.scrollToPillar !== activePillar) {
      setActivePillar(state.scrollToPillar);
    }

    // Listen for custom event from detail page
    const handleSelectPillar = (event: CustomEvent) => {
      const pillarId = (event as CustomEvent<{ pillarId: number }>).detail.pillarId;
      if (pillarId && pillarId !== activePillar) {
        handlePillarClick(pillarId);
      }
    };

    window.addEventListener('selectPillar', handleSelectPillar as EventListener);
    return () => {
      window.removeEventListener('selectPillar', handleSelectPillar as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const selectedPillar = pillars.find((p) => p.id === activePillar);

  return (
    <section id="pillars" className="relative py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-orange/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 sm:mb-16 text-center">
          <div className="inline-block mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                The Flownetics Standard.
              </h2>
          </div>
          <p className="text-gray-300 text-sm font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>Click to explore each pillar.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          <div className="space-y-3 sm:space-y-4 lg:col-span-2">
            {pillars.map((pillar) => (
              <PillarCard
                key={pillar.id}
                pillar={pillar}
                isActive={activePillar === pillar.id}
                onClick={() => handlePillarClick(pillar.id)}
              />
            ))}
          </div>

          <div ref={detailPanelRef} className="lg:sticky lg:top-24 detail-panel-container lg:col-span-3">
            {selectedPillar && (
              <div
                className={`detail-panel bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-800/60 border border-gray-700/50 rounded-2xl p-5 sm:p-7 shadow-2xl cursor-purple transition-all duration-300 flex flex-col ${
                  isAnimating ? 'slide-out' : 'slide-in'
                }`}
              >
                <p className="text-gray-200 mb-4 text-sm sm:text-base leading-relaxed font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                  {selectedPillar.description}
                </p>

                {/* Overview - Show only first part */}
                {selectedPillar.overview && (
                  <div className="border-t border-gray-700/50 pt-4 mb-4">
                  <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      Overview
                  </h4>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-light line-clamp-3 overflow-hidden" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      {selectedPillar.overview}
                  </p>
                </div>
                )}

                {/* Technical Capabilities - Show only first 2 */}
                {selectedPillar.technicalCapabilities && selectedPillar.technicalCapabilities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      Technical Capabilities
                  </h4>
                  <ul className="space-y-2">
                      {selectedPillar.technicalCapabilities.slice(0, 2).map((capability, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{
                              backgroundColor: selectedPillar.accentColor.includes('orange') ? '#e07742' :
                                              selectedPillar.accentColor.includes('purple') ? '#702594' :
                                              selectedPillar.accentColor.includes('green') ? '#057210' : '#702594'
                            }}
                          ></div>
                          <span className="text-gray-300 text-sm leading-relaxed line-clamp-2 font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>{capability}</span>
                    </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Benefits - Show only first 2 */}
                {selectedPillar.keyBenefits && selectedPillar.keyBenefits.length > 0 && (
                  <div className="bg-gray-900/40 rounded-xl p-4 shadow-sm mb-4 flex-grow">
                    <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {selectedPillar.keyBenefits.slice(0, 2).map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{
                              backgroundColor: selectedPillar.accentColor.includes('orange') ? '#e07742' :
                                              selectedPillar.accentColor.includes('purple') ? '#702594' :
                                              selectedPillar.accentColor.includes('green') ? '#057210' : '#702594'
                            }}
                          ></div>
                          <span className="text-gray-300 text-sm leading-relaxed line-clamp-2 font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>{benefit}</span>
                    </li>
                      ))}
                  </ul>
                </div>
                )}

                <div className="pt-4 border-t border-gray-700/50 mt-auto">
                  <a
                    href={`/pillar/${selectedPillar.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/pillar/${selectedPillar.id}`;
                    }}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium uppercase tracking-wider text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                      selectedPillar.accentColor.includes('orange') 
                        ? 'bg-brand-orange hover:bg-brand-orange/90' 
                        : selectedPillar.accentColor.includes('purple')
                        ? 'bg-brand-purple hover:bg-brand-purple/90'
                        : selectedPillar.accentColor.includes('green')
                        ? 'bg-brand-green hover:bg-brand-green/90'
                        : 'bg-brand-purple hover:bg-brand-purple/90'
                    }`}
                    style={{ fontFamily: "'FF Nort', sans-serif" }}
                  >
                    View More <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .pillar-card {
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .pillar-card:hover {
          transform: translateX(4px);
        }

        .detail-panel {
          will-change: transform, opacity;
          position: sticky;
          top: 6rem;
        }

        @media (min-width: 1024px) {
          .detail-panel-container {
            height: 100%;
            display: flex;
            align-items: stretch;
          }
          
          .detail-panel {
            height: fit-content;
            display: flex;
            flex-direction: column;
          }

          .detail-panel::-webkit-scrollbar {
            width: 6px;
          }

          .detail-panel::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }

          .detail-panel::-webkit-scrollbar-thumb {
            background: #702594;
            border-radius: 10px;
          }

          .detail-panel::-webkit-scrollbar-thumb:hover {
            background: #8e30bc;
          }
        }

        @media (max-width: 1023px) {
          .detail-panel {
            max-height: 90vh;
            overflow-y: auto;
          }
        }

        .slide-out {
          animation: slideOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards;
        }

        .slide-in {
          animation: slideIn 0.4s cubic-bezier(0, 0, 0.2, 1) forwards;
        }

        @keyframes slideOut {
          0% {
            transform: translateX(0) scale(1) rotateY(0deg);
            opacity: 1;
          }
          100% {
            transform: translateX(-30px) scale(0.95) rotateY(-5deg);
            opacity: 0;
          }
        }

        @keyframes slideIn {
          0% {
            transform: translateX(30px) scale(0.95) rotateY(5deg);
            opacity: 0;
          }
          100% {
            transform: translateX(0) scale(1) rotateY(0deg);
            opacity: 1;
          }
        }

        .cursor-purple {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%23702594" d="M5 3l14 9-6.5 1.5L10 20z"/></svg>') 0 0, auto;
        }

        .cursor-purple a,
        .cursor-purple button {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%23702594" d="M8 6.5v11l6-5.5z"/></svg>') 12 12, pointer;
        }
      `}</style>
    </section>
  );
}

function PillarCard({ pillar, isActive, onClick }: {
  pillar: typeof pillars[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const gradientColors = pillar.accentColor.includes('orange') 
    ? 'from-brand-orange/25 via-gray-800/30 to-gray-800/25'
    : pillar.accentColor.includes('purple')
    ? 'from-brand-purple/25 via-gray-800/30 to-gray-800/25'
    : 'from-brand-green/25 via-gray-800/30 to-gray-800/25';

  return (
    <div
      onClick={onClick}
      className={`pillar-card p-4 sm:p-5 rounded-xl bg-gradient-to-r ${gradientColors} border transition-all duration-500 cursor-pointer hover:shadow-lg group relative overflow-hidden ${
        isActive
          ? pillar.accentColor.includes('orange') ? 'border-brand-orange/50 shadow-xl scale-[1.02]' :
            pillar.accentColor.includes('purple') ? 'border-brand-purple/50 shadow-xl scale-[1.02]' :
            'border-brand-green/50 shadow-xl scale-[1.02]'
          : 'border-gray-700/50 shadow-sm hover:border-gray-600'
      }`}
    >
      <div className="flex justify-between items-start mb-3 relative z-10">
        <span className={`text-xs font-medium uppercase tracking-wider transition-colors duration-500 ${
          isActive 
            ? pillar.accentColor.includes('orange') ? 'text-brand-orange' :
              pillar.accentColor.includes('purple') ? 'text-brand-purple' :
              'text-brand-green'
            : 'text-gray-500'
        }`}
        style={{ fontFamily: "'FF Nort', sans-serif" }}>
          {pillar.number}
        </span>
        <ArrowRight
          className={`w-4 h-4 transition-all duration-500 ${
            isActive
              ? pillar.accentColor.includes('orange') ? 'text-brand-orange' :
                pillar.accentColor.includes('purple') ? 'text-brand-purple' :
                'text-brand-green'
              : 'text-gray-500 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
          }`}
        />
      </div>

      <h3 className={`text-base sm:text-lg font-medium mb-2 transition-colors duration-300 ${
        isActive ? 'text-white' : 'text-gray-200 group-hover:text-white'
      }`}
      style={{ fontFamily: "'FF Nort', sans-serif" }}>
        {pillar.title}
      </h3>
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>{pillar.description}</p>

      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-500 origin-left ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
        }`}
        style={{ 
          backgroundColor: isActive 
            ? pillar.accentColor.includes('orange') ? '#e07742' :
              pillar.accentColor.includes('purple') ? '#702594' :
              '#057210'
            : '#4a5568' 
        }}
      ></div>
    </div>
  );
}
