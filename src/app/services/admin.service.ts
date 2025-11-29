import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Utilisateur} from '../inscription/inscription.service';

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
  pseudo: string;
}

export interface Film {
  id: number;
  titre: string;
  description: string;
  note?: number;
  categorie: string;
  image: string;
  coeur: boolean;
  duree: number;
  date_sortie: string;
  pegi: number | null;
}


export interface UpdateMdpResponse {
  success: boolean;
  message: string;
}

export interface CreationUtilisateurResponse {
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

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>('http://ecf.local/backend/api/films.php');
  }


  updateMotDePasse(ancienMotDePasse: string, nouveauMotDePasse: string): Observable<UpdateMdpResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { ancienMotDePasse, nouveauMotDePasse };

    return this.http.post<UpdateMdpResponse>(`${this.apiUrl}/updateMdp.php`, body, { headers });
  }

  validerAvis(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/updateAvis.php`,
      {id}
    );
  }

  supprimerAvis(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/supprimerAvis.php`,
      { id }
    );
  }

  creerUtilisateur(utilisateur: Utilisateur): Observable<CreationUtilisateurResponse> {
    return this.http.post<CreationUtilisateurResponse>(`${this.apiUrl}/inscription.php`, utilisateur);
  }

  updateMotDePasseEmploye(email: string, nouveauMotDePasse: string): Observable<{ success: boolean; message: string }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { email, nouveauMotDePasse };

    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/updateMdpEmploye.php`,
      body,
      { headers }
    );
  }

  supprimerEmploye(email: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/supprimerEmploye.php`,
      { email }
    );
  }

  creerFilm(film: Film): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/ajouterFilm.php`,
      film
    );
  }

  modifierFilm(film: Film): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/updateFilm.php`,
      film
    );
  }

  supprimerFilm(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/supprimerFilm.php`,
      { id }
    );
  }

  getAvisByFilm(id: number): Observable<Avis[]> {
    return this.http.get<Avis[]>(`${this.apiUrl}/getAvis.php?id=${id}`);
  }

}
