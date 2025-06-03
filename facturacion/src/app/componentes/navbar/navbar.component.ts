import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

import { Router } from '@angular/router';
import { ConexionService } from '../../servicios/conexion.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private ConexionService: ConexionService, private router: Router) {}

  logout(){
    this.ConexionService.logout();
    this.router.navigate(['login']);
  }
}
