import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

export interface Salle {
  numero: number;
  nom: string;
  capacite: number;
  cinema: string;
  qualite: string;
}

export interface Utilisateurs {
  id: number;
  nom: string;
  prenom: string;
  pseudo: string;
  email: string;
  motDePasse: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly apiUrl = 'http://ecf.local/backend/api';
  private readonly http = inject(HttpClient);

  getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${this.apiUrl}/salles.php`);
  }


  getUtilisateurs(): Observable<Utilisateurs[]> {
    return this.http.get<Utilisateurs[]>(`${this.apiUrl}/utilisateurs.php`);
  }

}
