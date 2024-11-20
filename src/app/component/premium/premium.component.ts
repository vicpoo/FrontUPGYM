import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-premium',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './premium.component.html'
})
export class PremiumComponent {
  showAd = true; // Controla la visibilidad del anuncio

  closeAd(): void {
    this.showAd = false; // Oculta el anuncio
  }
}