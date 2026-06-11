import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';

@Component({
  selector: 'recommendations',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss',
})
export class RecommendationsComponent {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly selectedRecommendationId = signal(
    this.workspace.readUrlParam('rec') ?? this.workspace.content().recommendations[0]?.id,
  );
  readonly selectedRecommendation = computed(() => {
    const recommendations = this.workspace.content().recommendations;
    return (
      recommendations.find((recommendation) => recommendation.id === this.selectedRecommendationId()) ??
      recommendations[0]
    );
  });
  readonly relatedProjects = computed(() => {
    const ids = new Set(this.selectedRecommendation().relatedProjectIds);
    return this.workspace.content().projects.filter((project) => ids.has(project.id));
  });
  readonly ratingStars = computed(() => Array.from({ length: this.selectedRecommendation().rating ?? 0 }));

  constructor() {
    effect(() => this.workspace.setUrlParams({ rec: this.selectedRecommendation().id }));
  }

  selectRecommendation(recommendationId: string): void {
    this.selectedRecommendationId.set(recommendationId);
  }
}
