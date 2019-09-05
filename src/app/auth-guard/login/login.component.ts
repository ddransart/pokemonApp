import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'pkmn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  message: string = 'Vous êtes déconnecté(e).';
	private name: string;
  private password: string;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // Informe l'utilisateur sur son authentfication.
	setMessage() {
		this.message = this.authService.isLoggedIn ?
			'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
	}

	// Connecte l'utilisateur auprès du Guard
	login() {
		this.message = 'Connexion en cours ...';
		this.authService.login(this.name, this.password).subscribe(() => {
			this.setMessage();
			if (this.authService.isLoggedIn) {
				// Récupère l'URL de redirection depuis le service d'authentification
				// Si aucune redirection n'a été définis, redirige l'utilisateur vers la liste des pokemons.
				let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/pokemon/list';
				// Redirige l'utilisateur
				this.router.navigate([redirect]);
			} else {
				this.password = '';
			}
		});
	}

	// Déconnecte l'utilisateur
	logout() {
		this.authService.logout();
		this.setMessage();
	}

}
