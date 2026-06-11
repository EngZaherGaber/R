import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { ScrollSceneService } from '../../core/services/scroll-scene.service';

@Component({
  selector: 'service-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-offers.component.html',
  styleUrl: './service-offers.component.scss',
})
export class ServiceOffersComponent implements AfterViewInit, OnDestroy {
  readonly workspace = inject(WorkspacePreferencesService);
  @ViewChild('serviceSheet') private serviceSheet?: ElementRef<HTMLElement>;
  @HostBinding('class.sheet-active') get sheetActive(): boolean {
    return this.sheetOpen();
  }

  readonly selectedServiceId = signal(this.workspace.readUrlParam('service') ?? 'angular-apps');
  readonly sheetOpen = signal(false);
  readonly selectedService = computed(
    () => this.workspace.content().services.find((service) => service.id === this.selectedServiceId()) ?? this.workspace.content().services[0],
  );
  readonly relatedSkills = computed(() => {
    const ids = new Set(this.selectedService().relatedSkillIds);
    return this.workspace.content().skills.filter((skill) => ids.has(skill.id));
  });
  readonly relatedProjects = computed(() => {
    const ids = new Set(this.selectedService().relatedProjectIds);
    return this.workspace.content().projects.filter((project) => ids.has(project.id));
  });

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  readonly scrollScene = inject(ScrollSceneService);
  private sheetDraggables: Array<{ kill: () => void }> = [];
  private viewReady = false;

  constructor() {
    effect(() => {
      this.workspace.setUrlParams({ service: this.selectedService().id });
      if (this.viewReady) {
        setTimeout(() => this.scrollScene.switchReveal(this.elementRef.nativeElement, '.offer-detail h3, .offer-detail > div > span, .offer-detail section, .offer-detail .pill'));
      }
    });
  }

  selectService(serviceId: string): void {
    this.selectedServiceId.set(serviceId);
    this.workspace.setUrlParams({ scene: 'services', service: serviceId });

    if (this.scrollScene.isMobile()) {
      this.openSheet();
    }
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.scrollScene.stagger(this.elementRef.nativeElement, '.offer-card');
  }

  closeSheet(): void {
    this.sheetOpen.set(false);
    this.sheetDraggables.forEach((draggable) => draggable.kill());
    this.sheetDraggables = [];
  }

  private openSheet(): void {
    this.sheetOpen.set(true);
    setTimeout(() => {
      const sheet = this.serviceSheet?.nativeElement;
      if (!sheet) {
        return;
      }

      this.sheetDraggables.forEach((draggable) => draggable.kill());
      this.scrollScene.animateSheetIn(sheet);
      this.sheetDraggables = this.scrollScene.createDismissSheet(sheet, () => this.closeSheet());
    });
  }

  ngOnDestroy(): void {
    this.closeSheet();
  }
}
