import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

export interface FilmCard {
  id: number;
  titre: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getFilms(): Observable<{ nouveautes: FilmCard[]; affiches: FilmCard[] }> {
    return this.http.get<{ nouveautes: FilmCard[]; affiches: FilmCard[] }>(`${this.apiUrl}/home.php`);
  }
}
