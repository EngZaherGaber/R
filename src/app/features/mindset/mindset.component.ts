import { AfterViewInit, Component, ElementRef, computed, inject, signal } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { mindsetTopics } from '../../core/data/mindset.data';

/**
 * Replaces the previous simulated AI chat. These are static, first-person
 * positions - the interaction is a topic switcher, nothing is presented as a
 * live model response.
 */
@Component({
  selector: 'app-mindset',
  standalone: true,
  templateUrl: './mindset.component.html',
  styleUrl: './mindset.component.scss',
})
export class MindsetComponent implements AfterViewInit {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;
  readonly topics = mindsetTopics;

  readonly selectedId = signal(mindsetTopics[0].id);
  readonly selected = computed(
    () => this.topics.find((topic) => topic.id === this.selectedId()) ?? this.topics[0],
  );

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly motion = inject(MotionService);

  ngAfterViewInit(): void {
    void this.motion.revealOnScroll(this.elementRef.nativeElement, '.reveal');
  }

  select(topicId: string): void {
    if (topicId === this.selectedId()) {
      return;
    }
    this.selectedId.set(topicId);
    void this.motion.swap(this.elementRef.nativeElement, '.topic-detail > *');
  }
}
