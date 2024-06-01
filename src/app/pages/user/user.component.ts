import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CardEnderecoComponent } from '../../components/card-endereco/card-endereco.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';

import { EnderecoService, EnderecoResponse } from '../../services/endereco.service';
import { Subscription, filter } from 'rxjs';
import { TabelaEnderecoComponent } from '../../components/tabela-endereco/tabela-endereco.component';
import { LocalStorageService } from '../../services/local-storage.service';




@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardEnderecoComponent, MatGridListModule, MatIconModule, TabelaEnderecoComponent],
  providers:[ 
    LoginService
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  endereco: EnderecoResponse | null = null;
  private subscription!: Subscription;

  user = {
    name: sessionStorage.getItem("nome"), // Substitua pelo nome do usuário autenticado
    addresses: [
      '123 Main St, Springfield',
      '456 Elm St, Shelbyville',
      '789 Oak St, Capital City'
    ]
  };

  constructor(private router: Router, private enderecoService: EnderecoService, private localStorageService: LocalStorageService) {}
  
  ngOnInit(): void {
    this.loadEndereco();
    
    // Escutando eventos de navegação
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadEndereco();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadEndereco(): void {
    let id = sessionStorage.getItem("id");

    if(id){

      this.enderecoService.getEndereco(id).subscribe(
        (data: EnderecoResponse) => {
          this.endereco = data;
         
        },
        error => {
          console.error('Erro ao buscar o endereço:', error);
        }
      );
    }
  }
  
  logout(): void {
    // Adicione a lógica de logout aqui (por exemplo, limpar o token de autenticação)

    this.localStorageService.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  addEndereco(){
    this.router.navigate(['/cadastroEndereco']);
  }
}
