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
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;
  readonly profile = this.workspace.profile;

  /** Only social links with a real, configured URL are rendered. */
  readonly socials = computed(() => this.profile.socials.filter((social) => social.url));
  readonly copiedId = signal<string | null>(null);

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private copyTimer?: number;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  ngAfterViewInit(): void {
    void this.motion.sectionReveal(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.copyTimer) {
      clearTimeout(this.copyTimer);
    }
  }

  async copy(id: string, value: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      this.copiedId.set(id);
      clearTimeout(this.copyTimer);
      this.copyTimer = window.setTimeout(() => this.copiedId.set(null), 1800);
    } catch {
      // Clipboard permission denied - the value is still visible and selectable.
    }
  }
}
