import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private readonly apiUrl = 'http://ecf.local/backend/api/seances.php'
  private readonly http = inject (HttpClient);

  getSeancesByFilm(filmId: number): Observable<Seance[]> {
    return this.http.get<Seance[]>(`${this.apiUrl}?filmId=${filmId}`);
  }

  reduireCapacite(salleId: number, nbPlaces: number): Observable<CapaciteResponse> {
    const url = 'http://ecf.local/backend/api/updateCapacite.php';
    const body = { salleId, nbPlaces };
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<CapaciteResponse>(url, body, { headers });
  }

  reserverSieges(sieges: {
    sieges: { rang: string; numero: number; salle_id: number }[];
    seance_id: number | undefined;
    utilisateur_id: number
  }): Observable<{ success: boolean }> {
    const url = 'http://ecf.local/backend/api/sieges.php';
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<{ success: boolean }>(url, sieges, { headers });
  }

}
