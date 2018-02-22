import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BankaService } from './Banka.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Banka',
	templateUrl: './Banka.component.html',
	styleUrls: ['./Banka.component.css'],
    providers: [BankaService]
})
export class BankaComponent implements OnInit {

    myForm: FormGroup;

    private allBanka;
    private banka;
    private currentId;
    private errorMessage;

        bankaID = new FormControl("", Validators.required);
        naziv = new FormControl("", Validators.required);
        kraj = new FormControl("", Validators.required);
        postnaSt = new FormControl("", Validators.required);
        ulica = new FormControl("", Validators.required);
        hisnaSt = new FormControl("", Validators.required);
        dovoljenProcent = new FormControl("", Validators.required);
        odobrenZnesekDo = new FormControl("", Validators.required);



    constructor(private serviceBanka:BankaService, fb: FormBuilder) {
        this.myForm = fb.group({
        
        bankaID:this.bankaID,
        naziv:this.naziv,
        kraj:this.kraj,
        postnaSt:this.postnaSt,
        ulica:this.ulica,
        hisnaSt:this.hisnaSt,
        dovoljenProcent:this.dovoljenProcent,
        odobrenZnesekDo:this.odobrenZnesekDo

        });
    };

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll_Banka(): Promise<any> {
        let tempList = [];
        return this.serviceBanka.getAllBanka()
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            result.forEach(banka => {
                tempList.push(banka);
          });
          this.allBanka = tempList;
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
        return this.serviceBanka.getAllBanka()
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            result.forEach(banka => {
                tempList.push(banka);
        });
        this.allBanka = tempList;
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

    

    addBanka(form: any): Promise<any> {

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i < 8; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          
            return text;
          }

        this.banka = {
          $class: "org.feri.model.Banka",
          
            "bankaID":"BANKA_" + makeid(),
            "naziv":this.naziv.value,
            "kraj":this.kraj.value,
            "postnaSt":this.postnaSt.value,
            "ulica":this.ulica.value,
            "hisnaSt":this.hisnaSt.value,
            "dovoljenProcent":this.dovoljenProcent.value,
            "odobrenZnesekDo":this.odobrenZnesekDo.value


        };
    
        this.myForm.setValue({
          
            "bankaID":null,
            "naziv":null,
            "kraj":null,
            "postnaSt":null,
            "ulica":null,
            "hisnaSt":null,
            "dovoljenProcent":null,
            "odobrenZnesekDo":null
 
        });
    
        return this.serviceBanka.addBanka(this.banka)
        .toPromise()
        .then(() => {
                this.errorMessage = null;
          this.myForm.setValue({
          
            "bankaID":null,
            "naziv":null,
            "kraj":null,
            "postnaSt":null,
            "ulica":null,
            "hisnaSt":null,
            "dovoljenProcent":null,
            "odobrenZnesekDo":null

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


    updateBanka(form: any): Promise<any> {
        this.banka = {
        $class: "org.feri.model.Banka",
            
            "naziv":this.naziv.value,
            "kraj":this.kraj.value,
            "postnaSt":this.postnaSt.value,
            "ulica":this.ulica.value,
            "hisnaSt":this.hisnaSt.value,
            "dovoljenProcent":this.dovoljenProcent.value,
            "odobrenZnesekDo":this.odobrenZnesekDo.value
        };

        return this.serviceBanka.updateBanka(form.get("bankaID").value,this.banka)
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


    deleteBanka(): Promise<any> {

        return this.serviceBanka.deleteBanka(this.currentId)
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

        return this.serviceBanka.getBanka(id)
        .toPromise()
        .then((result) => {
            this.errorMessage = null;
            let formObject = {

                "bankaID":null,
                "naziv":null,
                "kraj":null,
                "postnaSt":null,
                "ulica":null,
                "hisnaSt":null,
                "dovoljenProcent":null,
                "odobrenZnesekDo":null           
         
            
        };

        if(result.bankaID){
            formObject.bankaID = result.bankaID;
        }else{
            formObject.bankaID = null;
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

    
        if(result.dovoljenProcent){
            formObject.dovoljenProcent = result.dovoljenProcent;
        }else{
            formObject.dovoljenProcent = null;
        }

        if(result.odobrenZnesekDo){
            formObject.odobrenZnesekDo = result.odobrenZnesekDo;
        }else{
            formObject.odobrenZnesekDo = null;
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
            
            "bankaID":null,
            "naziv":null,
            "kraj":null,
            "postnaSt":null,
            "ulica":null,
            "hisnaSt":null,
            "stanje":null,
            "dovoljenProcent":null,
            "odobrenZnesekDo":null            
       
        
        });
    }

}
