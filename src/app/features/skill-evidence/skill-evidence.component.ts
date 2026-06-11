import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, computed, effect, inject, signal } from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { ScrollSceneService } from '../../core/services/scroll-scene.service';

@Component({
  selector: 'skill-evidence',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-evidence.component.html',
  styleUrl: './skill-evidence.component.scss',
})
export class SkillEvidenceComponent implements AfterViewInit {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly selectedSkillId = signal(this.workspace.readUrlParam('skill') ?? 'rxjs');
  readonly selectedSkill = computed(
    () => this.workspace.content().skills.find((skill) => skill.id === this.selectedSkillId()) ?? this.workspace.content().skills[0],
  );
  readonly relatedProjects = computed(() => {
    const ids = new Set(this.selectedSkill().projectIds);
    return this.workspace.content().projects.filter((project) => ids.has(project.id));
  });
  readonly activeIndex = computed(() =>
    Math.max(0, this.workspace.content().skills.findIndex((skill) => skill.id === this.selectedSkill().id)),
  );

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly scrollScene = inject(ScrollSceneService);
  private viewReady = false;
  private previousIndex = this.activeIndex();

  constructor() {
    effect(() => {
      this.workspace.setUrlParams({ skill: this.selectedSkill().id });
      if (this.viewReady) {
        const nextIndex = this.activeIndex();
        const direction = nextIndex >= this.previousIndex ? 1 : -1;
        this.previousIndex = nextIndex;
        setTimeout(() => this.scrollScene.skillSwap(this.elementRef.nativeElement, direction));
      }
    });
  }

  selectSkill(skillId: string): void {
    this.selectedSkillId.set(skillId);
    this.workspace.setUrlParams({ scene: 'skills', skill: skillId });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
  }

  skillNodeStyle(index: number): Record<string, string> {
    const positions = [
      [18, 15],
      [48, 10],
      [78, 16],
      [28, 33],
      [66, 33],
      [14, 52],
      [50, 52],
      [84, 52],
      [30, 72],
      [66, 72],
      [48, 88],
    ];
    const [x, y] = positions[index] ?? [50, 50];

    return {
      '--x': `${x}%`,
      '--y': `${y}%`,
      '--delay': `${index * 90}ms`,
    };
  }
}
