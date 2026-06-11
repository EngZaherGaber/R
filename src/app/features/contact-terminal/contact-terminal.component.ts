import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';

@Component({
  selector: 'contact-terminal',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './contact-terminal.component.html',
  styleUrl: './contact-terminal.component.scss',
})
export class ContactTerminalComponent {
  readonly copied = signal(false);

  constructor(public readonly workspace: WorkspacePreferencesService) {}

  copyEmail(): void {
    const email = this.workspace.content().contacts.find((contact) => contact.id === 'email')?.value;
    if (!email) {
      return;
    }

    void navigator.clipboard?.writeText(email);
    this.copied.set(true);
    window.setTimeout(() => this.copied.set(false), 1600);
  }
}
