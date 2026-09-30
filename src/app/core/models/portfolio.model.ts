/**
 * Canonical typed model for the portfolio.
 *
 * One data model, two languages: every visitor-facing string is `Localized<T>`
 * so business logic is never duplicated per language.
 */

export type LanguageCode = 'en' | 'ar';
export type ThemeMode = 'dark' | 'light';

/** A value that exists in both supported languages. */
export interface Localized<T> {
  en: T;
  ar: T;
}

export type LocalizedText = Localized<string>;
export type LocalizedList = Localized<string[]>;

export interface AccentColor {
  id: string;
  label: LocalizedText;
  value: string;
}

/* ------------------------------------------------------------------ profile */

export interface SocialLink {
  id: string;
  label: LocalizedText;
  handle: string;
  /** `null` means "not configured yet" - the UI hides it instead of faking one. */
  url: string | null;
  icon: string;
}

export interface ProfileContact {
  id: string;
  label: LocalizedText;
  value: string;
  /** Localized display value where the raw value is not language neutral. */
  display?: LocalizedText;
  href?: string;
  icon: string;
  copyable?: boolean;
}

export interface Profile {
  name: LocalizedText;
  /** Personal positioning - independent from the employment title. */
  role: LocalizedText;
  tagline: LocalizedText;
  location: LocalizedText;
  email: string;
  phone: string;
  github: string;
  contacts: ProfileContact[];
  socials: SocialLink[];
  /** Public site origin, used for canonical + Open Graph URLs. */
  siteUrl: string;
  cvPath: string;
  ogImage: string;
}

/* ----------------------------------------------------------------- projects */

export type ProjectStatusTone = 'active' | 'delivered' | 'archived';

export interface ProjectStatus {
  label: LocalizedText;
  tone: ProjectStatusTone;
  /** Short word repeated as text so status never depends on color alone. */
  shortLabel: LocalizedText;
}

/** How the deployment is exposed publicly. */
export type DeploymentKind = 'public' | 'private' | 'unreleased';

export interface ProjectDeployment {
  kind: DeploymentKind;
  /** Only meaningful when `kind === 'public'`; `null` = configurable placeholder. */
  url: string | null;
  label: LocalizedText;
}

export interface ProjectScreenshot {
  src: string;
  alt: LocalizedText;
  caption?: LocalizedText;
  width: number;
  height: number;
}

export interface CaseStudySection {
  id: string;
  heading: LocalizedText;
  body: LocalizedText;
  /** Optional supporting bullets rendered under the body. */
  points?: LocalizedList;
}

/** Before/after framing for re-architecture stories. */
export interface TransformationView {
  beforeHeading: LocalizedText;
  before: LocalizedList;
  afterHeading: LocalizedText;
  after: LocalizedList;
}

/** Nodes of the small architecture diagram (flagship projects only). */
export interface ArchitectureDiagram {
  workspaceLabel: LocalizedText;
  clients: { id: string; label: LocalizedText; tech: string }[];
  api: { label: LocalizedText; tech: string };
  data: { label: LocalizedText; tech: string };
}

/** Actors in a platform that connects distinct participant types. */
export interface ActorFlowStep {
  id: string;
  label: LocalizedText;
  role: LocalizedText;
  icon: string;
}

export type ProjectTier = 'flagship' | 'featured' | 'archive';

/**
 * How prominently a project is staged.
 * `primary` systems get the full interactive stage and their own system visual;
 * `secondary` work is delivered proof shown compactly.
 */
export type ProjectGroup = 'primary' | 'secondary' | 'archive';

/**
 * The visual grammar a project's stage uses. Each primary system reads
 * differently so switching projects changes the scene, not just the text.
 */
export type SystemVisual =
  | 'platform'        // multi-tenant architecture (Nasaq)
  | 'distribution'    // company -> representative -> store (Mandoob)
  | 'transformation'  // inherited -> re-architected -> delivered (TLI)
  | 'workflow'        // template -> phase -> action -> transition (Workflow)
  | 'none';

export interface Project {
  id: string;
  tier: ProjectTier;
  group: ProjectGroup;
  /** Visual grammar for the project stage. */
  visual: SystemVisual;
  /**
   * The scannable default state: a two-line story (<= ~35 words) and one short
   * outcome. The full `summary` and `caseStudy` stay for the deep dive.
   */
  headline: LocalizedText;
  outcome: LocalizedText;
  /** Storytelling order inside its tier. */
  order: number;
  name: LocalizedText;
  /** e.g. "Multi-Tenant Medical SaaS" - shown next to the name. */
  descriptor: LocalizedText;
  client?: LocalizedText;
  category: LocalizedText;
  status: ProjectStatus;
  role: LocalizedText;
  period?: LocalizedText;
  summary: LocalizedText;
  stack: string[];
  deployment: ProjectDeployment;
  /** Lead visual for the case study; falls back to the first screenshot. */
  cover?: ProjectScreenshot;
  screenshots?: ProjectScreenshot[];
  caseStudy: CaseStudySection[];
  capabilities?: LocalizedList;
  transformation?: TransformationView;
  architecture?: ArchitectureDiagram;
  actorFlow?: ActorFlowStep[];
  /** Recommendation ids that speak to this project. */
  testimonialIds?: string[];
  /** Marks lab / experimental work so it is never sold as production. */
  experimental?: boolean;
  note?: LocalizedText;
}

/* ------------------------------------------------------------------- skills */

export interface SkillCategory {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  /** What the skill is used for, in plain language. */
  note: LocalizedText;
  /** Proof - project ids where the skill was actually used. */
  projectIds: string[];
}

/* --------------------------------------------------------------- experience */

export type ExperienceKind = 'work' | 'freelance' | 'education';

export interface ExperienceEntry {
  id: string;
  kind: ExperienceKind;
  title: LocalizedText;
  organization: LocalizedText;
  /** Human readable range, already localized - no computed "X+ years". */
  period: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedList;
  tags: string[];
  projectIds?: string[];
  /** Recommendation ids surfaced next to this entry. */
  testimonialIds?: string[];
  current?: boolean;
}

/* ---------------------------------------------------------- recommendations */

export interface Recommendation {
  id: string;
  name: LocalizedText;
  position: LocalizedText;
  context: LocalizedText;
  message: LocalizedText;
  image?: string;
  projectIds: string[];
}

/* ------------------------------------------------------- engineering mindset */

export interface MindsetTopic {
  id: string;
  icon: string;
  title: LocalizedText;
  lead: LocalizedText;
  points: LocalizedList;
  /** Optional closing line that grounds the topic in real work. */
  evidence?: LocalizedText;
  projectIds?: string[];
}

/* --------------------------------------------------------------- navigation */

export type SectionId = 'home' | 'work' | 'expertise' | 'journey' | 'contact';

export interface NavItem {
  id: SectionId;
  label: LocalizedText;
  icon: string;
}
