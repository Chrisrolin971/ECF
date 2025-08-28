import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface Utilisateur {
  nom: string;
  prenom: string;
  pseudo: string;
  email: string;
  motDePasse: string;
}

export interface ApiResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class InscriptionService {
  private apiUrl = 'http://ecf.local/backend/api/inscription.php'; // Chemin vers le script PHP

  //Appel HTTP
  inscrireUtilisateur(utilisateur: Utilisateur): Observable<ApiResponse> {
    const http = inject(HttpClient);
    return http.post<ApiResponse>(this.apiUrl, utilisateur);
  }
}
