import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  // Método existente
  showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  // NUEVO: Método para mostrar errores
  showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  // NUEVO: Método para mostrar advertencias
  showWarning(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      panelClass: ['warning-snackbar'],
 horizontalPosition: 'right',
  verticalPosition: 'top'
 });
 }
  
  // NUEVO: Método para mostrar información
showInfo(message: string): void {
 this.snackBar.open(message, 'Cerrar', {
 duration: 3000,
 panelClass: ['info-snackbar'],
 horizontalPosition: 'right',
 verticalPosition: 'top'
 });
 }
}