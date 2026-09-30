import { AfterViewInit, Component, ElementRef, computed, inject, output } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { currentEmployment } from '../../core/data/profile.data';
import { SectionId } from '../../core/models/portfolio.model';
import { ZgLogoComponent } from '../../shared/brand/zg-logo/zg-logo.component';

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [ZgLogoComponent],
  templateUrl: './identity.component.html',
  styleUrl: './identity.component.scss',
})
export class IdentityComponent implements AfterViewInit {
  readonly navigate = output<SectionId>();

  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;
  readonly profile = this.workspace.profile;

  readonly name = computed(() => this.workspace.t(this.profile.name));
  readonly role = computed(() => this.workspace.t(this.profile.role));

  /**
   * Three signals, not a wall of chips. Each is evidence a recruiter can check
   * against the rest of the page.
   */
  readonly signals = computed(() => [
    {
      id: 'employment',
      label: this.workspace.t(currentEmployment.title),
      value: this.workspace.t(currentEmployment.company),
    },
    {
      id: 'founder',
      label: this.workspace.t(this.ui.identity.founderLabel),
      value: this.workspace.t(this.ui.identity.founderValue),
    },
    {
      id: 'enterprise',
      label: this.workspace.t(this.ui.identity.enterpriseLabel),
      value: this.workspace.t(this.ui.identity.enterpriseValue),
    },
  ]);

  /** Clients of the Nx workspace, drawn as the top row of the system. */
  readonly clients = [
    { id: 'web', label: { en: 'Web', ar: 'ويب' }, tech: 'Angular' },
    { id: 'mobile', label: { en: 'Mobile', ar: 'موبايل' }, tech: 'Ionic' },
    { id: 'admin', label: { en: 'Admin', ar: 'إدارة' }, tech: 'Angular' },
    { id: 'landing', label: { en: 'Landing', ar: 'تعريفي' }, tech: 'Angular' },
  ];

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);

  ngAfterViewInit(): void {
    void this.motion.heroEntrance(this.elementRef.nativeElement);
  }
}
