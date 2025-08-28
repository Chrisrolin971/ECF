import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscriptionService, Utilisateur, ApiResponse } from '../inscription/inscription.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})

export class InscriptionComponent {
  nom = '';
  prenom = '';
  pseudo = '';
  email = '';
  motDePasse = '';
  confMotdePasse = '';
  messageErreur = '';

  private inscriptionService = inject(InscriptionService);
  onSubmit(): void {

    //Vérification de la correspondance des mots de passe
    if (this.motDePasse !== this.confMotdePasse) {
      this.messageErreur = 'Les mots de passe ne correspondent pas.';
      return;
    }

    //Vérification des champs requis
    if (this.nom == '' || this.prenom == '' ||
    this.pseudo == '' || this.email == '' ||
    this.motDePasse == '' || this.confMotdePasse == '') {
      this.messageErreur = 'Tous les champs sont obligatoires.';
      return;
    }

    //Vérification du format de l'adresse mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.trim())) {
      this.messageErreur = 'Le format de l’adresse email est invalide.<br> ' +
        'Elle doit être sous forme : exemple@domaine.com';
      return;
    }

    // Si tout va bien, on vide le message d’erreur
    this.messageErreur = '';

    const utilisateur: Utilisateur = {
      nom: this.nom,
      prenom: this.prenom,
      pseudo: this.pseudo,
      email: this.email,
      motDePasse: this.motDePasse
    };

    //Appel requette POST
    this.inscriptionService.inscrireUtilisateur(utilisateur)
      .subscribe({
        next: (res: ApiResponse) => {
          alert(res.message);
          console.log('Succès:', res.message);
        },
        error: (err: unknown) => {
          const msg = (err as { error?: { message?: string } })?.error?.message || 'Erreur inconnue';
          console.error('Erreur complète:', err);
          console.error('Message:', msg);
          alert(msg);
        }
    });
  }
}
