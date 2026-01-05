import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const steps = [
  {
    id: 'feasibility-study',
    number: '01',
    label: 'Feasibility Study',
    title: 'Feasibility Study: How Can We',
    description: 'Before you commit a single dollar to new equipment, we need to prove that your chemistry actually works in flow.',
    color: '#702594',
    labelColor: 'text-brand-purple',
    delay: '0ms',
    overview: 'Before you commit a single dollar to new equipment, we need to prove that your chemistry actually works in flow. In this stage, we take your existing "batch recipe", The one that might be slow or inconsistent and re-map it for a continuous system. We aren\'t just looking for a "yes"; we are looking for the economic "why".',
    whatWeDo: [
      'Map the Parameters: We identify the exact temperature, pressure, and timing needed to make your reaction perfect.',
      'Eliminate Guesswork: We provide a 20–30% cost projection decrease right at the start so you know the ROI before moving forward.',
      'Proof First: This is where our "Risk Acknowledgment" pillar starts—we find the problems in the lab, not in your factory.'
    ],
    caseStudy: {
      title: 'Case Study Spotlight',
      problem: 'A client needed to localize a starting material usually sourced from China. The chemistry required a dangerous 400°C temperature, which caused thermal degradation and material loss in traditional batch setups.',
      essence: 'We re-developed the process for a custom high-temperature flow platform.',
      result: 'We proved feasibility by achieving one-pot synthesis with minimal heat exposure, increasing both yield and selectivity before the client spent any capital on a plant.',
      businessTakeaway: 'We de-risk the "scary" chemistry early so you don\'t have to.'
    },
    technicalCapabilities: [],
    deliverables: [],
    benefits: []
  },
  {
    id: 'process-optimization',
    number: '02',
    label: 'Process Optimization',
    title: 'Process Optimization & Scale-up: The "Efficiency"',
    description: 'Once we know the chemistry works in flow, we don\'t just stop there. We "squeeze the lemon" to get every bit of efficiency out of the process.',
    color: '#1406b3',
    labelColor: 'text-brand-blue',
    delay: '200ms',
    overview: 'Once we know the chemistry works in flow, we don\'t just stop there. In this stage, we "squeeze the lemon" to get every bit of efficiency out of the process. We focus on making the reaction as fast, clean, and cheap as possible before building the final platform.',
    whatWeDo: [
      'Process Intensification: We shrink the reaction time and maximize your yield while using fewer resources like solvents and energy.',
      'Simplify the Workflow: We look at the "after-work" (downstream processing). If we can eliminate messy steps like catalyst filtration, we do it.',
      'Guarantee Quality: We ensure the product consistently meets strict global standards, such as USP or EP specifications, every single time.'
    ],
    caseStudy: {
      title: 'Case Study Spotlight',
      problem: 'A standard batch process was taking 35 hours to complete and required messy catalyst filtration.',
      essence: 'We intensified the process to maximize yield while minimizing resource consumption.',
      result: 'We slashed cycle time by 42% (from 35 hours down to 20) and completely eliminated the need for catalyst filtration, simplifying the entire downstream operation.',
      businessTakeaway: 'We don\'t just move you to flow; we make your process significantly faster and cleaner.'
    },
    businessValue: {
      title: 'The Business Value',
      points: [
        'Capex-Free Engagement: Even at this advanced stage, you aren\'t paying for heavy equipment yet. We use our own infrastructure and expertise to validate the scale.',
        'Significant Cost Reduction: By shortening production cycles and reducing raw material waste, we pave the way for an average 27% decrease in manufacturing costs.',
        'Time-to-Market: You go from "lab scale" to "market ready" much faster than traditional methods sometimes delivering kilos of material in weeks instead of months.'
      ]
    },
    technicalCapabilities: [],
    deliverables: [],
    benefits: []
  },
  {
    id: 'commercialization',
    number: '03',
    label: 'Commercialization',
    title: 'Commercialization & Factory-as-a-Service',
    description: 'This is where the vision becomes a reality on your factory floor. Instead of you spending millions on a permanent setup, we install a modular, automated platform at your site.',
    color: '#057210',
    labelColor: 'text-brand-green',
    delay: '400ms',
    overview: 'This is where the vision becomes a reality on your factory floor. Instead of you spending millions on a permanent setup that might become obsolete, we install a modular, automated platform at your site. We don\'t just hand over the keys; we run it for you under our Factory-as-a-Service (FaaS) model. You only pay for the results, not the heavy machinery.',
    whatWeDo: [
      'Modular Deployment: We build and install a custom reactor and modular platform directly at your site.',
      'Full Automation: The system is AI-driven and IoT-enabled, allowing for remote monitoring and consistent, "push-button" manufacturing.',
      'Zero-Capex Shift: We move the financial burden from your balance sheet (CAPEX) to a predictable operational expense (OPEX) through a subscription fee.',
      'Continuous Innovation: You get exclusive access to any software or hardware upgrades we develop, keeping your plant at the cutting edge.'
    ],
    caseStudy: {
      title: 'Case Study Spotlight: API Precursor (Diazotization)',
      problem: 'The client dealt with a highly unstable, hazardous, and exothermic reaction (100°C exotherm) to produce 5 tons per month.',
      essence: 'We built and installed a modular, telescopic flow platform at the customer\'s site.',
      result: '18% Cost Reduction and 44% Effluent Reduction. Zero Risk: The client achieved ROI in just 15 months through savings alone, without the initial burden of purchasing the equipment.',
      businessTakeaway: 'You get a world-class, automated factory on a subscription basis, paying only for the value delivered.'
    },
    technicalCapabilities: [],
    deliverables: [],
    benefits: []
  }
];

