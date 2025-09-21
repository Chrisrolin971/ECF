import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SeanceService} from '../seances/seances.service';
import {FilmCard, HomeService} from '../home/home.service';
import {AdminService, Salle, Utilisateurs} from './admin.service';

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

  private readonly adminService = inject(AdminService);
  private readonly seanceService = inject(SeanceService);
  private readonly homeService = inject(HomeService);

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
  }

  get displayedFilms(): FilmCard[] {
    return this.showAllFilms ? this.films : this.films.slice(0, 5);
  }

  toggleFilms(): void {
    this.showAllFilms = !this.showAllFilms;
  }
}
