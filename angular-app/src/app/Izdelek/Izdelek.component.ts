import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IzdelekService } from './Izdelek.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Izdelek',
	templateUrl: './Izdelek.component.html',
	styleUrls: ['./Izdelek.component.css'],
  providers: [IzdelekService]
})
export class IzdelekComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          izdelekID = new FormControl("", Validators.required);
        
  
      
          naziv = new FormControl("", Validators.required);
        
  
      
          kolicina = new FormControl("", Validators.required);
        
  
      
          cena = new FormControl("", Validators.required);
        
  
      
          prodajalec = new FormControl("", Validators.required);
        
  


  constructor(private serviceIzdelek:IzdelekService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          izdelekID:this.izdelekID,
        
    
        
          naziv:this.naziv,
        
    
        
          kolicina:this.kolicina,
        
    
        
          cena:this.cena,
        
    
        
          prodajalec:this.prodajalec
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceIzdelek.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.feri.model.Izdelek",
      
        
          "izdelekID":this.izdelekID.value,
        
      
        
          "naziv":this.naziv.value,
        
      
        
          "kolicina":this.kolicina.value,
        
      
        
          "cena":this.cena.value,
        
      
        
          "prodajalec":this.prodajalec.value
        
      
    };

    this.myForm.setValue({
      
        
          "izdelekID":null,
        
      
        
          "naziv":null,
        
      
        
          "kolicina":null,
        
      
        
          "cena":null,
        
      
        
          "prodajalec":null
        
      
    });

    return this.serviceIzdelek.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "izdelekID":null,
        
      
        
          "naziv":null,
        
      
        
          "kolicina":null,
        
      
        
          "cena":null,
        
      
        
          "prodajalec":null 
        
      
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.feri.model.Izdelek",
      
        
          
        
    
        
          
            "naziv":this.naziv.value,
          
        
    
        
          
            "kolicina":this.kolicina.value,
          
        
    
        
          
            "cena":this.cena.value,
          
        
    
        
          
            "prodajalec":this.prodajalec.value
          
        
    
    };

    return this.serviceIzdelek.updateAsset(form.get("izdelekID").value,this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceIzdelek.deleteAsset(this.currentId)
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

    return this.serviceIzdelek.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "izdelekID":null,
          
        
          
            "naziv":null,
          
        
          
            "kolicina":null,
          
        
          
            "cena":null,
          
        
          
            "prodajalec":null 
          
        
      };



      
        if(result.izdelekID){
          
            formObject.izdelekID = result.izdelekID;
          
        }else{
          formObject.izdelekID = null;
        }
      
        if(result.naziv){
          
            formObject.naziv = result.naziv;
          
        }else{
          formObject.naziv = null;
        }
      
        if(result.kolicina){
          
            formObject.kolicina = result.kolicina;
          
        }else{
          formObject.kolicina = null;
        }
      
        if(result.cena){
          
            formObject.cena = result.cena;
          
        }else{
          formObject.cena = null;
        }
      
        if(result.prodajalec){
          
            formObject.prodajalec = result.prodajalec;
          
        }else{
          formObject.prodajalec = null;
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
      
        
          "izdelekID":null,
        
      
        
          "naziv":null,
        
      
        
          "kolicina":null,
        
      
        
          "cena":null,
        
      
        
          "prodajalec":null 
        
      
      });
  }

}
