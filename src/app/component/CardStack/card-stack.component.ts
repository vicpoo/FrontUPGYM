import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from '../news-card/news-card.component';

@Component({
  selector: 'app-card-stack',
  standalone: true,
  imports: [CommonModule, NewsCardComponent],
  templateUrl: './card-stack.component.html',
})
export class CardStackComponent {}
