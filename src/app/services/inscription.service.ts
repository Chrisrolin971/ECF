import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export interface Utilisateur {
  nom: string;
  prenom: string;
  pseudo: string;
  email: string;
  motDePasse: string;
  role: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class InscriptionService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  //Appel HTTP
  inscrireUtilisateur(utilisateur: Utilisateur): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/inscription.php`, utilisateur);
  }
}
