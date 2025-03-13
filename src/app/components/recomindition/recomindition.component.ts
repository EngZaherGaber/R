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
      name: 'Mohanad Al-Halabi',
      postition: 'Manger Of IC&I',
      msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo obcaecati delectus dolores ratione ea reiciendis libero animi laudantium quaerat autem sapiente impedit molestiae deleniti est, expedita magni. Fugit, consequuntur iste?',
      img: '',
      rating: 5
    },
    {
      name: 'Zaher',
      postition: 'Manger Of IC&I',
      msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo obcaecati delectus dolores ratione ea reiciendis libero animi laudantium quaerat autem sapiente impedit molestiae deleniti est, expedita magni. Fugit, consequuntur iste?',
      img: '',
      rating: 3
    },
  ];
  constructor(public scrnSrv: ScreenService) { }
}
