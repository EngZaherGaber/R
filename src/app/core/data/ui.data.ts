import { LocalizedText } from '../models/portfolio.model';

/**
 * Every chrome / label string, in both languages.
 *
 * The copy budget is part of the design: scene intros are one line, never a
 * paragraph. Depth lives in the project and skill data, behind intent.
 */
export const ui = {
  identity: {
    eyebrow: { en: 'Damascus, Syria · Open to work', ar: 'دمشق، سوريا · متاح للعمل' },
    statement: {
      en: 'I design and build Angular platforms across web, mobile and backend systems.',
      ar: 'أصمّم وأبني منصات Angular تمتد من الويب إلى الموبايل إلى الأنظمة الخلفية.',
    },
    founderLabel: { en: 'Founder', ar: 'مؤسس' },
    founderValue: { en: 'Nasaq — medical SaaS', ar: 'نَسَق — منصة طبية' },
    enterpriseLabel: { en: 'Enterprise delivery', ar: 'تسليم مؤسسي' },
    enterpriseValue: { en: 'Syriatel · UN', ar: 'سيرياتل · الأمم المتحدة' },
    apiLabel: { en: 'Domain API', ar: 'واجهة النطاق' },
    primaryCta: { en: 'View systems', ar: 'شاهد الأنظمة' },
    secondaryCta: { en: 'Download CV', ar: 'تحميل السيرة' },
    tertiaryCta: { en: 'Contact', ar: 'تواصل' },
  },

  systems: {
    kicker: { en: 'Systems', ar: 'الأنظمة' },
    title: { en: 'What I have built and rebuilt', ar: 'ما بنيته وما أعدت بناءه' },
    indexLabel: { en: 'Project index', ar: 'فهرس المشاريع' },
    roleLabel: { en: 'Role', ar: 'الدور' },
    statusLabel: { en: 'Status', ar: 'الحالة' },
    stackLabel: { en: 'Stack', ar: 'التقنيات' },
    outcomeLabel: { en: 'Outcome', ar: 'النتيجة' },
    modes: {
      system: { en: 'Explore system', ar: 'استكشف النظام' },
      screens: { en: 'Screens', ar: 'اللقطات' },
      deep: { en: 'Deep dive', ar: 'تفاصيل' },
    },
    close: { en: 'Close', ar: 'إغلاق' },
    next: { en: 'Next project', ar: 'المشروع التالي' },
    previous: { en: 'Previous project', ar: 'المشروع السابق' },
    openImage: { en: 'Open image', ar: 'فتح الصورة' },
    closeImage: { en: 'Close image', ar: 'إغلاق الصورة' },
    noScreens: {
      en: 'Screens for this system are not published yet.',
      ar: 'لقطات هذا النظام لم تُنشر بعد.',
    },
    deliveredTitle: { en: 'Also delivered', ar: 'أعمال مُسلَّمة أخرى' },
    archiveTitle: { en: 'Previous work', ar: 'أعمال سابقة' },
    privateLabel: { en: 'Private deployment', ar: 'نشر خاص' },
    capabilitiesLabel: { en: 'Key capabilities', ar: 'أبرز القدرات' },
    referenceLabel: { en: 'Reference', ar: 'شهادة' },
    readFull: { en: 'Read full recommendation', ar: 'اقرأ التوصية كاملة' },
  },

  graph: {
    kicker: { en: 'Engineering graph', ar: 'الخريطة الهندسية' },
    title: { en: 'Capabilities, and the work that proves them', ar: 'القدرات، والعمل الذي يثبتها' },
    capabilitiesLabel: { en: 'Capabilities', ar: 'القدرات' },
    evidenceLabel: { en: 'Evidence', ar: 'الدليل' },
    usedIn: { en: 'Used in', ar: 'مستخدمة في' },
    builtWith: { en: 'Built with', ar: 'مبني بـ' },
    commandsLabel: { en: 'What I can help with', ar: 'ما يمكنني المساعدة به' },
    reset: { en: 'Show everything', ar: 'إظهار الكل' },
    selectHint: {
      en: 'Select a capability or a project to trace the connections.',
      ar: 'اختر قدرة أو مشروعاً لتتبّع الروابط.',
    },
    lanesLabel: { en: 'Capabilities by area', ar: 'القدرات حسب المجال' },
  },

  journey: {
    kicker: { en: 'Journey', ar: 'المسار' },
    title: { en: 'From Angular frontend to product ownership', ar: 'من واجهات Angular إلى امتلاك المنتج' },
    currentLabel: { en: 'Now', ar: 'الآن' },
    relatedWork: { en: 'Work', ar: 'الأعمال' },
    trustTitle: {
      en: 'Trusted across enterprise and commercial delivery.',
      ar: 'موثوق به في التسليم المؤسسي والتجاري.',
    },
    principlesTitle: { en: 'What the work taught me', ar: 'ما علّمني إياه العمل' },
    proofLabel: { en: 'Proof', ar: 'الدليل' },
    translated: {
      en: 'Translated from the approved English text',
      ar: 'مترجمة عن النص الإنكليزي المعتمَد',
    },
    excerptLabel: { en: 'Excerpt', ar: 'مقتطف' },
  },

  contact: {
    kicker: { en: 'Contact', ar: 'التواصل' },
    line: {
      en: 'Let’s build something that has to last.',
      ar: 'لنبنِ شيئاً مصمَّماً ليدوم.',
    },
    copy: { en: 'Copy', ar: 'نسخ' },
    copied: { en: 'Copied', ar: 'تم النسخ' },
    downloadCv: { en: 'Download CV', ar: 'تحميل السيرة' },
    elsewhere: { en: 'Elsewhere', ar: 'روابط أخرى' },
  },

  chrome: {
    skipToContent: { en: 'Skip to content', ar: 'تخطَّ إلى المحتوى' },
    backToTop: { en: 'Back to top', ar: 'العودة إلى الأعلى' },
    menu: { en: 'Menu', ar: 'القائمة' },
    closeMenu: { en: 'Close menu', ar: 'إغلاق القائمة' },
    language: { en: 'Language', ar: 'اللغة' },
    themeDark: { en: 'Switch to light theme', ar: 'التبديل إلى المظهر الفاتح' },
    themeLight: { en: 'Switch to dark theme', ar: 'التبديل إلى المظهر الداكن' },
    accent: { en: 'Accent colour', ar: 'لون التمييز' },
    sections: { en: 'Scenes', ar: 'المشاهد' },
  },
} satisfies Record<string, Record<string, unknown>>;

export type UiStrings = typeof ui;

export function pick(text: LocalizedText, language: 'en' | 'ar'): string {
  return text[language];
}
