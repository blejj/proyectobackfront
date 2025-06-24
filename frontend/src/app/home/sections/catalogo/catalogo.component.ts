import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { BookService } from '../../../services/book.service';

@Component({
  standalone: true,
  selector: 'app-catalogo',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  private bookService = inject(BookService);

  books: any[] = [];
  searchQuery: string = ''; // Búsqueda inicial por defecto

  filters = {
    minPrice: 0,
    maxPrice: 100000,
    author: ''
  };

  ngOnInit() {
    this.buscarLibros(); // Carga inicial
  }

  buscarLibros() {
    this.bookService.searchBooks(this.searchQuery).subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Error al buscar libros:', err);
      }
    });
  }

  get filteredBooks() {
    return this.books.filter(book =>
      book.price >= this.filters.minPrice &&
      book.price <= this.filters.maxPrice &&
      book.author.toLowerCase().includes(this.filters.author.toLowerCase())
    );
  }
}
