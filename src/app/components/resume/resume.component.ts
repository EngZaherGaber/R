import { Component } from '@angular/core';
import { TimelineModule } from "primeng/timeline";
import { AnimateOnScrollModule } from "primeng/animateonscroll";
import { ScreenService } from '../../services/screen.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'resume',
  imports: [TimelineModule, AnimateOnScrollModule, CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  works = [
    {
      company: 'Free Lancer',
      position: 'Front-end Developer & Shopify Development',
      date: 'Apr 2021 - current',
      description: 'Delivered freelance projects as an Angular developer, creating responsive and user-friendly web applications. Collaborated with clients to translate requirements into scalable solutions.',
      oddOrEven: 'odd',
    },
    {
      company: 'IC&I',
      position: 'Front-end Team Leader',
      date: 'jun 2023 - current',
      description: 'Led a front-end team, overseeing Angular-based projects from design to deployment. Mentored junior developers and ensured high-quality, maintainable code.',
      oddOrEven: 'odd',
    },
  ];
  educations = [
    {
      title: 'Syrian Virtual University',
      date: '2020 - current',
      certifaction: 'Information Technology Engineer',
      oddOrEven: 'odd',
      description: 'Focused on software development, system design, and advanced programming. Gained hands-on experience in building scalable and efficient applications.'
    },
    {
      title: 'Damascus Training Center (Unrwa)',
      date: '2020 - 2022',
      certifaction: 'Information Technology',
      oddOrEven: 'odd',
      description: 'Covered programming fundamentals, web development, and database management. Developed practical skills in building dynamic and user-friendly applications.'
    },
  ];
  constructor(public scrnSrv: ScreenService) { }
}
