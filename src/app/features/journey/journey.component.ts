import { AfterViewInit, Component, ElementRef, computed, inject, signal } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { experience, recommendations } from '../../core/data/experience.data';
import { principles } from '../../core/data/mindset.data';
import { projectById } from '../../core/data/projects.data';
import { ExperienceEntry, Recommendation } from '../../core/models/portfolio.model';

/**
 * Journey merges what used to be three sections: the experience timeline, the
 * trust wall and the mindset section. Recommendations sit with the work they
 * describe, and the principles read as a conclusion rather than a résumé block.
 */
@Component({
  selector: 'app-journey',
  standalone: true,
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
})
export class JourneyComponent implements AfterViewInit {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;

  readonly milestones = experience;
  readonly principles = principles;
  readonly recommenders = recommendations;

  /** Which full recommendation is expanded, if any. */
  readonly openRecommendation = signal<string | null>(null);

  readonly hasOpen = computed(() => this.openRecommendation() !== null);

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);

  ngAfterViewInit(): void {
    void this.motion.sectionReveal(this.elementRef.nativeElement);
    void this.motion.journeyLine(this.elementRef.nativeElement);
  }

  kindLabel(entry: ExperienceEntry): string {
    return this.workspace.t(this.ui.journey.relatedWork);
  }

  relatedProjectNames(entry: ExperienceEntry): string[] {
    return (entry.projectIds ?? [])
      .map((id) => projectById(id))
      .filter((project): project is NonNullable<typeof project> => Boolean(project))
      .map((project) => this.workspace.t(project.name));
  }

  proofNames(projectIds: string[]): string[] {
    return projectIds
      .map((id) => projectById(id))
      .filter((project): project is NonNullable<typeof project> => Boolean(project))
      .map((project) => this.workspace.t(project.name));
  }

  toggle(id: string): void {
    this.openRecommendation.update((current) => (current === id ? null : id));
  }

  isOpen(id: string): boolean {
    return this.openRecommendation() === id;
  }

  contextFor(recommendation: Recommendation): string {
    return this.workspace.t(recommendation.context);
  }
}
