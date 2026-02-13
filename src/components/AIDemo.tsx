import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  Clock,
  TrendingUp,
  Users,
  CheckCircle2,
  Zap,
  ArrowRight,
  Bot,
  User,
  CircleAlert,
  CircleCheck,
  Sparkles,
  Mail,
  ClipboardList,
  BarChart3,
} from 'lucide-react';

export function AIDemo() {
  const [selectedTab, setSelectedTab] = useState<'before' | 'after'>('before');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030303] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-[10%] w-96 h-96 bg-[#D4A853] rounded-full blur-[200px] opacity-[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Увидьте разницу</span>
            <br />
            <span className="text-gradient">До и После автоматизации</span>
          </h2>
          <p className="text-lg text-[#666] max-w-3xl mx-auto">
            Реальные результаты внедрения AI в бизнес-процессы
          </p>
        </motion.div>

        {/* Interactive Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          {/* Toggle Tabs */}
          <div className="flex justify-center mb-8 gap-4">
            <button
              onClick={() => setSelectedTab('before')}
              className={`
                px-8 py-4 rounded-full font-medium transition-all duration-300
                ${
                  selectedTab === 'before'
                    ? 'glass-strong text-white border-2 border-[#EF4444]/50'
                    : 'glass text-[#888] border border-transparent hover:border-[#333]'
                }
              `}
            >
              <span className="flex items-center gap-2">
                <CircleAlert className="w-5 h-5" />
                Без автоматизации
              </span>
            </button>
            <button
              onClick={() => setSelectedTab('after')}
              className={`
                px-8 py-4 rounded-full font-medium transition-all duration-300
                ${
                  selectedTab === 'after'
                    ? 'glass-strong text-white border-2 border-[#D4A853]/50'
                    : 'glass text-[#888] border border-transparent hover:border-[#333]'
                }
              `}
            >
              <span className="flex items-center gap-2">
                <CircleCheck className="w-5 h-5" />
                С AI-автоматизацией
              </span>
            </button>
          </div>

          {/* Comparison View */}
          <AnimatePresence mode="wait">
            {selectedTab === 'before' ? (
              <BeforeView key="before" />
            ) : (
              <AfterView key="after" />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <StatComparison
            icon={<Clock className="w-6 h-6" />}
            label="Время обработки"
            before="8 часов"
            after="5 секунд"
            improvement="99.9%"
          />
          <StatComparison
            icon={<TrendingUp className="w-6 h-6" />}
            label="Конверсия"
            before="12%"
            after="45%"
            improvement="+275%"
          />
          <StatComparison
            icon={<Users className="w-6 h-6" />}
            label="Обработано клиентов"
            before="50/день"
            after="2000/день"
            improvement="+4000%"
          />
          <StatComparison
            icon={<CheckCircle2 className="w-6 h-6" />}
            label="Точность"
            before="85%"
            after="99.8%"
            improvement="+17%"
          />
        </motion.div>

        {/* Live Messenger Demo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="text-gradient">Живая демонстрация</span> AI-бота
          </h3>
          <LiveMessengerDemo />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a href="#contact" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#D4A853] text-[#030303] font-semibold hover:bg-[#E8B86D] glow-gold transition-all duration-300">
            <span className="text-lg">Хочу такую же автоматизацию</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Before automation view
function BeforeView() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="glass-strong rounded-2xl p-8 border border-[#EF4444]/20"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-[#EF4444]/15 flex items-center justify-center">
          <User className="w-5 h-5 text-[#EF4444]" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Ручная обработка</h3>
          <p className="text-[#666] text-sm">Типичный рабочий день менеджера</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Manual tasks */}
        <TaskItem
          icon={<Mail className="w-5 h-5" />}
          text="Проверка почты и сообщений"
          time="2 часа"
          status="slow"
          delay={0}
        />
        <TaskItem
          icon={<ClipboardList className="w-5 h-5" />}
          text="Оформление заказов вручную"
          time="3 часа"
          status="slow"
          delay={0.2}
        />
        <TaskItem
          icon={<MessageCircle className="w-5 h-5" />}
          text="Ответы клиентам"
          time="2 часа"
          status="slow"
          delay={0.4}
        />
        <TaskItem
          icon={<BarChart3 className="w-5 h-5" />}
          text="Составление отчетов"
          time="1 час"
          status="slow"
          delay={0.6}
        />
        <TaskItem
          icon={<CircleAlert className="w-5 h-5" />}
          text="Ошибки и пропущенные заявки"
          time="—"
          status="error"
          delay={0.8}
        />
      </div>

      <div className="mt-6 p-3 rounded-xl bg-[#EF4444]/5 border border-[#EF4444]/15">
        <div className="flex items-center justify-between">
          <span className="text-[#888] text-sm">Итого за день:</span>
          <span className="text-xl font-bold text-[#EF4444]">8+ часов</span>
        </div>
      </div>
    </motion.div>
  );
}

// After automation view
function AfterView() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="glass-strong rounded-2xl p-8 border border-[#D4A853]/30"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-[#D4A853]/15 flex items-center justify-center">
          <Bot className="w-5 h-5 text-[#D4A853]" />
        </div>
        <div>
          <h3 className="text-xl font-bold">AI Автоматизация</h3>
          <p className="text-[#666] text-sm">Система работает 24/7</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Automated tasks */}
        <TaskItem
          icon={<Bot className="w-5 h-5" />}
          text="Автоответы на все сообщения"
          time="Мгновенно"
          status="fast"
          delay={0}
        />
        <TaskItem
          icon={<Zap className="w-5 h-5" />}
          text="Автоматическое оформление заказов"
          time="5 секунд"
          status="fast"
          delay={0.2}
        />
        <TaskItem
          icon={<Sparkles className="w-5 h-5" />}
          text="Персонализированные предложения"
          time="В реальном времени"
          status="fast"
          delay={0.4}
        />
        <TaskItem
          icon={<TrendingUp className="w-5 h-5" />}
          text="Автоматические аналитические отчеты"
          time="Каждый час"
          status="fast"
          delay={0.6}
        />
        <TaskItem
          icon={<CheckCircle2 className="w-5 h-5" />}
          text="0 пропущенных заявок"
          time="—"
          status="success"
          delay={0.8}
        />
      </div>

      <div className="mt-6 p-3 rounded-xl bg-[#D4A853]/10 border border-[#D4A853]/20">
        <div className="flex items-center justify-between">
          <span className="text-[#888] text-sm">Ваше время:</span>
          <span className="text-xl font-bold text-[#D4A853]">Свободно!</span>
        </div>
      </div>
    </motion.div>
  );
}

