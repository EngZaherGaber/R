import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { AccentColor } from '../../../core/data/portfolio-content';
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
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  readonly isOpen = signal(false);

  toggleMenu(): void {
    this.isOpen.update((value) => !value);
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
