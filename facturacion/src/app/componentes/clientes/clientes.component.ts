import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Componentes
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
//Interfaces
import { Cliente } from "../../interfaces/cliente";
//Servicio
import { ClientesService } from '../../servicios/clientes.service';

@Component({
  selector: 'app-clientes',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    NavbarComponent, 
    FooterComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  displayedColumns: string[] = ['id', 'ruc', 'nombre', 'email', 'direccion', 'telefono', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>([]);
  clienteForm!: FormGroup;
  editando: boolean = false;
  clienteEditandoId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientesService: ClientesService, private fb: FormBuilder) {}

  ngOnInit() {
    this.cargarClientes();
    this.clienteForm = this.fb.group({
      ruc:    ['', Validators.required],
      nombre: ['', Validators.required],
      email:  ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      telefono:  ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarClientes() {
    this.clientesService.getClientes().subscribe(clientes => {
      this.dataSource.data = clientes;
    });
  }

  openDialog() {
    // Abrir diálogo para crear cliente (puedes usar MatDialog con un componente formulario)
  }

  guardarCliente() {
    if (this.clienteForm.invalid) return;

    const clienteData = this.clienteForm.value;

    if (this.editando && this.clienteEditandoId !== null) {
      this.clientesService.actualizarCliente(this.clienteEditandoId, clienteData).subscribe(() => {
        this.cargarClientes();
        this.limpiarFormulario();
      });
    } else {
      this.clientesService.crearCliente(clienteData).subscribe(() => {
        this.cargarClientes();
        this.limpiarFormulario();
      });
    }
  }


  editarCliente(cliente: Cliente) {
    this.editando = true;
    this.clienteEditandoId = cliente.id || null;
    this.clienteForm.patchValue(cliente);
  }

  eliminarCliente(id: number | undefined) {
    if (!id) return;
    if (confirm('¿Seguro que deseas eliminar este cliente?')) {
      this.clientesService.eliminarCliente(id).subscribe(() => {
        this.cargarClientes();
      });
    }
  }

  limpiarFormulario() {
    this.editando = false;
    this.clienteEditandoId = null;
    this.clienteForm.reset();
  }

}
