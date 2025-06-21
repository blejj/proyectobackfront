import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-carousel.component.html',
  styleUrl: './book-carousel.component.css'
})
export class BookCarouselComponent {

  @Input() title: string = '';  // Título personalizable
  @Input() books: any[] = [];   // Datos de libros (desde el padre)

  currentIndex = 0;
  visibleItems = 4; // Cantidad de libros visibles a la vez

  prevSlide() {
    this.currentIndex = Math.max(0, this.currentIndex - 1);
  }

  nextSlide() {
    this.currentIndex = Math.min(
      this.books.length - this.visibleItems, 
      this.currentIndex + 1
    );
  }

  get visibleBooks() {
    return this.books.slice(this.currentIndex, this.currentIndex + this.visibleItems);
  }
}
