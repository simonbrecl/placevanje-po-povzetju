import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Kupec } from '../org.feri.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class KupecService {

	
	private NAMESPACE: string = 'Kupec';

    constructor(private dataService: DataService<Kupec>) {
    };

    public getAllKupec(): Observable<Kupec[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getKupec(id: any): Observable<Kupec> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addKupec(itemToAdd: any): Observable<Kupec> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateKupec(id: any, itemToUpdate: any): Observable<Kupec> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteKupec(id: any): Observable<Kupec> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
