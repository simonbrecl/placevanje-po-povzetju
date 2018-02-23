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

  private allPosiljke;
  private allPostneEnote;

  private posiljka;
  private postnaEnota;

  private OddajaNarocilaObj;

  private transactionID;

    formPosiljkaID = new FormControl("", Validators.required);
	formPostnaEnotaNaziv = new FormControl("", Validators.required);
    action = new FormControl("", Validators.required);
	value = new FormControl("", Validators.required);

  constructor(private serviceTransaction:OddajaNarocilaTRService, fb: FormBuilder) {

	  this.myForm = fb.group({

		  formPosiljkaID:this.formPosiljkaID,
		  formPostnaEnotaNaziv:this.formPostnaEnotaNaziv,
      action:this.action,
      value:this.value,

    });
  };

  ngOnInit(): void {
    this.transactionFrom  = true;
    this.loadAllPosiljke()
    .then(() => {
            this.loadAllPostneEnote();
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

  loadAllPostneEnote(): Promise<any> {
    let tempList = [];
    return this.serviceTransaction.getAllPostneEnote()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(postnaEnota => {
        tempList.push(postnaEnota);
      });
      this.allPostneEnote = tempList;
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
    console.log(this.allPostneEnote);

    for (let posiljka of this.allPosiljke) {
      console.log(posiljka.posiljkaID);
      if(posiljka.posiljkaID == this.formPosiljkaID.value){
        this.posiljka = posiljka;
      }
    }

    for (let postnaEnota of this.allPostneEnote) {
      console.log(postnaEnota.naziv);
      if(postnaEnota.naziv == this.formPostnaEnotaNaziv.value){
        this.postnaEnota = this.postnaEnota;
      }
    }

    console.log('Action: ' + this.action.value)

   

    this.OddajaNarocilaObj = {
      $class: "org.feri.model.OddajaNarocila",
      "posiljka": this.formPosiljkaID.value,
      "postnaEnota": this.formPostnaEnotaNaziv.value
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
    
