import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import CalBookingModal from './CalBookingModal';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCalModal, setShowCalModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const navLinks: Array<{ href: string; label: string; external?: boolean }> = [
    { href: '#pillars', label: 'Platform' },
    { href: '#ai-architect', label: 'Flow Suitability Checker' },
    { href: '#calculator', label: 'Savings' },
    { href: '#about', label: 'About' },
    { href: '#blog', label: 'Blog' },
    { href: 'https://flownetics.beehiiv.com/', label: 'Newsletter', external: true },
  ];

  // Get navbar height for scroll offset
  const getNavbarHeight = () => {
    if (window.innerWidth >= 1024) return 80; // lg and above
    if (window.innerWidth >= 640) return 80; // sm and above
    return 64; // mobile
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and manage body scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Prevent layout shift
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = getNavbarHeight();
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - 20; // Extra 20px spacing

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (isHomePage) {
      scrollToSection(href);
    } else {
      navigate('/');
      // Wait for navigation and DOM update
      setTimeout(() => {
        scrollToSection(href);
      }, 300);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 glass-panel transition-all duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/" 
            onClick={handleLogoClick} 
            className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2 sm:gap-3 flex-shrink-0 z-10"
            aria-label="Flownetics Home"
          >
            <img 
              src="/media/flownetics.png" 
              alt="Flownetics" 
              className="h-5 sm:h-6 md:h-7 w-auto object-contain" 
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-sm font-light text-brand-black">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.external) {
                    e.preventDefault();
                    window.open(link.href, '_blank', 'noopener,noreferrer');
                  } else {
                    handleNavClick(e, link.href);
                  }
                }}
                className="hover:text-brand-purple transition-colors relative group py-2 px-1 whitespace-nowrap"
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-purple transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setShowCalModal(true)}
              className="bg-brand-black text-white text-xs sm:text-sm font-medium px-4 xl:px-6 py-2 xl:py-3 rounded-2xl hover:bg-gradient-purple transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-brand-light active:bg-brand-light transition-colors touch-manipulation z-50 relative"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            type="button"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-brand-black" />
            ) : (
              <Menu className="w-6 h-6 text-brand-black" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-16 sm:top-20 left-0 w-full bg-white/98 backdrop-blur-xl border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out overflow-hidden z-40 ${
            isMenuOpen
              ? 'max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="px-4 py-4 sm:py-6 space-y-1 overflow-y-auto max-h-[calc(100vh-5rem)]">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (link.external) {
                    window.open(link.href, '_blank', 'noopener,noreferrer');
                    setIsMenuOpen(false);
                  } else {
                    handleNavClick(e, link.href);
                  }
                }}
                className="block py-3 sm:py-4 px-4 text-brand-black hover:bg-brand-light hover:text-brand-purple transition-all font-light rounded-lg active:bg-brand-light touch-manipulation"
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setShowCalModal(true);
                setIsMenuOpen(false);
              }}
              className="block w-full text-center mt-4 sm:mt-6 bg-brand-black text-white font-medium px-6 py-3 sm:py-4 rounded-2xl hover:bg-gradient-purple transition-all active:scale-95 touch-manipulation"
              type="button"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <CalBookingModal 
        isOpen={showCalModal} 
        onClose={() => setShowCalModal(false)}
        calLink={import.meta.env.VITE_CAL_LINK}
      />
    </>
  );
}
