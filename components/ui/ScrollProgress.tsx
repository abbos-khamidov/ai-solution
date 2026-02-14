'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed right-0 top-0 h-full w-[2px] bg-white/5 pointer-events-none z-[9998]">
      <div
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#D4A853] to-[#C9A227] transition-all duration-150 ease-out"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
}
