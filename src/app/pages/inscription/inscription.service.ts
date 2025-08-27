import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private apiUrl = 'http://ecf.local/backend/api/inscription.php'; // ✅ Chemin vers ton script PHP

  constructor(private http: HttpClient) {}

  inscrireUtilisateur(utilisateur: any) {
    return this.http.post(this.apiUrl, utilisateur);
  }
}
