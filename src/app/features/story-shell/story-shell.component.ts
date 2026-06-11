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
      item('services', 'services', 'Services', 'bi bi-box-seam'),
      item('recommendations', 'trust', 'Trust', 'bi bi-envelope-paper'),
      item('timeline', 'history', 'Timeline', 'bi bi-git'),
      item('contact', 'contact', 'Contact', 'bi bi-terminal'),
    ];
  });

  private observer?: IntersectionObserver;
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

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const scene = visible?.target.getAttribute('data-scene');

        if (scene && scene !== this.activeScene()) {
          this.activeScene.set(scene);
          this.workspace.setUrlParams(this.sceneUrlParams(scene), false);
        }
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0.05, 0.18, 0.4] },
    );

    this.sceneElements.forEach((section) => {
      this.observer?.observe(section);
    });
    this.scrollScene.setupKineticSceneVars();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
    this.updateActiveSceneFromViewport();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onScroll);
    }
  }

  goTo(scene: string): void {
    this.activeScene.set(scene);
    this.workspace.setUrlParams(this.sceneUrlParams(scene));
    this.scrollScene.scrollTo(`scene-${scene}`);
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
    const viewportAnchor = window.innerHeight * 0.42;
    const active = this.sceneElements
      .map((section) => {
        const rect = section.getBoundingClientRect();
        return {
          scene: section.getAttribute('data-scene') ?? 'hero',
          distance: Math.abs(rect.top - viewportAnchor),
          visible: rect.bottom > viewportAnchor && rect.top < window.innerHeight,
        };
      })
      .filter((item) => item.visible)
      .sort((a, b) => a.distance - b.distance)[0];

    if (active && active.scene !== this.activeScene()) {
      this.activeScene.set(active.scene);
      this.workspace.setUrlParams(this.sceneUrlParams(active.scene), false);
    }
  }

  private sceneUrlParams(scene: string): Record<string, string | null> {
    return {
      scene,
      tool: scene === 'copilot' ? 'co-pilot-engine' : null,
    };
  }
}
