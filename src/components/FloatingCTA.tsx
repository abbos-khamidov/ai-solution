import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <button
            onClick={handleClick}
            className="group relative w-14 h-14 bg-[#D4A853] hover:bg-[#E8B86D] rounded-full shadow-lg shadow-[#D4A853]/20 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:shadow-[#D4A853]/30"
          >
            <MessageCircle className="w-6 h-6 text-[#030303]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
