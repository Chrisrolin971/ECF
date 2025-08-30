import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-reservation',
  imports: [FormsModule, RouterLink, NgForOf],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  selectedCinema: string = '';

  filmsParCinema: { [ville: string]: Film[] } = {
    Nantes: [{
      titre: 'Cannes',
      description: 'Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.',
      note: 9.0,
      categorie: 'Horreur',
      image: 'assets/films/cannes.jpg'
    }],
    Toulouse: [{
      titre: 'Dora l exploratrice',
      description: 'Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.',
      note: 9.0,
      categorie: 'Familial',
      image: 'assets/films/dora.jpg'
    }],
    Lille: [{
      titre: 'Evanouis',
      description: 'Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.',
      note: 9.0,
      categorie: 'Horreur',
      image: 'assets/films/evanouis.jpg'
    }],
    Charleroi: [{
      titre: 'Flow',
      description: 'Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.',
      note: 9.0,
      categorie: 'Thriller',
      image: 'assets/films/flow.jpg'
    }],
    Lieges: [{
      titre: 'Superman',
      description: 'Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
        '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.',
      note: 9.0,
      categorie: 'Action',
      image: 'assets/films/superman.jpg'
    }],
    Bordeaux: [
      {
        titre: 'Les 4 Fantastiques',
        description: 'Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
          '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
          '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
          '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
          '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.',
        note: 8.5,
        categorie: 'Science-Fiction',
        image: 'assets/films/4fantastiques.jpg'
      },
      {
        titre: 'Les Tuches',
        description: 'Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
          '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
          '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
          '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
          '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.',
        note: 7.2,
        categorie: 'Comédie',
        image: 'assets/films/tuche.jpg'
      }
    ],
    Paris: [
      {
        titre: 'Flow',
        description: 'Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
          '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
          '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
          '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.\n' +
          '      Une brève description du film, son intrigue, ses acteurs ou tout autre détail captivant.',
        note: 9.0,
        categorie: 'Thriller',
        image: 'assets/films/flow.jpg'
      }
    ]
  };

  get films(): Film[] {
    return this.filmsParCinema[this.selectedCinema] || [];
  }
}

interface Film {
  titre: string;
  description: string;
  note: number;
  categorie: string;
  image: string;
}
