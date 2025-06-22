import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

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

  checkout(): void {
    // TODO lógica para finalizar la compra
    console.log('Compra finalizada', this.cartService.getTotalPrice());
    //TODO
    // Ejemplo: redirigir a página de checkout o limpiar carrito
    // this.cartService.clearCart();
  }
}