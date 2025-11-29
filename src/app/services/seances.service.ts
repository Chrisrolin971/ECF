import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

export interface Seance {
  capacite: number;
  idSeance: number;
  date: string;
  heure: string;
  langue: string;
  qualite: string;
  prix: number;
  salle: string;
  cinema: string;
  salle_id: number;
  duree: number;
}

export interface CapaciteResponse {
  success: boolean;
  error?: string;
}


@Injectable({ providedIn: 'root' })
export class SeanceService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject (HttpClient);

  getSeancesByFilm(filmId: number): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${this.apiUrl}/seances.php?filmId=${filmId}`);
  }

  reduireCapacite(salleId: number, nbPlaces: number): Observable<CapaciteResponse> {
    const url = `${this.apiUrl}/updateCapacite.php`;
    const body = { salleId, nbPlaces };
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<CapaciteResponse>(url, body, { headers });
  }

  reserverSieges(sieges: {
    sieges: { id: number; rang: string; numero: number; salle_id: number }[];
    seance_id: number | undefined;
    utilisateur_id: number
  }): Observable<{ success: boolean }> {
    const url = `${this.apiUrl}/sieges.php`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<{ success: boolean }>(url, sieges, { headers });
  }

  enregistrerReservation(data: {
    utilisateur_id: number;
    seance_id: number;
    siege_id: number[];
  }): Observable<{ success: boolean }> {
    const url = `${this.apiUrl}/enregistrerResa.php`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<{ success: boolean }>(url, data, { headers });
  }


}
