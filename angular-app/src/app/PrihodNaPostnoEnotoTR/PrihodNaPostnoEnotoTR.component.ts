import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { PrihodNaPostnoEnotoTRService } from './PrihodNaPostnoEnotoTR.service';
import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-PrihodNaPostnoEnotoTR',
	templateUrl: './PrihodNaPostnoEnotoTR.component.html',
	styleUrls: ['./PrihodNaPostnoEnotoTR.component.css'],
  	providers: [PrihodNaPostnoEnotoTRService]
})
export class PrihodNaPostnoEnotoTRComponent {

  myForm: FormGroup;
  private errorMessage;
  private transactionFrom;

  private allPosiljke;
  private allPostarji;

  private posiljka;
  private postar;

  private PrihodNaPostnoEnotoObj;

  private transactionID;

    formPosiljkaID = new FormControl("", Validators.required);
	  formPostarID = new FormControl("", Validators.required);
    action = new FormControl("", Validators.required);
	  value = new FormControl("", Validators.required);

  constructor(private serviceTransaction:PrihodNaPostnoEnotoTRService, fb: FormBuilder) {

	  this.myForm = fb.group({

		  formPosiljkaID:this.formPosiljkaID,
		  formPostarID:this.formPostarID,
      action:this.action,
      value:this.value,

    });
  };

  ngOnInit(): void {
    this.transactionFrom  = true;
    this.loadAllPosiljke()
    .then(() => {
            this.loadAllPostarji();
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

  loadAllPostarji(): Promise<any> {
    let tempList = [];
    return this.serviceTransaction.getAllPostarji()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(postar => {
        tempList.push(postar);
      });
      this.allPostarji = tempList;
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
    console.log(this.allPostarji);

    for (let posiljka of this.allPosiljke) {
      console.log(posiljka.posiljkaID);
      if(posiljka.posiljkaID == this.formPosiljkaID.value){
        this.posiljka = posiljka;
      }
    }

    for (let postar of this.allPostarji) {
      console.log(postar.postarID);
      if(postar.postarID == this.formPostarID.value){
        this.postar = postar;
      }
    }

    console.log('Action: ' + this.action.value)

   

    this.PrihodNaPostnoEnotoObj = {
      $class: "org.feri.model.PrihodNaPostnoEnoto",
      "posiljka": this.formPosiljkaID.value,
      "postar": this.formPostarID.value
    };

    return this.serviceTransaction.PrihodNaPostnoEnoto(this.PrihodNaPostnoEnotoObj)
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
    
