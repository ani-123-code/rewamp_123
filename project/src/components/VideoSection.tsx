import { useRef } from 'react';

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section ref={sectionRef} className="py-0 bg-gradient-to-b from-white to-gray-50/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gray-200/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gray-300/15 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>
        
        <div className="w-full max-w-[95%] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
          <div ref={containerRef} className="aspect-[21/9] w-full max-h-[85vh] bg-black overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl relative group transition-all border-4 border-gray-100">
            <img
              src="/media/Placeholder for video.png"
              alt="Flownetics video placeholder"
              className="w-full h-full object-cover"
            />

            {/* Gradient overlay for better visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Banner Design - Flowing Colors Marquee */}
      <div className="relative overflow-hidden py-6 my-8 sm:my-12 md:my-16">
        {/* Top Border Line */}
        <div className="absolute top-0 left-0 w-full h-1 z-20">
          <div className="h-full animate-flow-border"></div>
        </div>
        {/* Bottom Border Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 z-20">
          <div className="h-full animate-flow-border"></div>
        </div>
        <div className="animate-marquee whitespace-nowrap flex relative z-10">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="inline-block text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest mx-8 italic"
              style={{ 
                fontWeight: 700
              }}
            >
              {'CHEMISTRY IN MOTION'.split('').map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="inline-block animate-flow-color"
                  style={{
                    animationDelay: `${(i * 18 + charIndex) * 0.15}s`,
                    animationDuration: '4s'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        @keyframes flowColor {
          0% {
            color: #c4622e;
          }
          16.66% {
            color: #d97706;
          }
          33.33% {
            color: #5b21b6;
          }
          50% {
            color: #6d28d9;
          }
          66.66% {
            color: #065f46;
          }
          83.33% {
            color: #047857;
          }
          100% {
            color: #c4622e;
          }
        }
        .animate-flow-color {
          animation: flowColor 4s ease-in-out infinite;
          font-weight: 700;
          color: #c4622e;
        }

        @keyframes flowBorder {
          0% {
            background: linear-gradient(90deg, #c4622e 0%, #5b21b6 50%, #065f46 100%);
            background-size: 200% 100%;
            background-position: 0% 50%;
          }
          50% {
            background: linear-gradient(90deg, #065f46 0%, #c4622e 50%, #5b21b6 100%);
            background-size: 200% 100%;
            background-position: 100% 50%;
          }
          100% {
            background: linear-gradient(90deg, #c4622e 0%, #5b21b6 50%, #065f46 100%);
            background-size: 200% 100%;
            background-position: 0% 50%;
          }
        }
        .animate-flow-border {
          animation: flowBorder 5s linear infinite;
          background: linear-gradient(90deg, #c4622e, #5b21b6, #065f46, #c4622e);
          background-size: 200% 100%;
        }
      `}</style>
    </>
  );
}
