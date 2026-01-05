import { Target, Lightbulb, Users, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-orange/10 rounded-full blur-3xl"></div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10 reveal-on-scroll">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white" style={{ fontFamily: "'FF Nort', sans-serif" }}>
              About Flownetics
            </h2>
          </div>
          <p className="text-gray-300 text-sm font-light mb-8" style={{ fontFamily: "'FF Nort', sans-serif" }}>
            Revolutionizing Pharmaceutical and Cosmetic Chemistry Through Innovation.
          </p>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>
              Flownetics Engineering was founded in April 2023 after an innovative pre-launch phase. The company, based in Bengaluru, India, is on a mission to revolutionize pharmaceutical and cosmetic chemistry by providing scalable, efficient and sustainable end-to-end flow manufacturing solutions.
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>
              By combining expertise in mechanical engineering, process chemistry, 3D printing, control engineering and artificial intelligence, Flownetics unlocks a unique multidisciplinary approach for its customers that optimizes every aspect of their production. This synergy increases process efficiency, reduces waste and ensures high-quality production that overcomes the limitations of traditional batch production.
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>
              This is especially true for the business model: Flownetics offers Factory-as-a-Service (FaaS) with subscription models that lowers the financial barriers and enable companies of all sizes to revolutionize the future of chemical manufacturing without large upfront investments. By promoting local production, the inherent benefits of the process and improving supply chain resilience, Flownetics lowers costs for companies and promotes environmental sustainability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="group rounded-xl p-4 sm:p-5 bg-gradient-to-r from-brand-purple/25 via-gray-800/30 to-gray-800/25 border border-gray-700/50 hover:border-brand-purple/50 transition-all duration-500 cursor-pointer hover:shadow-lg relative overflow-hidden">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-purple to-brand-purple/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-white mb-3 transition-colors duration-300" style={{ fontFamily: "'FF Nort', sans-serif" }}>Our Mission</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>
              Democratize continuous flow chemistry through innovative technology and accessible service models.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          <div className="group rounded-xl p-4 sm:p-5 bg-gradient-to-r from-brand-green/25 via-gray-800/30 to-gray-800/25 border border-gray-700/50 hover:border-brand-green/50 transition-all duration-500 cursor-pointer hover:shadow-lg relative overflow-hidden">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-green to-brand-green/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-white mb-3 transition-colors duration-300" style={{ fontFamily: "'FF Nort', sans-serif" }}>Innovation</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>
              AI-powered process design and optimization delivering 30% cost reduction and 10x faster development.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          <div className="group rounded-xl p-4 sm:p-5 bg-gradient-to-r from-brand-orange/25 via-gray-800/30 to-gray-800/25 border border-gray-700/50 hover:border-brand-orange/50 transition-all duration-500 cursor-pointer hover:shadow-lg relative overflow-hidden">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-orange to-brand-orange/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-white mb-3 transition-colors duration-300" style={{ fontFamily: "'FF Nort', sans-serif" }}>Partnership</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>
              Collaborative approach ensuring your success through dedicated support and expertise.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          <div className="group rounded-xl p-4 sm:p-5 bg-gradient-to-r from-brand-purple/25 via-gray-800/30 to-gray-800/25 border border-gray-700/50 hover:border-brand-purple/50 transition-all duration-500 cursor-pointer hover:shadow-lg relative overflow-hidden">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-purple to-brand-purple/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-white mb-3 transition-colors duration-300" style={{ fontFamily: "'FF Nort', sans-serif" }}>Growth</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>
              Scalable solutions from lab to production, growing with your business needs seamlessly.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
