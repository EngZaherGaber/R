import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, signal } from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { ScrollSceneService } from '../../core/services/scroll-scene.service';

@Component({
  selector: 'contact-command',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-command.component.html',
  styleUrl: './contact-command.component.scss',
})
export class ContactCommandComponent implements AfterViewInit {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly cvPath = 'newCv.pdf';
  readonly executingId = signal<string | null>(null);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly scrollScene = inject(ScrollSceneService);

  ngAfterViewInit(): void {
    this.scrollScene.stagger(this.elementRef.nativeElement, '.command-row');
  }

  executeContact(id: string, href?: string): void {
    this.executingId.set(id);
    setTimeout(() => {
      this.executingId.set(null);
      this.openContact(href);
    }, 400);
  }

  executeDownload(): void {
    this.executingId.set('cv');
    setTimeout(() => {
      this.executingId.set(null);
      this.downloadCv();
    }, 400);
  }

  private openContact(href?: string): void {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  }

  private downloadCv(): void {
    window.open(this.cvPath, '_blank', 'noopener,noreferrer');
  }
}
