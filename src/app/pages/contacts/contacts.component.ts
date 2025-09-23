import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {PopupMessageComponent} from '../../components/popupMsg/popupMsg.component';

@Component({
  selector: 'app-contacts',
  imports: [
    FormsModule,
    NgIf,
    PopupMessageComponent
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
  popupTitre = '';
  popupMessages: string[] = [];
  popupReponse = false;

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

    this.messageErreur = '';
    this.resetForm();
    this.afficherPopup('Information', ['Votre message a bien été envoyé !'], false)
  }

  resetForm(): void {
    this.nom = '';
    this.objet = '';
    this.message = '';
  }

  afficherPopup(titre: string, messages: string[], response: boolean) {
    this.popupTitre = titre;
    this.popupMessages = messages;
    this.showPopup = true;
    this.popupReponse = response;
  }

  fermerPopup() {
    this.showPopup = false;
  }
}
