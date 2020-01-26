import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../_services';

@Component({templateUrl: 'login.component.html'})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirecciona al inicio si no hay un usuario autenticado
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // retorna a la ultima ruta de acceso
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // Forma facil de acceder a los campos del formulario
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data.error){
                        this.alertService.error("Usuario o Contraseña incorrectos");
                        this.loading = false;
                        this.authenticationService.logout();
                    }else{
                        this.router.navigate([this.returnUrl]);
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
