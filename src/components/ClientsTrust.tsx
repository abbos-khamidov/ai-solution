import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, BarChart3, Building2, GraduationCap, Package, CreditCard } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: 'E-commerce', Icon: ShoppingCart },
  { name: 'B2B Услуги', Icon: BarChart3 },
  { name: 'Медицина', Icon: Building2 },
  { name: 'Образование', Icon: GraduationCap },
  { name: 'Логистика', Icon: Package },
  { name: 'Финансы', Icon: CreditCard },
];

const integrations = [
  { name: 'AmoCRM' },
  { name: 'Bitrix24' },
  { name: 'WhatsApp' },
  { name: 'Instagram' },
  { name: 'Telegram' },
];

export function ClientsTrust() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const integrationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
      });
      gsap.from(clientsRef.current?.children || [], {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0, y: 30, duration: 0.5, stagger: 0.08, ease: 'power3.out',
      });
      gsap.from(integrationsRef.current?.children || [], {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        opacity: 0, scale: 0.95, duration: 0.4, stagger: 0.06, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030303] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-[20%] w-96 h-96 bg-[#D4A853] rounded-full blur-[200px] opacity-[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-[#E8E8E8]">Интеграции с </span>
            <span className="text-gradient">CRM и мессенджерами</span>
          </h2>
          <p className="text-lg text-[#666] max-w-3xl mx-auto">
            Работаем с AmoCRM, Bitrix24, WhatsApp Business, Instagram и Telegram
          </p>
        </div>

        {/* Integration badges */}
        <div ref={integrationsRef} className="flex flex-wrap justify-center gap-3 mb-16">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="px-5 py-2.5 rounded-full glass-strong border border-[#222] hover:border-[#D4A853]/30 transition-all duration-300"
            >
              <span className="font-medium text-sm text-[#E8E8E8]">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Client industries */}
        <div ref={clientsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {clients.map((client) => {
            const Icon = client.Icon;
            return (
              <div
                key={client.name}
                className="glass-strong rounded-2xl p-6 flex flex-col items-center justify-center border border-[#222] hover:border-[#D4A853]/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4A853]/10 flex items-center justify-center mb-3 group-hover:bg-[#D4A853]/15 transition-colors">
                  <Icon className="w-6 h-6 text-[#D4A853]" />
                </div>
                <span className="text-sm font-medium text-[#888] group-hover:text-[#E8E8E8] transition-colors">
                  {client.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
