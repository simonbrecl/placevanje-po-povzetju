import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Prodajalec } from '../org.feri.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ProdajalecService {

	
	private NAMESPACE: string = 'Prodajalec';

    constructor(private dataService: DataService<Prodajalec>) {
    };

    public getAllProdajalec(): Observable<Prodajalec[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getProdajalec(id: any): Observable<Prodajalec> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addProdajalec(itemToAdd: any): Observable<Prodajalec> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateProdajalec(id: any, itemToUpdate: any): Observable<Prodajalec> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteProdajalec(id: any): Observable<Prodajalec> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
