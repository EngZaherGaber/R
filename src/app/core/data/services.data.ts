import { LocalizedText } from '../models/portfolio.model';

/**
 * What used to be a full Services section is now four commands attached to the
 * engineering graph: selecting one highlights the projects that prove it.
 */
export interface CapabilityCommand {
  id: string;
  /** Short verb. This is the label the visitor scans. */
  label: LocalizedText;
  /** One short line, never a paragraph. */
  line: LocalizedText;
  projectIds: string[];
}

export const capabilityCommands: CapabilityCommand[] = [
  {
    id: 'architect',
    label: { en: 'Architect', ar: 'أُصمّم' },
    line: { en: 'System and frontend architecture', ar: 'هندسة الأنظمة والواجهات' },
    projectIds: ['nasaq', 'tli', 'workflow', 'school'],
  },
  {
    id: 'build',
    label: { en: 'Build', ar: 'أبني' },
    line: { en: 'Angular + Nx platforms', ar: 'منصات Angular وNx' },
    projectIds: ['nasaq', 'mandoob'],
  },
  {
    id: 'modernize',
    label: { en: 'Modernize', ar: 'أُحدّث' },
    line: { en: 'Inherited Angular systems', ar: 'أنظمة Angular موروثة' },
    projectIds: ['tli', 'workflow'],
  },
  {
    id: 'mobile',
    label: { en: 'Mobile', ar: 'الموبايل' },
    line: { en: 'Angular + Ionic delivery', ar: 'تسليم بـ Angular وIonic' },
    projectIds: ['nasaq', 'mandoob'],
  },
];

/** Commerce stays a quiet supporting capability, not a fifth command. */
export const commerceCapability = {
  label: { en: 'Commerce', ar: 'التجارة الإلكترونية' },
  line: {
    en: 'Shopify storefronts for client brands',
    ar: 'متاجر Shopify لعلامات العملاء',
  },
  projectIds: ['huelle'],
};