// Task item component
function TaskItem({
  icon,
  text,
  time,
  status,
  delay = 0,
}: {
  icon?: React.ReactNode;
  text: string;
  time: string;
  status: 'slow' | 'fast' | 'error' | 'success';
  delay?: number;
}) {
  const colors = {
    slow: 'border-[#EF4444]/30 bg-[#EF4444]/5',
    fast: 'border-[#00FFB8]/30 bg-[#00FFB8]/5',
    error: 'border-[#EF4444]/50 bg-[#EF4444]/10',
    success: 'border-[#00FFB8]/50 bg-[#00FFB8]/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`flex items-center justify-between gap-4 p-4 rounded-xl border ${colors[status]}`}
    >
      <span className="flex items-center gap-3 flex-1">
        {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
        {text}
      </span>
      <span className="text-sm text-gray-400 shrink-0">{time}</span>
    </motion.div>
  );
}

// Stats comparison component
function StatComparison({
  icon,
  label,
  before,
  after,
  improvement,
}: {
  icon: React.ReactNode;
  label: string;
  before: string;
  after: string;
  improvement: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 400 }}
      className="glass-strong rounded-2xl p-6 border border-[#222] hover:border-[#D4A853]/30 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-[#D4A853]/15 flex items-center justify-center">
          <div className="text-[#D4A853]">{icon}</div>
        </div>
        <h4 className="font-medium text-[#ccc]">{label}</h4>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666]">До:</span>
          <span className="text-[#EF4444] line-through">{before}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#666] text-sm">После:</span>
          <span className="text-[#D4A853] text-xl font-bold">{after}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#222]">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#D4A853]" />
          <span className="text-[#D4A853] font-bold">{improvement}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Live messenger demo — continuous dialogue with typing effect
