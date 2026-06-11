import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';

@Component({
  selector: 'git-timeline',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './git-timeline.component.html',
  styleUrl: './git-timeline.component.scss',
})
export class GitTimelineComponent {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly selectedEntryId = signal(this.workspace.readUrlParam('entry') ?? 'ici');
  readonly selectedEntry = computed(() => {
    const entries = this.workspace.content().timeline;
    return entries.find((entry) => entry.id === this.selectedEntryId()) ?? entries[0];
  });

  constructor() {
    effect(() => {
      this.workspace.setUrlParams({ entry: this.selectedEntry().id });
    });
  }
}
