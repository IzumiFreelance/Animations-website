import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import './App.css';

const FloatingElement = ({ delay = 0, children }) => (
  <motion.div
    animate={{ 
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ 
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Handle navbar show/hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white" ref={scrollRef}>
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <motion.nav 
        className="fixed w-full bg-black/20 backdrop-blur-lg z-40"
        initial={{ y: -100 }}
        animate={{ 
          y: visible ? 0 : -100,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20
          }
        }}
      >
        <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl sm:text-2xl font-bold"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                A
              </motion.div>
              <motion.h1 
                className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text hidden sm:block"
              >
                Awesome Animations
              </motion.h1>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {['Home', 'Features', 'Projects', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative px-3 py-2 text-sm lg:text-base text-white/90 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
              <motion.button
                className="ml-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-sm lg:text-base font-semibold shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(167, 139, 250, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                className="w-6 h-0.5 bg-white absolute"
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 0 : -4
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-white absolute"
                animate={{
                  opacity: isMenuOpen ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-white absolute"
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? 0 : 4
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="container mx-auto py-4 px-4 space-y-1"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {['Home', 'Features', 'Projects', 'Contact'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block py-3 px-4 text-lg hover:bg-white/10 rounded-lg transition-colors relative overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ x: 10 }}
                  >
                    <motion.span className="relative z-10">{item}</motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
                <motion.button
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-lg font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-16 md:pt-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-24 relative z-10">
          <motion.div 
            className="text-center"
            style={{ opacity, scale }}
          >
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-8 gradient-text"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Welcome to the Future
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-purple-200 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Experience the power of modern web animations
            </motion.p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
              {['Explore', 'Learn More', 'Get Started'].map((text, index) => (
                <motion.button
                  key={text}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:bg-opacity-90 shadow-lg w-full sm:w-auto"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(167, 139, 250, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <FloatingElement key={i} delay={i * 0.5}>
              <div 
                className="absolute rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            </FloatingElement>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-24 bg-black bg-opacity-30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h3 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-16 text-center gradient-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Amazing Features
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { title: 'Responsive Design', icon: '📱', description: 'Perfectly adapts to any screen size' },
              { title: 'Modern Animations', icon: '✨', description: 'Smooth and engaging motion effects' },
              { title: 'Clean Code', icon: '💻', description: 'Well-structured and maintainable' },
              { title: 'Fast Performance', icon: '⚡', description: 'Optimized for speed and efficiency' },
              { title: 'Best Practices', icon: '🎯', description: 'Following industry standards' },
              { title: '24/7 Support', icon: '🔧', description: 'Always here to help you' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white bg-opacity-10 p-6 sm:p-8 rounded-2xl backdrop-blur-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 2,
                  boxShadow: "0 0 20px rgba(167, 139, 250, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl sm:text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{feature.title}</h3>
                <p className="text-purple-200 text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h3 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-16 text-center gradient-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.h3>

          <motion.div 
            className="max-w-2xl mx-auto bg-white bg-opacity-10 p-6 sm:p-8 rounded-2xl backdrop-blur-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <form className="space-y-4 sm:space-y-6">
              {[
                { label: 'Name', type: 'text', placeholder: 'Enter your name' },
                { label: 'Email', type: 'email', placeholder: 'Enter your email' },
                { label: 'Message', type: 'textarea', placeholder: 'Type your message here' }
              ].map((field) => (
                <motion.div 
                  key={field.label}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium mb-1 sm:mb-2">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea 
                      placeholder={field.placeholder}
                      className="w-full p-3 rounded-lg bg-white bg-opacity-20 focus:ring-2 focus:ring-purple-500 outline-none text-sm sm:text-base"
                      rows={4}
                    />
                  ) : (
                    <input 
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full p-3 rounded-lg bg-white bg-opacity-20 focus:ring-2 focus:ring-purple-500 outline-none text-sm sm:text-base"
                    />
                  )}
                </motion.div>
              ))}
              
              <motion.button
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-sm sm:text-base"
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(167, 139, 250, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black bg-opacity-30">
        <div className="container mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            2024 Awesome Animations. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}

export default App;
