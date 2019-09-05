import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from '../pokemon';
//import { POKEMONS } from '../mock-pokemons';

import { PokemonsService } from '../pokemons.service';

@Component({ // définit le composant. Au moins 3 éléments obligatoires 
  selector: 'list-pokemon', // donne un nom à notre composant afin de l'identifier par la suite
  templateUrl: './list-pokemon.component.html', // déf. le code html du composant
  styleUrls: ['./list-pokemon.component.less'], // COde css du composant
  //providers: [PokemonsService] // permet à Ng d'accéder à l'instance de pokemonsService qd il instancie un nouveau composant listPokemon
})

// code de la classe de notre composant; Classe contenant la logique de notre composant - "export" permet de rendre le composant accessible pour d'autres fichiers.
export class ListPokemonComponent {

  private pokemons: Pokemon[] = null; // on définit une propriété pokemons en la déclarant comme un tableau de pokemons

  // age = 12;
  //values = '';
  //private value: string = '';

  constructor(private router: Router, private pokemonsService: PokemonsService) { // on injecte une instance de notre service dans notre composant, sous forme de propriété privée

  }

  ngOnInit(): void {
    this.getPokemons();
  }


  getPokemons(): void {
    this.pokemonsService.getPokemons()
      .subscribe(pokemons => this.pokemons = pokemons); // on récupère la liste de pokemons renvoyés par l'observable et on stocke le résultat dans la propriété pokemons de notre composant
  }
  selectPokemon(pokemon: Pokemon) {
    console.log(' Vous avez sélectionné ' + pokemon.name);
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link); // on utilise la méthode navigate de l'user pour rediriger le routeur
  }



  //onClick() {
  //  console.log("Clic !");
  //}

  // CODE COMPLEXE
  //onKey(event: KeyboardEvent) {
  //  this.value = 'Bonjour' + (<HTMLInputElement>event.target).value; // event.target est du type HtmlInputElement
  // }

  //onKey(value: string) {
  //this.value = 'Bonjour' + value; 
  //}

}
