﻿import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AvisPayload {
  seance_id: number;
  note: number;
  commentaire: string;
}

export interface AvisResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private readonly apiUrl = 'http://localhost/backend/api/ajouterAvis.php';

  private readonly http = inject(HttpClient);

  envoyerAvis(avis: AvisPayload): Observable<AvisResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<AvisResponse>(this.apiUrl, avis, { headers });
  }
}
