import { useEffect, useRef } from 'react';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Hero() {
  const heroRef = useScrollReveal<HTMLDivElement>();
  const animatedLineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Animate the entire second line
    if (animatedLineRef.current) {
      const phrases = [
        { word: 'Chemistry', full: 'Smart Chemistry Means Going With the Flow.' },
        { word: 'Manufacturing', full: 'Smart Manufacturing Means Going With the Flow.' },
        { word: 'Scale‑up', full: 'Smart Scale‑up Means Going With the Flow.' }
      ];
      
      let phraseIndex = 0;
      
      const updatePhrase = () => {
        const phrase = phrases[phraseIndex];
        const parts = phrase.full.split(phrase.word);
        animatedLineRef.current!.innerHTML = `${parts[0]}<span class="font-medium text-brand-green">${phrase.word}</span>${parts[1]}`;
      };

      // Set initial phrase
      updatePhrase();
      animatedLineRef.current.style.opacity = '1';

      const interval = setInterval(() => {
        // Fade out
        animatedLineRef.current!.style.opacity = '0';
        animatedLineRef.current!.style.transform = 'translateY(10px)';

        setTimeout(() => {
          // Change to next phrase
          phraseIndex = (phraseIndex + 1) % phrases.length;
          updatePhrase();

          // Fade in
          animatedLineRef.current!.style.opacity = '1';
          animatedLineRef.current!.style.transform = 'translateY(0)';
        }, 300);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <>
      <section className="relative min-h-[100vh] flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 pb-8 sm:pb-12 overflow-hidden bg-gradient-to-b from-white to-gray-50/30">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Animated Gradient Blobs - More subtle and white */}
          <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-gray-200/20 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[120px] animate-blob opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] bg-gray-300/15 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[120px] animate-blob animation-delay-2000 opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] bg-gray-200/15 rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[120px] animate-blob animation-delay-4000 opacity-15"></div>
        </div>

        <div ref={heroRef} className="relative z-10 max-w-5xl text-center reveal-on-scroll flex flex-col items-center w-full">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/50 backdrop-blur-md border border-gray-200 mb-4 sm:mb-6 shadow-sm transition-all hover:scale-105 cursor-default hover:border-brand-purple/30">
            <span className="relative flex h-1.5 sm:h-2 w-1.5 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 sm:h-2 w-1.5 sm:w-2 bg-brand-purple"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-wide uppercase text-gray-600">The Future of Continuous Flow</span>
          </div>

          {/* Enhanced Typography */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tighter leading-[1.1] mb-6 sm:mb-8 text-brand-black relative w-full">
            {/* Abstract Flow Line SVG behind text */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] -z-10 opacity-50 sm:opacity-60 pointer-events-none text-brand-purple hidden sm:block" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M-50 100 C 50 100, 100 0, 200 100 S 350 200, 450 100" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" className="animate-flow-dash" strokeDasharray="10 10"/>
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#e07742" stopOpacity="0.4"/>
                  <stop offset="0.5" stopColor="#702594" stopOpacity="0.7"/>
                  <stop offset="1" stopColor="#057210" stopOpacity="0.4"/>
                </linearGradient>
              </defs>
            </svg>

            <div className="text-center w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              Join the <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-purple to-brand-green">Flow Revolution.</span>
            </div>

            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mt-1 sm:mt-2 font-light text-brand-black/90 flex items-baseline justify-center w-full px-2">
              <span ref={animatedLineRef} className="text-center transition-all duration-300 break-words sm:whitespace-nowrap" style={{ opacity: 0, transform: 'translateY(0)' }}>
                Smart Chemistry Means Going With the Flow.
              </span>
            </div>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed mt-4 sm:mt-6 md:mt-8 mb-8 sm:mb-10 md:mb-12 px-4">
            Accelerate from gram-scale R&D to ton-scale production. <br className="hidden sm:block"/>
            Zero scale-up risks. <span className="text-brand-black font-medium">40% lower CapEx.</span>
          </p>

          {/* Buttons & Social Proof */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 w-full px-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full max-w-2xl">
              <button
                onClick={() => {
                  const element = document.querySelector('#ai-architect');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-brand-black text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl text-xs sm:text-sm font-medium hover:bg-gradient-purple transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] flex items-center justify-center gap-2 group"
              >
              <span className="text-center">Check Sustainability Score</span>
                <FlaskConical className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-green group-hover:rotate-12 transition-transform flex-shrink-0" />
              </button>
              <button
                onClick={() => {
                  const element = document.querySelector('#pillars');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-brand-black text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl text-xs sm:text-sm font-medium hover:bg-gradient-purple transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] justify-center"
              >
              <span>Explore Platform</span> <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white flex-shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .word {
          display: inline-block;
          white-space: nowrap;
          margin-right: 0.25em;
          vertical-align: top;
        }
        
        .char {
          display: inline-block;
          opacity: 0;
          animation: flowReveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: calc(var(--char-index) * 0.04s);
          will-change: transform, opacity, filter;
        }

        @keyframes flowReveal {
          0% { 
            opacity: 0; 
            transform: translateX(-15px) scaleX(0.9); 
            filter: blur(4px);
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scaleX(1); 
            filter: blur(0);
          }
        }

        @keyframes flowDash {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }

        .glass-card-hero {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
}
