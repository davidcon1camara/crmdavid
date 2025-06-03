import { Routes } from '@angular/router';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { PresupuestosComponent } from './componentes/presupuestos/presupuestos.component';
import { FacturacionComponent } from './componentes/facturacion/facturacion.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', data: { mostrarNavbar: false } },
  { path: 'login', component: LoginComponent, data: { mostrarNavbar: false } },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] ,data: { mostrarNavbar: true } },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] ,data: { mostrarNavbar: true }},
  { path: 'servicios', component: ServiciosComponent, canActivate: [AuthGuard] ,data: { mostrarNavbar: true } },
  { path: 'presupuestos', component: PresupuestosComponent, canActivate: [AuthGuard] ,data: { mostrarNavbar: true } },
  { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard] ,data: { mostrarNavbar: true } },
  { path: 'facturacion', component: FacturacionComponent, canActivate: [AuthGuard],data: { mostrarNavbar: true } },
];
