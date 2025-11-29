import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Films, FilmsService} from '../../services/films.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {AdminService, Avis} from '../../services/admin.service';
import {Seance, SeanceService} from '../../services/seances.service';

@Component({
  selector: 'app-presentation',
  imports: [
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss'
})
export class PresentationComponent implements OnInit {
  filmId!: number;
  film!: Films;
  avis: Avis[] = [];
  seances: Seance[] = [];

  private readonly route = inject(ActivatedRoute);
  private readonly filmsService = inject(FilmsService);
  private readonly adminService = inject(AdminService);
  private readonly seanceService = inject(SeanceService);

  ngOnInit(): void {
    this.filmId = Number(this.route.snapshot.paramMap.get('id'));
    this.filmsService.getFilmById(this.filmId).subscribe({
      next: (data) => this.film = data,
      error: () => console.error('Film introuvable')
    });

    this.seanceService.getSeancesByFilm(this.filmId).subscribe(data => {
      this.seances = data;
    });

    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      console.log('ID du film pour les avis :', id); // ← trace ici
      this.adminService.getAvisByFilm(id).subscribe(data => {
        console.log('Avis reçus :', data); // ← tu l’as déjà
        this.avis = data;
      });
    });
  }
  formatDate(dateStr: string |Date): string {
    const mois = ['janv.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    const date = new Date(dateStr);
    const jour = date.getDate();
    const moisNom = mois[date.getMonth()];
    const annee = date.getFullYear();
    return `${jour} ${moisNom} ${annee}`;
  }
}
