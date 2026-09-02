import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import type { gsap as GsapType } from 'gsap';

type Gsap = typeof GsapType;

/**
 * Motion is a supporting layer, not the product.
 *
 * GSAP is loaded lazily in the browser so it stays out of the initial bundle and
 * out of the prerender pass. Elements are always styled visible by default and
 * animated *from* a hidden state, so content is never gated behind JavaScript.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  readonly isBrowser: boolean;
  readonly viewport = signal<'mobile' | 'tablet' | 'desktop'>('desktop');

  private gsap?: Gsap;
  private scrollTrigger?: typeof import('gsap/ScrollTrigger').ScrollTrigger;
  private loading?: Promise<void>;
  private reducedMotionQuery?: MediaQueryList;

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.updateViewport();
      window.addEventListener('resize', this.updateViewport, { passive: true });
      this.applyDeviceHints();
    }
  }

  /** Read live rather than cached: a visitor can change the setting mid-session. */
  get reducedMotion(): boolean {
    return this.reducedMotionQuery?.matches ?? false;
  }

  isMobile(): boolean {
    return this.viewport() === 'mobile';
  }

  /** Fade-and-rise reveal for a group of elements as they enter the viewport. */
  async revealOnScroll(scope: Element, selector: string, stagger = 0.06): Promise<void> {
    if (!(await this.ready())) {
      return;
    }

    const gsap = this.gsap!;
    const ScrollTrigger = this.scrollTrigger!;
    const targets = gsap.utils.toArray<HTMLElement>(selector, scope);
    if (targets.length === 0) {
      return;
    }

    ScrollTrigger.batch(targets, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.from(batch, {
          autoAlpha: 0,
          y: 22,
          duration: 0.5,
          stagger,
          ease: 'power2.out',
          overwrite: true,
        }),
    });
  }

  /** Short swap used when the visitor changes the selected item in a section. */
  async swap(scope: Element, selector: string): Promise<void> {
    if (!(await this.ready())) {
      return;
    }

    const gsap = this.gsap!;
    const targets = gsap.utils.toArray<HTMLElement>(selector, scope);
    if (targets.length === 0) {
      return;
    }

    gsap.killTweensOf(targets);
    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.32, stagger: 0.035, ease: 'power2.out', overwrite: true },
    );
  }

  /** Hero entrance. Deliberately short - nothing here delays reading the page. */
  async heroEntrance(scope: Element): Promise<void> {
    if (!(await this.ready())) {
      return;
    }

    const gsap = this.gsap!;
    const tokens = gsap.utils.toArray<HTMLElement>('.hero-token', scope);
    const nodes = gsap.utils.toArray<HTMLElement>('.stack-node', scope);

    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .from(tokens, { autoAlpha: 0, y: 20, duration: 0.5, stagger: 0.06 })
      .from(nodes, { autoAlpha: 0, scale: 0.9, duration: 0.4, stagger: 0.04 }, '-=0.3');
  }

  /** Scroll to a section, accounting for the sticky header. */
  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) {
      return;
    }

    const target = this.documentRef.getElementById(`section-${sectionId}`);
    if (!target) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - this.headerOffset();
    window.scrollTo({
      top: Math.max(0, top),
      behavior: this.reducedMotion ? 'auto' : 'smooth',
    });
  }

  headerOffset(): number {
    if (!this.isBrowser) {
      return 0;
    }
    const header = this.documentRef.querySelector<HTMLElement>('.site-header');
    return (header?.offsetHeight ?? 64) + 12;
  }

  async refresh(): Promise<void> {
    if (await this.ready()) {
      this.scrollTrigger!.refresh();
    }
  }

  /**
   * Loads GSAP on first use. Resolves `false` when motion should not run at all
   * (server render, or the visitor asked for reduced motion).
   */
  private async ready(): Promise<boolean> {
    if (!this.isBrowser || this.reducedMotion) {
      return false;
    }

    this.loading ??= (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      this.gsap = gsap;
      this.scrollTrigger = ScrollTrigger;
    })();

    await this.loading;
    return true;
  }

  /**
   * Marks devices that should not run the heavier ambient effects. The stylesheet
   * reads `data-lean-motion` and drops blend layers, blur and continuous animation.
   */
  private applyDeviceHints(): void {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const lowCoreCount = (navigator.hardwareConcurrency ?? 8) <= 4;
    const lean = coarsePointer || lowCoreCount || this.viewport() !== 'desktop';
    this.documentRef.documentElement.toggleAttribute('data-lean-motion', lean);
  }

  private readonly updateViewport = (): void => {
    const width = window.innerWidth;
    this.viewport.set(width < 720 ? 'mobile' : width < 1100 ? 'tablet' : 'desktop');
    this.applyDeviceHints();
  };
}
