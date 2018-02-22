import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PostnaEnotaService } from './PostnaEnota.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-PostnaEnota',
	templateUrl: './PostnaEnota.component.html',
	styleUrls: ['./PostnaEnota.component.css'],
    providers: [PostnaEnotaService]
})
export class PostnaEnotaComponent implements OnInit {

    myForm: FormGroup;

    private allPostnaEnota;
    private postnaenota;
    private currentId;
    private errorMessage;

        postnaEnotaID = new FormControl("", Validators.required);
        naziv = new FormControl("", Validators.required);
        kraj = new FormControl("", Validators.required);
        postnaSt = new FormControl("", Validators.required);
        ulica = new FormControl("", Validators.required);
        hisnaSt = new FormControl("", Validators.required);
        hranjenjePosiljke = new FormControl("", Validators.required);
        postarji = new FormControl("", Validators.required);


    constructor(private servicePostnaEnota:PostnaEnotaService, fb: FormBuilder) {
        this.myForm = fb.group({
        
        postnaEnotaID:this.postnaEnotaID,
        naziv:this.naziv,
        kraj:this.kraj,
        postnaSt:this.postnaSt,
        ulica:this.ulica,
        hisnaSt:this.hisnaSt,
        hranjenjePosiljke:this.hranjenjePosiljke,
        postarji:this.postarji

        });
    };

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll_PostnaEnota(): Promise<any> {
        let tempList = [];
        return this.servicePostnaEnota.getAllPostnaEnota()
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            result.forEach(postnaenota => {
                tempList.push(postnaenota);
          });
          this.allPostnaEnota = tempList;
        })
        .catch((error) => {
            if(error == 'Server error'){
                this.errorMessage = "Could not connect to REST server. Please check your configuration details";
            }
            else if(error == '404 - Not Found'){
                    this.errorMessage = "404 - Could not find API route. Please check your available APIs."
            }
            else{
                this.errorMessage = error;
            }
        });
      }

    loadAll(): Promise<any> {
        let tempList = [];
        return this.servicePostnaEnota.getAllPostnaEnota()
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            result.forEach(postnaenota => {
                tempList.push(postnaenota);
        });
        this.allPostnaEnota = tempList;
        })
        .catch((error) => {
            if(error == 'Server error'){
                this.errorMessage = "Could not connect to REST server. Please check your configuration details";
            }
            else if(error == '404 - Not Found'){
                    this.errorMessage = "404 - Could not find API route. Please check your available APIs."
            }
            else{
                this.errorMessage = error;
            }
        });
    }

    

    addPostnaEnota(form: any): Promise<any> {

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i < 8; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          
            return text;
          }

        this.postnaenota = {
          $class: "org.feri.model.PostnaEnota",
          
            "postnaEnotaID":"ENOTA_" + makeid(),
            "naziv":this.naziv.value,
            "kraj":this.kraj.value,
            "postnaSt":this.postnaSt.value,
            "ulica":this.ulica.value,
            "hisnaSt":this.hisnaSt.value,
            "hranjenjePosiljke":this.hranjenjePosiljke.value,
            "postarji":this.postarji.value

        };
    
        this.myForm.setValue({
          
            "postnaEnotaID":null,
            "naziv":null,
            "kraj":null,
            "postnaSt":null,
            "ulica":null,
            "hisnaSt":null,
            "hranjenjePosiljke":null,
            "postarji":null
 
        });
    
        return this.servicePostnaEnota.addPostnaEnota(this.postnaenota)
        .toPromise()
        .then(() => {
                this.errorMessage = null;
          this.myForm.setValue({
          
            "postnaEnotaID":null,
            "naziv":null,
            "kraj":null,
            "postnaSt":null,
            "ulica":null,
            "hisnaSt":null,
            "hranjenjePosiljke":null,
            "postarji":null

            
          });
        })
        .catch((error) => {
            if(error == 'Server error'){
                this.errorMessage = "Could not connect to REST server. Please check your configuration details";
            }
            else{
                this.errorMessage = error;
            }
        });
      }


    updatePostnaEnota(form: any): Promise<any> {
        this.postnaenota = {
        $class: "org.feri.model.PostnaEnota",
            
            "naziv":this.naziv.value,
            "kraj":this.kraj.value,
            "postnaSt":this.postnaSt.value,
            "ulica":this.ulica.value,
            "hisnaSt":this.hisnaSt.value,
            "hranjenjePosiljke":this.hranjenjePosiljke.value,
            "postarji":this.postarji.value

            
        };

        return this.servicePostnaEnota.updatePostnaEnota(form.get("postnaEnotaID").value,this.postnaenota)
            .toPromise()
            .then(() => {
                this.errorMessage = null;
            })
            .catch((error) => {
                if(error == 'Server error'){
                    this.errorMessage = "Could not connect to REST server. Please check your configuration details";
                }
                else if(error == '404 - Not Found'){
                    this.errorMessage = "404 - Could not find API route. Please check your available APIs."
                }
                else{
                    this.errorMessage = error;
                }
        });
    }


    deletePostnaEnota(): Promise<any> {

        return this.servicePostnaEnota.deletePostnaEnota(this.currentId)
            .toPromise()
            .then(() => {
                this.errorMessage = null;
            })
            .catch((error) => {
                if(error == 'Server error'){
                    this.errorMessage = "Could not connect to REST server. Please check your configuration details";
                }
                else if(error == '404 - Not Found'){
                    this.errorMessage = "404 - Could not find API route. Please check your available APIs."
                }
                else{
                    this.errorMessage = error;
                }
        });
    }

    setId(id: any): void{
        this.currentId = id;
    }

    getForm(id: any): Promise<any>{

        return this.servicePostnaEnota.getPostnaEnota(id)
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            let formObject = {

                "postnaEnotaID":null,
                "naziv":null,
                "kraj":null,
                "postnaSt":null,
                "ulica":null,
                "hisnaSt":null,
                "hranjenjePosiljke":null,
                "postarji":null
        };

        if(result.postnaEnotaID){
            formObject.postnaEnotaID = result.postnaEnotaID;
        }else{
            formObject.postnaEnotaID = null;
        }

        if(result.naziv){
            formObject.naziv = result.naziv;
        }else{
            formObject.naziv = null;
        }
    
        if(result.kraj){
            formObject.kraj = result.kraj;
        }else{
            formObject.kraj = null;
        }

        if(result.postnaSt){
            formObject.postnaSt = result.postnaSt;
        }else{
            formObject.postnaSt = null;
        }

        if(result.ulica){
            formObject.ulica = result.ulica;
        }else{
            formObject.ulica = null;
        }

        if(result.hisnaSt){
            formObject.hisnaSt = result.hisnaSt;
        }else{
            formObject.hisnaSt = null;
        }

        if(result.hranjenjePosiljke){
            formObject.hranjenjePosiljke = result.hranjenjePosiljke;
        }else{
            formObject.hranjenjePosiljke = null;
        }

        if(result.postarji){
            formObject.postarji = result.postarji;
        }else{
            formObject.postarji = null;
        }
    

        this.myForm.setValue(formObject);

        })
        .catch((error) => {
            if(error == 'Server error'){
                this.errorMessage = "Could not connect to REST server. Please check your configuration details";
            }
            else if(error == '404 - Not Found'){
                    this.errorMessage = "404 - Could not find API route. Please check your available APIs."
            }
            else{
                this.errorMessage = error;
            }
        });

    }

    resetForm(): void{
        this.myForm.setValue({
            
            "postnaEnotaID":null,
            "naziv":null,
            "kraj":null,
            "postnaSt":null,
            "ulica":null,
            "hisnaSt":null,
            "hranjenjePosiljke":null,
            "postarji":null
        
        });
    }

}
