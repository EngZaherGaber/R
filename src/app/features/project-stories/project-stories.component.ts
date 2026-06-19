import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import gsap from 'gsap';
import { PortfolioProject } from '../../core/data/portfolio-content';
import { ScrollSceneService } from '../../core/services/scroll-scene.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';

@Component({
  selector: 'project-stories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-stories.component.html',
  styleUrl: './project-stories.component.scss',
})
export class ProjectStoriesComponent implements AfterViewInit, OnDestroy {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly selectedProjectId = signal(this.workspace.readUrlParam('project') ?? '');
  readonly reelPaused = signal(false);

  readonly projects = computed(() =>
    [...this.workspace.content().projects].sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99)),
  );
  readonly selectedProject = computed(
    () => this.projects().find((project) => project.id === this.selectedProjectId()) ?? this.projects()[0],
  );
  readonly selectedProjectIndex = computed(() =>
    Math.max(0, this.projects().findIndex((project) => project.id === this.selectedProject().id)),
  );
  readonly reelProjects = computed(() => [...this.projects(), ...this.projects()]);
  readonly selectedAccent = computed(() => this.workspace.accent().value);
  readonly detailRows = computed(() => {
    const project = this.selectedProject();
    return [
      { label: 'Problem', text: project.caseStudy?.problem ?? project.summary },
      { label: 'Result', text: project.caseStudy?.result ?? project.features.slice(2, 4).join(', ') },
      { label: 'Role', text: project.caseStudy?.role ?? project.features.slice(0, 2).join(', ') },
    ].filter((row) => row.text);
  });

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly scrollScene = inject(ScrollSceneService);
  private switchTimeline?: gsap.core.Timeline;
  private viewReady = false;
  private touchStartX = 0;
  private touchStartY = 0;
  private resumeReelTimer?: number;

  constructor() {
    effect(() => {
      this.workspace.setUrlParams({ project: this.selectedProject().id });
      if (this.viewReady) {
        window.requestAnimationFrame(() => this.animateProjectSwitch());
      }
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.scrollScene.reveal(this.elementRef.nativeElement, '.project-reveal');
    this.animateProjectSwitch(true);
  }

  ngOnDestroy(): void {
    this.switchTimeline?.kill();
    if (this.resumeReelTimer) {
      window.clearTimeout(this.resumeReelTimer);
    }
  }

  projectNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  selectProject(projectId: string): void {
    if (projectId === this.selectedProject().id) {
      return;
    }
    this.pauseReelTemporarily();
    this.selectedProjectId.set(projectId);
  }

  selectNextProject(direction = 1): void {
    const projects = this.projects();
    if (!projects.length) {
      return;
    }
    const nextIndex = (this.selectedProjectIndex() + direction + projects.length) % projects.length;
    this.selectProject(projects[nextIndex].id);
  }

  setReelPaused(paused: boolean): void {
    this.reelPaused.set(paused);
    if (paused && this.resumeReelTimer) {
      window.clearTimeout(this.resumeReelTimer);
    }
  }

  onTouchStart(event: TouchEvent): void {
    const touch = event.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.setReelPaused(true);
  }

  onTouchEnd(event: TouchEvent): void {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - this.touchStartX;
    const deltaY = touch.clientY - this.touchStartY;

    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35) {
      this.selectNextProject(deltaX < 0 ? 1 : -1);
    }

    this.pauseReelTemporarily();
  }

  projectTone(_project: PortfolioProject): string {
    return this.workspace.accent().value;
  }

  pauseReelTemporarily(): void {
    this.reelPaused.set(true);
    if (this.resumeReelTimer) {
      window.clearTimeout(this.resumeReelTimer);
    }
    this.resumeReelTimer = window.setTimeout(() => this.reelPaused.set(false), 2600);
  }

  private animateProjectSwitch(initial = false): void {
    if (this.scrollScene.reducedMotion) {
      return;
    }

    const host = this.elementRef.nativeElement;
    const lobes = gsap.utils.toArray<HTMLElement>('.glass-lobe', host);
    const visualMedia = gsap.utils.toArray<HTMLElement>('.project-visual img', host);
    const headline = gsap.utils.toArray<HTMLElement>(
      '.project-kicker, .project-title, .project-summary, .project-meta span, .project-actions, .metric-chip',
      host,
    );
    const detailLines = gsap.utils.toArray<HTMLElement>('.typing-line', host);

    this.switchTimeline?.kill();
    gsap.killTweensOf([...lobes, ...visualMedia, ...headline, ...detailLines]);

    this.switchTimeline = gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .to(
        lobes,
        {
          x: (index) => (index === 0 ? 24 : -24),
          y: (index) => (index === 0 ? 14 : -14),
          scale: 0.92,
          autoAlpha: initial ? 0 : 0.46,
          duration: initial ? 0.01 : 0.22,
          ease: 'power2.in',
        },
        0,
      )
      .set(visualMedia, { clipPath: 'inset(0 50% 0 50% round 28px)', scale: 1.08 }, initial ? 0 : 0.2)
      .to(
        lobes,
        {
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.62,
          stagger: 0.035,
          ease: 'expo.out',
        },
        initial ? 0 : 0.24,
      )
      .to(
        visualMedia,
        {
          clipPath: 'inset(0 0% 0 0% round 24px)',
          scale: 1,
          duration: 0.68,
          stagger: 0.035,
          ease: 'expo.out',
        },
        initial ? 0.08 : 0.3,
      )
      .fromTo(
        headline,
        { autoAlpha: 0, y: 18, rotateX: -5 },
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.48, stagger: 0.035 },
        initial ? 0.12 : 0.42,
      )
      .fromTo(
        detailLines,
        { autoAlpha: 0, y: 14, clipPath: 'inset(0 100% 0 0)' },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.54,
          stagger: 0.105,
          ease: 'power2.out',
        },
        initial ? 0.22 : 0.58,
      )
  }
}
