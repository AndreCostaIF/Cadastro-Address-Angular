import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './services/auth-guard.service';
import { cadastroEnderecoComponent } from './pages/cadastrarEndereco/cadastroEndereco.component';
import { editEnderecoComponent } from './pages/editEndereco/editEndereco.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' }, // Redireciona para a rota 'login'
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "home",
        component: UserComponent,
        canActivate: [AuthGuard]
    },

    {
        path: "cadastroEndereco",
        component: cadastroEnderecoComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'editEndereco/:id', // Definindo o parâmetro ':id' na rota
        component: editEnderecoComponent,
        canActivate: [AuthGuard]
    }
];


