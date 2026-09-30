import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
} from '@angular/core';

@Component({
  selector: 'zg-logo',
  standalone: true,
  templateUrl: './zg-logo.component.html',
  styleUrl: './zg-logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZgLogoComponent {
  readonly label = input('Zaher Gaber');
  readonly animated = input(false);
  readonly sheen = input(false);
  readonly interactive = input(true);

  private readonly host = inject(ElementRef<HTMLElement>);

  @HostBinding('class.is-animated')
  get animatedClass(): boolean { return this.animated(); }

  @HostBinding('class.has-sheen')
  get sheenClass(): boolean { return this.sheen(); }

  @HostBinding('class.is-interactive')
  get interactiveClass(): boolean { return this.interactive(); }

  @HostListener('pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.interactive() || event.pointerType === 'touch') return;
    const rect = this.host.nativeElement.getBoundingClientRect();
    this.host.nativeElement.style.setProperty(
      '--zg-pointer-x',
      `${((event.clientX - rect.left) / rect.width) * 100}%`,
    );
    this.host.nativeElement.style.setProperty(
      '--zg-pointer-y',
      `${((event.clientY - rect.top) / rect.height) * 100}%`,
    );
  }

  @HostListener('pointerleave')
  onPointerLeave(): void {
    this.host.nativeElement.style.removeProperty('--zg-pointer-x');
    this.host.nativeElement.style.removeProperty('--zg-pointer-y');
  }
}
