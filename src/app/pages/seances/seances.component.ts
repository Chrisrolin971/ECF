import {Component, OnInit, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FilmsService, Films} from '../../services/films.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Seance, SeanceService} from '../../services/seances.service';
import {FormsModule} from '@angular/forms';
import {SiegesService} from './sieges/sieges.component';

interface Siege {
  id: number;
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
  private readonly router = inject(Router);

  ngOnInit(): void {
    const filmIdParam = this.route.snapshot.paramMap.get('id');
    const cinemaParam = this.route.snapshot.paramMap.get('cinema');

    const filmId = filmIdParam ? Number.parseInt(filmIdParam, 10) : null;
    this.selectedCinema = cinemaParam ?? null;

    if (filmId !== null && !Number.isNaN(filmId)) {
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
    if (!heureStr) return '—';
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
        id: s.id,
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
      this.selectedSeats.splice(index, 1); //Désélection
    } else {
      this.selectedSeats.push(seat); //Sélection
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
      const rang = new RegExp(/[A-Z]/).exec(code)?.[0] ?? '';
      const numero = Number.parseInt(code.replaceAll(/[A-Z]/g, ''), 10);
      const siege = this.sieges.find(s => s.rang === rang && s.numero === numero);
      return {
        id: siege?.id,
        rang,
        numero,
        alle_id: salleId
      };
    });

    if (nbPlacesSelectionnees !== nbPlacesSouhaitees) {
      this.validationErreur = 'Le nombre de places sélectionnées ne correspond pas au nombre de places souhaitées';
      return;
    }

    //réoriente vers la page de recapitulatif
    this.router.navigate(['/recap'], {
      state: {
        film: this.film,
        seance: this.selectedSeance,
        nbPlaces: this.nbPlaces,
        nbPMR: this.nbPMR,
        sieges: siegeSelection,
        selectedCinema: this.selectedCinema
      }
    });
  }


  closePopup() {
    this.showPopup = false;
    this.selectedSeance = null;
  }
}
