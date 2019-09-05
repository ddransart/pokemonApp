// Ce composant n'a pas de logique propre
// il se contente d'afficher une petite icone circulaire et peut etre injecté n'importe où dans l'appli selon nos besoins

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pkmn-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
