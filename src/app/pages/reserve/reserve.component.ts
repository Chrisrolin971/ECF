import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

interface Seance {
  nom: string;
  date: string;
  heure: string;
  qualite: string;
  langue: string;
}

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss'
})
export class ReserveComponent implements OnInit {

  filmTitre = '';
  seances: Seance[] = [];

  private readonly route = inject (ActivatedRoute);

  ngOnInit() {
    this.filmTitre = this.route.snapshot.paramMap.get('titre') || '';

    const seancesParFilm: Record<string, Seance[]> = {
      'Les 4 Fantastiques': [
        {
          nom: 'Séance 1',
          date: '30/08/2025',
          heure: '14h00',
          qualite: 'IMAX',
          langue: 'VF'
        },
        {
          nom: 'Séance 2',
          date: '30/08/2025',
          heure: '17h30',
          qualite: '3D',
          langue: 'VOSTFR'
        }
      ],
      'Flow': [
        {
          nom: 'Séance 1',
          date: '30/08/2025',
          heure: '15h00',
          qualite: '4D',
          langue: 'VF'
        },
        {
          nom: 'Séance 2',
          date: '30/08/2025',
          heure: '18h00',
          qualite: 'Standard',
          langue: 'VOSTFR'
        }
      ]
    };

    this.seances = seancesParFilm[this.filmTitre] || [];
  }

  selectedSeance: Seance | null = null;
  showPopup = false;

  selectSeance(seance: Seance) {
    this.selectedSeance = seance;
    this.showPopup = true;
  }

  rows: string[] = ['A', 'B', 'C', 'D', 'E'];
  columns: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  selectedSeats: string[] = [];
  toggleSeat(seat: string) {
    const index = this.selectedSeats.indexOf(seat);
    if (index > -1) {
      this.selectedSeats.splice(index, 1); // ❌ Désélection
    } else {
      this.selectedSeats.push(seat); // ✅ Sélection
    }
  }

  validateSelection() {
    // Tu peux ici enregistrer les sièges sélectionnés ou passer à l'étape suivante
    console.log('Sélection validée :', this.selectedSeats);
    this.showPopup = false;
    this.selectedSeats = [];
  }

  closePopup() {
    this.showPopup = false;
    this.selectedSeance = null;
  }


}


