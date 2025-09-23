import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Utilisateur} from '../../inscription/inscription.service';

@Component({
  selector: 'app-popup-ajout-employe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajoutEmploye.component.html',
  styleUrl: './ajoutEmploye.component.scss',
})
export class PopupAjoutEmployeComponent {
  @Input() visible = false;
  @Output() fermer = new EventEmitter<void>();
  @Output() enregistrer = new EventEmitter<Utilisateur>();


  nom = '';
  prenom = '';
  pseudo = '';
  email = '';
  motDePasse = '';
  confMotdePasse = '';
  messageErreur = '';

  valider() {
    if (this.CheckFile()) {
      const employe: Utilisateur = {
        nom: this.nom,
        prenom: this.prenom,
        pseudo: this.pseudo,
        email: this.email,
        motDePasse: this.motDePasse,
        role: 'employe'
      };
      this.enregistrer.emit(employe);
    }
  }

  annuler() {
    this.fermer.emit();
  }

  CheckFile(): boolean {
    // Vérification des champs requis
    if (
      this.nom === '' || this.prenom === '' ||
      this.pseudo === '' || this.email === '' ||
      this.motDePasse === '' || this.confMotdePasse === ''
    ) {
      this.messageErreur = 'Tous les champs sont obligatoires.';
      return false;
    }

    // Vérification du format de l'adresse mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.trim())) {
      this.messageErreur = 'Le format de l’adresse email est invalide.<br> ' +
        'Elle doit être sous forme : exemple@domaine.com';
      return false;
    }

    // Vérification de la correspondance des mots de passe
    if (this.motDePasse !== this.confMotdePasse) {
      this.messageErreur = 'Les mots de passe ne correspondent pas.';
      return false;
    }

    // Vérification du format du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(this.motDePasse)) {
      this.messageErreur = 'Le mot de passe doit contenir :<br>' +
        'Au moins 8 caractères, une majuscule et une minuscule,<br>' +
        'un chiffre et un caractère spécial';
      return false;
    }
    this.messageErreur = '';
    return true;
  }
}
