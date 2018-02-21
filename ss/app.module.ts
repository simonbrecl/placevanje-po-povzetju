import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { IzdelekComponent } from './Izdelek/Izdelek.component';
import { NarociloComponent } from './Narocilo/Narocilo.component';
import { KupecComponent } from './Kupec/Kupec.component';
import { PosiljkaComponent } from './Posiljka/Posiljka.component';



@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    IzdelekComponent,
    NarociloComponent,
    KupecComponent,
    PosiljkaComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
