import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-popup-message',
  standalone: true,
  templateUrl: './popupMsg.component.html',
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./popupMsg.component.scss']
})
export class PopupMessageComponent {
  @Input() titre = 'INFORMATION';
  @Input() messages: string[] = [];
  @Input() reponse = false;

  @Output() fermer = new EventEmitter<void>();
  @Output() valider = new EventEmitter<void>();

  close() {
    this.fermer.emit();
  }

  confirm() {
    this.valider.emit();
  }
}
