import { LocalizedList, LocalizedText } from '../models/portfolio.model';

export interface ServiceOffer {
  id: string;
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
  deliverables: LocalizedList;
  /** Proof, not promises: projects where this was actually delivered. */
  projectIds: string[];
  skillIds: string[];
}

/**
 * Kept deliberately short. Employment is the primary goal of this portfolio,
 * so this reads as a capability summary rather than a services catalogue.
 */
export const serviceOffers: ServiceOffer[] = [
  {
    id: 'enterprise-angular',
    icon: 'bi bi-window-stack',
    title: { en: 'Enterprise Angular Development', ar: 'تطوير Angular المؤسسي' },
    description: {
      en: 'Complex Angular applications: frontend architecture, dense data screens, long forms, predictable state and enterprise UI.',
      ar: 'تطبيقات Angular معقّدة: بنية الواجهات، وشاشات بيانات كثيفة، ونماذج طويلة، وحالة يمكن التنبؤ بها، وواجهات مؤسسية.',
    },
    deliverables: {
      en: ['Feature and module architecture', 'Reusable data & form layers', 'Accessible enterprise UI'],
      ar: ['بنية الميزات والوحدات', 'طبقات بيانات ونماذج قابلة لإعادة الاستخدام', 'واجهة مؤسسية ميسورة الوصول'],
    },
    projectIds: ['tli', 'workflow', 'undp'],
    skillIds: ['angular', 'forms', 'primeng'],
  },
  {
    id: 'nx-platform',
    icon: 'bi bi-hdd-network',
    title: { en: 'Full-Stack Nx Product Development', ar: 'بناء منتجات Full-Stack على Nx' },
    description: {
      en: 'Whole platforms in one workspace: domain model, NestJS API, PostgreSQL schema, and the web and mobile clients over them.',
      ar: 'منصات كاملة في مساحة عمل واحدة: نموذج النطاق، وواجهة NestJS، ومخطط PostgreSQL، وعملاء الويب والموبايل فوقها.',
    },
    deliverables: {
      en: ['Nx workspace & domain boundaries', 'API contracts and data model', 'Shared UI infrastructure'],
      ar: ['مساحة عمل Nx وحدود النطاقات', 'عقود الـ API ونموذج البيانات', 'بنية واجهات مشتركة'],
    },
    projectIds: ['nasaq', 'school'],
    skillIds: ['nx', 'nestjs', 'postgres'],
  },
  {
    id: 'angular-ionic',
    icon: 'bi bi-phone',
    title: { en: 'Angular & Ionic Product Delivery', ar: 'تسليم منتجات Angular وIonic' },
    description: {
      en: 'Responsive web plus a real Android application, sharing one domain layer so a business rule is written once.',
      ar: 'ويب متجاوب مع تطبيق أندرويد حقيقي، يتشاركان طبقة نطاق واحدة فتُكتب قاعدة العمل مرة واحدة.',
    },
    deliverables: {
      en: ['Shared web/mobile domain layer', 'Ionic + Capacitor Android build', 'Field-ready mobile UX'],
      ar: ['طبقة نطاق مشتركة بين الويب والموبايل', 'نسخة أندرويد بـ Ionic وCapacitor', 'تجربة موبايل جاهزة للميدان'],
    },
    projectIds: ['mandoob', 'nasaq'],
    skillIds: ['ionic', 'capacitor', 'android'],
  },
  {
    id: 'modernization',
    icon: 'bi bi-arrow-repeat',
    title: { en: 'Frontend Modernization', ar: 'تحديث الواجهات الأمامية' },
    description: {
      en: 'Taking over an inherited Angular application: analysing it, re-architecting it, and delivering it without stopping the business.',
      ar: 'استلام تطبيق Angular موروث: تحليله، وإعادة هندسته، وتسليمه دون إيقاف العمل.',
    },
    deliverables: {
      en: ['Architecture assessment', 'Incremental re-architecture', 'Delivered, maintainable frontend'],
      ar: ['تقييم البنية', 'إعادة هندسة تدريجية', 'واجهة مُسلَّمة وقابلة للصيانة'],
    },
    projectIds: ['tli', 'workflow'],
    skillIds: ['angular', 'components', 'state'],
  },
];

/** Commerce sits below the platform work rather than beside it. */
export const commerceCapability = {
  title: { en: 'Commerce', ar: 'التجارة الإلكترونية' },
  description: {
    en: 'Shopify storefront customization and e-commerce UX for client brands.',
    ar: 'تخصيص متاجر Shopify وتجربة تسوّق إلكتروني لعلامات العملاء.',
  },
  projectIds: ['huelle'],
};
