import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConexionService } from './servicios/conexion.service'; // o el servicio que uses para autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: ConexionService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.estaAutenticado()) {
      return true; // usuario autenticado, permite acceso
    } else {
      this.router.navigate(['/login']); // no autenticado, redirige a login
      return false;
    }
  }
}