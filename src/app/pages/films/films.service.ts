import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Films {
  id: number;
  titre: string;
  duree: number;
  categorie: string;
  description: string;
  note: number;
  date_sortie: string;
  image: string;
  coeur: boolean;
}

@Injectable({ providedIn: 'root' })
export class FilmsService {
  private readonly apiUrl = 'http://ecf.local/backend/api/films.php';
  private readonly http = inject(HttpClient);

  getFilms(): Observable<Films[]> {
    return this.http.get<Films[]>(this.apiUrl);
  }
}
