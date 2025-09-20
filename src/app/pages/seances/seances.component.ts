import {Component, OnInit, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilmsService, Films} from '../films/films.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Seance, SeanceService} from './seances.service';
import {FormsModule} from '@angular/forms';
import {SiegesService} from './sieges/sieges.component';

interface Siege {
  idSiege: number;
  rang: string;
  numero: number;
  estPMR: boolean;
  dispo: boolean;
  salle_id: number;
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
  sieges: Siege[] = [];

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
  private readonly siegesService = inject(SiegesService);

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

  showPopup = false;

  selectSeance(seance: Seance) {
    this.selectedSeance = seance;
    this.showPopup = true;

    this.siegesService.getSiegesBySalle(seance.salle_id).subscribe(data => {
      this.sieges = data.map(s => ({
        ...s,
        estPMR: s.estPMR,
        estReserve: !s.dispo,
        salle_id: seance.salle_id
      }));

      this.rows = [...new Set(this.sieges.map(s => s.rang))];
      this.columns = [...new Set(this.sieges.map(s => s.numero))].sort((a, b) => a - b);
    });
  }

  rows: string[] = ['A', 'B', 'C', 'D', 'E'];
  columns: number[] = Array.from({length: 20}, (_, i) => i + 1);
  selectedSeats: string[] = [];

  toggleSeat(seat: string) {
    const index = this.selectedSeats.indexOf(seat);
    if (index > -1) {
      this.selectedSeats.splice(index, 1); // ❌ Désélection
    } else {
      this.selectedSeats.push(seat); // ✅ Sélection
    }
  }

  getSeatClass(row: string, col: number): string {
    const siege = this.sieges.find(s => s.rang === row && s.numero === col);
    if (!siege) return '';

    if (siege.estPMR && siege.dispo) return 'pmr-dispo';
    if (siege.estPMR && !siege.dispo) return 'pmr-reserve';
    if (!siege.estPMR && !siege.dispo) return 'reserve';
    return 'disponible';
  }

  isReserved(row: string, col: number): boolean {
    const siege = this.sieges.find(s => s.rang === row && s.numero === col);
    return siege ? !siege.dispo : true;
  }

  validateSelection() {
    const nbPlacesSouhaitees = this.nbPlaces;
    const nbPlacesSelectionnees = this.selectedSeats.length;

    const salleId = this.selectedSeance!.salle_id;
    const siegeSelection = this.selectedSeats.map(code => {
      const rang = code.match(/[A-Z]/)?.[0] ?? '';
      const numero = parseInt(code.replace(/[A-Z]/g, ''), 10);
      return {rang, numero, salle_id: salleId};
    });

    if (nbPlacesSelectionnees !== nbPlacesSouhaitees) {
      this.validationErreur = 'Le nombre de places sélectionnées ne correspond pas au nombre de places souhaitées';
      return;
    }

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

    this.siegesService.reserverSieges(siegeSelection).subscribe(response => {
      if (response.success) {
        siegeSelection.forEach(sel => {
          const siege = this.sieges.find(s =>
            s.rang === sel.rang && s.numero === sel.numero && s.salle_id === sel.salle_id
          );
          if (siege) siege.dispo = false;
        });

        this.selectedSeats = [];
        alert('✅ Vos sièges ont bien été réservés !');
      } else {
        alert('❌ La réservation a échoué.');
      }
    });


  }


  closePopup() {
    this.showPopup = false;
    this.selectedSeance = null;
  }
}
