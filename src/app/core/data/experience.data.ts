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
      en: 'Enterprise Angular systems: frontend architecture, modernization of inherited applications, and complex business workflows. The role has widened over time from implementation into system and product architecture, including Nx-based platforms that span web, mobile and backend.',
      ar: 'أنظمة Angular مؤسسية: بنية الواجهات، وتحديث تطبيقات موروثة، ومسارات عمل معقّدة. اتسع الدور مع الوقت من التنفيذ إلى هندسة الأنظمة والمنتجات، بما يشمل منصات على Nx تمتد من الويب إلى الموبايل إلى الواجهة الخلفية.',
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
      en: 'Building a multi-tenant medical SaaS end to end: domain model, NestJS API, PostgreSQL schema, Nx workspace boundaries, and the Angular and Ionic applications on top of them.',
      ar: 'بناء منصة SaaS طبية متعددة المستأجرين من طرف إلى طرف: نموذج النطاق، وواجهة NestJS، ومخطط PostgreSQL، وحدود مساحة عمل Nx، وتطبيقات Angular وIonic فوقها.',
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
      en: 'Angular applications for independent clients: translating requirements into responsive, maintainable interfaces.',
      ar: 'تطبيقات Angular لعملاء مستقلين: تحويل المتطلبات إلى واجهات متجاوبة وقابلة للصيانة.',
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
      en: 'Custom Shopify themes and storefront work for German-market brands, including performance and buying-flow improvements.',
      ar: 'قوالب Shopify مخصّصة وعمل على المتاجر لعلامات في السوق الألمانية، مع تحسينات للأداء ومسار الشراء.',
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
 * Genuine feedback from colleagues and clients, edited for clarity and reviewed
 * and approved by each person before publication.
 */
export const recommendations: Recommendation[] = [
  {
    id: 'motaz-halabi',
    name: { en: 'Motaz Al-Halabi', ar: 'معتز الحلبي' },
    position: { en: 'Project Manager, IDS', ar: 'مدير مشاريع، IDS' },
    context: {
      en: 'Direct manager on Tower Load Inventory and the Workflow Automation System',
      ar: 'المدير المباشر في Tower Load Inventory ونظام أتمتة سير العمل',
    },
    message: {
      en: 'As Zaher’s direct manager at IDS, I saw his growth as a front-end Angular lead. He played a key role in delivering critical projects such as the TLIS system for Syriatel and our Workflow Automation System. Zaher consistently demonstrates strong Angular expertise, dependable leadership, and the ability to translate complex requirements into clean, maintainable code. He leads with integrity and raises the standard of the people around him.',
      ar: 'بصفتي مديره المباشر في IDS، رأيت تطوّر زاهر كقائد لواجهات Angular. أدّى دوراً أساسياً في تسليم مشاريع حرجة مثل نظام TLIS لسيرياتل ونظام أتمتة سير العمل لدينا. يُظهر زاهر باستمرار خبرة قوية في Angular، وقيادة يُعتمد عليها، وقدرة على تحويل متطلبات معقّدة إلى كود نظيف وقابل للصيانة. يقود بنزاهة ويرفع مستوى من حوله.',
    },
    projectIds: ['tli', 'workflow'],
  },
  {
    id: 'omar-fallouh',
    name: { en: 'Omar Fallouh', ar: 'عمر فلوح' },
    position: { en: 'CEO, IC&I', ar: 'الرئيس التنفيذي، IC&I' },
    context: {
      en: 'Enterprise Angular delivery on the UN project',
      ar: 'تسليم واجهة Angular مؤسسية في مشروع الأمم المتحدة',
    },
    message: {
      en: 'Eng. Zaher was instrumental in our UN project, delivering a secure Angular solution with a well-structured frontend architecture. His work on reactive data flow and state management produced high-performance multilingual interfaces. He works well across cultures and handles enterprise-scale requirements with clarity.',
      ar: 'كان المهندس زاهر عنصراً أساسياً في مشروع الأمم المتحدة لدينا، إذ سلّم حلاً آمناً بـ Angular ببنية واجهة محكمة التنظيم. أنتج عمله على تدفق البيانات التفاعلي وإدارة الحالة واجهات متعددة اللغات عالية الأداء. يعمل بكفاءة عبر ثقافات مختلفة ويتعامل مع متطلبات بحجم مؤسسي بوضوح.',
    },
    projectIds: ['undp'],
  },
  {
    id: 'mohanad-halabi',
    name: { en: 'Mohanad Al-Halabi', ar: 'مهند الحلبي' },
    position: { en: 'Executive Manager, IC&I', ar: 'المدير التنفيذي، IC&I' },
    context: {
      en: 'Collaboration and delivery under pressure',
      ar: 'التعاون والتسليم تحت الضغط',
    },
    message: {
      en: 'Eng. Zaher combines technical strength with steady collaboration. He communicates clearly, supports the people he works with, and keeps his professionalism when timelines get tight. He delivers results without letting team morale pay for it.',
      ar: 'يجمع المهندس زاهر بين القوة التقنية والتعاون الثابت. يتواصل بوضوح، ويدعم من يعمل معهم، ويحافظ على مهنيته حين تضيق المواعيد. يحقق النتائج دون أن تدفع معنويات الفريق ثمنها.',
    },
    image: 'Mohanad.webp',
    projectIds: ['undp'],
  },
  {
    id: 'jamal-halabi',
    name: { en: 'Jamal Al-Halabi', ar: 'جمال الحلبي' },
    position: { en: 'Founder & Owner, 2GO Group', ar: 'المؤسس والمالك، مجموعة 2GO' },
    context: {
      en: 'Commerce work across the 2GO storefronts',
      ar: 'العمل التجاري عبر متاجر 2GO',
    },
    message: {
      en: 'Eng. Zaher has been the backbone of our e-commerce work across the 2GO brands. His knowledge of Shopify development, attention to detail, and ability to deliver customized solutions have clearly improved our online performance. He understands both the technology and the business behind it.',
      ar: 'كان المهندس زاهر العمود الفقري لعملنا في التجارة الإلكترونية عبر علامات 2GO. معرفته بتطوير Shopify، ودقته في التفاصيل، وقدرته على تسليم حلول مخصّصة، حسّنت أداءنا على الإنترنت بوضوح. يفهم التقنية والعمل التجاري خلفها معاً.',
    },
    image: 'jamal.webp',
    projectIds: ['huelle', 'phoneparts', 'reisekoffer'],
  },
];

export function recommendationById(id: string): Recommendation | undefined {
  return recommendations.find((item) => item.id === id);
}
