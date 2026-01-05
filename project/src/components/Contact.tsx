import { useState } from 'react';
import { Send, CheckCircle, Calendar, X } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { submitContact } from '../lib/api';
import CalBookingModal from './CalBookingModal';

export default function Contact() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);
  const [showConsultationPrompt, setShowConsultationPrompt] = useState(false);
  const [showCalModal, setShowCalModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await submitContact(formData);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
      // Show consultation prompt instead of success message
      setShowConsultationPrompt(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated gradient background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      
      <div ref={ref} className="max-w-7xl mx-auto relative z-10 reveal-on-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Left Side - All Cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/20 to-brand-purple/20 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-brand-purple rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Fast Track</h3>
                    <p className="text-gray-400 text-xs">From concept to production</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300 text-xs">
                    <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse"></div>
                    <span>3-Phase Process</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-xs">
                    <div className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span>Zero Scale-up Risk</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-xs">
                    <div className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span>40% Lower CapEx</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-brand-green/20 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-green to-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Validated</h3>
                    <p className="text-gray-400 text-xs">100+ molecules</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300 text-xs">
                    <div className="w-1.5 h-1.5 bg-brand-green rounded-full"></div>
                    <span>ISO & GMP Ready</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-xs">
                    <div className="w-1.5 h-1.5 bg-brand-orange rounded-full"></div>
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-xs">
                    <div className="w-1.5 h-1.5 bg-brand-purple rounded-full"></div>
                    <span>End-to-End Service</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-orange/20 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm">ROI Timeline</h3>
                    <p className="text-gray-400 text-xs">Average payback period</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-brand-green">
                  <p className="text-lg font-bold">15 Months</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:col-span-3">
        <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-brand-purple/20 transition-shadow">
          <div className="inline-block mb-3 sm:mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-orange via-brand-purple to-brand-green blur-lg opacity-40 animate-pulse"></div>
              <h2 className="relative text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-white" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                Ready to scale?
              </h2>
            </div>
          </div>
          <p className="text-gray-300 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>Let's engineer your advantage.</p>

          {showConsultationPrompt ? (
            <div className="py-8 text-center animate-fade-in">
              <CheckCircle className="w-14 h-14 text-brand-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Thank you!</h3>
              <p className="text-gray-300 font-light mb-6">We'll be in touch shortly.</p>
              
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
                <Calendar className="w-8 h-8 text-brand-purple mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2">Would you like to schedule a consultation?</h4>
                <p className="text-gray-400 text-sm mb-4">Let's discuss your project in detail</p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setShowConsultationPrompt(false);
                      setShowCalModal(true);
                    }}
                    className="bg-gradient-purple text-white font-medium px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-purple/30 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Yes, Schedule Consultation
                  </button>
                  <button
                    onClick={() => {
                      setShowConsultationPrompt(false);
                      setSubmitted(true);
                      setTimeout(() => setSubmitted(false), 3000);
                    }}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-xl transition-all border border-gray-700 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Not Now
                  </button>
                </div>
              </div>
            </div>
          ) : submitted ? (
            <div className="py-10 text-center animate-fade-in">
              <CheckCircle className="w-14 h-14 text-brand-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Thank you!</h3>
              <p className="text-gray-300 font-light">We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs sm:text-sm p-2.5 sm:p-3 rounded-lg">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all hover:border-brand-purple/50"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all hover:border-brand-purple/50"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all hover:border-brand-purple/50"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all hover:border-brand-purple/50"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all hover:border-brand-purple/50"
              />
              <textarea
                placeholder="Tell us about your project..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all hover:border-brand-purple/50 resize-none"
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-purple text-white font-medium px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-purple/30 flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Get in Touch</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
            </div>
          </div>
        </div>
      </div>

      <CalBookingModal 
        isOpen={showCalModal} 
        onClose={() => setShowCalModal(false)}
        calLink={import.meta.env.VITE_CAL_LINK}
      />
    </section>
  );
}
