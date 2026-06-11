import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class ScrollSceneService {
  readonly isBrowser: boolean;
  readonly reducedMotion: boolean;

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.reducedMotion =
      this.isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
    }
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

  pinOnDesktop(section: Element, content: Element): void {
    if (!this.isBrowser || this.reducedMotion || window.matchMedia('(max-width: 980px)').matches) {
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
        filter: 'blur(10px)',
        transformOrigin: '50% 0%',
      },
      {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
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
        autoAlpha: 0,
        rotateY: 88 * direction,
        rotateX: 7,
        z: -180,
        scale: 0.9,
        filter: 'blur(12px)',
        transformOrigin: '50% 50%',
      },
      {
        autoAlpha: 1,
        rotateY: -8,
        rotateX: 3,
        z: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.82,
        ease: 'expo.out',
      },
    );
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
            filter: 'blur(9px)',
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            filter: 'blur(0px)',
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
      { autoAlpha: 0, x: 22 * direction, y: 10, filter: 'blur(8px)' },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.54,
        stagger: 0.045,
        ease: 'power3.out',
      },
    );
  }

  refresh(): void {
    if (this.isBrowser && !this.reducedMotion) {
      ScrollTrigger.refresh();
    }
  }

  scrollTo(id: string): void {
    this.documentRef.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
}
