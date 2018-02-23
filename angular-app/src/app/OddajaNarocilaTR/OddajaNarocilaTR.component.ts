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
  private allPostneEnote;

  private narocilo;
  private postnaEnota;

  private OddajaNarocilaObj;

  private transactionID;

    formNarociloID = new FormControl("", Validators.required);
	formPostnaEnotaNaziv = new FormControl("", Validators.required);
    action = new FormControl("", Validators.required);
	value = new FormControl("", Validators.required);

  constructor(private serviceTransaction:OddajaNarocilaTRService, fb: FormBuilder) {

	  this.myForm = fb.group({

		  formNarociloID:this.formNarociloID,
		  formPostnaEnotaNaziv:this.formPostnaEnotaNaziv,
      action:this.action,
      value:this.value,

    });
  };

  ngOnInit(): void {
    this.transactionFrom  = true;
    this.loadAllNarocila()
    .then(() => {
            this.loadAllPostneEnote();
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

    console.log(this.allNarocila);
    console.log(this.allPostneEnote);

    for (let narocilo of this.allNarocila) {
      console.log(narocilo.narociloID);
      if(narocilo.narociloID == this.formNarociloID.value){
        this.narocilo = narocilo;
      }
    }

    for (let postnaEnota of this.allPostneEnote) {
      console.log(postnaEnota.naziv);
      if(postnaEnota.naziv == this.formPostnaEnotaNaziv.value){
        this.postnaEnota = postnaEnota;
      }
    }

    console.log('Action: ' + this.action.value)

   

    this.OddajaNarocilaObj = {
      $class: "org.feri.model.OddajaNarocila",
      "narocilo": this.formNarociloID.value,
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
    
