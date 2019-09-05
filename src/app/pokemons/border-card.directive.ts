import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]' 
})
export class BorderCardDirective { // on exporte cette classe afin de pouvoir utiliser cette directive dans nos composants

	private initialColor: string = '#f5f5f5';
	private defaultColor: string = '#009688';
	private defaultHeight: number = 180;
	title: string = "Pokémons";

	constructor(private el: ElementRef) {
		// this.setBorder('#f5f5f5');
		// this.setHeight(180);

		this.setBorder(this.initialColor);
		this.setHeight(this.defaultHeight);
	}
	

	@Input('pkmnBorderCard') borderColor: string; // alias
	//@Input() pkmnBorderCard: string; // sans alias, on utilise le nom de notre directive comme propriété. Pas pratique

    
	@HostListener('mouseenter') onMouseEnter() { // on va l'utiliser pour ecouter l'evnt MOuseEnter 
    	this.setBorder(this.borderColor || this.defaultColor); // pour modifier la couleur de notre bordure quand cet event sera appelé
	}

	@HostListener('mouseleave') onMouseLeave() { // on va l'utiliser pour ecouter l'evnt MOuseEnter 
    	this.setBorder(this.initialColor); // pour retrouver la couleur initiale de notre bordure quand le curseur quitte le pokemon
	}

	private setBorder(color: string) {
		let border = 'solid 4px ' + color;
		this.el.nativeElement.style.border = border;
	}

	private setHeight(height: number) {
		this.el.nativeElement.style.height = height + 'px';
	}
}