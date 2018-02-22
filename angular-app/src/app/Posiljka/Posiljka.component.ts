import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PosiljkaService } from './Posiljka.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Posiljka',
	templateUrl: './Posiljka.component.html',
	styleUrls: ['./Posiljka.component.css'],
  providers: [PosiljkaService]
})
export class PosiljkaComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          posiljkaID = new FormControl("", Validators.required);
        
  
      
          narocilo = new FormControl("", Validators.required);
        
  
      
        
  
      
          stanjePosiljke = new FormControl("", Validators.required);
        
  
      
          zadnjaSprememba = new FormControl("", Validators.required);
        
  
      
          postnaEnota = new FormControl("", Validators.required);
        
  


  constructor(private servicePosiljka:PosiljkaService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          posiljkaID:this.posiljkaID,
        
    
        
          narocilo:this.narocilo,
        
    
        
        
    
        
          stanjePosiljke:this.stanjePosiljke,
        
    
        
          zadnjaSprememba:this.zadnjaSprememba,
        
    
        
          postnaEnota:this.postnaEnota
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicePosiljka.getAll()
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
      $class: "org.feri.model.Posiljka",
      
        
          "posiljkaID":this.posiljkaID.value,
        
      
        
          "narocilo":this.narocilo.value,
        
      
        
        
      
        
          "stanjePosiljke":this.stanjePosiljke.value,
        
      
        
          "zadnjaSprememba":this.zadnjaSprememba.value,
        
      
        
          "postnaEnota":this.postnaEnota.value
        
      
    };

    this.myForm.setValue({
      
        
          "posiljkaID":null,
        
      
        
          "narocilo":null,
        
      
        
        
      
        
          "stanjePosiljke":null,
        
      
        
          "zadnjaSprememba":null,
        
      
        
          "postnaEnota":null
        
      
    });

    return this.servicePosiljka.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "posiljkaID":null,
        
      
        
          "narocilo":null,
        
      
        
        
      
        
          "stanjePosiljke":null,
        
      
        
          "zadnjaSprememba":null,
        
      
        
          "postnaEnota":null 
        
      
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
      $class: "org.feri.model.Posiljka",
      
        
          
        
    
        
          
            "narocilo":this.narocilo.value,
          
        
    
        
          
          
        
    
        
          
            "stanjePosiljke":this.stanjePosiljke.value,
          
        
    
        
          
            "zadnjaSprememba":this.zadnjaSprememba.value,
          
        
    
        
          
            "postnaEnota":this.postnaEnota.value
          
        
    
    };

    return this.servicePosiljka.updateAsset(form.get("posiljkaID").value,this.asset)
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

    return this.servicePosiljka.deleteAsset(this.currentId)
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

    return this.servicePosiljka.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "posiljkaID":null,
          
        
          
            "narocilo":null,
          
        
          
          
        
          
            "stanjePosiljke":null,
          
        
          
            "zadnjaSprememba":null,
          
        
          
            "postnaEnota":null 
          
        
      };



      
        if(result.posiljkaID){
          
            formObject.posiljkaID = result.posiljkaID;
          
        }else{
          formObject.posiljkaID = null;
        }
      
        if(result.narocilo){
          
            formObject.narocilo = result.narocilo;
          
        }else{
          formObject.narocilo = null;
        }
      
       
      
        if(result.stanjePosiljke){
          
            formObject.stanjePosiljke = result.stanjePosiljke;
          
        }else{
          formObject.stanjePosiljke = null;
        }
      
        if(result.zadnjaSprememba){
          
            formObject.zadnjaSprememba = result.zadnjaSprememba;
          
        }else{
          formObject.zadnjaSprememba = null;
        }
      
        if(result.postnaEnota){
          
            formObject.postnaEnota = result.postnaEnota;
          
        }else{
          formObject.postnaEnota = null;
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
      
        
          "posiljkaID":null,
        
      
        
          "narocilo":null,
        
      
        
        
      
        
          "stanjePosiljke":null,
        
      
        
          "zadnjaSprememba":null,
        
      
        
          "postnaEnota":null 
        
      
      });
  }

}
