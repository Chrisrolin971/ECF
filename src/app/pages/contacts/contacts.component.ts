import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-contacts',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  nom = '';
  objet = '';
  message = '';
  messageErreur = '';
  messageValid = '';

  showPopup = false;
  onSubmit(): void {
    if (this.objet.trim() === '' || this.message.trim() === '') {
      this.messageErreur = 'Veuillez remplir les champs obligatoires.';
      this.messageValid = '';
      return;
    }

    // Simule l'envoi (tu peux remplacer par un appel HTTP ou autre)
    console.log('Message envoyé :', {
      nom: this.nom,
      objet: this.objet,
      message: this.message
    });

    this.showPopup = true;
    // this.messageValid = 'Votre message a été envoyé avec succès !';
    this.messageErreur = '';
    this.resetForm();
  }

  resetForm(): void {
    this.nom = '';
    this.objet = '';
    this.message = '';
  }
  closePopup(): void {
    this.showPopup = false;
  }
}
