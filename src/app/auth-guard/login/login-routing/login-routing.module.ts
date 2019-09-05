import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';
import { AuthGuardService } from '../../auth-guard.service';
import { AuthService } from '../../auth.service';
import { LoginComponent } from '../login.component';

@NgModule({
  declarations: [],
  imports: [
   // CommonModule,
    RouterModule.forChild([ // module utilisé pour enregistré la route /login et pour déclarer les fournisseurs de guard et du service d'authentification
      { path: 'login', component: LoginComponent } 
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService,
    AuthService
  ]

})
export class LoginRoutingModule { }
