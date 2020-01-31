import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { SliderComponent } from './slider/slider.component';
import { ShowMovieComponent } from './show-movie/show-movie.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent ,
        SliderComponent ,
        ShowMovieComponent ,
        CreateMovieComponent ,
        EditMovieComponent],
    providers: [
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }