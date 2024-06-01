import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { EnderecoResponse } from '../types/endereco-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080"

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  login(email: string, password: string){
    
    //URL DO BACK VAI AQUI
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/auth/login", {email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("id", value.id)
        sessionStorage.setItem("nome", value.name)


        // Salva o JSON no localStorage
         this.localStorageService.setItem('enderecos', value.enderecos);

       
         console.log('local:', localStorage.getItem("enderecos"));
        
        //sessionStorage.setItem("enderecos", value.name)
    }))
  }

  signup(name: String, email: string, password: string){
    
    //URL DO BACK VAI AQUI
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/auth/register", {name, email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("nome", value.name)
    }))
  }

  cadastroEndereco(
   
    idUser: string,
    rua: string,
    numero: string,
    bairro: string,
    complemento: string,
    cidade: string,
    cep: string,
    uf: string
  ){
    const token = sessionStorage.getItem("auth-token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Adicionando o cabeçalho Content-Type
    });

    // let headers = new HttpHeaders();
    // headers = headers.set('Auth', 'Bearer ' + token )
  

    const body = {
      user: {
        id: idUser
      },
      rua: rua,
      numero: numero,
      bairro: bairro,
      complemento: complemento,
      cidade: cidade,
      cep: cep,
      uf: uf
    };

    return this.httpClient.post(`${this.apiUrl}/endereco/save`, body, { headers }).pipe(
      tap((value) => {
        console.log(value);
      })
    );
  }


  editEndereco(
    id: number,
    idUser: string,
    rua: string,
    numero: string,
    bairro: string,
    complemento: string,
    cidade: string,
    cep: string,
    uf: string
  ){
    const token = sessionStorage.getItem("auth-token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Adicionando o cabeçalho Content-Type
    });

    // let headers = new HttpHeaders();
    // headers = headers.set('Auth', 'Bearer ' + token )
  

    const body = {
      id,
      user: {
        id: idUser
      },
      rua: rua,
      numero: numero,
      bairro: bairro,
      complemento: complemento,
      cidade: cidade,
      cep: cep,
      uf: uf
    };

    return this.httpClient.post(`${this.apiUrl}/endereco/save`, body, { headers }).pipe(
      tap((value) => {
        console.log(value);
      })
    );
  }



  getEndereco(id: string): Observable<EnderecoResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer SEU_TOKEN`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.get<EnderecoResponse>(`${this.apiUrl}/endereco/user/${id}`, { headers }).pipe(
      tap((value) => {
   

        // Salva o JSON no localStorage
        //this.localStorageService.setItem('enderecos', JSON.stringify(value));
      }),
      catchError(error => {
        console.error('Erro ao buscar o endereço', error);
        return throwError(error);
      })
    );
  }
}
