import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { skillCategories } from '../../core/data/skills.data';
import { projectById } from '../../core/data/projects.data';
import { Skill } from '../../core/models/portfolio.model';

/**
 * The skill constellation, rebuilt on the typed skill data.
 *
 * Categories are the orbit; selecting one reveals its skills as nodes, and
 * selecting a node shows where that technology was actually used.
 */
@Component({
  selector: 'app-expertise',
  standalone: true,
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.scss',
  host: { '[class.sheet-open]': 'sheetOpen()' },
})
export class ExpertiseComponent implements AfterViewInit, OnDestroy {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;
  readonly categories = skillCategories;

  @ViewChild('sheet') private sheetRef?: ElementRef<HTMLElement>;

  readonly categoryId = signal(skillCategories[0].id);
  readonly skillId = signal(skillCategories[0].skills[0].id);
  readonly sheetOpen = signal(false);

  readonly category = computed(
    () => this.categories.find((item) => item.id === this.categoryId()) ?? this.categories[0],
  );
  readonly skill = computed<Skill>(
    () => this.category().skills.find((item) => item.id === this.skillId()) ?? this.category().skills[0],
  );
  readonly proofProjects = computed(() =>
    this.skill()
      .projectIds.map((id) => projectById(id))
      .filter((project): project is NonNullable<typeof project> => Boolean(project)),
  );

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private destroySheet?: () => void;

  ngAfterViewInit(): void {
    void this.motion.sectionReveal(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.closeSheet();
  }

  selectCategory(categoryId: string): void {
    if (categoryId === this.categoryId()) {
      return;
    }
    this.categoryId.set(categoryId);
    this.skillId.set(this.category().skills[0].id);
    void this.motion.skillTransition(this.elementRef.nativeElement);
  }

  selectSkill(skillId: string, origin?: HTMLElement): void {
    this.skillId.set(skillId);
    void this.motion.skillTransition(this.elementRef.nativeElement);

    if (origin) {
      void this.motion.skillBurst(this.elementRef.nativeElement, origin);
    }

    if (this.motion.isMobile()) {
      this.openSheet();
    }
  }

  /** Places nodes around the orbit; the count varies per category. */
  nodeStyle(index: number, total: number): Record<string, string> {
    const angle = (index / Math.max(1, total)) * Math.PI * 2 - Math.PI / 2;
    return {
      '--x': `${50 + Math.cos(angle) * 36}%`,
      '--y': `${50 + Math.sin(angle) * 34}%`,
      '--delay': `${index * 80}ms`,
    };
  }

  closeSheet(): void {
    this.sheetOpen.set(false);
    this.destroySheet?.();
    this.destroySheet = undefined;
  }

  private openSheet(): void {
    this.sheetOpen.set(true);
    setTimeout(async () => {
      const sheet = this.sheetRef?.nativeElement;
      if (!sheet) {
        return;
      }
      this.destroySheet?.();
      this.destroySheet = await this.motion.createDismissSheet(sheet, () => this.closeSheet());
    });
  }
}
