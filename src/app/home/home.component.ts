import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User , Movies } from '../_models';
import { UserService, AuthenticationService  , SlideService} from '../_services';

declare function init():any ;

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    categorias: string[] = [];
    movies: Movies[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private sliderService : SlideService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.sliderService.getMovies()
        .pipe(first())
        .subscribe(
            data => {
                //console.log(data);
                this.movies = data;
                this.generos(data);
            },
            error => {
                console.log(error);
            });
        init();
    }

    generos(peliculas : Movies[]){
        var categoria: string;
        for (var i = peliculas.length - 1; i >= 0; i--) {
            categoria =  peliculas[i].genre.trim().toUpperCase().replace(" ","-");
            if(this.categorias.indexOf(categoria)<0){
                this.categorias.push(categoria);
            }
        }
        //console.log(this.categorias);
    }


}