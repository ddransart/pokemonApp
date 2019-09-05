import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // nous aide à déclarer les routes de notre appli

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// routes
const appRoutes: Routes = [
	{ path: '', redirectTo: 'pokemon/all', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent } // ttes les routes non interceptées par le syst de navigation redirigeront l'user vers le composant PageNotFoundCOmponent // A déclarer tjrs en dernier car l'ordre de déclaration de route compte
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
