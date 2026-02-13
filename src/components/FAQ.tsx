import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Plus, Minus, DollarSign, Clock, ShieldCheck, GraduationCap, Link2, CreditCard, Rocket, Globe } from 'lucide-react';

const faqs = [
  {
    question: 'Сколько стоит разработка AI-бота?',
    answer: 'Стоимость зависит от сложности проекта. Простой Telegram-бот с базовой автоматизацией начинается от $500. Сложные AI-решения с интеграциями и аналитикой — от $2000. Предоставляем бесплатную консультацию и точную оценку после анализа задачи.',
    Icon: DollarSign,
  },
  {
    question: 'Как долго занимает разработка?',
    answer: 'Простые боты — 3-7 дней. Средние проекты с интеграциями — 2-3 недели. Сложные системы автоматизации — 1-2 месяца. Всё зависит от функциональности и требований.',
    Icon: Clock,
  },
  {
    question: 'Какие гарантии вы предоставляете?',
    answer: 'Даем гарантию на все разработки 6 месяцев. Бесплатно исправляем ошибки и баги. Предоставляем техническую поддержку 24/7. Если результат не устроит — вернем деньги (условия в договоре).',
    Icon: ShieldCheck,
  },
  {
    question: 'Нужны ли технические знания для работы с ботом?',
    answer: 'Нет! Мы создаем интуитивно понятные решения. Проводим обучение вашей команды, предоставляем подробные инструкции и видео-гайды. Всегда на связи для помощи.',
    Icon: GraduationCap,
  },
  {
    question: 'Можно ли интегрировать бота с существующими системами?',
    answer: 'Да! Интегрируем с CRM (Bitrix24, amoCRM), платежными системами, сайтами, базами данных, 1С, Google Sheets и любыми другими системами через API.',
    Icon: Link2,
  },
  {
    question: 'Как происходит оплата?',
    answer: 'Работаем по этапам: 30% предоплата, 40% после разработки прототипа, 30% после сдачи проекта. Принимаем оплату картой, банковским переводом, криптовалютой. Работаем по договору.',
    Icon: CreditCard,
  },
  {
    question: 'Что будет после запуска проекта?',
    answer: 'Предоставляем техподдержку 24/7, регулярные обновления системы, мониторинг работы, обучение новых сотрудников. Дорабатываем функционал по запросу. Всегда на связи!',
    Icon: Rocket,
  },
  {
    question: 'Работаете ли вы с клиентами из других стран?',
    answer: 'Да! Работаем с клиентами из СНГ, Европы, США. Общаемся на русском и английском языках. Удаленная работа через Zoom, Telegram, Slack.',
    Icon: Globe,
  },
];

export function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030303] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-[20%] w-96 h-96 bg-[#D4A853] rounded-full blur-[200px] opacity-[0.03]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Частые вопросы</span>
            <br />
            <span className="text-[#E8E8E8]">и ответы</span>
          </h2>

          <p className="text-lg text-[#666]">
            Не нашли ответ? Напишите нам в Telegram!
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center glass-strong rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">Остались вопросы?</h3>
          <p className="text-gray-400 mb-6">
            Свяжитесь с нами для бесплатной консультации
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://t.me/aisolution_uz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#D4A853] text-[#030303] font-semibold hover:bg-[#E8B86D] transition-all duration-300"
            >
              Написать в Telegram
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full glass-strong border border-[#333] hover:border-[#D4A853]/50 transition-all duration-300"
            >
              Заказать звонок
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// FAQ Item component
function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  isInView,
}: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ x: 5 }}
      className="group"
    >
      <button
        onClick={onToggle}
        className={`
          w-full text-left glass-strong rounded-2xl p-6 transition-all duration-300
          ${isOpen ? 'border-2 border-[#D4A853]/50' : 'border border-[#222] hover:border-[#333]'}
        `}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-lg bg-[#D4A853]/20 flex items-center justify-center flex-shrink-0">
            <faq.Icon className="w-5 h-5 text-[#D4A853]" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-medium pr-4">{faq.question}</h3>

              {/* Toggle button */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${isOpen ? 'bg-[#D4A853]' : 'glass'}
                `}
              >
                {isOpen ? (
                  <Minus className="w-5 h-5 text-[#030303]" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </motion.div>
            </div>

            {/* Answer */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-[#888] mt-4 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
