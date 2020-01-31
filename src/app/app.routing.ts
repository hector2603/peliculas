import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { ShowMovieComponent } from './show-movie';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'showMovie/:id', component: ShowMovieComponent , pathMatch: 'full' , canActivate: [AuthGuard] },
    { path: 'createMovie', component: CreateMovieComponent , pathMatch: 'full' , canActivate: [AuthGuard] },
    { path: 'editeMovie/:id', component: EditMovieComponent , pathMatch: 'full' , canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);