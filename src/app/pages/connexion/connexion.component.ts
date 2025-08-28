import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {ConnexionPayload, ConnexionService} from './connexion.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  email = '';
  motDePasse = '';
  messageErreur = '';

  private readonly connexionService = inject(ConnexionService);
  private readonly router = inject(Router);

  onSubmit(): void {
    if (!this.email || !this.motDePasse) {
      this.messageErreur = 'Tous les champs sont obligatoires.';
      return;
    }

    const payload: ConnexionPayload = {
      email: this.email,
      motDePasse: this.motDePasse
    };

    this.connexionService.connecterUtilisateur(payload).subscribe({
      next: (res) => {
        if (res.message === 'Connexion réussie') {
          this.router.navigate(['/home']);
        } else {
          this.messageErreur = res.message;
        }
        alert(res.message);
      },
      error: (err) => {
        this.messageErreur = 'Erreur de connexion. Vérifiez vos identifiants.';
        console.error('Erreur complète:', err);
      }
    });
  }
}
