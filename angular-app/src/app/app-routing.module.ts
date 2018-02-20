import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { IzdelekComponent } from './Izdelek/Izdelek.component';
import { NarociloComponent } from './Narocilo/Narocilo.component';
import { PosiljkaComponent } from './Posiljka/Posiljka.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Izdelek', component: IzdelekComponent},
		
		{ path: 'Narocilo', component: NarociloComponent},
		
		{ path: 'Posiljka', component: PosiljkaComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
