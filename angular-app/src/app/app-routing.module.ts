import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { IzdelekComponent } from './Izdelek/Izdelek.component';
import { NarociloComponent } from './Narocilo/Narocilo.component';
import { KupecComponent } from './Kupec/Kupec.component';
import { ProdajalecComponent } from './Prodajalec/Prodajalec.component';
import { PostnaEnotaComponent } from './PostnaEnota/PostnaEnota.component';
import { PostarComponent } from './Postar/Postar.component';
import { BankaComponent } from './Banka/Banka.component';
import { PosiljkaComponent } from './Posiljka/Posiljka.component';
import { VseTransakcijeComponent } from './VseTransakcije/VseTransakcije.component';
import { OddajaNarocilaTRComponent } from './OddajaNarocilaTR/OddajaNarocilaTR.component';
import { PlaciloNaDomuTRComponent } from './PlaciloNaDomuTR/PlaciloNaDomuTR.component';



const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Izdelek', component: IzdelekComponent},
		
    { path: 'Narocilo', component: NarociloComponent},
    { path: 'Kupec', component: KupecComponent},
    { path: 'Prodajalec', component: ProdajalecComponent},
    { path: 'PostnaEnota', component: PostnaEnotaComponent},
    { path: 'Postar', component: PostarComponent},
    { path: 'Banka', component: BankaComponent},
    { path: 'Posiljka', component: PosiljkaComponent},
    { path: 'VseTransakcije', component: VseTransakcijeComponent},
    { path: 'OddajaNarocilaTR', component: OddajaNarocilaTRComponent},
    { path: 'PlaciloNaDomuTR', component: PlaciloNaDomuTRComponent},

		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
