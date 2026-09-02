import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { experience } from '../../core/data/experience.data';
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

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);

  ngAfterViewInit(): void {
    void this.motion.sectionReveal(this.elementRef.nativeElement);
    void this.motion.timelineReveal(this.elementRef.nativeElement);
  }

  /**
   * A stable short hash per entry, so the commit metaphor reads as real without
   * pretending to reference an actual repository.
   */
  commitHash(id: string): string {
    let hash = 0;
    for (const char of id) {
      hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    }
    return hash.toString(16).padStart(7, '0').slice(0, 7);
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
