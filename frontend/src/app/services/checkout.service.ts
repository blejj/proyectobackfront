import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiUrl = 'http://98.84.18.35:3000/api/checkout';
  private paymentUrl = 'http://98.84.18.35:3000/api/payment';

  constructor(private http: HttpClient) { }

  /**
   * Llama al backend (Express) para crear la Preferencia de Pago de Mercado Pago.
   * @param cartData Contiene los ítems del carrito y el ID del usuario.
   */
  createPaymentPreference(cartData: { items: any[], idUsuario: number }): Observable<any> {
    return this.http.post(`${this.paymentUrl}/create-payment-preference`, cartData);
  }

  // Métodos de gestión de tarjetas (existentes)
  processPayment(paymentData: Payment): Observable<any> {
    return this.http.post(`${this.apiUrl}`, paymentData);
  }

  deleteCard(cardId: number, userId: number) {
    return this.http.delete(`${this.apiUrl}/${cardId}?idUsuario=${userId}`);
  }

  getCardByUserId(userId: number) {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
