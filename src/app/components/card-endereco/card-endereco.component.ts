import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { EnderecoService, EnderecoResponse } from '../../services/endereco.service';
import { DeletarEnderecoService } from '../../services/deletar-endereco.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'card-endereco',
  templateUrl: './card-endereco.component.html',
  styleUrls: ['./card-endereco.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],

})
export class CardEnderecoComponent implements OnInit {
  enderecos: EnderecoResponse[] = [];
  endereco: EnderecoResponse | null = null;
  private subscription!: Subscription;

  constructor( private toastr: ToastrService, private localStorageService: LocalStorageService, private loginService: LoginService,  private enderecoService: EnderecoService, private router: Router, private deletarEnderecoService: DeletarEnderecoService) {}

 


  ngOnInit(): void {
    //this.enderecos = this.localStorageService.getItem('enderecos') || [];
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
          this.enderecos = this.localStorageService.getItem('enderecos') || [];
         
        },
        error => {
          console.error('Erro ao buscar o endereço:', error);
        }
      );
    }
  }

  

  async deletar(id: number){
    
    const confirmed = await this.deletarEnderecoService.confirm('Deseja realmente executar esta ação?');
    if (confirmed) {
      // Executar ação se confirmado
      this.deletarEnderecoService.deletarEndereco(id).subscribe(
        () =>  this.toastr.success("deletado com sucesso"))
      
        this.navigateHome()
      console.log('Ação confirmada');
    } else {
      // Não fazer nada se cancelado
      console.log('Ação cancelada');
    }
  }


  navigateHome() {
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }


  editEndereco(id: number){
    this.router.navigate(["editEndereco", id]);
  }
}
