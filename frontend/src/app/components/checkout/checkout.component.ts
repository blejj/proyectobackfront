import { Component } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { CheckoutService } from '../../services/checkout.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  paymentData: Payment = {
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    amount: 0,
  };
  
  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private router: Router
  ) {
    this.paymentData.amount = this.cartService.getTotalPrice();
  }

  submitPayment(): void {
    if (!this.paymentData.cardNumber || !this.paymentData.expirationDate || !this.paymentData.cvv) {
      alert('Por favor complete todos los campos');
      return;
    }

    this.checkoutService.processPayment(this.paymentData).subscribe({
      next: (response) => {
        console.log('Pago exitoso', response);
        this.cartService.clearCart();
        this.router.navigate(['/home']);
        alert('¡Pago exitoso!');
      },
      error: (error) => {
        console.error('Error en el pago', error);
        alert('Error en el pago: ' + (error.error?.message || 'Intente nuevamente'));
      }
    });
  }
}