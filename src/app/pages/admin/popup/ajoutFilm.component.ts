import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Film} from '../admin.service';

@Component({
  selector: 'app-ajout-film',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajoutFilm.component.html',
  styleUrls: ['./ajoutFilm.component.scss']
})
export class PopupAjoutFilmComponent implements OnInit {
  @Input() film: Film | null = null;
  @Output() fermer = new EventEmitter<void>();
  @Output() enregistrerFilm = new EventEmitter<Film>();

  titre = '';
  duree = 0;
  description = '';
  coeur = false;
  dateSortie = '';
  genre = '';
  imageUrl = '';
  pegi: number | null = null;

  genres = ['Action', 'Comédie', 'Drame', 'Fantastique', 'Horreur', 'Romance', 'Science-fiction'];
  pegiOptions = [null, 12, 16, 18];

  ngOnInit() {
    if (this.film) {
      this.titre = this.film.titre;
      this.duree = this.film.duree;
      this.description = this.film.description;
      this.coeur = this.film.coeur;
      this.dateSortie = this.film.date_sortie;
      this.genre = this.film.categorie;
      this.imageUrl = this.film.image;
      this.pegi = this.film.pegi;
    }
  }
  valider() {
    if (!this.film?.id) {
      console.error('ID manquant pour la modification');
      return;
    }

    const film: Film = {
      id: this.film.id,
      titre: this.titre,
      duree: this.duree,
      description: this.description,
      coeur: this.coeur,
      date_sortie: this.dateSortie,
      categorie: this.genre,
      image: this.imageUrl,
      pegi: this.pegi,
      note: this.film.note ?? 0
    };

    this.enregistrerFilm.emit(film);
  }

  annuler() {
    this.fermer.emit();
  }
}
