import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { ScrollSceneService } from '../../core/services/scroll-scene.service';
import {
  SectionProgressComponent,
  StorySectionLink,
} from '../../shared/components/section-progress/section-progress.component';
import { AccentPickerComponent } from '../../shared/components/accent-picker/accent-picker.component';
import { LanguageToggleComponent } from '../../shared/components/language-toggle/language-toggle.component';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { HeroSceneComponent } from '../hero-scene/hero-scene.component';
import { ProjectStoriesComponent } from '../project-stories/project-stories.component';
import { CoPilotEngineComponent } from '../co-pilot-engine/co-pilot-engine.component';
import { SkillEvidenceComponent } from '../skill-evidence/skill-evidence.component';
import { AiAssessmentComponent } from '../ai-assessment/ai-assessment.component';
import { ServiceOffersComponent } from '../service-offers/service-offers.component';
import { TrustWallComponent } from '../trust-wall/trust-wall.component';
import { GitHistoryComponent } from '../git-history/git-history.component';
import { ContactCommandComponent } from '../contact-command/contact-command.component';

@Component({
  selector: 'story-shell',
  standalone: true,
  imports: [
    SectionProgressComponent,
    AccentPickerComponent,
    LanguageToggleComponent,
    ThemeToggleComponent,
    HeroSceneComponent,
    ProjectStoriesComponent,
    CoPilotEngineComponent,
    SkillEvidenceComponent,
    AiAssessmentComponent,
    ServiceOffersComponent,
    TrustWallComponent,
    GitHistoryComponent,
    ContactCommandComponent,
  ],
  templateUrl: './story-shell.component.html',
  styleUrl: './story-shell.component.scss',
})
export class StoryShellComponent implements AfterViewInit, OnDestroy {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly scrollScene = inject(ScrollSceneService);
  readonly activeScene = signal(this.workspace.readUrlParam('scene') ?? 'hero');
  readonly sections = computed<StorySectionLink[]>(() => {
    const nav = this.workspace.content().nav;
    const item = (navId: string, sceneId: string, fallback: string, icon: string): StorySectionLink => {
      const match = nav.find((entry) => entry.id === navId);
      return {
        id: sceneId,
        label: match?.label ?? fallback,
        icon: match?.icon ?? icon,
      };
    };

    return [
      item('overview', 'hero', 'Overview', 'bi bi-stars'),
      item('projects', 'projects', 'Projects', 'bi bi-folder2-open'),
      item('copilot', 'copilot', 'Co-Pilot', 'bi bi-cpu'),
      item('skills', 'skills', 'Skills', 'bi bi-diagram-3'),
      {
        id: 'ai-review',
        label: this.workspace.language() === 'ar' ? 'تقييم AI' : 'AI Review',
        icon: 'bi bi-chat-square-text',
      },
      item('services', 'services', 'Services', 'bi bi-box-seam'),
      item('recommendations', 'trust', 'Trust', 'bi bi-envelope-paper'),
      item('timeline', 'history', 'Timeline', 'bi bi-git'),
      item('contact', 'contact', 'Contact', 'bi bi-terminal'),
    ];
  });

  private sceneElements: HTMLElement[] = [];
  private ticking = false;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.sceneElements = Array.from(
      this.elementRef.nativeElement.querySelectorAll('[data-scene]') as NodeListOf<HTMLElement>,
    );

    this.scrollScene.setupKineticSceneVars();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
    this.updateActiveSceneFromViewport();
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onScroll);
    }
  }

  goTo(scene: string): void {
    this.scrollScene.scrollToScene(scene);
  }

  private readonly onScroll = (): void => {
    if (this.ticking) {
      return;
    }

    this.ticking = true;
    requestAnimationFrame(() => {
      this.updateActiveSceneFromViewport();
      this.ticking = false;
    });
  };

  private updateActiveSceneFromViewport(): void {
    if (this.sceneElements.length === 0) {
      return;
    }

    const trackingY = window.scrollY + this.scrollScene.sceneScrollOffset() + 1;
    let activeElement = this.sceneElements[0];

    for (const section of this.sceneElements) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      if (sectionTop > trackingY) {
        break;
      }
      activeElement = section;
    }

    const pageBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    if (pageBottom) {
      activeElement = this.sceneElements[this.sceneElements.length - 1];
    }

    const activeScene = activeElement.getAttribute('data-scene') ?? 'hero';
    if (activeScene !== this.activeScene()) {
      this.activeScene.set(activeScene);
      this.workspace.setUrlParams(this.sceneUrlParams(activeScene), false);
    }
  }

  private sceneUrlParams(scene: string): Record<string, string | null> {
    return {
      scene,
      tool: scene === 'copilot' ? 'co-pilot-engine' : null,
    };
  }
}
