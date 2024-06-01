import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';


export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface EnderecoResponse {
  id: number;
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
  numero: string;
  rua: string;
  uf: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {}

  getEndereco(id: string): Observable<EnderecoResponse> {

    const token = sessionStorage.getItem("auth-token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Adicionando o cabeçalho Content-Type
    });

   

    return this.httpClient.get<EnderecoResponse>(`${this.apiUrl}/endereco/user/${id}`, { headers }).pipe(
      tap((value) => {
        

         // Salva o JSON no localStorage
         this.localStorageService.setItem('enderecos', value);
      }),
      catchError(error => {
        console.error('Erro ao buscar o endereço', error);
        return throwError(error);
      })
    );
  }


  getEnderecoByID(id: number): Observable<EnderecoResponse> {

    const token = sessionStorage.getItem("auth-token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Adicionando o cabeçalho Content-Type
    });

   

    return this.httpClient.get<EnderecoResponse>(`${this.apiUrl}/endereco/${id}`, { headers }).pipe(
      tap((value) => {
        

         // Salva o JSON no localStorage
         this.localStorageService.setItem('enderecos-editar', value);
      }),
      catchError(error => {
        console.error('Erro ao buscar o endereço', error);
        return throwError(error);
      })
    );
  }
}
