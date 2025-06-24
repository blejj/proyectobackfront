import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    dni: ''
  }; //este también.

  constructor(private authService: AuthService) {}

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: res => console.log('Registro exitoso:', res),
      error: err => console.error('Error en registro:', err)
    });
  }
}
