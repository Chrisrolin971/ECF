import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FilmCard, HomeService} from '../home/home.service';
import {AdminService, Avis, Salle, Utilisateurs} from './admin.service';
import {AuthService} from '../connexion/auth.service';
import {PopupMessageComponent} from '../../components/popupMsg/popupMsg.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, PopupMessageComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  films: FilmCard[] = [];
  showAllFilms = false;

  salles: Salle[] = [];
  utilisateurs: Utilisateurs[] = [];
  employes: Utilisateurs[] = [];
  avis: Avis[] = [];

  avisAttenteValid: number | null = null;
  avisAttenteSuppr: number | null = null;

  showPopup = false;
  popupTitre = '';
  popupMessages: string[] = [];
  popupReponse = false;

  private readonly adminService = inject(AdminService);
  private readonly homeService = inject(HomeService);
  protected readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.homeService.getFilms().subscribe(data => {
      this.films = data.affiches;
    });

    this.adminService.getSalles().subscribe(data => {
      this.salles = data;
    });

    this.adminService.getUtilisateurs().subscribe(data => {
      this.utilisateurs = data;
      this.employes = this.utilisateurs.filter(u => u.role === 'employe');
    });

    this.adminService.getAvis().subscribe(data => {
      this.avis = data;
    })
  }

  get displayedFilms(): FilmCard[] {
    return this.showAllFilms ? this.films : this.films.slice(0, 5);
  }

  toggleFilms(): void {
    this.showAllFilms = !this.showAllFilms;
  }
  validerAvis(id: number): void {
    this.avisAttenteValid = id;
    this.afficherPopup(
      'Confirmation',
      ['Voulez-vous vraiment valider cet avis ?'],
      true
    );
  }
  supprimerAvis(id: number): void {
    this.avisAttenteSuppr = id;
    this.afficherPopup(
      'Confirmation',
      ['Voulez-vous vraiment supprimer cet avis ?'],
      true
    );
  }
  validerPopup() {
    this.showPopup = false;
    if (this.avisAttenteValid !== null) {
      this.adminService.validerAvis(this.avisAttenteValid).subscribe({
        next: () => {
          this.avis = this.avis.filter(a => a.id !== this.avisAttenteValid);
          this.avisAttenteValid = null;
          this.afficherPopup(
            'INFORMATION',
            ['Vous avez validé l\'avis'],
            false
          );
        },
        error: () => {
          alert("Erreur lors de la validation de l'avis");
        }
      });
    }

    if(this.avisAttenteSuppr !== null) {
      this.adminService.supprimerAvis(this.avisAttenteSuppr).subscribe({
        next: (res) => {
          this.avis = this.avis.filter(a => a.id !== this.avisAttenteSuppr);
          this.afficherPopup('Avis supprimé', [res.message], false);
        },
        error: () => {
          this.afficherPopup('Erreur', ['Impossible de supprimer cet avis'], false);
        }
      });
    }
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
