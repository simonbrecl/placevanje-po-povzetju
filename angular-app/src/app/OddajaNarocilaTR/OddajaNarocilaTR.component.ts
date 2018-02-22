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

  private allNarocila;
  private allPostnaEnota;

  private narocilo;
  private postnaenota;

  private OddajaNarocilaObj;

  private transactionID;
  
    formPostnaEnotaID = new FormControl("", Validators.required);
	  formNarociloID = new FormControl("", Validators.required); 
    action = new FormControl("", Validators.required); 
	  value = new FormControl("", Validators.required);	  
  
  constructor(private serviceTransaction:OddajaNarocilaTRService, fb: FormBuilder) {
      
	  this.myForm = fb.group({
		  
		  formPostnaEnotaID:this.formPostnaEnotaID,
		  formNarociloID:this.formNarociloID,
      action:this.action,
      value:this.value,
      
    });   
  };

  ngOnInit(): void {
    this.transactionFrom  = true;
    this.loadAllNarocila()
    .then(() => {                     
            this.loadAllPostnaEnota();
    });    
  }

  loadAllNarocila(): Promise<any> {
    let tempList = [];
    return this.serviceTransaction.getAllNarocila()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(narocilo => {
        tempList.push(narocilo);
      });
      this.allNarocila = tempList;
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

  execute(form: any): Promise<any> {

    console.log(this.allNarocila);
    console.log(this.allPostnaEnota);

    for (let postnaenota of this.allPostnaEnota) {
      console.log(postnaenota.posiljkaID);
      if(postnaenota.postnaEnotaID == this.formPostnaEnotaID.value){
        this.postnaenota = postnaenota;
      }
    }

    for (let narocilo of this.allNarocila) {
      console.log(narocilo.postarID);
      if(narocilo.postarID == this.formNarociloID.value){
        this.narocilo = narocilo;
      }
    }

    console.log('Action: ' + this.action.value)



    this.OddajaNarocilaObj = {
      $class: "org.feri.model.OddajaNarocila",
      "narocilo": this.formNarociloID.value,
      "postnaenota": this.formPostnaEnotaID.value,
    };

    return this.serviceTransaction.OddajaNarocila(this.OddajaNarocilaObj)
            .toPromise()
            .then((result) => {
              this.errorMessage = null;
              this.transactionID = result.transactionId;
              console.log(result)
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
            })
            .then(() => {
              this.transactionFrom = false;
            });
          }

        
}
