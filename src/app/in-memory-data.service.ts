import { InMemoryDbService } from 'angular-in-memory-web-api';
import { POKEMONS } from './pokemons/mock-pokemons';

export class InMemoryDataService implements InMemoryDbService { // cette clas implemente cette interf InMemory ki necessite d'implementer la methode createDb()

  // Cette méthode permet de simuler une petite BDD et une api pour notre appli.
  // cETTE API met en place plusieurs points de terminaison sur lesquels on peut effectuer des requetes.
  // GET api/pokemons : cette requete va renvoyer la liste de tous les pokémons
  // GET api/pokemons/1 : cette requete va renvoyer le pokémon avec l'identifiant 1
  // PUT api/pokemons/1 : de soumettre les infos sur le pokémon avec l'id 1
  // GET api/pokemons?name=^exp : cet API nous permet d'effectuer une requete de recherche par exemple sur la propriété name des pokémons
  // Avec cet API, on peut faire toutes les requetes pour une appli de demo (ajout, recherche, suppression, modification, etc.) mais pour une vraie appli, il faut utiliser un serveur distant


  createDb() { 
		let pokemons = POKEMONS;
		return { pokemons };
  }
  
  
  
  
}