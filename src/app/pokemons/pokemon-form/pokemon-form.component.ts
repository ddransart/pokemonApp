import { Component, Input, OnInit } from '@angular/core'; // Input permet de décrire une propr d'entrée pour un composant
import { Router } from '@angular/router'; // permet de rediriger l'user après qu'il ait soumis le formulaire
import { PokemonsService } from '../pokemons.service'; // notre service
import { Pokemon } from '../pokemon'; // notre modèle



@Component({
  selector: 'pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.less']
})
export class PokemonFormComponent implements OnInit {

  @Input() pokemon: Pokemon; // propriété d'entrée du composant
	types: Array<string>; // types disponibles pour un pokémon : 'Eau', 'Feu', etc ...

	constructor(
		private pokemonsService: PokemonsService,
		private router: Router) { }

	ngOnInit() {
		// Initialisation de la propriété types avec les types de pokémons récupérés depuis notre service
		this.types = this.pokemonsService.getPokemonTypes();
	}

  // Détermine si le type passé en paramètres appartient ou non au pokémon en cours d'édition.
  // Au chargement du formulaire, on peut ainsi précocher les checkbox correspondant au type que possède déjà le pokemon en cours d'édition 
	hasType(type: string): boolean {
		let index = this.pokemon.types.indexOf(type);
		if (~index) return true;
		return false;
	}

  // Méthode appelée lorsque l'utilisateur ajoute ou retire un type au pokémon en cours d'édition. Le modèle est automatiquement mis à jour.
	selectType($event: any, type: string): void {
		let checked = $event.target.checked;
		if (checked) {
			this.pokemon.types.push(type);
		} else {
			let index = this.pokemon.types.indexOf(type);
			if (~index) {
				this.pokemon.types.splice(index, 1);
			}
		}
	}

	// Valide le nombre de types pour chaque pokémon (permet de savoir si l'user a bien sélectionné entre 1 et 3 types de pokémons)
	isTypesValid(type: string): boolean { // renvoie un booléen pour savoir si la condition a été respectée ou non. càd si le champ est valide ou pas
		if (this.pokemon.types.length === 1 && this.hasType(type)) {
			return false;
    }
    
    // si l'user a déjà sélectionné 3 cases, alors il faut l'empecher d'en sélectionner d'autres.
    // on fait aussi appel à hasType pour vérifier que nous ne verouillons pas de cases que l'user a déjà cochées afin de lui permettre de déselectionner ses cases  
    // Pour vérouiller les cases à cocher de la liste, nous devons lier le résultat de la méthode isTypesValid() à la propriété disabled qui permet de verouiller les checkbox (grâce à la liaison des propriétés.) 
		if (this.pokemon.types.length >= 3 && !this.hasType(type)) { 
			return false;
		}

		return true;
  }
  
  

  // La méthode appelée lorsque le formulaire est soumis. // une fois que tous les champs sont considérés comme valides.
	// La méthode onSUbmit() persiste nos modif grace à updatePokemon()
	// Concrètement, une redirection est effectuée vers la page detaillant ledit pokemon avec les modif prises en compte grace à goBack()
	onSubmit(): void {
		console.log("Submit form !");
		this.pokemonsService.updatePokemon(this.pokemon)
			.subscribe(() => this.goBack());
	}

	goBack(): void {
		let link = ['/pokemon', this.pokemon.id];
		this.router.navigate(link);
	}

}