export default function Advantage() {
  const titleRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="advantage" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gray-200/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gray-300/15 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-start relative z-10">
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
          <div ref={titleRef} className="reveal-on-scroll lg:sticky lg:top-24" style={{ marginTop: 'calc(200px + 1.5rem)' }}>
            <div className="text-center lg:text-left">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-900" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                    The Path to<br />Production.
                  </h2>
              </div>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                We've removed the barriers. From feasibility to full-scale production in three comprehensive phases.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 grid gap-4 sm:gap-6">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ number, label, title, description, color, labelColor, delay, index, id }: {
  number: string;
  label: string;
  title: string;
  description: string;
  color: string;
  labelColor: string;
  delay: string;
  index: number;
  id: string;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className="bg-gradient-to-br from-white via-brand-light to-white p-4 sm:p-5 rounded-xl sm:rounded-2xl reveal-on-scroll border-2 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group flex flex-col"
      style={{
        transitionDelay: delay,
        borderColor: color,
        maxHeight: '280px'
      }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"
        style={{ backgroundColor: color }}
      ></div>

      <div className="relative z-10 flex flex-col flex-1">
        <div className="mb-2">
          <span className={`${labelColor} text-xs font-bold uppercase tracking-widest block mb-1`}>
            {number}
          </span>
          <span className={`${labelColor} text-xs font-semibold uppercase tracking-wide`}>
            {label}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-medium mb-1.5 text-gray-900 group-hover:scale-[1.02] transition-transform duration-300 overflow-hidden" style={{ fontFamily: "'FF Nort', sans-serif", maxHeight: '3.5rem' }}>
          {title}
        </h3>
        <p className="text-gray-600 text-xs leading-relaxed mb-3 font-light flex-1 overflow-hidden" style={{ fontFamily: "'FF Nort', sans-serif", maxHeight: '2.5rem' }}>{description}</p>

        <button
          onClick={() => navigate(`/path-to-production/${id}`)}
          className={`inline-flex items-center gap-2 ${labelColor} font-semibold text-xs hover:gap-3 transition-all group/btn mt-auto`}
        >
          View More
          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-1.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
}
