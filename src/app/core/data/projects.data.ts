import { Project, ProjectStatus } from '../models/portfolio.model';

/**
 * Status vocabulary. Every status carries its own words in both languages so a
 * status is never communicated by colour alone.
 */
const status = {
  mvpReady: {
    label: { en: 'MVP Ready', ar: 'نسخة أولى جاهزة' },
    shortLabel: { en: 'MVP Ready', ar: 'MVP جاهز' },
    tone: 'active',
  },
  launchStage: {
    label: { en: 'Launch Stage', ar: 'مرحلة الإطلاق' },
    shortLabel: { en: 'Launching', ar: 'قيد الإطلاق' },
    tone: 'active',
  },
  delivered: {
    label: { en: 'Delivered', ar: 'تم التسليم' },
    shortLabel: { en: 'Delivered', ar: 'مُسلَّم' },
    tone: 'delivered',
  },
  finished: {
    label: { en: 'Finished', ar: 'منجز' },
    shortLabel: { en: 'Finished', ar: 'منجز' },
    tone: 'delivered',
  },
  archived: {
    label: { en: 'Previous work', ar: 'عمل سابق' },
    shortLabel: { en: 'Archived', ar: 'أرشيف' },
    tone: 'archived',
  },
} satisfies Record<string, ProjectStatus>;

const privateDeployment = {
  kind: 'private',
  url: null,
  label: {
    en: 'Enterprise project — private deployment',
    ar: 'مشروع مؤسسي — نشر خاص',
  },
} as const;

