import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService, Films } from '../films/films.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Seance, SeanceService} from './seances.service';
import {FormsModule} from '@angular/forms';

interface Siege {
  rangée: string;
  numero: number;
  estPMR: boolean;
  estRéservé: boolean;
}

@Component({
  selector: 'app-seance',
  standalone: true,
  templateUrl: './seances.component.html',
  imports: [NgIf, NgForOf, NgClass, FormsModule],
  styleUrl: './seances.component.scss'
})
export class SeancesComponent implements OnInit {
  film: Films | null = null;
  seances: Seance[] = [];
  selectedCinema: string | null = null;
  selectedSeance: Seance | null = null;
  sieges: Siege[] = []; // récupérés depuis ton API

  nbPlaces = 0;
  nbPMR = 0;
  pmrErreur = false;
  validationErreur = '';


  seancesFiltered(): Seance[] {
    if (!this.selectedCinema) return [];

    return this.seances.filter(s =>
      s.cinema === this.selectedCinema &&
      s.capacite >= this.nbPlaces
    );
  }

  private readonly route = inject(ActivatedRoute);
  private readonly filmService = inject(FilmsService);
  private readonly seanceService = inject(SeanceService);

  ngOnInit(): void {
    const filmIdParam = this.route.snapshot.paramMap.get('id');
    const cinemaParam = this.route.snapshot.paramMap.get('cinema');

    const filmId = filmIdParam ? parseInt(filmIdParam, 10) : null;
    this.selectedCinema = cinemaParam ?? null;

    if (filmId !== null && !isNaN(filmId)) {
      // 1. Récupérer les infos du film
      this.filmService.getFilmById(filmId).subscribe(data => {
        this.film = data;
      });

      // 2. Récupérer les séances du film
      this.seanceService.getSeancesByFilm(filmId).subscribe(data => {
        this.seances = data;
      });
    }
  }

  verifierPMR(): void {
    this.pmrErreur = this.nbPMR > 8;
  }

  isPMR(row: string, col: number): boolean {
    return this.sieges.some(s => s.rangée === row && s.numero === col && s.estPMR);
  }

  isReserved(row: string, col: number): boolean {
    return this.sieges.some(s => s.rangée === row && s.numero === col && s.estRéservé);
  }

  formatDate(dateStr: string): string {
    const mois = ['janv.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    const date = new Date(dateStr);
    const jour = date.getDate();
    const moisNom = mois[date.getMonth()];
    const annee = date.getFullYear();
    return `${jour} ${moisNom} ${annee}`;
  }

  formatHeure(heureStr: string): string {
    const [hh, mm] = heureStr.split(':');
    return `${hh}:${mm}`;
  }
  formatPrix(prix: number): string {
    return prix.toFixed(2).replace('.', ',') + ' €';
  }


  showPopup = false;
  selectSeance(seance: Seance) {
    this.selectedSeance = seance;
    this.showPopup = true;
  }

  rows: string[] = ['A', 'B', 'C', 'D', 'E'];
  columns: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  selectedSeats: string[] = [];
  toggleSeat(seat: string) {
    const index = this.selectedSeats.indexOf(seat);
    if (index > -1) {
      this.selectedSeats.splice(index, 1); // ❌ Désélection
    } else {
      this.selectedSeats.push(seat); // ✅ Sélection
    }
  }

  validateSelection() {
    const nbPlacesSouhaitees = this.nbPlaces;
    const nbPlacesSelectionnees = this.selectedSeats.length;

    if (nbPlacesSelectionnees !== nbPlacesSouhaitees) {
      this.validationErreur = 'Le nombre de places sélectionnées ne correspond pas au nombre de places souhaitées';
      return;
    }

    const salleId = this.selectedSeance?.salle_id;
    if (salleId && nbPlacesSouhaitees > 0 && this.selectedSeance) {
      this.seanceService.reduireCapacite(salleId, nbPlacesSouhaitees).subscribe({
        next: () => {
          this.selectedSeance!.capacite -= nbPlacesSouhaitees;
          this.showPopup = false;
          this.selectedSeats = [];
          this.validationErreur = ''; // Réinitialiser le message
        },
        error: err => {
          console.error('Erreur lors de la mise à jour de la capacité', err);
        }
      });
    }
  }



  closePopup() {
    this.showPopup = false;
    this.selectedSeance = null;
  }
}
