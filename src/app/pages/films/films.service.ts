import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Film {
  id: number;
  titre: string;
  duree: number;
  genre: string;
  description: string;
  note?: number;
  date_sortie?: string;
  image_url?: string;
}

@Injectable({ providedIn: 'root' })
export class FilmsService {
  private readonly apiUrl = 'http://ecf.local/backend/api/films.php';
  private readonly http = inject(HttpClient);

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiUrl);
  }
}
