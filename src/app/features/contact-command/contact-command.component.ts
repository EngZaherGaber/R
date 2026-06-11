import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
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
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly scrollScene = inject(ScrollSceneService);

  ngAfterViewInit(): void {
    this.scrollScene.stagger(this.elementRef.nativeElement, '.command-row');
  }

  openContact(href?: string): void {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  }

  downloadCv(): void {
    window.open(this.cvPath, '_blank', 'noopener,noreferrer');
  }
}
