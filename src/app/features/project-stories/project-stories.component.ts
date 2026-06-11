import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PortfolioProject } from '../../core/data/portfolio-content';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { ScrollSceneService } from '../../core/services/scroll-scene.service';

@Component({
  selector: 'project-stories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-stories.component.html',
  styleUrl: './project-stories.component.scss',
})
export class ProjectStoriesComponent implements AfterViewInit {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly selectedProjectId = signal(this.workspace.readUrlParam('project') ?? 'tli');
  readonly projects = computed(() =>
    [...this.workspace.content().projects].sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99)),
  );
  readonly selectedProject = computed(
    () => this.projects().find((project) => project.id === this.selectedProjectId()) ?? this.projects()[0],
  );
  readonly activeIndex = computed(() =>
    Math.max(0, this.projects().findIndex((project) => project.id === this.selectedProject().id)),
  );
  readonly activeProjectNumber = computed(() => String(this.activeIndex() + 1).padStart(2, '0'));
  readonly previewImages = computed(() => this.selectedProject().images?.slice(0, 3) ?? []);

  private viewReady = false;
  private previousProjectIndex = this.activeIndex();
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly scrollScene = inject(ScrollSceneService);

  constructor() {
    effect(() => {
      const projectId = this.selectedProject().id;
      this.workspace.setUrlParams({
        project: projectId,
      });
      if (this.viewReady) {
        const nextIndex = this.activeIndex();
        const direction = nextIndex >= this.previousProjectIndex ? 1 : -1;
        this.previousProjectIndex = nextIndex;
        setTimeout(() => this.animateProjectSwap(direction));
      }
    });
  }

  ngAfterViewInit(): void {
    const host = this.elementRef.nativeElement;
    this.viewReady = true;
    this.scrollScene.reveal(host, '.project-reveal');
  }

  selectProject(project: PortfolioProject, mobileArticle?: HTMLElement): void {
    this.selectedProjectId.set(project.id);
    this.workspace.setUrlParams({ scene: 'projects', project: project.id });
    if (mobileArticle && window.matchMedia('(max-width: 980px)').matches) {
      setTimeout(() => mobileArticle.scrollIntoView({ block: 'start', behavior: 'smooth' }));
    }
  }

  tiltCard(event: PointerEvent): void {
    if (this.scrollScene.reducedMotion || event.pointerType === 'touch') {
      return;
    }

    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty('--tilt-x', `${(-y * 10).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${(x * 14).toFixed(2)}deg`);
    card.style.setProperty('--tilt-z', '8px');
    card.style.setProperty('--glow-x', `${((x + 0.5) * 100).toFixed(1)}%`);
    card.style.setProperty('--glow-y', `${((y + 0.5) * 100).toFixed(1)}%`);
  }

  resetTilt(event: PointerEvent): void {
    const card = event.currentTarget as HTMLElement;
    card.style.setProperty('--tilt-x', '3deg');
    card.style.setProperty('--tilt-y', '-8deg');
    card.style.setProperty('--tilt-z', '0px');
    card.style.setProperty('--glow-x', '50%');
    card.style.setProperty('--glow-y', '30%');
  }

  private animateProjectSwap(direction: number): void {
    this.scrollScene.projectFlip(this.elementRef.nativeElement, direction);
    this.scrollScene.switchReveal(
      this.elementRef.nativeElement,
      '.shot-strip img, .case-copy .meta-row, .case-copy h3, .case-copy .type, .case-copy .summary, .stack-list span, .feature-grid span, .metric-row strong, .project-link',
    );
  }

  imagePath(path: string): string {
    return path;
  }
}
