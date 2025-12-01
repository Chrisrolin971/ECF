import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

export interface Film {
  id: number;
  titre: string;
  description: string;
  note: number;
  categorie: string;
  image: string;
  coeur: boolean;
  pegi?: number;
}

export interface Reservation {
  titre: string;
  date: string;
  heure: string;
  qualite: string;
  salle: number;
  id: number;
  seance_id: number;
}

@Injectable({ providedIn: 'root' })
export class FilmService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  reservation(ville: string): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/reservation.php?ville=${ville}`);
  }

  getReservations(): Observable<Reservation[]> {
    let token = '';
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('token') ?? '';
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Reservation[]>(`${this.apiUrl}/getReservations.php`, { headers });
  }
}
