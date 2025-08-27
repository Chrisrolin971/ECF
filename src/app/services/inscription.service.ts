import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private apiUrl = 'http://localhost:3000/inscription';

  constructor(private http: HttpClient) {}

  inscrireUtilisateur(utilisateur: any) {
    return this.http.post(this.apiUrl, utilisateur);
  }
}
