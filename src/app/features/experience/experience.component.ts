import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { experience, recommendations } from '../../core/data/experience.data';
import { projectById } from '../../core/data/projects.data';
import { ExperienceEntry } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements AfterViewInit {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;

  readonly entries = experience;
  /** References sit with the experience they belong to, not in a marketing carousel. */
  readonly references = recommendations;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly motion = inject(MotionService);

  ngAfterViewInit(): void {
    void this.motion.revealOnScroll(this.elementRef.nativeElement, '.reveal');
  }

  kindLabel(entry: ExperienceEntry): string {
    return this.workspace.t(this.ui.experience.kinds[entry.kind]);
  }

  relatedProjectNames(entry: ExperienceEntry): string[] {
    return (entry.projectIds ?? [])
      .map((id) => projectById(id))
      .filter((project): project is NonNullable<typeof project> => Boolean(project))
      .map((project) => this.workspace.t(project.name));
  }
}
