import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';
import {ConnexionPayload, ConnexionService} from './connexion.service';
import {FormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {PopupMessageComponent} from '../../components/popupMsg/popupMsg.component';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PopupMessageComponent],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  email = '';
  motDePasse = '';
  messageErreur = '';

  showPopup = false;
  popupTitre = '';
  popupMessages: string[] = [];
  popupReponse = false;
  popupRedirection: string | null = null;

  private readonly retour: string = '/recap';
  private readonly recapState: Record<string, unknown> | null;

  private readonly connexionService = inject(ConnexionService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);


  constructor() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.retour = state?.['retour'] ?? '/home';
    this.recapState = state ?? null;
  }
  onSubmit(): void {
    if (!this.email || !this.motDePasse) {
      this.messageErreur = 'Tous les champs sont obligatoires.';
      return;
    }

    const payload: ConnexionPayload = {
      email: this.email,
      motDePasse: this.motDePasse
    };

    this.connexionService.connecterUtilisateur(payload).subscribe({
      next: (res) => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          this.authService.setUtilisateurFromToken(res.token);
          this.afficherPopup(
            'Information',
            [res.message],
            false,
            this.retour
          );
        } else {
          this.messageErreur = res.message;
        }
      },
      error: (err) => {
        this.messageErreur = 'Erreur de connexion. Vérifiez vos identifiants.';
        console.error('Erreur complète:', err);
      }
    });
  }

  afficherPopup(titre: string, messages: string[], reponse: boolean, redirection?: string) {
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
        state: this.recapState ?? undefined
      });
    }
  }
}
