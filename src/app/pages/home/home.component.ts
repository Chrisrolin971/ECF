import {Component, inject, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeService, FilmCard } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  nouveautes: FilmCard[] = [];
  affiches: FilmCard[] = [];
  private readonly homeService = inject(HomeService);

  ngOnInit(): void {
    this.homeService.getFilms().subscribe(data => {
      this.nouveautes = data.nouveautes;
      this.affiches = data.affiches;
    });
  }
}
