import {Component, inject} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Seance, SeanceService} from '../seances/seances.service';
import {Film} from '../reservation/reservation.service';
import {AuthService} from '../connexion/auth.service';

@Component({
  selector: 'app-recap',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    RouterLink,
  ],
  templateUrl: './recap.component.html',
  styleUrl: './recap.component.scss'
})
export class RecapComponent {
  film: Film | null = null;
  seance: Seance | null = null;
  nbPlaces = 0;
  nbPMR= 0;
  sieges: { rang: string; numero: number; salle_id: number }[] = [];
  selectedCinema = '';

  private readonly seanceService = inject(SeanceService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);


  constructor() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.film = state?.['film'];
    this.seance = state?.['seance'];
    this.nbPlaces = state?.['nbPlaces'] ?? 0;
    this.nbPMR = state?.['nbPMR'] ?? 0;
    this.sieges = state?.['sieges'] ?? [];
    this.selectedCinema = state?.['selectedCinema'] ?? '';
  }

  formatDate(dateStr: string): string {
    const mois = ['janv.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    const date = new Date(dateStr);
    return `${date.getDate()} ${mois[date.getMonth()]} ${date.getFullYear()}`;
  }

  formatHeure(heureStr: string): string {
    if (!heureStr) return '—';
    const [hh, mm] = heureStr.split(':');
    return `${hh}:${mm}`;
  }

  calculerHeureFin(): string {
    if (!this.seance) return '';

    const [hh, mm] = this.seance.heure.split(':').map(Number);
    const debut = new Date();
    debut.setHours(hh, mm, 0, 0);

    const fin = new Date(debut.getTime() + this.seance.duree * 60000);
    const heures = fin.getHours().toString().padStart(2, '0');
    const minutes = fin.getMinutes().toString().padStart(2, '0');

    return `${heures}:${minutes}`;
  }

  get prixCalcule(): number {
    return this.seance!.prix * (this.nbPlaces + this.nbPMR);
  }

  confirm(): void {
    const salleId = this.seance!.salle_id;
    const nbPlacesSouhaitees = this.nbPlaces + this.nbPMR;
    const utilisateurId = this.authService.getUtilisateurId();

    if (!utilisateurId) {
      alert('Vous devez être connecté pour réserver.');
      this.router.navigate(['/connexion'], {
        state: {
          film: this.film,
          seance: this.seance,
          nbPlaces: this.nbPlaces,
          nbPMR: this.nbPMR,
          sieges: this.sieges,
          selectedCinema: this.selectedCinema,
          retour: '/recap'
        }
      });
      return;
    }

    this.seanceService.reduireCapacite(salleId, nbPlacesSouhaitees).subscribe({
      next: () => {
        console.log('Capacité mise à jour');
      },
      error: err => {
        console.error('Erreur lors de la mise à jour de la capacité', err);
      }
    });

    this.seanceService.reserverSieges({
      sieges: this.sieges,
      seance_id: this.seance?.idSeance,
      utilisateur_id: utilisateurId
    }).subscribe({
      next: () => {
        alert('Votre réservation a bien été confirmée !');
      },
      error: () => {
        alert('❌ La réservation a échoué.');
      }
    });
  }
}



