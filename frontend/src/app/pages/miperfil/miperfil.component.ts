import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../home/sections/navbar/navbar.component';


@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  usuario: any = {};
  isLoading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.loadUserData(email);
    } else {
      this.error = 'No se encontró el email';
    }
  }

  loadUserData(email: string): void {
    this.isLoading = true;
    this.error = null;

    this.usuarioService.getUserByEmail(email).subscribe({
      next: (user) => {
        this.usuario = user;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos del usuario';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

 guardarCambios(): void {
  const email = encodeURIComponent(this.usuario.email);

  this.usuarioService.updateUserByEmail(email, this.usuario).subscribe({
    next: (res) => {
      this.success = 'Datos actualizados con éxito';
      this.error = null;
    },
    error: (err) => {
      this.error = 'Error al actualizar los datos';
      this.success = null;
      console.error(err);
    }
  });
}


  editandoCampo: string | null = null;

activarEdicion(campo: string): void {
  this.editandoCampo = campo;
}

guardarCampo(campo: string): void {
  this.editandoCampo = null;
  this.guardarCambios(); 
}

}
