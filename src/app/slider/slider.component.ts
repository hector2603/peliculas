import { Component, AfterViewInit  , Input , OnInit } from '@angular/core';
import { AlertService, AuthenticationService , SlideService  } from '../_services';
import { first } from 'rxjs/operators';
import { Movies } from '../_models';

declare function init():any ;
declare function controls(categoria : string):any ;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements AfterViewInit , OnInit {
  	@Input() categoria: string;
    @Input() excluir: string;
  	movies: Movies[] = [];

  constructor( 
  	private sliderService : SlideService
  ) { }

  ngOnInit(){
  	this.sliderService.getMovies()
  		.pipe(first())
        .subscribe(
            data => {
				//console.log(data);
				this.separarPorGenero(data, this.categoria);
            },
            error => {
				console.log(error);
            });
  }

  ngAfterViewInit() {
    init();
    controls(this.categoria);
  }

  /**
    Separa las peliculas que son del genero que entre en la variable categoria
  */
  separarPorGenero(peliculas : Movies[], categoria : string){
  	for (var i = peliculas.length - 1; i >= 0; i--) {
      if(peliculas[i].id){
    		var categoriaSlide =  peliculas[i].genre.trim().toUpperCase().replace(" ","-");
    		if( categoriaSlide === categoria.trim().toUpperCase().replace(" ","-") && this.excluir !=  peliculas[i].id)
    		{
    			this.movies.push(peliculas[i]);
    		}
      }
  	}
  	init();
  	setTimeout(() => {init()}, 3000);
  }

}
