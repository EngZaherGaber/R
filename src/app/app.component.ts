import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { ButtonModule } from 'primeng/button';
import { ScreenService } from './services/screen.service';
import { HomeLandComponent } from './components/home-land/home-land.component';
import { mergeMap, of, timer } from 'rxjs';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-root',
  imports: [
    NavComponent,
    MatSidenavModule,
    CommonModule,
    ButtonModule,
    HomeLandComponent,
    LottieComponent
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  loading: boolean = false;
  spinnerShow: boolean = false;
  firstSubscription = true;
  clouds: number[] = [];
  isDarkIn = true;
  options: AnimationOptions = {
    path: 'Animation - 1743086608556.json',
  };
  constructor(public scrnSrv: ScreenService) {
    for (let index = 0; index < 5; index++) {
      this.clouds.push(index);
    }
    scrnSrv.isDark$.pipe(
      mergeMap(value => {
        if (this.firstSubscription) {
          return timer(6500).pipe(mergeMap(() => [value]));
        } else {
          return [value];
        }
      }),
      mergeMap((value) => {
        if (!this.firstSubscription) {
          this.loading = !this.loading;
          return timer(6500).pipe(mergeMap(() => [value]));
        } else {
          this.firstSubscription = false;
          return of(value);
        }
      })
    ).subscribe(() => {
      this.loading = !this.loading;
    })
  }
  ngOnInit(): void {
    this.scrnSrv.changeIsDark().subscribe(res => this.isDarkIn = res);
  }
  ngAfterViewInit() {
    window.addEventListener('load', () => {
      this.scrnSrv.sidenav = this.sidenav;
    });
  }

}
