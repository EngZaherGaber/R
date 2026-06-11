import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { ProjectExplorerComponent } from '../project-explorer/project-explorer.component';
import { SkillGraphComponent } from '../skill-graph/skill-graph.component';
import { GitTimelineComponent } from '../git-timeline/git-timeline.component';
import { ContactTerminalComponent } from '../contact-terminal/contact-terminal.component';
import { ServiceBlueprintsComponent } from '../service-blueprints/service-blueprints.component';
import { RecommendationsComponent } from '../recommendations/recommendations.component';

@Component({
  selector: 'portfolio-canvas',
  imports: [
    CommonModule,
    ProjectExplorerComponent,
    SkillGraphComponent,
    ServiceBlueprintsComponent,
    GitTimelineComponent,
    RecommendationsComponent,
    ContactTerminalComponent,
  ],
  standalone: true,
  templateUrl: './portfolio-canvas.component.html',
  styleUrl: './portfolio-canvas.component.scss',
})
export class PortfolioCanvasComponent {
  readonly cvPath = 'newCv.pdf';

  constructor(public readonly workspace: WorkspacePreferencesService) {}

  downloadCv(): void {
    window.open(this.cvPath, '_blank', 'noopener,noreferrer');
  }
}
