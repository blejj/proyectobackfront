import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { FooterComponent } from './sections/footer/footer.component';
import { BankPromotionsComponent } from '../components/bank-promotions/bank-promotions.component';
import { BookCarouselComponent } from '../components/book-carousel/book-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent,BankPromotionsComponent,BookCarouselComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  newReleases = [
  {
    title: "Libro Nuevo 1",
    cover: "logo.png",
    description: "Descripción breve...",
    price: 19.99
  },
  {
    title: "Libro Nuevo 1",
    cover: "img1-carousel-hero.png",
    description: "Descripción breve...",
    price: 19.99
  },
  {
    title: "Libro Nuevo 1",
    cover: "logo.png",
    description: "Descripción breve...",
    price: 19.99
  },
  {
    title: "Libro Nuevo 1",
    cover: "img1-carousel-hero.png",
    description: "Descripción breve...",
    price: 19.99
  },
  {
    title: "Libro Nuevo 1",
    cover: "logo.png",
    description: "Descripción breve...",
    price: 19.99
  }
];

bestSellers = [
  {
    title: "Best Seller 1",
    cover: "img1-carousel-hero.png",
    description: "Descripción breve...",
    price: 24.99
  },
  {
    title: "Best Seller 1",
    cover: "logo.png",
    description: "Descripción breve...",
    price: 24.99
  },
  {
    title: "Best Seller 1",
    cover: "img1-carousel-hero.png",
    description: "Descripción breve...",
    price: 24.99
  },
  {
    title: "Best Seller 1",
    cover: "logo.png",
    description: "Descripción breve...",
    price: 24.99
  },
  {
    title: "Best Seller 1",
    cover: "img1-carousel-hero.png",
    description: "Descripción breve...",
    price: 24.99
  }
];

promotions = [
  {
    title: "Promoción 1",
    cover: "logo.png",
    description: "Descripción breve...",
    price: 24.99
  },
  {
    title: "Promoción 1",
    cover: "img1-carousel-hero.png",
    description: "Descripción breve...",
    price: 24.99
  },
  {
    title: "Promoción 1",
    cover: "logo.png",
    description: "Descripción breve...",
    price: 24.99
  },
  {
    title: "Promoción 1",
    cover: "img1-carousel-hero.png",
    description: "Descripción breve...",
    price: 24.99
  },
  {
    title: "Promoción 1",
    cover: "img1-carousel-hero.png",
    description: "Descripción breve...",
    price: 24.99
  }
];
}
