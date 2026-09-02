import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { profile } from '../data/profile.data';
import { WorkspacePreferencesService } from './workspace-preferences.service';

const JSON_LD_ID = 'person-json-ld';

/**
 * Owns every piece of page metadata. index.html carries only the values that
 * must exist before Angular boots; everything else is derived from `profile`.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly workspace = inject(WorkspacePreferencesService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor(@Inject(DOCUMENT) private readonly documentRef: Document) {
    effect(() => this.apply());
  }

  private apply(): void {
    const language = this.workspace.language();
    const name = profile.name[language];
    const role = profile.role[language];
    const description = profile.tagline[language];
    const pageTitle = `${name} | ${role}`;
    const canonical = profile.siteUrl;
    const image = `${canonical}/${profile.ogImage}`;

    this.title.setTitle(pageTitle);

    this.setName('description', description);
    this.setName('author', profile.name.en);
    this.setName('robots', 'index, follow');

    this.setProperty('og:type', 'website');
    this.setProperty('og:site_name', profile.name.en);
    this.setProperty('og:title', pageTitle);
    this.setProperty('og:description', description);
    this.setProperty('og:url', canonical);
    this.setProperty('og:image', image);
    this.setProperty('og:locale', language === 'ar' ? 'ar_SY' : 'en_US');

    this.setName('twitter:card', 'summary_large_image');
    this.setName('twitter:title', pageTitle);
    this.setName('twitter:description', description);
    this.setName('twitter:image', image);

    this.setCanonical(canonical);
    this.setPersonJsonLd(canonical, image);
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property="${property}"`);
  }

  private setCanonical(href: string): void {
    let link = this.documentRef.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.documentRef.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.documentRef.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private setPersonJsonLd(canonical: string, image: string): void {
    // Only real, verified profiles go into sameAs.
    const sameAs = profile.socials
      .map((social) => social.url)
      .filter((url): url is string => Boolean(url));

    const payload = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name.en,
      alternateName: profile.name.ar,
      jobTitle: profile.role.en,
      description: profile.tagline.en,
      email: `mailto:${profile.email}`,
      telephone: profile.phone,
      url: canonical,
      image,
      sameAs,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Damascus',
        addressCountry: 'SY',
      },
      knowsAbout: ['Angular', 'Nx', 'Ionic', 'NestJS', 'PostgreSQL', 'TypeScript'],
    };

    let script = this.documentRef.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
    if (!script) {
      script = this.documentRef.createElement('script');
      script.id = JSON_LD_ID;
      script.type = 'application/ld+json';
      this.documentRef.head.appendChild(script);
    }
    script.textContent = JSON.stringify(payload);
  }
}
