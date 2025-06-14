import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Observable, concat, map, of, shareReplay, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  isHandset$: Observable<boolean> = new Observable();
  sidenav!: MatSidenav;
  isDark$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isDark: boolean = true;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isDark$.subscribe(res => {
      setTimeout(() => {
        if (res) {
          document.body.classList.replace('light', 'dark');
        } else {
          document.body.classList.replace('dark', 'light');
        }
        this.isDark = res;
      }, 4000)
    });
    this.isHandset$ = this.breakpointObserver
      .observe('(max-width: 991.98px)')
      .pipe(
        map(result => {
          return result.matches
        }),
        shareReplay()
      );
  }
  toggleSidenav() {
    this.sidenav?.toggle();
  }
  registerSidenav(sidenav: MatSidenav): void {
    this.sidenav = sidenav;
  }
  changeStyle() {
    this.isDark$.next(!this.isDark);
  }
  changeIsDark() {
    return this.isDark$.pipe(
      // Whenever isDark$ emits, switch to a new observable
      switchMap(() =>
        // Emit true immediately, then false after 10 seconds
        concat(
          of(true), // Emit true right away
          timer(8000).pipe(map(() => false)) // Emit false after 10 seconds
        )
      )
    );
  }
}
