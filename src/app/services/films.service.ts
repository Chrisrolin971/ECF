import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

export interface Films {
  id: number;
  titre: string;
  duree: number;
  categorie: string;
  description: string;
  note?: number;
  date_sortie: string;
  image: string;
  coeur: boolean;
  pegi?: number;
}

@Injectable({ providedIn: 'root' })
export class FilmsService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getFilms(): Observable<Films[]> {
    return this.http.get<Films[]>(`${this.apiUrl}/films.php`);
  }

  getFilmById(id: number): Observable<Films> {
    return this.http.get<Films>(`${this.apiUrl}/getFilmById.php?id=${id}`);
  }
}
