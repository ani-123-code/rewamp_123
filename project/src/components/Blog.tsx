import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getBlogs } from '../lib/api';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  slug: string;
}

export default function Blog() {
  const ref = useScrollReveal<HTMLDivElement>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getBlogs();
        setBlogPosts(blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      setTimeout(updateScrollButtons, 300);
    }
  };

  return (
    <section id="blog" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50/30 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-200/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gray-300/15 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10 reveal-on-scroll">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-brand-orange text-xs font-medium uppercase tracking-widest mb-4 block" style={{ fontFamily: "'FF Nort', sans-serif" }}>
            Insights & Updates
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-4" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                Latest from Our Blog.
              </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>
            Stay updated with the latest trends, insights, and innovations in continuous flow chemistry.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-all ${
              canScrollLeft
                ? 'opacity-100 hover:bg-brand-purple hover:text-white cursor-pointer'
                : 'opacity-30 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-all ${
              canScrollRight
                ? 'opacity-100 hover:bg-brand-purple hover:text-white cursor-pointer'
                : 'opacity-30 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollContainerRef}
            onScroll={updateScrollButtons}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-10 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loading ? (
              <div className="flex items-center justify-center w-full py-12">
                <p className="text-brand-gray">Loading blogs...</p>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="flex items-center justify-center w-full py-12">
                <p className="text-brand-gray">No blogs available yet.</p>
              </div>
            ) : (
              blogPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="flex-none w-[280px] sm:w-[300px] md:w-[320px] lg:w-[360px] bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden">
                  <img
                    src={post.image.startsWith('http') ? post.image : `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}${post.image}`}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/320x144?text=Blog+Image';
                    }}
                  />
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <span className="bg-brand-purple text-white text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-brand-gray mb-2">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2 group-hover:text-brand-purple transition-colors line-clamp-2" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-[11px] sm:text-xs mb-3 line-clamp-2 leading-relaxed font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-1.5 sm:gap-2 text-brand-purple font-medium text-[10px] sm:text-xs group-hover:gap-2 sm:group-hover:gap-3 transition-all" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                    <span>Read Article</span>
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </div>
                </div>
              </Link>
              ))
            )}
          </div>
        </div>

        <div className="text-center mt-8">
         
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
