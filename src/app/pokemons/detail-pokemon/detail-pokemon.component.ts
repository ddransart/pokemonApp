import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Pokemon } from '../pokemon';

import { PokemonsService } from '../pokemons.service';


@Component({
  selector: 'detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
	styleUrls: ['./detail-pokemon.component.less'],
	//providers: [PokemonsService] 
})
export class DetailPokemonComponent implements OnInit {


	pokemon: Pokemon = null; // on déclare notre pokemon à afficher

	constructor(
		private route: ActivatedRoute, 
		private router: Router, 
		private pokemonsService: PokemonsService) {}

	ngOnInit(): void {

		let id = +this.route.snapshot.params['id']; // on récupère l'id du pokémon qui est contenu dans l'url // ensuite on récupère les paramètres de la route, associés à notre composant // ... cf.notes
		this.pokemonsService.getPokemon(id)
			.subscribe(pokemons => this.pokemon = pokemons); // ici on récupère une seule instance d'un pokemon

		// for (let i = 0; i < this.pokemons.length; i++) { // boucle qui itère (parcoure) tous les pokémons de l'appli pour trouver celui qui va être affiché. //on cherche donc le pokemon dont l'id correspond à l'id de la route extraite à la ligne 21
		// 	if (this.pokemons[i].id == id) {
		// 		this.pokemon = this.pokemons[i]; // une fois que nous avons trouvé ce pokemon, on l'affecte à la propr pokemon de notre composant
		// 	}
		// }
	}

	delete(pokemon: Pokemon): void {
		this.pokemonsService.deletePokemon(pokemon)
			.subscribe(_ => this.goBack()); // on s'abonne à l'obbservable qui est retourné par notre service. et 1 fois qu'un pokemon sera supprimé, on retombera à la liste de pokemons
	}

	goBack(): void { // permet à l'user de revenir sur la liste des pokémons après avoir consulté un pokémon en particulier
    this.router.navigate(['/pokemon/all']); // le router de ng permet de rediriger l'user vers cette liste de pokemons
	}

	// permet à l'user (s'il clique sur le bouton "editer") de se retrouver sur le formulaire d'édition déjà prérempli avec les valeurs du pokémon sur lequel il a cliqué
	goEdit(pokemon: Pokemon): void { // ne renvoie rien car juste pour effectuer une redirection
		let link = ['/pokemon/edit', pokemon.id]; // le lien de redirection (link) est cette route('/pokemon/edit') qui prendra en paramètre l'identifiant du pokemon (pokemon.id)
		// ensuite on appel le routeur et on lui demande de naviguer vers cet url
		this.router.navigate(link);
	}
}
