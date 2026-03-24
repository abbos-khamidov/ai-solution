/**
 * One-off merge: socialProof.testimonialsBlock + socialProof.segmentData
 * Run: node scripts/inject-social-proof-locales.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const testimonialsBlockRu = {
  title: 'Что говорят клиенты',
  casesLabel: 'Кейсы по сегментам',
  items: [
    {
      role: 'Директор, цветочный бизнес',
      company: 'FloraNet',
      initial: 'Д',
      text: 'Раньше теряли заявки ночью. Сейчас бот отвечает за 30 секунд, клиент получает прайс и записывается сам. Выручка выросла заметно.',
      impact: '+28% заявок',
      period: 'за 45 дней',
      gradient: 'from-[#F472B6] to-[#EC4899]',
    },
    {
      role: 'Руководитель учебного центра',
      company: 'SmartEdu',
      initial: 'Р',
      text: 'Администратор больше не тратит 4 часа на одинаковые вопросы. Бот отвечает, квалифицирует и передаёт готового клиента.',
      impact: '-4 ч/день рутины',
      period: 'с первой недели',
      gradient: 'from-[#38BDF8] to-[#06B6D4]',
    },
    {
      role: 'Операционный директор, клиника',
      company: 'MediPlus',
      initial: 'О',
      text: 'Запись на приём через бот — пациенты довольны, врачи не отвлекаются. Внедрили за 2 недели.',
      impact: '+32% онлайн-записей',
      period: 'за 2 недели',
      gradient: 'from-[#34D399] to-[#10B981]',
    },
    {
      role: 'Владелец, IT-компания',
      company: 'NexusSoft',
      initial: 'В',
      text: 'Лиды теперь приходят уже квалифицированными. Менеджеры закрывают больше сделок за то же время.',
      impact: '+19% к закрытию',
      period: 'за 1 квартал',
      gradient: 'from-[#3B82F6] to-[#6366F1]',
    },
    {
      role: 'Директор по продажам, оптовая торговля',
      company: 'TradeHub',
      initial: 'Д',
      text: 'Думал что боты — это для больших компаний. Оказалось нет. Окупилось за первый месяц.',
      impact: 'ROI < 30 дней',
      period: 'первый месяц',
      gradient: 'from-[#A78BFA] to-[#8B5CF6]',
    },
  ],
};

const testimonialsBlockUz = {
  title: 'Mijozlar nima deydi',
  casesLabel: 'Segmentlar bo\'yicha keyslar',
  items: [
    {
      role: 'Direktor, gul biznesi',
      company: 'FloraNet',
      initial: 'D',
      text: 'Oldin tunda arizalar yo\'qolardi. Endi bot 30 soniyada javob beradi, mijoz narxni oladi va o\'zi yoziladi. Daromad sezilarli o\'sdi.',
      impact: '+28% arizalar',
      period: '45 kun ichida',
      gradient: 'from-[#F472B6] to-[#EC4899]',
    },
    {
      role: "O'quv markazi rahbari",
      company: 'SmartEdu',
      initial: 'R',
      text: 'Administrator bir xil savollarga 4 soat sarflamaydi. Bot javob beradi, saralaydi va tayyor mijozni uzatadi.',
      impact: '-4 soat/kun rutina',
      period: 'birinchi haftadan',
      gradient: 'from-[#38BDF8] to-[#06B6D4]',
    },
    {
      role: 'Operatsion direktor, klinika',
      company: 'MediPlus',
      initial: 'O',
      text: 'Qabulga yozilish bot orqali — bemorlar mamnun, shifokorlar chalg\'imaydi. 2 haftada joriy qildik.',
      impact: '+32% onlayn yozilish',
      period: '2 hafta ichida',
      gradient: 'from-[#34D399] to-[#10B981]',
    },
    {
      role: 'Egasi, IT-kompaniya',
      company: 'NexusSoft',
      initial: 'V',
      text: 'Lidlar endi allaqachon saralangan holda keladi. Menejerlar xuddi shu vaqtda ko\'proq bitim yopadi.',
      impact: '+19% yopish',
      period: '1 chorakda',
      gradient: 'from-[#3B82F6] to-[#6366F1]',
    },
    {
      role: 'Savdo bo\'yicha direktor, ulgurji savdo',
      company: 'TradeHub',
      initial: 'D',
      text: 'Botlar katta kompaniyalar uchun deb o\'ylardim. Yo\'q ekan. Birinchi oyda o\'zini qopardi.',
      impact: 'ROI < 30 kun',
      period: 'birinchi oy',
      gradient: 'from-[#A78BFA] to-[#8B5CF6]',
    },
  ],
};

const segmentDataRu = {
  small: [
    { title: 'Цветочные магазины', problem: 'заявки ночью не теряются', effect: 'больше продаж без найма менеджера', color: '#F472B6', plotX: 20, plotY: 72, impactPercent: '+18–25%', mvpWeeks: '10–14 дней' },
    { title: 'Учебные центры', problem: 'отвечает на частые вопросы', effect: 'администратор не тратит часы на переписку', color: '#38BDF8', plotX: 38, plotY: 50, impactPercent: '+15–22%', mvpWeeks: '14–21 день' },
    { title: 'Клиники', problem: 'запись и перенос визитов', effect: 'меньше пропущенных пациентов', color: '#34D399', plotX: 56, plotY: 36, impactPercent: '+25–35%', mvpWeeks: '7–12 дней' },
    { title: 'Агентства и услуги', problem: 'быстрый ответ и квалификация', effect: 'выше шанс закрытия заявки', color: '#A78BFA', plotX: 32, plotY: 64, impactPercent: '+12–20%', mvpWeeks: '14–18 дней' },
    { title: 'Онлайн-магазины', problem: 'отвечает сразу в каналах', effect: 'меньше брошенных заказов', color: '#FB923C', plotX: 48, plotY: 68, impactPercent: '+16–24%', mvpWeeks: '10–16 дней' },
  ],
  mid: [
    { title: 'Отдел продаж', problem: 'лиды распределяются, follow-up не забывается', effect: 'растёт конверсия сделок', color: '#3B82F6', plotX: 70, plotY: 30, impactPercent: '+30–45%', mvpWeeks: '21–30 дней' },
    { title: 'Учебные центры (сеть)', problem: 'единый сценарий и контроль', effect: 'меньше хаоса в филиалах', color: '#38BDF8', plotX: 50, plotY: 40, impactPercent: '+20–30%', mvpWeeks: '30–45 дней' },
    { title: 'Текстиль и опт', problem: 'заявки собираются автоматически', effect: 'менеджеры работают только с готовыми клиентами', color: '#F59E0B', plotX: 36, plotY: 58, impactPercent: '+22–35%', mvpWeeks: '18–28 дней' },
    { title: 'Сервисные компании', problem: 'порядок в каналах и аналитика', effect: 'понятно, откуда приходят деньги', color: '#64748B', plotX: 26, plotY: 46, impactPercent: '+18–28%', mvpWeeks: '21–35 дней' },
    { title: 'Консалтинг', problem: 'квалификация лидов', effect: 'менеджеры не тратят время на нецелевых', color: '#A78BFA', plotX: 58, plotY: 62, impactPercent: '+20–32%', mvpWeeks: '14–24 дня' },
  ],
  large: [
    { title: 'Руководство', problem: 'видит узкие места продаж и процессов', effect: 'решения принимаются на основе данных', color: '#06B6D4', plotX: 80, plotY: 26, impactPercent: '+35–55%', mvpWeeks: '45–60 дней' },
    { title: 'Колл-центр / админы', problem: 'снижает нагрузку и расходы на поддержку', effect: 'экономия на персонале', color: '#F472B6', plotX: 62, plotY: 38, impactPercent: '+25–40%', mvpWeeks: '30–45 дней' },
    { title: 'Производство / дистрибуция', problem: 'заявки идут в CRM/ERP', effect: 'прозрачность и контроль SLA', color: '#64748B', plotX: 44, plotY: 50, impactPercent: '+20–35%', mvpWeeks: '45–90 дней' },
    { title: 'Корпоративные знания', problem: 'сотрудники находят ответы мгновенно', effect: 'ускорение решений и меньше ошибок', color: '#34D399', plotX: 76, plotY: 46, impactPercent: '+30–50%', mvpWeeks: '60–90 дней' },
    { title: 'Сети клиник / филиалов', problem: 'единый стандарт коммуникаций', effect: 'контроль качества и аналитика по филиалам', color: '#38BDF8', plotX: 56, plotY: 64, impactPercent: '+28–42%', mvpWeeks: '45–75 дней' },
  ],
};

const segmentDataUz = {
  small: [
    { title: 'Gul do\'konlari', problem: 'tunda arizalar yo\'qolmaydi', effect: 'menejer yollamasdan ko\'proq savdo', color: '#F472B6', plotX: 20, plotY: 72, impactPercent: '+18–25%', mvpWeeks: '10–14 kun' },
    { title: "O'quv markazlari", problem: 'tez-tez beriladigan savollarga javob', effect: 'administrator xat yozishga soat sarflamaydi', color: '#38BDF8', plotX: 38, plotY: 50, impactPercent: '+15–22%', mvpWeeks: '14–21 kun' },
    { title: 'Klinikalar', problem: 'qabul va vizitni ko\'chirish', effect: 'kamroq bemor o\'tkazib yuboriladi', color: '#34D399', plotX: 56, plotY: 36, impactPercent: '+25–35%', mvpWeeks: '7–12 kun' },
    { title: 'Agentliklar va xizmatlar', problem: 'tez javob va saralash', effect: 'arizani yopish ehtimoli yuqori', color: '#A78BFA', plotX: 32, plotY: 64, impactPercent: '+12–20%', mvpWeeks: '14–18 kun' },
    { title: 'Onlayn-do\'konlar', problem: 'kanallarda darhol javob', effect: 'kamroq tashlab ketilgan buyurtma', color: '#FB923C', plotX: 48, plotY: 68, impactPercent: '+16–24%', mvpWeeks: '10–16 kun' },
  ],
  mid: [
    { title: 'Savdo bo\'limi', problem: 'lidlar taqsimlanadi, eslab qolinish unutilmaydi', effect: 'bitim konversiyasi o\'sadi', color: '#3B82F6', plotX: 70, plotY: 30, impactPercent: '+30–45%', mvpWeeks: '21–30 kun' },
    { title: "O'quv markazlari (tarmoq)", problem: 'yagona ssenariy va nazorat', effect: 'filiallarda kamroq tartibsizlik', color: '#38BDF8', plotX: 50, plotY: 40, impactPercent: '+20–30%', mvpWeeks: '30–45 kun' },
    { title: "To'qimachilik va opt", problem: 'arizalar avtomatik yig\'iladi', effect: 'menejerlar faqat tayyor mijoz bilan ishlaydi', color: '#F59E0B', plotX: 36, plotY: 58, impactPercent: '+22–35%', mvpWeeks: '18–28 kun' },
    { title: 'Servis kompaniyalari', problem: 'kanallarda tartib va tahlil', effect: 'pul qayerdan kelishi aniq', color: '#64748B', plotX: 26, plotY: 46, impactPercent: '+18–28%', mvpWeeks: '21–35 kun' },
    { title: 'Konsalting', problem: 'lidlar saralanadi', effect: 'menejerlar noto\'g\'ri mijozga vaqt sarflamaydi', color: '#A78BFA', plotX: 58, plotY: 62, impactPercent: '+20–32%', mvpWeeks: '14–24 kun' },
  ],
  large: [
    { title: 'Rahbariyat', problem: 'savdo va jarayonlardagi tor joylarni ko\'radi', effect: 'qarorlar ma\'lumot asosida', color: '#06B6D4', plotX: 80, plotY: 26, impactPercent: '+35–55%', mvpWeeks: '45–60 kun' },
    { title: 'Call-markaz / adminlar', problem: 'yuk va qo\'llab-quvvatlash xarajatini kamaytiradi', effect: 'kadrlarda tejash', color: '#F472B6', plotX: 62, plotY: 38, impactPercent: '+25–40%', mvpWeeks: '30–45 kun' },
    { title: 'Ishlab chiqarish / distribyutsiya', problem: 'arizalar CRM/ERPga ketadi', effect: 'shaffoflik va SLA nazorati', color: '#64748B', plotX: 44, plotY: 50, impactPercent: '+20–35%', mvpWeeks: '45–90 kun' },
    { title: 'Korporativ bilimlar', problem: 'xodimlar javobni darhol topadi', effect: 'qarorlar tezroq, xatolar kamroq', color: '#34D399', plotX: 76, plotY: 46, impactPercent: '+30–50%', mvpWeeks: '60–90 kun' },
    { title: 'Klinika tarmoqlari / filiallar', problem: 'yagona aloqa standarti', effect: 'sifat nazorati va filiallar bo\'yicha tahlil', color: '#38BDF8', plotX: 56, plotY: 64, impactPercent: '+28–42%', mvpWeeks: '45–75 kun' },
  ],
};

function patch(lang, testimonialsBlock, segmentData) {
  const file = path.join(root, 'locales', `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.socialProof = data.socialProof || {};
  data.socialProof.testimonialsBlock = testimonialsBlock;
  data.socialProof.segmentData = segmentData;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('Patched', file);
}

patch('ru', testimonialsBlockRu, segmentDataRu);
patch('uz', testimonialsBlockUz, segmentDataUz);
