import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import {
  archivedProjects,
  primaryProjects,
  secondaryProjects,
} from '../../core/data/projects.data';
import { recommendationById } from '../../core/data/experience.data';
import { Project, ProjectScreenshot } from '../../core/models/portfolio.model';

/** The three ways a visitor can go deeper. Closed by default. */
type StageMode = 'system' | 'screens' | 'deep';

@Component({
  selector: 'app-systems',
  standalone: true,
  templateUrl: './systems.component.html',
  styleUrl: './systems.component.scss',
})
export class SystemsComponent implements AfterViewInit {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;

  readonly projects = primaryProjects;
  readonly delivered = secondaryProjects;
  readonly archive = archivedProjects;

  readonly selectedId = signal(primaryProjects[0].id);
  /** `null` is the default: the visitor scans before they read. */
  readonly mode = signal<StageMode | null>(null);
  readonly lightbox = signal<ProjectScreenshot | null>(null);
  readonly openRecommendation = signal<string | null>(null);

  readonly selected = computed(
    () => this.projects.find((project) => project.id === this.selectedId()) ?? this.projects[0],
  );
  readonly selectedIndex = computed(() =>
    Math.max(0, this.projects.findIndex((project) => project.id === this.selectedId())),
  );

  readonly modes = computed<StageMode[]>(() => {
    const project = this.selected();
    const available: StageMode[] = [];
    if (project.architecture || project.actorFlow || project.transformation) {
      available.push('system');
    }
    if (this.screensFor(project).length) {
      available.push('screens');
    }
    if (project.caseStudy.length) {
      available.push('deep');
    }
    return available;
  });

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private lastFocused?: HTMLElement;
  private touchStartX = 0;

  ngAfterViewInit(): void {
    void this.motion.sectionReveal(this.elementRef.nativeElement);
  }

  /* ---------------------------------------------------------------- select */

  select(projectId: string): void {
    if (projectId === this.selectedId()) {
      return;
    }
    const direction =
      this.projects.findIndex((p) => p.id === projectId) >= this.selectedIndex() ? 1 : -1;
    this.selectedId.set(projectId);
    this.mode.set(null);
    void this.motion.projectTransition(this.elementRef.nativeElement, direction);
  }

  step(offset: number): void {
    const next = (this.selectedIndex() + offset + this.projects.length) % this.projects.length;
    this.select(this.projects[next].id);
    this.elementRef.nativeElement.querySelectorAll<HTMLElement>('.rail-card')[next]?.focus();
  }

  onRailKeydown(event: KeyboardEvent): void {
    const forward = this.workspace.isArabic() ? 'ArrowLeft' : 'ArrowRight';
    const backward = this.workspace.isArabic() ? 'ArrowRight' : 'ArrowLeft';

    if (event.key === forward || event.key === 'ArrowDown') {
      event.preventDefault();
      this.step(1);
    } else if (event.key === backward || event.key === 'ArrowUp') {
      event.preventDefault();
      this.step(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.select(this.projects[0].id);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.select(this.projects[this.projects.length - 1].id);
    }
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const delta = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(delta) >= 56) {
      this.step(delta < 0 ? 1 : -1);
    }
  }

  /* ------------------------------------------------------------------ mode */

  toggleMode(mode: StageMode): void {
    this.mode.update((current) => (current === mode ? null : mode));
    void this.motion.panelSwap(this.elementRef.nativeElement, '.drawer[data-open="true"] > *');
  }

  modeLabel(mode: StageMode): string {
    return this.workspace.t(this.ui.systems.modes[mode]);
  }

  /* ------------------------------------------------------------------ data */

  projectNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  screensFor(project: Project): ProjectScreenshot[] {
    return [...(project.cover ? [project.cover] : []), ...(project.screenshots ?? [])];
  }

  referencesFor(project: Project) {
    return (project.testimonialIds ?? [])
      .map((id) => recommendationById(id))
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
  }

  liveUrl(project: Project): string | null {
    return project.deployment.kind === 'public' ? project.deployment.url : null;
  }

  toggleRecommendation(id: string): void {
    this.openRecommendation.update((current) => (current === id ? null : id));
  }

  /* -------------------------------------------------------------- lightbox */

  openLightbox(shot: ProjectScreenshot, trigger: HTMLElement): void {
    this.lastFocused = trigger;
    this.lightbox.set(shot);
    document.body.style.overflow = 'hidden';
    setTimeout(() =>
      this.elementRef.nativeElement.querySelector<HTMLElement>('.lightbox-close')?.focus(),
    );
  }

  closeLightbox(): void {
    if (!this.lightbox()) {
      return;
    }
    this.lightbox.set(null);
    document.body.style.removeProperty('overflow');
    this.lastFocused?.focus();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeLightbox();
  }
}
