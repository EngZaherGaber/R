import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from "primeng/carousel";
import { RatingModule } from "primeng/rating";
import { ScreenService } from '../../services/screen.service';
@Component({
  selector: 'recomindition',
  imports: [CarouselModule, CommonModule, RatingModule, FormsModule],
  templateUrl: './recomindition.component.html',
  styleUrl: './recomindition.component.scss'
})
export class RecominditionComponent {
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  recominditionList = [
    {
      name: 'Motaz Al-Halabi',
      postition: '',
      msg: '',
      img: '',
      
    },
    {
      name: 'Omar Fallouh',
      postition: 'CEO (IC&I)',
      msg: `Eng. Zaher was instrumental in our UN project, delivering a secure Angular solution with micro-frontend architecture. His expertise in RxJS optimization and NgRx state management enabled high-performance multilingual interfaces. A strategic thinker who excels in cross-cultural environments and enterprise-scale challenges.`,
      img: '',
    },
    {
      name: 'Mohanad Al-Halabi',
      postition: 'Executive Manager (IC&I)',
      msg: `Eng. Zaher combines technical excellence with outstanding leadership skills. His ability to communicate clearly, mentor team members, and maintain professionalism under pressure makes him invaluable. Zaher fosters collaboration and consistently delivers results while keeping team morale high.`,
      img: 'Mohanad.webp',
      rating: 5
    },
    {
      name: 'Waseem Al-Madi',
      postition: '',
      msg: '',
      img: '',
    },
    {
      name: 'Jamal Al-Halabi',
      postition: '',
      msg: '',
      img: '',
    },
    {
      name: 'Mustafa Al-Homsi',
      postition: '',
      msg: '',
      img: '',
    },
  ];
  constructor(public scrnSrv: ScreenService) { }
}
