import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import {
  Lightbulb,
  FileSearch,
  Code,
  Rocket,
  Headphones,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  AlertTriangle,
  ClipboardList,
  DollarSign,
  Bot,
  Zap,
  Gem,
  User,
} from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Анализ задачи',
    description: 'Изучаем ваш бизнес и находим точки роста',
    color: 'from-[#D4A853] to-[#C9A227]',
    duration: '1-2 дня',
  },
  {
    icon: FileSearch,
    title: 'Проектирование решения',
    description: 'Разрабатываем архитектуру и выбираем технологии',
    color: 'from-[#B8923D] to-[#D4A853]',
    duration: '2-3 дня',
  },
  {
    icon: Code,
    title: 'Разработка',
    description: 'Создаем AI-решение с учетом всех требований',
    color: 'from-[#C9A227] to-[#E8B86D]',
    duration: '1-3 недели',
  },
  {
    icon: Rocket,
    title: 'Запуск',
    description: 'Внедряем систему и обучаем вашу команду',
    color: 'from-[#D4A853] to-[#B8923D]',
    duration: '1-2 дня',
  },
  {
    icon: Headphones,
    title: 'Поддержка 24/7',
    description: 'Всегда на связи для улучшений и обновлений',
    color: 'from-[#E8B86D] to-[#D4A853]',
    duration: 'Постоянно',
  },
];

export function ProcessAutomation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030303] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4A853] rounded-full blur-[200px] opacity-[0.04]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C9A227] rounded-full blur-[200px] opacity-[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-[#D4A853]" />
            <span className="text-sm text-[#888]">Как мы работаем</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-[#E8E8E8]">От идеи</span>{' '}
            <span className="text-gradient">до результата</span>
          </h2>

          <p className="text-xl text-[#666] max-w-3xl mx-auto">
            Прозрачный процесс работы с контролем на каждом этапе
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#1A1A1A] -translate-x-1/2 hidden lg:block">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full bg-gradient-to-b from-[#D4A853] to-[#C9A227]"
            />
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => (
              <TimelineStep key={index} step={step} index={index} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* Before/After comparison */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-32"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-gradient">Результат автоматизации</span>
            </h3>
            <p className="text-lg text-[#666]">Посмотрите, как меняется работа с AI</p>
          </div>

          <ComparisonDemo />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#D4A853] text-[#030303] font-semibold hover:bg-[#E8B86D] glow-gold transition-all duration-300"
          >
            <span className="text-lg">Начать автоматизацию</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineStep({
  step,
  index,
  isInView,
}: {
  step: (typeof steps)[0];
  index: number;
  isInView: boolean;
}) {
  const isEven = index % 2 === 0;
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={`flex flex-col lg:flex-row items-center gap-8 ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      }`}
    >
      <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
        <div className="inline-block">
          <div className="glass-strong rounded-2xl p-8 border border-[#222] hover:border-[#D4A853]/30 transition-all duration-300">
            <div className={`flex items-center gap-3 mb-4 ${isEven ? 'lg:justify-end' : ''}`}>
              {!isEven && (
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-[#030303]" />
                </div>
              )}
              <h3 className="text-xl font-bold">{step.title}</h3>
              {isEven && (
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-[#030303]" />
                </div>
              )}
            </div>
            <p className="text-[#666] mb-4">{step.description}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm">
              <span className="text-[#888]">Срок:</span>
              <span className="text-[#D4A853] font-medium">{step.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center node */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
        >
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
            <span className="text-xl font-bold text-[#030303]">{index + 1}</span>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
}

// Clean before/after comparison
function ComparisonDemo() {
  const [showAfter, setShowAfter] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowAfter(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Before */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-strong rounded-2xl p-8 border border-[#EF4444]/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#EF4444]/15 flex items-center justify-center">
            <User className="w-5 h-5 text-[#EF4444]" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Ручная работа</h3>
            <p className="text-[#666] text-sm">Медленно и с ошибками</p>
          </div>
        </div>
        <div className="space-y-3">
          <MetricRow icon={<Clock className="w-4 h-4" />} label="Время обработки" value="8 часов" color="text-[#EF4444]" />
          <MetricRow icon={<AlertTriangle className="w-4 h-4" />} label="Ошибки" value="15%" color="text-[#EF4444]" />
          <MetricRow icon={<ClipboardList className="w-4 h-4" />} label="Обработано в день" value="50 заявок" color="text-[#EF4444]" />
          <MetricRow icon={<DollarSign className="w-4 h-4" />} label="Стоимость" value="$2000/мес" color="text-[#EF4444]" />
        </div>
      </motion.div>

      {/* After */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: showAfter ? 1 : 0.3, x: 0, scale: showAfter ? 1 : 0.98 }}
        transition={{ duration: 0.5 }}
        className={`glass-strong rounded-2xl p-8 border transition-all duration-700 ${
          showAfter ? 'border-[#D4A853]/40' : 'border-[#222]'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#D4A853]/15 flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#D4A853]" />
          </div>
          <div>
            <h3 className="text-xl font-bold">С AI автоматизацией</h3>
            <p className="text-[#666] text-sm">Быстро и точно</p>
          </div>
        </div>
        <div className="space-y-3">
          <MetricRow icon={<Zap className="w-4 h-4" />} label="Время обработки" value="5 секунд" color="text-[#D4A853]" />
          <MetricRow icon={<CheckCircle className="w-4 h-4" />} label="Ошибки" value="0.1%" color="text-[#D4A853]" />
          <MetricRow icon={<Rocket className="w-4 h-4" />} label="Обработано в день" value="2000 заявок" color="text-[#D4A853]" />
          <MetricRow icon={<Gem className="w-4 h-4" />} label="Стоимость" value="$500/мес" color="text-[#D4A853]" />
        </div>
        {showAfter && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 p-3 rounded-xl bg-[#D4A853]/10 border border-[#D4A853]/20 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-[#D4A853] font-medium text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Экономия 75% бюджета</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function MetricRow({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 glass rounded-xl">
      <div className="flex items-center gap-3">
        <span className="text-[#666]">{icon}</span>
        <span className="text-[#888] text-sm">{label}</span>
      </div>
      <span className={`font-bold ${color}`}>{value}</span>
    </div>
  );
}
