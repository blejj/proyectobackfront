import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service'; // Asegúrate de usar la ruta correcta

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showCart = false;

  constructor(
    private viewportScroller: ViewportScroller,
    public cartService: CartService
  ) {}

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  scrollTo(sectionId: string): void {
    this.viewportScroller.scrollToAnchor(sectionId);
  }
}