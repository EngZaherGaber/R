import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ScreenService } from '../../services/screen.service';
import { RecominditionComponent } from '../recomindition/recomindition.component';
import { SkillsComponent } from '../skills/skills.component';
import { ResumeComponent } from '../resume/resume.component';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'home-land',
  imports: [
    SkillsComponent,
    TooltipModule,
    CommonModule,
    ButtonModule,
    ResumeComponent,
    ProjectsComponent,
    RecominditionComponent
  ],
  templateUrl: './home-land.component.html',
  styleUrl: './home-land.component.scss'
})
export class HomeLandComponent implements OnInit {
  services = [
    {
      title: 'Create Modern, High-Performance Web Applications',
      description: 'Turn your vision into reality with custom-built Angular applications that are fast, scalable, and user-friendly. Whether it’s a startup idea or an enterprise solution, I’ll bring it to life.'
    },
    {
      title: 'Repair and Revamp Your Existing Web App',
      description: 'Is your web app slow, outdated, or buggy? I’ll diagnose the issues, optimize the code, and breathe new life into your application, ensuring it runs smoothly and efficiently.'
    },
    {
      title: 'Design Beautiful, Responsive User Interfaces',
      description: 'First impressions matter! I’ll create visually stunning, mobile-friendly interfaces that captivate your users and keep them coming back for more.'
    },
    {
      title: 'Connect Your App to Powerful Backend Systems',
      description: 'Need your app to talk to APIs or databases? I’ll seamlessly integrate backend services, enabling real-time data updates and smooth functionality.'
    },
    {
      title: 'Speed Up Your App for a Better User Experience',
      description: 'Slow apps drive users away. I’ll optimize your Angular app for lightning-fast performance, ensuring it loads quickly and runs smoothly on any device.'
    },
    {
      title: 'Turn Your Website into a Progressive Web App (PWA)',
      description: 'Want your app to work offline and feel like a native mobile app? I’ll transform your website into a Progressive Web App (PWA) for enhanced user engagement.'
    },
  ];
  contacts = [
    [
      {
        key: 'Country',
        value: 'Syria',
        icon: 'pi pi-flag' // Icon for country/flag
      },
      {
        key: 'City',
        value: 'Damascus',
        icon: 'pi pi-building' // Icon for city/building
      },
      {
        key: 'Region',
        value: 'Jdydat-Artouz',
        icon: 'pi pi-map-marker' // Icon for region/location
      }
    ],
    [
      {
        key: 'Email',
        value: 'eng.zaher.gaber@gmail.com',
        icon: 'pi pi-envelope' // Icon for email
      },
      {
        key: 'Telegram',
        value: '@ZaGa97',
        icon: 'pi pi-send' // Icon for Telegram/send
      },
      {
        key: 'Phone Number',
        value: '+963 934 299 721',
        icon: 'pi pi-phone' // Icon for phone number
      }
    ]
  ];
  builds: string[] = [
    'Single Page Applications (SPA)',
    'Progressive Web Applications (PWA)',
    'Enterprise Resource Planning (ERP) Systems',
    'Complex Dynamic User Interfaces',
    'Server-Side Rendered (SSR) Applications',
    'Real-time Data Applications (e.g., chat apps)',
    'E-commerce Platforms',
    'Content Management Systems (CMS)',
    'Dashboard and Analytics Tools',
    'Custom Web Components',
    'API-Driven Applications',
    'Social Media Platforms',
    'Educational Platforms and Learning Management Systems (LMS)',
  ];
  displayedText: string = ''; // The text currently displayed
  typingSpeed: number = 100; // Speed of typing in milliseconds
  eraseSpeed: number = 50; // Speed of erasing in milliseconds
  pauseBeforeErase: number = 2000; // Pause before erasing in milliseconds
  pauseBeforeNext: number = 500; // Pause before typing the next string
  currentIndex: number = 0; // Index of the current string in the `builds` array
  constructor(public scrnSrv: ScreenService) { }
  ngOnInit() {
    this.typeText();
  }
  typeText(): void {
    const currentBuild = this.builds[this.currentIndex];
    let i = 0;
    const typingInterval = setInterval(() => {
      this.displayedText += currentBuild[i];
      i++;
      if (i >= currentBuild.length) {
        clearInterval(typingInterval);
        setTimeout(() => this.eraseText(), this.pauseBeforeErase);
      }
    }, this.typingSpeed);
  }
  eraseText(): void {
    const eraseInterval = setInterval(() => {
      this.displayedText = this.displayedText.slice(0, -1);
      if (this.displayedText.length === 0) {
        clearInterval(eraseInterval);
        this.currentIndex = (this.currentIndex + 1) % this.builds.length; // Move to the next string
        setTimeout(() => this.typeText(), this.pauseBeforeNext);
      }
    }, this.eraseSpeed);
  }
}
