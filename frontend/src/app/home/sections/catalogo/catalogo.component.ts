// book-filter.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-catalogo',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent{
  books = [ // Simulado; podrías traer de un servicio
    { title: 'Amanecer en la cosecha', author: 'Suzanne Collins', price: 34999 },
    { title: 'El buen mal', author: 'Samanta Schweblin', price: 24999 },
    { title: 'La vegetariana', author: 'Han Kang', price: 23999 },
    // ...
  ];

  filters = {
    minPrice: 0,
    maxPrice: 100000,
    author: '',
  };

  get filteredBooks() {
    return this.books.filter(book =>
      book.price >= this.filters.minPrice &&
      book.price <= this.filters.maxPrice &&
      book.author.toLowerCase().includes(this.filters.author.toLowerCase())
    );
  }
}
