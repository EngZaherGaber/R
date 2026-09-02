import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import {
  archivedProjects,
  caseStudyProjects,
  flagshipProject,
} from '../../core/data/projects.data';
import { labWork } from '../../core/data/lab.data';
import { ProjectCaseStudyComponent } from '../../shared/components/project-case-study/project-case-study.component';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [ProjectCaseStudyComponent],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent implements AfterViewInit {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;

  readonly flagship = flagshipProject;
  /** Everything after the flagship, in storytelling order. */
  readonly projects = caseStudyProjects.slice(1);
  readonly archive = archivedProjects;
  readonly lab = labWork;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly motion = inject(MotionService);

  ngAfterViewInit(): void {
    void this.motion.revealOnScroll(this.elementRef.nativeElement, '.reveal');
  }

  /** Commerce work is presented compactly so it never competes with the platforms. */
  isCompact(projectId: string): boolean {
    return projectId === 'huelle';
  }
}
