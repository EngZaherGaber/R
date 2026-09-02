import {
  Component,
  HostListener,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { WorkspacePreferencesService } from '../../../core/services/workspace-preferences.service';
import { recommendationById } from '../../../core/data/experience.data';
import { Project, ProjectScreenshot } from '../../../core/models/portfolio.model';

/**
 * Renders one project as a case study. Fields are optional by design: a project
 * shows an architecture diagram, an actor flow, a gallery or a before/after view
 * only when it genuinely has one.
 */
@Component({
  selector: 'project-case-study',
  standalone: true,
  templateUrl: './project-case-study.component.html',
  styleUrl: './project-case-study.component.scss',
  host: { '[class.is-flagship]': 'project().tier === "flagship"' },
})
export class ProjectCaseStudyComponent {
  readonly project = input.required<Project>();
  /** Compact projects render without the case-study body. */
  readonly compact = input(false);
  readonly index = input<number | null>(null);

  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;

  readonly lightbox = signal<ProjectScreenshot | null>(null);

  readonly gallery = computed<ProjectScreenshot[]>(() => {
    const project = this.project();
    return [...(project.cover ? [project.cover] : []), ...(project.screenshots ?? [])];
  });

  readonly references = computed(() =>
    (this.project().testimonialIds ?? [])
      .map((id) => recommendationById(id))
      .filter((item): item is NonNullable<typeof item> => Boolean(item)),
  );

  readonly liveUrl = computed(() => {
    const deployment = this.project().deployment;
    return deployment.kind === 'public' ? deployment.url : null;
  });

  readonly headingId = computed(() => `project-${this.project().id}-title`);

  openLightbox(shot: ProjectScreenshot): void {
    this.lightbox.set(shot);
  }

  closeLightbox(): void {
    this.lightbox.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeLightbox();
  }
}
