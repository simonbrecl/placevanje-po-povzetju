import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { OddajaNarocilaTRService } from './OddajaNarocilaTR.service';
import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-OddajaNarocilaTR',
	templateUrl: './OddajaNarocilaTR.component.html',
	styleUrls: ['./OddajaNarocilaTR.component.css'],
  	providers: [OddajaNarocilaTRService]
})
export class OddajaNarocilaTRComponent {

  
  myForm: FormGroup;
  private errorMessage;
  private transactionFrom;

  private allAssets;
  private allPostnaEnota;

  private asset;
  private postnaenota;
  
    formPostnaEnotaID = new FormControl("", Validators.required);
	  formAssetID = new FormControl("", Validators.required); 
    action = new FormControl("", Validators.required); 
	  value = new FormControl("", Validators.required);	  
  
  constructor(private serviceTransaction:OddajaNarocilaTRService, fb: FormBuilder) {
      
	  this.myForm = fb.group({
		  
		  formPostnaEnotaID:this.formPostnaEnotaID,
		  formAssetID:this.formAssetID,
      action:this.action,
      value:this.value,
      
    });   
  };

  ngOnInit(): void {
    this.transactionFrom  = true;
    this.loadAllPostnaEnota()
    .then(() => {                     
            this.loadAllAsset();
    });    
  }

  loadAllAsset(): Promise<any> {
    let tempList = [];
    return this.serviceTransaction.getAllAssets()
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
  
    loadAllPostnaEnota(): Promise<any> {
    let tempList = [];
    return this.serviceTransaction.getAllPostnaEnota()
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

        
}
