import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

export interface Avis {
  id: number;
  note: number;
  commentaire: string;
  date: Date;
  titre: string;
  notes: number;
  pseudo: string;
}

export interface UpdateMdpResponse {
  success: boolean;
  message: string;
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

  getAvis():  Observable<Avis[]> {
    return this.http.get<Avis[]>(`${this.apiUrl}/avis.php`);
  }

  updateMotDePasse(ancienMotDePasse: string, nouveauMotDePasse: string): Observable<UpdateMdpResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { ancienMotDePasse, nouveauMotDePasse };

    return this.http.post<UpdateMdpResponse>(`${this.apiUrl}/updateMdp.php`, body, { headers });
  }
}
