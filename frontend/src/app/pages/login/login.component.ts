import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <h2>Redirigiendo al portal de inicio de sesión...</h2>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    const clientId = '1951tqfvb7fakucpruls1e1875';
    const responseType = 'code';
    const scope = 'openid profile email';
    const cognitoDomain = 'https://us-east-1dvurikhle.auth.us-east-1.amazoncognito.com';

    // Detecta si estás en localhost o en producción
    const isLocal = window.location.hostname === 'localhost';

    const redirectUri = isLocal
      ? 'http://localhost:4200/home' // para pruebas locales
      : 'https://main.d17jgtfjujlttk.amplifyapp.com/home'; // deploy Amplify

    const url = `${cognitoDomain}/login?client_id=${clientId}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = url;
  }
}
