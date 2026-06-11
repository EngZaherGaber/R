import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, computed, effect, inject, signal } from '@angular/core';
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
  readonly relatedProjects = computed(() => {
    const ids = new Set(this.selectedRecommendation().relatedProjectIds);
    return this.workspace.content().projects.filter((project) => ids.has(project.id));
  });

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly scrollScene = inject(ScrollSceneService);
  private viewReady = false;

  constructor() {
    effect(() => {
      this.workspace.setUrlParams({ rec: this.selectedRecommendation().id });
      if (this.viewReady) {
        setTimeout(() => this.animateLetterSwap());
      }
    });
  }

  selectRecommendation(recommendationId: string): void {
    this.selectedRecommendationId.set(recommendationId);
    this.workspace.setUrlParams({ scene: 'trust', rec: recommendationId });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.scrollScene.stagger(this.elementRef.nativeElement, '.letter-button');
    this.scrollScene.reveal(this.elementRef.nativeElement, '.sealed-letter');
  }

  private animateLetterSwap(): void {
    this.scrollScene.switchReveal(
      this.elementRef.nativeElement,
      '.sealed-letter img, .sealed-letter .signal, .sealed-letter h3, .sealed-letter strong, .sealed-letter blockquote, .related span, .seal',
    );
  }
}
