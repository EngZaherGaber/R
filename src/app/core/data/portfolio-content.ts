export type LanguageCode = 'en' | 'ar';
export type ThemeMode = 'dark' | 'light';
export type PanelId =
  | 'overview'
  | 'projects'
  | 'skills'
  | 'services'
  | 'timeline'
  | 'recommendations'
  | 'contact';
export type ProjectTab = 'preview' | 'architecture' | 'metrics';

export interface AccentColor {
  id: string;
  label: string;
  value: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface NavItem {
  id: PanelId | 'copilot';
  label: string;
  icon: string;
}

export interface PortfolioProject {
  id: string;
  fileName: string;
  name: string;
  type: string;
  category: string;
  status: string;
  image: string;
  summary: string;
  stack: string[];
  features: string[];
  metrics: Metric[];
  images?: string[];
  url?: string;
  featured?: boolean;
  priority?: number;
}

export interface PortfolioSkill {
  id: string;
  name: string;
  group: string;
  level: string;
  icon: string;
  summary: string;
  dependencies: string[];
  projectIds: string[];
}

export interface PortfolioExperience {
  id: string;
  type: 'work' | 'education';
  date: string;
  title: string;
  subtitle: string;
  description: string;
  command: string;
  tags: string[];
}

export interface PortfolioContact {
  id: string;
  label: string;
  value: string;
  icon: string;
  href?: string;
  command: string;
}

export interface PortfolioService {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
  relatedSkillIds: string[];
  relatedProjectIds: string[];
}

export interface PortfolioRecommendation {
  id: string;
  name: string;
  position: string;
  message: string;
  image?: string;
  rating?: number;
  signal: string;
  relatedProjectIds: string[];
}

export interface CoPilotOutput {
  label: string;
  title: string;
  meta: string;
  icon: string;
}

export interface CoPilotContent {
  eyebrow: string;
  title: string;
  description: string;
  prototypeBadge: string;
  digitalBadge: string;
  initialize: string;
  progress: string;
  command: string;
  phases: {
    idea: string;
    relationships: string;
    adaptive: string;
    output: string;
  };
  ideaName: string;
  labTitle: string;
  entities: string[];
  relationshipLabel: string;
  question: string;
  options: string[];
  outputs: CoPilotOutput[];
}

export interface PortfolioContent {
  meta: {
    name: string;
    role: string;
    location: string;
    availability: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryAction: string;
    secondaryAction: string;
    contactAction?: string;
    signalKicker?: string;
    signalProofProjects?: string;
    signalSkillLinks?: string;
    signalLanguages?: string;
    signalProductMindset?: string;
  };
  initialize: string[];
  metrics: Metric[];
  nav: NavItem[];
  panels: Record<PanelId, {
    title: string;
    kicker: string;
    description: string;
  }>;
  projectTabs: Record<ProjectTab, string>;
  projects: PortfolioProject[];
  coPilot: CoPilotContent;
  skillLabels: {
    core: string;
    dependencies: string;
    evidence: string;
    relatedProjects: string;
    proofProjects?: string;
    closeDetails?: string;
  };
  skills: PortfolioSkill[];
  timelineLabels: {
    work: string;
    education: string;
  };
  timeline: PortfolioExperience[];
  contactLabels: {
    availability: string;
    location: string;
    directActions: string;
    copy: string;
    copied: string;
    missionControl?: string;
    transmitting?: string;
    channelReady?: string;
    openingChannel?: string;
    preparingDossier?: string;
    cv?: string;
  };
  contacts: PortfolioContact[];
  serviceLabels: {
    deliverables: string;
    proof: string;
    relatedSkills: string;
    selectedService?: string;
    closeDetails?: string;
  };
  services: PortfolioService[];
  recommendationLabels: {
    signal: string;
    relatedWork: string;
    trustedBy: string;
  };
  recommendations: PortfolioRecommendation[];
}

export const accentColors: AccentColor[] = [
  { id: 'amber', label: 'Amber', value: '#f5b642' },
  { id: 'cyan', label: 'Cyan', value: '#22d3ee' },
  { id: 'emerald', label: 'Emerald', value: '#34d399' },
  { id: 'rose', label: 'Rose', value: '#fb7185' },
  { id: 'violet', label: 'Violet', value: '#a78bfa' },
  { id: 'blue', label: 'Blue', value: '#60a5fa' },
];

const englishProjects: PortfolioProject[] = [
  {
    id: 'tli',
    fileName: 'tower-load-inventory.erp.ts',
    name: 'Tower Load Inventory',
    type: 'ERP System',
    category: 'ERP',
    status: 'Finished',
    image: 'syriatel.webp',
    summary:
      'A Syriatel project designed to manage loads on towers, including space allocation and weight distribution for efficient resource utilization and structural safety.',
    stack: ['Angular', 'ERP UI', 'Data Tables', 'Forms', 'Dashboards'],
    features: ['Tower load tracking', 'Space allocation', 'Weight distribution', 'User graphs'],
    metrics: [
      { value: '5', label: 'Screenshots' },
      { value: 'ERP', label: 'Category' },
      { value: 'Done', label: 'Status' },
    ],
    images: ['TLI/Home.PNG', 'TLI/Login.PNG', 'TLI/site-editor.png', 'TLI/Tree.PNG', 'TLI/UserGraph.PNG'],
    featured: true,
    priority: 1,
  },
  {
    id: 'wf',
    fileName: 'workflow-automation.system.ts',
    name: 'WF System',
    type: 'Workflow Automation',
    category: 'ERP',
    status: 'Finished',
    image: 'wf-logo.webp',
    summary:
      'A dynamic task and request automation system built as a flexible layer that can integrate with existing systems and support customizable management options.',
    stack: ['Angular', 'Workflow UI', 'Dynamic Requests', 'Configuration', 'Graphs'],
    features: ['Request automation', 'Action management', 'Graph templates', 'Holiday workflows'],
    metrics: [
      { value: '4', label: 'Screenshots' },
      { value: 'ERP', label: 'Category' },
      { value: 'Done', label: 'Status' },
    ],
    images: ['WF/Action.PNG', 'WF/GraphTemplate.PNG', 'WF/Holiday.png', 'WF/Request.PNG'],
    featured: true,
    priority: 2,
  },
  {
    id: 'undp',
    fileName: 'undp-employee-management.erp.ts',
    name: 'UNDP Employee Management',
    type: 'HR Management System',
    category: 'ERP',
    status: 'Finished',
    image: 'un-logo.webp',
    summary:
      'A United Nations system for managing employee contracts, calculating salaries, and streamlining HR processes.',
    stack: ['Angular', 'HR UI', 'Contracts', 'Salary Flows', 'Forms'],
    features: ['Employee records', 'Contract management', 'Salary calculations', 'HR workflow screens'],
    metrics: [
      { value: '3', label: 'Screenshots' },
      { value: 'ERP', label: 'Category' },
      { value: 'Done', label: 'Status' },
    ],
    images: ['UN/Login.PNG', 'UN/Employee.PNG', 'UN/Land.PNG'],
    featured: true,
    priority: 3,
  },
  {
    id: 'phoneparts',
    fileName: 'phone-parts-2go.shopify.ts',
    name: 'Phone Parts 2GO',
    type: 'B2B E-commerce',
    category: 'Freelance',
    status: 'In Development',
    image: '2go.svg',
    summary:
      'An advanced B2B Shopify e-commerce platform for the German market, focused on mobile phone parts, catalog management, bulk pricing, order tracking, and customer relationship workflows.',
    stack: ['Shopify', 'Liquid', 'E-commerce UX', 'Catalogs', 'B2B'],
    features: ['Product catalog', 'Bulk pricing', 'Order tracking', 'Customer workflows'],
    metrics: [
      { value: 'B2B', label: 'Market' },
      { value: 'DE', label: 'Region' },
      { value: 'Dev', label: 'Status' },
    ],
    url: 'https://phoneparts2go.com/',
    priority: 5,
  },
  {
    id: 'huelle',
    fileName: 'huelle-2go.shopify.ts',
    name: 'Hulle 2GO',
    type: 'B2C E-commerce',
    category: 'Freelance',
    status: 'In Development',
    image: 'Handy.webp',
    summary:
      'A B2C Shopify e-commerce platform for the German market, designed around mobile phone accessories and a clear buying experience.',
    stack: ['Shopify', 'Liquid', 'Storefront UX', 'Responsive UI', 'B2C'],
    features: ['Storefront design', 'Product presentation', 'Responsive commerce', 'Customer journey'],
    metrics: [
      { value: 'B2C', label: 'Market' },
      { value: 'DE', label: 'Region' },
      { value: 'Dev', label: 'Status' },
    ],
    url: 'https://huelle2go.de',
    priority: 6,
  },
  {
    id: 'reisekoffer',
    fileName: 'reisekoffer-2go.shopify.ts',
    name: 'ReiseKoffer 2GO',
    type: 'B2C E-commerce',
    category: 'Freelance',
    status: 'In Development',
    image: 'ReiseKoffer.webp',
    summary:
      'A Shopify-based B2C storefront for the German market focused on suitcases, product catalog flows, and responsive shopping interactions.',
    stack: ['Shopify', 'Liquid', 'Catalog UX', 'Responsive UI', 'B2C'],
    features: ['Suitcase catalog', 'Product pages', 'Responsive storefront', 'Shopping flow'],
    metrics: [
      { value: 'B2C', label: 'Market' },
      { value: 'DE', label: 'Region' },
      { value: 'Dev', label: 'Status' },
    ],
    url: 'https://huelle2go.de/password',
    priority: 7,
  },
  {
    id: 'tms',
    fileName: 'tender-management.system.ts',
    name: 'Tender Management System',
    type: 'Tender Management Platform',
    category: 'ERP',
    status: 'Finished',
    image: 'tms.webp',
    summary:
      'A centralized platform for streamlining tender management from tender creation and publication to bid submission, evaluation, and award.',
    stack: ['Angular', 'ERP UI', 'Workflow Screens', 'Forms', 'Compliance UX'],
    features: ['Tender creation', 'Bid submission', 'Evaluation flows', 'Award workflows'],
    metrics: [
      { value: 'ERP', label: 'Category' },
      { value: 'Flow', label: 'Core UX' },
      { value: 'Done', label: 'Status' },
    ],
    featured: true,
    priority: 4,
  },
];

const englishSkills: PortfolioSkill[] = [
  {
    id: 'ngrx',
    name: 'NgRx',
    group: 'State Management',
    level: 'Advanced',
    icon: 'ngrx.webp',
    summary:
      'Building scalable and maintainable application state with actions, reducers, and effects for predictable data flow.',
    dependencies: ['Actions', 'Reducers', 'Effects', 'Selectors'],
    projectIds: ['tli', 'wf', 'tms'],
  },
  {
    id: 'rxjs',
    name: 'RxJS',
    group: 'Reactive Data',
    level: 'Strong',
    icon: 'rxjs.webp',
    summary:
      'Handling asynchronous data streams with Observables, Subjects, and operators for responsive Angular interfaces.',
    dependencies: ['Observables', 'Subjects', 'Operators', 'Async UI'],
    projectIds: ['wf', 'tli', 'tms'],
  },
  {
    id: 'material',
    name: 'Angular Material',
    group: 'UI Libraries',
    level: 'Strong',
    icon: 'material.webp',
    summary:
      'Designing responsive and accessible Angular interfaces using Material components, custom themes, and reusable UI patterns.',
    dependencies: ['Themes', 'Accessible Components', 'Dialogs', 'Tables'],
    projectIds: ['undp', 'tms'],
  },
  {
    id: 'primeng',
    name: 'PrimeNG',
    group: 'UI Libraries',
    level: 'Advanced',
    icon: 'primeng.webp',
    summary:
      'Delivering enterprise-grade interfaces with rich components such as data tables, charts, calendars, and dynamic panels.',
    dependencies: ['Tables', 'Charts', 'Calendars', 'Enterprise UI'],
    projectIds: ['tli', 'wf', 'tms'],
  },
  {
    id: 'zorro',
    name: 'NG-ZORRO',
    group: 'UI Libraries',
    level: 'Working',
    icon: 'zorro.webp',
    summary:
      'Crafting professional Ant Design-based Angular interfaces for complex application screens and clear user flows.',
    dependencies: ['Ant Design', 'Components', 'Forms', 'Navigation'],
    projectIds: ['tms'],
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    group: 'Responsive UI',
    level: 'Strong',
    icon: 'bootstrap.webp',
    summary:
      'Building responsive, mobile-first layouts with grids, utilities, and customized components across devices.',
    dependencies: ['Grid', 'Utilities', 'Responsive Layouts'],
    projectIds: ['phoneparts', 'huelle', 'reisekoffer'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    group: 'Responsive UI',
    level: 'Strong',
    icon: 'tailwind.webp',
    summary:
      'Creating customizable interfaces with utility-first CSS, reusable patterns, and fast prototyping workflows.',
    dependencies: ['Utilities', 'Design Tokens', 'Responsive Styling'],
    projectIds: ['phoneparts', 'huelle', 'reisekoffer'],
  },
  {
    id: 'animations',
    name: 'Angular Animations',
    group: 'Interaction',
    level: 'Strong',
    icon: 'animation.webp',
    summary:
      'Designing smooth transitions and micro-interactions that improve usability without making the interface heavy.',
    dependencies: ['Transitions', 'State Changes', 'Micro-interactions'],
    projectIds: ['tli', 'wf', 'tms'],
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    group: 'API Integration',
    level: 'Working',
    icon: 'graphql.webp',
    summary:
      'Integrating GraphQL APIs with Apollo Angular to reduce over-fetching and structure efficient queries and mutations.',
    dependencies: ['Apollo Angular', 'Queries', 'Mutations', 'Subscriptions'],
    projectIds: ['tms'],
  },
  {
    id: 'forms',
    name: 'Complex Dynamic Forms',
    group: 'Application Logic',
    level: 'Advanced',
    icon: 'angular.webp',
    summary:
      'Building sophisticated dynamic forms with validators, conditional logic, and reactive or template-driven controls.',
    dependencies: ['Reactive Forms', 'Validators', 'Conditional Logic'],
    projectIds: ['undp', 'wf', 'tms'],
  },
  {
    id: 'shopify',
    name: 'Shopify',
    group: 'E-commerce',
    level: 'Strong',
    icon: 'shopify.webp',
    summary:
      'Developing and customizing Shopify storefronts with responsive themes, payment-ready flows, and optimized commerce UX.',
    dependencies: ['Liquid', 'Storefronts', 'Product Catalogs', 'Commerce UX'],
    projectIds: ['phoneparts', 'huelle', 'reisekoffer'],
  },
];

const englishTimeline: PortfolioExperience[] = [
  {
    id: 'freelance-angular',
    type: 'work',
    date: 'Apr 2021 - current',
    title: 'Front-end Developer',
    subtitle: 'Freelancer',
    description:
      'Delivered freelance Angular projects, creating responsive and user-friendly web applications while translating client requirements into scalable solutions.',
    command: 'feat(freelance): ship responsive Angular applications',
    tags: ['Angular', 'Responsive UI', 'Client Work'],
  },
  {
    id: 'ici',
    type: 'work',
    date: 'Jun 2023 - current',
    title: 'Front-end Team Leader',
    subtitle: 'IC&I',
    description:
      'Led a front-end team across Angular-based projects from design to deployment, mentoring junior developers and maintaining code quality.',
    command: 'lead(frontend): guide Angular projects from design to deployment',
    tags: ['Team Leadership', 'Angular', 'Code Quality'],
  },
  {
    id: 'shopify-dev',
    type: 'work',
    date: 'May 2024 - current',
    title: 'Shopify Development',
    subtitle: 'Freelancer',
    description:
      'Developed custom Shopify themes and apps, integrated third-party APIs, optimized storefront performance, and improved user experiences.',
    command: 'feat(shopify): build custom storefront experiences',
    tags: ['Shopify', 'Liquid', 'E-commerce'],
  },
  {
    id: 'svu',
    type: 'education',
    date: '2020 - current',
    title: 'Information Technology Engineer',
    subtitle: 'Syrian Virtual University',
    description:
      'Focused on software development, system design, and advanced programming while building scalable and efficient applications.',
    command: 'study(engineering): software development and system design',
    tags: ['Software', 'System Design', 'Programming'],
  },
  {
    id: 'unrwa',
    type: 'education',
    date: '2020 - 2022',
    title: 'Information Technology',
    subtitle: 'Damascus Training Center (UNRWA)',
    description:
      'Covered programming fundamentals, web development, and database management with practical dynamic application work.',
    command: 'study(it): fundamentals, web development, databases',
    tags: ['Web Development', 'Databases', 'Fundamentals'],
  },
];

const englishContacts: PortfolioContact[] = [
  { id: 'country', label: 'Country', value: 'Syria', icon: 'bi bi-flag', command: 'geo.country --value Syria' },
  { id: 'city', label: 'City', value: 'Damascus', icon: 'bi bi-buildings', command: 'geo.city --value Damascus' },
  { id: 'region', label: 'Region', value: 'Jdydat-Artouz', icon: 'bi bi-geo-alt', command: 'geo.region --value Jdydat-Artouz' },
  {
    id: 'email',
    label: 'Email',
    value: 'eng.zaher.japr@gmail.com',
    icon: 'bi bi-envelope',
    href: 'mailto:eng.zaher.japr@gmail.com',
    command: 'contact.email --open',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    value: '@ZaGa97',
    icon: 'bi bi-send',
    href: 'https://t.me/ZaGa97',
    command: 'contact.telegram --open',
  },
  {
    id: 'phone',
    label: 'Phone Number',
    value: '+963 934 299 721',
    icon: 'bi bi-telephone',
    href: 'tel:+963934299721',
    command: 'contact.phone --dial',
  },
];

const englishServices: PortfolioService[] = [
  {
    id: 'angular-apps',
    title: 'Modern Angular Applications',
    description:
      'Custom Angular applications built for speed, scalability, clean UI structure, and long-term maintainability.',
    icon: 'bi bi-window-stack',
    deliverables: ['Feature architecture', 'Reusable components', 'Responsive app shell'],
    relatedSkillIds: ['ngrx', 'rxjs', 'forms'],
    relatedProjectIds: ['tli', 'wf', 'tms'],
  },
  {
    id: 'revamp',
    title: 'Repair and Revamp Existing Apps',
    description:
      'Diagnose slow, outdated, or buggy interfaces, then rebuild the weak parts into cleaner and faster experiences.',
    icon: 'bi bi-tools',
    deliverables: ['UI audit', 'Code cleanup', 'Performance fixes'],
    relatedSkillIds: ['rxjs', 'primeng', 'animations'],
    relatedProjectIds: ['wf', 'undp'],
  },
  {
    id: 'responsive-ui',
    title: 'Responsive Interface Design',
    description:
      'Design polished, mobile-friendly interfaces that keep complex screens readable and comfortable to use.',
    icon: 'bi bi-layout-wtf',
    deliverables: ['Responsive layouts', 'Design tokens', 'Accessible states'],
    relatedSkillIds: ['material', 'bootstrap', 'tailwind'],
    relatedProjectIds: ['undp', 'phoneparts', 'huelle'],
  },
  {
    id: 'backend-integration',
    title: 'API and Backend Integration',
    description:
      'Connect frontends to backend systems with clear service layers, predictable data flow, and real-time-ready UI states.',
    icon: 'bi bi-diagram-3',
    deliverables: ['Service layer', 'Data states', 'Error handling'],
    relatedSkillIds: ['rxjs', 'graphql', 'ngrx'],
    relatedProjectIds: ['tli', 'wf', 'tms'],
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    description:
      'Improve load time, interaction smoothness, bundle awareness, and Lighthouse-oriented frontend quality.',
    icon: 'bi bi-speedometer2',
    deliverables: ['Bundle review', 'Lazy loading', 'Asset optimization'],
    relatedSkillIds: ['animations', 'rxjs', 'tailwind'],
    relatedProjectIds: ['phoneparts', 'huelle', 'reisekoffer'],
  },
  {
    id: 'pwa',
    title: 'Progressive Web App Experience',
    description:
      'Transform web apps into app-like experiences with offline-friendly thinking, fast flows, and mobile-first behavior.',
    icon: 'bi bi-phone',
    deliverables: ['PWA-ready layout', 'Mobile UX', 'Offline strategy'],
    relatedSkillIds: ['forms', 'bootstrap', 'tailwind'],
    relatedProjectIds: ['phoneparts', 'huelle'],
  },
];

const englishRecommendations: PortfolioRecommendation[] = [
  {
    id: 'omar-fallouh',
    name: 'Omar Fallouh',
    position: 'CEO (IC&I)',
    signal: 'Enterprise Angular and multilingual delivery',
    message:
      'Eng. Zaher was instrumental in our UN project, delivering a secure Angular solution with micro-frontend architecture. His expertise in RxJS optimization and NgRx state management enabled high-performance multilingual interfaces. A strategic thinker who excels in cross-cultural environments and enterprise-scale challenges.',
    relatedProjectIds: ['undp'],
  },
  {
    id: 'motaz-halabi',
    name: 'Motaz Al-Halabi',
    position: 'Project Manager (IDS)',
    signal: 'Leadership across TLIS and workflow systems',
    message:
      "As Zaher's direct manager at IDS, I had the pleasure of seeing his growth as a Front-End Angular Team Leader. He played a key role in delivering critical projects such as the TLIS system for Syriatel and our Workflow Automation System. Zaher consistently demonstrates technical mastery in Angular, strong leadership, and the ability to translate complex requirements into clean, maintainable code. He leads with integrity and inspires his team to exceed expectations.",
    relatedProjectIds: ['tli', 'wf'],
  },
  {
    id: 'mohanad-halabi',
    name: 'Mohanad Al-Halabi',
    position: 'Executive Manager (IC&I)',
    signal: 'Communication, mentoring, and delivery under pressure',
    message:
      'Eng. Zaher combines technical excellence with outstanding leadership skills. His ability to communicate clearly, mentor team members, and maintain professionalism under pressure makes him invaluable. Zaher fosters collaboration and consistently delivers results while keeping team morale high.',
    image: 'Mohanad.webp',
    rating: 5,
    relatedProjectIds: ['undp'],
  },
  {
    id: 'jamal-halabi',
    name: 'Jamal Al-Halabi',
    position: 'Founder & Owner (2GO Group)',
    signal: 'Shopify ecosystem growth across 2GO brands',
    message:
      'Eng. Zaher has been the backbone of our e-commerce ecosystem across all 2GO brands, including Phone Parts 2GO, Hulle 2GO, and ReiseKoffer 2GO. His deep knowledge of Shopify development, attention to detail, and ability to deliver scalable, customized solutions have significantly boosted our online performance. Zaher understands both technology and business needs, making him an essential part of our growth journey.',
    image: 'jamal.webp',
    relatedProjectIds: ['phoneparts', 'huelle', 'reisekoffer'],
  },
];

export const portfolioContent: Record<LanguageCode, PortfolioContent> = {
  en: {
    meta: {
      name: 'Zaher Jabr',
      role: 'Angular Frontend Engineer',
      location: 'Syria',
      availability: 'Open to freelance and product work',
    },
    hero: {
      eyebrow: 'Personal IDE Portfolio',
      title: 'I build scalable Angular systems with a product-minded UI.',
      subtitle:
        'A fast, bilingual workspace for exploring projects, skills, architecture, and the way I ship clean interfaces.',
      primaryAction: 'Explore projects',
      secondaryAction: 'Download CV',
      contactAction: 'Contact',
      signalKicker: 'Product story signals',
      signalProofProjects: 'Proof projects',
      signalSkillLinks: 'Skill links',
      signalLanguages: 'Languages',
      signalProductMindset: 'Product-minded',
    },
    initialize: ['profile indexed', 'projects mapped', 'skills linked', 'workspace ready'],
    metrics: [
      { value: '3+', label: 'Years Experience' },
      { value: '7', label: 'Featured Projects' },
      { value: '11', label: 'Core Skills' },
      { value: '2', label: 'Education Tracks' },
    ],
    nav: [
      { id: 'overview', label: 'Overview', icon: 'bi bi-house' },
      { id: 'projects', label: 'Projects', icon: 'bi bi-folder2-open' },
      { id: 'copilot', label: 'Co-Pilot', icon: 'bi bi-cpu' },
      { id: 'skills', label: 'Skills', icon: 'bi bi-diagram-3' },
      { id: 'services', label: 'Services', icon: 'bi bi-grid-1x2' },
      { id: 'timeline', label: 'Timeline', icon: 'bi bi-git' },
      { id: 'recommendations', label: 'Trust', icon: 'bi bi-chat-quote' },
      { id: 'contact', label: 'Contact', icon: 'bi bi-send' },
    ],
    panels: {
      overview: {
        title: 'Workspace Overview',
        kicker: 'Shell Initialize',
        description:
          'The new portfolio starts as a product-like workspace: state-driven panels, bilingual content, theme controls, and performance-aware motion.',
      },
      projects: {
        title: 'Interactive Repository',
        kicker: 'Project Index',
        description:
          'Projects are presented as repository files with previews, stack, features, screenshots, links, and practical context.',
      },
      skills: {
        title: 'Skill Dependency Graph',
        kicker: 'Skill Map',
        description:
          'Skills are connected to real projects so every technology has evidence instead of decorative percentages.',
      },
      services: {
        title: 'Service Blueprints',
        kicker: 'What I Build',
        description:
          'Services are mapped as practical delivery blueprints connected to real skills and portfolio projects.',
      },
      timeline: {
        title: 'Git Commit History',
        kicker: 'Experience Log',
        description:
          'Experience and education are displayed as commit-style milestones with technologies and outcomes.',
      },
      recommendations: {
        title: 'Private Trust Signals',
        kicker: 'Recommendations',
        description:
          'Recommendations are presented as proof signals connected to real projects, leadership, and business outcomes.',
      },
      contact: {
        title: 'Contact Terminal',
        kicker: 'Next Section',
        description:
          'The contact area will feel like a focused terminal panel with direct actions for email, Telegram, phone, and CV.',
      },
    },
    projectTabs: {
      preview: 'Preview',
      architecture: 'Details',
      metrics: 'Signals',
    },
    projects: englishProjects,
    coPilot: {
      eyebrow: 'Development Prototype: Active Build',
      title: 'The Co-Pilot Engine',
      description:
        'An internal project builder that reads an idea seed, maps entity relationships, asks the missing architecture questions, then prepares API, web, and mobile outputs.',
      prototypeBadge: 'Active Build',
      digitalBadge: 'Digital',
      initialize: 'Initialize Engine',
      progress: 'Development: 75% complete',
      command: '[EXE] co-pilot.preview --dev',
      phases: {
        idea: 'Idea Seed',
        relationships: 'Entity Relationships',
        adaptive: 'Adaptive Questions',
        output: 'Autonomous Output',
      },
      ideaName: 'E-Commerce App',
      labTitle: 'Interactive Product Story',
      entities: ['PRODUCT', 'USER', 'ORDER'],
      relationshipLabel: 'one-to-many',
      question: 'Authentication needed?',
      options: ['OAuth', 'JWT', 'Skip'],
      outputs: [
        { label: 'WEB', title: 'Nest.js + DB API', meta: 'API', icon: 'bi bi-hdd-network' },
        { label: 'ANGULAR WEB', title: 'Angular Web UI', meta: 'A', icon: 'bi bi-shield-fill' },
        { label: 'IONIC MOBILE', title: 'Ionic Mobile UI', meta: 'I', icon: 'bi bi-phone' },
      ],
    },
    skillLabels: {
      core: 'Core Node',
      dependencies: 'Dependencies',
      evidence: 'Evidence',
      relatedProjects: 'Related Projects',
      proofProjects: 'Proof Projects',
      closeDetails: 'Close skill details',
    },
    skills: englishSkills,
    timelineLabels: {
      work: 'Work',
      education: 'Education',
    },
    timeline: englishTimeline,
    contactLabels: {
      availability: 'Available for focused Angular, ERP, and e-commerce interface work.',
      location: 'Location',
      directActions: 'Direct Actions',
      copy: 'Copy email',
      copied: 'Copied',
      missionControl: 'mission.control',
      transmitting: 'Transmitting...',
      channelReady: 'channel ready',
      openingChannel: 'Opening channel...',
      preparingDossier: 'Preparing dossier...',
      cv: 'CV',
    },
    contacts: englishContacts,
    serviceLabels: {
      deliverables: 'Deliverables',
      proof: 'Proof Projects',
      relatedSkills: 'Related Skills',
      selectedService: 'Selected service',
      closeDetails: 'Close service details',
    },
    services: englishServices,
    recommendationLabels: {
      signal: 'Signal',
      relatedWork: 'Related Work',
      trustedBy: 'Trusted By',
    },
    recommendations: englishRecommendations,
  },
  ar: {
    meta: {
      name: 'زاهر جبر',
      role: 'مهندس واجهات Angular',
      location: 'سوريا',
      availability: 'متاح لأعمال حرة ومشاريع منتج',
    },
    hero: {
      eyebrow: 'Portfolio كبيئة تطوير شخصية',
      title: 'أبني أنظمة Angular قابلة للتوسع بواجهة تفكر كمنتج.',
      subtitle:
        'مساحة عمل سريعة تدعم اللغتين لاستكشاف المشاريع، المهارات، البنية التقنية، وطريقة بناء واجهات نظيفة.',
      primaryAction: 'استكشف المشاريع',
      secondaryAction: 'تحميل السيرة',
    },
    initialize: ['تم فهرسة الملف الشخصي', 'تم ربط المشاريع', 'تم تحليل المهارات', 'النظام جاهز'],
    metrics: [
      { value: '+3', label: 'سنوات خبرة' },
      { value: '7', label: 'مشاريع مميزة' },
      { value: '11', label: 'مهارات أساسية' },
      { value: '2', label: 'مسارات تعليمية' },
    ],
    nav: [
      { id: 'overview', label: 'نظرة', icon: 'bi bi-house' },
      { id: 'projects', label: 'المشاريع', icon: 'bi bi-folder2-open' },
      { id: 'skills', label: 'المهارات', icon: 'bi bi-diagram-3' },
      { id: 'services', label: '???????', icon: 'bi bi-grid-1x2' },
      { id: 'timeline', label: 'المسار', icon: 'bi bi-git' },
      { id: 'recommendations', label: '????????', icon: 'bi bi-chat-quote' },
      { id: 'contact', label: 'تواصل', icon: 'bi bi-send' },
    ],
    panels: {
      overview: {
        title: 'نظرة على مساحة العمل',
        kicker: 'تهيئة الواجهة',
        description:
          'البورتفوليو الجديد يبدأ كتجربة منتج: نوافذ تقاد بالحالة، محتوى ثنائي اللغة، تحكم كامل بالثيم، وحركة محسوبة للأداء.',
      },
      projects: {
        title: 'مستودع مشاريع تفاعلي',
        kicker: 'فهرس المشاريع',
        description:
          'تعرض المشاريع كملفات داخل مستودع مع معاينة، التقنيات، الميزات، الصور، الروابط، والسياق العملي.',
      },
      skills: {
        title: 'شبكة اعتماد المهارات',
        kicker: 'خريطة المهارات',
        description:
          'كل مهارة مرتبطة بمشاريع حقيقية حتى تظهر التقنية بدليل عملي، لا كنسبة زخرفية.',
      },
      services: {
        title: '?????? ???????',
        kicker: '???? ????',
        description:
          '??????? ?????? ??????? ????? ????? ?????? ????????? ????????? ????????.',
      },
      timeline: {
        title: 'سجل Git للخبرة',
        kicker: 'سجل الخبرة',
        description:
          'تعرض الخبرة والتعليم كمحطات شبيهة بالـ commits مع التقنيات والنتائج.',
      },
      recommendations: {
        title: '?????? ?????',
        kicker: '????????',
        description:
          '???????? ?????? ??????? ??? ?????? ????????? ???????? ???????? ????????.',
      },
      contact: {
        title: 'طرفية التواصل',
        kicker: 'القسم التالي',
        description:
          'قسم التواصل سيكون panel مركزًا بأوامر مباشرة للبريد، تيليغرام، الهاتف، وتحميل السيرة.',
      },
    },
    projectTabs: {
      preview: 'معاينة',
      architecture: 'التفاصيل',
      metrics: 'المؤشرات',
    },
    projects: englishProjects,
    coPilot: {
      eyebrow: 'نموذج قيد التطوير: بناء نشط',
      title: 'محرك Co-Pilot',
      description:
        'أداة داخلية قيد التطوير تقرأ فكرة المشروع، تربط الكيانات، تسأل أسئلة هندسية تكيفية، ثم تجهز مخرجات API وواجهة Web وتطبيق Mobile.',
      prototypeBadge: 'بناء نشط',
      digitalBadge: 'رقمي',
      initialize: 'تشغيل المحرك',
      progress: 'التطوير: 75% مكتمل',
      command: '[EXE] co-pilot.preview --dev',
      phases: {
        idea: 'بذرة الفكرة',
        relationships: 'علاقات الكيانات',
        adaptive: 'أسئلة تكيفية',
        output: 'مخرجات تلقائية',
      },
      ideaName: 'تطبيق متجر إلكتروني',
      labTitle: 'قصة منتج تفاعلية',
      entities: ['PRODUCT', 'USER', 'ORDER'],
      relationshipLabel: 'واحد إلى متعدد',
      question: 'هل نحتاج تسجيل دخول؟',
      options: ['OAuth', 'JWT', 'تخطي'],
      outputs: [
        { label: 'WEB', title: 'Nest.js + DB API', meta: 'API', icon: 'bi bi-hdd-network' },
        { label: 'ANGULAR WEB', title: 'Angular Web UI', meta: 'A', icon: 'bi bi-shield-fill' },
        { label: 'IONIC MOBILE', title: 'Ionic Mobile UI', meta: 'I', icon: 'bi bi-phone' },
      ],
    },
    skillLabels: {
      core: 'عقدة رئيسية',
      dependencies: 'الاعتمادات',
      evidence: 'الدليل العملي',
      relatedProjects: 'المشاريع المرتبطة',
    },
    skills: englishSkills,
    timelineLabels: {
      work: 'عمل',
      education: 'تعليم',
    },
    timeline: englishTimeline,
    contactLabels: {
      availability: 'متاح لأعمال Angular وواجهات ERP والتجارة الإلكترونية.',
      location: 'الموقع',
      directActions: 'إجراءات مباشرة',
      copy: 'نسخ البريد',
      copied: 'تم النسخ',
    },
    contacts: [
      { ...englishContacts[0], label: 'الدولة' },
      { ...englishContacts[1], label: 'المدينة' },
      { ...englishContacts[2], label: 'المنطقة' },
      { ...englishContacts[3], label: 'البريد الإلكتروني' },
      { ...englishContacts[4], label: 'تيليغرام' },
      { ...englishContacts[5], label: 'رقم الهاتف' },
    ],
    serviceLabels: {
      deliverables: '????????',
      proof: '?????? ???? ??????',
      relatedSkills: '???????? ????????',
    },
    services: englishServices,
    recommendationLabels: {
      signal: '???????',
      relatedWork: '??????? ????????',
      trustedBy: '???? ??',
    },
    recommendations: englishRecommendations,
  },
};

Object.assign(portfolioContent.ar.meta, {
  name: 'زاهر جبر',
  role: 'مهندس واجهات Angular',
  location: 'سوريا',
  availability: 'متاح لأعمال Angular وواجهات المنتجات والتجارة الإلكترونية',
});

Object.assign(portfolioContent.ar.hero, {
  eyebrow: 'Portfolio كتجربة منتج تفاعلية',
  title: 'أبني أنظمة Angular قابلة للتوسع بواجهة تفكر كمنتج.',
  subtitle:
    'مساحة واحدة لاستكشاف المشاريع والمهارات والخدمات والثقة، مبنية كسرد تفاعلي سريع يدعم العربية والإنجليزية.',
  primaryAction: 'استكشف الأعمال',
  secondaryAction: 'تحميل السيرة الذاتية',
  contactAction: 'تواصل',
  signalKicker: 'إشارات القصة',
  signalProofProjects: 'مشاريع مثبتة',
  signalSkillLinks: 'روابط مهارية',
  signalLanguages: 'لغات',
  signalProductMindset: 'تفكير منتجي',
});

portfolioContent.ar.initialize = [
  'تم تحميل الملف الشخصي',
  'تم ربط المشاريع بالمهارات',
  'تم تجهيز تجربة السرد',
  'المسار جاهز',
];

portfolioContent.ar.metrics = [
  { value: '+3', label: 'سنوات خبرة' },
  { value: '7', label: 'مشاريع مهمة' },
  { value: '11', label: 'مهارات أساسية' },
  { value: '2', label: 'مسارات تعليمية' },
];

portfolioContent.ar.nav = [
  { id: 'overview', label: 'البداية', icon: 'bi bi-house' },
  { id: 'projects', label: 'المشاريع', icon: 'bi bi-folder2-open' },
  { id: 'skills', label: 'المهارات', icon: 'bi bi-diagram-3' },
  { id: 'services', label: 'الخدمات', icon: 'bi bi-grid-1x2' },
  { id: 'timeline', label: 'الخبرة', icon: 'bi bi-git' },
  { id: 'recommendations', label: 'الثقة', icon: 'bi bi-chat-quote' },
  { id: 'contact', label: 'التواصل', icon: 'bi bi-send' },
];

portfolioContent.ar.nav = [
  portfolioContent.ar.nav[0],
  portfolioContent.ar.nav[1],
  { id: 'copilot', label: 'Co-Pilot', icon: 'bi bi-cpu' },
  ...portfolioContent.ar.nav.slice(2),
];

Object.assign(portfolioContent.ar.panels, {
  overview: {
    title: 'بداية القصة',
    kicker: 'تعريف سريع',
    description: 'مقدمة تفاعلية تعرض من أنا وما الذي أبنيه ولماذا ترتبط المشاريع بالمهارات والخدمات.',
  },
  projects: {
    title: 'قصص المشاريع',
    kicker: 'دليل عملي',
    description:
      'المشاريع تظهر كدراسات حالة متحركة توضح النوع والوصف والتقنيات والميزات والمؤشرات والصور المتاحة.',
  },
  skills: {
    title: 'دليل المهارات',
    kicker: 'Evidence Matrix',
    description: 'كل مهارة مرتبطة بمشاريع حقيقية بدلاً من نسب مئوية زخرفية.',
  },
  services: {
    title: 'عروض خدمات عملية',
    kicker: 'ما أقدمه',
    description: 'خدمات تقنية واضحة مرتبطة بمهارات ومشاريع تثبت القدرة على التنفيذ.',
  },
  timeline: {
    title: 'سجل الخبرة كـ Git',
    kicker: 'Commit History',
    description: 'الخبرة والتعليم معروضان كمحطات تشبه commits برسائل مختصرة وتواريخ ووسوم.',
  },
  recommendations: {
    title: 'إشارات ثقة خاصة',
    kicker: 'توصيات',
    description: 'توصيات مرتبطة بسياق عمل أو مشروع، مع عرض هادئ يحافظ على الخصوصية والمصداقية.',
  },
  contact: {
    title: 'أوامر التواصل',
    kicker: 'Command Palette',
    description: 'نهاية مركزة للتواصل عبر البريد وتيليغرام والهاتف وتحميل السيرة الذاتية.',
  },
});

Object.assign(portfolioContent.ar.panels, {
  copilot: {
    title: 'محرك Co-Pilot',
    kicker: 'نموذج قيد التطوير',
    description:
      'مختبر الهندسة الذي يحول الفكرة والكيانات والأسئلة التكيفية إلى API وواجهة Web وتطبيق Mobile.',
  },
});

Object.assign(portfolioContent.ar.skillLabels, {
  core: 'المهارة',
  dependencies: 'التقنيات المرتبطة',
  evidence: 'الدليل العملي',
  relatedProjects: 'المشاريع المرتبطة',
  proofProjects: 'مشاريع مثبتة',
  closeDetails: 'إغلاق تفاصيل المهارة',
});

Object.assign(portfolioContent.ar.timelineLabels, {
  work: 'عمل',
  education: 'تعليم',
});

Object.assign(portfolioContent.ar.contactLabels, {
  availability: 'متاح لأعمال Angular وواجهات ERP والتجارة الإلكترونية بشكل مركز وعملي.',
  location: 'الموقع',
  directActions: 'إجراءات مباشرة',
  copy: 'نسخ البريد',
  copied: 'تم النسخ',
  missionControl: 'لوحة التحكم',
  transmitting: 'جار الإرسال...',
  channelReady: 'القناة جاهزة',
  openingChannel: 'جار فتح القناة...',
  preparingDossier: 'جار تجهيز الملف...',
  cv: 'السيرة',
});

portfolioContent.ar.contacts = [
  { ...englishContacts[0], label: 'الدولة' },
  { ...englishContacts[1], label: 'المدينة' },
  { ...englishContacts[2], label: 'المنطقة' },
  { ...englishContacts[3], label: 'البريد الإلكتروني' },
  { ...englishContacts[4], label: 'تيليغرام' },
  { ...englishContacts[5], label: 'رقم الهاتف' },
];

Object.assign(portfolioContent.ar.serviceLabels, {
  deliverables: 'ما يستلمه العميل',
  proof: 'مشاريع تثبت الخدمة',
  relatedSkills: 'المهارات المرتبطة',
  selectedService: 'الخدمة المختارة',
  closeDetails: 'إغلاق تفاصيل الخدمة',
});

Object.assign(portfolioContent.ar.recommendationLabels, {
  signal: 'إشارة الثقة',
  relatedWork: 'العمل المرتبط',
  trustedBy: 'موصى به من',
});
