import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-hero',
  imports: [NavbarComponent, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  scrollTo(id: string) {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
}
