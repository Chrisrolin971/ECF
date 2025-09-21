// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private utilisateurId: number | null = null;
  private pseudo: string | null = null;
  private role: string | null = null;

  setUtilisateur(id: number, pseudo: string, role: string): void {
    this.utilisateurId = id;
    this.pseudo = pseudo;
    this.role = role;
  }

  setUtilisateurFromToken(token: string): void {
    const payload = JSON.parse(atob(token.split('.')[1]));
    this.utilisateurId = payload.id;
    this.pseudo = payload.pseudo;
    this.role = payload.role;
  }

  getUtilisateurId(): number | null {
    return this.utilisateurId;
  }

  getPseudo(): string | null {
    return this.pseudo;
  }

  getRole(): string | null {
    return this.role;
  }

  estConnecte(): boolean {
    return this.utilisateurId !== null;
  }

  estAdmin(): boolean {
    return this.role === 'admin';
  }

  estEmploye(): boolean {
    return this.role === 'employe';
  }

  estClient(): boolean {
    return this.role === 'client';
  }

  deconnexion(): void {
    this.utilisateurId = null;
    this.pseudo = null;
    this.role = null;
    localStorage.removeItem('token');
  }



}
