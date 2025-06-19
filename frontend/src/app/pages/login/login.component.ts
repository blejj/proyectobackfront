import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.user).subscribe({
      next: res => {
        console.log('Login exitoso:', res);
        // Guarda token e ID en localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('id_Usuario', res.id_Usuario);

        this.router.navigate(['/inicio']);
      },
      error: err => console.error('Error en login:', err)
    });
  }
}
