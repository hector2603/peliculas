import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../_models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovie(id: string){
  	var url = 'api/movies/'+id
	return this.http.get<any>(url)
		.pipe(map(movies => new Movies().deserialize(movies)));
  }
}
