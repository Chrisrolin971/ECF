import {Component, inject} from '@angular/core';
import { FilmService, Film } from '../../services/reservation.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  imports: [
    FormsModule,
    RouterLink,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  selectedCinema = '';
  films: Film[] = [];
  private readonly filmService = inject(FilmService);

  onCinemaChange(ville: string) {
    if (ville) {
      this.filmService.reservation(ville).subscribe(data => {
        this.films = data;
      });
    } else {
      this.films = [];
    }
  }

}
