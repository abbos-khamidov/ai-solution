import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles } from 'lucide-react';

const technologies = [
  { name: 'AmoCRM', category: 'CRM', icon: '📊', color: 'from-[#00D4FF] to-[#0066FF]' },
  { name: 'Bitrix24', category: 'CRM', icon: '📈', color: 'from-[#B829FF] to-[#7B2FFF]' },
  { name: 'OpenAI GPT-4', category: 'AI Models', icon: '🤖', color: 'from-[#00D4FF] to-[#0066FF]' },
  { name: 'Claude AI', category: 'AI Models', icon: '🧠', color: 'from-[#B829FF] to-[#7B2FFF]' },
  { name: 'Python', category: 'Backend', icon: '🐍', color: 'from-[#00FFB8] to-[#00E5A0]' },
  { name: 'Node.js', category: 'Backend', icon: '💚', color: 'from-[#7B2FFF] to-[#B829FF]' },
  { name: 'React', category: 'Frontend', icon: '⚛️', color: 'from-[#00D4FF] to-[#00FFB8]' },
  { name: 'Next.js', category: 'Frontend', icon: '▲', color: 'from-[#00E5A0] to-[#00D4FF]' },
  { name: 'Telegram Bot API', category: 'Integrations', icon: '✈️', color: 'from-[#0066FF] to-[#00D4FF]' },
  { name: 'PostgreSQL', category: 'Database', icon: '🐘', color: 'from-[#B829FF] to-[#00FFB8]' },
  { name: 'MongoDB', category: 'Database', icon: '🍃', color: 'from-[#00FFB8] to-[#7B2FFF]' },
  { name: 'Docker', category: 'DevOps', icon: '🐳', color: 'from-[#00D4FF] to-[#B829FF]' },
  { name: 'AWS', category: 'Cloud', icon: '☁️', color: 'from-[#7B2FFF] to-[#00E5A0]' },
  { name: 'FastAPI', category: 'Backend', icon: '⚡', color: 'from-[#00FFB8] to-[#0066FF]' },
];

const categories = ['Все', 'CRM', 'AI Models', 'Backend', 'Frontend', 'Integrations', 'Database', 'DevOps', 'Cloud'];

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = React.useState('Все');

  const filteredTechs = selectedCategory === 'Все'
    ? technologies
    : technologies.filter(tech => tech.category === selectedCategory);

  return (
    <section
      ref={containerRef}
      id="tech"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1A1F3A] to-[#0A0E27] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#00D4FF] rounded-full blur-[150px] opacity-10" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#B829FF] rounded-full blur-[150px] opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#00FFB8]" />
            <span className="text-sm text-gray-300">Технологии</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Современный</span>{' '}
            <span className="text-gradient">технологический стек</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Используем передовые технологии и AI-модели
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              className={`
                px-6 py-3 rounded-full font-medium transition-all duration-300
                ${
                  selectedCategory === category
                    ? 'glass-strong border-2 border-[#00D4FF] text-white'
                    : 'glass text-gray-400 border border-transparent hover:border-gray-600'
                }
              `}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {filteredTechs.map((tech, index) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-lg">
            + более 20 других технологий и инструментов
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Tech card component
function TechCard({
  tech,
  index,
  isInView,
}: {
  tech: typeof technologies[0];
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        type: 'spring',
        stiffness: 300,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10, scale: 1.05 }}
      className="group relative"
    >
      <div className="glass-strong rounded-2xl p-6 border border-gray-700 hover:border-[#00D4FF]/50 transition-all duration-300 flex flex-col items-center justify-center aspect-square">
        {/* Gradient background on hover */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Icon */}
        <motion.div
          className="text-5xl mb-3 relative z-10"
          animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {tech.icon}
        </motion.div>

        {/* Name */}
        <h3 className="text-sm font-medium text-center relative z-10 group-hover:text-gradient transition-all duration-300">
          {tech.name}
        </h3>

        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass text-xs text-gray-400 whitespace-nowrap"
        >
          {tech.category}
        </motion.div>

        {/* Particles effect on hover */}
        {isHovered && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${tech.color}`}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 8) * 40,
                  y: Math.sin((i * Math.PI * 2) / 8) * 40,
                  opacity: 0,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}
