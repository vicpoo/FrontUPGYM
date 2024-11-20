import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-premium',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './premium.component.html',
})
export class PremiumComponent {
  @Output() closed = new EventEmitter<void>(); // Evento para notificar al padre
  showAd = true; // Controla la visibilidad del anuncio

  closeAd(): void {
    this.showAd = false; // Oculta el anuncio
    this.closed.emit(); // Notifica al componente padre
  }
}
