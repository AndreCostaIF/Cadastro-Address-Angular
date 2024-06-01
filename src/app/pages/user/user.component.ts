import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardEnderecoComponent } from '../../components/card-endereco/card-endereco.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';





@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardEnderecoComponent, MatGridListModule, MatIconModule],
  providers:[ 
    LoginService
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {



  user = {
    name: sessionStorage.getItem("nome"), // Substitua pelo nome do usuário autenticado
    addresses: [
      '123 Main St, Springfield',
      '456 Elm St, Shelbyville',
      '789 Oak St, Capital City'
    ]
  };

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {


    
    console.log(this.loginService.getEndereco());
  }

  logout(): void {
    // Adicione a lógica de logout aqui (por exemplo, limpar o token de autenticação)
    this.router.navigate(['/login']);
  }

  addEndereco(){
    this.router.navigate(['/cadastroEndereco']);
  }
}
