import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';

@Component({
  selector: 'skill-graph',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './skill-graph.component.html',
  styleUrl: './skill-graph.component.scss',
})
export class SkillGraphComponent {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly selectedSkillId = signal(this.workspace.readUrlParam('skill') ?? 'ngrx');
  readonly selectedSkill = computed(() => {
    const skills = this.workspace.content().skills;
    return skills.find((skill) => skill.id === this.selectedSkillId()) ?? skills[0];
  });
  readonly relatedProjects = computed(() => {
    const ids = new Set(this.selectedSkill().projectIds);
    return this.workspace.content().projects.filter((project) => ids.has(project.id));
  });

  constructor() {
    effect(() => {
      this.workspace.setUrlParams({ skill: this.selectedSkill().id });
    });
  }
}
