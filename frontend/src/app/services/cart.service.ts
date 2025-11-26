// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  cover?: string; // necesario para navbar y catálogo
}

@Injectable({ providedIn: 'root' })
export class CartService {

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  // Observable público para los templates
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  // ==== GETTERS ====

  getCart(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  getTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map(items =>
        items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      )
    );
  }

  getTotalItems(): number {
    return this.cartItemsSubject.value
      .reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.value
      .reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  // ==== OPERACIONES ====

  addToCart(item: CartItem): void {
    const current = this.cartItemsSubject.value;

    // si el item ya existe, aumentar cantidad
    const existing = current.find(i => i.id === item.id);
    if (existing) {
      const updated = current.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
      this.cartItemsSubject.next(updated);
      return;
    }

    // si es nuevo, agregarlo
    this.cartItemsSubject.next([...current, item]);
  }

  updateQuantity(id: number, quantity: number): void {
    const updated = this.cartItemsSubject.value.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    this.cartItemsSubject.next(updated);
  }

  removeFromCart(id: number): void {
    const filtered = this.cartItemsSubject.value.filter(item => item.id !== id);
    this.cartItemsSubject.next(filtered);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}
