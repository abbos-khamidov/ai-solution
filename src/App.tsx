import React, { memo, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Building2,
  ChartColumnIncreasing,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  Instagram,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MessagesSquare,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './styles/cinematic-header.css';
import './styles/intro-gate.css';


type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
  accent: 'is-cyan' | 'is-teal' | 'is-amber';
};

type ProcessStep = {
  title: string;
  description: string;
  deliverable: string;
  duration: string;
};

type CaseStudy = {
  company: string;
  segment: string;
  challenge: string;
  result: string;
  metrics: string[];
};

type ChannelKey = 'telegram' | 'instagram' | 'whatsapp';

type ChannelData = {
  title: string;
  subtitle: string;
  conversion: string;
  response: string;
  automation: string;
  dialog: Array<{ side: 'client' | 'bot'; text: string }>;
};

type ChannelUi = {
  label: string;
  handle: string;
  status: string;
  icon: LucideIcon;
};

const navigation = [
  { label: 'Услуги', href: '#services' },
  { label: 'ИИ-менеджер', href: '#manager' },
  { label: 'Этапы', href: '#process' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Контакты', href: '#contact' },
];

const serviceCards: Service[] = [
  {
    title: 'AI-автоматизация продаж и поддержки',
    description:
      'Проектируем процессы, где клиент получает ответ за секунды, а команда работает только с целевыми задачами.',
    icon: Workflow,
    bullets: ['Сквозной маршрут лида', 'Авторасстановка задач', 'Контроль SLA по каналам'],
    accent: 'is-cyan',
  },
  {
    title: 'Внедрение ИИ-менеджера в Telegram / Instagram / WhatsApp',
    description:
      'Настраиваем диалоги, квалификацию лидов, запись и продажи через мессенджеры с единым центром управления.',
    icon: Bot,
    bullets: ['Поддержка 24/7', 'Ответы по базе знаний', 'Сценарии под ваш отдел продаж'],
    accent: 'is-teal',
  },
  {
    title: 'Разработка сайтов, приложений и ботов под ключ',
    description:
      'Создаем цифровые продукты для бизнеса: от прототипа и UX до релиза, аналитики и масштабирования.',
    icon: Code2,
    bullets: ['Web + backend', 'Интеграции с CRM/ERP', 'Готовность к росту нагрузки'],
    accent: 'is-amber',
  },
];

const processSteps: ProcessStep[] = [
  {
    title: 'Аудит и стратегическая карта',
    description:
      'Проводим интервью с бизнесом, разбираем каналы, фиксируем узкие места и точки потери выручки.',
    deliverable: 'Карта процессов и roadmap внедрения',
    duration: '2-3 дня',
  },
  {
    title: 'Архитектура и прототип',
    description:
      'Проектируем UX, сценарии ИИ-менеджера, интеграционные контуры и правила обработки данных.',
    deliverable: 'Кликабельный прототип + техническая схема',
    duration: '3-5 дней',
  },
  {
    title: 'Разработка и интеграции',
    description:
      'Собираем продукт, подключаем CRM, мессенджеры, базы знаний и аналитические панели.',
    deliverable: 'Рабочий MVP с бизнес-логикой',
    duration: '1-3 недели',
  },
  {
    title: 'Запуск, обучение и оптимизация',
    description:
      'Запускаем в прод, обучаем команду и усиливаем метрики через итерации на реальном трафике.',
    deliverable: 'Регламент работы + план роста KPI',
    duration: 'Непрерывно',
  },
];

const caseStudies: CaseStudy[] = [
  {
    company: 'Сеть клиник эстетики',
    segment: 'Healthcare',
    challenge: 'Потеря лидов ночью и в выходные, перегруз колл-центра.',
    result: 'ИИ-менеджер закрыл 72% первичных вопросов без оператора за первый месяц.',
    metrics: ['+41% записей на консультацию', '-63% ручной рутины', 'SLA ответа: до 9 сек'],
  },
  {
    company: 'Дистрибьютор B2B-оборудования',
    segment: 'Industrial',
    challenge: 'Длинный цикл сделки, хаос в заявках из мессенджеров.',
    result: 'Автоворонка и единый кабинет менеджеров ускорили квалификацию лидов в 3 раза.',
    metrics: ['+29% конверсия в встречу', 'x3 скорость первичного контакта', '94% заполненность CRM'],
  },
  {
    company: 'E-commerce бренд аксессуаров',
    segment: 'Retail',
    challenge: 'Высокая стоимость поддержки и низкий процент повторных продаж.',
    result: 'Персональные рекомендации в WhatsApp и автосегментация увеличили LTV.',
    metrics: ['+36% повторные продажи', '-48% нагрузка на поддержку', 'ROI за 2.1 месяца'],
  },
];

const channelContent: Record<ChannelKey, ChannelData> = {
  telegram: {
    title: 'Telegram AI-менеджер',
    subtitle: 'B2B-сценарии, консультации, квалификация лида и передача в CRM.',
    conversion: 'до 38%',
    response: '3-7 сек',
    automation: 'до 79%',
    dialog: [
      { side: 'client', text: 'Нужна автоматизация входящих заявок из Telegram.' },
      { side: 'bot', text: 'Принял. Уточню воронку, подключу CRM и выдам план в 3 шага.' },
      { side: 'client', text: 'Можно запустить пилот на этой неделе?' },
      { side: 'bot', text: 'Да, стартуем за 48 часов и подключаем аналитику KPI.' },
    ],
  },
  instagram: {
    title: 'Instagram AI-менеджер',
    subtitle: 'Скрипты для Direct, сбор лидов из Stories и автоответы по каталогу.',
    conversion: 'до 34%',
    response: 'до 5 сек',
    automation: 'до 74%',
    dialog: [
      { side: 'client', text: 'Клиенты часто теряются после первого сообщения в Direct.' },
      { side: 'bot', text: 'Сделаем сценарий прогрева: вопрос, оффер, подбор решения, запись.' },
      { side: 'client', text: 'А CRM обновляется автоматически?' },
      { side: 'bot', text: 'Да, каждая квалифицированная заявка сразу уходит в карточку сделки.' },
    ],
  },
  whatsapp: {
    title: 'WhatsApp AI-менеджер',
    subtitle: 'Поддержка продаж и сервиса в одном канале с быстрым масштабированием.',
    conversion: 'до 42%',
    response: '2-6 сек',
    automation: 'до 82%',
    dialog: [
      { side: 'client', text: 'Нужен менеджер, который отвечает клиентам 24/7.' },
      { side: 'bot', text: 'Настроим AI-диалоги, FAQ и эскалацию в отдел продаж без потерь.' },
      { side: 'client', text: 'Сколько времени занимает внедрение?' },
      { side: 'bot', text: 'Первые сценарии запускаем в прод обычно за 5-10 рабочих дней.' },
    ],
  },
};

const faqItems = [
  {
    question: 'Сколько времени занимает запуск проекта?',
    answer:
      'Для пилота обычно достаточно 5-10 рабочих дней. Полноценное внедрение с интеграциями занимает 2-4 недели в зависимости от сложности.',
  },
  {
    question: 'Вы работаете только с Telegram?',
    answer:
      'Нет. Мы внедряем AI-менеджера в Telegram, Instagram и WhatsApp, а также соединяем каналы в единую систему с CRM и аналитикой.',
  },
  {
    question: 'Можно ли интегрировать ваше решение в текущую CRM?',
    answer:
      'Да. Подключаем amoCRM, Bitrix24 и кастомные CRM по API. Настраиваем передачу лидов, статусы воронок и контроль качества обработки.',
  },
  {
    question: 'Что с безопасностью данных?',
    answer:
      'Проектируем права доступа, логируем действия, разделяем окружения и внедряем регламенты хранения данных для бизнеса.',
  },
];

const partnerLine = [
  'Retail',
  'Healthcare',
  'EdTech',
  'HoReCa',
  'Logistics',
  'Real Estate',
  'FinTech',
  'Manufacturing',
];

const counters = [
  { value: 95, suffix: '%', label: 'типовых операций автоматизируем' },
  { value: 3.2, suffix: 'x', label: 'ускоряем первичный контакт с лидом', decimals: 1 },
  { value: 24, suffix: '/7', label: 'поддержка клиентов без простоев' },
];

const channelTabs: Array<{ key: ChannelKey; icon: LucideIcon; label: string }> = [
  { key: 'telegram', icon: Send, label: 'Telegram' },
  { key: 'instagram', icon: Instagram, label: 'Instagram' },
  { key: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
];

const channelUiMeta: Record<ChannelKey, ChannelUi> = {
  telegram: {
    label: 'Telegram',
    handle: '@aisolution_manager_bot',
    status: 'online',
    icon: Send,
  },
  instagram: {
    label: 'Instagram Direct',
    handle: '@aisolution.official',
    status: 'active now',
    icon: Instagram,
  },
  whatsapp: {
    label: 'WhatsApp Business',
    handle: '+1 (415) 555-0198',
    status: 'typing enabled',
    icon: MessageCircle,
  },
};

const INTRO_SESSION_KEY = 'ai_solution_intro_seen_v1';
type GsapModule = typeof import('gsap');
type ScrollTriggerModule = typeof import('gsap/ScrollTrigger');

function hasSeenIntroInSession(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function formatCount(value: number, decimals: number, suffix: string): string {
  const safe = Number.isFinite(value) ? value : 0;
  return `${safe.toFixed(decimals)}${suffix}`;
}

function buildContourPath(time: number, layer: number, width = 1400, height = 900, intensity = 1): string {
  const points = intensity <= 0.6 ? 20 : intensity <= 0.82 ? 24 : 30;
  const cx = width * 0.5 + Math.sin(time * 0.19 + layer * 0.7) * width * 0.06 * intensity;
  const cy = height * 0.45 + Math.cos(time * 0.16 + layer * 0.85) * height * 0.05 * intensity;
  const baseRadius = Math.min(width, height) * (0.2 + layer * 0.11);
  const stretchX = 1.05 + Math.sin(time * 0.23 + layer) * 0.14;
  const stretchY = 0.68 + Math.cos(time * 0.27 + layer) * 0.12;

  let d = '';
  for (let i = 0; i < points; i += 1) {
    const a = (i / points) * Math.PI * 2;
    const harmonic =
      Math.sin(a * (3 + layer * 0.4) + time * (0.9 + layer * 0.18)) * 0.16 +
      Math.cos(a * (5 + layer * 0.2) - time * 0.63) * 0.09;
    const radius = baseRadius * (1 + harmonic * intensity);
    const x = cx + Math.cos(a) * radius * stretchX;
    const y = cy + Math.sin(a) * radius * stretchY;
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return `${d} Z`;
}

function buildOrbitPath(time: number, lane: number, width = 1400, height = 900, intensity = 1): string {
  const cx = width * 0.5 + Math.sin(time * 0.22 + lane * 0.9) * width * 0.08 * intensity;
  const cy = height * 0.44 + Math.cos(time * 0.2 + lane * 0.6) * height * 0.06 * intensity;
  const rx = width * (0.18 + lane * 0.065);
  const ry = height * (0.14 + lane * 0.045);

  const a1 = time * (0.26 + lane * 0.06) + lane * 1.4;
  const a2 = a1 + Math.PI * (0.96 + 0.12 * Math.sin(time * 0.4 + lane));

  const sx = cx + Math.cos(a1) * rx;
  const sy = cy + Math.sin(a1) * ry;
  const ex = cx + Math.cos(a2) * rx;
  const ey = cy + Math.sin(a2) * ry;

  const c1x = cx + Math.cos(a1 + 0.8) * rx * 1.2;
  const c1y = cy + Math.sin(a1 + 0.8) * ry * 1.2;
  const c2x = cx + Math.cos(a2 - 0.8) * rx * 1.2;
  const c2y = cy + Math.sin(a2 - 0.8) * ry * 1.2;

  return `M ${sx.toFixed(2)} ${sy.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)}`;
}

function buildFacetPath(time: number, facet: number, width = 1400, height = 900, intensity = 1): string {
  const points = 5;
  const cx = width * (0.28 + facet * 0.23) + Math.sin(time * (0.31 + facet * 0.07)) * width * 0.03 * intensity;
  const cy = height * (0.36 + facet * 0.16) + Math.cos(time * (0.28 + facet * 0.05)) * height * 0.04 * intensity;
  const radius = Math.min(width, height) * (0.06 + facet * 0.02);
  const rotation = time * (0.14 + facet * 0.04) + facet * 0.6;

  let d = '';
  for (let i = 0; i < points; i += 1) {
    const angle = rotation + (i / points) * Math.PI * 2;
    const local = i % 2 === 0 ? 1.2 : 0.74;
    const x = cx + Math.cos(angle) * radius * local;
    const y = cy + Math.sin(angle) * radius * local;
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return `${d} Z`;
}

function ServiceCard({ service }: { service: Service }) {
  const cardRef = useRef<HTMLElement>(null);

  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current || !window.matchMedia('(pointer:fine)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * 10;
    const rotateY = (x - 0.5) * 12;

    cardRef.current.style.setProperty('--rotate-x', `${rotateX.toFixed(2)}deg`);
    cardRef.current.style.setProperty('--rotate-y', `${rotateY.toFixed(2)}deg`);
    cardRef.current.style.setProperty('--mouse-x', `${(x * 100).toFixed(2)}%`);
    cardRef.current.style.setProperty('--mouse-y', `${(y * 100).toFixed(2)}%`);
  };

  const onLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rotate-x', '0deg');
    cardRef.current.style.setProperty('--rotate-y', '0deg');
    cardRef.current.style.setProperty('--mouse-x', '50%');
    cardRef.current.style.setProperty('--mouse-y', '50%');
  };

  const Icon = service.icon;

  return (
    <article
      ref={cardRef}
      className={`service-card interactive ${service.accent}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-reveal
    >
      <div className="service-card__icon-wrap">
        <Icon className="service-card__icon" />
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <ul>
        {service.bullets.map((bullet) => (
          <li key={bullet}>
            <CheckCircle2 size={16} />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

type ManagerChatCardProps = {
  channelKey: ChannelKey;
  channelData: ChannelData;
  channelUi: ChannelUi;
  hasEntered: boolean;
};

const ManagerChatCard = memo(function ManagerChatCard({
  channelKey,
  channelData,
  channelUi,
  hasEntered,
}: ManagerChatCardProps) {
  const [typedDialog, setTypedDialog] = useState<string[]>([]);
  const [typingLine, setTypingLine] = useState<number | null>(null);
  const ActiveChannelIcon = channelUi.icon;

  useEffect(() => {
    const messages = channelData.dialog;

    if (!hasEntered) {
      setTypedDialog(messages.map((item) => item.text));
      setTypingLine(null);
      return;
    }

    setTypedDialog(Array(messages.length).fill(''));
    setTypingLine(0);

    let cancelled = false;
    let timeoutId: number | null = null;
    let lineIndex = 0;
    let charIndex = 0;
    const baseSpeed = channelKey === 'instagram' ? 15 : channelKey === 'telegram' ? 14 : 12;

    const schedule = (delay: number, fn: () => void) => {
      timeoutId = window.setTimeout(fn, delay);
    };

    const step = () => {
      if (cancelled) return;
      const line = messages[lineIndex];
      if (!line) {
        setTypingLine(null);
        return;
      }

      if (charIndex < line.text.length) {
        charIndex += 1;
        setTypingLine(lineIndex);
        setTypedDialog((prev) => {
          const next = prev.slice();
          next[lineIndex] = line.text.slice(0, charIndex);
          return next;
        });
        const currentChar = line.text[charIndex - 1] ?? '';
        const punctuationDelay = /[,.!?]/.test(currentChar) ? 40 : 0;
        schedule(baseSpeed + punctuationDelay + Math.floor(Math.random() * 18), step);
        return;
      }

      if (lineIndex < messages.length - 1) {
        lineIndex += 1;
        charIndex = 0;
        setTypingLine(lineIndex);
        schedule(320, step);
        return;
      }

      setTypingLine(null);
    };

    schedule(240, step);

    return () => {
      cancelled = true;
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [channelData, channelKey, hasEntered]);

  return (
    <article className={`manager-chat manager-chat--${channelKey} interactive`} data-reveal>
      <header className="manager-chat__intro">
        <h3>{channelData.title}</h3>
        <p>{channelData.subtitle}</p>
      </header>

      <div className="manager-chat__shell" aria-live="polite">
        <div className="manager-chat__topbar">
          <div className="manager-chat__identity">
            <span className="manager-chat__avatar">
              <ActiveChannelIcon size={14} />
            </span>
            <div>
              <strong>{channelUi.label}</strong>
              <small>{channelUi.handle}</small>
            </div>
          </div>
          <span className="manager-chat__status">{channelUi.status}</span>
        </div>

        <div className="manager-dialog">
          {channelData.dialog.map((item, index) => {
            const text = typedDialog[index] ?? '';
            const isTyping = typingLine === index;
            const shouldRender = text.length > 0 || isTyping;
            if (!shouldRender) return null;

            return (
              <div
                key={`${item.side}-${index}`}
                className={`dialog-line ${item.side === 'bot' ? 'is-bot' : 'is-client'} ${isTyping ? 'is-typing' : ''}`}
              >
                {item.side === 'bot' ? <Bot size={14} /> : <MessagesSquare size={14} />}
                <p>
                  {text}
                  {isTyping && <span className="dialog-line__caret" aria-hidden="true" />}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
});

export default function App() {
  const gsapRef = useRef<GsapModule['gsap'] | null>(null);
  const scrollTriggerRef = useRef<ScrollTriggerModule['ScrollTrigger'] | null>(null);
  const siteRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const launchRef = useRef<HTMLDivElement>(null);
  const launchLensRef = useRef<HTMLDivElement>(null);
  const contourPathRefs = useRef<Array<SVGPathElement | null>>([]);
  const orbitPathRefs = useRef<Array<SVGPathElement | null>>([]);
  const facetPathRefs = useRef<Array<SVGPathElement | null>>([]);
  const headerProgressLineRef = useRef<HTMLSpanElement>(null);
  const headerProgressValueRef = useRef(-1);
  const introTimerRef = useRef<number | null>(null);
  const navigationId = 'site-navigation';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeChannel, setActiveChannel] = useState<ChannelKey>('telegram');
  const [formSent, setFormSent] = useState(false);
  const [hasEntered, setHasEntered] = useState(() => hasSeenIntroInSession());
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntroInSession());
  const [motionReady, setMotionReady] = useState(false);

  const setContourPathRef = (index: number) => (node: SVGPathElement | null) => {
    contourPathRefs.current[index] = node;
  };

  const setOrbitPathRef = (index: number) => (node: SVGPathElement | null) => {
    orbitPathRefs.current[index] = node;
  };

  const setFacetPathRef = (index: number) => (node: SVGPathElement | null) => {
    facetPathRefs.current[index] = node;
  };

  const enterExperience = () => {
    if (hasEntered) return;
    if (introTimerRef.current !== null) {
      window.clearTimeout(introTimerRef.current);
      introTimerRef.current = null;
    }

    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      // ignore storage errors
    }

    setHasEntered(true);
    introTimerRef.current = window.setTimeout(() => {
      setShowIntro(false);
      introTimerRef.current = null;
    }, 760);
  };

  useEffect(() => {
    return () => {
      if (introTimerRef.current !== null) {
        window.clearTimeout(introTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!showIntro) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntro]);

  useEffect(() => {
    if (!hasEntered || motionReady) return;

    let cancelled = false;

    const loadMotion = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      gsapRef.current = gsap;
      scrollTriggerRef.current = ScrollTrigger;
      setMotionReady(true);
    };

    void loadMotion();

    return () => {
      cancelled = true;
    };
  }, [hasEntered, motionReady]);

  useEffect(() => {
    if (!hasEntered) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hasEntered]);

  useEffect(() => {
    if (!hasEntered) return;

    const media = window.matchMedia('(max-width: 760px)');
    if (!media.matches) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = isMenuOpen ? 'hidden' : previousOverflow;

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [hasEntered, isMenuOpen]);

  useEffect(() => {
    if (!hasEntered) return;

    const onResize = () => {
      if (window.innerWidth > 760) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [hasEntered]);

  useEffect(() => {
    if (!hasEntered) return;
    if (!motionReady) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const gsap = gsapRef.current;
    if (!gsap) return;

    const launch = launchRef.current;
    if (!launch) return;
    let frame = 0;
    const isLowPowerDevice =
      ('deviceMemory' in navigator && Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory) <= 4) ||
      navigator.hardwareConcurrency <= 4;

    const renderTopology = () => {
      if (document.hidden) return;
      if (window.scrollY > window.innerHeight * 1.12) return;
      frame += 1;
      const frameDivisor = window.innerWidth <= 760 ? (isLowPowerDevice ? 4 : 3) : isLowPowerDevice ? 3 : 2;
      if (frame % frameDivisor !== 0) return;

      const screen = window.innerWidth;
      const quality = isLowPowerDevice ? 0.88 : 1;
      const intensity = (screen <= 760 ? 0.52 : screen <= 1080 ? 0.76 : 1) * quality;
      const t = performance.now() * 0.0012;

      contourPathRefs.current.forEach((path, index) => {
        if (!path) return;
        path.setAttribute('d', buildContourPath(t + index * 0.24, index, 1400, 900, intensity));
      });

      orbitPathRefs.current.forEach((path, index) => {
        if (!path) return;
        path.setAttribute('d', buildOrbitPath(t + index * 0.17, index, 1400, 900, intensity));
      });

      facetPathRefs.current.forEach((path, index) => {
        if (!path) return;
        path.setAttribute('d', buildFacetPath(t + index * 0.39, index, 1400, 900, intensity));
      });
    };

    const lens = launchLensRef.current;
    const lensX = lens ? gsap.quickTo(lens, 'x', { duration: 0.54, ease: 'power3.out' }) : null;
    const lensY = lens ? gsap.quickTo(lens, 'y', { duration: 0.54, ease: 'power3.out' }) : null;

    const onPointerMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;

      launch.style.setProperty('--launch-mx', (nx * 2).toFixed(3));
      launch.style.setProperty('--launch-my', (ny * 2).toFixed(3));

      lensX?.(nx * 180);
      lensY?.(ny * 128);
    };
    const hasFinePointer = window.matchMedia('(pointer:fine)').matches;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1081px)', () => {
      gsap.to('.launch-fx__moire--a', {
        rotate: 360,
        duration: 64,
        repeat: -1,
        ease: 'none',
      });
      gsap.to('.launch-fx__moire--b', {
        rotate: -360,
        duration: 86,
        repeat: -1,
        ease: 'none',
      });
      gsap.to('.launch-fx__scan', {
        yPercent: 146,
        duration: 5.6,
        repeat: -1,
        ease: 'none',
      });
    });

    mm.add('(max-width: 1080px)', () => {
      gsap.to('.launch-fx__moire--a', {
        rotate: 360,
        duration: 78,
        repeat: -1,
        ease: 'none',
      });
      gsap.to('.launch-fx__moire--b', {
        rotate: -360,
        duration: 102,
        repeat: -1,
        ease: 'none',
      });
      gsap.to('.launch-fx__scan', {
        yPercent: 128,
        duration: 6.8,
        repeat: -1,
        ease: 'none',
      });
    });

    gsap.to('.launch-fx', {
      opacity: 0,
      filter: 'blur(18px)',
      ease: 'none',
      scrollTrigger: {
        trigger: siteRef.current,
        start: 'top top',
        end: 'top+=100% top',
        scrub: 0.9,
      },
    });

    if (hasFinePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }
    renderTopology();
    gsap.ticker.add(renderTopology);

    return () => {
      if (hasFinePointer) {
        window.removeEventListener('pointermove', onPointerMove);
      }
      gsap.ticker.remove(renderTopology);
      mm.revert();
    };
  }, [hasEntered, motionReady]);

  useEffect(() => {
    if (!hasEntered) return;

    let rafId = 0;
    const onScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const y = window.scrollY;
        const nextHeaderSolid = window.innerWidth <= 760 || y > 40;
        const nextFloating = y > 720;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress = pageHeight > 0 ? Math.min(y / pageHeight, 1) : 0;
        const roundedProgress = Math.round(nextProgress * 1000) / 1000;

        setHeaderSolid((prev) => (prev === nextHeaderSolid ? prev : nextHeaderSolid));
        setShowFloatingCta((prev) => (prev === nextFloating ? prev : nextFloating));
        if (Math.abs(headerProgressValueRef.current - roundedProgress) >= 0.001) {
          headerProgressValueRef.current = roundedProgress;
          headerProgressLineRef.current?.style.setProperty('transform', `scaleX(${roundedProgress})`);
        }
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, [hasEntered]);

  useEffect(() => {
    if (!hasEntered) return;
    if (!window.matchMedia('(pointer:fine)').matches) return;
    setCursorEnabled(true);
  }, [hasEntered]);

  useEffect(() => {
    if (!hasEntered) return;
    if (!motionReady) return;
    if (!cursorEnabled || !cursorDotRef.current || !cursorRingRef.current) return;
    const gsap = gsapRef.current;
    if (!gsap) return;

    const dotX = gsap.quickTo(cursorDotRef.current, 'x', { duration: 0.08, ease: 'power3.out' });
    const dotY = gsap.quickTo(cursorDotRef.current, 'y', { duration: 0.08, ease: 'power3.out' });
    const ringX = gsap.quickTo(cursorRingRef.current, 'x', { duration: 0.24, ease: 'power3.out' });
    const ringY = gsap.quickTo(cursorRingRef.current, 'y', { duration: 0.24, ease: 'power3.out' });

    const onMove = (event: MouseEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const onHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setCursorActive(Boolean(target.closest('a,button,.interactive')));
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onHover);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onHover);
    };
  }, [cursorEnabled, hasEntered, motionReady]);

  useEffect(() => {
    if (!hasEntered) return;

    let rafId = 0;
    let lastX = 0;
    let lastY = 0;
    const onMove = (event: PointerEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        siteRef.current?.style.setProperty('--pointer-x', `${lastX}px`);
        siteRef.current?.style.setProperty('--pointer-y', `${lastY}px`);
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, [hasEntered]);

  useEffect(() => {
    if (!hasEntered) return;
    if (!motionReady) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const gsap = gsapRef.current;
    const ScrollTrigger = scrollTriggerRef.current;
    if (!gsap || !ScrollTrigger) return;

    const ctx = gsap.context(() => {
      const introTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTimeline
        .from('.site-header .brand', { y: -24, autoAlpha: 0, duration: 0.6 })
        .from(
          '.site-header .nav a',
          { y: -16, autoAlpha: 0, stagger: 0.06, duration: 0.45 },
          '-=0.36'
        )
        .from('.site-header .header-cta', { y: -16, autoAlpha: 0, duration: 0.45 }, '-=0.3')
        .from('.hero-eyebrow', { y: 24, autoAlpha: 0, duration: 0.55 }, '-=0.2')
        .from(
          '.hero-title-line',
          { y: 44, autoAlpha: 0, stagger: 0.08, duration: 0.68 },
          '-=0.32'
        )
        .from('.hero-lead', { y: 22, autoAlpha: 0, duration: 0.55 }, '-=0.42')
        .from('.hero-actions .btn', { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.45 }, '-=0.34')
        .from('.launch-fx', { autoAlpha: 0, duration: 0.72 }, '-=0.62')
        .from('.hero-trust__item', { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.42 }, '-=0.3')
        .from('.hero-counters .counter-card', { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.42 }, '-=0.3')
        .from('.hero-panel', { x: 28, autoAlpha: 0, duration: 0.7 }, '-=0.6');

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element, index) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index % 3 === 0 ? 0 : 0.05,
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
            },
          }
        );
      });

      gsap.fromTo(
        '.header-progress__line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.1, ease: 'power2.out' }
      );

      gsap.to('.hero-panel__radar span', {
        scale: 1.32,
        opacity: 0,
        duration: 2.6,
        ease: 'none',
        repeat: -1,
        stagger: 0.8,
      });

      gsap.to('.hero-orb--one', {
        yPercent: -22,
        scrollTrigger: {
          trigger: '#top',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.hero-orb--two', {
        yPercent: -16,
        xPercent: -8,
        scrollTrigger: {
          trigger: '#top',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.hero-orb--three', {
        yPercent: -30,
        xPercent: 6,
        scrollTrigger: {
          trigger: '#top',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((counter) => {
        const target = Number(counter.dataset.count ?? '0');
        const decimals = Number(counter.dataset.decimals ?? '0');
        const suffix = counter.dataset.suffix ?? '';
        const value = { current: 0 };

        counter.textContent = formatCount(0, decimals, suffix);

        ScrollTrigger.create({
          trigger: counter,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(value, {
              current: target,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: () => {
                counter.textContent = formatCount(value.current, decimals, suffix);
              },
            });
          },
        });
      });

      processSteps.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: `#process-step-${index}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    }, siteRef);

    return () => ctx.revert();
  }, [hasEntered, motionReady]);

  const activeChannelData = channelContent[activeChannel];
  const activeChannelUi = channelUiMeta[activeChannel];
  const currentYear = new Date().getFullYear();

  const submitLeadForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
    event.currentTarget.reset();
    window.setTimeout(() => setFormSent(false), 3200);
  };

  return (
    <div ref={siteRef} className="site-shell">
      {showIntro && (
        <div
          className={`intro-gate ${hasEntered ? 'intro-gate--exit' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Войти на сайт Ai Solution"
          onClick={enterExperience}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              enterExperience();
            }
          }}
        >
          <div className="intro-gate__center">
            <div className="intro-gate__mark" aria-hidden="true">
              <Sparkles size={28} />
            </div>
            <p className="intro-gate__name">Ai Solution</p>
            <p className="intro-gate__hint">
              <span className="intro-gate__cursor" aria-hidden="true" />
              <span>Click to Enter</span>
            </p>
          </div>
        </div>
      )}

      <div className="site-noise" aria-hidden="true" />
      {hasEntered && (
        <div ref={launchRef} className="launch-fx" aria-hidden="true">
          <div className="launch-fx__backdrop" />
          <div className="launch-fx__moire launch-fx__moire--a" />
          <div className="launch-fx__moire launch-fx__moire--b" />
          <div ref={launchLensRef} className="launch-fx__lens" />
          <svg className="launch-fx__svg" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
            {[0, 1, 2].map((layer) => (
              <path key={`contour-${layer}`} className="launch-fx__contour" ref={setContourPathRef(layer)} />
            ))}
            {[0, 1, 2, 3].map((lane) => (
              <path key={`orbit-${lane}`} className="launch-fx__orbit" ref={setOrbitPathRef(lane)} />
            ))}
            {[0, 1, 2].map((facet) => (
              <path key={`facet-${facet}`} className="launch-fx__facet" ref={setFacetPathRef(facet)} />
            ))}
          </svg>
          <div className="launch-fx__scan" />
        </div>
      )}

      <header className={`site-header ${headerSolid ? 'site-header--solid' : ''}`}>
        <div className="container header-inner">
          <a className="brand interactive" href="#top">
            <Sparkles size={18} />
            <span>aisolution</span>
          </a>

          <nav id={navigationId} className={`nav ${isMenuOpen ? 'nav--open' : ''}`}>
            {navigation.map((item) => (
              <a
                className="interactive"
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a className="btn btn--ghost interactive header-cta" href="#contact">
            Бесплатный аудит
            <ArrowUpRight size={16} />
          </a>

          <button
            type="button"
            aria-label="Открыть меню"
            aria-expanded={isMenuOpen}
            aria-controls={navigationId}
            className="menu-toggle interactive"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="header-progress" aria-hidden="true">
          <span ref={headerProgressLineRef} className="header-progress__line" />
        </div>
      </header>

      <main>
        <section id="top" className="hero section">
          <div className="hero-orb hero-orb--one" aria-hidden="true" />
          <div className="hero-orb hero-orb--two" aria-hidden="true" />
          <div className="hero-orb hero-orb--three" aria-hidden="true" />

          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow hero-eyebrow">AI SOLUTIONS FOR BUSINESS GROWTH</span>
              <h1>
                <span className="hero-title-line">
                  Премиальные AI-решения для автоматизации, внедрения и разработки
                </span>
                <span className="hero-title-line">цифровых продуктов enterprise-уровня</span>
              </h1>
              <p className="hero-lead">
                Реализуем полный цикл: аналитика, архитектура, разработка, интеграции и сопровождение.
                Запускаем AI-менеджера для Telegram, Instagram и WhatsApp, чтобы лиды не терялись и
                бизнес получал управляемый рост.
              </p>

              <div className="hero-actions">
                <a className="btn btn--primary interactive" href="#contact">
                  Запланировать внедрение
                  <ArrowRight size={16} />
                </a>
                <a className="btn btn--secondary interactive" href="#cases">
                  Смотреть кейсы
                </a>
              </div>

              <div className="hero-trust" data-reveal>
                <div className="hero-trust__item">
                  <Building2 size={16} />
                  <span>Формат для владельцев и CEO</span>
                </div>
                <div className="hero-trust__item">
                  <ShieldCheck size={16} />
                  <span>Безопасность и NDA по проекту</span>
                </div>
                <div className="hero-trust__item">
                  <Target size={16} />
                  <span>KPI и roadmap с первого этапа</span>
                </div>
              </div>

              <div className="hero-counters">
                {counters.map((counter) => (
                  <article key={counter.label} className="counter-card">
                    <span
                      data-count={counter.value}
                      data-suffix={counter.suffix}
                      data-decimals={counter.decimals ?? 0}
                      className="counter-value"
                    >
                      0
                    </span>
                    <p>{counter.label}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="hero-panel interactive" data-reveal>
              <div className="hero-panel__radar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className="hero-panel__head">
                <div>
                  <h2>Единый центр управления заявками</h2>
                  <p>Интеграции, аналитика и AI-диалоги в одной системе.</p>
                </div>
                <LayoutDashboard size={24} />
              </div>

              <div className="hero-panel__flow">
                <div>
                  <Send size={18} />
                  <span>Telegram</span>
                </div>
                <div>
                  <Instagram size={18} />
                  <span>Instagram</span>
                </div>
                <div>
                  <MessageCircle size={18} />
                  <span>WhatsApp</span>
                </div>
                <div>
                  <ChartColumnIncreasing size={18} />
                  <span>CRM + BI</span>
                </div>
              </div>

              <div className="hero-panel__signals">
                <p>
                  <ShieldCheck size={16} />
                  SLA ответов: до 10 секунд
                </p>
                <p>
                  <BrainCircuit size={16} />
                  AI-квалификация: автооценка лида и intent
                </p>
                <p>
                  <Rocket size={16} />
                  Пилот: запуск в течение 5-10 рабочих дней
                </p>
              </div>

              <div className="hero-panel__meta">
                <div>
                  <span>Статус внедрения</span>
                  <strong>Под ключ</strong>
                </div>
                <div>
                  <span>Точность маршрутизации лида</span>
                  <strong>до 96%</strong>
                </div>
                <div>
                  <span>Средний ROI</span>
                  <strong>2-4 мес</strong>
                </div>
              </div>
            </aside>
          </div>

          <a href="#services" className="scroll-hint interactive">
            <span>Прокрутить к решениям</span>
            <ChevronDown size={18} />
          </a>
        </section>

        <section className="trust-strip section--compact">
          <div className="ticker">
            <div className="ticker-track">
              {[...partnerLine, ...partnerLine].map((name, index) => (
                <span key={`${name}-${index}`}>{name}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">SERVICES</p>
              <h2>Решения под владельцев компаний, CEO и коммерческие команды</h2>
              <p>
                Фокус на бизнес-результате: рост выручки, контроль воронки и снижение операционной
                нагрузки на команду.
              </p>
            </div>

            <div className="services-grid">
              {serviceCards.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section id="manager" className="section manager-section">
          <div className="container manager-wrap">
            <div className="manager-heading" data-reveal>
              <p className="eyebrow">AI MANAGER</p>
              <h2>Топ-решение: AI-менеджер для Telegram, Instagram и WhatsApp</h2>
              <p>
                Управляйте качеством коммуникации в реальном времени и масштабируйте отдел продаж без
                хаоса.
              </p>
            </div>

            <div className="manager-tabs" data-reveal>
              {channelTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    className={`interactive ${activeChannel === tab.key ? 'is-active' : ''}`}
                    onClick={() => setActiveChannel(tab.key)}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="manager-grid">
              <ManagerChatCard
                channelKey={activeChannel}
                channelData={activeChannelData}
                channelUi={activeChannelUi}
                hasEntered={hasEntered}
              />

              <aside className="manager-kpi" data-reveal>
                <div>
                  <span>Конверсия в целевой диалог</span>
                  <strong>{activeChannelData.conversion}</strong>
                </div>
                <div>
                  <span>Среднее время ответа</span>
                  <strong>{activeChannelData.response}</strong>
                </div>
                <div>
                  <span>Автоматизация типовых запросов</span>
                  <strong>{activeChannelData.automation}</strong>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="process" className="section process-section">
          <div className="container process-layout">
            <aside className="process-summary interactive" data-reveal>
              <p className="eyebrow">IMPLEMENTATION FLOW</p>
              <h2>Прозрачный процесс внедрения с бизнес-контролем</h2>
              <p>
                Каждый этап фиксируется по срокам, deliverables и KPI. Вы видите, за что платите и какой
                результат получаете.
              </p>

              <div className="progress-track" aria-hidden="true">
                <span
                  className="progress-fill"
                  style={{
                    transform: `scaleY(${(activeStep + 1) / processSteps.length})`,
                  }}
                />
              </div>

              <div className="process-index">
                Этап {activeStep + 1} из {processSteps.length}
              </div>
            </aside>

            <div className="process-steps">
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  id={`process-step-${index}`}
                  className={`process-step interactive ${activeStep === index ? 'is-active' : ''}`}
                  data-reveal
                >
                  <div className="process-step__top">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <Clock3 size={16} />
                    <small>{step.duration}</small>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="process-deliverable">
                    <Target size={15} />
                    <span>{step.deliverable}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cases" className="section cases-section">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">CASE STUDIES</p>
              <h2>Кейсы с измеримыми показателями бизнеса</h2>
              <p>Показываем не обещания, а конкретные результаты внедрения и роста.</p>
            </div>

            <div className="cases-grid">
              {caseStudies.map((item) => (
                <article key={item.company} className="case-card interactive" data-reveal>
                  <header>
                    <span>{item.segment}</span>
                    <h3>{item.company}</h3>
                  </header>
                  <p>{item.challenge}</p>
                  <strong>{item.result}</strong>
                  <ul>
                    {item.metrics.map((metric) => (
                      <li key={metric}>
                        <CheckCircle2 size={15} />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-layout">
            <div className="faq-panel" data-reveal>
              <p className="eyebrow">FAQ</p>
              <h2>Частые вопросы перед стартом проекта</h2>

              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question} className="interactive">
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="lead-form-wrap interactive" data-reveal>
              <p className="eyebrow">GET IN TOUCH</p>
              <h2>Запланировать запуск и получить дорожную карту</h2>
              <p>
                Оставьте контакт. Мы свяжемся, соберем требования и подготовим реалистичный план внедрения.
              </p>

              <form onSubmit={submitLeadForm} className="lead-form">
                <div className="lead-form__row">
                  <label>
                    <span>Имя</span>
                    <input required name="name" type="text" placeholder="Иван" />
                  </label>
                  <label>
                    <span>Должность</span>
                    <input required name="role" type="text" placeholder="CEO / COO / Руководитель отдела" />
                  </label>
                </div>

                <div className="lead-form__row">
                  <label>
                    <span>Компания</span>
                    <input required name="company" type="text" placeholder="Название компании" />
                  </label>
                  <label>
                    <span>Сайт компании</span>
                    <input name="website" type="url" placeholder="https://company.com" />
                  </label>
                </div>

                <div className="lead-form__row">
                  <label>
                    <span>Корпоративный email</span>
                    <input required name="email" type="email" placeholder="name@company.com" />
                  </label>
                  <label>
                    <span>Контакт (Telegram / WhatsApp / Телефон)</span>
                    <input required name="contact" type="text" placeholder="@username или +7 ..." />
                  </label>
                </div>

                <div className="lead-form__row">
                  <label>
                    <span>Отрасль</span>
                    <select name="industry" required defaultValue="">
                      <option value="" disabled>
                        Выберите отрасль
                      </option>
                      <option value="retail">Retail / E-commerce</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance / FinTech</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="services">Профессиональные услуги</option>
                      <option value="other">Другое</option>
                    </select>
                  </label>
                  <label>
                    <span>Размер компании</span>
                    <select name="teamSize" required defaultValue="">
                      <option value="" disabled>
                        Количество сотрудников
                      </option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </label>
                </div>

                <div className="lead-form__row">
                  <label>
                    <span>Планируемый бюджет проекта</span>
                    <select name="budget" required defaultValue="">
                      <option value="" disabled>
                        Выберите диапазон
                      </option>
                      <option value="10-25k">$10k - $25k</option>
                      <option value="25-50k">$25k - $50k</option>
                      <option value="50-100k">$50k - $100k</option>
                      <option value="100k+">$100k+</option>
                    </select>
                  </label>
                  <label>
                    <span>Желаемый срок запуска</span>
                    <select name="timeline" required defaultValue="">
                      <option value="" disabled>
                        Выберите срок
                      </option>
                      <option value="2-4weeks">2-4 недели</option>
                      <option value="1-2months">1-2 месяца</option>
                      <option value="3months+">3+ месяцев</option>
                    </select>
                  </label>
                </div>

                <fieldset className="lead-form__field">
                  <legend>Ключевые каналы и направления</legend>
                  <div className="lead-form__checks">
                    <label className="lead-form__check">
                      <input type="checkbox" name="channels" value="telegram" />
                      <span>Telegram</span>
                    </label>
                    <label className="lead-form__check">
                      <input type="checkbox" name="channels" value="instagram" />
                      <span>Instagram</span>
                    </label>
                    <label className="lead-form__check">
                      <input type="checkbox" name="channels" value="whatsapp" />
                      <span>WhatsApp</span>
                    </label>
                    <label className="lead-form__check">
                      <input type="checkbox" name="channels" value="website-app" />
                      <span>Сайт / приложение</span>
                    </label>
                    <label className="lead-form__check">
                      <input type="checkbox" name="channels" value="crm-integration" />
                      <span>CRM интеграции</span>
                    </label>
                    <label className="lead-form__check">
                      <input type="checkbox" name="channels" value="full-cycle" />
                      <span>Full-cycle внедрение</span>
                    </label>
                  </div>
                </fieldset>

                <label>
                  <span>Бизнес-цели и контекст задачи</span>
                  <textarea
                    required
                    name="task"
                    rows={5}
                    placeholder="Опишите текущий процесс, ключевые ограничения и целевые KPI проекта"
                  />
                </label>

                <label className="lead-form__consent">
                  <input required type="checkbox" name="consent" />
                  <span>
                    Подтверждаю согласие на обработку данных и принимаю условия конфиденциальности.
                  </span>
                </label>

                <button className="btn btn--primary interactive" type="submit">
                  Отправить заявку
                  <ArrowRight size={16} />
                </button>

                {formSent && (
                  <div className="form-success" role="status">
                    <CheckCircle2 size={16} />
                    <span>Заявка принята. Мы свяжемся с вами в ближайшее время.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <a className="brand interactive" href="#top">
              <Sparkles size={18} />
              <span>aisolution</span>
            </a>
            <p>Автоматизация, внедрение ИИ и разработка под ключ для бизнеса.</p>
          </div>

          <div className="footer-links">
            <a href="#services" className="interactive">
              Услуги
            </a>
            <a href="#manager" className="interactive">
              ИИ-менеджер
            </a>
            <a href="#cases" className="interactive">
              Кейсы
            </a>
            <a href="#contact" className="interactive">
              Контакты
            </a>
          </div>

          <small>© {currentYear} aisolution. Все права защищены.</small>
        </div>
      </footer>

      {showFloatingCta && (
        <a href="#contact" className="floating-cta interactive" aria-label="Открыть форму заявки">
          <MessageCircle size={20} />
          <span>Старт проекта</span>
        </a>
      )}

      {cursorEnabled && (
        <>
          <div ref={cursorRingRef} className={`cursor cursor--ring ${cursorActive ? 'is-active' : ''}`} />
          <div ref={cursorDotRef} className={`cursor cursor--dot ${cursorActive ? 'is-active' : ''}`} />
        </>
      )}
    </div>
  );
}


