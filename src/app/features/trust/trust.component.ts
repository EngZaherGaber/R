import { AfterViewInit, Component, ElementRef, computed, inject, signal } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { recommendations } from '../../core/data/experience.data';
import { projectById } from '../../core/data/projects.data';

/**
 * The trust wall. A selected testimonial reads like a letter, with the other
 * senders always one click away and a slow context ribbon behind it.
 *
 * The English text is the exact approved wording; the Arabic is labelled as a
 * translation of it.
 */
@Component({
  selector: 'app-trust',
  standalone: true,
  templateUrl: './trust.component.html',
  styleUrl: './trust.component.scss',
})
export class TrustComponent implements AfterViewInit {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;
  readonly recommendations = recommendations;

  readonly selectedId = signal(recommendations[0].id);
  readonly ribbonPaused = signal(false);

  readonly selected = computed(
    () => this.recommendations.find((item) => item.id === this.selectedId()) ?? this.recommendations[0],
  );
  readonly selectedIndex = computed(() =>
    Math.max(0, this.recommendations.findIndex((item) => item.id === this.selectedId())),
  );
  readonly relatedProjects = computed(() =>
    this.selected()
      .projectIds.map((id) => projectById(id))
      .filter((project): project is NonNullable<typeof project> => Boolean(project)),
  );
  /** Doubled so the ribbon can loop without a visible seam. */
  readonly ribbon = computed(() => [...this.recommendations, ...this.recommendations]);

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);

  ngAfterViewInit(): void {
    void this.motion.sectionReveal(this.elementRef.nativeElement);
  }

  select(id: string): void {
    if (id === this.selectedId()) {
      return;
    }
    const direction =
      this.recommendations.findIndex((item) => item.id === id) >= this.selectedIndex() ? 1 : -1;
    this.selectedId.set(id);
    void this.motion.trustTransition(this.elementRef.nativeElement, direction);
  }

  step(offset: number): void {
    const next =
      (this.selectedIndex() + offset + this.recommendations.length) % this.recommendations.length;
    this.select(this.recommendations[next].id);
  }

  toggleRibbon(): void {
    this.ribbonPaused.update((paused) => !paused);
  }

  initial(name: string): string {
    return name.charAt(0);
  }
}
