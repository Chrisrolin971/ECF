import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

export interface Siege {
  id: number;
  rang: string;
  numero: number;
  estPMR: boolean;
  dispo: boolean;
}

@Injectable({ providedIn: 'root' })
export class SiegesService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getSiegesBySalle(salleId: number): Observable<Siege[]> {
    return this.http.get<Siege[]>(`${this.apiUrl}/getSieges.php?salleId=${salleId}`);
  }

  reserverSieges(sieges: { rang: string; numero: number; salle_id: number }[]): Observable<{ success: boolean }> {
    const url = `${this.apiUrl}/sieges.php`;
    return this.http.post<{ success: boolean }>(url, { sieges });
  }


}
