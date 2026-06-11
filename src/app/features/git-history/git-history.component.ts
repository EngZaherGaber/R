import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { ScrollSceneService } from '../../core/services/scroll-scene.service';

@Component({
  selector: 'git-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './git-history.component.html',
  styleUrl: './git-history.component.scss',
})
export class GitHistoryComponent implements AfterViewInit {
  readonly workspace = inject(WorkspacePreferencesService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly scrollScene = inject(ScrollSceneService);

  ngAfterViewInit(): void {
    this.scrollScene.stagger(this.elementRef.nativeElement, '.commit-card');
    this.scrollScene.growTimeline(this.elementRef.nativeElement);
  }
}
