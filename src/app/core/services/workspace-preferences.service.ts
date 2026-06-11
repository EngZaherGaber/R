import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, computed, effect, signal } from '@angular/core';
import {
  AccentColor,
  LanguageCode,
  PanelId,
  ThemeMode,
  accentColors,
  portfolioContent,
} from '../data/portfolio-content';

@Injectable({ providedIn: 'root' })
export class WorkspacePreferencesService {
  readonly accents = accentColors;
  readonly language = signal<LanguageCode>(this.readPreference('portfolio-language', 'en'));
  readonly theme = signal<ThemeMode>(this.readPreference('portfolio-theme', 'dark'));
  readonly accent = signal<AccentColor>(
    accentColors.find((item) => item.id === this.readPreference('portfolio-accent', 'amber')) ??
      accentColors[0],
  );
  readonly activePanel = signal<PanelId>(this.readPanelFromUrl());

  readonly content = computed(() => portfolioContent[this.language()]);
  readonly direction = computed(() => (this.language() === 'ar' ? 'rtl' : 'ltr'));

  constructor(
    @Inject(DOCUMENT) private documentRef: Document,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    effect(() => this.applyDocumentState());
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

  setActivePanel(panel: PanelId): void {
    this.activePanel.set(panel);
  }

  readUrlParam(key: string): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return new URLSearchParams(window.location.search).get(key);
  }

  setUrlParams(params: Record<string, string | null | undefined>): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });
    window.history.replaceState({}, '', `${url.pathname}?${url.searchParams.toString()}${url.hash}`);
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
    body.classList.toggle('light', theme === 'light');
    body.classList.toggle('dark', theme === 'dark');

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('portfolio-language', language);
      localStorage.setItem('portfolio-theme', theme);
      localStorage.setItem('portfolio-accent', accent.id);
    }
  }

  private readPreference<T extends string>(key: string, fallback: T): T {
    if (!isPlatformBrowser(this.platformId)) {
      return fallback;
    }

    return (localStorage.getItem(key) as T | null) ?? fallback;
  }

  private readPanelFromUrl(): PanelId {
    const panel = this.readUrlParam('panel');
    const panels: PanelId[] = [
      'overview',
      'projects',
      'skills',
      'services',
      'timeline',
      'recommendations',
      'contact',
    ];
    return panels.includes(panel as PanelId) ? (panel as PanelId) : 'overview';
  }
}
