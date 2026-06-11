import { Component } from '@angular/core';
import { StoryShellComponent } from './features/story-shell/story-shell.component';

@Component({
  selector: 'app-root',
  imports: [StoryShellComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
