import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FilmCard {
  id: number;
  titre: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  private readonly apiUrl = 'http://ecf.local/backend/api/home.php';
  private readonly http = inject(HttpClient);

  getFilms(): Observable<{ nouveautes: FilmCard[]; affiches: FilmCard[] }> {
    return this.http.get<{ nouveautes: FilmCard[]; affiches: FilmCard[] }>(this.apiUrl);
  }
}
