import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from "./componentes/navbar/navbar.component";
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  mostrarNavbar = true;
  title = 'facturacion';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
    // Si la URL empieza con '/login' (por ejemplo, '/login' o '/login?param=1')
    this.mostrarNavbar = !event.urlAfterRedirects.startsWith('/login');
    console.log('URL:', event.urlAfterRedirects, 'mostrarNavbar:', this.mostrarNavbar);
    });
  }
}
