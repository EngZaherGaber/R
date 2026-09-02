import { SkillCategory } from '../models/portfolio.model';

/**
 * Skills are grouped by what they are used for and every entry names the
 * projects where it was actually used. No levels, no percentages, no adjectives.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'core',
    title: { en: 'Core Engineering', ar: 'الأساس الهندسي' },
    description: {
      en: 'The layer I have spent the most years in — where application structure is decided.',
      ar: 'الطبقة التي أمضيت فيها أطول سنواتي، وفيها تُتخذ قرارات بنية التطبيق.',
    },
    icon: 'bi bi-code-square',
    skills: [
      {
        id: 'angular',
        name: 'Angular',
        note: {
          en: 'Every production system on this page has an Angular frontend I built or re-architected.',
          ar: 'كل نظام إنتاجي في هذه الصفحة له واجهة Angular بنيتها أو أعدت هندستها.',
        },
        projectIds: ['nasaq', 'mandoob', 'tli', 'workflow', 'school', 'undp'],
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        note: {
          en: 'Typed domain models shared between applications, so a contract change breaks at build time.',
          ar: 'نماذج نطاق منمّطة مشتركة بين التطبيقات، فيظهر أي تغيّر في العقد وقت البناء.',
        },
        projectIds: ['nasaq', 'mandoob', 'school', 'tli'],
      },
      {
        id: 'rxjs',
        name: 'RxJS',
        note: {
          en: 'Async data flow in data-heavy screens and live back-office state.',
          ar: 'تدفق البيانات غير المتزامن في الشاشات كثيفة البيانات وحالة المكتب الحية.',
        },
        projectIds: ['mandoob', 'tli', 'workflow', 'undp'],
      },
      {
        id: 'state',
        name: 'State architecture (NgRx / Signals)',
        note: {
          en: 'Predictable state for enterprise screens; signals for newer work.',
          ar: 'حالة يمكن التنبؤ بها للشاشات المؤسسية، وSignals في الأعمال الأحدث.',
        },
        projectIds: ['tli', 'workflow', 'nasaq'],
      },
      {
        id: 'forms',
        name: 'Reactive & dynamic forms',
        note: {
          en: 'Validation carried in the model, and forms generated from typed configuration.',
          ar: 'تحقق محمول في النموذج، ونماذج تُولَّد من إعدادات منمّطة.',
        },
        projectIds: ['workflow', 'undp', 'nasaq'],
      },
      {
        id: 'components',
        name: 'Component architecture',
        note: {
          en: 'Reusable layers for tables, filters and forms instead of per-screen duplication.',
          ar: 'طبقات قابلة لإعادة الاستخدام للجداول والمرشحات والنماذج بدل التكرار لكل شاشة.',
        },
        projectIds: ['tli', 'workflow', 'nasaq', 'school'],
      },
    ],
  },
  {
    id: 'platform',
    title: { en: 'Full-Stack & Platform', ar: 'المنصة والـ Full-Stack' },
    description: {
      en: 'Where my work moved from implementing a frontend to owning a system.',
      ar: 'حيث انتقل عملي من تنفيذ واجهة إلى امتلاك نظام كامل.',
    },
    icon: 'bi bi-hdd-network',
    skills: [
      {
        id: 'nx',
        name: 'Nx',
        note: {
          en: 'Domain-oriented library boundaries across multi-application workspaces.',
          ar: 'حدود مكتبات منظّمة حسب النطاق عبر مساحات عمل متعددة التطبيقات.',
        },
        projectIds: ['nasaq', 'school'],
      },
      {
        id: 'nestjs',
        name: 'NestJS',
        note: {
          en: 'The domain API behind Nasaq: modules, guards, and enforced tenancy.',
          ar: 'واجهة النطاق خلف نَسَق: وحدات وحُرّاس وعزل مستأجرين مفروض.',
        },
        projectIds: ['nasaq'],
      },
      {
        id: 'postgres',
        name: 'PostgreSQL',
        note: {
          en: 'Relational modelling for clinical, scheduling and billing data.',
          ar: 'نمذجة علائقية لبيانات السجلات السريرية والمواعيد والفوترة.',
        },
        projectIds: ['nasaq'],
      },
      {
        id: 'prisma',
        name: 'Prisma',
        note: {
          en: 'Typed data access, with tenant scoping applied at this layer.',
          ar: 'وصول منمّط إلى البيانات، مع تطبيق نطاق المستأجر في هذه الطبقة.',
        },
        projectIds: ['nasaq'],
      },
      {
        id: 'apis',
        name: 'REST API design',
        note: {
          en: 'Contracts shared by a web app, a mobile app and an admin console.',
          ar: 'عقود مشتركة بين تطبيق ويب وتطبيق موبايل ولوحة إدارة.',
        },
        projectIds: ['nasaq', 'mandoob'],
      },
      {
        id: 'authz',
        name: 'Authentication & authorization',
        note: {
          en: 'Refresh-token rotation, role and permission checks enforced server-side.',
          ar: 'تدوير رمز التجديد، وتحقق من الأدوار والصلاحيات مفروض على الخادم.',
        },
        projectIds: ['nasaq', 'tli'],
      },
    ],
  },
  {
    id: 'mobile',
    title: { en: 'Mobile', ar: 'الموبايل' },
    description: {
      en: 'Shipped Android work, not a checkbox — including a platform used in the field.',
      ar: 'عمل أندرويد مُسلَّم فعلاً، لا مجرد بند — منه منصة تُستخدم في الميدان.',
    },
    icon: 'bi bi-phone',
    skills: [
      {
        id: 'ionic',
        name: 'Ionic',
        note: {
          en: 'Mobile applications sharing a domain layer with their web counterpart.',
          ar: 'تطبيقات موبايل تشارك طبقة النطاق مع نظيرها على الويب.',
        },
        projectIds: ['nasaq', 'mandoob'],
      },
      {
        id: 'capacitor',
        name: 'Capacitor',
        note: {
          en: 'Native bridge and Android packaging for the Mandoob field application.',
          ar: 'الجسر الأصلي وتغليف أندرويد لتطبيق مندوب الميداني.',
        },
        projectIds: ['mandoob'],
      },
      {
        id: 'android',
        name: 'Android delivery',
        note: {
          en: 'Building and shipping an Android build for representatives in the field.',
          ar: 'بناء وتسليم نسخة أندرويد للمندوبين في الميدان.',
        },
        projectIds: ['mandoob'],
      },
      {
        id: 'responsive',
        name: 'Responsive architecture',
        note: {
          en: 'Layouts that hold up from a mid-range phone to a wide operations screen.',
          ar: 'تخطيطات تصمد من هاتف متوسط إلى شاشة تشغيل عريضة.',
        },
        projectIds: ['nasaq', 'mandoob', 'huelle'],
      },
    ],
  },
  {
    id: 'enterprise-ui',
    title: { en: 'Enterprise UI', ar: 'واجهات مؤسسية' },
    description: {
      en: 'Dense data, long forms, two languages, two writing directions.',
      ar: 'بيانات كثيفة، ونماذج طويلة، ولغتان، واتجاهان للكتابة.',
    },
    icon: 'bi bi-table',
    skills: [
      {
        id: 'primeng',
        name: 'PrimeNG',
        note: {
          en: 'Tables, filters, charts and dialogs across operations systems.',
          ar: 'جداول ومرشحات ومخططات وحوارات عبر أنظمة تشغيلية.',
        },
        projectIds: ['tli', 'mandoob', 'nasaq', 'school'],
      },
      {
        id: 'material',
        name: 'Angular Material',
        note: {
          en: 'Accessible component base for HR workflows.',
          ar: 'أساس مكوّنات ميسور الوصول لمسارات الموارد البشرية.',
        },
        projectIds: ['undp'],
      },
      {
        id: 'design-systems',
        name: 'Design tokens & systems',
        note: {
          en: 'One token set feeding Angular, PrimeNG and Ionic rendering layers.',
          ar: 'مجموعة رموز واحدة تغذّي طبقات العرض في Angular وPrimeNG وIonic.',
        },
        projectIds: ['nasaq'],
      },
      {
        id: 'i18n',
        name: 'Arabic / English & RTL',
        note: {
          en: 'Genuine bilingual UIs where layout, icons and flow mirror correctly.',
          ar: 'واجهات ثنائية اللغة حقيقية ينعكس فيها التخطيط والأيقونات والمسار بشكل صحيح.',
        },
        projectIds: ['nasaq', 'undp'],
      },
      {
        id: 'a11y',
        name: 'Accessibility',
        note: {
          en: 'Semantic markup, keyboard paths, visible focus and reduced-motion support.',
          ar: 'بنية دلالية، ومسارات لوحة مفاتيح، وتركيز مرئي، ودعم تقليل الحركة.',
        },
        projectIds: ['undp', 'nasaq'],
      },
      {
        id: 'scss',
        name: 'SCSS & Tailwind',
        note: {
          en: 'Custom styling systems; Tailwind where a project already used it.',
          ar: 'أنظمة تنسيق مخصّصة، وTailwind حيث كان المشروع يستخدمه أصلاً.',
        },
        projectIds: ['nasaq', 'huelle'],
      },
    ],
  },
  {
    id: 'commerce',
    title: { en: 'Commerce', ar: 'التجارة الإلكترونية' },
    description: {
      en: 'Client-facing storefront work, kept separate from the systems work above.',
      ar: 'عمل متاجر موجّه للعملاء، مفصول عن العمل النظمي أعلاه.',
    },
    icon: 'bi bi-bag',
    skills: [
      {
        id: 'shopify',
        name: 'Shopify',
        note: {
          en: 'Storefront customization and catalog presentation for German-market brands.',
          ar: 'تخصيص المتاجر وعرض الكتالوج لعلامات في السوق الألمانية.',
        },
        projectIds: ['huelle', 'phoneparts', 'reisekoffer'],
      },
      {
        id: 'liquid',
        name: 'Liquid',
        note: {
          en: 'Theme templating behind the storefront work.',
          ar: 'قوالب Liquid خلف عمل المتاجر.',
        },
        projectIds: ['huelle', 'phoneparts', 'reisekoffer'],
      },
      {
        id: 'commerce-ux',
        name: 'E-commerce UX',
        note: {
          en: 'Category-to-checkout paths built for mobile-first customers.',
          ar: 'مسارات من الفئة إلى الدفع مبنية لعملاء يبدأون من الهاتف.',
        },
        projectIds: ['huelle'],
      },
    ],
  },
];
