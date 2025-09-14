import {Component, inject, OnInit} from '@angular/core';
import {FilmsService, Films} from './films.service';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  films: Films[] = [];
  triSelection = '';
  private readonly filmService = inject(FilmsService);

  ngOnInit(): void {
    this.filmService.getFilms().subscribe(data => {
      this.films = data;
      this.trierFilms();
    });
  }

  trierFilms(): void {
    if (!this.triSelection) {
      return;
    }

    this.films.sort((a, b) => {
      if (this.triSelection === 'titre') {
        if (!a.titre) return 1;
        if (!b.titre) return -1;
        return a.titre.localeCompare(b.titre);
      }

      if (this.triSelection === 'genre') {
        if (!a.categorie) return 1;
        if (!b.categorie) return -1;
        return a.categorie.localeCompare(b.categorie);
      }

      if (this.triSelection === 'date') {
        if (!a.date_sortie) return 1;
        if (!b.date_sortie) return -1;
        return new Date(b.date_sortie).getTime() - new Date(a.date_sortie).getTime();
      }

      return 0;
    });
  }
}
