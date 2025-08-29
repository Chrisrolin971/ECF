import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ConnexionPayload {
  email: string;
  motDePasse: string;
}

export interface ConnexionResponse {
  success: boolean;
  message: string;
  pseudo?: string;
}

@Injectable({
  providedIn: 'root'
})

export class ConnexionService {
  private readonly apiUrl = 'http://ecf.local/backend/api/connexion.php';
  private readonly http = inject(HttpClient);

  connecterUtilisateur(payload: ConnexionPayload): Observable<ConnexionResponse> {
    return this.http.post<ConnexionResponse>(this.apiUrl, payload);
  }
}
