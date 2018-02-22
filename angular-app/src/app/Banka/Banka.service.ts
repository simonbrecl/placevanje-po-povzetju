import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Banka } from '../org.feri.model';
import 'rxjs/Rx';

@Injectable()
export class BankaService {

	
	private NAMESPACE: string = 'Banka';

    constructor(private dataService: DataService<Banka>) {
    };

    public getAllBanka(): Observable<Banka[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getBanka(id: any): Observable<Banka> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addBanka(itemToAdd: any): Observable<Banka> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateBanka(id: any, itemToUpdate: any): Observable<Banka> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteBanka(id: any): Observable<Banka> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
