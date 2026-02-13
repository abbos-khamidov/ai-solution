import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const chars = titleRef.current.textContent || '';
        titleRef.current.innerHTML = chars
          .split('')
          .map((c) => `<span class="char inline-block" style="opacity:0;transform:translateY(60px)">${c === ' ' ? '&nbsp;' : c}</span>`)
          .join('');
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgeRef.current, { opacity: 0, y: 30, duration: 0.6 })
        .to(titleRef.current?.querySelectorAll('.char') || [], {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.02,
          ease: 'power3.out',
        })
        .from(subtitleRef.current, { opacity: 0, y: 40, duration: 0.6 }, '-=0.3')
        .from(buttonsRef.current?.children || [], { opacity: 0, y: 30, stagger: 0.1, duration: 0.5 }, '-=0.3')
        .from(statsRef.current?.children || [], { opacity: 0, scale: 0.9, stagger: 0.08, duration: 0.5 }, '-=0.2')
        .from(scrollRef.current, { opacity: 0, duration: 0.5 }, '-=0.3');

      gsap.to(scrollRef.current, {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(containerRef.current?.querySelector('.hero-content') || [], {
            opacity: 1 - progress * 0.7,
            scale: 1 - progress * 0.15,
            y: progress * -100,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Main Hero - above fold */}
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[15%] w-[500px] h-[500px] rounded-full bg-[#D4A853] opacity-[0.06] blur-[150px]" />
          <div className="absolute bottom-20 right-[15%] w-[400px] h-[400px] rounded-full bg-[#C9A227] opacity-[0.05] blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(212,168,83,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212,168,83,0.5) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="hero-content relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-8 border border-[#D4A853]/30"
          >
            <Sparkles className="w-4 h-4 text-[#D4A853]" />
            <span className="text-sm text-[#888]">Остановите потерю лидов. Сегодня.</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <div ref={titleRef} className="overflow-hidden">
              Теряете заявки из-за медленных ответов?
            </div>
          </h1>

          <p ref={subtitleRef} className="text-lg sm:text-xl text-[#888] mb-10 max-w-2xl mx-auto">
            <span className="text-[#E8E8E8]">Превратите хаос в систему за 2 недели.</span>
            <br />
            CRM, чат-боты WhatsApp и Telegram — лиды не теряются, менеджеры не выгорают.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="group px-8 py-4 rounded-full bg-[#D4A853] text-[#030303] font-semibold hover:bg-[#E8B86D] glow-gold transition-all duration-300"
            >
              Получить расчёт за 24 часа
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-full glass-strong text-[#E8E8E8] font-medium border border-[#333] hover:border-[#D4A853]/50 transition-all duration-300"
            >
              Наши решения →
            </a>
          </div>

          <div ref={statsRef} className="mt-16 grid grid-cols-3 gap-6 max-w-xl mx-auto">
            <StatItem number="−80%" label="Меньше рутины" />
            <StatItem number="×3" label="Больше лидов" />
            <StatItem number="24/7" label="Ответы клиентам" />
          </div>
        </div>

        <a
          href="#services"
          ref={scrollRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#666] hover:text-[#D4A853] transition-colors"
        >
          <span className="text-sm">Смотрите дальше</span>
          <ChevronDown className="w-6 h-6" />
        </a>
      </section>
    </>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="glass rounded-xl p-4 border border-[#222] hover:border-[#D4A853]/30 transition-all group">
      <div className="text-2xl md:text-3xl font-bold text-[#D4A853] group-hover:scale-105 transition-transform">
        {number}
      </div>
      <div className="text-sm text-[#666] group-hover:text-[#888]">{label}</div>
    </div>
  );
}
