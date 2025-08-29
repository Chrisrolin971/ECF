import {Component, inject, OnInit} from '@angular/core';
import {Film, FilmsService} from './films.service';
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-films',
  imports: [DatePipe, NgIf, NgForOf, NgOptimizedImage],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];
  private readonly filmsService = inject(FilmsService);

  ngOnInit(): void {
    this.filmsService.getFilms().subscribe(data => {
      this.films = data;
    });
  }
}
