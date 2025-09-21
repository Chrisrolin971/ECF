import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscriptionService, Utilisateur, ApiResponse } from './inscription.service';

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
  messageValid = '';
  role = '';

  resetForm(): void {
    this.nom = '';
    this.prenom = '';
    this.pseudo = '';
    this.email = '';
    this.motDePasse = '';
    this.confMotdePasse = '';
    this.messageErreur = '';
  }

  private readonly inscriptionService = inject(InscriptionService);
  onSubmit(): void {

    //Vérification des champs requis
    if (this.nom == '' || this.prenom == '' ||
    this.pseudo == '' || this.email == '' ||
    this.motDePasse == '' || this.confMotdePasse == '') {
      this.messageValid = '';
      this.messageErreur = 'Tous les champs sont obligatoires.';
      return;
    }

    //Vérification du format de l'adresse mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.trim())) {
      this.messageValid = '';
      this.messageErreur = 'Le format de l’adresse email est invalide.<br> ' +
        'Elle doit être sous forme : exemple@domaine.com';
      return;
    }

    //Vérification de la correspondance des mots de passe
    if (this.motDePasse !== this.confMotdePasse) {
      this.messageValid = '';
      this.messageErreur = 'Les mots de passe ne correspondent pas.';
      return;
    }

    //Vérification du format du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(this.motDePasse)) {
      this.messageValid = '';
      this.messageErreur = 'Le mot de passe doit contenir :<br>' +
        'Au moins 8 caractères, une majuscule et une minuscule,<br>' +
        'un chiffre et un caractère spécial';
      return;
    }

    // Si tout va bien, on vide le message d’erreur
    this.messageErreur = '';

    const utilisateur: Utilisateur = {
      nom: this.nom,
      prenom: this.prenom,
      pseudo: this.pseudo,
      email: this.email,
      motDePasse: this.motDePasse,
      role: this.role
    };

    //Appel requette POST
    this.inscriptionService.inscrireUtilisateur(utilisateur)
      .subscribe({
        next: (res: ApiResponse) => {
          if (!res.success) {
            this.messageErreur = res.message;
            return;
          } else {
            this.messageValid = "Inscription réussie !";
            setTimeout(() => this.messageValid = '', 1500);
          }
          console.log('Succès:', res.message);
          this.resetForm();
        },
        error: (err: unknown) => {
          const msg = (err as { error?: { message?: string } })?.error?.message || 'Inscription impossible';
          console.error('Erreur complète:', err);
          console.error('Message:', msg);
          this.messageValid = '';
          this.messageErreur = msg;
        }
    });
  }
}
