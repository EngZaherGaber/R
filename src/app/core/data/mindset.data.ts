import { LocalizedText } from '../models/portfolio.model';

export interface Principle {
  id: string;
  title: LocalizedText;
  /** One sentence. Never a paragraph. */
  line: LocalizedText;
  /** Proof comes from real projects, not from adjectives. */
  projectIds: string[];
}

/**
 * Three principles, drawn from the work above. This replaced both the earlier
 * simulated "AI review" and the long mindset section: the conclusions belong at
 * the end of the journey, not in a section of their own.
 */
export const principles: Principle[] = [
  {
    id: 'architecture',
    title: { en: 'Architecture before screens', ar: 'البنية قبل الشاشات' },
    line: {
      en: 'The structure should make the next feature easier, not harder.',
      ar: 'يجب أن تجعل البنية الميزة التالية أسهل، لا أصعب.',
    },
    projectIds: ['nasaq', 'school'],
  },
  {
    id: 'systems',
    title: { en: 'Fix systems, not symptoms', ar: 'أصلح الأنظمة لا الأعراض' },
    line: {
      en: 'Inherited software can be improved without stopping delivery.',
      ar: 'يمكن تحسين البرمجيات الموروثة دون إيقاف التسليم.',
    },
    projectIds: ['tli', 'workflow'],
  },
  {
    id: 'workflow',
    title: { en: 'Build for the real workflow', ar: 'ابنِ لمسار العمل الحقيقي' },
    line: {
      en: 'A feature matters when someone can actually run their day with it.',
      ar: 'تصبح الميزة ذات قيمة حين يستطيع أحدهم إدارة يومه بها.',
    },
    projectIds: ['nasaq', 'mandoob'],
  },
];
