import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionService } from '../../servicios/conexion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private _formBuilder = inject(FormBuilder);
  private authService = inject(ConexionService);
  private router = inject(Router);

  loginFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor() {
    if (this.authService.estaAutenticado()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    const email = this.loginFormGroup.value.email!;
    const password = this.loginFormGroup.value.password!;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        const token = response.token;  // capturas el token del JSON recibido
        if (token) {
          localStorage.setItem('token', token);  // guardas el token para usar después
          this.router.navigate(['/home']);
        } else {
          alert('No se recibió token de autenticación');
        }
      },
      error: err => alert('Error en login: ' + (err.error?.mensaje || 'Revisa tus credenciales'))
    });
  }
}
