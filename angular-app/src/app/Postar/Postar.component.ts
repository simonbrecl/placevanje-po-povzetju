import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PostarService } from './Postar.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Postar',
	templateUrl: './Postar.component.html',
	styleUrls: ['./Postar.component.css'],
    providers: [PostarService]
})
export class PostarComponent implements OnInit {

    myForm: FormGroup;

    private allPostar;
    private postar;
    private currentId;
    private errorMessage;

        postarID = new FormControl("", Validators.required);
        ime = new FormControl("", Validators.required);
        priimek = new FormControl("", Validators.required);


    constructor(private servicePostar:PostarService, fb: FormBuilder) {
        this.myForm = fb.group({
        
        postarID:this.postarID,
        ime:this.ime,
        priimek:this.priimek

        });
    };

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll_Postar(): Promise<any> {
        let tempList = [];
        return this.servicePostar.getAllPostar()
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            result.forEach(postar => {
                tempList.push(postar);
          });
          this.allPostar = tempList;
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
        return this.servicePostar.getAllPostar()
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            result.forEach(postar => {
                tempList.push(postar);
        });
        this.allPostar = tempList;
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

    

    addPostar(form: any): Promise<any> {

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i < 8; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          
            return text;
          }

        this.postar = {
          $class: "org.feri.model.Postar",
          
            "postarID":"POSTAR_" + makeid(),
            "ime":this.ime.value,
            "priimek":this.priimek.value

        };
    
        this.myForm.setValue({
          
            "postarID":null,
            "ime":null,
            "priimek":null
 
        });
    
        return this.servicePostar.addPostar(this.postar)
        .toPromise()
        .then(() => {
                this.errorMessage = null;
          this.myForm.setValue({
          
            "postarID":null,
            "ime":null,
            "priimek":null
       
            
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


    updatePostar(form: any): Promise<any> {
        this.postar = {
        $class: "org.feri.model.Postar",
            
            "ime":this.ime.value,
            "priimek":this.priimek.value
            
        };

        return this.servicePostar.updatePostar(form.get("postarID").value,this.postar)
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


    deletePostar(): Promise<any> {

        return this.servicePostar.deletePostar(this.currentId)
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

        return this.servicePostar.getPostar(id)
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            let formObject = {

                "postarID":null,
                "ime":null,
                "priimek":null
         
            
        };

        if(result.postarID){
            formObject.postarID = result.postarID;
        }else{
            formObject.postarID = null;
        }

        if(result.ime){
            formObject.ime = result.ime;
        }else{
            formObject.ime = null;
        }
    
        if(result.priimek){
            formObject.priimek = result.priimek;
        }else{
            formObject.priimek = null;
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
            
            "postarID":null,
            "ime":null,
            "priimek":null,          
        
        });
    }

}
