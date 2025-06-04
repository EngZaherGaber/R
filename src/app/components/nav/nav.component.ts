import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { KnobModule } from 'primeng/knob';
import { ScreenService } from '../../services/screen.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'nav',
  imports: [
    CommonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ButtonModule,
    KnobModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RippleModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  age: number = new Date().getFullYear() - 2000;
  infoSideNav = [
    {
      key: 'general',
      items: [
        {
          title: 'Residence',
          percentage: 'Syria'
        },
        {
          title: 'City',
          percentage: 'Damascus'
        },
        {
          title: 'Age',
          percentage: this.age
        }
      ]
    },
    {
      key: 'language',
      items: [
        {
          title: 'Arabic',
          percentage: 90
        },
        {
          title: 'English',
          percentage: 80
        }
      ]
    },
    {
      key: 'technologies',
      items: [
        {
          title: 'HTML',
          percentage: 90
        },
        {
          title: 'CSS',
          percentage: 90
        },
        {
          title: 'SCSS',
          percentage: 85
        },
        {
          title: 'TYPESCRIPT',
          percentage: 85
        },
        {
          title: 'ANGULAR',
          percentage: 85
        },
        {
          title: 'GIT',
          percentage: 75
        },
        {
          title: 'ASP.NET',
          percentage: 60
        },
        {
          title: 'ORACLE',
          percentage: 70
        },
        {
          title: 'SQL Developer',
          percentage: 80
        },
        {
          title: 'Nest.Js',
          percentage: 50
        },
      ]
    },
    {
      key: 'cv'
    }
  ];
  constructor(public scrnSrv: ScreenService) { }
  downloadCv() {
    const link = document.createElement('a');
    link.href = '\\newCv.pdf';
    link.download = 'newCV.pdf'; // Optional: file name for saving
    link.click();
  }
}
