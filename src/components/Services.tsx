import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { MessageSquare, Zap, Brain, Code2, ArrowRight, Bot, Cog, Sparkles, Database, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
      });
      // Simple fade-in on scroll
      const cards = cardsRef.current ? Array.from(cardsRef.current.children) : [];
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 95%' },
          opacity: 0,
          y: 30,
          duration: 0.5,
          delay: i * 0.05,
          ease: 'power2.out',
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030303] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4A853] rounded-full blur-[180px] opacity-[0.06]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C9A227] rounded-full blur-[180px] opacity-[0.05]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-[#D4A853]" />
            <span className="text-sm text-[#888]">Что вы получите</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-[#E8E8E8]">Решения, которые </span>
            <span className="text-gradient">увеличивают продажи</span>
          </h2>
          <p className="text-xl text-[#666] max-w-3xl mx-auto">
            Каждая заявка — в CRM. Каждый клиент — получает ответ за 5 секунд. Никаких потерь.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CRM Automation - Large */}
          <div className="lg:col-span-2 lg:row-span-2">
            <ServiceCard
              title="AmoCRM и Bitrix24: лиды из мессенджеров — в CRM за 5 сек"
              description="Заявка из WhatsApp → задача в AmoCRM. Менеджер видит всё. Ни одной потери. Сокращаем рутину на 80%."
              icon={<Database className="w-12 h-12" />}
              gradient="from-[#D4A853] to-[#C9A227]"
              large
            >
              <CRMDemo />
            </ServiceCard>
          </div>

          {/* WhatsApp bots */}
          <div>
            <ServiceCard
              title="WhatsApp Business: отвечаем за вас 24/7"
              description="Клиент пишет в 3 ночи — бот отвечает. Заказ оформлен. Лид в CRM. Вы спите — продажи идут."
              icon={<MessageSquare className="w-10 h-10" />}
              gradient="from-[#25D366] to-[#128C7E]"
            >
              <WhatsAppDemo />
            </ServiceCard>
          </div>

          {/* Instagram bots */}
          <div>
            <ServiceCard
              title="Instagram Direct: не теряйте подписчиков"
              description="Ответ в Direct за 3 секунды. Запись на услугу. Лид в AmoCRM. Конверсия из сторис ×3."
              icon={<Smartphone className="w-10 h-10" />}
              gradient="from-[#E1306C] to-[#F77737]"
            >
              <InstagramDemo />
            </ServiceCard>
          </div>

          {/* Telegram - keep */}
          <div>
            <ServiceCard
              title="Telegram: AI-бот как живой менеджер"
              description="Понимает контекст. Отвечает на вопросы. Оформляет заказы. Работает пока вы спите."
              icon={<Bot className="w-10 h-10" />}
              gradient="from-[#0088CC] to-[#00D4FF]"
            >
              <TelegramBotDemo />
            </ServiceCard>
          </div>

          {/* Custom + AI */}
          <div className="lg:col-span-2">
            <ServiceCard
              title="Интеграции и кастом: под ключ"
              description="Связываем любые системы. Внедряем ChatGPT/Claude в ваши процессы. От идеи до запуска за 2 недели."
              icon={<Code2 className="w-10 h-10" />}
              gradient="from-[#7B2FFF] to-[#B829FF]"
            >
              <CustomSoftwareDemo />
            </ServiceCard>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full glass-strong hover:glass border border-[#333] hover:border-[#D4A853]/50 transition-all duration-300"
          >
            <span className="text-lg">Обсудить ваш проект</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Service card component with 3D hover effect
function ServiceCard({
  title,
  description,
  icon,
  gradient,
  children,
  large = false,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  children?: React.ReactNode;
  large?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const rotateX = useSpring(
    useTransform(useMotionValue(mousePosition.y), [0, 1], [10, -10]),
    { stiffness: 200, damping: 30 }
  );
  const rotateY = useSpring(
    useTransform(useMotionValue(mousePosition.x), [0, 1], [-10, 10]),
    { stiffness: 200, damping: 30 }
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`
        relative glass-strong rounded-3xl overflow-hidden
        group cursor-pointer
        ${large ? 'p-8 min-h-[500px]' : 'p-6 min-h-[300px]'}
      `}
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        style={{
          x: useTransform(useMotionValue(mousePosition.x), [0, 1], [-50, 50]),
          y: useTransform(useMotionValue(mousePosition.y), [0, 1], [-50, 50]),
        }}
      />

      {/* Glow effect following cursor */}
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${gradient.includes('D4A853') ? '#D4A853' : gradient.includes('25D366') ? '#25D366' : gradient.includes('E1306C') ? '#E1306C' : '#D4A853'}, transparent)`,
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
        {/* Icon */}
        <motion.div
          className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} p-3 mb-4`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <div className="text-white">{icon}</div>
        </motion.div>

        {/* Title */}
        <h3 className={`font-bold mb-3 ${large ? 'text-3xl' : 'text-2xl'}`}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 mb-6">{description}</p>

        {/* Demo content */}
        {children && <div className="mt-6">{children}</div>}

        {/* Arrow indicator */}
        <motion.div
          className="absolute bottom-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center"
          whileHover={{ scale: 1.2, x: 5, y: -5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <ArrowRight className="w-5 h-5 text-[#D4A853]" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// CRM integration demo
function CRMDemo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 glass rounded-xl p-3">
        <div className="flex gap-1">
          {['Amo', 'Bitrix'].map((name, i) => (
            <span key={i} className="px-2 py-1 rounded bg-[#D4A853]/20 text-xs font-medium text-[#D4A853]">
              {name}
            </span>
          ))}
        </div>
        <span className="text-gray-400 text-sm">↔</span>
        <div className="flex gap-1">
          {['WhatsApp', 'TG', 'IG'].map((name, i) => (
            <span key={i} className="px-2 py-1 rounded bg-[#E8B86D]/20 text-xs font-medium text-[#E8B86D]">
              {name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Zap className="w-4 h-4 text-[#D4A853]" />
        <span>Лиды → CRM автоматически</span>
      </div>
    </div>
  );
}

// WhatsApp demo
function WhatsAppDemo() {
  return (
    <div className="space-y-2">
      <div className="glass rounded-xl p-3 text-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#25D366]" />
          <span>WhatsApp Business API</span>
        </div>
        <div className="text-gray-400 text-xs">Заказы • Поддержка • Продажи</div>
      </div>
    </div>
  );
}

// Instagram demo
function InstagramDemo() {
  return (
    <div className="space-y-2">
      <div className="glass rounded-xl p-3 text-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#E1306C]" />
          <span>Instagram Direct</span>
        </div>
        <div className="text-gray-400 text-xs">Автоответы • Лиды • CRM</div>
      </div>
    </div>
  );
}

// Telegram bot demo - continuous conversation
function TelegramBotDemo() {
  const [messages, setMessages] = useState<{ text: string; from: 'user' | 'bot' }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  React.useEffect(() => {
    const script = [
      { delay: 500, action: () => setMessages((m) => [...m, { text: 'Здравствуйте! Хочу заказать...', from: 'user' }]) },
      { delay: 1500, action: () => setIsTyping(true) },
      { delay: 2500, action: () => { setIsTyping(false); setMessages((m) => [...m, { text: 'Добрый день! Сейчас помогу оформить заказ.', from: 'bot' }]); } },
      { delay: 3500, action: () => setMessages((m) => [...m, { text: 'Какой адрес доставки?', from: 'bot' }]) },
      { delay: 5000, action: () => setMessages((m) => [...m, { text: 'ул. Примерная, 1', from: 'user' }]) },
      { delay: 6000, action: () => setIsTyping(true) },
      { delay: 7500, action: () => { setIsTyping(false); setMessages((m) => [...m, { text: 'Заявка создана. Менеджер свяжется в течение 5 минут.', from: 'bot' }]); } },
    ];
    const timers = script.map(({ delay, action }) => setTimeout(action, delay));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: msg.from === 'user' ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[85%] px-3 py-2 rounded-xl text-xs ${
              msg.from === 'user' ? 'bg-[#D4A853]/20' : 'bg-white/5 border border-white/10'
            }`}
          >
            {msg.text}
          </div>
        </motion.div>
      ))}
      {isTyping && (
        <div className="flex justify-start items-center gap-2 px-3 py-2">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#D4A853]"
                animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
          <span className="text-xs text-[#666]">Бот печатает...</span>
        </div>
      )}
    </div>
  );
}

// Custom software demo animation
function CustomSoftwareDemo() {
  const codeLines = [
    'const ai = new AIService();',
    'ai.integrate(business);',
    '// ✓ Автоматизация запущена',
  ];

  return (
    <div className="glass rounded-xl p-4 font-mono text-sm">
      {codeLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: i * 0.3 }}
          className={`${line.startsWith('//') ? 'text-[#D4A853]' : 'text-[#888]'}`}
        >
          {line}
        </motion.div>
      ))}
      <motion.div
        className="inline-block w-2 h-4 bg-[#D4A853] mt-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  );
}
