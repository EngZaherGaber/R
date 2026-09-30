import { ExperienceEntry, Recommendation } from '../models/portfolio.model';

/**
 * Dates are written as text in both languages. Nothing here is derived into a
 * "X+ years" counter, because no validated start-of-career date exists.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'ici',
    kind: 'work',
    current: true,
    title: { en: 'Senior Front-End Developer', ar: 'مطوّر واجهات أمامية أول' },
    organization: { en: 'IC&I', ar: 'IC&I' },
    period: { en: 'June 15, 2023 — Present', ar: '15 حزيران 2023 — حتى الآن' },
    summary: {
      en: 'Enterprise Angular systems: frontend architecture, modernization of inherited applications, and complex business workflows.',
      ar: 'أنظمة Angular مؤسسية: بنية الواجهات، وتحديث تطبيقات موروثة، ومسارات عمل معقّدة.',
    },
    highlights: {
      en: [
        'Re-architected inherited Angular frontends and delivered them into production (Tower Load Inventory, Workflow Automation).',
        'Built enterprise HR and operations interfaces with long forms, strict rules and multilingual requirements.',
        'Grew into solution architecture: Nx workspace boundaries, API contracts and shared UI infrastructure.',
        'Collaborated with backend and product teams across systems delivered to telecom, UN and commercial clients.',
      ],
      ar: [
        'أعدت هندسة واجهات Angular موروثة وسلّمتها إلى الإنتاج (Tower Load Inventory وأتمتة سير العمل).',
        'بنيت واجهات موارد بشرية وعمليات مؤسسية بنماذج طويلة وقواعد صارمة ومتطلبات متعددة اللغات.',
        'تطوّر دوري نحو هندسة الحلول: حدود مساحات عمل Nx، وعقود الـ API، والبنية المشتركة للواجهات.',
        'عملت مع فرق الواجهة الخلفية والمنتج على أنظمة سُلّمت لعملاء في الاتصالات والأمم المتحدة والقطاع التجاري.',
      ],
    },
    tags: ['Angular', 'Nx', 'Frontend Architecture', 'Enterprise Systems'],
    projectIds: ['tli', 'workflow', 'undp', 'nasaq'],
    testimonialIds: ['motaz-halabi', 'omar-fallouh', 'mohanad-halabi'],
  },
  {
    id: 'nasaq-founder',
    kind: 'work',
    current: true,
    title: { en: 'Founder & Full-Stack Engineer', ar: 'مؤسس ومهندس Full-Stack' },
    organization: { en: 'Nasaq — in collaboration with IC&I', ar: 'نَسَق — بالتعاون مع IC&I' },
    period: { en: 'Ongoing', ar: 'عمل مستمر' },
    summary: {
      en: 'Building a multi-tenant medical SaaS end to end, from the domain model to the Angular and Ionic clients.',
      ar: 'بناء منصة SaaS طبية متعددة المستأجرين من طرف إلى طرف، من نموذج النطاق إلى تطبيقات Angular وIonic.',
    },
    highlights: {
      en: [
        'Designed the tenancy model and enforced isolation at the data-access layer.',
        'Defined the API contracts shared by four applications in one Nx workspace.',
        'Built shared dynamic-form and data-view infrastructure used across the platform.',
      ],
      ar: [
        'صمّمت نموذج تعدد المستأجرين وفرضت العزل في طبقة الوصول إلى البيانات.',
        'حدّدت عقود الـ API المشتركة بين أربعة تطبيقات في مساحة عمل Nx واحدة.',
        'بنيت بنية مشتركة للنماذج الديناميكية وعروض البيانات تُستخدم عبر المنصة.',
      ],
    },
    tags: ['Nx', 'NestJS', 'PostgreSQL', 'Ionic', 'Product Architecture'],
    projectIds: ['nasaq'],
  },
  {
    id: 'freelance-angular',
    kind: 'freelance',
    current: true,
    title: { en: 'Freelance Front-End Developer', ar: 'مطوّر واجهات أمامية مستقل' },
    organization: { en: 'Independent', ar: 'عمل مستقل' },
    period: { en: 'Apr 2021 — Present', ar: 'نيسان 2021 — حتى الآن' },
    summary: {
      en: 'Angular applications for independent clients, from requirements through delivery.',
      ar: 'تطبيقات Angular لعملاء مستقلين، من المتطلبات حتى التسليم.',
    },
    highlights: {
      en: [
        'Direct client work from requirements through delivery.',
        'Responsive interfaces built to be handed over and maintained.',
      ],
      ar: [
        'عمل مباشر مع العملاء من المتطلبات حتى التسليم.',
        'واجهات متجاوبة مبنية لتُسلَّم وتُصان.',
      ],
    },
    tags: ['Angular', 'Client Work'],
  },
  {
    id: 'shopify-dev',
    kind: 'freelance',
    current: true,
    title: { en: 'Shopify Development', ar: 'تطوير Shopify' },
    organization: { en: '2GO Group & independent clients', ar: 'مجموعة 2GO وعملاء مستقلون' },
    period: { en: 'May 2024 — Present', ar: 'أيار 2024 — حتى الآن' },
    summary: {
      en: 'Custom Shopify themes and storefront work for German-market brands.',
      ar: 'قوالب Shopify مخصّصة وعمل على المتاجر لعلامات في السوق الألمانية.',
    },
    highlights: {
      en: ['Theme customization and storefront UX.', 'Catalog presentation and responsive buying flows.'],
      ar: ['تخصيص القوالب وتجربة المتجر.', 'عرض الكتالوج ومسارات شراء متجاوبة.'],
    },
    tags: ['Shopify', 'Liquid', 'E-commerce'],
    projectIds: ['huelle'],
    testimonialIds: ['jamal-halabi'],
  },
  {
    id: 'svu',
    kind: 'education',
    title: { en: 'Information Technology Engineering', ar: 'هندسة تقنية المعلومات' },
    organization: { en: 'Syrian Virtual University', ar: 'الجامعة الافتراضية السورية' },
    period: { en: '2020 — Present', ar: '2020 — حتى الآن' },
    summary: {
      en: 'Software development, system design and advanced programming.',
      ar: 'تطوير البرمجيات وتصميم الأنظمة والبرمجة المتقدمة.',
    },
    highlights: {
      en: ['Software engineering and system design coursework.'],
      ar: ['مقررات في هندسة البرمجيات وتصميم الأنظمة.'],
    },
    tags: ['Software Engineering', 'System Design'],
  },
  {
    id: 'unrwa',
    kind: 'education',
    title: { en: 'Information Technology', ar: 'تقنية المعلومات' },
    organization: {
      en: 'Damascus Training Center (UNRWA)',
      ar: 'مركز دمشق للتدريب (الأونروا)',
    },
    period: { en: '2020 — 2022', ar: '2020 — 2022' },
    summary: {
      en: 'Programming fundamentals, web development and database management.',
      ar: 'أساسيات البرمجة وتطوير الويب وإدارة قواعد البيانات.',
    },
    highlights: {
      en: ['Fundamentals, web development and databases with practical application work.'],
      ar: ['أساسيات وتطوير ويب وقواعد بيانات مع عمل تطبيقي.'],
    },
    tags: ['Web Development', 'Databases'],
  },
];

/**
 * Approved testimonials.
 *
 * The English text is the exact wording each person reviewed and approved and
 * must not be paraphrased. The Arabic is a translation of that approved text,
 * labelled as such in the UI.
 */
