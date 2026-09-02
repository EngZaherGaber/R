import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { commerceCapability, serviceOffers } from '../../core/data/services.data';
import { projectById } from '../../core/data/projects.data';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  host: { '[class.sheet-open]': 'sheetOpen()' },
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;
  readonly offers = serviceOffers;
  readonly commerce = commerceCapability;

  @ViewChild('sheet') private sheetRef?: ElementRef<HTMLElement>;

  readonly selectedId = signal(serviceOffers[0].id);
  readonly sheetOpen = signal(false);

  readonly selected = computed(
    () => this.offers.find((offer) => offer.id === this.selectedId()) ?? this.offers[0],
  );

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private destroySheet?: () => void;

  ngAfterViewInit(): void {
    void this.motion.sectionReveal(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.closeSheet();
  }

  select(offerId: string): void {
    this.selectedId.set(offerId);
    void this.motion.panelSwap(this.elementRef.nativeElement, '.offer-detail > *');

    if (this.motion.isMobile()) {
      this.openSheet();
    }
  }

  proofProjects(projectIds: string[]) {
    return projectIds
      .map((id) => projectById(id))
      .filter((project): project is NonNullable<typeof project> => Boolean(project));
  }

  closeSheet(): void {
    this.sheetOpen.set(false);
    this.destroySheet?.();
    this.destroySheet = undefined;
  }

  private openSheet(): void {
    this.sheetOpen.set(true);
    setTimeout(async () => {
      const sheet = this.sheetRef?.nativeElement;
      if (!sheet) {
        return;
      }
      this.destroySheet?.();
      this.destroySheet = await this.motion.createDismissSheet(sheet, () => this.closeSheet());
    });
  }
}
