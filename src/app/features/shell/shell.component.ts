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
import { MotionService } from '../../core/services/motion.service';
import { SeoService } from '../../core/services/seo.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { SectionId } from '../../core/models/portfolio.model';
import { AccentPickerComponent } from '../../shared/components/accent-picker/accent-picker.component';
import { LanguageToggleComponent } from '../../shared/components/language-toggle/language-toggle.component';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { HeroComponent } from '../hero/hero.component';
import { WorkComponent } from '../work/work.component';
import { ExpertiseComponent } from '../expertise/expertise.component';
import { ExperienceComponent } from '../experience/experience.component';
import { MindsetComponent } from '../mindset/mindset.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    AccentPickerComponent,
    LanguageToggleComponent,
    ThemeToggleComponent,
    HeroComponent,
    WorkComponent,
    ExpertiseComponent,
    ExperienceComponent,
    MindsetComponent,
    ContactComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements AfterViewInit, OnDestroy {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly motion = inject(MotionService);

  readonly activeSection = signal<SectionId>('home');
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  readonly year = new Date().getFullYear();

  readonly ui = this.workspace.ui;
  readonly navItems = this.workspace.navigation;
  readonly brandName = computed(() => this.workspace.t(this.workspace.profile.name));
  readonly brandRole = computed(() => this.workspace.t(this.workspace.profile.role));

  private observer?: IntersectionObserver;
  private readonly isBrowser: boolean;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: object,
    // Instantiating the SEO service wires up title, meta, canonical and JSON-LD.
    private readonly seo: SeoService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
    this.observeSections();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  goTo(section: SectionId): void {
    this.menuOpen.set(false);
    this.activeSection.set(section);
    this.motion.scrollToSection(section);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  backToTop(): void {
    this.goTo('home');
  }

  private readonly onScroll = (): void => {
    this.scrolled.set(window.scrollY > 12);
  };

  /**
   * Section tracking via IntersectionObserver rather than a scroll handler that
   * measures every section on every frame.
   */
  private observeSections(): void {
    const sections = Array.from(
      this.elementRef.nativeElement.querySelectorAll<HTMLElement>('[data-section]'),
    );
    if (sections.length === 0) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const id = visible?.target.getAttribute('data-section');
        if (id) {
          this.activeSection.set(id as SectionId);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => this.observer!.observe(section));
  }
}
