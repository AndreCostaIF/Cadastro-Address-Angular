import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { DefaultCadastroLayoutComponent } from '../../components/default-cadastro-layout/default-cadastro-layout.component';

interface CadastroForm{
  rua: FormControl,
  numero: FormControl,
  bairro: FormControl,
  complemento: FormControl,
  cidade: FormControl,
  cep: FormControl,
  uf: FormControl
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    DefaultCadastroLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    
  ],
  providers:[ 
    LoginService
  ],
  templateUrl: './cadastroEndereco.component.html',
  styleUrl: './cadastroEndereco.component.scss'
})
export class cadastroEnderecoComponent {
  CadastroForm!: FormGroup<CadastroForm>; 


  

  constructor(private router: Router, private loginService: LoginService, private toastr: ToastrService){
   
    this.CadastroForm = new FormGroup({
      rua: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      bairro: new FormControl('', [Validators.required]),
      complemento: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
      
    })
  }


  //FUNÇÃO PARA ENVIAR OS DADOS PARA O BACKEND
  submit(){
    const authToken = sessionStorage.getItem("id");
    //verifica se tem o token
    if (authToken){
     
      this.loginService.cadastroEndereco(
        authToken,
        this.CadastroForm.value.rua,
        this.CadastroForm.value.numero, 
        this.CadastroForm.value.bairro,
        this.CadastroForm.value.complemento,
        this.CadastroForm.value.cidade,
        this.CadastroForm.value.cep,
        this.CadastroForm.value.uf,
      ).subscribe({
        next: () => {
          this.toastr.success("Cadastro feito com sucesso!");
          this.navigate()
        },
        error: () => this.toastr.error("Erro inesperado! Tente novamente mais tarde2")
      })
    }else{
      this.toastr.error("Erro inesperado! Tente novamente mais tarde")
    }
      //console.log(this.signupForm.value)
  }

  navigate(){
    this.router.navigate(["home"])
  }
}
