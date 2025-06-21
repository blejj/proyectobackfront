import { Component } from '@angular/core';
import { BookCarouselComponent } from '../book-carousel/book-carousel.component';

@Component({
  selector: 'app-news',
  imports: [BookCarouselComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {

}
