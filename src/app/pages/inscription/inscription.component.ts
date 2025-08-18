import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {EMPTY_SUBSCRIPTION} from 'rxjs/internal/Subscription';

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


  onSubmit(): void {

    if (this.motDePasse !== this.confMotdePasse) {
      this.messageErreur = 'Les mots de passe ne correspondent pas.';
      return;
    }

    if (this.nom == '' || this.prenom == '' ||
    this.pseudo == '' || this.email == '' ||
    this.motDePasse == '' || this.confMotdePasse == '') {
      this.messageErreur = 'Tous les champs sont obligatoires.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.trim())) {
      this.messageErreur = 'Le format de l’adresse email est invalide.<br> ' +
        'Elle doit être sous forme : exemple@domaine.com';
      return;
    }

    // Si tout va bien, on vide le message d’erreur
    this.messageErreur = '';

    console.log('Nom:', this.nom);
    console.log('Prénom:', this.prenom);
    console.log('Pseudo:', this.pseudo);
    console.log('Email:', this.email);
    console.log('Mot de passe:', this.motDePasse);
    console.log('Confirm Mot de passe:', this.confMotdePasse);
    // Tu peux ajouter ici l’appel à ton service d’inscription
  }
}
