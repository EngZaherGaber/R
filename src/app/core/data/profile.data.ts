import { AccentColor, NavItem, Profile } from '../models/portfolio.model';

/**
 * Single source of truth for identity. Nothing here may be duplicated in
 * components, templates, index.html or SEO code - read it from this object.
 */
export const profile: Profile = {
  name: { en: 'Zaher Gaber', ar: 'زاهر جبر' },
  role: {
    en: 'Full-Stack Angular Engineer',
    ar: 'مهندس Full-Stack بخبرة أساسية في Angular',
  },
  tagline: {
    en: 'Building scalable web, mobile, and backend platforms with Nx, Angular, Ionic, NestJS, and PostgreSQL.',
    ar: 'أبني منصات ويب وموبايل وأنظمة خلفية قابلة للتوسع باستخدام Nx وAngular وIonic وNestJS وPostgreSQL.',
  },
  location: { en: 'Damascus, Syria', ar: 'دمشق، سوريا' },
  email: 'eng.zaher.gaber@gmail.com',
  phone: '+963 993 258 672',
  github: 'EngZaherGaber',
  siteUrl: 'https://zahergaber.vercel.app',
  cvPath: 'newCv.pdf',
  ogImage: 'og-image.png',
  avatar: 'Zaher.webp',

  contacts: [
    {
      id: 'email',
      label: { en: 'Email', ar: 'البريد الإلكتروني' },
      value: 'eng.zaher.gaber@gmail.com',
      href: 'mailto:eng.zaher.gaber@gmail.com',
      icon: 'bi bi-envelope',
      copyable: true,
    },
    {
      id: 'phone',
      label: { en: 'Phone', ar: 'الهاتف' },
      value: '+963 993 258 672',
      href: 'tel:+963993258672',
      icon: 'bi bi-telephone',
      copyable: true,
    },
    {
      id: 'location',
      label: { en: 'Location', ar: 'الموقع' },
      value: 'Damascus, Syria',
      display: { en: 'Damascus, Syria', ar: 'دمشق، سوريا' },
      icon: 'bi bi-geo-alt',
    },
  ],

  socials: [
    {
      id: 'github',
      label: { en: 'GitHub', ar: 'GitHub' },
      handle: 'EngZaherGaber',
      url: 'https://github.com/EngZaherGaber',
      icon: 'bi bi-github',
    },
    {
      id: 'telegram',
      label: { en: 'Telegram', ar: 'تيليغرام' },
      handle: '@ZaGa97',
      url: 'https://t.me/ZaGa97',
      icon: 'bi bi-telegram',
    },
    {
      // Configuration placeholder: set `url` once the real profile URL is known.
      // A null url keeps the link hidden instead of shipping an invented one.
      id: 'linkedin',
      label: { en: 'LinkedIn', ar: 'LinkedIn' },
      handle: '',
      url: null,
      icon: 'bi bi-linkedin',
    },
  ],

  coreStack: [
    { id: 'nx', label: 'Nx', role: { en: 'Monorepo', ar: 'مستودع موحّد' }, icon: 'icons/nx.svg' },
    { id: 'angular', label: 'Angular', role: { en: 'Web', ar: 'الويب' }, icon: 'icons/angular.svg' },
    { id: 'ionic', label: 'Ionic', role: { en: 'Mobile', ar: 'الموبايل' }, icon: 'icons/ionic.svg' },
    { id: 'nestjs', label: 'NestJS', role: { en: 'API', ar: 'واجهة API' }, icon: 'icons/nestjs.svg' },
    {
      id: 'postgres',
      label: 'PostgreSQL',
      role: { en: 'Data', ar: 'قاعدة البيانات' },
      icon: 'icons/postgresql.svg',
    },
    {
      id: 'typescript',
      label: 'TypeScript',
      role: { en: 'Language', ar: 'اللغة' },
      icon: 'icons/typescript.svg',
    },
  ],
};

/** Employment title, deliberately separate from the personal positioning. */
export const currentEmployment = {
  title: { en: 'Senior Front-End Developer', ar: 'مطوّر واجهات أمامية أول' },
  company: { en: 'IC&I', ar: 'IC&I' },
  since: { en: 'Since 15 June 2023', ar: 'منذ 15 حزيران 2023' },
};

export const accentColors: AccentColor[] = [
  { id: 'blue', label: { en: 'Blue', ar: 'أزرق' }, value: '#5b9dff' },
  { id: 'cyan', label: { en: 'Cyan', ar: 'سماوي' }, value: '#22d3ee' },
  { id: 'emerald', label: { en: 'Emerald', ar: 'زمردي' }, value: '#34d399' },
  { id: 'amber', label: { en: 'Amber', ar: 'كهرماني' }, value: '#f5b642' },
  { id: 'violet', label: { en: 'Violet', ar: 'بنفسجي' }, value: '#a78bfa' },
  { id: 'rose', label: { en: 'Rose', ar: 'وردي' }, value: '#fb7185' },
];

/**
 * Six primary destinations - readable by recruiters, not only engineers.
 * Lab work lives inside Work; recommendations live inside Experience.
 */
export const navigation: NavItem[] = [
  { id: 'home', label: { en: 'Home', ar: 'البداية' }, icon: 'bi bi-house' },
  { id: 'work', label: { en: 'Work', ar: 'الأعمال' }, icon: 'bi bi-collection' },
  { id: 'expertise', label: { en: 'Skills', ar: 'المهارات' }, icon: 'bi bi-diagram-3' },
  { id: 'experience', label: { en: 'Experience', ar: 'المسار المهني' }, icon: 'bi bi-briefcase' },
  { id: 'mindset', label: { en: 'About', ar: 'عني' }, icon: 'bi bi-lightbulb' },
  { id: 'contact', label: { en: 'Contact', ar: 'التواصل' }, icon: 'bi bi-send' },
];
