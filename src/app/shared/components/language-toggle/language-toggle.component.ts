import { Component, inject } from '@angular/core';
import { WorkspacePreferencesService } from '../../../core/services/workspace-preferences.service';

@Component({
  selector: 'language-toggle',
  standalone: true,
  templateUrl: './language-toggle.component.html',
  styleUrl: './language-toggle.component.scss',
})
export class LanguageToggleComponent {
  readonly workspace = inject(WorkspacePreferencesService);
}
