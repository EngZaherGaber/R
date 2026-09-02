import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import type { gsap as GsapType } from 'gsap';
import type { Draggable as DraggableType } from 'gsap/Draggable';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

type Gsap = typeof GsapType;
type ScrollTriggerCtor = typeof ScrollTriggerType;
type DraggableCtor = typeof DraggableType;

/**
 * The scene engine behind the portfolio's spatial identity.
 *
 * This is the evolved version of the original `ScrollSceneService`: the same
 * ideas (scroll-velocity warp, parallax star layers, scene choreography,
 * project/skill transitions, timeline growth) behind a much smaller API.
 *
 * GSAP + ScrollTrigger are loaded lazily so they stay out of the initial bundle
 * and out of the prerender pass, then drive the experience for real. Every
 * element is styled visible by default and animated *from* a hidden state, so
 * content is never gated behind JavaScript.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  readonly isBrowser: boolean;
  readonly viewport = signal<'mobile' | 'tablet' | 'desktop'>('desktop');

  private readonly documentRef = inject(DOCUMENT);
  private gsap?: Gsap;
  private ScrollTrigger?: ScrollTriggerCtor;
  private Draggable?: DraggableCtor;
  private loading?: Promise<void>;
  private reducedMotionQuery?: MediaQueryList;
  private ambientReady = false;
  private dampedWarp = 0;

  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    if (this.isBrowser) {
      this.reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.updateViewport();
      window.addEventListener('resize', this.updateViewport, { passive: true });
    }
  }

  /** Read live: a visitor can change the OS setting mid-session. */
  get reducedMotion(): boolean {
    return this.reducedMotionQuery?.matches ?? false;
  }

  isMobile(): boolean {
    return this.viewport() === 'mobile';
  }

  isDesktop(): boolean {
    return this.viewport() === 'desktop';
  }

  /* ------------------------------------------------------------- ambient -- */

  /**
   * Drives the cosmic field: parallax star layers, nebula drift and the grid
   * warp that reacts to scroll velocity. Skipped entirely on lean devices.
   */
  async setupAmbientScroll(): Promise<void> {
    if (this.ambientReady || !(await this.ready())) {
      return;
    }

    this.applyDeviceHints();
    if (this.documentRef.documentElement.hasAttribute('data-lean-motion')) {
      return;
    }

    const gsap = this.gsap!;
    const root = this.documentRef.documentElement;
    this.ambientReady = true;

    this.ScrollTrigger!.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const velocity = Math.min(Math.abs(self.getVelocity()), 4200);
        const target = gsap.utils.mapRange(0, 4200, 0, 1, velocity);
        this.dampedWarp += (target - this.dampedWarp) * 0.12;

        const scrollY = self.scroll();
        gsap.to(root, {
          '--grid-warp': `${gsap.utils.clamp(0, 30, this.dampedWarp * 30)}px`,
          '--wash-shift': `${gsap.utils.clamp(0, 36, this.dampedWarp * 36)}px`,
          '--star-near-y': `${scrollY * -0.12}px`,
          '--star-mid-y': `${scrollY * -0.065}px`,
          '--star-far-y': `${scrollY * -0.028}px`,
          '--star-drift-x': `${Math.sin(scrollY * 0.001) * 18}px`,
          '--star-stretch': gsap.utils.clamp(1, 4.2, 1 + this.dampedWarp * 3.2),
          duration: 0.28,
          overwrite: true,
          ease: 'power2.out',
        });
      },
    });
  }

  /* --------------------------------------------------------------- scenes - */

  /** Entrance choreography for the hero: copy, then the Nx workspace map. */
  async heroEntrance(scope: Element): Promise<void> {
    if (!(await this.ready())) {
      return;
    }

    const gsap = this.gsap!;
    const tokens = gsap.utils.toArray<HTMLElement>('.hero-token', scope);
    const nodes = gsap.utils.toArray<HTMLElement>('.map-node', scope);
    const links = gsap.utils.toArray<SVGPathElement>('.map-link', scope);
    const frame = scope.querySelector<HTMLElement>('.workspace-frame');

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    timeline.from(tokens, {
      autoAlpha: 0,
      y: 26,
      duration: 0.62,
      stagger: 0.07,
    });

    if (frame) {
      timeline.from(frame, { autoAlpha: 0, scale: 0.94, duration: 0.7 }, 0.15);
    }

    // The architecture assembles: nodes drop in, then the links draw between them.
    timeline.from(
      nodes,
      { autoAlpha: 0, y: 14, scale: 0.88, duration: 0.5, stagger: 0.06 },
      0.3,
    );

    if (links.length) {
      timeline.fromTo(
        links,
        { strokeDasharray: 1, strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.75, stagger: 0.1, ease: 'power2.inOut' },
        0.45,
      );
    }
  }

  /**
   * Section arrival: content rises into place as the scene enters the viewport.
   * Runs once per element, then releases the elements it touched.
   */
  async sectionReveal(scope: Element, selector = '.reveal'): Promise<void> {
    if (!(await this.ready())) {
      return;
    }

    const gsap = this.gsap!;
    const targets = gsap.utils.toArray<HTMLElement>(selector, scope);
    if (!targets.length) {
      return;
    }

    this.ScrollTrigger!.batch(targets, {
      start: 'top 86%',
      once: true,
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.06,
            ease: 'power3.out',
            overwrite: true,
            // Hand the element back to CSS afterwards: nothing stays stuck with
            // an inline opacity if a tween is interrupted.
            clearProps: 'opacity,visibility,transform',
          },
        ),
    });

    // A deep link or a restored scroll position can land past these triggers.
    this.ScrollTrigger!.refresh();
  }

  /**
   * Project switch. The stage recedes and returns with the new system, and the
   * project's own visual (architecture map, actor flow, gallery) re-assembles.
   */
  async projectTransition(scope: Element, direction = 1): Promise<void> {
    if (!(await this.ready())) {
      return;
    }

    const gsap = this.gsap!;
    const stage = scope.querySelector<HTMLElement>('.stage-body');
    const headline = gsap.utils.toArray<HTMLElement>(
      '.stage-kicker, .stage-title, .stage-descriptor, .stage-summary, .stage-meta > *, .stage-actions',
      scope,
    );
    const systemNodes = gsap.utils.toArray<HTMLElement>('.arch-node, .flow-node', scope);
    const links = gsap.utils.toArray<SVGPathElement>('.arch-link', scope);

    gsap.killTweensOf([stage, ...headline, ...systemNodes]);

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (stage) {
      timeline.fromTo(
        stage,
        { autoAlpha: 0.15, x: 34 * direction, scale: 0.985 },
        { autoAlpha: 1, x: 0, scale: 1, duration: 0.42 },
      );
    }

    timeline.fromTo(
      headline,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.44, stagger: 0.04 },
      0.06,
    );

    if (systemNodes.length) {
      timeline.fromTo(
        systemNodes,
        { autoAlpha: 0, y: 12, scale: 0.9 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, stagger: 0.05 },
        0.16,
      );
    }

    if (links.length) {
      timeline.fromTo(
        links,
        { strokeDasharray: 1, strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.6, stagger: 0.07, ease: 'power2.inOut' },
        0.26,
      );
    }
  }

  /** Panel switch inside a selected project (Overview / Architecture / Evidence). */
  async panelSwap(scope: Element, selector: string): Promise<void> {
    if (!(await this.ready())) {
      return;
    }

    const gsap = this.gsap!;
    const targets = gsap.utils.toArray<HTMLElement>(selector, scope);
    if (!targets.length) {
      return;
    }

    gsap.killTweensOf(targets);
    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.04, ease: 'power2.out', overwrite: true },
    );
  }

  /** Skill constellation: the selected node pulses, the evidence panel swaps in. */
  async skillTransition(scope: Element): Promise<void> {
    if (!(await this.ready())) {
      return;
    }

    const gsap = this.gsap!;
    const orb = scope.querySelector<HTMLElement>('.detail-orb');
    const details = gsap.utils.toArray<HTMLElement>('.evidence-swap', scope);
    const nodes = gsap.utils.toArray<HTMLElement>('.constellation-node', scope);

    if (orb) {
      gsap.killTweensOf(orb);
      gsap.fromTo(
        orb,
        { scale: 0.72, autoAlpha: 0, rotate: -18 },
        { scale: 1, autoAlpha: 1, rotate: 0, duration: 0.56, ease: 'back.out(1.6)' },
      );
    }

    gsap.fromTo(
      nodes,
      { scale: 0.94, opacity: 0.78 },
      { scale: 1, opacity: 1, duration: 0.34, stagger: 0.015, ease: 'power2.out' },
    );

    gsap.killTweensOf(details);
    gsap.fromTo(
      details,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.46, stagger: 0.05, ease: 'power3.out' },
    );
  }

  /**
   * Particles travelling from the node the visitor picked to the evidence orb -
   * the small touch that made the original skill map feel connected.
   */
  async skillBurst(scope: HTMLElement, origin: HTMLElement): Promise<void> {
    if (!this.isDesktop() || !(await this.ready())) {
      return;
    }

    const target = scope.querySelector<HTMLElement>('.detail-orb');
    if (!target) {
      return;
    }

    const gsap = this.gsap!;
    const host = scope.getBoundingClientRect();
    const from = origin.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const startX = from.left + from.width / 2 - host.left;
    const startY = from.top + from.height / 2 - host.top;
    const endX = to.left + to.width / 2 - host.left;
    const endY = to.top + to.height / 2 - host.top;

    const particles = Array.from({ length: 10 }, () => {
      const particle = this.documentRef.createElement('span');
      particle.className = 'skill-particle';
      particle.setAttribute('aria-hidden', 'true');
      scope.appendChild(particle);
      return particle;
    });

    gsap.set(particles, { x: startX, y: startY, autoAlpha: 1, scale: 0.4 });
    gsap.to(particles, {
      x: (index: number) => endX + Math.sin(index) * 14,
      y: (index: number) => endY + Math.cos(index) * 14,
      scale: 1,
      autoAlpha: 0,
      duration: 0.55,
      stagger: 0.02,
      ease: 'power3.inOut',
      onComplete: () => particles.forEach((particle) => particle.remove()),
    });
  }

  /** Recommendation swap in the trust wall. */
  async trustTransition(scope: Element, direction = 1): Promise<void> {
    if (!(await this.ready())) {
      return;
    }

    const gsap = this.gsap!;
    const letter = scope.querySelector<HTMLElement>('.trust-letter');
    if (!letter) {
      return;
    }

    gsap.killTweensOf(letter);
    gsap.fromTo(
      letter,
      { autoAlpha: 0, x: 42 * direction, scale: 0.96 },
      { autoAlpha: 1, x: 0, scale: 1, duration: 0.42, ease: 'power3.out' },
    );
  }

  /** The commit line grows as the visitor scrolls the experience timeline. */
  async timelineReveal(scope: Element): Promise<void> {
    if (!(await this.ready())) {
      return;
    }

    const gsap = this.gsap!;
    const line = scope.querySelector<HTMLElement>('.commit-line');
    const cards = gsap.utils.toArray<HTMLElement>('.commit-card', scope);
    if (!line) {
      return;
    }

    gsap.fromTo(
      line,
      { '--commit-progress': '0%' },
      {
        '--commit-progress': '100%',
        ease: 'none',
        scrollTrigger: { trigger: line, start: 'top 76%', end: 'bottom 55%', scrub: true },
      },
    );

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0.35, x: index % 2 === 0 ? -22 : 22 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.44,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            once: true,
            toggleClass: { targets: card, className: 'commit-active' },
          },
        },
      );
    });
  }

  /* ------------------------------------------------------------- sheets --- */

  /** Drag-to-dismiss bottom sheet, used for skill and service details on mobile. */
  async createDismissSheet(sheet: HTMLElement, onDismiss: () => void): Promise<() => void> {
    if (!(await this.ready())) {
      return () => undefined;
    }

    const gsap = this.gsap!;
    gsap.fromTo(sheet, { yPercent: 100 }, { yPercent: 0, duration: 0.32, ease: 'power3.out' });

    const instances = this.Draggable!.create(sheet, {
      type: 'y',
      bounds: { minY: 0, maxY: window.innerHeight },
      inertia: false,
      onDragEnd(this: DraggableType) {
        if (this.y > sheet.offsetHeight * 0.24) {
          gsap.to(sheet, { yPercent: 100, duration: 0.22, ease: 'power2.in', onComplete: onDismiss });
        } else {
          gsap.to(sheet, { y: 0, duration: 0.25, ease: 'power2.out' });
        }
      },
    });

    return () => instances.forEach((instance) => instance.kill());
  }

  /* ------------------------------------------------------------ plumbing -- */

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
    const header = this.documentRef.querySelector<HTMLElement>('.story-header');
    return (header?.offsetHeight ?? 60) + 18;
  }

  async refresh(): Promise<void> {
    if (await this.ready()) {
      this.ScrollTrigger!.refresh();
    }
  }

  dispose(): void {
    if (this.isBrowser) {
      window.removeEventListener('resize', this.updateViewport);
    }
    this.ScrollTrigger?.getAll().forEach((trigger) => trigger.kill());
    this.ambientReady = false;
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
      const [{ gsap }, { ScrollTrigger }, { Draggable }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('gsap/Draggable'),
      ]);
      gsap.registerPlugin(ScrollTrigger, Draggable);
      this.gsap = gsap;
      this.ScrollTrigger = ScrollTrigger;
      this.Draggable = Draggable;
    })();

    await this.loading;
    return true;
  }

  /**
   * Marks devices that should not run the heavier ambient effects. The
   * stylesheet reads `data-lean-motion` and drops the near star layer, the
   * blend mode and the continuous grid drift.
   */
  private applyDeviceHints(): void {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const lowCoreCount = (navigator.hardwareConcurrency ?? 8) <= 4;
    const lean = coarsePointer || lowCoreCount || this.viewport() !== 'desktop';
    this.documentRef.documentElement.toggleAttribute('data-lean-motion', lean);
  }

  private readonly updateViewport = (): void => {
    const width = window.innerWidth;
    const next = width <= 640 ? 'mobile' : width <= 1024 ? 'tablet' : 'desktop';
    this.viewport.set(next);
    this.documentRef.documentElement.dataset['viewport'] = next;
    this.applyDeviceHints();
  };
}
