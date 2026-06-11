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
  readonly sections = computed<StorySectionLink[]>(() => [
    { id: 'hero', label: this.workspace.content().nav[0].label, icon: 'bi bi-stars' },
    { id: 'projects', label: this.workspace.content().nav[1].label, icon: 'bi bi-folder2-open' },
    { id: 'skills', label: this.workspace.content().nav[2].label, icon: 'bi bi-diagram-3' },
    { id: 'services', label: this.workspace.content().nav[3].label, icon: 'bi bi-box-seam' },
    { id: 'trust', label: this.workspace.content().nav[5].label, icon: 'bi bi-envelope-paper' },
    { id: 'history', label: this.workspace.content().nav[4].label, icon: 'bi bi-git' },
    { id: 'contact', label: this.workspace.content().nav[6].label, icon: 'bi bi-terminal' },
  ]);

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
          this.workspace.setUrlParams({ scene });
        }
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0.05, 0.18, 0.4] },
    );

    this.sceneElements.forEach((section) => {
      this.observer?.observe(section);
    });
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
    this.workspace.setUrlParams({ scene });
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
      this.workspace.setUrlParams({ scene: active.scene });
    }
  }
}
