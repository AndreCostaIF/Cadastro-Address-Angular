import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EnderecoService } from '../../services/endereco.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-default-edit-layout',
  standalone: true,
  imports: [],
  providers:[ 
    LoginService
  ],
  templateUrl: './default-edit-layout.component.html',
  styleUrl: './default-edit-layout.component.scss'
})
export class DefaultEditLayoutComponent {

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
