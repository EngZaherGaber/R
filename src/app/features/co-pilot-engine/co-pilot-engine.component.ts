import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, computed, inject, signal } from '@angular/core';
import gsap from 'gsap';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { ScrollSceneService } from '../../core/services/scroll-scene.service';

@Component({
  selector: 'co-pilot-engine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './co-pilot-engine.component.html',
  styleUrl: './co-pilot-engine.component.scss',
})
export class CoPilotEngineComponent implements AfterViewInit, OnDestroy {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly engine = computed(() => this.workspace.content().coPilot);
  readonly selectedOption = signal(1);
  readonly activeOutput = signal(0);

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly scrollScene = inject(ScrollSceneService);
  private timeline?: gsap.core.Timeline;
  private labWindow?: HTMLElement;

  ngAfterViewInit(): void {
    const host = this.elementRef.nativeElement;

    if (!this.scrollScene.isBrowser || this.scrollScene.reducedMotion) {
      host.classList.add('engine-ready');
      return;
    }

    this.labWindow = host.querySelector<HTMLElement>('.lab-window') ?? undefined;
    this.labWindow?.addEventListener('pointermove', this.trackPointer, { passive: true });
    this.labWindow?.addEventListener('pointerleave', this.resetPointer, { passive: true });
    this.scrollScene.reveal(host, '.engine-reveal');
    this.createLoop();
  }

  ngOnDestroy(): void {
    this.timeline?.kill();
    this.labWindow?.removeEventListener('pointermove', this.trackPointer);
    this.labWindow?.removeEventListener('pointerleave', this.resetPointer);
  }

  initializeEngine(): void {
    this.workspace.setUrlParams({ scene: 'copilot', tool: 'co-pilot-engine' });
    this.scrollScene.anchorToElement('co-pilot-section');
    this.timeline?.restart();
  }

  selectOption(index: number): void {
    this.selectedOption.set(index);

    if (this.scrollScene.reducedMotion) {
      return;
    }

    const option = this.elementRef.nativeElement.querySelectorAll<HTMLElement>('.question-option')[index];
    if (option) {
      gsap.fromTo(option, { scale: 0.94 }, { scale: 1, duration: 0.28, ease: 'back.out(2)' });
    }
  }

  private createLoop(): void {
    const host = this.elementRef.nativeElement;
    const lines = host.querySelectorAll<SVGPathElement>('.draw-line');
    const entities = host.querySelectorAll<HTMLElement>('.entity-node');
    const question = host.querySelector<HTMLElement>('.question-card');
    const options = host.querySelectorAll<HTMLElement>('.question-option');
    const outputs = host.querySelectorAll<HTMLElement>('.stack-node');
    const pulse = host.querySelector<HTMLElement>('.build-pulse');

    this.timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.85,
      defaults: { ease: 'power2.out' },
    });

    this.timeline
      .set(lines, { strokeDasharray: 1, strokeDashoffset: 1 })
      .set([question, outputs], { autoAlpha: 0, scale: 0.92, y: 10 })
      .set(pulse, { autoAlpha: 0, scale: 0.35 })
      .fromTo(entities, { autoAlpha: 0.58, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.42, stagger: 0.08 })
      .to(lines, { strokeDashoffset: 0, duration: 0.72, stagger: 0.08 }, 0.12)
      .to(question, { autoAlpha: 1, scale: 1, y: 0, duration: 0.35 }, 0.72)
      .fromTo(options, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.05 }, 0.92)
      .call(() => this.selectedOption.set(1), [], 1.05)
      .to(pulse, { autoAlpha: 1, scale: 1.15, duration: 0.36 }, 1.18)
      .to(pulse, { autoAlpha: 0, scale: 1.9, duration: 0.45 }, 1.48)
      .to(outputs, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.34,
        stagger: 0.14,
        onStart: () => this.activeOutput.set(0),
        onUpdate: () => {
          const progress = this.timeline?.progress() ?? 0;
          this.activeOutput.set(progress > 0.72 ? 2 : progress > 0.61 ? 1 : 0);
        },
      }, 1.42)
      .to({}, { duration: 1.15 })
      .to([question, outputs], { autoAlpha: 0.82, scale: 0.98, duration: 0.32 })
      .to(lines, { strokeDashoffset: 1, duration: 0.34 }, '<');
  }

  private readonly trackPointer = (event: PointerEvent): void => {
    if (event.pointerType === 'touch' || !this.labWindow || this.scrollScene.viewport() !== 'desktop') {
      return;
    }

    const rect = this.labWindow.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    this.labWindow.style.setProperty('--magnet-x', x.toFixed(3));
    this.labWindow.style.setProperty('--magnet-y', y.toFixed(3));
    this.labWindow.classList.add('magnet-active');
  };

  private readonly resetPointer = (): void => {
    if (!this.labWindow) {
      return;
    }

    this.labWindow.style.setProperty('--magnet-x', '0');
    this.labWindow.style.setProperty('--magnet-y', '0');
    this.labWindow.classList.remove('magnet-active');
  };
}
