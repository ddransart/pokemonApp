import { Component } from '@angular/core'; // on importe l'annotation component depuis le coeur d'angular
import { Pokemon } from './pokemons/pokemon'; // On importe notre modèle créé dans le même dossier
import { POKEMONS } from './pokemons/mock-pokemons';
import { Title } from '@angular/platform-browser';


@Component({ 
  selector: 'pokemon-app', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.less'] 
})


export class AppComponent { 

  public constructor(private titleService: Title) {}

  public updateTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
