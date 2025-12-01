import {Component, HostListener, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    RouterLink,
    NgIf
  ],
  styleUrls: ['./header.component.scss']
})

//Gestion d'ouverture du BurgerMenu
export class HeaderComponent {
  public readonly authService = inject(AuthService);

  menuOpen = false;
  menuCompte = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleMenuCompte() {
    this.menuCompte = !this.menuCompte;
  }

  deconnexion(): void {
    this.authService.deconnexion();
  }

  //Referme le BurgerMenu si changement de taille de fenêtre
  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    const width = (event.target as Window).innerWidth;
    if (width >= 768 && this.menuOpen) {
      this.menuOpen = false;
      this.menuCompte = false;
    }
  }
}
