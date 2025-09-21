import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FilmCard, HomeService} from '../home/home.service';
import {AdminService, Avis, Salle, Utilisateurs} from './admin.service';
import {AuthService} from '../connexion/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  films: FilmCard[] = [];
  showAllFilms = false;

  salles: Salle[] = [];
  utilisateurs: Utilisateurs[] = [];
  employes: Utilisateurs[] = [];
  avis: Avis[] = [];

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
}
