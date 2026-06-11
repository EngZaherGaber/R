import { Component, inject } from '@angular/core';
import { WorkspacePreferencesService } from '../../../core/services/workspace-preferences.service';

@Component({
  selector: 'theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  readonly workspace = inject(WorkspacePreferencesService);
}
