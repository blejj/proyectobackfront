import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    // Redirige directamente al login de Cognito
    window.location.href = 'https://us-east-1dvurikhle.auth.us-east-1.amazoncognito.com/login?client_id=1951tqfvb7fakucpruls1e1875&response_type=code&scope=openid+profile+email&redirect_uri=https://main.d17jgtfjujlttk.amplifyapp.com/home';
  }
}
