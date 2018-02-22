import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';


import 'rxjs/Rx';

@Injectable()
export class VseTransakcijeService {

    private SYSTEM: string = 'Syste,';
    private Transactions;

    constructor(private transakcijeService: DataService<Object> ) {
    };

    public getTransactions(): Observable<Object[]> {
        return this.transakcijeService.transactions();
    }

}
