import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'card-endereco',
  templateUrl: './card-endereco.component.html',
  styleUrls: ['./card-endereco.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
})
export class CardEnderecoComponent implements OnInit {
  enderecos: any[] = [];

  constructor(private localStorageService: LocalStorageService, private loginService: LoginService) {}

  ngOnInit(): void {

    
    console.log(this.loginService.getEndereco());

    this.enderecos = this.localStorageService.getItem('enderecos') || [];
    console.log('Endereços:', this.enderecos);
  }

  
}
