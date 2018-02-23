import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { VraciloPosiljkeTRService } from './VraciloPosiljkeTR.service';
import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-VraciloPosiljkeTR',
	templateUrl: './VraciloPosiljkeTR.component.html',
	styleUrls: ['./VraciloPosiljkeTR.component.css'],
  	providers: [VraciloPosiljkeTRService]
})
export class VraciloPosiljkeTRComponent {

  myForm: FormGroup;
  private errorMessage;
  private transactionFrom;

  private allPosiljke;

  private posiljka;

  private PosiljkaObj;

  private transactionID;

    formPosiljkaID = new FormControl("", Validators.required);
    action = new FormControl("", Validators.required);
	  value = new FormControl("", Validators.required);

  constructor(private serviceTransaction:VraciloPosiljkeTRService, fb: FormBuilder) {

	  this.myForm = fb.group({

		  formPosiljkaID:this.formPosiljkaID,
      action:this.action,
      value:this.value,

    });
  };

  ngOnInit(): void {
    this.transactionFrom  = true;
    this.loadAllPosiljke();
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
        this.posiljka = posiljka;
      }
    }

    console.log('Action: ' + this.action.value)

   

    this.PosiljkaObj = {
      $class: "org.feri.model.VraciloPosiljke",
      "posiljka": this.formPosiljkaID.value,
    };

    return this.serviceTransaction.VraciloPosiljke(this.PosiljkaObj)
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
    
