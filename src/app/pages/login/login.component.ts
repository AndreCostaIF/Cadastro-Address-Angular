import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    
  ],
  providers:[ 
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup; 

  

  constructor(private router: Router, private loginService: LoginService, private toastr: ToastrService){
    //VALIDAÇÃO DO FORM
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }


  //FUNÇÃO PARA ENVIAR OS DADOS PARA O BACKEND
  submit(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.toastr.success("Login feito com sucesso");
        this.navigateHome(); // Chama a função navigateHome após o login bem-sucedido

      },
      error: () => this.toastr.error("Erro inesperado! Tente novamente mais tarde")
    })
    //console.log(this.loginForm.value)
  }

  navigate(){
    this.router.navigate(["/signup"])
  }

  navigateHome(){
    this.router.navigate(["/home"])
  }
}
