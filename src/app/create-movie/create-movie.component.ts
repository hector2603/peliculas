import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, AuthenticationService , createMovieService} from '../_services';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
	createForm: FormGroup;
    loading = false;
    submitted = false;
    fileData: File = null;
    previewUrl:any = null;

  	constructor(private formBuilder: FormBuilder,
  		private CreateService : createMovieService,
  		private alertService: AlertService,
  		private router: Router) { }

  	ngOnInit() {
		this.createForm = this.formBuilder.group({
			name: ['', Validators.required],
			genre: ['', Validators.required],
			score: ['', Validators.required],
			cover: ['', Validators.required]
		});
  	}

	// Forma facil de acceder a los campos del formulario
	get f() { return this.createForm.controls; }

	onSubmit() {
		const uploadData = new FormData();
		uploadData.append('id',  'pp2255' );///////////// calcular el ID aleatopriamente 
		uploadData.append('name',  this.f.name.value );
		uploadData.append('genre', this.f.genre.value  );
		uploadData.append('score', this.f.score.value  );
		uploadData.append('cover', this.fileData );
		this.submitted = true;
		//console.log("despues"+this.previewUrl);
		this.CreateService.putMovie('pp2255',this.f.name.value ,this.f.genre.value,this.f.score.value ,this.previewUrl)            
			.pipe(first())
            .subscribe(
                data => {
                    if(data.error){
                        this.alertService.error("No se puedo crear la pelicula");
                    }else{
                        this.router.navigate(['']);
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });;
		//console.log(this.f.name.value);
		//console.log(this.f.cover);
		//console.log(uploadData);
	}

	fileProgress(fileInput: any) {
		//console.log("entro");
	    this.fileData = <File>fileInput.target.files[0];
	    //console.log(this.fileData);  
	    this.preview();

	}

	preview() {
	    // Show preview 
	    var mimeType = this.fileData.type;
	    if (mimeType.match(/image\/*/) == null) {
	      return;
	    }
	 
	    var reader = new FileReader();      
	    reader.readAsDataURL(this.fileData);
	    reader.onload = (_event) => { 
	      this.previewUrl = reader.result; 
	    }
	    //console.log(reader);
	}
}
