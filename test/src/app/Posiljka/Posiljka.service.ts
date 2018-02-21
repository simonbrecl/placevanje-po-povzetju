import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Posiljka } from '../org.feri.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class PosiljkaService {

	
		private NAMESPACE: string = 'Posiljka';
	



    constructor(private dataService: DataService<Posiljka>) {
    };

    public getAll(): Observable<Posiljka[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Posiljka> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Posiljka> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Posiljka> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Posiljka> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
