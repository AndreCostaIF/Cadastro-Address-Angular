import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
   
  apiUrl: string = "http://localhost:8080"
  
  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

   public  getEndereco(){

    const token = sessionStorage.getItem("auth-token");
    const id = sessionStorage.getItem("id");

    if (!token && id) {
      throw new Error("Token de autenticação não encontrado.");
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Adicionando o cabeçalho Content-Type
    });

    return this.httpClient.get(this.apiUrl + "/endereco/user/"+id, { headers }).pipe(
      tap((value) => {
        console.log(value);
      })
    );
   }
}
