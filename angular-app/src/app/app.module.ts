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
import { ProdajalecComponent } from './Prodajalec/Prodajalec.component';
import { PostnaEnotaComponent } from './PostnaEnota/PostnaEnota.component';
import { PosiljkaComponent } from './Posiljka/Posiljka.component';
import { BankaComponent } from './Banka/Banka.component';
import { PostarComponent } from './Postar/Postar.component';
import { VseTransakcijeComponent } from './VseTransakcije/VseTransakcije.component';
import { OddajaNarocilaTRComponent } from './OddajaNarocilaTR/OddajaNarocilaTR.component';
import { PlaciloNaDomuTRComponent } from './PlaciloNaDomuTR/PlaciloNaDomuTR.component';
import { VraciloPosiljkeTRComponent } from './VraciloPosiljkeTR/VraciloPosiljkeTR.component';
import { PrihodNaPostnoEnotoTRComponent } from './PrihodNaPostnoEnotoTR/PrihodNaPostnoEnotoTR.component';
import { PrevzemNaPostniEnotiTRComponent } from './PrevzemNaPostniEnotiTR/PrevzemNaPostniEnotiTR.component';


@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    IzdelekComponent,
    NarociloComponent,
    KupecComponent,
    ProdajalecComponent,
    PostnaEnotaComponent,
    PosiljkaComponent,
    BankaComponent,
    PostarComponent,
    VseTransakcijeComponent,
    OddajaNarocilaTRComponent,
    PlaciloNaDomuTRComponent,
    VraciloPosiljkeTRComponent
    PrihodNaPostnoEnotoTRComponent,
    PrevzemNaPostniEnotiTRComponent

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
