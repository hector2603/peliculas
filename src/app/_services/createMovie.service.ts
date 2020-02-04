import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../_models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class createMovieService {

  constructor(private http: HttpClient) { }

    /**
    Función que consulta la api para crear una nueva película
    */
  	putMovie(id: string,name: string, genre: string, score: string, cover: string){
  		return this.http.post<any>('api/movies', {id,name,genre,score,cover})
              .pipe(map(movie => {
              	console.log("post");
              	console.log(movie);
                  return movie;
            }));
  }
}
