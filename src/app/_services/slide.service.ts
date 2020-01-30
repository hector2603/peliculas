import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../_models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(private http: HttpClient) { }

  getMovies(){
	return this.http.get<any>(`api/movies`)
		.pipe(map(movies => movies.map(movies => new Movies().deserialize(movies))));
  }
}
