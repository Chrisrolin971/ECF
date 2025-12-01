import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

export interface ConnexionPayload {
  email: string;
  motDePasse: string;
}

export interface ConnexionResponse {
  success: boolean;
  message: string;
  pseudo?: string;
  id: number;
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})

export class ConnexionService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  connecterUtilisateur(payload: ConnexionPayload): Observable<ConnexionResponse> {
    return this.http.post<ConnexionResponse>(`${this.apiUrl}/connexion.php`, payload);
  }
}
