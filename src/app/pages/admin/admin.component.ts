import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PopupMessageComponent} from '../../components/popupMsg/popupMsg.component';
import {PopupAjoutEmployeComponent} from './popup/ajoutEmploye.component';
import {UpdateMdpComponent} from './popup/updateEmploye.component';
import {PopupAjoutFilmComponent} from './popup/ajoutFilm.component';
import {AdminService, Avis, Film, Salle, Utilisateurs} from '../../services/admin.service';
import {AuthService} from '../../services/auth.service';
import {Utilisateur} from '../../services/inscription.service';
import {HomeService} from '../../services/home.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, PopupMessageComponent, UpdateMdpComponent, PopupAjoutEmployeComponent, PopupAjoutFilmComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  films: Film[] = [];
  showAllFilms = false;

  salles: Salle[] = [];
  utilisateurs: Utilisateurs[] = [];
  employes: Utilisateurs[] = [];
  avis: Avis[] = [];

  avisAttenteValid: number | null = null;
  avisAttenteSuppr: number | null = null;
  employeAttenteSuppr: Utilisateur | null = null;
  filmAttenteSuppr: Film | null = null;
  filmSelectionne: Film | null = null;
  filmAModifier: Film | null = null;

  showPopup = false;
  popupTitre = '';
  popupMessages: string[] = [];
  popupReponse = false;

  showAjoutEmploye = false;
  showUpdatetEmploye = false;
  showAjoutFilm = false;

  empAModifier = '';

  private readonly adminService = inject(AdminService);
  private readonly homeService = inject(HomeService);
  protected readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.adminService.getFilms().subscribe(data => {
      this.films = data;
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

  get displayedFilms(): Film[] {
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
            'Information',
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
          alert("Impossible de supprimer cet avis");
        }
      });
    }

    if(this.employeAttenteSuppr !== null) {
      this.adminService.supprimerEmploye(this.employeAttenteSuppr.email).subscribe({
        next: () => {
          this.afficherPopup('Information', [`L'employé ${this.employeAttenteSuppr?.prenom} ${this.employeAttenteSuppr?.nom} a été supprimé.`], false);
          this.ngOnInit(); // recharge la liste
        },
        error: () => {
          alert("Impossible de supprimer cet employé");
        }
      });
    }

    if (this.filmAttenteSuppr) {
      this.adminService.supprimerFilm(this.filmAttenteSuppr.id).subscribe({
        next: () => {
          this.afficherPopup('Film supprimé', [`${this.filmAttenteSuppr!.titre} a été supprimé.`], false);
          this.filmAttenteSuppr = null;
          this.ngOnInit();
        },
        error: () => {
          this.afficherPopup('Erreur', ['Impossible de supprimer ce film'], false);
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

  ajouterEmploye(): void {
    this.showAjoutEmploye = true;
  }
  enregistrerEmploye(employe: Utilisateur): void {
    this.adminService.creerUtilisateur(employe).subscribe({
      next: () => {
        this.showAjoutEmploye = false;
        this.afficherPopup('Information', ['Le nouvel employé a été enregistré'], false);
        this.ngOnInit();// maj liste
      },
      error: () => {
        alert("Impossible d'ajouter l'employé");
      }
    });
  }

  modifierMdp(emp: Utilisateur): void {
    this.empAModifier  = emp.email;
    this.showUpdatetEmploye = true;
  }
  mettreAJourEmploye(data: { email: string; motDePasse: string }): void {
    this.adminService.updateMotDePasseEmploye(data.email, data.motDePasse).subscribe({
      next: () => {
        this.showUpdatetEmploye = false;
        this.afficherPopup('Mot de passe modifié', ['Le mot de passe a été mis à jour.'], false);
        this.ngOnInit();
      },
      error: () => {
        alert("Impossible de modifier le mot de passe");
      }
    });
  }

  supprimerEmploye(emp: Utilisateur): void {
    this.employeAttenteSuppr = emp;
    this.afficherPopup(
      'Confirmation',
      [`Voulez-vous vraiment supprimer ${emp.prenom} ${emp.nom} ?`],
      true
    );
  }

  ajouterFilm(): void {
    this.showAjoutFilm = true;
  }

  selectionnerFilm(film: Film): void {
    this.filmSelectionne = film;
  }

  modifierFilm(): void {
    if (!this.filmSelectionne) return;
    this.filmAModifier = { ...this.filmSelectionne };
    this.showAjoutFilm = true;
  }

  SupprimerFilm(): void {
    if (!this.filmSelectionne) return;
    this.filmAttenteSuppr = this.filmSelectionne;
    this.afficherPopup(
      'Confirmation',
      [`Voulez-vous vraiment supprimer le film "${this.filmSelectionne.titre}" ?`],
      true
    );
  }
  traiterFilm(film: Film): void {
    if (film.id) {
      //mise à jour
      this.adminService.modifierFilm(film).subscribe({
        next: () => {
          this.showAjoutFilm = false;
          this.filmSelectionne = null;
          this.afficherPopup('Film modifié', ['Les informations ont été mises à jour.'], false);
          this.ngOnInit();
        },
        error: () => {
          alert('Impossible de modifier le film');
        }
      });
    } else {
      //ajout
      this.adminService.creerFilm(film).subscribe({
        next: () => {
          this.showAjoutFilm = false;
          this.afficherPopup('Film ajouté', ['Le film a bien été ajouté.<br>',
            'Veuillez rafraîchir la page si l\'image ne se charge pas correctement'], false);
          this.ngOnInit();
        },
        error: () => {
          alert("Impossible d'ajouter le film");
        }
      });
    }
  }


}
