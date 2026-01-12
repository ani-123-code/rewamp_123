import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';

interface Phase {
  number: string;
  title: string;
  description: string;
  questions: string[];
  color: string;
  labelColor: string;
}

const phases: Phase[] = [
  {
    number: '01',
    title: 'Flow Feasibility & Evaluation',
    description: 'First, we check whether your process is technically and economically viable in flow. Translate your batch route into a continuous development route. Map impact factors like temperature, pressure, and residence time ranges. Generate a first pass cost and savings view so you see the ROI signal early. Isolate and address high risk steps (exotherms, slurries, hazardous reagents) at lab scale',
    questions: [
      'Are you struggling with inconsistent yields, long cycle times, or safety limits in batch?',
      'Do you need data to justify a move to flow before you talk about Capex?'
    ],
    color: '#702594',
    labelColor: 'text-brand-purple'
  },
  {
    number: '02',
    title: 'Process Optimization & Scale Up',
    description: 'Once feasibility looks positive, we focus on process intensification and scale up. Increase throughput, quality and space–time yield. Reduce solvent, reagent, energy and catalyst consumption. Simplify the flowsheet by removing unnecessary isolations and filtrations. Tune the process to consistently meet your specs and regulatory expectations',
    questions: [
      'Is your current route too slow, too solvent heavy, or hard to clean up?',
      'Would a shorter, continuous flowsheet help you hit cost and ESG targets?'
    ],
    color: '#1406b3',
    labelColor: 'text-brand-blue'
  },
  {
    number: '03',
    title: 'Commercialization & FaaS',
    description: 'Finally, the optimized process becomes a commercial flow platform, often under FaaS. Deploy a modular, automated platform sized to your throughput. Integrate with your upstream and downstream operations. Add an IoT and data layer for real time monitoring and continuous improvement. Use an Opex based engagement where cost is linked to output and performance',
    questions: [
      'Do you need capacity for a new product without building a new plant?',
      'Are you looking for a way to localize supply or de risk a high hazard route?',
      'Would a FaaS/Opex model help you move faster than a traditional Capex project?'
    ],
    color: '#057210',
    labelColor: 'text-brand-green'
  }
];

export default function FactoryAsAService() {
  const ref = useScrollReveal<HTMLDivElement>();

  const handleSuitabilityCheck = () => {
    const element = document.querySelector('#ai-architect');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleROICalculator = () => {
    const element = document.querySelector('#calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faas" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50/30 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-gray-200/20 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[120px] animate-blob opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] bg-gray-300/15 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[120px] animate-blob animation-delay-2000 opacity-20"></div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10 reveal-on-scroll">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-4 sm:mb-6" style={{ fontFamily: "'FF Nort', sans-serif" }}>
            Factory as a Service (FaaS) by Flownetics
          </h2>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed font-light max-w-4xl mx-auto mb-6 sm:mb-8" style={{ fontFamily: "'FF Nort', sans-serif" }}>
            Flownetics' Factory as a Service model lets you access custom flow manufacturing capacity without committing large Capex. We take a route from batch recipe → flow process → modular platform, and then run it as an Opex based service aligned to your volumes and timelines.
          </p>
          <p className="text-gray-800 text-sm sm:text-base font-medium" style={{ fontFamily: "'FF Nort', sans-serif" }}>
            Our work typically moves through three phases.
          </p>
        </div>

        {/* Phase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {phases.map((phase, index) => (
            <PhaseCard key={index} phase={phase} index={index} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <button
            onClick={handleSuitabilityCheck}
            className="bg-brand-black text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium hover:bg-gradient-purple transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group w-full sm:w-auto min-w-[240px]"
            style={{ fontFamily: "'FF Nort', sans-serif" }}
          >
            <span>Flow Suitability Checker</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </button>
          <button
            onClick={handleROICalculator}
            className="bg-brand-black text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium hover:bg-gradient-purple transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group w-full sm:w-auto min-w-[240px]"
            style={{ fontFamily: "'FF Nort', sans-serif" }}
          >
            <span>Calculate Your Investment Return</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
}

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const cardRef = useScrollReveal<HTMLDivElement>();
  const delay = `${index * 200}ms`;

  return (
    <div
      ref={cardRef}
      className="bg-gradient-to-br from-white via-brand-light to-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden reveal-on-scroll flex flex-col"
      style={{
        transitionDelay: delay,
        borderColor: phase.color,
        maxHeight: '400px'
      }}
    >
      {/* Decorative gradient overlay */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"
        style={{ backgroundColor: phase.color }}
      ></div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Phase Number and Title */}
        <div className="mb-2">
          <span className={`${phase.labelColor} text-xs font-bold uppercase tracking-widest block mb-1`} style={{ fontFamily: "'FF Nort', sans-serif" }}>
            {phase.number}
          </span>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1.5 group-hover:scale-[1.02] transition-transform duration-300 overflow-hidden" style={{ fontFamily: "'FF Nort', sans-serif", maxHeight: '3.5rem' }}>
            Phase {index + 1} – {phase.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs leading-relaxed font-light mb-3 flex-1 overflow-hidden" style={{ fontFamily: "'FF Nort', sans-serif", maxHeight: '4rem' }}>
          {phase.description}
        </p>

        {/* Ask Yourself Section */}
        <div className="mb-3">
          <h4 className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-2" style={{ fontFamily: "'FF Nort', sans-serif" }}>
            Ask yourself:
          </h4>
          <ul className="space-y-1.5">
            {phase.questions.map((question, qIndex) => (
              <li key={qIndex} className="flex items-start gap-2">
                <div 
                  className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: phase.color }}
                ></div>
                <span className="text-gray-600 text-xs leading-relaxed font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                  {question}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action */}
        <div className="pt-2 border-t border-gray-200 mt-auto">
          <p className="text-[10px] text-gray-600 font-light italic leading-tight" style={{ fontFamily: "'FF Nort', sans-serif" }}>
            {index === 0 && '→ Check your reaction\'s initial flow suitability with our screening tool.'}
            {index === 1 && '→ See if Flownetics can help intensify your process – start with a suitability check.'}
            {index === 2 && '→ Start by checking whether your chemistry is a good candidate for flow, then talk to us about FaaS.'}
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 w-full h-1.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl"
        style={{ backgroundColor: phase.color }}
      ></div>
    </div>
  );
}
