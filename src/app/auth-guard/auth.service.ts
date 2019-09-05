import { Injectable } from '@angular/core';
// RxJS 6
import { Observable } from 'rxjs/Observable';
import { tap, delay } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn: boolean = false; // permet de savoir si l'utilisateur est connecté ou non // sachant qu'il est deconnecté par défaut qd l'appli demarre
  redirectUrl: string; // permet de stocker l'url demandé par l'user qd il n'était pas encore authentifié, afin de le rediriger vers cette page après sa connexion
  
  // Une méthode de connexion : simule une connexion à une api externe en retournant un observable après un délai d'une seconde. 
  // On peut personnaliser cette méthode afin qu'el corresponde à nos propres besoins de connexion par la suite
	login(name: string, password: string): Observable<boolean> {

		// Faites votre appel à un service d'authentification...
		let isLoggedIn = (name === 'admin' && password === 'admin');

		return Observable.of(true).delay(1000).do(val => this.isLoggedIn = isLoggedIn);
		
	}

  // Une méthode de déconnexion : permet de déconnecter immédiatement l'user courant
  // l'user sera donc rediriger vers la page de connexion sans qu'on lui demande son avis
	logout(): void {
		this.isLoggedIn = false;
	}
}
