import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { PrevzemNaPostniEnotiTRService } from './PrevzemNaPostniEnotiTR.service';
import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-PrevzemNaPostniEnotiTR',
	templateUrl: './PrevzemNaPostniEnotiTR.component.html',
	styleUrls: ['./PrevzemNaPostniEnotiTR.component.css'],
  	providers: [PrevzemNaPostniEnotiTRService]
})
export class PrevzemNaPostniEnotiTRComponent {

  myForm: FormGroup;
  private errorMessage;
  private transactionFrom;

  private allPosiljke;

  private posiljkaa;

  private PrevzemNaPostniEnotiObj;

  private transactionID;

    formPosiljkaID = new FormControl("", Validators.required);
    action = new FormControl("", Validators.required);
	value = new FormControl("", Validators.required);

  constructor(private serviceTransaction:PrevzemNaPostniEnotiTRService, fb: FormBuilder) {

	  this.myForm = fb.group({

		  formPosiljkaID:this.formPosiljkaID,
      action:this.action,
      value:this.value,

    });
  };

  ngOnInit(): void {
    this.transactionFrom  = false;
    this.loadAllPosiljke()
    .then(() => {                     
            this.transactionFrom  = true;
    });

  }

  loadAllPosiljke(): Promise<any> {
    let tempList = [];
    return this.serviceTransaction.getAllPosiljke()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(posiljka => {
        tempList.push(posiljka);
      });
      this.allPosiljke = tempList;
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

    console.log(this.allPosiljke);

    for (let posiljka of this.allPosiljke) {
      console.log(posiljka.posiljkaID);
      if(posiljka.posiljkaID == this.formPosiljkaID.value){
        this.posiljkaa = posiljka;
      }
    }

    console.log('Action: ' + this.action.value)

   

    this.PrevzemNaPostniEnotiObj = {
      $class: "org.feri.model.PrevzemNaPostniEnoti",
      "posiljka": this.formPosiljkaID.value,
      "namenStranke": this.action.value

    };

    return this.serviceTransaction.PrevzemNaPostniEnoti(this.PrevzemNaPostniEnotiObj)
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
    
