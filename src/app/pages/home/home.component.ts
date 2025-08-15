import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  nouveautes = [
    { titre: 'Les 4 Fantastiques', image: 'assets/films/4fantastiques.jpg' },
    { titre: 'Cannes', image: 'assets/films/cannes.jpg' },
    { titre: 'Dragon', image: 'assets/films/dragons.jpg' },
    { titre: 'Flow', image: 'assets/films/flow.jpg' },
  ];

  affiches = [
    { titre: 'Les 4 Fantastiques', image: 'assets/films/4fantastiques.jpg' },
    { titre: 'Back in Action', image: 'assets/films/BackInAction.jpg' },
    { titre: 'Cannes', image: 'assets/films/cannes.jpg' },
    { titre: 'Dora', image: 'assets/films/dora.jpg' },
    { titre: 'Dragon', image: 'assets/films/dragons.jpg' },
    { titre: 'Elio', image: 'assets/films/elio.jpg' },
    { titre: 'Empereur de Paris', image: 'assets/films/EmpereurDeParis.jpg' },
    { titre: 'Evanouis', image: 'assets/films/evanouis.jpg' },
    { titre: 'Falcon Express', image: 'assets/films/falconExpress.jpg' },
    { titre: 'Flow', image: 'assets/films/flow.jpg' },
    { titre: 'Grand Déplacement', image: 'assets/films/GrandDeplacement.jpg' },
    { titre: 'Lilo & Stitch', image: 'assets/films/LiloStitch.jpg' },
    { titre: 'Monde Jurassic', image: 'assets/films/mondeJurassic.jpg' },
    { titre: 'Superman', image: 'assets/films/superman.jpg' },
    { titre: 'Together', image: 'assets/films/together.png' },
    { titre: 'Les Tuches', image: 'assets/films/tuche.jpg' },
  ];
}
