import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ZgLogoComponent } from '../zg-logo/zg-logo.component';

@Component({
  selector: 'brand-loader',
  standalone: true,
  imports: [ZgLogoComponent],
  templateUrl: './brand-loader.component.html',
  styleUrl: './brand-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandLoaderComponent {
  readonly visible = input(false);
  readonly leaving = input(false);
  /** Localised by the caller - the loader itself holds no copy. */
  readonly name = input('Zaher Gaber');
  readonly role = input('Full-Stack Angular Engineer');
  readonly status = input('Initializing workspace');
}
