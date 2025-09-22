import {Component, inject} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Seance, SeanceService} from '../seances/seances.service';
import {Film} from '../reservation/reservation.service';
import {AuthService} from '../connexion/auth.service';
import {PopupMessageComponent} from '../../components/popupMsg/popupMsg.component';

@Component({
  selector: 'app-recap',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    RouterLink,
    PopupMessageComponent,
  ],
  templateUrl: './recap.component.html',
  styleUrl: './recap.component.scss'
})
export class RecapComponent {
  film: Film | null = null;
  seance: Seance | null = null;
  nbPlaces = 0;
  nbPMR= 0;
  sieges: { id: number; rang: string; numero: number; salle_id: number }[] = [];
  selectedCinema = '';

  showPopup = false;
  popupTitre = '';
  popupMessages: string[] = [];
  popupReponse = false;
  popupRedirection: string | null = null;

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
      this.afficherPopup(
        'INFORMATION',
        ['Vous devez être connecté pour réserver.'],
        false,
        '/connexion'
      );
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
        console.log('Sieges reservés mis à jours');
      },
      error: () => {
      console.error('Erreur lors de la mise à jour de la dispo des sièges');
      }
    });

    this.seanceService.reserverSieges({
      sieges: this.sieges,
      seance_id: this.seance?.idSeance,
      utilisateur_id: utilisateurId
    }).subscribe({
      next: () => {
        const siegeId = this.sieges.map(s => s.id);
        this.seanceService.enregistrerReservation({
          utilisateur_id: utilisateurId,
          seance_id: this.seance!.idSeance,
          siege_id: siegeId
        }).subscribe({
          next: () => {
            this.afficherPopup(
              'INFORMATION',
              [
                'Votre réservation a bien été confirmée !<br>',
                'Il n’y a pas de plateforme de paiement,<br>',
                'vous pouvez fermer cette fenêtre.<br>',
                'Vous allez être redirigée vers la page d’accueil.'
              ],
              false,
              '/home'
            );
          },
          error: () => {
            console.error('La réservation n’a pas pu être enregistrée.');
          }
        });
      },
      error: () => {
        console.error('La réservation a échoué.');
      }
    });
  }

  afficherPopup(titre: string, messages: string[], reponse: boolean = false, redirection?: string) {
    this.popupTitre = titre;
    this.popupMessages = messages;
    this.popupReponse = reponse;
    this.popupRedirection = redirection ?? null;
    this.showPopup = true;
  }

  fermerPopup() {
    this.showPopup = false;

    if (this.popupRedirection) {
      this.router.navigate([this.popupRedirection], {
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
    }
  }
}



