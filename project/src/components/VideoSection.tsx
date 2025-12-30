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
      <section ref={sectionRef} className="py-12 bg-gradient-to-b from-white to-brand-light relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-3xl"></div>
        
        <div className="w-full relative z-10">
          <div ref={containerRef} className="aspect-video w-full max-h-[80vh] bg-black overflow-hidden shadow-2xl relative group transition-all">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            >
              <source src="/media/pixverse_v5.5_image_text_360p_use_the_same_ima.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={restart}
                className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                aria-label="Restart video"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlay}
                className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleMute}
                className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleFullscreen}
                className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                aria-label="Toggle fullscreen"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-center mt-8 px-6 text-brand-gray font-medium text-sm">Flownetics - future of chemistry</p>
        </div>
      </section>

      {/* Banner Design 1 - Flowing Colors Marquee */}
      <div className="relative overflow-hidden py-6">
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
              className="inline-block text-2xl md:text-3xl lg:text-4xl font-black tracking-widest mx-8 italic"
              style={{ 
                fontWeight: 900,
                WebkitTextStroke: '0.5px currentColor',
                textShadow: '0 0 2px currentColor'
              }}
            >
              {'CHEMISTRY IN MOTION'.split('').map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="inline-block animate-flow-color"
                  style={{
                    animationDelay: `${(i * 18 + charIndex) * 0.1}s`,
                    animationDuration: '3s'
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
            color: #e07742;
          }
          16.66% {
            color: #f59e0b;
          }
          33.33% {
            color: #702594;
          }
          50% {
            color: #8b5cf6;
          }
          66.66% {
            color: #057210;
          }
          83.33% {
            color: #10b981;
          }
          100% {
            color: #e07742;
          }
        }
        .animate-flow-color {
          animation: flowColor 2s ease-in-out infinite;
          font-weight: 900;
          color: #e07742;
        }

        @keyframes flowBorder {
          0% {
            background: linear-gradient(90deg, #e07742 0%, #702594 50%, #057210 100%);
            background-size: 200% 100%;
            background-position: 0% 50%;
          }
          50% {
            background: linear-gradient(90deg, #057210 0%, #e07742 50%, #702594 100%);
            background-size: 200% 100%;
            background-position: 100% 50%;
          }
          100% {
            background: linear-gradient(90deg, #e07742 0%, #702594 50%, #057210 100%);
            background-size: 200% 100%;
            background-position: 0% 50%;
          }
        }
        .animate-flow-border {
          animation: flowBorder 3s linear infinite;
          background: linear-gradient(90deg, #e07742, #702594, #057210, #e07742);
          background-size: 200% 100%;
        }
      `}</style>
    </>
  );
}
