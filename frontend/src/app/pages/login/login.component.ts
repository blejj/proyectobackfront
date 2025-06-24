import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = { email: '', password: '', id: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.user).subscribe({
      next: res => {
        localStorage.setItem('email', this.user.email);
        localStorage.setItem('userId', res.idUsuario.toString());
        this.router.navigate(['/home']);
        console.log('Login exitoso:', res);
      },
      error: err => alert('Error al iniciar sesión: ' + err)
    });
  }
}
