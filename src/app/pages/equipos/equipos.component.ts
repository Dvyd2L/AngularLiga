import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IEquipo } from '@interfaces/equipo';
import { EquiposService } from '@services/equipos.service';
import { LoginService } from '@services/login.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css'],
  standalone: true,
  imports: [FormsModule,NgFor],
  providers: [EquiposService, LoginService, Router], // Agrega el servicio EquiposService y LoginService al componente como proveedor de servicios. Esto permite que el componente pueda utilizar los servicios en su código. Esto es útil]
})
export class EquiposComponent implements OnInit {
  equipo: IEquipo = {
    nombre: '',
    ciudad: ''
  };

  equipos: IEquipo[] = [];

  constructor(private equiposService: EquiposService, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.getEquipos();
  }

  getEquipos() {
    this.equiposService.getEquipos().subscribe({
      next: (data) => {
        this.equipos = data;
      },
      error: (err) => {
        alert('Error en el acceso a datos');
      }
    });
  }

  addEquipo() {
    this.equiposService.addEquipo(this.equipo).subscribe({
      next: (data) => {
        this.equipo.nombre = '';
        this.equipo.ciudad = '';
        alert('Alta realizada con éxito');
      },
      error: (err) => {
        alert('Error en el proceso de alta');
      },
      complete: () => {
        this.getEquipos();
      }
    });
  }

  updateEquipo(equipo: IEquipo) {
    this.equiposService.updateEquipo(equipo).subscribe({
      next: (data) => {
        alert('Actualización realizada con éxito');
      },
      error: (err) => {
        alert('Error en el proceso de actualización');
      }
    });
  }

  deleteEquipo(equipo: IEquipo) {
    if (confirm('¿Estás seguro?')) {
      this.equiposService.deleteEquipo(equipo.id!).subscribe({
        next: (data) => {
          alert('Eliminación realizada con éxito');
        },
        error: (err) => {
          alert('Error en el proceso de eliminación');
        },
        complete: () => {
          this.getEquipos();
        }
      });
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }
}
