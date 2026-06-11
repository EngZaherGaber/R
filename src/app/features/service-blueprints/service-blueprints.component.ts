import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';

@Component({
  selector: 'service-blueprints',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './service-blueprints.component.html',
  styleUrl: './service-blueprints.component.scss',
})
export class ServiceBlueprintsComponent {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly selectedServiceId = signal(this.workspace.readUrlParam('service') ?? 'angular-apps');
  readonly selectedService = computed(() => {
    const services = this.workspace.content().services;
    return services.find((service) => service.id === this.selectedServiceId()) ?? services[0];
  });
  readonly relatedSkills = computed(() => {
    const ids = new Set(this.selectedService().relatedSkillIds);
    return this.workspace.content().skills.filter((skill) => ids.has(skill.id));
  });
  readonly relatedProjects = computed(() => {
    const ids = new Set(this.selectedService().relatedProjectIds);
    return this.workspace.content().projects.filter((project) => ids.has(project.id));
  });

  constructor() {
    effect(() => this.workspace.setUrlParams({ service: this.selectedService().id }));
  }

  selectService(serviceId: string): void {
    this.selectedServiceId.set(serviceId);
  }
}
