import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class ScrollSceneService {
  readonly isBrowser: boolean;
  readonly reducedMotion: boolean;
  readonly viewport = signal<'mobile' | 'tablet' | 'desktop'>('desktop');
  private velocity = 0;
  private dampedWarp = 0;

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.reducedMotion =
      this.isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.isBrowser) {
      gsap.registerPlugin(Draggable, Flip, ScrollToPlugin, ScrollTrigger);
      this.updateViewport();
      window.addEventListener('resize', this.updateViewport, { passive: true });
    }
  }

  setupKineticSceneVars(): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    const root = this.documentRef.documentElement;
    const prefersCoarse = window.matchMedia('(pointer: coarse)').matches;
    const weakDevice = (navigator.hardwareConcurrency ?? 8) <= 4;
    const leanCosmic = prefersCoarse || weakDevice || this.viewport() !== 'desktop';
    root.toggleAttribute('data-lean-cosmic', leanCosmic);

    if (leanCosmic) {
      return;
    }

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        this.velocity = Math.min(Math.abs(self.getVelocity()), 4200);
        const targetWarp = gsap.utils.mapRange(0, 4200, 0, 1, this.velocity);
        this.dampedWarp += (targetWarp - this.dampedWarp) * 0.12;
        const warpPx = gsap.utils.clamp(0, 36, this.dampedWarp * 36);
        const starStretch = gsap.utils.clamp(1, 5.5, 1 + this.dampedWarp * 4.5);
        const scrollY = self.scroll();
        const wash = gsap.utils.clamp(0, 42, this.dampedWarp * 42);

        gsap.to(root, {
          '--grid-warp': `${warpPx}px`,
          '--wash-transform': `${wash}px`,
          '--star-near-y': `${scrollY * -0.12}px`,
          '--star-mid-y': `${scrollY * -0.065}px`,
          '--star-far-y': `${scrollY * -0.028}px`,
          '--star-drift-x': `${Math.sin(scrollY * 0.001) * 18}px`,
          '--star-stretch': starStretch,
          duration: 0.28,
          overwrite: true,
          ease: 'power2.out',
        });
      },
    });
  }

  setupSpatialCamera(sections: HTMLElement[]): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    sections.forEach((section) => {
      gsap.set(section, {
        transformStyle: 'preserve-3d',
        transformOrigin: '50% 50%',
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const entering = progress <= 0.5;
          const local = entering ? progress / 0.5 : (progress - 0.5) / 0.5;
          const depth = entering
            ? gsap.utils.interpolate(-720, 0, local)
            : gsap.utils.interpolate(0, 420, local);
          const scale = entering
            ? gsap.utils.interpolate(0.82, 1, local)
            : gsap.utils.interpolate(1, 0.88, local);
          const opacity = entering
            ? gsap.utils.interpolate(0.22, 1, local)
            : gsap.utils.interpolate(1, 0.18, local);
          const mobileDepth = entering
            ? gsap.utils.interpolate(34, 0, local)
            : gsap.utils.interpolate(0, -26, local);

          if (this.viewport() === 'desktop') {
            gsap.set(section, { z: depth, scale, autoAlpha: opacity });
          } else {
            gsap.set(section, { y: mobileDepth, scale, autoAlpha: opacity });
          }
        },
      });

      this.arrivalChoreography(section);
    });
  }

  arrivalChoreography(scope: Element): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    const targets = gsap.utils.toArray<HTMLElement>(
      'h1, h2, h3, .section-heading, article, .offer-card, .skill-node, .command-row, .commit-card, .letter-button, .showcase-card',
      scope,
    );

    gsap.fromTo(
      targets,
      {
        autoAlpha: 0,
        y: () => gsap.utils.random(-32, 38),
        x: () => gsap.utils.random(-28, 28),
        z: () => (this.viewport() === 'desktop' ? gsap.utils.random(-240, 160) : 0),
        scale: 0.92,
      },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        duration: 0.82,
        stagger: 0.045,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scope,
          start: 'top 74%',
          once: true,
        },
        onComplete: () => targets.forEach((target) => target.style.removeProperty('will-change')),
      },
    );
  }

  reveal(scope: Element, selector: string, options: gsap.TweenVars = {}): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    gsap.utils.toArray<HTMLElement>(selector, scope).forEach((element) => {
      gsap.from(element, {
        autoAlpha: 0,
        y: 28,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 84%',
          once: true,
        },
        ...options,
      });
    });
  }

  stagger(scope: Element, selector: string, trigger: Element = scope): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    gsap.from(gsap.utils.toArray<HTMLElement>(selector, scope), {
      autoAlpha: 0,
      y: 22,
      duration: 0.62,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start: 'top 78%',
        once: true,
      },
    });
  }

  heroEntrance(scope: Element): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    const tokens = gsap.utils.toArray<HTMLElement>('.hero-token', scope);
    const halo = scope.querySelector<HTMLElement>('.hero-visual');
    const particles = gsap.utils.toArray<HTMLElement>('.signal-dot', scope);

    if (this.viewport() === 'mobile') {
      gsap.set(tokens, {
        autoAlpha: 1,
        y: 0,
        clearProps: 'clipPath',
      });

      gsap.from(tokens, {
        autoAlpha: 0,
        y: 18,
        duration: 0.46,
        stagger: 0.045,
        ease: 'power2.out',
      });

      gsap.fromTo(
        halo,
        { '--hero-halo-scale': 0.86, '--hero-halo-opacity': 0.58 },
        {
          '--hero-halo-scale': 1,
          '--hero-halo-opacity': 1,
          duration: 0.62,
          ease: 'power2.out',
        },
      );
      gsap.fromTo(
        particles,
        { autoAlpha: 0, scale: 0.65 },
        { autoAlpha: 1, scale: 1, duration: 0.32, stagger: 0.08 },
      );
      return;
    }

    gsap.set(tokens, {
      autoAlpha: 0,
      y: 28,
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    });

    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .to(tokens, {
        autoAlpha: 1,
        y: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 115%, 0 115%)',
        duration: 0.78,
        stagger: 0.08,
      })
      .fromTo(
        halo,
        { '--hero-halo-scale': 0.72, '--hero-halo-opacity': 0 },
        {
          '--hero-halo-scale': 1,
          '--hero-halo-opacity': 1,
          duration: 0.9,
          ease: 'expo.out',
        },
        0.1,
      )
      .fromTo(
        particles,
        { autoAlpha: 0, scale: 0.45 },
        { autoAlpha: 1, scale: 1, duration: 0.42, stagger: 0.1 },
        0.34,
      );
  }

  pinOnDesktop(section: Element, content: Element): void {
    if (!this.isBrowser || this.reducedMotion || this.viewport() !== 'desktop') {
      return;
    }

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: content,
      pinSpacing: true,
      anticipatePin: 1,
    });
  }

  switchReveal(scope: Element, selector: string): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    const targets = gsap.utils.toArray<HTMLElement>(selector, scope);
    gsap.killTweensOf(targets);
    gsap.fromTo(
      targets,
      {
        autoAlpha: 0,
        y: 22,
        rotateX: -7,
        transformOrigin: '50% 0%',
      },
      {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        duration: 0.62,
        stagger: 0.045,
        ease: 'power3.out',
      },
    );
  }

  projectFlip(scope: Element, direction = 1): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    const card = scope.querySelector<HTMLElement>('.showcase-card');
    if (!card) {
      return;
    }

    gsap.killTweensOf(card);
    gsap.fromTo(
      card,
      {
        autoAlpha: 0.82,
        x: 18 * direction,
        scale: 0.985,
        transformOrigin: '50% 50%',
      },
      {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: 0.28,
        ease: 'power2.out',
      },
    );
  }

  elasticTiltReset(card: HTMLElement): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    gsap.to(card, {
      '--tilt-x': '3deg',
      '--tilt-y': '-8deg',
      '--tilt-z': '0px',
      '--glow-x': '50%',
      '--glow-y': '30%',
      duration: 0.72,
      ease: 'elastic.out(1, 0.3)',
      overwrite: true,
    });
  }

  captureFlipState(targets: string | Element | Element[]): Flip.FlipState | null {
    if (!this.isBrowser || this.reducedMotion) {
      return null;
    }

    return Flip.getState(targets);
  }

  flipFromState(state: Flip.FlipState | null, targets: string | Element | Element[]): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    if (!state) {
      return;
    }

    Flip.from(state, {
      targets,
      duration: 0.42,
      ease: 'power2.out',
      absolute: true,
      nested: true,
      simple: true,
    });
  }

  skillSwap(scope: Element, direction = 1): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    const core = scope.querySelector<HTMLElement>('.detail-orb');
    const nodes = gsap.utils.toArray<HTMLElement>('.skill-node', scope);
    const details = gsap.utils.toArray<HTMLElement>(
      '.evidence-panel h3, .evidence-panel .summary, .chip-group span, .proof-list article',
      scope,
    );

    if (core) {
      gsap.killTweensOf(core);
      gsap
        .timeline()
        .fromTo(
          core,
          { autoAlpha: 1, scale: 1, x: 0 },
          {
            autoAlpha: 0,
            scale: 0.78,
            x: 42 * direction,
            duration: 0.18,
            ease: 'power2.in',
          },
        )
        .fromTo(
          core,
          {
            autoAlpha: 0,
            x: -170 * direction,
            y: 72,
            rotate: -34 * direction,
            scale: 0.54,
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 0.72,
            ease: 'back.out(1.5)',
          },
        );
    }

    gsap.fromTo(
      nodes,
      { scale: 0.92, opacity: 0.72 },
      { scale: 1, opacity: 1, duration: 0.36, stagger: 0.018, ease: 'power2.out' },
    );

    gsap.killTweensOf(details);
    gsap.fromTo(
      details,
      { autoAlpha: 0, y: 10 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.54,
        stagger: 0.045,
        ease: 'power3.out',
      },
    );
  }

  skillParticleBurst(scope: Element, origin: HTMLElement): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    const target = scope.querySelector<HTMLElement>('.detail-orb');
    if (!target) {
      return;
    }

    const originRect = origin.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const hostRect = (scope as HTMLElement).getBoundingClientRect();
    const startX = originRect.left + originRect.width / 2 - hostRect.left;
    const startY = originRect.top + originRect.height / 2 - hostRect.top;
    const endX = targetRect.left + targetRect.width / 2 - hostRect.left;
    const endY = targetRect.top + targetRect.height / 2 - hostRect.top;

    const particles = Array.from({ length: 12 }, (_, index) => {
      const particle = this.documentRef.createElement('span');
      particle.className = 'skill-particle';
      particle.style.setProperty('--particle-index', String(index));
      (scope as HTMLElement).appendChild(particle);
      return particle;
    });

    gsap.set(particles, { x: startX, y: startY, autoAlpha: 1, scale: 0.4 });
    gsap.to(particles, {
      x: (index) => endX + Math.sin(index) * 12,
      y: (index) => endY + Math.cos(index) * 12,
      scale: 1,
      autoAlpha: 0,
      duration: 0.58,
      stagger: 0.018,
      ease: 'power3.inOut',
      onComplete: () => particles.forEach((particle) => particle.remove()),
    });
    gsap.fromTo(target, { scale: 0.92 }, { scale: 1.08, duration: 0.22, yoyo: true, repeat: 1 });
  }

  growTimeline(scope: Element): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

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
        scrollTrigger: {
          trigger: line,
          start: 'top 74%',
          end: 'bottom 48%',
          scrub: true,
        },
      },
    );

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0.45, x: index % 2 === 0 ? -24 : 24, scale: 0.98 },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.42,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 58%',
            toggleClass: { targets: card, className: 'commit-active' },
          },
        },
      );
    });
  }

  refresh(): void {
    if (this.isBrowser && !this.reducedMotion) {
      ScrollTrigger.refresh();
    }
  }

  isMobile(): boolean {
    return this.viewport() === 'mobile';
  }

  createDismissSheet(sheet: HTMLElement, onDismiss: () => void): Draggable[] {
    if (!this.isBrowser || this.reducedMotion) {
      return [];
    }

    return Draggable.create(sheet, {
      type: 'y',
      bounds: { minY: 0, maxY: window.innerHeight },
      inertia: false,
      onDragEnd() {
        if (this['y'] > sheet.offsetHeight * 0.24) {
          gsap.to(sheet, {
            yPercent: 100,
            duration: 0.24,
            ease: 'power2.in',
            onComplete: onDismiss,
          });
        } else {
          gsap.to(sheet, { y: 0, duration: 0.25, ease: 'power2.out' });
        }
      },
    });
  }

  animateSheetIn(sheet: HTMLElement): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    gsap.fromTo(sheet, { yPercent: 100 }, { yPercent: 0, duration: 0.34, ease: 'power3.out' });
  }

  deckShuffle(card: HTMLElement, direction = 1): void {
    if (!this.isBrowser || this.reducedMotion) {
      return;
    }

    const seal = card.querySelector<HTMLElement>('.seal');
    gsap.killTweensOf([card, seal].filter(Boolean));
    const timeline = gsap.timeline().fromTo(
      card,
      { autoAlpha: 0, x: 54 * direction, scale: 0.94 },
      { autoAlpha: 1, x: 0, scale: 1, duration: 0.36, ease: 'power3.out' },
    );

    if (seal) {
      timeline.fromTo(
        seal,
        { rotateY: 0, scale: 1 },
        { rotateY: 360, scale: 1.08, duration: 0.5, ease: 'power2.out' },
        0,
      );
    }
  }

  scrollTo(id: string): void {
    if (!this.isBrowser) {
      return;
    }

    const element = this.documentRef.getElementById(id);
    if (!element) {
      return;
    }

    const targetY = Math.max(0, element.getBoundingClientRect().top + window.scrollY);
    if (this.reducedMotion) {
      window.scrollTo(0, targetY);
      return;
    }

    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: true },
      duration: 0.45,
      ease: 'power2.out',
    });
  }

  scrollToScene(scene: string): void {
    if (!this.isBrowser) {
      return;
    }

    const element =
      this.documentRef.getElementById(`scene-${scene}`) ??
      this.documentRef.querySelector<HTMLElement>(`[data-scene="${scene}"]`);

    if (!element) {
      return;
    }

    this.scrollToElement(element);
  }

  anchorToElement(elementId: string): void {
    if (!this.isBrowser) {
      return;
    }

    const element = this.documentRef.getElementById(elementId);
    if (!element) {
      return;
    }

    const targetY = Math.max(
      0,
      element.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.15,
    );

    if (this.reducedMotion) {
      window.scrollTo(0, targetY);
      return;
    }

    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: true },
      duration: 0.35,
      ease: 'power2.out',
    });
  }

  private scrollToElement(element: HTMLElement): void {
    const targetY = Math.max(
      0,
      element.getBoundingClientRect().top + window.scrollY - this.sceneScrollOffset(),
    );

    window.scrollTo({
      top: targetY,
      behavior: this.reducedMotion ? 'auto' : 'smooth',
    });
  }

  sceneScrollOffset(): number {
    const header = this.documentRef.querySelector<HTMLElement>('.story-header');
    return (header?.offsetHeight ?? 0) + 16;
  }

  private readonly updateViewport = (): void => {
    if (!this.isBrowser) {
      return;
    }

    const width = window.innerWidth;
    const next = width <= 640 ? 'mobile' : width <= 1024 ? 'tablet' : 'desktop';
    this.viewport.set(next);
    this.documentRef.documentElement.dataset['viewport'] = next;
  };
}
