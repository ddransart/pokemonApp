import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon'; // modèle de nos pokémons
import { POKEMONS } from './mock-pokemons'; // Données de tous nos pokémons

// Pour notre API
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({ // permet de spécifier à ng que ce service peut lui-mem avoir d'autres dépendances
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpClient) { } // pour l'injection et l'utilisation de notre API

  // pour stocker l'url vers laquelle nous allons appeler notre API
  // propriété qui déclare le point d'acces de notre API à un seul endroit dans notre service
  // On peut modifier ce chemin à volonté sans réécrire toutes nos requetes
  // Rappel : ce point de terminaison est généré automatiquement par notre API grace au service inMemoryDbService.
  private pokemonsUrl = 'api/pokemons';


  // Permet de centraliser la gestion des logs de notre service
  // A modifier si plus tard on souhaite archiver nos logs plutot que de les afficher dans la console
  private log(log: string) {
    console.info(log);
  }

  // Dédiée à la gestion des erreurs
  // le param operation et le nom de la méthode qui a causé l'erreur. Par défaut ce param vaut "operation".
  // le param result est une donnée facultative à renvoyer comme résultat de l'observable.
  // return of : permet de laisser notre appli continuer à fonctionner en renvoyant un resultat adapté à la méthode qui a levé l'erreur.
  // chaque méthode du service renvoi un observable dont le résultat a un type différent

  // HandleError pren en param le type (T) afin que cette méthod puisse renvoyer une valeur sûre pour chaque méthode qui a levé l'erreur
  // AInsi l'appli peut continuer à fonctionner meme si une erreur est levée
  private handleError<T>(operation='operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      // of permet de passer les données passées en param en un observable
      return of(result as T); // T désigne le fait qu'on va typer un type en lui-meme. par ex number ou string
    };
    
  }

  // POur le champ de recherche
  searchPokemons(term: string): Observable<Pokemon[]> { // les term de la recherche sont en parametre // cett method renvoi un observabl contenant un flux de pokemons en resultat

    // on teste que l'user ne renseigne pas un terme vide
    if(!term.trim()) {
      return of([]); // s'il le fait on ne fait pas la recherche et on renvoi simplement un tableau vide sous la forme d'un observable, grace à l'operateur of
    }

    // on utilise cette syntax pour faire notre requet via les observables.
    // cette url `${this.pokemonsUrl}/?name=${term}` : est spécifique et mise en place avec notre API simulée, 
    // qui permet de renvoyer tous les pokémons dont la propriété "nom" contien ou est égale au terme de la recherche
    // ainsi pour la requete "pik", l'api renverra le pokemon "pikachou" puisque son nom contient les termes "pik".
    return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found pokemons matching "${term}"`)),
      catchError(this.handleError<Pokemon[]>(`searchPokemons`, []))
    );
  }


  // POur supprimer un pokemon
  deletePokemon(pokemon: Pokemon): Observable<Pokemon> { 
    const url = `${this.pokemonsUrl}/${pokemon.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // on signale au nivo d el'entete que le corp de la requete sera au format json
    };

    return this.http.delete<Pokemon>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted pokemon id=${pokemon.id}`)),
      catchError(this.handleError<Pokemon>(`deletedPokemon`))
    );
  }

  // Permet de persister vers l'API toutes les modif effectuées depuis le formulaire d'édition
  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // on signale au nivo d el'entete que le corp de la requete sera au format json
    };

    return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe(
      tap(_ => this.log(`updated pokemon id=${pokemon.id}`)),
      catchError(this.handleError<any>(`updatedPokemon`))
    );
    
  }

   // Retourne tous les pokémons. 
   // Désormais avec l'API, cette méthode va retourner un observable qui contiendra un tableau de pokémons // notre API renvoi directement les données dans un objet.
   getPokemons(): Observable<Pokemon[]> {
    
    // http get() : retourne un observable qui s'occupe d'envoyer une requete http de type get sur la route api/pokemons
    // on peut directement typer les données de retour grace à la syntaxe Pokemon[]
    // on effectue ensuite 2 operations sur cet observable grace aux operateurs tap et cathError
    // tap permet d'interagir sur le deroulement des evenements générérés par l'observable en executant une action quelconque
    // on peut utiliser tap pour le debogage ou l'archivage des logs par ex.
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      tap(_ => this.log(`fetched pokemons`)), // on  affiche un message dans la console pour rappeler que la méthode a bien été appelée
      catchError(this.handleError(`getPokemons`, [])) // catchError va donc intercepter les erreurs eventuels.
    );
  }
  
  // Retourne le pokémon correspondant à l'identifiant passé en paramètre
  getPokemon(id: number): Observable<Pokemon> {
    
    const url = `${this.pokemonsUrl}/${id}`; // différencie de getPokemons() juste au niveau de l'url et du type de retour (Syntax ES6)
  
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
}

// Retourne une liste de types du pokémon : permet de construire un champ spécifique où l'user pourra sélectionner les types du pokémon 
getPokemonTypes(): string[] {
  return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol'];
}
}
