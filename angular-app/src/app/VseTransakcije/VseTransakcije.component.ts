import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { VseTransakcijeService } from './VseTransakcije.service';
import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'app-VseTransakcijes',
	templateUrl: './VseTransakcije.component.html',
	styleUrls: ['./VseTransakcije.component.css'],
  	providers: [VseTransakcijeService]
})
export class VseTransakcijeComponent {

  private errorMessage;
  private allTransactions;

  private systemTransactions = [];
  private performedTransactions = [];

  constructor(private serviceTransaction:VseTransakcijeService, fb: FormBuilder) {

  };


  ngOnInit(): void {

    this.loadAllTransactions();

  }

  // sortiraj objekte po kljucu
  sortByKey(array, key): Object[] {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  // pridobi vse
  loadAllTransactions(): Promise<any> {

    let tempList = [];
    let systemList = [];
    let performedList = [];

    return this.serviceTransaction.getTransactions()
    .toPromise()
    .then((result) => {
      result = this.sortByKey(result, 'transactionTimestamp');
			this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);

        var importClass = transaction["$class"];
        var importClassArray = importClass.split(".");

        if(importClassArray[1] == 'hyperledger'){
          systemList.push(transaction);
        }
        else {
          performedList.push(transaction);
        }

      });

      this.systemTransactions = systemList;
      this.performedTransactions = performedList;
      this.allTransactions = tempList;
      console.log(this.allTransactions)
      console.log(this.performedTransactions)
      console.log(this.systemTransactions)
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
