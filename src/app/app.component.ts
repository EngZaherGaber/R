import { isPlatformBrowser } from '@angular/common';
import {
  ApplicationRef,
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { first } from 'rxjs/operators';
import { ShellComponent } from './features/shell/shell.component';
import { BrandLoaderComponent } from './shared/brand/brand-loader/brand-loader.component';
import { WorkspacePreferencesService } from './core/services/workspace-preferences.service';
import { MotionService } from './core/services/motion.service';

/** Copy for the loader lives here so the brand component stays language-free. */
const LOADER_STATUS = {
  en: 'Initializing workspace',
  ar: 'تهيئة مساحة العمل',
} as const;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShellComponent, BrandLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  readonly workspace = inject(WorkspacePreferencesService);

  readonly loaderVisible = signal(false);
  readonly loaderLeaving = signal(false);

  readonly name = computed(() => this.workspace.t(this.workspace.profile.name));
  readonly role = computed(() => this.workspace.t(this.workspace.profile.role));
  readonly status = computed(() => LOADER_STATUS[this.workspace.language()]);

  private readonly appRef = inject(ApplicationRef);
  private readonly motion = inject(MotionService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly timers: number[] = [];

  /**
   * The loader is a safety net, not a splash screen.
   *
   * The page is prerendered, so it is usually interactive before the delay
   * elapses and the loader never appears at all. It is only shown if the app is
   * still unstable after ~160ms, and it is always dismissed by ~1.8s - there is
   * no artificial delay and nothing waits on it.
   */
  ngOnInit(): void {
    if (!this.isBrowser || this.motion.reducedMotion) {
      return;
    }

    // `?loader=1` holds the loader open so the entrance can be reviewed.
    if (new URLSearchParams(window.location.search).get('loader') === '1') {
      this.loaderVisible.set(true);
      return;
    }

    let settled = false;
    const dismiss = () => {
      if (settled) {
        return;
      }
      settled = true;
      if (!this.loaderVisible()) {
        return;
      }
      this.loaderLeaving.set(true);
      this.timers.push(window.setTimeout(() => this.loaderVisible.set(false), 460));
    };

    this.timers.push(
      window.setTimeout(() => {
        if (!settled) {
          this.loaderVisible.set(true);
        }
      }, 160),
    );

    this.appRef.isStable.pipe(first((stable) => stable)).subscribe(() => dismiss());

    // Hard cap: the loader never blocks the page for longer than this.
    this.timers.push(window.setTimeout(dismiss, 1800));
  }

  ngOnDestroy(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
  }
}
