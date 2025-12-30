import { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

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
    number: '06',
    accentColor: 'text-brand-purple',
    borderColor: 'border-brand-purple'
  },
];

export default function Pillars() {
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

  const selectedPillar = pillars.find((p) => p.id === activePillar);

  return (
    <section id="pillars" className="relative py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-brand-light overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-orange/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 sm:mb-16 text-center">
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-orange via-brand-purple to-brand-green blur-lg opacity-30"></div>
              <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter bg-gradient-to-r from-brand-orange via-brand-purple to-brand-green bg-clip-text text-transparent">
                The Flownetics Standard.
              </h2>
            </div>
          </div>
          <p className="text-brand-gray text-base sm:text-lg">Click to explore each pillar.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div className="space-y-3 sm:space-y-4">
            {pillars.map((pillar) => (
              <PillarCard
                key={pillar.id}
                pillar={pillar}
                isActive={activePillar === pillar.id}
                onClick={() => handlePillarClick(pillar.id)}
              />
            ))}
          </div>

          <div ref={detailPanelRef} className="lg:sticky lg:top-24 detail-panel-container">
            {selectedPillar && (
              <div
                className={`detail-panel bg-gradient-to-br from-gray-50 to-white border-2 border-brand-purple rounded-3xl p-6 sm:p-8 shadow-2xl cursor-purple transition-all duration-300 flex flex-col ${
                  isAnimating ? 'slide-out' : 'slide-in'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-sm font-bold uppercase ${selectedPillar.accentColor}`}>
                    {selectedPillar.number}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">{selectedPillar.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {selectedPillar.description}
                </p>

                {/* Overview */}
                {selectedPillar.overview && (
                  <div className="border-t border-gray-200 pt-3 mb-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Overview
                  </h4>
                    <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                      {selectedPillar.overview}
                  </p>
                </div>
                )}

                {/* Technical Capabilities */}
                {selectedPillar.technicalCapabilities && selectedPillar.technicalCapabilities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Technical Capabilities
                  </h4>
                  <ul className="space-y-2">
                      {selectedPillar.technicalCapabilities.map((capability, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{
                              backgroundColor: selectedPillar.accentColor.includes('orange') ? '#e07742' :
                                              selectedPillar.accentColor.includes('purple') ? '#702594' :
                                              selectedPillar.accentColor.includes('blue') ? '#1406b3' :
                                              selectedPillar.accentColor.includes('green') ? '#057210' : '#702594'
                            }}
                          ></div>
                          <span className="text-gray-700 text-xs leading-relaxed">{capability}</span>
                    </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Business Impact */}
                {selectedPillar.businessImpact && selectedPillar.businessImpact.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Business Impact
                    </h4>
                    <ul className="space-y-2">
                      {selectedPillar.businessImpact.map((impact, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{
                              backgroundColor: selectedPillar.accentColor.includes('orange') ? '#e07742' :
                                              selectedPillar.accentColor.includes('purple') ? '#702594' :
                                              selectedPillar.accentColor.includes('blue') ? '#1406b3' :
                                              selectedPillar.accentColor.includes('green') ? '#057210' : '#702594'
                            }}
                          ></div>
                          <span className="text-gray-700 text-xs leading-relaxed">{impact}</span>
                    </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Benefits */}
                {selectedPillar.keyBenefits && selectedPillar.keyBenefits.length > 0 && (
                  <div className="bg-white rounded-xl p-3 shadow-sm mb-3 flex-grow">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Key Benefits
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedPillar.keyBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{
                              backgroundColor: selectedPillar.accentColor.includes('orange') ? '#e07742' :
                                              selectedPillar.accentColor.includes('purple') ? '#702594' :
                                              selectedPillar.accentColor.includes('blue') ? '#1406b3' :
                                              selectedPillar.accentColor.includes('green') ? '#057210' : '#702594'
                            }}
                          ></div>
                          <span className="text-gray-700 text-xs leading-relaxed">{benefit}</span>
                    </li>
                      ))}
                  </ul>
                </div>
                )}

                <div className="pt-3 border-t border-gray-200 mt-auto">
                  <a
                    href={`/pillar/${selectedPillar.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center text-xs font-bold uppercase tracking-widest ${selectedPillar.accentColor} hover:underline transition-all`}
                  >
                    Learn More <ArrowRight className="w-3 h-3 ml-2" />
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
            min-height: 100%;
            height: auto;
            flex: 1;
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
  return (
    <div
      onClick={onClick}
      className={`pillar-card p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-gray-50 to-white border transition-all duration-500 cursor-pointer hover:shadow-lg group relative overflow-hidden ${
        isActive
          ? 'border-brand-purple shadow-xl scale-[1.02]'
          : 'border-gray-100 shadow-sm hover:border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start mb-3 relative z-10">
        <span className={`text-xs font-bold uppercase transition-colors duration-500 ${
          isActive ? 'text-brand-purple' : 'text-gray-300'
        }`}>
          {pillar.number}
        </span>
        <ArrowRight
          className={`w-4 h-4 transition-all duration-500 ${
            isActive
              ? 'text-brand-purple translate-x-0 opacity-100'
              : 'text-gray-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
          }`}
        />
      </div>

      <h3 className={`text-base sm:text-lg font-semibold mb-1.5 transition-colors duration-300 ${
        isActive ? 'text-brand-purple' : 'text-brand-black group-hover:text-brand-purple'
      }`}>
        {pillar.title}
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{pillar.description}</p>

      <div
        className={`absolute bottom-0 left-0 w-full h-1 transition-all duration-500 origin-left ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
        }`}
        style={{ backgroundColor: isActive ? '#702594' : '#e0e0e0' }}
      ></div>
    </div>
  );
}
