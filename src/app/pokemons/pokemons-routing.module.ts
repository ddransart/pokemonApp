import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';

import { AuthGuardService } from '../auth-guard/auth-guard.service';

// les routes du module Pokémon. ces routes définies ci-dessous concernent uniquement la gestion des pokémons
// il fo organiser la déclaration des routes pour pouvoir appliquer notre guard à toutes les routes qui concernent nos pokémons
const pokemonsRoutes: Routes = [

	// on définit un préfixe pour toutes nos routes, ce qui nous permettra de factoriser le début de l'url de nos routes
	// AInsi toutes nos routes sont protégées d'un seul coup
	{
		path: 'pokemon', // pour préfixer toutes les routes de notre module
		canActivate: [AuthGuardService],
		children: [
			{ path: 'all', component: ListPokemonComponent }, // all au lieu de pokemons
			{ path: 'edit/:id', component: EditPokemonComponent, canActivate: [AuthGuardService] }, // au lieu de pokemon/edit/:id
			{ path: ':id', component: DetailPokemonComponent } // au lieu de pokemon/:id
		]
	}
	
];

@NgModule({
	imports: [
		RouterModule.forChild(pokemonsRoutes) // forChild() permet d'enregistrer les routes additionnelles par rapport au module racine
	],
	exports: [
		RouterModule
	]
})
export class PokemonRoutingModule { }