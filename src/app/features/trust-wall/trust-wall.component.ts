import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, computed, effect, inject, signal } from '@angular/core';
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
    this.scrollScene.stagger(this.elementRef.nativeElement, '.letter-button');
    this.scrollScene.reveal(this.elementRef.nativeElement, '.sealed-letter');
  }

  relatedProjectsFor(recommendation: PortfolioRecommendation) {
    const ids = new Set(recommendation.relatedProjectIds);
    return this.workspace.content().projects.filter((project) => ids.has(project.id));
  }

  private animateLetterSwap(): void {
    const card = this.elementRef.nativeElement.querySelector('.sealed-letter') as HTMLElement | null;
    if (card && this.scrollScene.isMobile()) {
      this.scrollScene.deckShuffle(card, this.lastDirection);
    }

    this.scrollScene.switchReveal(
      this.elementRef.nativeElement,
      '.sealed-letter img, .sealed-letter .signal, .sealed-letter h3, .sealed-letter strong, .sealed-letter blockquote, .related span, .seal',
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
