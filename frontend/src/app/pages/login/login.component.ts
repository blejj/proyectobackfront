import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = { email: '', password: '' };

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.user).subscribe({
      next: res => {
        console.log('Login exitoso:', res);
      },
      error: err => console.error('Error en login:', err)
    });
  }
}
