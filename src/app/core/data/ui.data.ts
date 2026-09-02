import { LocalizedText } from '../models/portfolio.model';

/** Every chrome / label string in the app, in both languages. */
export const ui = {
  hero: {
    eyebrow: {
      en: 'Full-Stack Angular Engineer',
      ar: 'مهندس Full-Stack بخبرة أساسية في Angular',
    },
    employmentLabel: { en: 'Currently', ar: 'حالياً' },
    stackLabel: { en: 'Core ecosystem', ar: 'المنظومة الأساسية' },
    primaryCta: { en: 'View selected work', ar: 'شاهد الأعمال المختارة' },
    secondaryCta: { en: 'Download CV', ar: 'تحميل السيرة الذاتية' },
    tertiaryCta: { en: 'Contact me', ar: 'تواصل معي' },
    diagramLabel: {
      en: 'How I build: one Nx workspace holding web, mobile and API over a shared database.',
      ar: 'كيف أبني: مساحة عمل Nx واحدة تضم الويب والموبايل والـ API فوق قاعدة بيانات مشتركة.',
    },
  },

  work: {
    kicker: { en: 'Selected work', ar: 'أعمال مختارة' },
    title: { en: 'Systems I designed, rebuilt, or shipped', ar: 'أنظمة صمّمتها أو أعدت بناءها أو سلّمتها' },
    description: {
      en: 'Ordered by what they say about my engineering, not by date.',
      ar: 'مرتّبة بحسب ما تقوله عن هندستي، لا بحسب التاريخ.',
    },
    flagshipBadge: { en: 'Flagship project', ar: 'المشروع الأبرز' },
    selectLabel: { en: 'Choose a project', ar: 'اختر مشروعاً' },
    roleLabel: { en: 'My role', ar: 'دوري' },
    clientLabel: { en: 'Client', ar: 'العميل' },
    stackLabel: { en: 'Stack', ar: 'التقنيات' },
    statusLabel: { en: 'Status', ar: 'الحالة' },
    indexLabel: { en: 'Project index', ar: 'فهرس المشاريع' },
    panelLabels: {
      overview: { en: 'Overview', ar: 'نظرة عامة' },
      system: { en: 'Architecture', ar: 'البنية' },
      evidence: { en: 'Evidence', ar: 'الدليل' },
    },
    problemLabel: { en: 'Problem', ar: 'المشكلة' },
    referencesLabel: { en: 'Reference', ar: 'شهادة' },
    translatedNote: {
      en: 'Approved testimonial',
      ar: 'شهادة معتمَدة (ترجمة عن النص الأصلي)',
    },
    assetsPending: {
      en: 'Screenshots for this project are not published yet.',
      ar: 'لقطات هذا المشروع لم تُنشر بعد.',
    },
    capabilitiesLabel: { en: 'Key capabilities', ar: 'أبرز القدرات' },
    architectureLabel: { en: 'Architecture', ar: 'البنية' },
    galleryLabel: { en: 'From the system', ar: 'من داخل النظام' },
    flowLabel: { en: 'Who it connects', ar: 'من تربطه' },
    testimonialLabel: { en: 'Reference', ar: 'شهادة' },
    archiveTitle: { en: 'Previous work', ar: 'أعمال سابقة' },
    archiveNote: {
      en: 'Earlier commerce projects, kept for completeness.',
      ar: 'مشاريع تجارية أقدم، مدرجة للاكتمال.',
    },
    labTitle: { en: 'Lab', ar: 'المختبر' },
    labNote: {
      en: 'An experimental prototype, not a production system.',
      ar: 'نموذج تجريبي، ليس نظاماً إنتاجياً.',
    },
    nextProject: { en: 'Next project', ar: 'المشروع التالي' },
    previousProject: { en: 'Previous project', ar: 'المشروع السابق' },
    openGallery: { en: 'Open image', ar: 'فتح الصورة' },
    closeGallery: { en: 'Close image', ar: 'إغلاق الصورة' },
  },

  expertise: {
    kicker: { en: 'Expertise', ar: 'الخبرات التقنية' },
    title: { en: 'What I work with, and where I used it', ar: 'ما أعمل به، وأين استخدمته' },
    description: {
      en: 'Each technology links to the projects it was actually used in.',
      ar: 'كل تقنية مرتبطة بالمشاريع التي استُخدمت فيها فعلاً.',
    },
    proofLabel: { en: 'Used in', ar: 'مستخدمة في' },
    categoriesLabel: { en: 'Skill areas', ar: 'مجالات المهارات' },
    indexLabel: { en: 'See the full skill map', ar: 'عرض خريطة المهارات كاملة' },
    closeDetails: { en: 'Close skill details', ar: 'إغلاق تفاصيل المهارة' },
  },

  experience: {
    kicker: { en: 'Experience', ar: 'المسار المهني' },
    title: { en: 'Where the work happened', ar: 'أين جرى العمل' },
    description: {
      en: 'Employment, independent work and education.',
      ar: 'العمل الوظيفي والمستقل والتعليم.',
    },
    currentLabel: { en: 'Current', ar: 'حالي' },
    relatedWork: { en: 'Related work', ar: 'أعمال مرتبطة' },
    kinds: {
      work: { en: 'Employment', ar: 'عمل' },
      freelance: { en: 'Independent', ar: 'عمل مستقل' },
      education: { en: 'Education', ar: 'تعليم' },
    },
    referencesTitle: { en: 'References', ar: 'شهادات' },
    referencesNote: {
      en: 'Feedback from managers and clients I worked with directly, reviewed and approved by each of them.',
      ar: 'ملاحظات من مديرين وعملاء عملت معهم مباشرة، راجعها كل منهم وأقرّها.',
    },
  },

  mindset: {
    kicker: { en: 'How I think about engineering', ar: 'كيف أفكّر هندسياً' },
    title: { en: 'Engineering mindset', ar: 'العقلية الهندسية' },
    description: {
      en: 'Positions I hold, written in my own words and grounded in the work above.',
      ar: 'مواقف أتبنّاها، بكلماتي، ومسنودة بالأعمال أعلاه.',
    },
    evidenceLabel: { en: 'In practice', ar: 'عملياً' },
  },

  services: {
    kicker: { en: 'What I do', ar: 'ما أقدّمه' },
    title: { en: 'How I usually get brought in', ar: 'كيف أُستدعى إلى العمل عادةً' },
    description: {
      en: 'Four kinds of work, each backed by projects on this page.',
      ar: 'أربعة أنواع من العمل، كل منها مسنود بمشاريع في هذه الصفحة.',
    },
    deliverables: { en: 'Deliverables', ar: 'ما يُسلَّم' },
    proof: { en: 'Proof', ar: 'الدليل' },
    commerceLabel: { en: 'Also', ar: 'إضافةً إلى ذلك' },
    closeDetails: { en: 'Close service details', ar: 'إغلاق تفاصيل الخدمة' },
  },

  trust: {
    kicker: { en: 'Trust signals', ar: 'إشارات الثقة' },
    title: { en: 'What people I worked with said', ar: 'ما قاله من عملت معهم' },
    description: {
      en: 'Approved testimonials from managers and clients, each tied to real work.',
      ar: 'شهادات معتمَدة من مديرين وعملاء، كل منها مرتبط بعمل حقيقي.',
    },
    relatedWork: { en: 'Related work', ar: 'العمل المرتبط' },
    translated: { en: 'Translated from the approved English text', ar: 'مترجمة عن النص الإنكليزي المعتمَد' },
    pause: { en: 'Pause', ar: 'إيقاف' },
    play: { en: 'Play', ar: 'تشغيل' },
    previous: { en: 'Previous testimonial', ar: 'الشهادة السابقة' },
    next: { en: 'Next testimonial', ar: 'الشهادة التالية' },
  },

  contact: {
    kicker: { en: 'Contact', ar: 'التواصل' },
    title: { en: 'Let’s talk', ar: 'لنتحدّث' },
    description: {
      en: 'Open to senior engineering roles, and to selected freelance and product work.',
      ar: 'منفتح على أدوار هندسية متقدّمة، وعلى أعمال حرة ومشاريع منتج مختارة.',
    },
    copy: { en: 'Copy', ar: 'نسخ' },
    copied: { en: 'Copied', ar: 'تم النسخ' },
    downloadCv: { en: 'Download CV', ar: 'تحميل السيرة الذاتية' },
    socialsLabel: { en: 'Elsewhere', ar: 'روابط أخرى' },
  },

  chrome: {
    skipToContent: { en: 'Skip to content', ar: 'تخطَّ إلى المحتوى' },
    backToTop: { en: 'Back to top', ar: 'العودة إلى الأعلى' },
    menu: { en: 'Menu', ar: 'القائمة' },
    closeMenu: { en: 'Close menu', ar: 'إغلاق القائمة' },
    language: { en: 'Language', ar: 'اللغة' },
    theme: { en: 'Theme', ar: 'المظهر' },
    themeDark: { en: 'Switch to light theme', ar: 'التبديل إلى المظهر الفاتح' },
    themeLight: { en: 'Switch to dark theme', ar: 'التبديل إلى المظهر الداكن' },
    accent: { en: 'Accent colour', ar: 'لون التمييز' },
    sections: { en: 'Sections', ar: 'الأقسام' },
  },
} satisfies Record<string, Record<string, unknown>>;

export type UiStrings = typeof ui;

/** Narrow helper for the few places that build a label dynamically. */
export function pick(text: LocalizedText, language: 'en' | 'ar'): string {
  return text[language];
}
