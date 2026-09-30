import { LocalizedText } from '../models/portfolio.model';
import { skillCategories } from './skills.data';

/**
 * The engineering graph is a *view* over the existing typed skill data - it
 * never declares a second skill-to-project map. This file only decides which
 * capabilities appear on the graph, how they are grouped, and which of them
 * carry the current professional positioning.
 */
export interface GraphDomain {
  id: string;
  label: LocalizedText;
  /** Skill ids from `skills.data.ts`, in the order they should be drawn. */
  skillIds: string[];
}

export const graphDomains: GraphDomain[] = [
  {
    id: 'architecture',
    label: { en: 'Architecture & Scale', ar: 'البنية والتوسّع' },
    skillIds: ['nx', 'components', 'state'],
  },
  {
    id: 'frontend',
    label: { en: 'Frontend Systems', ar: 'أنظمة الواجهة' },
    skillIds: ['angular', 'typescript', 'rxjs', 'forms'],
  },
  {
    id: 'platform',
    label: { en: 'Platform & Backend', ar: 'المنصة والخلفية' },
    skillIds: ['nestjs', 'postgres', 'prisma', 'authz'],
  },
  {
    id: 'mobile',
    label: { en: 'Mobile', ar: 'الموبايل' },
    skillIds: ['ionic', 'capacitor'],
  },
  {
    id: 'enterprise',
    label: { en: 'Enterprise UI', ar: 'واجهات مؤسسية' },
    skillIds: ['primeng', 'i18n', 'a11y'],
  },
  {
    id: 'commerce',
    label: { en: 'Commerce', ar: 'التجارة' },
    skillIds: ['shopify'],
  },
];

/**
 * The five technologies the current positioning rests on. They are drawn
 * larger; everything else is a supporting node.
 */
export const primaryCapabilityIds = new Set(['nx', 'angular', 'ionic', 'nestjs', 'postgres']);

/** Flattened lookup so the graph can resolve a node without re-walking categories. */
const skillIndex = new Map(
  skillCategories.flatMap((category) =>
    category.skills.map((skill) => [skill.id, { skill, category }] as const),
  ),
);

export interface GraphNode {
  id: string;
  name: string;
  note: LocalizedText;
  projectIds: string[];
  domainId: string;
  primary: boolean;
}

/** Capability nodes, resolved from the typed skill data. */
export const graphNodes: GraphNode[] = graphDomains.flatMap((domain) =>
  domain.skillIds.flatMap((skillId) => {
    const entry = skillIndex.get(skillId);
    if (!entry) {
      return [];
    }
    return [
      {
        id: skillId,
        name: entry.skill.name,
        note: entry.skill.note,
        projectIds: entry.skill.projectIds,
        domainId: domain.id,
        primary: primaryCapabilityIds.has(skillId),
      },
    ];
  }),
);

export function graphNodeById(id: string): GraphNode | undefined {
  return graphNodes.find((node) => node.id === id);
}

/** Every capability that names this project, used when a project is selected. */
export function capabilitiesForProject(projectId: string): GraphNode[] {
  return graphNodes.filter((node) => node.projectIds.includes(projectId));
}
