import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
  template: `
    <div [class.catalogo-body]="isCatalogoRoute()">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {

  constructor(private router: Router) {}

  isCatalogoRoute(): boolean {
    return this.router.url.includes('catalogo');
  }
}
