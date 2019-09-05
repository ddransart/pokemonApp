import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';


import { BorderCardDirective } from './border-card.directive'; // On importe notre directive dans notre appli
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { PokemonRoutingModule } from './pokemons-routing.module';
import { PokemonsService } from './pokemons.service';

import { AuthGuardService } from '../auth-guard/auth-guard.service';

import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { from } from 'rxjs';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { LoaderComponent } from '../loader/loader.component';

@NgModule({
	imports: [ // on cite d'abord tous les modules propres à ng avant nos propres modules
	CommonModule, 
	FormsModule,
    PokemonRoutingModule
	],
	declarations: [ // Désormais tous ces élts appartiennent au module spécifique pokemons
		ListPokemonComponent,
		DetailPokemonComponent,
		BorderCardDirective,
		PokemonTypeColorPipe,
		PokemonFormComponent,
		EditPokemonComponent,
		SearchPokemonComponent,
		LoaderComponent
	],
	providers: [PokemonsService, AuthGuardService]
})

export class PokemonsModule { }
