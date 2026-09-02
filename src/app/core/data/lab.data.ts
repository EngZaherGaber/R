import { LocalizedList, LocalizedText } from '../models/portfolio.model';

export interface LabEntry {
  id: string;
  name: LocalizedText;
  status: LocalizedText;
  summary: LocalizedText;
  points: LocalizedList;
}

/**
 * Experimental work. Clearly marked as a prototype and kept behind the real
 * client and product projects - it demonstrates thinking, not delivery.
 */
export const labWork: LabEntry[] = [
  {
    id: 'copilot',
    name: { en: 'Co-Pilot Engine', ar: 'محرك Co-Pilot' },
    status: { en: 'Prototype · experimental', ar: 'نموذج تجريبي' },
    summary: {
      en: 'A prototype scaffolding tool I built for myself: describe a domain as entities and relationships, answer the architectural questions it cannot infer, and it emits the starting structure for an Nx workspace — API module, web feature, mobile feature.',
      ar: 'أداة تهيئة أولية بنيتها لنفسي: تصف النطاق ككيانات وعلاقات، وتجيب عن الأسئلة المعمارية التي لا تستطيع استنتاجها، فتُخرج البنية الابتدائية لمساحة عمل Nx — وحدة API وميزة ويب وميزة موبايل.',
    },
    points: {
      en: [
        'It generates a starting point, not a finished system — every output still needs an engineer.',
        'The interesting part is the question set: what a generator has to ask before it can be useful.',
        'It exists because I kept writing the same first week of a project by hand.',
      ],
      ar: [
        'تولّد نقطة انطلاق لا نظاماً منجزاً — كل مخرج يحتاج مهندساً بعده.',
        'الجزء المثير هو مجموعة الأسئلة: ما الذي يجب أن يسأله المولّد قبل أن يصبح مفيداً.',
        'وُجدت لأنني كنت أكرر كتابة الأسبوع الأول نفسه من كل مشروع يدوياً.',
      ],
    },
  },
];
