import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Siege {
  id: number;
  rang: string;
  numero: number;
  estPMR: boolean;
  dispo: boolean;
}

@Injectable({ providedIn: 'root' })
export class SiegesService {
  private readonly apiUrl = 'http://ecf.local/backend/api/getSieges.php';
  private readonly http = inject(HttpClient);

  getSiegesBySalle(salleId: number): Observable<Siege[]> {
    return this.http.get<Siege[]>(`${this.apiUrl}?salleId=${salleId}`);
  }

  reserverSieges(sieges: { rang: string; numero: number; salle_id: number }[]): Observable<{ success: boolean }> {
    const url = 'http://ecf.local/backend/api/sieges.php';
    return this.http.post<{ success: boolean }>(url, { sieges });
  }


}
