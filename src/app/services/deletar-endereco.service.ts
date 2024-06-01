import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeletarEnderecoService {
  private apiUrl = 'http://localhost:8080';
  
  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {}



  confirm(message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const confirmation = window.confirm(message);
      resolve(confirmation);
    });
  }



  deletarEndereco(id: number){
    const token = sessionStorage.getItem("auth-token");
    
    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }
    console.log("id: "+ token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Adicionando o cabeçalho Content-Type
    });

    
    //URL DO BACK VAI AQUI
    return this.httpClient.delete(this.apiUrl + "/endereco/" + id, {headers})
  }
}
