// Imports
import { BrowserModule, Title } from '@angular/platform-browser'; // ce module fournit les élts essentiels pour le fonctionnement de l'appli (ex : les directives ngIf, ngFor du template).
import { NgModule } from '@angular/core'; // permet de déclarer un module. c'est l'annotation la plus importante
import { HttpClientModule } from '@angular/common/http'; // pour communiquer avec un serveur distant via le protocole http
import { FormsModule } from '@angular/forms';


// permet de simuler une API, intercepte les requetes HTTP et retourne les réponses simulées du serveur. ainsi, le comportemt sera comme un vrai service distant
// qd on utilisera un vrai serveur, il suffira de retirer cette import de l'API simulé.

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';  
import { InMemoryDataService } from './in-memory-data.service'; // le fichier qui contient l'API qu'on a déclaré dans le fichier in-memory-data.service.ts

import { AppRoutingModule } from './app-routing.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { LoginRoutingModule } from './auth-guard/login/login-routing/login-routing.module';

import { AppComponent } from './app.component'; // on nimporte notre composant que nous venons de développer et qu'on va rattacher à ce module
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth-guard/login/login.component';


@NgModule({
  declarations: [ // liste de tous les composants et directives appartenant au module
    AppComponent, 
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [ // permet de déclarer tous les élts qu'on doit importer dans notre module. - attention à l'ordre de déclarations
    BrowserModule, // le module racine a besoin de le déclarer, contrairement aux autres modules.
    HttpClientModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false}), // dataEncapsulation permet de préciser le format de données envoyées par l'API
    PokemonsModule,
    LoginRoutingModule,
    AppRoutingModule // A déclarer toujours en dernier car l'ordre de déclaration est très important
  ],
  providers: [
    Title // On fournit le service Title à l'ensemble de l'appli.
  ],
  bootstrap: [AppComponent] // permet d'identifier le composant racine que ng appelle au démarrage de l'appli.
})
export class AppModule { }
