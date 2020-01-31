import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService , SlideService  , MovieService} from '../_services';
import { ActivatedRoute } from '@angular/router';
import { Movies } from '../_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-show-movie',
  templateUrl: './show-movie.component.html',
  styleUrls: ['./show-movie.component.css']
})
export class ShowMovieComponent implements OnInit {

	pelicula: Movies;

  constructor(
  	private router: ActivatedRoute,
  	private movieService : MovieService) 
  { }

  ngOnInit() {
  	var id = this.router.snapshot.paramMap.get("id");
  	this.movieService.getMovie(id)  		
  		.pipe(first())
        .subscribe(
            data => {
				this.pelicula = data;
            },
            error => {
				console.log(error);
            });
  }

}
