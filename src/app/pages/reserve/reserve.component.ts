import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss'
})
export class ReserveComponent {

}
