import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, computed, effect, inject, signal } from '@angular/core';
import gsap from 'gsap';
import { PortfolioRecommendation } from '../../core/data/portfolio-content';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { ScrollSceneService } from '../../core/services/scroll-scene.service';

@Component({
  selector: 'trust-wall',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trust-wall.component.html',
  styleUrl: './trust-wall.component.scss',
})
export class TrustWallComponent implements AfterViewInit {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly selectedRecommendationId = signal(this.workspace.readUrlParam('rec') ?? 'jamal-halabi');
  readonly selectedRecommendation = computed(
    () =>
      this.workspace.content().recommendations.find((item) => item.id === this.selectedRecommendationId()) ??
      this.workspace.content().recommendations[0],
  );
  readonly selectedIndex = computed(() =>
    Math.max(
      0,
      this.workspace
        .content()
        .recommendations.findIndex((item) => item.id === this.selectedRecommendation().id),
    ),
  );
  readonly relatedProjects = computed(() => {
    const ids = new Set(this.selectedRecommendation().relatedProjectIds);
    return this.workspace.content().projects.filter((project) => ids.has(project.id));
  });
  readonly testimonialColumns = computed(() => {
    const recommendations = this.workspace.content().recommendations;
    if (recommendations.length === 0) {
      return [];
    }

    return [0, 2, 4].map((offset) => [
      ...recommendations.slice(offset),
      ...recommendations.slice(0, offset),
    ]);
  });
  readonly loopCopies = [0, 1];

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly scrollScene = inject(ScrollSceneService);
  private viewReady = false;
  private swipeStartX = 0;
  private lastDirection = 1;

  constructor() {
    effect(() => {
      this.workspace.setUrlParams({ rec: this.selectedRecommendation().id });
      if (this.viewReady) {
        setTimeout(() => this.animateLetterSwap());
      }
    });
  }

  selectRecommendation(recommendationId: string): void {
    const nextIndex = this.workspace.content().recommendations.findIndex((item) => item.id === recommendationId);
    this.lastDirection = nextIndex >= this.selectedIndex() ? 1 : -1;
    this.selectedRecommendationId.set(recommendationId);
    this.workspace.setUrlParams({ scene: 'trust', rec: recommendationId });
  }

  startSwipe(event: PointerEvent): void {
    this.swipeStartX = event.clientX;
  }

  endSwipe(event: PointerEvent): void {
    const delta = event.clientX - this.swipeStartX;
    if (Math.abs(delta) < 42) {
      return;
    }

    delta < 0 ? this.goToOffset(1) : this.goToOffset(-1);
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.scrollScene.stagger(this.elementRef.nativeElement, '.testimonial-card');
  }

  relatedProjectsFor(recommendation: PortfolioRecommendation) {
    const ids = new Set(recommendation.relatedProjectIds);
    return this.workspace.content().projects.filter((project) => ids.has(project.id));
  }

  columnDuration(index: number): string {
    return `${[42, 54, 48][index] ?? 46}s`;
  }

  private animateLetterSwap(): void {
    const host = this.elementRef.nativeElement;
    const activeCards = gsap.utils.toArray(
      '.testimonial-card.active',
      host,
    ) as HTMLElement[];

    if (this.scrollScene.reducedMotion || activeCards.length === 0) {
      return;
    }

    gsap.killTweensOf(activeCards);
    gsap.fromTo(
      activeCards,
      { y: 10, scale: 0.985 },
      { y: 0, scale: 1, duration: 0.28, stagger: 0.035, ease: 'power2.out' },
    );
  }

  private goToOffset(offset: number): void {
    const recommendations = this.workspace.content().recommendations;
    const nextIndex = (this.selectedIndex() + offset + recommendations.length) % recommendations.length;
    this.lastDirection = offset > 0 ? 1 : -1;
    this.selectedRecommendationId.set(recommendations[nextIndex].id);
    this.workspace.setUrlParams({ scene: 'trust', rec: recommendations[nextIndex].id });
  }
}
