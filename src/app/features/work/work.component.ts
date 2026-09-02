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
import { archivedProjects, caseStudyProjects } from '../../core/data/projects.data';
import { recommendationById } from '../../core/data/experience.data';
import { labWork } from '../../core/data/lab.data';
import { Project, ProjectScreenshot } from '../../core/models/portfolio.model';

type StagePanel = 'overview' | 'system' | 'evidence';

@Component({
  selector: 'app-work',
  standalone: true,
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent implements AfterViewInit {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;

  /** Flagship first, then the rest in storytelling order. */
  readonly projects = caseStudyProjects;
  readonly archive = archivedProjects;
  readonly lab = labWork;

  readonly selectedId = signal(this.projects[0].id);
  readonly panel = signal<StagePanel>('overview');
  readonly lightbox = signal<ProjectScreenshot | null>(null);

  readonly selected = computed(
    () => this.projects.find((project) => project.id === this.selectedId()) ?? this.projects[0],
  );
  readonly selectedIndex = computed(() =>
    Math.max(0, this.projects.findIndex((project) => project.id === this.selectedId())),
  );

  /** Panels are offered only when the project actually has that material. */
  readonly panels = computed<StagePanel[]>(() => {
    const project = this.selected();
    const available: StagePanel[] = ['overview'];
    if (project.architecture || project.actorFlow || project.transformation) {
      available.push('system');
    }
    if (this.galleryFor(project).length || (project.testimonialIds?.length ?? 0) > 0) {
      available.push('evidence');
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

  /* --------------------------------------------------------------- select */

  select(projectId: string): void {
    if (projectId === this.selectedId()) {
      return;
    }

    const direction = this.projects.findIndex((p) => p.id === projectId) >= this.selectedIndex() ? 1 : -1;
    this.selectedId.set(projectId);
    this.panel.set('overview');
    void this.motion.projectTransition(this.elementRef.nativeElement, direction);
  }

  step(offset: number): void {
    const next = (this.selectedIndex() + offset + this.projects.length) % this.projects.length;
    this.select(this.projects[next].id);
    this.focusRailCard(next);
  }

  /** Arrow / Home / End navigation across the project rail. */
  onRailKeydown(event: KeyboardEvent): void {
    const forward = this.workspace.isArabic() ? 'ArrowLeft' : 'ArrowRight';
    const backward = this.workspace.isArabic() ? 'ArrowRight' : 'ArrowLeft';

    switch (event.key) {
      case forward:
      case 'ArrowDown':
        event.preventDefault();
        this.step(1);
        break;
      case backward:
      case 'ArrowUp':
        event.preventDefault();
        this.step(-1);
        break;
      case 'Home':
        event.preventDefault();
        this.select(this.projects[0].id);
        this.focusRailCard(0);
        break;
      case 'End':
        event.preventDefault();
        this.select(this.projects[this.projects.length - 1].id);
        this.focusRailCard(this.projects.length - 1);
        break;
    }
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const delta = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(delta) < 56) {
      return;
    }
    this.step(delta < 0 ? 1 : -1);
  }

  /* ---------------------------------------------------------------- panel */

  showPanel(panel: StagePanel): void {
    if (panel === this.panel()) {
      return;
    }
    this.panel.set(panel);
    void this.motion.panelSwap(this.elementRef.nativeElement, '.stage-panel:not([hidden]) > *');
  }

  onPanelKeydown(event: KeyboardEvent): void {
    const panels = this.panels();
    const index = panels.indexOf(this.panel());
    const forward = this.workspace.isArabic() ? 'ArrowLeft' : 'ArrowRight';
    const backward = this.workspace.isArabic() ? 'ArrowRight' : 'ArrowLeft';

    if (event.key !== forward && event.key !== backward) {
      return;
    }

    event.preventDefault();
    const offset = event.key === forward ? 1 : -1;
    const next = (index + offset + panels.length) % panels.length;
    this.showPanel(panels[next]);
    this.elementRef.nativeElement
      .querySelector<HTMLElement>(`#panel-tab-${this.selectedId()}-${panels[next]}`)
      ?.focus();
  }

  panelLabel(panel: StagePanel): string {
    return this.workspace.t(this.ui.work.panelLabels[panel]);
  }

  /* ---------------------------------------------------------------- data - */

  projectNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  galleryFor(project: Project): ProjectScreenshot[] {
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

  /* ------------------------------------------------------------- lightbox */

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

  private focusRailCard(index: number): void {
    this.elementRef.nativeElement
      .querySelectorAll<HTMLElement>('.reel-card')
      [index]?.focus();
  }
}
