import { AfterViewInit, Component, ElementRef, computed, inject, output } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { currentEmployment } from '../../core/data/profile.data';
import { SectionId } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  readonly navigate = output<SectionId>();

  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;
  readonly profile = this.workspace.profile;
  readonly employment = currentEmployment;

  /** The five technologies the positioning rests on, plus TypeScript. */
  readonly coreStack = this.profile.coreStack;

  /** Clients of the Nx workspace map, in the order they are drawn. */
  readonly clients = [
    { id: 'web', label: { en: 'Web', ar: 'الويب' }, tech: 'Angular', icon: 'icons/angular.svg' },
    { id: 'mobile', label: { en: 'Mobile', ar: 'الموبايل' }, tech: 'Ionic', icon: 'icons/ionic.svg' },
    { id: 'admin', label: { en: 'Admin', ar: 'الإدارة' }, tech: 'Angular', icon: 'icons/angular.svg' },
    { id: 'landing', label: { en: 'Landing', ar: 'التعريفي' }, tech: 'Angular', icon: 'icons/angular.svg' },
  ];
  readonly apiNode = { label: { en: 'Domain API', ar: 'واجهة النطاق' }, tech: 'NestJS' };
  readonly dataNode = { label: { en: 'Data', ar: 'البيانات' }, tech: 'PostgreSQL + Prisma' };

  readonly name = computed(() => this.workspace.t(this.profile.name));
  readonly role = computed(() => this.workspace.t(this.profile.role));
  readonly tagline = computed(() => this.workspace.t(this.profile.tagline));

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);

  ngAfterViewInit(): void {
    void this.motion.heroEntrance(this.elementRef.nativeElement);
  }
}
