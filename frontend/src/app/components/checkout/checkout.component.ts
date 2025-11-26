import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

// 🔹 Importá acá tus servicios reales
import { CartService } from '../../services/cart.service';        // o CartService
import { CheckoutService } from '../../services/checkout.service';
import { NotificationService } from '../../services/notification.service';
import { UsuarioService } from '../../services/usuario.service';

interface Payment {
  nroTarjeta: string;
  fechaVencimiento: string;
  clave: string;
  idUsuario: number;
  importe: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {
  // inyección
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);      
  private checkoutService = inject(CheckoutService);
  private usuarioService = inject(UsuarioService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  // datos del carrito
  cartItems$: Observable<any[]> = this.cartService.getCart();
  totalPrice$: Observable<number> =
    this.cartService.getTotal() as Observable<number>;

  // señal para total
  totalPriceSignal = signal(0);

  // formulario dirección
  addressForm = this.fb.group({
    calle: ['', Validators.required],
    numero: ['', Validators.required],
    localidad: ['', Validators.required],
    provincia: ['', Validators.required],
    codigoPostal: ['', Validators.required]
  });

  // datos de pago legacy
  paymentData: Payment = {
    nroTarjeta: '',
    fechaVencimiento: '',
    clave: '',
    idUsuario: 0,
    importe: 0
  };

  constructor() {
    console.log('Componente de Checkout inicializado');
  }

  ngOnInit(): void {
    this.totalPrice$.subscribe((total) => {
      this.totalPriceSignal.set(total);
      this.paymentData.importe = total;
    });
  }

  // --- Mercado Pago ---

  processMercadoPagoPayment() {
    this.cartItems$
      .pipe(
        take(1),
        map((cartItems) =>
          cartItems.map((item) => ({
            title: item.title,
            price: item.price,
            quantity: item.quantity
          }))
        )
      )
      .subscribe((itemsInCart) => {
        const userIdStr = '1'; // reemplazá por el id real
        const idUsuario = Number(userIdStr) || 1;

        if (itemsInCart.length === 0) {
          this.notificationService.showError('El carrito está vacío.');
          return;
        }

        this.notificationService.showInfo(
          'Iniciando pago con Mercado Pago...'
        );

        const paymentData = {
          items: itemsInCart,
          idUsuario
        };

        this.checkoutService.createPaymentPreference(paymentData).subscribe({
          next: (response) => {
            if (response.init_point) {
              this.notificationService.showSuccess(
                'Redirigiendo a Mercado Pago...'
              );
              window.location.href = response.init_point;
            } else {
              this.notificationService.showError(
                'Error al obtener el enlace de pago.'
              );
            }
          },
          error: (err) => {
            console.error('Error en el pago con Mercado Pago:', err);
            this.notificationService.showError(
              'No se pudo iniciar el proceso de pago.'
            );
          }
        });
      });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      this.processMercadoPagoPayment();
    } else {
      this.notificationService.showError(
        'Por favor, complete la dirección antes de continuar.'
      );
      this.addressForm.markAllAsTouched();
    }
  }

  // --- Legacy tarjeta ---

  submitPayment(paymentData: Payment = this.paymentData): void {
    if (
      !paymentData.nroTarjeta ||
      !paymentData.fechaVencimiento ||
      !paymentData.clave
    ) {
      this.notificationService.showWarning(
        'Por favor complete todos los campos de la tarjeta.'
      );
      return;
    }

    const userIdStr = '1'; // simulación
    const userId = Number(userIdStr);
    paymentData.idUsuario = userId;

    this.checkoutService.processPayment(paymentData).subscribe({
      next: () => {
        this.notificationService.showSuccess('Tarjeta procesada exitosamente.');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al procesar pago', error);
        this.notificationService.showError(
          'Error al procesar pago: ' +
            (error.error?.message || 'Intente nuevamente')
        );
      }
    });
  }

  deleteCard(): void {
    const userId = 1; // simulación

    this.checkoutService.getCardByUserId(userId).subscribe({
      next: (card: any) => {
        if (!card || !card.idTarjeta) {
          this.notificationService.showWarning(
            'No se encontró tarjeta para eliminar.'
          );
          return;
        }
        this.checkoutService.deleteCard(card.idTarjeta, userId).subscribe({
          next: () => {
            this.notificationService.showSuccess(
              'Tarjeta eliminada correctamente'
            );
            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.notificationService.showError(
              'Error al eliminar la tarjeta'
            );
            console.error(err);
          }
        });
      },
      error: (err) => {
        this.notificationService.showError('Error al obtener tarjeta');
        console.error(err);
      }
    });
  }
}
