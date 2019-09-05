import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';



@Injectable(
 // {
  //providedIn: 'root'
//}
)
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  // route contient la future route qui sera appelée - 
  // state contient le futur etat du routeur de l'appli qui devra passer la vérification du guard
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;
		return this.checkLogin(url);
	}

  // Ce guard retourne un booléen de manière synchrone comme résultat  
	checkLogin(url: string): boolean {
		if (this.authService.isLoggedIn) { return true; } // si l'user est connecté, alors le guard retourne true et la navigation continue
		this.authService.redirectUrl = url; // sinon, nous stockons l'url de la route à laquelle l'user a tenté d'accéder dans la propriété redirectUrl 
		this.router.navigate(['/login']); // ensuite on redirige l'user vers la page de connexion (qu'il faut créer)

		return false;
	}

}
