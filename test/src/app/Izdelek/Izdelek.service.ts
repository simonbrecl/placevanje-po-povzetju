import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Izdelek } from '../org.feri.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class IzdelekService {

	
		private NAMESPACE: string = 'Izdelek';
	



    constructor(private dataService: DataService<Izdelek>) {
    };

    public getAll(): Observable<Izdelek[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Izdelek> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Izdelek> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Izdelek> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Izdelek> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
