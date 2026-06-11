import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface StorySectionLink {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'section-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-progress.component.html',
  styleUrl: './section-progress.component.scss',
})
export class SectionProgressComponent {
  @Input({ required: true }) sections: StorySectionLink[] = [];
  @Input({ required: true }) activeSection = 'hero';
  @Output() sectionSelected = new EventEmitter<string>();
}
