import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EnderecoService } from '../../services/endereco.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-default-cadastro-layout',
  standalone: true,
  imports: [],
  providers:[ 
    LoginService
  ],
  templateUrl: './default-cadastro-layout.component.html',
  styleUrl: './default-cadastro-layout.component.scss'
})
export class DefaultCadastroLayoutComponent {

  constructor (private loginService: LoginService){}

  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;

  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  submit(){
    this.onSubmit.emit();
  }

  navigate(){
    //console.log(this.loginService.getEndereco());
    this.onNavigate.emit();
  }
}
