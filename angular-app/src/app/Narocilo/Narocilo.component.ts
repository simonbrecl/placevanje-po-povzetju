import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NarociloService } from './Narocilo.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Narocilo',
	templateUrl: './Narocilo.component.html',
	styleUrls: ['./Narocilo.component.css'],
  providers: [NarociloService]
})
export class NarociloComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          narociloID = new FormControl("", Validators.required);
        
  
      
          izdelki = new FormControl("", Validators.required);
        
  
      
          kupec = new FormControl("", Validators.required);
        
  
      
        
  
      
          stanjeNarocila = new FormControl("", Validators.required);
        
  
      
          casUstvarjeno = new FormControl("", Validators.required);
        
  
      
          lokacijaPrevzema = new FormControl("", Validators.required);
        
  


  constructor(private serviceNarocilo:NarociloService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          narociloID:this.narociloID,
        
    
        
          izdelki:this.izdelki,
        
    
        
          kupec:this.kupec,
        
    
        
        
    
        
          stanjeNarocila:this.stanjeNarocila,
        
    
        
          casUstvarjeno:this.casUstvarjeno,
        
    
        
          lokacijaPrevzema:this.lokacijaPrevzema
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceNarocilo.getAll()
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

    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
    }

    this.asset = {
      $class: "org.feri.model.Narocilo",
      
        
         "narociloID":"NAROCILO_" + makeid(),
        
      
        
          "izdelki":this.izdelki.value,
        
      
        
          "kupec":this.kupec.value,
        
      
        
        
      
        
          "stanjeNarocila":this.stanjeNarocila.value,
        
      
        
          "casUstvarjeno":this.casUstvarjeno.value,
        
      
        
          "lokacijaPrevzema":this.lokacijaPrevzema.value
        
      
    };

    this.myForm.setValue({
      
        
          "narociloID":null,
        
      
        
          "izdelki":null,
        
      
        
          "kupec":null,
        
      
        
        
      
        
          "stanjeNarocila":null,
        
      
        
          "casUstvarjeno":null,
        
      
        
          "lokacijaPrevzema":null
        
      
    });

    return this.serviceNarocilo.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "narociloID":null,
        
      
        
          "izdelki":null,
        
      
        
          "kupec":null,
        
      
        
        
      
        
          "stanjeNarocila":null,
        
      
        
          "casUstvarjeno":null,
        
      
        
          "lokacijaPrevzema":null 
        
      
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
      $class: "org.feri.model.Narocilo",
      
        
          
        
    
        
          
            "izdelki":this.izdelki.value,
          
        
    
        
          
            "kupec":this.kupec.value,
          
        
    
        
          
          
        
    
        
          
            "stanjeNarocila":this.stanjeNarocila.value,
          
        
    
        
          
            "casUstvarjeno":this.casUstvarjeno.value,
          
        
    
        
          
            "lokacijaPrevzema":this.lokacijaPrevzema.value
          
        
    
    };

    return this.serviceNarocilo.updateAsset(form.get("narociloID").value,this.asset)
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

    return this.serviceNarocilo.deleteAsset(this.currentId)
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

    return this.serviceNarocilo.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "narociloID":null,
          
        
          
            "izdelki":null,
          
        
          
            "kupec":null,
          
        
          
          
        
          
            "stanjeNarocila":null,
          
        
          
            "casUstvarjeno":null,
          
        
          
            "lokacijaPrevzema":null 
          
        
      };



      
        if(result.narociloID){
          
            formObject.narociloID = result.narociloID;
          
        }else{
          formObject.narociloID = null;
        }
      
        if(result.izdelki){
          
            formObject.izdelki = result.izdelki;
          
        }else{
          formObject.izdelki = null;
        }
      
        if(result.kupec){
          
            formObject.kupec = result.kupec;
          
        }else{
          formObject.kupec = null;
        }
      
      
      
        if(result.stanjeNarocila){
          
            formObject.stanjeNarocila = result.stanjeNarocila;
          
        }else{
          formObject.stanjeNarocila = null;
        }
      
        if(result.casUstvarjeno){
          
            formObject.casUstvarjeno = result.casUstvarjeno;
          
        }else{
          formObject.casUstvarjeno = null;
        }
      
        if(result.lokacijaPrevzema){
          
            formObject.lokacijaPrevzema = result.lokacijaPrevzema;
          
        }else{
          formObject.lokacijaPrevzema = null;
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
      
        
          "narociloID":null,
        
      
        
          "izdelki":null,
        
      
        
          "kupec":null,
        
      
        
        
      
        
          "stanjeNarocila":null,
        
      
        
          "casUstvarjeno":null,
        
      
        
          "lokacijaPrevzema":null 
        
      
      });
  }

}
