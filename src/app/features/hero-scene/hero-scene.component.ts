import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Output, computed, inject } from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { ScrollSceneService } from '../../core/services/scroll-scene.service';

@Component({
  selector: 'hero-scene',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-scene.component.html',
  styleUrl: './hero-scene.component.scss',
})
export class HeroSceneComponent implements AfterViewInit {
  @Output() navigateTo = new EventEmitter<string>();

  readonly workspace = inject(WorkspacePreferencesService);
  readonly tags = ['Angular', 'NestJS', 'Nx Monorepo', 'MongoDB', 'GraphQL'];
  readonly stackNodes = [
    {
      label: 'Angular',
      role: 'Frontend',
      icon: 'icons/angular.svg',
      className: 'node-angular',
    },
    {
      label: 'NestJS',
      role: 'Backend',
      icon: 'icons/nestjs.svg',
      className: 'node-nest',
    },
    {
      label: 'MongoDB',
      role: 'Database',
      icon: 'icons/mongodb.svg',
      className: 'node-mongo',
    },
    {
      label: 'GraphQL',
      role: 'API Layer',
      icon: 'icons/graphql.svg',
      className: 'node-graphql',
    },
  ];
  readonly cvPath = 'newCv.pdf';
  readonly heroName = computed(() =>
    this.workspace.language() === 'ar' ? 'زاهر جبر' : this.workspace.content().meta.name,
  );
  readonly heroRole = computed(() =>
    this.workspace.language() === 'ar'
      ? 'مطور Full-stack: Angular + NestJS'
      : 'Full-stack Angular & NestJS Developer',
  );
  readonly heroTitle = computed(() =>
    this.workspace.language() === 'ar'
      ? 'أبني منصات كاملة من الواجهة إلى الـ API داخل Nx monorepo واحد.'
      : 'I build complete web platforms inside one Nx monorepo.',
  );
  readonly heroSubtitle = computed(() =>
    this.workspace.language() === 'ar'
      ? 'Angular للواجهة، NestJS للباكند، MongoDB للبيانات، وGraphQL لطبقة API نظيفة قابلة للتوسع.'
      : 'Angular for polished frontends, NestJS for structured APIs, MongoDB for data, and GraphQL for a clean contract between them.',
  );
  readonly introQuestion = computed(() =>
    this.workspace.language() === 'ar'
      ? 'تحتاج موقع أو منصة كاملة من الصفر بيد مبرمج واحد؟'
      : 'Need a full platform from scratch with one developer?',
  );
  readonly introAnswer = computed(() =>
    this.workspace.language() === 'ar'
      ? 'نعم، عندما تكون البنية منظمة داخل Nx.'
      : 'Yes, when the architecture lives inside Nx.',
  );

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly scrollScene = inject(ScrollSceneService);

  ngAfterViewInit(): void {
    this.scrollScene.heroEntrance(this.elementRef.nativeElement);
  }

  downloadCv(): void {
    window.open(this.cvPath, '_blank', 'noopener,noreferrer');
  }
}
