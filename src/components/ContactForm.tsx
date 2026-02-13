import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Send, Check, Loader2, Target, Lightbulb, TrendingUp, Rocket } from 'lucide-react';
import { toast } from 'sonner';

export function ContactForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contact: '',
    message: '',
    service: 'telegram-bot',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success('Заявка отправлена!', {
      description: 'Мы свяжемся с вами в ближайшее время',
    });
    setTimeout(() => {
      setFormData({ name: '', company: '', contact: '', message: '', service: 'telegram-bot' });
      setIsSuccess(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const benefits = [
    { Icon: Target, title: 'Бесплатный аудит', description: 'Анализ ваших процессов и точки роста' },
    { Icon: Lightbulb, title: 'План автоматизации', description: 'Детальная стратегия внедрения AI' },
    { Icon: TrendingUp, title: 'Расчет ROI', description: 'Точная экономия времени и денег' },
    { Icon: Rocket, title: 'Быстрый старт', description: 'Начинаем работу в течение 24 часов' },
  ];

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030303] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4A853] rounded-full blur-[250px] opacity-[0.04]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-[#E8E8E8]">Начните </span>
            <span className="text-gradient">автоматизацию</span>
            <br />
            <span className="text-[#E8E8E8]">уже сегодня</span>
          </h2>
          <p className="text-lg text-[#666] max-w-3xl mx-auto">
            Оставьте заявку и получите бесплатную консультацию + расчет стоимости
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <h3 className="text-2xl font-bold mb-6">Что вы получите:</h3>
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                className="flex items-start gap-4 glass-strong rounded-2xl p-5 border border-[#222] hover:border-[#D4A853]/20 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#D4A853]/10 flex items-center justify-center flex-shrink-0">
                  <benefit.Icon className="w-5 h-5 text-[#D4A853]" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{benefit.title}</h4>
                  <p className="text-[#888] text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-strong rounded-2xl p-8 border border-[#222] relative overflow-hidden"
            >
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-[#030303]/95 backdrop-blur-sm z-10 flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
                      className="w-16 h-16 rounded-full bg-[#D4A853] flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="w-8 h-8 text-[#030303]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Заявка отправлена!</h3>
                    <p className="text-[#888]">Свяжемся с вами в течение часа</p>
                  </div>
                </motion.div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#ccc]">Ваше имя *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass border border-[#222] focus:border-[#D4A853] focus:outline-none focus:ring-2 focus:ring-[#D4A853]/20 transition-all duration-300 bg-[#0A0A0A]/50 text-[#E8E8E8]"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#ccc]">Компания</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass border border-[#222] focus:border-[#D4A853] focus:outline-none focus:ring-2 focus:ring-[#D4A853]/20 transition-all duration-300 bg-[#0A0A0A]/50 text-[#E8E8E8]"
                    placeholder="Название компании"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#ccc]">Telegram или телефон *</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass border border-[#222] focus:border-[#D4A853] focus:outline-none focus:ring-2 focus:ring-[#D4A853]/20 transition-all duration-300 bg-[#0A0A0A]/50 text-[#E8E8E8]"
                    placeholder="@username или +998901234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#ccc]">Какая услуга интересует? *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass border border-[#222] focus:border-[#D4A853] focus:outline-none focus:ring-2 focus:ring-[#D4A853]/20 transition-all duration-300 bg-[#0A0A0A]/50 text-[#E8E8E8]"
                  >
                    <option value="telegram-bot">Telegram бот на AI</option>
                    <option value="automation">Автоматизация процессов</option>
                    <option value="ai-integration">Внедрение ИИ</option>
                    <option value="custom-software">Кастомная разработка</option>
                    <option value="consultation">Консультация</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#ccc]">Опишите вашу задачу</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl glass border border-[#222] focus:border-[#D4A853] focus:outline-none focus:ring-2 focus:ring-[#D4A853]/20 transition-all duration-300 resize-none bg-[#0A0A0A]/50 text-[#E8E8E8]"
                    placeholder="Расскажите подробнее о вашем проекте..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#D4A853] text-[#030303] font-semibold hover:bg-[#E8B86D] glow-gold transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Отправка...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Отправить заявку</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-[#555] text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
