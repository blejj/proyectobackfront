import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private router: Router) {}

  // logout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('id_Usuario');

  //   this.router.navigate(['/login']);
  // }
}
