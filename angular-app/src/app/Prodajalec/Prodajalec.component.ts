import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProdajalecService } from './Prodajalec.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Prodajalec',
	templateUrl: './Prodajalec.component.html',
	styleUrls: ['./Prodajalec.component.css'],
    providers: [ProdajalecService]
})
export class ProdajalecComponent implements OnInit {

    myForm: FormGroup;

    private allProdajalec;
    private prodajalec;
    private currentId;
    private errorMessage;

        naziv = new FormControl("", Validators.required);
        kraj = new FormControl("", Validators.required);
        postnaSt = new FormControl("", Validators.required);
        ulica = new FormControl("", Validators.required);
        hisnaSt = new FormControl("", Validators.required);
        stanje = new FormControl("", Validators.required);
        vraciloDnevi = new FormControl("", Validators.required);


    constructor(private serviceProdajalec:ProdajalecService, fb: FormBuilder) {
        this.myForm = fb.group({
        
        naziv:this.naziv,
        kraj:this.kraj,
        postnaSt:this.postnaSt,
        ulica:this.ulica,
        hisnaSt:this.hisnaSt,
        stanje:this.stanje,
        vraciloDnevi:this.vraciloDnevi

        });
    };

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll_Prodajalec(): Promise<any> {
        let tempList = [];
        return this.serviceProdajalec.getAllProdajalec()
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            result.forEach(prodajalec => {
                tempList.push(prodajalec);
          });
          this.allProdajalec = tempList;
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
        return this.serviceProdajalec.getAllProdajalec()
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            result.forEach(prodajalec => {
                tempList.push(prodajalec);
        });
        this.allProdajalec = tempList;
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

    

    addProdajalec(form: any): Promise<any> {

        this.prodajalec = {
          $class: "org.feri.model.Prodajalec",
          
            "naziv":this.naziv.value,
            "kraj":this.kraj.value,
            "postnaSt":this.postnaSt.value,
            "ulica":this.ulica.value,
            "hisnaSt":this.hisnaSt.value,
            "stanje":this.stanje.value,
            "vraciloDnevi":this.vraciloDnevi.value

        };
    
        this.myForm.setValue({
          
            "naziv":null,
            "kraj":null,
            "postnaSt":null,
            "ulica":null,
            "hisnaSt":null,
            "stanje":null,
            "vraciloDnevi":null
 
        });
    
        return this.serviceProdajalec.addProdajalec(this.prodajalec)
        .toPromise()
        .then(() => {
                this.errorMessage = null;
          this.myForm.setValue({
          
            "naziv":null,
            "kraj":null,
            "postnaSt":null,
            "ulica":null,
            "hisnaSt":null,
            "stanje":null,
            "vraciloDnevi":null
            
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


    updateProdajalec(form: any): Promise<any> {
        this.prodajalec = {
        $class: "org.feri.model.Prodajalec",
            
            "kraj":this.kraj.value,
            "postnaSt":this.postnaSt.value,
            "ulica":this.ulica.value,
            "hisnaSt":this.hisnaSt.value,
            "stanje":this.stanje.value,
            "vraciloDnevi":this.vraciloDnevi.value
            
        };

        return this.serviceProdajalec.updateProdajalec(form.get("naziv").value,this.prodajalec)
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


    deleteProdajalec(): Promise<any> {

        return this.serviceProdajalec.deleteProdajalec(this.currentId)
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

        return this.serviceProdajalec.getProdajalec(id)
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            let formObject = {

                "naziv":null,
                "kraj":null,
                "postnaSt":null,
                "ulica":null,
                "hisnaSt":null,
                "stanje":null,
                "vraciloDnevi":null           
            
        };

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

        if(result.stanje){
            formObject.stanje = result.stanje;
        }else{
            formObject.stanje = null;
        }
    
        if(result.vraciloDnevi){
            formObject.vraciloDnevi = result.vraciloDnevi;
        }else{
            formObject.vraciloDnevi = null;
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
            
            "naziv":null,
            "kraj":null,
            "postnaSt":null,
            "ulica":null,
            "hisnaSt":null,
            "stanje":null,
            "vraciloDnevi":null            
        
        });
    }

}
