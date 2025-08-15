import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  isEmailValid = true;

  validateEmail(value: string): void {
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // this.isEmailValid = regex.test(value);
    this.isEmailValid = value == null ;
  }

  isPasswordValid = true;

  validatePassword(value: string): void {
    this.isPasswordValid = value == null;
  }

  isValid() {
    this.isEmailValid == true && this.isPasswordValid == true
  }

}
