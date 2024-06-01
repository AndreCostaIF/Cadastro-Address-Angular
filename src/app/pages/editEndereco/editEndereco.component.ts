import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { DefaultCadastroLayoutComponent } from '../../components/default-cadastro-layout/default-cadastro-layout.component';
import { DefaultEditLayoutComponent } from '../../components/default-edit-layout/default-edit-layout.component';
import { EnderecoService } from '../../services/endereco.service';
import { MatIconModule } from '@angular/material/icon';
interface EditForm{
  idEndereco: FormControl
  rua: FormControl,
  numero: FormControl,
  bairro: FormControl,
  complemento: FormControl,
  cidade: FormControl,
  cep: FormControl,
  uf: FormControl
}

@Component({
  selector: 'app-edit-endereco',
  standalone: true,
  imports: [
    DefaultEditLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    MatIconModule
    
  ],
  providers:[ 
    LoginService
  ],
  templateUrl: './editEndereco.component.html',
  styleUrl: './editEndereco.component.scss'
})
export class editEnderecoComponent {
  EditForm!: FormGroup<EditForm>; 

  enderecoId!: number;
  
  

  constructor(private router: Router, private loginService: LoginService,  private toastr: ToastrService, private route: ActivatedRoute, private enderecoService: EnderecoService){
   
    this.EditForm = new FormGroup({
      idEndereco: new  FormControl('', [Validators.required]),
      rua: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      bairro: new FormControl('', [Validators.required]),
      complemento: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
      
    })

    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.enderecoId = +params['id']; // Convertendo para número, se necessário

      console.log(this.enderecoId)

      // Chame o método do serviço através do objeto injetado
      this.enderecoService.getEnderecoByID(this.enderecoId).subscribe(
        (endereco) => {
          console.log(endereco);
          // Atualize os campos do formulário com os dados do endereço retornado
          this.EditForm.patchValue({
            idEndereco: this.enderecoId,
            rua: endereco.rua,
            numero: endereco.numero,
            bairro: endereco.bairro,
            complemento: endereco.complemento,
            cidade: endereco.cidade,
            cep: endereco.cep,
            uf: endereco.uf
          });
        },
        error => {
          console.error('Erro ao buscar o endereço:', error);
        }
      );
    });
}

  //FUNÇÃO PARA ENVIAR OS DADOS PARA O BACKEND
  submit(){
    const authToken = sessionStorage.getItem("id");
    //verifica se tem o token
    if (authToken){
     
      this.loginService.editEndereco(
        this.EditForm.value.idEndereco,
        authToken,
        this.EditForm.value.rua,
        this.EditForm.value.numero, 
        this.EditForm.value.bairro,
        this.EditForm.value.complemento,
        this.EditForm.value.cidade,
        this.EditForm.value.cep,
        this.EditForm.value.uf,
      ).subscribe({
        next: () => {
          this.toastr.success("Editado com sucesso!");
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