function LiveMessengerDemo() {
  const [messages, setMessages] = useState<{ id: number; text: string; from: 'user' | 'bot'; timestamp: string }[]>([]);
  const [isTyping, setIsTyping] = useState<'user' | 'bot' | null>(null);

  React.useEffect(() => {
    const script = [
      { t: 600, fn: () => setMessages((m) => [...m, { id: 1, text: 'Здравствуйте! Хочу узнать о ваших услугах', from: 'user', timestamp: '14:23' }]) },
      { t: 1200, fn: () => setIsTyping('bot') },
      { t: 3500, fn: () => { setIsTyping(null); setMessages((m) => [...m, { id: 2, text: 'Добрый день! Отвечаю за 5 секунд. CRM, WhatsApp, Telegram. Лиды не теряются. Что вас интересует?', from: 'bot', timestamp: '14:23' }]); } },
      { t: 4200, fn: () => setIsTyping('user') },
      { t: 5200, fn: () => { setIsTyping(null); setMessages((m) => [...m, { id: 3, text: 'Меня интересует автоматизация', from: 'user', timestamp: '14:24' }]); } },
      { t: 5700, fn: () => setIsTyping('bot') },
      { t: 8200, fn: () => { setIsTyping(null); setMessages((m) => [...m, { id: 4, text: 'Заявка из WhatsApp → в AmoCRM за 5 сек. Бот работает 24/7. Хотите расчёт под ваш бизнес? Отвечу за 24 часа.', from: 'bot', timestamp: '14:24' }]); } },
      { t: 8900, fn: () => setIsTyping('user') },
      { t: 10200, fn: () => { setIsTyping(null); setMessages((m) => [...m, { id: 5, text: 'Да, хочу расчёт', from: 'user', timestamp: '14:25' }]); } },
      { t: 10800, fn: () => setIsTyping('bot') },
      { t: 13500, fn: () => { setIsTyping(null); setMessages((m) => [...m, { id: 6, text: 'Отлично! Оставьте контакт — свяжемся в течение часа.', from: 'bot', timestamp: '14:25' }]); } },
    ];
    const timers = script.map(({ t, fn }) => setTimeout(fn, t));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="max-w-2xl mx-auto glass-strong rounded-3xl overflow-hidden border border-[#D4A853]/20">
      {/* Messenger header */}
      <div className="bg-gradient-to-r from-[#D4A853] to-[#C9A227] p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-white">AI Support Bot</h4>
            <div className="flex items-center gap-1.5 text-xs text-white/80">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse-glow" />
              <span>Онлайн 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="p-6 space-y-4 min-h-[400px]">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-[80%]">
                <div
                  className={`
                    px-4 py-3 rounded-2xl
                    ${
                      msg.from === 'user'
                        ? 'bg-[#D4A853] text-[#030303] rounded-br-none'
                        : 'glass border border-[#D4A853]/30 text-[#E8E8E8] rounded-bl-none'
                    }
                  `}
                >
                  {msg.text}
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${msg.from === 'user' ? 'text-right pr-2' : 'pl-2'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${isTyping === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`glass px-4 py-3 rounded-2xl border border-[#D4A853]/30 ${isTyping === 'user' ? 'rounded-br-none' : 'rounded-bl-none'}`}>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#D4A853]"
                      animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#666]">
                  {isTyping === 'user' ? 'Печатаете...' : 'Бот печатает...'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input (disabled for demo) */}
      <div className="p-4 border-t border-gray-700">
        <div className="glass rounded-full px-4 py-3 flex items-center gap-3 opacity-50">
          <input
            type="text"
            placeholder="Это демо — бот отвечает автоматически..."
            disabled
            className="flex-1 bg-transparent border-none outline-none text-gray-400"
          />
          <Bot className="w-5 h-5 text-[#D4A853]" />
        </div>
      </div>
    </div>
  );
}
