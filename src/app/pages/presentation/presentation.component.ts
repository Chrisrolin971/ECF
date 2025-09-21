import { Component } from '@angular/core';
import {Films} from '../films/films.service';

@Component({
  selector: 'app-presentation',
  imports: [],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss'
})
export class PresentationComponent {
  film: Films | null = null;
}