export const recommendations: Recommendation[] = [
  {
    id: 'motaz-halabi',
    name: { en: 'Motaz Al-Halabi', ar: 'معتز الحلبي' },
    position: { en: 'Project Manager (IDS)', ar: 'مدير مشاريع (IDS)' },
    context: {
      en: 'Leadership across TLIS and workflow systems',
      ar: 'القيادة في نظام TLIS وأنظمة سير العمل',
    },
    message: {
      en: "As Zaher's direct manager at IDS, I had the pleasure of seeing his growth as a Front-End Angular Team Leader. He played a key role in delivering critical projects such as the TLIS system for Syriatel and our Workflow Automation System. Zaher consistently demonstrates technical mastery in Angular, strong leadership, and the ability to translate complex requirements into clean, maintainable code. He leads with integrity and inspires his team to exceed expectations.",
      ar: 'بصفتي مديره المباشر في IDS، سعدت بمتابعة تطوّره كقائد فريق واجهات أمامية في Angular. أدّى دوراً أساسياً في تسليم مشاريع حرجة مثل نظام TLIS لسيرياتل ونظام أتمتة سير العمل لدينا. يُظهر زاهر باستمرار تمكّناً تقنياً في Angular، وقيادة قوية، وقدرة على تحويل المتطلبات المعقّدة إلى كود نظيف وقابل للصيانة. يقود بنزاهة ويلهم فريقه لتجاوز التوقعات.',
    },
    projectIds: ['tli', 'workflow'],
  },
  {
    id: 'omar-fallouh',
    name: { en: 'Omar Fallouh', ar: 'عمر فلوح' },
    position: { en: 'CEO (IC&I)', ar: 'الرئيس التنفيذي (IC&I)' },
    context: {
      en: 'Enterprise Angular and multilingual delivery',
      ar: 'تسليم Angular مؤسسي متعدد اللغات',
    },
    message: {
      en: 'Eng. Zaher was instrumental in our UN project, delivering a secure Angular solution with micro-frontend architecture. His expertise in RxJS optimization and NgRx state management enabled high-performance multilingual interfaces. A strategic thinker who excels in cross-cultural environments and enterprise-scale challenges.',
      ar: 'كان المهندس زاهر عنصراً أساسياً في مشروع الأمم المتحدة لدينا، إذ سلّم حلاً آمناً بـ Angular ببنية micro-frontend. مكّنت خبرته في تحسين RxJS وإدارة الحالة بـ NgRx من بناء واجهات متعددة اللغات عالية الأداء. مفكّر استراتيجي يتفوّق في البيئات متعددة الثقافات وفي التحديات بحجم المؤسسات.',
    },
    projectIds: ['undp'],
  },
  {
    id: 'mohanad-halabi',
    name: { en: 'Mohanad Al-Halabi', ar: 'مهند الحلبي' },
    position: { en: 'Executive Manager (IC&I)', ar: 'المدير التنفيذي (IC&I)' },
    context: {
      en: 'Communication, mentoring, and delivery under pressure',
      ar: 'التواصل والإرشاد والتسليم تحت الضغط',
    },
    message: {
      en: 'Eng. Zaher combines technical excellence with outstanding leadership skills. His ability to communicate clearly, mentor team members, and maintain professionalism under pressure makes him invaluable. Zaher fosters collaboration and consistently delivers results while keeping team morale high.',
      ar: 'يجمع المهندس زاهر بين التميّز التقني ومهارات قيادية بارزة. قدرته على التواصل بوضوح، وإرشاد أعضاء الفريق، والحفاظ على مهنيته تحت الضغط تجعله عنصراً لا يُعوَّض. يعزّز زاهر التعاون ويحقق النتائج باستمرار مع الحفاظ على معنويات الفريق عالية.',
    },
    image: 'Mohanad.webp',
    projectIds: ['undp'],
  },
  {
    id: 'jamal-halabi',
    name: { en: 'Jamal Al-Halabi', ar: 'جمال الحلبي' },
    position: { en: 'Founder & Owner (2GO Group)', ar: 'المؤسس والمالك (مجموعة 2GO)' },
    context: {
      en: 'Shopify ecosystem growth across 2GO brands',
      ar: 'نمو منظومة Shopify عبر علامات 2GO',
    },
    message: {
      en: 'Eng. Zaher has been the backbone of our e-commerce ecosystem across all 2GO brands, including Phone Parts 2GO, Hulle 2GO, and ReiseKoffer 2GO. His deep knowledge of Shopify development, attention to detail, and ability to deliver scalable, customized solutions have significantly boosted our online performance. Zaher understands both technology and business needs, making him an essential part of our growth journey.',
      ar: 'كان المهندس زاهر العمود الفقري لمنظومتنا في التجارة الإلكترونية عبر جميع علامات 2GO، بما فيها Phone Parts 2GO وHulle 2GO وReiseKoffer 2GO. معرفته العميقة بتطوير Shopify، ودقته في التفاصيل، وقدرته على تسليم حلول مخصّصة وقابلة للتوسّع، عزّزت أداءنا على الإنترنت بشكل ملحوظ. يفهم زاهر التقنية واحتياجات العمل معاً، ما يجعله جزءاً أساسياً من رحلة نمونا.',
    },
    image: 'jamal.webp',
    projectIds: ['huelle', 'phoneparts', 'reisekoffer'],
  },
];

export function recommendationById(id: string): Recommendation | undefined {
  return recommendations.find((item) => item.id === id);
}
