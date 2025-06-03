import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Producto } from "../interfaces/productos";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:3000/productos';
  
    constructor(private http: HttpClient) { }
  
    getClientes(): Observable<Producto[]> {
      return this.http.get<Producto[]>(this.apiUrl);
    }
  
    getCliente(id: number): Observable<Producto> {
      return this.http.get<Producto>(`${this.apiUrl}/${id}`);
    }
  
    crearCliente(cliente: Producto): Observable<Producto> {
      return this.http.post<Producto>(this.apiUrl, cliente);
    }
  
    actualizarCliente(id: number, cliente: Producto): Observable<Producto> {
      return this.http.put<Producto>(`${this.apiUrl}/${id}`, cliente);
    }
  
    eliminarCliente(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
