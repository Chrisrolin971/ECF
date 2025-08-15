import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  nom = '';
  email = '';
  motDePasse = '';

  onSubmit(): void {
    console.log('Nom:', this.nom);
    console.log('Email:', this.email);
    console.log('Mot de passe:', this.motDePasse);
    // Tu peux ajouter ici l’appel à ton service d’inscription
  }
}
