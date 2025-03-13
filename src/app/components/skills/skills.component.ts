import { Component } from '@angular/core';
import { TimelineModule } from "primeng/timeline";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { AnimateOnScrollModule } from "primeng/animateonscroll";
import { ScreenService } from '../../services/screen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'skills',
  imports: [
    TimelineModule,
    CardModule,
    ButtonModule,
    CommonModule,
    AnimateOnScrollModule
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  events = [
    {
      title: 'NgRx',
      description: 'Expertise in building scalable and maintainable applications using NgRx for state management. Leveraged actions, reducers, and effects to manage complex application states, ensuring predictable data flow and seamless user experiences.',
      icon: 'ngrx.webp',
      oddOrEven: 'odd',
    },
    {
      title: 'RxJS',
      description: 'Proficient in reactive programming with RxJS to handle asynchronous data streams. Utilized Observables, Subjects, and operators to create responsive and efficient applications, enabling real-time updates and smooth data handling.',
      icon: 'rxjs.webp',
      oddOrEven: 'even',
    },
    {
      title: 'Angular Material',
      description: 'Designed sleek, responsive, and user-friendly interfaces using Angular Material. Built custom themes, reusable components, and accessible UIs aligned with Material Design principles, ensuring consistency and scalability.',
      icon: 'material.webp',
      oddOrEven: 'odd',
    },
    {
      title: 'PrimeNG',
      description: 'Delivered enterprise-grade applications with PrimeNG’s rich UI components. Integrated advanced features like data tables, charts, and calendars to create dynamic and interactive user interfaces.',
      icon: 'primeng.webp',
      oddOrEven: 'even',
    },
    {
      title: 'NG-ZORRO',
      description: 'Crafted professional and modern UIs using NG-ZORRO’s Ant Design-based components. Developed clean and intuitive interfaces for complex applications, enhancing user engagement and satisfaction.',
      icon: 'zorro.webp',
      oddOrEven: 'odd',
    },
    {
      title: 'Bootstrap',
      description: 'Built responsive and mobile-first applications using Bootstrap. Customized layouts, grids, and components to deliver seamless experiences across devices, ensuring accessibility and usability.',
      icon: 'bootstrap.webp',
      oddOrEven: 'even',
    },
    {
      title: 'Tailwind',
      description: 'Expert in utility-first CSS with Tailwind to create highly customizable and responsive designs. Streamlined development with reusable utility classes, enabling rapid prototyping and consistent styling.',
      icon: 'tailwind.webp',
      oddOrEven: 'odd',
    },
    {
      title: 'Angular Animations',
      description: 'Created engaging and interactive user experiences with Angular Animations. Designed smooth transitions, micro-interactions, and dynamic animations to enhance usability and delight users.',
      icon: 'animation.webp',
      oddOrEven: 'even',
    },
    {
      title: 'GraphQL',
      description: 'Integrated GraphQL APIs using Apollo Angular to optimize data fetching and reduce over-fetching. Designed efficient queries, mutations, and subscriptions for real-time data synchronization and improved performance.',
      icon: 'graphql.webp',
      oddOrEven: 'odd',
    },
    {
      title: 'Complex Dynamic Forms',
      description: 'Built sophisticated, dynamic forms with reactive and template-driven approaches. Implemented custom validators, conditional logic, and dynamic form controls to handle complex user inputs efficiently.',
      icon: 'angular.webp',
      oddOrEven: 'even',
    },
    {
      title: 'Shopify',
      description: 'Developed and customized e-commerce solutions using Shopify, leveraging its powerful API and Liquid templating language. Created responsive online stores, integrated payment gateways, and optimized user experiences to drive sales and enhance customer engagement.',
      icon: 'shopify.webp',
      oddOrEven: 'odd',
    },
  ];
  constructor(public scrnSrv: ScreenService) { }
}
