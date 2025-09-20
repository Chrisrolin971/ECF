import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post<CapaciteResponse>(url, body);
  }

  reserverSieges(sieges: { rang: string; numero: number; salle_id: number }[]): Observable<{ success: boolean }> {
    const url = 'http://ecf.local/backend/api/sieges.php';
    return this.http.post<{ success: boolean }>(url, { sieges });
  }

}
