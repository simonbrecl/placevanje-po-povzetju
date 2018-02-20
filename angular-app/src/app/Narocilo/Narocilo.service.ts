import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Narocilo } from '../org.feri.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class NarociloService {

	
		private NAMESPACE: string = 'Narocilo';
	



    constructor(private dataService: DataService<Narocilo>) {
    };

    public getAll(): Observable<Narocilo[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Narocilo> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Narocilo> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Narocilo> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Narocilo> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
