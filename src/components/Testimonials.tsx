import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Алексей Иванов',
    position: 'CEO, TechStart',
    company: 'E-commerce',
    initials: 'АИ',
    rating: 5,
    text: 'Команда aisolution создала для нас AI-бота, который увеличил продажи на 285%. Клиенты получают ответы мгновенно, а мы экономим на менеджерах. Лучшее вложение в автоматизацию!',
  },
  {
    name: 'Мария Петрова',
    position: 'Директор',
    company: 'Медицинский центр "Здоровье"',
    initials: 'МП',
    rating: 5,
    text: 'Telegram-бот для записи к врачам полностью изменил работу клиники. 92% пациентов записываются онлайн, нагрузка на администраторов снизилась на 80%. Рекомендую!',
  },
  {
    name: 'Дмитрий Соколов',
    position: 'Основатель',
    company: 'Digital Agency Pro',
    initials: 'ДС',
    rating: 5,
    text: 'Внедрили CRM с AI-аналитикой. Система предсказывает сделки с точностью 94% и экономит 40 часов работы в месяц. Невероятная эффективность!',
  },
  {
    name: 'Елена Смирнова',
    position: 'Marketing Director',
    company: 'Fashion Retail',
    initials: 'ЕС',
    rating: 5,
    text: 'AI-автоматизация от aisolution помогла нам обрабатывать в 40 раз больше заявок. ROI окупился за 2 месяца. Профессиональная команда!',
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030303] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-[15%] w-96 h-96 bg-[#D4A853] rounded-full blur-[200px] opacity-[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-[#E8E8E8]">Что говорят </span>
            <span className="text-gradient">наши клиенты</span>
          </h2>
          <p className="text-lg text-[#666] max-w-2xl mx-auto">
            Доверие и результаты — наши главные приоритеты
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-3xl mx-auto mb-12"
        >
          <div className="relative min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="glass-strong rounded-2xl p-8 md:p-12 border border-[#222]"
              >
                <Quote className="w-10 h-10 text-[#D4A853]/30 mb-6" />

                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D4A853] text-[#D4A853]" />
                  ))}
                </div>

                <p className="text-lg text-[#ccc] mb-8 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A853] to-[#C9A227] flex items-center justify-center">
                    <span className="text-sm font-bold text-[#030303]">
                      {testimonials[currentIndex].initials}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#E8E8E8]">{testimonials[currentIndex].name}</h4>
                    <p className="text-[#888] text-sm">{testimonials[currentIndex].position}</p>
                    <p className="text-[#666] text-xs">{testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-11 h-11 rounded-full glass-strong flex items-center justify-center border border-[#222] hover:border-[#D4A853]/30 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 h-2.5 bg-[#D4A853]'
                      : 'w-2.5 h-2.5 bg-[#333] hover:bg-[#555]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-11 h-11 rounded-full glass-strong flex items-center justify-center border border-[#222] hover:border-[#D4A853]/30 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
