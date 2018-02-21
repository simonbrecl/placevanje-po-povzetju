import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { KupecService } from './Kupec.service';

import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'appKupec',
	templateUrl: './Kupec.component.html',
	styleUrls: ['./Kupec.component.css'],
  providers: [KupecService]
})
export class KupecComponent implements OnInit {

  myForm: FormGroup;

  private allparticipants;
  private participant;
  private currentId;
  private errorMessage;
          kupecID = new FormControl("", Validators.required);
          ime = new FormControl("", Validators.required);
          priimek = new FormControl("", Validators.required);
          email = new FormControl("", Validators.required);
          kraj = new FormControl("", Validators.required);
          postnaSt = new FormControl("", Validators.required);
          ulica = new FormControl("", Validators.required);
          hisnaSt = new FormControl("", Validators.required);
          stanje = new FormControl("", Validators.required);
          banka = new FormControl("", Validators.required);

  constructor(private serviceKupec:KupecService, fb: FormBuilder) {
    this.myForm = fb.group({
         
        kupecID:this.kupecID,
        ime:this.ime,
        priimek:this.priimek,        
        email:this.email,
        kraj:this.kraj,
        postnaSt:this.postnaSt,
        ulica:this.ulica,
        hisnaSt:this.hisnaSt,
        stanje:this.stanje,
        banka:this.banka
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceKupec.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
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
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.feri.model.Kupec",

      "kupecID":this.kupecID.value,
      "ime":this.ime.value,
      "priimek":this.priimek.value,        
      "email":this.email.value,
      "kraj":this.kraj.value,
      "postnaSt":this.postnaSt.value,
      "ulica":this.ulica.value,
      "hisnaSt":this.hisnaSt.value,
      "stanje":this.stanje.value,
      "banka":this.banka.value
    };

    this.myForm.setValue({
      "kupecID":null,
      "ime":null,
      "priimek":null,        
      "email":null,
      "kraj":null,
      "postnaSt":null,
      "ulica":null,
      "hisnaSt":null,
      "stanje":null,
      "banka":null
    });

    return this.serviceKupec.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({

      "kupecID":null,
      "ime":null,
      "priimek":null,        
      "email":null,
      "kraj":null,
      "postnaSt":null,
      "ulica":null,
      "hisnaSt":null,
      "stanje":null,
      "banka":null

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


   UpdateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.feri.model.Kupec",


      "kupecID":this.kupecID.value,
      "ime":this.ime.value,
      "priimek":this.priimek.value,        
      "email":this.email.value,
      "kraj":this.kraj.value,
      "postnaSt":this.postnaSt.value,
      "ulica":this.ulica.value,
      "hisnaSt":this.hisnaSt.value,
      "stanje":this.stanje.value,
      "banka":this.banka.value

    };

    return this.serviceKupec.UpdateParticipant(form.get("kupecID").value,this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceKupec.deleteParticipant(this.currentId)
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

    return this.serviceKupec.getParticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {

      "kupecID":null,
      "ime":null,
      "priimek":null,        
      "email":null,
      "kraj":null,
      "postnaSt":null,
      "ulica":null,
      "hisnaSt":null,
      "stanje":null,
      "banka":null

      };


        if(result.kupecID){

            formObject.kupecID = result.kupecID;

        }else{
          formObject.kupecID = null;
        }

        if(result.ime){

            formObject.ime = result.ime;

        }else{
          formObject.ime = null;
        }

        if(result.priimek){

            formObject.priimek = result.priimek;

        }else{
          formObject.priimek = null;
        }

        if(result.email){

            formObject.email = result.email;

        }else{
          formObject.email = null;
        }
        if(result.naslov){

            formObject.postnaSt = result.naslov;

        }else{
          formObject.postnaSt = null;
        }
        if(result.naslov){

            formObject.ulica = result.naslov;

        }else{
          formObject.ulica = null;
        }
        if(result.naslov){

            formObject.hisnaSt = result.naslov;

        }else{
          formObject.hisnaSt = null;
        }
        if(result.naslov){

            formObject.kraj = result.naslov;

        }else{
          formObject.kraj = null;
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

        "kupecID":null,
        "ime":null,
        "priimek":null,        
        "email":null,
        "kraj":null,
        "postnaSt":null,
        "ulica":null,
        "hisnaSt":null,
        "stanje":null,
        "banka":null
      });
  }

}
