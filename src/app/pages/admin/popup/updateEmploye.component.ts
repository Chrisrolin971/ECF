import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-update-mdp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updateEmploye.component.html',
  styleUrls: ['./updateEmploye.component.scss']
})
export class UpdateMdpComponent {
  @Input() email = '';
  @Output() fermer = new EventEmitter<void>();
  @Output() modifierMdp = new EventEmitter<{ email: string; motDePasse: string }>();

  nouveauMotDePasse = '';
  confirmationMotDePasse = '';
  messageErreur = '';

  private readonly adminService = inject(AdminService);

  valider() {
    if (!this.nouveauMotDePasse || !this.confirmationMotDePasse) {
      this.messageErreur = 'Tous les champs sont obligatoires.';
      return;
    }

    if (this.nouveauMotDePasse !== this.confirmationMotDePasse) {
      this.messageErreur = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(this.nouveauMotDePasse)) {
      this.messageErreur = 'Le mot de passe doit contenir :<br>' +
        'Au moins 8 caractères, une majuscule et une minuscule,<br>' +
        'un chiffre et un caractère spécial';
      return;
    }

    this.adminService.updateMotDePasseEmploye(this.email, this.nouveauMotDePasse).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageErreur = '';
          this.modifierMdp.emit({ email: this.email, motDePasse: this.nouveauMotDePasse });
          this.fermer.emit();
        } else {
          this.messageErreur = res.message;
        }
      },
      error: () => {
        this.messageErreur = 'Erreur serveur';
      }
    });
  }

  annuler() {
    this.fermer.emit();
  }
}
