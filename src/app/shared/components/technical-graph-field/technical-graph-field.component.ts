import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { MotionService } from '../../../core/services/motion.service';

interface FieldRoute {
  id: string;
  d: string;
  weight: 'primary' | 'quiet';
}

/**
 * The global technical field behind the whole page.
 *
 * It is not decoration: elements across the page publish themselves with
 * `data-network-anchor`, and this component draws restrained routes between the
 * anchors that are currently on screen. The result is one workspace whose
 * topology follows the visitor rather than a background image.
 *
 * Costs are kept flat: geometry is read only on resize/scroll-settle (never per
 * frame), the routes are a handful of paths, and everything is skipped in lean
 * mode or under reduced motion.
 */
@Component({
  selector: 'technical-graph-field',
  standalone: true,
  templateUrl: './technical-graph-field.component.html',
  styleUrl: './technical-graph-field.component.scss',
  host: { 'aria-hidden': 'true' },
})
export class TechnicalGraphFieldComponent implements AfterViewInit, OnDestroy {
  readonly routes = signal<FieldRoute[]>([]);
  readonly viewBox = signal('0 0 1440 900');

  private readonly documentRef = inject(DOCUMENT);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /**
   * The order anchors connect in. Routes are only drawn between consecutive
   * pairs that are both on screen, which is what keeps the field from turning
   * into spaghetti.
   */
  private readonly chain = [
    'hero-logo',
    'hero-system',
    'active-project',
    'expertise-graph',
    'journey',
    'contact',
  ];

  private resizeObserver?: ResizeObserver;
  private frame = 0;
  private settleTimer?: number;

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.schedule();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.schedule, { passive: true });

    this.resizeObserver = new ResizeObserver(() => this.schedule());
    this.resizeObserver.observe(this.documentRef.body);

    if (this.motion.isDesktop() && !this.motion.reducedMotion) {
      window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.schedule);
    window.removeEventListener('pointermove', this.onPointerMove);
    this.resizeObserver?.disconnect();
    cancelAnimationFrame(this.frame);
    clearTimeout(this.settleTimer);
  }

  /** Called by scenes after they change shape (project switch, graph select). */
  refresh(): void {
    this.schedule();
  }

  /* --------------------------------------------------------------- internals */

  private readonly onScroll = (): void => {
    // Routes are recomputed once the scroll settles, never mid-gesture.
    clearTimeout(this.settleTimer);
    this.settleTimer = window.setTimeout(() => this.schedule(), 120);
  };

  private readonly schedule = (): void => {
    if (!this.isBrowser) {
      return;
    }
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.measure());
  };

  /** Local illumination only: a CSS variable the field reads, no JS painting. */
  private readonly onPointerMove = (event: PointerEvent): void => {
    if (event.pointerType === 'touch') {
      return;
    }
    const host = this.elementRef.nativeElement;
    host.style.setProperty('--pointer-x', `${event.clientX}px`);
    host.style.setProperty('--pointer-y', `${event.clientY}px`);
  };

  private measure(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.viewBox.set(`0 0 ${width} ${height}`);

    if (this.documentRef.documentElement.hasAttribute('data-lean-motion')) {
      this.routes.set([]);
      return;
    }

    const points = new Map<string, { x: number; y: number }>();
    for (const name of this.chain) {
      const element = this.documentRef.querySelector<HTMLElement>(
        `[data-network-anchor="${name}"]`,
      );
      if (!element) {
        continue;
      }
      const rect = element.getBoundingClientRect();
      // Only anchors with some presence on screen take part.
      if (rect.bottom < -160 || rect.top > height + 160) {
        continue;
      }
      points.set(name, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }

    const next: FieldRoute[] = [];
    const visible = this.chain.filter((name) => points.has(name));

    for (let i = 0; i < visible.length - 1; i++) {
      const from = points.get(visible[i])!;
      const to = points.get(visible[i + 1])!;
      next.push({
        id: `${visible[i]}~${visible[i + 1]}`,
        d: this.routeBetween(from, to),
        weight: 'primary',
      });
    }

    // One quiet long-range route keeps the field from feeling like a single line.
    if (visible.length > 2) {
      const from = points.get(visible[0])!;
      const to = points.get(visible[visible.length - 1])!;
      next.push({ id: 'span', d: this.routeBetween(from, to, 0.42), weight: 'quiet' });
    }

    this.routes.set(next);
  }

  /** Orthogonal-ish routing: the geometry of a wiring diagram, not a spline. */
  private routeBetween(
    from: { x: number; y: number },
    to: { x: number; y: number },
    bow = 0.24,
  ): string {
    const midY = from.y + (to.y - from.y) * 0.5;
    const offset = (to.x - from.x) * bow;
    return `M ${from.x} ${from.y} C ${from.x + offset} ${midY}, ${to.x - offset} ${midY}, ${to.x} ${to.y}`;
  }
}
