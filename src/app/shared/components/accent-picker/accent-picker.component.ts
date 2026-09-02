import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { AccentColor } from '../../../core/models/portfolio.model';
import { WorkspacePreferencesService } from '../../../core/services/workspace-preferences.service';

@Component({
  selector: 'accent-picker',
  standalone: true,
  templateUrl: './accent-picker.component.html',
  styleUrl: './accent-picker.component.scss',
})
export class AccentPickerComponent {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly isOpen = signal(false);

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  toggleMenu(): void {
    this.isOpen.update((open) => !open);
  }

  selectAccent(accent: AccentColor): void {
    this.workspace.setAccent(accent);
    this.isOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen.set(false);
    }
  }
}
