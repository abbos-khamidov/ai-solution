'use client';

import Link from 'next/link';

const items = [
  {
    type: 'client' as const,
    initial: 'M',
    name: 'MarsIT',
    subtitle: 'IT-компания',
    href: '/cases/marsit-lead-automation',
    gradient: 'from-[#3B82F6] to-[#06B6D4]',
    color: '#3B82F6',
  },
  {
    type: 'client' as const,
    initial: 'S',
    name: 'Studify',
    subtitle: 'Образование',
    href: '/cases/studify-ai-automation',
    gradient: 'from-[#06B6D4] to-[#8B5CF6]',
    color: '#06B6D4',
  },
  {
    type: 'niche' as const,
    label: 'Цветочный бизнес',
    color: '#F472B6',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 22V14" stroke="#F472B6" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="12" cy="10" r="3" stroke="#F472B6" strokeWidth="1.8"/>
        <path d="M12 7C12 7 9 4 6 6s0 6 3 5" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 7C12 7 15 4 18 6s0 6-3 5" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    type: 'niche' as const,
    label: 'Медицина',
    color: '#34D399',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#34D399" strokeWidth="1.8"/>
        <path d="M12 8v8M8 12h8" stroke="#34D399" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    type: 'niche' as const,
    label: 'Образование',
    color: '#38BDF8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M2 10l10-6 10 6-10 6-10-6z" stroke="#38BDF8" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    type: 'niche' as const,
    label: 'HoReCa',
    color: '#FB923C',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M18 2v4c0 2-1 3-2 3s-2-1-2-3V2" stroke="#FB923C" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 9v13" stroke="#FB923C" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M6 2v6a3 3 0 0 0 6 0V2" stroke="#FB923C" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M9 8v14" stroke="#FB923C" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    type: 'niche' as const,
    label: 'Ритейл',
    color: '#A78BFA',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#A78BFA" strokeWidth="1.8" strokeLinejoin="round"/>
        <line x1="3" y1="6" x2="21" y2="6" stroke="#A78BFA" strokeWidth="1.8"/>
        <path d="M16 10a4 4 0 01-8 0" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

// Duplicate for seamless infinite loop
const track = [...items, ...items];

export function ClientLogos() {
  return (
    <section className="bg-[#05050A] py-10 px-4 md:px-6 overflow-hidden">
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#93C5FD]"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
            2+ клиента уже автоматизированы
          </div>
        </div>

        <p className="text-center text-xs text-[#475569] uppercase tracking-widest mb-6">
          Нам доверяют
        </p>

        {/* Marquee */}
        <div
          className="relative overflow-hidden"
          style={{
            padding: '8px 0',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="flex marquee-track w-max gap-4">
            {track.map((item, i) => {
              if (item.type === 'client') {
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl flex-shrink-0 transition-all duration-300 hover:-translate-y-0.5`}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-white font-bold text-sm">{item.initial}</span>
                    </div>
                    <div>
                      <p className="text-[#F8FAFC] font-bold text-sm leading-tight">{item.name}</p>
                      <p className="text-[#475569] text-xs mt-0.5">{item.subtitle}</p>
                    </div>
                  </Link>
                );
              }

              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl flex-shrink-0"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {item.icon}
                  <span className="text-sm text-[#64748B] whitespace-nowrap">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs text-[#334155] mt-6">
          и другие компании Узбекистана и СНГ
        </p>
      </div>
    </section>
  );
}
