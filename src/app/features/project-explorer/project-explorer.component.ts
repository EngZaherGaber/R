import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ProjectTab } from '../../core/data/portfolio-content';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';

@Component({
  selector: 'project-explorer',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './project-explorer.component.html',
  styleUrl: './project-explorer.component.scss',
})
export class ProjectExplorerComponent {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly projectTabs: ProjectTab[] = ['preview', 'architecture', 'metrics'];
  readonly selectedProjectId = signal(this.workspace.readUrlParam('project') ?? 'tli');
  readonly sortedProjects = computed(() =>
    [...this.workspace.content().projects].sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99)),
  );
  readonly featuredProjects = computed(() => this.sortedProjects().filter((project) => project.featured));
  readonly selectedProjectTab = signal<ProjectTab>(this.readProjectTabFromUrl());
  readonly selectedProject = computed(() => {
    const projects = this.sortedProjects();
    return projects.find((project) => project.id === this.selectedProjectId()) ?? projects[0];
  });
  readonly previewImages = computed(() => this.selectedProject().images?.slice(0, 4) ?? []);
  readonly remainingShots = computed(() => Math.max((this.selectedProject().images?.length ?? 0) - 4, 0));

  constructor() {
    effect(() => {
      this.workspace.setUrlParams({
        project: this.selectedProject().id,
        tab: this.selectedProjectTab(),
      });
    });
  }

  selectProject(projectId: string): void {
    this.selectedProjectId.set(projectId);
    this.selectedProjectTab.set('preview');
  }

  selectNextFeaturedProject(): void {
    const featured = this.featuredProjects();
    const currentIndex = featured.findIndex((project) => project.id === this.selectedProject().id);
    const nextProject = featured[(currentIndex + 1 + featured.length) % featured.length] ?? featured[0];
    if (nextProject) {
      this.selectProject(nextProject.id);
    }
  }

  private readProjectTabFromUrl(): ProjectTab {
    const tab = this.workspace.readUrlParam('tab') as ProjectTab | null;
    return tab && this.projectTabs.includes(tab) ? tab : 'preview';
  }
}
