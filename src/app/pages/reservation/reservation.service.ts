import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class FilmService {
  private readonly apiUrl = 'http://ecf.local/backend/api/reservation.php'
  private readonly http = inject(HttpClient);

  reservation(ville: string): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}?ville=${ville}`);
  }
}
