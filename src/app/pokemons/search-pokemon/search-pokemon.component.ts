import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';

import { PokemonsService } from '../pokemons.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.less']
})
export class SearchPokemonComponent implements OnInit {

  // la classe Subject appartient à rxjs. elle permet de stocker les requetes successiv de l'user dans un tab de cc sous la frme d'un observable (cad avec cette notion de décalage dans le temps)
  // SUbject hérite donc de la classe Observable et donc searchTerms est un Observable
  private searchTerms = new Subject<string>(); 
	pokemons$: Observable<Pokemon[]>;
 
	constructor(
		private pokemonsService: PokemonsService,
		private router: Router) { }
 
	// Ajoute un terme de recherche dans le flux de l'Observable 'searchTerms'
	search(term: string): void {

    // la propriété searchTerms permet donc de stocker les requetes successives de l'user 
    // chaqu appel à search ajoute une nouvelle chaine de caract à searchTerms.
    // on utilise next() car ce n'est pas un tab; SInon on aurait utilisé push()
		this.searchTerms.next(term); 
	}
 
  // on initialise un observable
  // comme un subject est un observable, cela nous permettra de transformer le flux de terme de recherche de l'user en 1 flux de tab de pokemons de resultat
  // et d'affecter ce resultat (le tab de pokemons) à la propriété pokemons. et ngOnInit() s'en occupe.
	ngOnInit(): void {
		this.pokemons$ = this.searchTerms.pipe(

      // cette méthode met en pause l'execution de nouvelles requetes tant qu'1 nouvelle recherche a déjà été lancée il y a moins de 300ms
      // AInsi, il n'ya jamais de requete lancée plus frequemment que toutes les 300ms
			// attendre 300ms de pause entre chaque requête
      debounceTime(300),
      
      // s'assure que nous envoyons une requete uniquement si le terme de la recherche a été modifié
			// Donc permet d'ignorer la recherche en cours si c'est la même que la précédente
      distinctUntilChanged(),
      
      // Cette methode appelle searchPokemons() pour chaque terme de recherche qui passe à travers les filtres précédents (debounceTIme() et distinctUntilCHanged())
      // cet opérateur annule et rejette les termes précédents de la recherche et retourne seulement le plus récent, cad ce que l'user a saisi en dernier
			// on retourne la liste des résultats correpsondant aux termes de la recherche
			switchMap((term: string) => this.pokemonsService.searchPokemons(term)),
		);
	}
 
	gotoDetail(pokemon: Pokemon): void {
		let link = ['/pokemon', pokemon.id];
		this.router.navigate(link);
	}

}
