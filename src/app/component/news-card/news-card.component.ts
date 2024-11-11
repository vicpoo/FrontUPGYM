import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-card',
  standalone: true,
  templateUrl: './news-card.component.html',
})
export class NewsCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
}
