import { Component, HostListener } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./header.component.scss']
})

//Gestion d'ouverture du BurgerMenu
export class HeaderComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  //Referme le BurgerMenu si changement de taille de fenêtre
  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    const width = (event.target as Window).innerWidth;
    if (width >= 768 && this.menuOpen) {
      this.menuOpen = false;
    }
  }
}
