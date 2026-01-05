import { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Maximize } from 'lucide-react';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video) {
            video.play().catch(err => console.log('Video play failed:', err));
          } else if (video) {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.log('Fullscreen failed:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} className="py-0 bg-gradient-to-b from-white to-gray-50/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gray-200/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gray-300/15 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>
        
        <div className="w-full max-w-[95%] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
          <div ref={containerRef} className="aspect-[21/9] w-full max-h-[85vh] bg-black overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl relative group transition-all border-4 border-gray-100">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            >
              <source src="/media/Flownetics Video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Gradient overlay for better button visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>

            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={restart}
                className="bg-black/80 hover:bg-black text-white p-2.5 sm:p-3 rounded-xl backdrop-blur-md transition-all hover:scale-110 shadow-lg border border-white/10"
                aria-label="Restart video"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={togglePlay}
                className="bg-black/80 hover:bg-black text-white p-2.5 sm:p-3 rounded-xl backdrop-blur-md transition-all hover:scale-110 shadow-lg border border-white/10"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>

              <button
                onClick={toggleMute}
                className="bg-black/80 hover:bg-black text-white p-2.5 sm:p-3 rounded-xl backdrop-blur-md transition-all hover:scale-110 shadow-lg border border-white/10"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>

              <button
                onClick={toggleFullscreen}
                className="bg-black/80 hover:bg-black text-white p-2.5 sm:p-3 rounded-xl backdrop-blur-md transition-all hover:scale-110 shadow-lg border border-white/10"
                aria-label="Toggle fullscreen"
              >
                <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
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
