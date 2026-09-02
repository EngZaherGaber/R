import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import {
  AccentColor,
  LanguageCode,
  Localized,
  ThemeMode,
} from '../models/portfolio.model';
import { accentColors, navigation, profile } from '../data/profile.data';
import { ui } from '../data/ui.data';

const STORAGE_KEYS = {
  language: 'portfolio-language',
  theme: 'portfolio-theme',
  accent: 'portfolio-accent',
} as const;

@Injectable({ providedIn: 'root' })
export class WorkspacePreferencesService {
  /*
   * These are injected as fields rather than constructor parameters: class
   * fields initialise before the constructor body, so the signals below would
   * otherwise read an undefined `platformId` and always fall back to defaults.
   */
  private readonly documentRef = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly accents = accentColors;
  readonly profile = profile;
  readonly ui = ui;

  readonly language = signal<LanguageCode>(this.readLanguage());
  readonly theme = signal<ThemeMode>(this.readTheme());
  readonly accent = signal<AccentColor>(this.readAccent());

  readonly direction = computed(() => (this.language() === 'ar' ? 'rtl' : 'ltr'));
  readonly isArabic = computed(() => this.language() === 'ar');
  readonly navigation = computed(() =>
    navigation.map((item) => ({ ...item, text: item.label[this.language()] })),
  );

  constructor() {
    effect(() => this.applyDocumentState());
  }

  /** Resolve any localized value against the active language. */
  t<T>(value: Localized<T>): T {
    return value[this.language()];
  }

  setLanguage(language: LanguageCode): void {
    this.language.set(language);
  }

  toggleTheme(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  setAccent(accent: AccentColor): void {
    this.accent.set(accent);
  }

  private applyDocumentState(): void {
    const root = this.documentRef.documentElement;
    const body = this.documentRef.body;
    const language = this.language();
    const theme = this.theme();
    const accent = this.accent();

    root.lang = language;
    root.dir = this.direction();
    root.style.setProperty('--accent', accent.value);
    // `dataset` is not implemented by every server-side DOM, so set the attribute.
    root.setAttribute('data-theme', theme);
    body?.classList.toggle('light', theme === 'light');
    body?.classList.toggle('dark', theme === 'dark');

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.language, language);
      localStorage.setItem(STORAGE_KEYS.theme, theme);
      localStorage.setItem(STORAGE_KEYS.accent, accent.id);
    } catch {
      // Private browsing or blocked storage - preferences simply do not persist.
    }
  }

  private readStored(key: string): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  /** A `?lang=` / `?theme=` value wins, so a link can open in a chosen state. */
  private readParam(key: string): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return new URLSearchParams(window.location.search).get(key);
  }

  private readLanguage(): LanguageCode {
    const requested = this.readParam('lang');
    if (requested === 'ar' || requested === 'en') {
      return requested;
    }

    return this.readStored(STORAGE_KEYS.language) === 'ar' ? 'ar' : 'en';
  }

  private readTheme(): ThemeMode {
    const requested = this.readParam('theme');
    if (requested === 'light' || requested === 'dark') {
      return requested;
    }

    const stored = this.readStored(STORAGE_KEYS.theme);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    if (
      isPlatformBrowser(this.platformId) &&
      window.matchMedia?.('(prefers-color-scheme: light)').matches
    ) {
      return 'light';
    }

    return 'dark';
  }

  private readAccent(): AccentColor {
    const stored = this.readStored(STORAGE_KEYS.accent);
    return accentColors.find((accent) => accent.id === stored) ?? accentColors[0];
  }
}
