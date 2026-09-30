import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { ZgLogoComponent } from '../../shared/brand/zg-logo/zg-logo.component';

/**
 * The closing scene: the field's routes converge into the ZG mark and one CTA.
 * Everything here is the canonical contact data - nothing is restated.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ZgLogoComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;
  readonly profile = this.workspace.profile;

  /** Only links with a real, configured URL are rendered. */
  readonly socials = computed(() => this.profile.socials.filter((social) => social.url));
  readonly primaryContacts = computed(() =>
    this.profile.contacts.filter((contact) => contact.id === 'email'),
  );
  readonly secondaryContacts = computed(() =>
    this.profile.contacts.filter((contact) => contact.id !== 'email'),
  );
  readonly copiedId = signal<string | null>(null);

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private copyTimer?: number;

  ngAfterViewInit(): void {
    void this.motion.sectionReveal(this.elementRef.nativeElement);
    void this.motion.contactConverge(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.copyTimer) {
      clearTimeout(this.copyTimer);
    }
  }

  async copy(id: string, value: string): Promise<void> {
    if (!this.isBrowser) {
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      this.copiedId.set(id);
      clearTimeout(this.copyTimer);
      this.copyTimer = window.setTimeout(() => this.copiedId.set(null), 1800);
    } catch {
      // Clipboard blocked - the value stays visible and selectable.
    }
  }
}