export const projects: Project[] = [
  /* ------------------------------------------------------------- flagship */
  {
    id: 'nasaq',
    tier: 'flagship',
    order: 1,
    name: { en: 'Nasaq', ar: 'نَسَق' },
    descriptor: {
      en: 'Multi-Tenant Medical SaaS',
      ar: 'منصة SaaS طبية متعددة المستأجرين',
    },
    client: { en: 'Built in collaboration with IC&I', ar: 'بالتعاون مع IC&I' },
    category: { en: 'Product & Platform', ar: 'منتج ومنصة' },
    status: status.mvpReady,
    role: { en: 'Founder & Full-Stack Engineer', ar: 'مؤسس ومهندس Full-Stack' },
    summary: {
      en: 'A clinic platform where each tenant runs an isolated practice: patients, appointments, longitudinal clinical records, prescriptions, documents, billing and dashboards — delivered as an Angular web app, an Ionic mobile app, a platform admin console and a public landing site over one NestJS API.',
      ar: 'منصة عيادات يعمل فيها كل مستأجر ضمن مساحة معزولة: المرضى، المواعيد، السجلات السريرية المتتابعة، الوصفات، الوثائق، الفوترة، ولوحات المتابعة — عبر تطبيق ويب بـ Angular، وتطبيق موبايل بـ Ionic، ولوحة إدارة للمنصة، وموقع تعريفي، جميعها فوق واجهة API واحدة بـ NestJS.',
    },
    stack: ['Nx', 'Angular', 'Ionic', 'NestJS', 'PostgreSQL', 'Prisma', 'PrimeNG', 'TypeScript'],
    deployment: {
      kind: 'public',
      // Preview deployment. Replace this value when the production URL is ready;
      // nothing else in the app hard-codes it.
      url: 'https://nasaq-preview.onrender.com',
      label: { en: 'Live preview', ar: 'نسخة معاينة' },
    },
    architecture: {
      workspaceLabel: { en: 'Nx workspace', ar: 'مساحة عمل Nx' },
      clients: [
        { id: 'web', label: { en: 'Clinic Web', ar: 'واجهة العيادة' }, tech: 'Angular' },
        { id: 'mobile', label: { en: 'Mobile App', ar: 'تطبيق الموبايل' }, tech: 'Ionic' },
        { id: 'admin', label: { en: 'Platform Admin', ar: 'إدارة المنصة' }, tech: 'Angular' },
        { id: 'landing', label: { en: 'Landing', ar: 'الموقع التعريفي' }, tech: 'Angular' },
      ],
      api: { label: { en: 'Domain API', ar: 'واجهة النطاق' }, tech: 'NestJS' },
      data: {
        label: { en: 'Tenant-isolated data', ar: 'بيانات معزولة لكل مستأجر' },
        tech: 'PostgreSQL + Prisma',
      },
    },
    caseStudy: [
      {
        id: 'problem',
        heading: { en: 'Problem', ar: 'المشكلة' },
        body: {
          en: 'Small and mid-size clinics run on disconnected tools: paper records, spreadsheets for appointments, and no reliable clinical history. Anything that replaces them has to serve several clinics at once without ever letting one clinic see another clinic’s data.',
          ar: 'تدير العيادات الصغيرة والمتوسطة عملها بأدوات منفصلة: سجلات ورقية، وجداول للمواعيد، وبلا تاريخ سريري موثوق. وأي بديل يجب أن يخدم عدة عيادات في آن واحد دون أن ترى أي عيادة بيانات غيرها إطلاقاً.',
        },
      },
      {
        id: 'product',
        heading: { en: 'Product', ar: 'المنتج' },
        body: {
          en: 'Nasaq gives every clinic its own tenant: staff accounts with scoped roles, a patient registry, a scheduling surface, encounters that accumulate into a longitudinal record, prescriptions, private medical documents, reports, receipts and dashboards — in Arabic or English, with the layout mirroring accordingly.',
          ar: 'يمنح نَسَق كل عيادة مستأجراً خاصاً بها: حسابات موظفين بأدوار محددة، وسجل مرضى، وواجهة مواعيد، وزيارات تتراكم لتكوّن سجلاً سريرياً متصلاً، ووصفات، ووثائق طبية خاصة، وتقارير، وإيصالات، ولوحات متابعة — بالعربية أو الإنكليزية مع انعكاس كامل للتخطيط.',
        },
      },
      {
        id: 'architecture',
        heading: { en: 'Architecture', ar: 'البنية' },
        body: {
          en: 'One Nx workspace holds four applications and a set of domain-oriented libraries. Library boundaries follow the business domain — patients, scheduling, clinical records, billing — rather than the technical layer, so a feature stays in one place and the enforced dependency rules keep domains from reaching into each other.',
          ar: 'مساحة عمل Nx واحدة تضم أربعة تطبيقات ومجموعة مكتبات منظّمة حسب النطاق. حدود المكتبات تتبع نطاق العمل — المرضى، المواعيد، السجلات السريرية، الفوترة — لا الطبقة التقنية، فتبقى كل ميزة في مكان واحد، وتمنع قواعد الاعتماد المفروضة تداخل النطاقات.',
        },
      },
      {
        id: 'role',
        heading: { en: 'My role', ar: 'دوري' },
        body: {
          en: 'I own the product and the system: the domain model, the tenancy strategy, the API contracts, the Nx boundaries, the shared UI infrastructure, and the Angular and Ionic applications built on top of them.',
          ar: 'أتولى المنتج والنظام معاً: نموذج النطاق، واستراتيجية تعدد المستأجرين، وعقود الـ API، وحدود Nx، والبنية المشتركة للواجهات، وتطبيقي Angular وIonic المبنيين فوقها.',
        },
      },
      {
        id: 'decisions',
        heading: { en: 'Engineering decisions', ar: 'قرارات هندسية' },
        body: {
          en: 'A few decisions shaped everything that came after:',
          ar: 'قرارات قليلة رسمت كل ما تلاها:',
        },
        points: {
          en: [
            'Tenant isolation is enforced at the data-access layer, not left to each screen to remember.',
            'Sessions use short-lived access tokens with refresh-token rotation, so a leaked token has a narrow window.',
            'Roles and permissions are checked on the server; the UI only reflects what the API already enforces.',
            'Forms and data views are generated from shared, typed configuration instead of being hand-written per screen.',
            'One set of design tokens feeds the Angular, PrimeNG and Ionic rendering layers so all four apps stay visually consistent.',
            'Audit logs record who changed what, which matters once clinical and financial records are involved.',
          ],
          ar: [
            'عزل المستأجرين مفروض في طبقة الوصول إلى البيانات، لا متروكاً لكل شاشة أن تتذكره.',
            'الجلسات تعتمد رموز وصول قصيرة العمر مع تدوير لرمز التجديد، فتضيق نافذة أي تسريب.',
            'الأدوار والصلاحيات تُتحقق على الخادم، والواجهة تعكس فقط ما تفرضه الـ API أصلاً.',
            'النماذج وعروض البيانات تُولَّد من إعدادات مشتركة ومنمّطة بدل كتابتها يدوياً لكل شاشة.',
            'مجموعة واحدة من رموز التصميم تغذّي طبقات العرض في Angular وPrimeNG وIonic فتتناسق التطبيقات الأربعة.',
            'سجلات التدقيق توثّق من غيّر ماذا، وهو أمر جوهري مع السجلات السريرية والمالية.',
          ],
        },
      },
      {
        id: 'result',
        heading: { en: 'Current state', ar: 'الوضع الحالي' },
        body: {
          en: 'The MVP is deployed and usable end to end: a clinic can be created, staffed, and run through real patient, appointment, encounter, prescription and payment flows. Work continues on reporting depth and the mobile experience.',
          ar: 'النسخة الأولى منشورة وقابلة للاستخدام من طرف إلى طرف: يمكن إنشاء عيادة وتزويدها بالطاقم وتشغيل مسارات حقيقية للمرضى والمواعيد والزيارات والوصفات والمدفوعات. والعمل مستمر على عمق التقارير وتجربة الموبايل.',
        },
      },
    ],
    capabilities: {
      en: [
        'Multi-tenancy & tenant isolation',
        'Authentication with refresh-token rotation',
        'Roles & permissions',
        'Patients & appointments',
        'Encounters & longitudinal records',
        'Prescriptions & medications',
        'Private medical documents',
        'Medical reports',
        'Receipts & payments',
        'Dashboards & audit logs',
        'Arabic / English with RTL & LTR',
        'Shared dynamic forms & data views',
      ],
      ar: [
        'تعدد المستأجرين وعزل بياناتهم',
        'مصادقة مع تدوير رمز التجديد',
        'أدوار وصلاحيات',
        'المرضى والمواعيد',
        'الزيارات والسجل السريري المتصل',
        'الوصفات والأدوية',
        'وثائق طبية خاصة',
        'التقارير الطبية',
        'الإيصالات والمدفوعات',
        'لوحات متابعة وسجلات تدقيق',
        'عربي / إنكليزي مع RTL وLTR',
        'نماذج وعروض بيانات مشتركة وديناميكية',
      ],
    },
  },

  /* ------------------------------------------------------------- featured */
  {
    id: 'mandoob',
    tier: 'featured',
    order: 2,
    name: { en: 'Mandoob', ar: 'مندوب' },
    descriptor: {
      en: 'B2B Distribution & Retail Connectivity Platform',
      ar: 'منصة توزيع B2B وربط مع نقاط البيع',
    },
    category: { en: 'B2B Platform', ar: 'منصة B2B' },
    status: status.launchStage,
    role: {
      en: 'Solution & Frontend Architecture · Angular and Ionic development',
      ar: 'هندسة الحل وبنية الواجهات · تطوير Angular وIonic',
    },
    summary: {
      en: 'A platform that connects manufacturers and distributors to their field representatives and to the retail stores those representatives visit — orders, offers, returns and collections in one channel instead of phone calls and paper.',
      ar: 'منصة تربط المصنّعين والموزّعين بمندوبيهم الميدانيين وبالمتاجر التي يزورونها — طلبات وعروض ومرتجعات وتحصيلات في قناة واحدة بدل الاتصالات والأوراق.',
    },
    stack: ['Angular', 'Ionic', 'Capacitor', 'SSR', 'PrimeNG', 'RxJS', 'SignalR', 'Leaflet'],
    deployment: {
      kind: 'unreleased',
      // Configuration placeholder: set this to the public URL once it is confirmed.
      url: null,
      label: { en: 'Live link coming soon', ar: 'الرابط المباشر قريباً' },
    },
    actorFlow: [
      {
        id: 'company',
        label: { en: 'Company', ar: 'الشركة' },
        role: { en: 'Products, offers, plans', ar: 'المنتجات والعروض والخطط' },
        icon: 'bi bi-building',
      },
      {
        id: 'rep',
        label: { en: 'Representative', ar: 'المندوب' },
        role: {
          en: 'Field visits, orders, collections',
          ar: 'الزيارات الميدانية والطلبات والتحصيل',
        },
        icon: 'bi bi-person-badge',
      },
      {
        id: 'store',
        label: { en: 'Store', ar: 'المتجر' },
        role: { en: 'Requests, returns, reviews', ar: 'الطلبات والمرتجعات والتقييمات' },
        icon: 'bi bi-shop',
      },
    ],
    caseStudy: [
      {
        id: 'problem',
        heading: { en: 'Problem', ar: 'المشكلة' },
        body: {
          en: 'Manufacturers and distributors reach retail stores through field representatives, but the relationship between the three sides runs on phone calls, paper forms and memory. There is no shared record of what was offered, ordered, returned or collected.',
          ar: 'يصل المصنّعون والموزّعون إلى المتاجر عبر مندوبين ميدانيين، لكن العلاقة بين الأطراف الثلاثة تُدار بالاتصالات والاستمارات الورقية والذاكرة. لا سجل مشترك لما عُرض أو طُلب أو أُرجع أو حُصّل.',
        },
      },
      {
        id: 'product',
        heading: { en: 'Product', ar: 'المنتج' },
        body: {
          en: 'Mandoob gives each side its own view of the same relationship. Companies publish products, offers and plans. Representatives work a route on mobile: visits, orders, returns, collections. Stores see their own requests and history. Everything a representative does in the field appears on the company side without a second entry step.',
          ar: 'يمنح مندوب كل طرف رؤيته الخاصة للعلاقة نفسها. الشركات تنشر المنتجات والعروض والخطط. المندوبون يعملون على خط سير من الموبايل: زيارات وطلبات ومرتجعات وتحصيلات. والمتاجر ترى طلباتها وسجلها. وكل ما يفعله المندوب ميدانياً يظهر لدى الشركة بلا إدخال ثانٍ.',
        },
      },
      {
        id: 'role',
        heading: { en: 'My role', ar: 'دوري' },
        body: {
          en: 'I designed the solution architecture and the frontend architecture, then implemented the Angular web application and the Ionic/Capacitor Android application. The backend was built by the platform team; my responsibility ended at the API boundary.',
          ar: 'صمّمت هندسة الحل وبنية الواجهات، ثم نفّذت تطبيق الويب بـ Angular وتطبيق أندرويد بـ Ionic وCapacitor. أما الواجهة الخلفية فبناها فريق المنصة، ومسؤوليتي تنتهي عند حدود الـ API.',
        },
      },
      {
        id: 'decisions',
        heading: { en: 'Engineering decisions', ar: 'قرارات هندسية' },
        body: {
          en: 'The field is the hardest environment this platform runs in, and most decisions came from that:',
          ar: 'الميدان هو أصعب بيئة تعمل فيها هذه المنصة، ومن هناك جاءت معظم القرارات:',
        },
        points: {
          en: [
            'One shared domain layer feeds both the web app and the mobile app, so a business rule is written once.',
            'SignalR keeps order and visit state current for back-office users without polling.',
            'Map-based representative and store views use Leaflet, kept light enough for mid-range Android devices.',
            'SSR on the web side so the platform is fast on first load over uneven connections.',
          ],
          ar: [
            'طبقة نطاق مشتركة تغذّي تطبيق الويب وتطبيق الموبايل معاً، فتُكتب قاعدة العمل مرة واحدة.',
            'SignalR يبقي حالة الطلبات والزيارات محدّثة لمستخدمي المكتب دون استعلام دوري.',
            'عروض المندوبين والمتاجر على الخريطة عبر Leaflet، بحمل خفيف يناسب أجهزة أندرويد المتوسطة.',
            'تصيير من الخادم في نسخة الويب ليكون التحميل الأول سريعاً على اتصالات متفاوتة.',
          ],
        },
      },
      {
        id: 'result',
        heading: { en: 'Current state', ar: 'الوضع الحالي' },
        body: {
          en: 'The web platform and the Android application are built and in launch stage with the client.',
          ar: 'منصة الويب وتطبيق أندرويد جاهزان وفي مرحلة الإطلاق مع العميل.',
        },
      },
    ],
    capabilities: {
      en: [
        'Companies & representatives',
        'Stores & clients',
        'Products & categories',
        'Offers & plans',
        'Requests & orders',
        'Returns & collections',
        'Reviews',
      ],
      ar: [
        'الشركات والمندوبون',
        'المتاجر والعملاء',
        'المنتجات والفئات',
        'العروض والخطط',
        'الطلبات',
        'المرتجعات والتحصيلات',
        'التقييمات',
      ],
    },
  },

  {
    id: 'tli',
    tier: 'featured',
    order: 3,
    name: {
      en: 'Tower Load Inventory',
      ar: 'Tower Load Inventory',
    },
    descriptor: {
      en: 'Enterprise Angular Re-Architecture',
      ar: 'إعادة هندسة واجهة Angular مؤسسية',
    },
    client: { en: 'Syriatel', ar: 'سيرياتل' },
    category: { en: 'Enterprise System', ar: 'نظام مؤسسي' },
    status: status.delivered,
    role: { en: 'Frontend Architect & Angular Developer', ar: 'مهندس واجهات ومطوّر Angular' },
    summary: {
      en: 'A telecom operations system for tower sites: what is mounted on each tower, how much space and weight is allocated, and what capacity is left. I inherited the frontend in poor structural condition, re-architected it, rebuilt the parts that could not be repaired, and delivered it.',
      ar: 'نظام تشغيلي لقطاع الاتصالات يتابع مواقع الأبراج: ما المركّب على كل برج، وكم من المساحة والوزن مخصّص، وما المتبقي من السعة. استلمت الواجهة الأمامية بحالة بنيوية سيئة، فأعدت هندستها، وأعدت بناء ما تعذّر إصلاحه، ثم سلّمتها.',
    },
    stack: ['Angular', 'TypeScript', 'RxJS', 'PrimeNG', 'Reactive Forms', 'Charts'],
    deployment: privateDeployment,
    logo: 'syriatel.webp',
    cover: {
      src: 'TLI/home.webp',
      alt: {
        en: 'Tower Load Inventory dashboard showing counts of installed equipment types across tower sites',
        ar: 'لوحة Tower Load Inventory تعرض أعداد أنواع التجهيزات المركّبة على مواقع الأبراج',
      },
      caption: {
        en: 'Operations dashboard: installed item counts by equipment type.',
        ar: 'لوحة التشغيل: أعداد العناصر المركّبة بحسب نوع التجهيز.',
      },
      width: 1432,
      height: 779,
    },
    screenshots: [
      {
        src: 'TLI/site-editor.webp',
        alt: {
          en: 'Site management screen with a space-allocation chart and collapsible sections for civil support and side arms',
          ar: 'شاشة إدارة الموقع مع مخطط توزيع المساحة وأقسام قابلة للطي للدعم المدني والأذرع الجانبية',
        },
        caption: {
          en: 'Per-site capacity: allocated versus remaining space, with the structure broken into inspectable sections.',
          ar: 'سعة كل موقع: المساحة المخصّصة مقابل المتبقية، مع تقسيم البنية إلى أقسام قابلة للفحص.',
        },
        width: 1440,
        height: 783,
      },
      {
        src: 'TLI/tree.webp',
        alt: {
          en: 'Site creation form beside a searchable hierarchy tree of tower sites; the tree contents are blurred',
          ar: 'نموذج إنشاء موقع بجانب شجرة تسلسلية قابلة للبحث لمواقع الأبراج، ومحتوى الشجرة مطموس',
        },
        caption: {
          en: 'Site hierarchy and the structured creation form. Real site codes are blurred.',
          ar: 'التسلسل الهرمي للمواقع ونموذج الإنشاء المنظّم. رموز المواقع الحقيقية مطموسة.',
        },
        width: 1434,
        height: 785,
      },
      {
        src: 'TLI/usergraph.webp',
        alt: {
          en: 'Access-management graph showing organisational levels, roles and actors as connected cards',
          ar: 'مخطط إدارة الصلاحيات يعرض المستويات التنظيمية والأدوار والفاعلين كبطاقات مترابطة',
        },
        caption: {
          en: 'Access management modelled as a graph of levels, groups and roles. Names are redacted.',
          ar: 'إدارة الصلاحيات مصمَّمة كمخطط للمستويات والمجموعات والأدوار. الأسماء محجوبة.',
        },
        width: 1481,
        height: 801,
      },
    ],
    caseStudy: [
      {
        id: 'problem',
        heading: { en: 'What I inherited', ar: 'ما استلمته' },
        body: {
          en: 'The frontend was in very poor structural condition. Responsibilities were tangled, flows were hard to follow, and changing one screen tended to break another. The system itself was needed in production, so a rewrite from zero was not on the table.',
          ar: 'كانت الواجهة الأمامية بحالة بنيوية سيئة جداً. المسؤوليات متشابكة، والمسارات يصعب تتبعها، وتعديل شاشة يكسر أخرى غالباً. وكان النظام مطلوباً في الإنتاج، فلم تكن إعادة الكتابة من الصفر خياراً مطروحاً.',
        },
      },
      {
        id: 'approach',
        heading: { en: 'What I did', ar: 'ما فعلته' },
        body: {
          en: 'I read the existing frontend until I understood the real flows, then redesigned the architecture around them: clear module boundaries, a reusable component layer for the data-heavy screens, and predictable state handling. Parts that could be repaired were repaired; parts that could not were rebuilt behind the same behaviour so delivery never stalled.',
          ar: 'قرأت الواجهة القائمة حتى فهمت المسارات الفعلية، ثم أعدت تصميم البنية حولها: حدود واضحة للوحدات، وطبقة مكونات قابلة لإعادة الاستخدام للشاشات كثيفة البيانات، وإدارة حالة يمكن التنبؤ بها. ما أمكن إصلاحه أُصلح، وما تعذّر أُعيد بناؤه خلف السلوك نفسه حتى لا يتوقف التسليم.',
        },
      },
      {
        id: 'result',
        heading: { en: 'Outcome', ar: 'النتيجة' },
        body: {
          en: 'The rebuilt system was delivered to Syriatel and received strong positive feedback. The frontend became something a team could keep working in rather than something that had to be worked around.',
          ar: 'سُلّم النظام بعد إعادة بنائه إلى سيرياتل ولاقى تقييماً إيجابياً قوياً. وأصبحت الواجهة شيئاً يمكن لفريق أن يواصل العمل داخله، بدل شيء يُلتفّ حوله.',
        },
      },
      {
        id: 'note',
        heading: { en: 'On the screenshots', ar: 'حول اللقطات' },
        body: {
          en: 'The visual design is the client’s, and the screenshots do not show the part of the work that mattered most. Read them as evidence that a complex operational system was delivered — the structural change behind them is described above.',
          ar: 'التصميم البصري يعود للعميل، واللقطات لا تُظهر الجزء الأهم من العمل. اقرأها كدليل على تسليم نظام تشغيلي معقّد — أما التغيير البنيوي خلفها فموصوف أعلاه.',
        },
      },
    ],
    transformation: {
      beforeHeading: { en: 'Before', ar: 'قبل' },
      before: {
        en: [
          'Structural problems throughout the frontend',
          'Flows that were hard to follow or change',
          'Duplicated screen logic with no reusable layer',
          'Maintenance cost rising with every feature',
        ],
        ar: [
          'مشكلات بنيوية في عموم الواجهة الأمامية',
          'مسارات يصعب تتبعها أو تعديلها',
          'منطق شاشات مكرّر بلا طبقة قابلة لإعادة الاستخدام',
          'كلفة صيانة ترتفع مع كل ميزة',
        ],
      },
      afterHeading: { en: 'After', ar: 'بعد' },
      after: {
        en: [
          'A clear architecture with defined module boundaries',
          'A reusable component layer for data-heavy screens',
          'Application organisation a team can navigate',
          'A maintainable Angular implementation, delivered',
        ],
        ar: [
          'بنية واضحة بحدود محددة للوحدات',
          'طبقة مكونات قابلة لإعادة الاستخدام للشاشات كثيفة البيانات',
          'تنظيم للتطبيق يستطيع الفريق التنقّل فيه',
          'تنفيذ Angular قابل للصيانة، ومسلَّم',
        ],
      },
    },
    testimonialIds: ['motaz-halabi'],
  },

  {
    id: 'workflow',
    tier: 'featured',
    order: 4,
    name: { en: 'Workflow Automation System', ar: 'نظام أتمتة سير العمل' },
    descriptor: {
      en: 'Enterprise Frontend Modernization',
      ar: 'تحديث واجهة مؤسسية',
    },
    category: { en: 'Enterprise System', ar: 'نظام مؤسسي' },
    status: status.delivered,
    role: { en: 'Frontend Architect & Angular Developer', ar: 'مهندس واجهات ومطوّر Angular' },
    summary: {
      en: 'A configurable request and approval engine: administrators define workflow templates, the actions inside them, and the forms each action collects — without a developer. I inherited the frontend in poor technical condition and rebuilt it into something the engine could actually be driven from.',
      ar: 'محرك طلبات وموافقات قابل للإعداد: يعرّف المسؤولون قوالب سير العمل، والإجراءات داخلها، والنماذج التي يجمعها كل إجراء — دون الحاجة إلى مطوّر. استلمت الواجهة بحالة تقنية سيئة وأعدت بناءها لتصبح واجهة يمكن قيادة المحرك منها فعلاً.',
    },
    stack: ['Angular', 'TypeScript', 'RxJS', 'Dynamic Forms', 'Graph Editor'],
    deployment: privateDeployment,
    logo: 'wf-logo.webp',
    cover: {
      src: 'WF/graphtemplate.webp',
      alt: {
        en: 'Workflow template designer showing a start node connected to action phases on a canvas, with a searchable action list',
        ar: 'مصمّم قوالب سير العمل يعرض عقدة بداية موصولة بمراحل إجراءات على لوحة، مع قائمة إجراءات قابلة للبحث',
      },
      caption: {
        en: 'The workflow template designer: phases and actions wired together on a canvas.',
        ar: 'مصمّم قوالب سير العمل: مراحل وإجراءات موصولة على لوحة.',
      },
      width: 1176,
      height: 626,
    },
    screenshots: [
      {
        src: 'WF/action.webp',
        alt: {
          en: 'Action builder with an element property panel, a palette of input types, and a live design preview',
          ar: 'منشئ الإجراءات مع لوحة خصائص العنصر، ومجموعة أنواع الحقول، ومعاينة حية للتصميم',
        },
        caption: {
          en: 'Action builder: each action carries a form assembled from a typed element palette.',
          ar: 'منشئ الإجراءات: كل إجراء يحمل نموذجاً يُركَّب من مجموعة عناصر منمّطة.',
        },
        width: 1172,
        height: 626,
      },
      {
        src: 'WF/holiday.webp',
        alt: {
          en: 'Working-hours configuration screen with per-day toggles and start and end times',
          ar: 'شاشة إعداد ساعات العمل مع مفاتيح لكل يوم وأوقات بداية ونهاية',
        },
        caption: {
          en: 'Operational configuration: working hours and holidays feed the workflow timing rules.',
          ar: 'إعدادات تشغيلية: ساعات العمل والعطل تغذّي قواعد التوقيت في سير العمل.',
        },
        width: 1166,
        height: 622,
      },
    ],
    caseStudy: [
      {
        id: 'problem',
        heading: { en: 'What I inherited', ar: 'ما استلمته' },
        body: {
          en: 'A workflow engine existed, but the frontend around it was in poor technical condition and could not express what the engine was capable of. Configurable behaviour ended up hard-coded into screens, which defeated the point of having an engine at all.',
          ar: 'كان هناك محرك لسير العمل، لكن الواجهة المحيطة به بحالة تقنية سيئة ولا تستطيع التعبير عن قدراته. فانتهى السلوك القابل للإعداد مكتوباً بصلابة داخل الشاشات، وهو ما يُفرغ فكرة المحرك من معناها.',
        },
      },
      {
        id: 'approach',
        heading: { en: 'What I did', ar: 'ما فعلته' },
        body: {
          en: 'I started by understanding the engine’s model — templates, phases, actions, transitions — then restructured the frontend around that model instead of around individual screens. Requests, actions and workflow configuration became driven by data, so a new process is a configuration change rather than a release.',
          ar: 'بدأت بفهم نموذج المحرك — القوالب والمراحل والإجراءات والانتقالات — ثم أعدت هيكلة الواجهة حول هذا النموذج بدل بنائها حول شاشات منفصلة. فصارت الطلبات والإجراءات وإعدادات سير العمل مقادة بالبيانات، وأصبح المسار الجديد تعديل إعداد لا إصداراً جديداً.',
        },
      },
      {
        id: 'result',
        heading: { en: 'Outcome', ar: 'النتيجة' },
        body: {
          en: 'A usable enterprise system where administrators configure workflows themselves, and a frontend that a team can extend without fighting it.',
          ar: 'نظام مؤسسي قابل للاستخدام يعدّ فيه المسؤولون مسارات العمل بأنفسهم، وواجهة يستطيع الفريق توسيعها دون مقاومة.',
        },
      },
    ],
    transformation: {
      beforeHeading: { en: 'Before', ar: 'قبل' },
      before: {
        en: [
          'Frontend in poor technical condition',
          'Engine capabilities hard-coded into screens',
          'A new process meant new code',
          'Little separation between UI and workflow model',
        ],
        ar: [
          'واجهة أمامية بحالة تقنية سيئة',
          'قدرات المحرك مكتوبة بصلابة داخل الشاشات',
          'كل مسار جديد يعني كوداً جديداً',
          'فصل ضعيف بين الواجهة ونموذج سير العمل',
        ],
      },
      afterHeading: { en: 'After', ar: 'بعد' },
      after: {
        en: [
          'Frontend restructured around the workflow model',
          'Data-driven requests, actions and forms',
          'New processes configured, not coded',
          'A maintainable base the team could extend',
        ],
        ar: [
          'واجهة أُعيدت هيكلتها حول نموذج سير العمل',
          'طلبات وإجراءات ونماذج مقادة بالبيانات',
          'مسارات جديدة تُعَدّ لا تُبرمَج',
          'أساس قابل للصيانة يستطيع الفريق توسيعه',
        ],
      },
    },
    testimonialIds: ['motaz-halabi'],
  },

  {
    id: 'school',
    tier: 'featured',
    order: 5,
    name: { en: 'School Management Platform', ar: 'منصة إدارة المدارس' },
    descriptor: {
      en: 'Multi-Tenant Academic Operations',
      ar: 'إدارة عمليات أكاديمية متعددة المستأجرين',
    },
    category: { en: 'Platform', ar: 'منصة' },
    status: status.finished,
    role: { en: 'Nx Workspace & Angular Architecture', ar: 'بنية مساحة عمل Nx وAngular' },
    summary: {
      en: 'An Nx workspace holding two Angular applications — a platform admin console and the school-facing application — over a large academic domain: students, enrolments, classes, timetables, attendance, exams, communication and reporting.',
      ar: 'مساحة عمل Nx تضم تطبيقي Angular — لوحة إدارة المنصة وتطبيق المدرسة — فوق نطاق أكاديمي واسع: الطلاب والتسجيل والصفوف والجداول والحضور والامتحانات والتواصل والتقارير.',
    },
    stack: ['Nx', 'Angular', 'TypeScript', 'RxJS', 'PrimeNG'],
    deployment: privateDeployment,
    caseStudy: [
      {
        id: 'problem',
        heading: { en: 'Problem', ar: 'المشكلة' },
        body: {
          en: 'A school runs many overlapping processes at once — enrolment, timetabling, attendance, exams, communication — and each one touches the same students, classes and staff. Modelled badly, every new module makes the previous ones harder to change.',
          ar: 'تدير المدرسة مسارات كثيرة متداخلة في آن واحد — التسجيل والجداول والحضور والامتحانات والتواصل — وكلها تمسّ الطلاب والصفوف والكادر أنفسهم. وإن ساءت النمذجة، جعلت كل وحدة جديدة تعديل سابقاتها أصعب.',
        },
      },
      {
        id: 'architecture',
        heading: { en: 'Architecture', ar: 'البنية' },
        body: {
          en: 'The workspace separates the two applications and keeps the domain in shared libraries between them. Tenant and subscription concerns live in the admin application; academic operations live in the school application; the model they agree on lives in one place.',
          ar: 'تفصل مساحة العمل بين التطبيقين وتُبقي النطاق في مكتبات مشتركة بينهما. شؤون المستأجرين والاشتراكات في تطبيق الإدارة، والعمليات الأكاديمية في تطبيق المدرسة، والنموذج الذي يتفقان عليه في مكان واحد.',
        },
      },
      {
        id: 'role',
        heading: { en: 'What it demonstrates', ar: 'ما يُظهره' },
        body: {
          en: 'This project is here as evidence of Nx workspace architecture, large Angular application organisation, multi-application domain separation, and complex business-domain modelling carried on the frontend.',
          ar: 'هذا المشروع مدرج كدليل على بنية مساحة عمل Nx، وتنظيم تطبيق Angular كبير، وفصل النطاقات بين تطبيقات متعددة، ونمذجة نطاق عمل معقّد على مستوى الواجهة.',
        },
      },
    ],
    capabilities: {
      en: [
        'Tenant management',
        'Subscriptions & features',
        'Users, roles & access groups',
        'School structure',
        'Students & enrolments',
        'Classes, batches & subjects',
        'Attendance & timetables',
        'Exams & activities',
        'Communication',
        'Reports, settings & holidays',
      ],
      ar: [
        'إدارة المستأجرين',
        'الاشتراكات والميزات',
        'المستخدمون والأدوار ومجموعات الوصول',
        'الهيكل المدرسي',
        'الطلاب والتسجيل',
        'الصفوف والشُّعب والمواد',
        'الحضور والجداول الزمنية',
        'الامتحانات والأنشطة',
        'التواصل',
        'التقارير والإعدادات والعطل',
      ],
    },
    note: {
      en: 'Web only — this workspace has no Ionic mobile application.',
      ar: 'ويب فقط — لا يتضمن هذا المشروع تطبيق موبايل بـ Ionic.',
    },
  },

  {
    id: 'undp',
    tier: 'featured',
    order: 6,
    name: { en: 'UNDP Employee Management', ar: 'إدارة موظفي UNDP' },
    descriptor: { en: 'Enterprise HR Operations', ar: 'عمليات موارد بشرية مؤسسية' },
    category: { en: 'Enterprise System', ar: 'نظام مؤسسي' },
    status: status.delivered,
    role: { en: 'Frontend Architect & Angular Developer', ar: 'مهندس واجهات ومطوّر Angular' },
    summary: {
      en: 'An HR system for employees, contracts and salary-related workflows, built for a multilingual organisation where the forms are long, the rules are strict, and the data is personal.',
      ar: 'نظام موارد بشرية للموظفين والعقود ومسارات الرواتب، مبني لمنظمة متعددة اللغات حيث النماذج طويلة والقواعد صارمة والبيانات شخصية.',
    },
    stack: ['Angular', 'TypeScript', 'Reactive Forms', 'Angular Material', 'RxJS'],
    deployment: privateDeployment,
    logo: 'un-logo.webp',
    cover: {
      src: 'UN/employee.webp',
      alt: {
        en: 'Employee registry table with sortable columns for names, reference numbers and identifiers; the rows are blurred',
        ar: 'جدول سجل الموظفين بأعمدة قابلة للفرز للأسماء والأرقام المرجعية والمعرّفات، والصفوف مطموسة',
      },
      caption: {
        en: 'Employee registry with sorting, filtering and export. All personal data is blurred.',
        ar: 'سجل الموظفين مع الفرز والتصفية والتصدير. جميع البيانات الشخصية مطموسة.',
      },
      width: 1418,
      height: 761,
    },
    screenshots: [
      {
        src: 'UN/land.webp',
        alt: {
          en: 'Settings area with tabs for rates, contract types, banks, compensation and leave days',
          ar: 'قسم الإعدادات مع تبويبات للأجور وأنواع العقود والمصارف والتعويضات وأيام الإجازة',
        },
        caption: {
          en: 'The configuration surface behind the HR flows: rates, contract types, compensation, leave.',
          ar: 'واجهة الإعدادات خلف مسارات الموارد البشرية: الأجور وأنواع العقود والتعويضات والإجازات.',
        },
        width: 1411,
        height: 769,
      },
    ],
    caseStudy: [
      {
        id: 'problem',
        heading: { en: 'Problem', ar: 'المشكلة' },
        body: {
          en: 'HR operations for contracts and salaries are unforgiving: a wrong rate, a missed contract type or a mistyped identifier has real consequences for a real person. The system had to make correct entry the easy path.',
          ar: 'عمليات الموارد البشرية للعقود والرواتب لا تحتمل الخطأ: أجر خاطئ أو نوع عقد مُغفَل أو معرّف مكتوب خطأً له أثر حقيقي على شخص حقيقي. فكان على النظام أن يجعل الإدخال الصحيح هو المسار الأسهل.',
        },
      },
      {
        id: 'approach',
        heading: { en: 'What I built', ar: 'ما بنيته' },
        body: {
          en: 'Angular screens for the employee registry, contract handling and salary-related workflows, built on reactive forms with validation carried in the model rather than scattered across templates, and a configuration area so rates, contract types and compensation rules can change without code.',
          ar: 'شاشات Angular لسجل الموظفين وإدارة العقود ومسارات الرواتب، مبنية على النماذج التفاعلية مع تحقق محمول في النموذج لا مبعثر في القوالب، مع قسم إعدادات يتيح تغيير الأجور وأنواع العقود وقواعد التعويض دون كود.',
        },
      },
      {
        id: 'result',
        heading: { en: 'Outcome', ar: 'النتيجة' },
        body: {
          en: 'A delivered enterprise HR system. My responsibility was the frontend architecture and implementation.',
          ar: 'نظام موارد بشرية مؤسسي مُسلَّم. وكانت مسؤوليتي بنية الواجهة الأمامية وتنفيذها.',
        },
      },
    ],
    testimonialIds: ['omar-fallouh', 'mohanad-halabi'],
  },

  {
    id: 'huelle',
    tier: 'featured',
    order: 7,
    name: { en: 'Hülle 2GO', ar: 'Hülle 2GO' },
    descriptor: { en: 'Shopify Storefront', ar: 'متجر Shopify' },
    category: { en: 'Commerce', ar: 'تجارة إلكترونية' },
    status: status.finished,
    role: { en: 'Shopify Development & Storefront UX', ar: 'تطوير Shopify وتجربة المتجر' },
    summary: {
      en: 'A finished commercial storefront for the German mobile-accessory market: theme customization, product presentation and a buying path built for mobile-first customers.',
      ar: 'متجر تجاري منجز للسوق الألمانية في إكسسوارات الهاتف: تخصيص القالب، وعرض المنتجات، ومسار شراء مبني لعملاء يبدأون من الهاتف.',
    },
    stack: ['Shopify', 'Liquid', 'Responsive UI', 'E-commerce UX'],
    deployment: {
      kind: 'public',
      url: 'https://huelle2go.de',
      label: { en: 'Visit store', ar: 'زيارة المتجر' },
    },
    logo: 'Handy.webp',
    caseStudy: [
      {
        id: 'problem',
        heading: { en: 'Brief', ar: 'المطلوب' },
        body: {
          en: 'A German-market accessory brand needed a storefront that reads clearly on a phone and moves a customer from category to checkout without friction.',
          ar: 'احتاجت علامة إكسسوارات في السوق الألمانية متجراً يُقرأ بوضوح على الهاتف وينقل العميل من الفئة إلى الدفع بلا احتكاك.',
        },
      },
      {
        id: 'result',
        heading: { en: 'What I delivered', ar: 'ما سلّمته' },
        body: {
          en: 'Theme customization, product and collection presentation, and a responsive buying flow. This is commercial client work rather than a systems-engineering project, and it sits here for that reason.',
          ar: 'تخصيص القالب، وعرض المنتجات والمجموعات، ومسار شراء متجاوب. هذا عمل تجاري لعميل لا مشروع هندسة أنظمة، ولهذا موقعه هنا.',
        },
      },
    ],
    testimonialIds: ['jamal-halabi'],
  },

  /* -------------------------------------------------------------- archive */
  {
    id: 'phoneparts',
    tier: 'archive',
    order: 8,
    name: { en: 'Phone Parts 2GO', ar: 'Phone Parts 2GO' },
    descriptor: { en: 'B2B Shopify storefront', ar: 'متجر Shopify للأعمال' },
    category: { en: 'Commerce', ar: 'تجارة إلكترونية' },
    status: status.archived,
    role: { en: 'Shopify Development', ar: 'تطوير Shopify' },
    summary: {
      en: 'B2B catalog, bulk pricing and order workflows for the German market. No longer an active project.',
      ar: 'كتالوج للأعمال وتسعير بالجملة ومسارات طلب للسوق الألمانية. لم يعد مشروعاً نشطاً.',
    },
    stack: ['Shopify', 'Liquid'],
    deployment: {
      kind: 'unreleased',
      url: null,
      label: { en: 'No longer active', ar: 'لم يعد نشطاً' },
    },
    caseStudy: [],
    testimonialIds: ['jamal-halabi'],
  },
  {
    id: 'reisekoffer',
    tier: 'archive',
    order: 9,
    name: { en: 'ReiseKoffer 2GO', ar: 'ReiseKoffer 2GO' },
    descriptor: { en: 'B2C Shopify storefront', ar: 'متجر Shopify للأفراد' },
    category: { en: 'Commerce', ar: 'تجارة إلكترونية' },
    status: status.archived,
    role: { en: 'Shopify Development', ar: 'تطوير Shopify' },
    summary: {
      en: 'Luggage catalog and product pages for the German market. No longer an active project.',
      ar: 'كتالوج حقائب وصفحات منتجات للسوق الألمانية. لم يعد مشروعاً نشطاً.',
    },
    stack: ['Shopify', 'Liquid'],
    deployment: {
      kind: 'unreleased',
      url: null,
      label: { en: 'No longer active', ar: 'لم يعد نشطاً' },
    },
    caseStudy: [],
    testimonialIds: ['jamal-halabi'],
  },
];

export const flagshipProject = projects.find((project) => project.tier === 'flagship')!;

export const featuredProjects = projects
  .filter((project) => project.tier === 'featured')
  .sort((a, b) => a.order - b.order);

export const archivedProjects = projects
  .filter((project) => project.tier === 'archive')
  .sort((a, b) => a.order - b.order);

/** Everything shown in the main Work rail, flagship first. */
export const caseStudyProjects = [flagshipProject, ...featuredProjects];

export function projectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
