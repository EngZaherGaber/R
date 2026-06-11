import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Output, inject } from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { ScrollSceneService } from '../../core/services/scroll-scene.service';

@Component({
  selector: 'hero-scene',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-scene.component.html',
  styleUrl: './hero-scene.component.scss',
})
export class HeroSceneComponent implements AfterViewInit {
  @Output() navigateTo = new EventEmitter<string>();

  readonly workspace = inject(WorkspacePreferencesService);
  readonly tags = ['Angular Engineer', 'ERP Interfaces', 'Shopify', 'Product-minded UI'];
  readonly cvPath = 'newCv.pdf';

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly scrollScene = inject(ScrollSceneService);

  ngAfterViewInit(): void {
    this.scrollScene.stagger(this.elementRef.nativeElement, '.hero-token');
    this.scrollScene.reveal(this.elementRef.nativeElement, '.hero-card');
  }

  downloadCv(): void {
    window.open(this.cvPath, '_blank', 'noopener,noreferrer');
  }
}
