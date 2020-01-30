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
  	movies: Movies[] = [];

  constructor( 
  	private sliderService : SlideService
  ) { }

  ngOnInit(){
  	//console.log(this.categoria);
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

  separarPorGenero(peliculas : Movies[], categoria : string){
  	for (var i = peliculas.length - 1; i >= 0; i--) {
  		var categoriaSlide =  peliculas[i].genre.trim().toUpperCase().replace(" ","-");
  		if( categoriaSlide === categoria )
  		{
  			this.movies.push(peliculas[i]);
  		}
  	}
  	init();
  	setTimeout(() => {init()}, 3000);
  }

}
