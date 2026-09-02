import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { skillCategories } from '../../core/data/skills.data';
import { projectById } from '../../core/data/projects.data';

@Component({
  selector: 'app-expertise',
  standalone: true,
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.scss',
})
export class ExpertiseComponent implements AfterViewInit {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;
  readonly categories = skillCategories;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly motion = inject(MotionService);

  ngAfterViewInit(): void {
    void this.motion.revealOnScroll(this.elementRef.nativeElement, '.reveal');
  }

  /** Proof labels: the project names a skill was actually used in. */
  proofNames(projectIds: string[]): string[] {
    return projectIds
      .map((id) => projectById(id))
      .filter((project): project is NonNullable<typeof project> => Boolean(project))
      .map((project) => this.workspace.t(project.name));
  }
}
