import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WorkspacePreferencesService } from '../../../core/services/workspace-preferences.service';

@Component({
  selector: 'accent-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accent-picker.component.html',
  styleUrl: './accent-picker.component.scss',
})
export class AccentPickerComponent {
  readonly workspace = inject(WorkspacePreferencesService);
}
