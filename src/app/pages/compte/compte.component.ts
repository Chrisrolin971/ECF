import { Component, inject, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NgForOf, NgIf} from '@angular/common';
import {FilmService, Reservation} from '../reservation/reservation.service';
import {AdminService} from '../admin/admin.service';
import {PopupMessageComponent} from '../../components/popupMsg/popupMsg.component';
import {AvisPayload, CompteService} from './compte.service';

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    PopupMessageComponent
  ],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.scss'
})
export class CompteComponent implements OnInit {
  ongletActif = '';
  tri =  'Date';
  selectedCategories: string[] = [];
  reservations: Reservation[] = [];
  nom = '';
  prenom = '';
  pseudo = '';
  email = '';
  mdp = '';

  ancienMotDePasse = '';
  nouveauMotDePasse = '';
  confirmationMotDePasse = '';
  messageErreur = '';

  showPopup = false;
  popupTitre = '';
  popupMessages: string[] = [];
  popupReponse = false;

  avisAjout: number | null = null;
  noteTemporaire = 0; //survol
  noteFinale = 0;//sélection
  commentaire = '';

  private readonly adminService = inject(AdminService);
  private readonly reservationService = inject(FilmService);
  private readonly compteService = inject(CompteService);

  afficher(section: string) {
    this.ongletActif = section;
  }

  afficherPopup(titre: string, messages: string[], response: boolean) {
    this.popupTitre = titre;
    this.popupMessages = messages;
    this.showPopup = true;
    this.popupReponse = response;
  }

  getIdFromToken(): number | null {
    if (typeof window === 'undefined' || !window.localStorage)
      return null;


    const token = localStorage.getItem('token');
    if (!token) return null;


    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id || null;

  }

  ngOnInit() {
    let idConnecte: number | null = null;
    if (typeof window !== 'undefined') {
      idConnecte = this.getIdFromToken();
    }

    this.reservationService.getReservations().subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (err) => {
        console.error('Erreur chargement réservations', err);
      }
    });

    this.adminService.getUtilisateurs().subscribe({
      next: (data) => {

        const utilisateur = data.find(u => u.id === idConnecte) || null;

        if (utilisateur) {
          this.nom = utilisateur.nom;
          this.prenom = utilisateur.prenom;
          this.email = utilisateur.email;
          this.pseudo = utilisateur.pseudo;
          this.mdp = utilisateur.motDePasse;

          console.log(
            this.nom,
            this.prenom,
            this.email,
            this.pseudo,
          );
        }
      }
    });
  }

  estSeanceFuture(res: Reservation): boolean {
    const dateSeance = new Date(`${res.date}T${res.heure}`);
    return dateSeance > new Date();
  }
  toggle(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
  }

  isSelected(category: string): boolean {
    return this.selectedCategories.includes(category);
  }

  changerMotDePasse() {
    //Vérification que les deux nouveaux mots de passe sont identiques
    if (this.nouveauMotDePasse !== this.confirmationMotDePasse) {
      this.messageErreur = "Les mots de passe ne correspondent pas.";
      return;
    }

    //Vérification du format du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(this.nouveauMotDePasse)) {
      this.messageErreur = 'Le mot de passe doit contenir :<br>' +
        'Au moins 8 caractères, une majuscule et une minuscule,<br>' +
        'un chiffre et un caractère spécial';
      return;
    }

    this.adminService.updateMotDePasse(this.ancienMotDePasse, this.nouveauMotDePasse).subscribe({
      next: (res) => {
        if (res.success) {
          this.afficherPopup('Mot de passe mis à jour', [
            'Votre mot de passe a bien été modifié.'
          ], false);
          this.ancienMotDePasse ='';
          this.nouveauMotDePasse = '';
          this.confirmationMotDePasse = '';
          this.messageErreur = '';
        } else {
          this.messageErreur = res.message;
        }
      },
      error: () => {
        this.messageErreur = 'Erreur serveur';
      }
    });
  }

  posterAvis() {
    const avis: AvisPayload = {
      seance_id: this.avisAjout as number,
      note: this.noteFinale,
      commentaire: this.commentaire || ''
    };

    this.compteService.envoyerAvis(avis).subscribe({
      next: () => {
        this.avisAjout = null;
        this.noteFinale = 0;
        this.commentaire = '';
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi de l\'avis', err);
      }
    });
  }



  confirmerSuppression() {
    this.afficherPopup('Suppression du compte', [
      'Êtes-vous sûre de vouloir supprimer votre compte ?',
      'Cette action est irréversible.'
    ], true);
  }

  fermerPopup() {
    this.showPopup = false;
  }
  validerPopup() {
    console.log('Il n\'est pas possible de supprimer votre compte pour le moment.');
  }

  formatDate(dateStr: string): string {
    const mois = ['janv.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    const date = new Date(dateStr);
    const jour = date.getDate();
    const moisNom = mois[date.getMonth()];
    const annee = date.getFullYear();
    return `${jour} ${moisNom} ${annee}`;
  }
  formatHeure(heureStr: string): string {
    if (!heureStr) return '—';
    const [hh, mm] = heureStr.split(':');
    return `${hh}:${mm}`;
  }
}
