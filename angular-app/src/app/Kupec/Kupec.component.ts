import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { KupecService } from './Kupec.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Kupec',
	templateUrl: './Kupec.component.html',
	styleUrls: ['./Kupec.component.css'],
    providers: [KupecService]
})
export class KupecComponent implements OnInit {

    myForm: FormGroup;

    private allKupec;
    private kupec;
    private currentId;
    private errorMessage;

    ime = new FormControl("", Validators.required);
    priimek = new FormControl("", Validators.required);
    email = new FormControl("", Validators.required);
    kraj = new FormControl("", Validators.required);
    postnaSt = new FormControl("", Validators.required);
    ulica = new FormControl("", Validators.required);
    hisnaSt = new FormControl("", Validators.required);
    stanje = new FormControl("", Validators.required);
    banka = new FormControl("", Validators.required);


    constructor(private serviceKupec:KupecService, fb: FormBuilder) {
        this.myForm = fb.group({
        
          ime:this.ime,
          priimek:this.priimek,
          email:this.email,
          kraj:this.kraj,
          postnaSt:this.postnaSt,
          ulica:this.ulica,
          hisnaSt:this.hisnaSt,
          stanje:this.stanje,
          banka:this.banka

        });
    };

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll_Kupec(): Promise<any> {
        let tempList = [];
        return this.serviceKupec.getAllKupec()
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            result.forEach(kupec => {
                tempList.push(kupec);
          });
          this.allKupec = tempList;
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
        return this.serviceKupec.getAllKupec()
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            result.forEach(kupec => {
                tempList.push(kupec);
        });
        this.allKupec = tempList;
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

    

    addKupec(form: any): Promise<any> {

        this.kupec = {
          $class: "org.feri.model.Kupec",
          
            "ime":this.ime.value,
            "priimek":this.priimek.value,
            "email":this.email.value,
            "kraj":this.kraj.value,
            "postnaSt":this.postnaSt.value,
            "ulica":this.ulica.value,
            "hisnaSt":this.hisnaSt.value,
            "stanje":this.stanje.value,
            "banka":this.banka.value

        };
    
        this.myForm.setValue({
          
                "ime":null,
                "priimek":null,
                "email":null,
                "kraj":null,
                "postnaSt":null,
                "ulica":null,
                "hisnaSt":null,
                "stanje":null,
                "banka":null
 
        });
    
        return this.serviceKupec.addKupec(this.kupec)
        .toPromise()
        .then(() => {
                this.errorMessage = null;
          this.myForm.setValue({
          
            "ime":null,
            "priimek":null,
            "email":null,
            "kraj":null,
            "postnaSt":null,
            "ulica":null,
            "hisnaSt":null,
            "stanje":null,
            "banka":null
            
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


    updateKupec(form: any): Promise<any> {
        this.kupec = {
        $class: "org.feri.model.Kupec",
            
        "ime":this.ime.value,
        "priimek":this.priimek.value,
        "kraj":this.kraj.value,
        "postnaSt":this.postnaSt.value,
        "ulica":this.ulica.value,
        "hisnaSt":this.hisnaSt.value,
        "stanje":this.stanje.value,
        "banka":this.banka.value
            
        };

        return this.serviceKupec.updateKupec(form.get("email").value,this.kupec)
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


    deleteKupec(): Promise<any> {

        return this.serviceKupec.deleteKupec(this.currentId)
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

        return this.serviceKupec.getKupec(id)
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            let formObject = {

              "ime":null,
              "priimek":null,
              "email":null,
              "kraj":null,
              "postnaSt":null,
              "ulica":null,
              "hisnaSt":null,
              "stanje":null,
              "banka":null      
            
        };

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

        if(result.email){
            formObject.email = result.email;
        }else{
            formObject.email = null;
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

        if(result.stanje){
            formObject.stanje = result.stanje;
        }else{
            formObject.stanje = null;
        }
    
        if(result.banka){
            formObject.banka = result.banka;
        }else{
            formObject.banka = null;
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
            
          "ime":null,
          "priimek":null,
          "email":null,
          "kraj":null,
          "postnaSt":null,
          "ulica":null,
          "hisnaSt":null,
          "stanje":null,
          "banka":null         
        
        });
    }

}
