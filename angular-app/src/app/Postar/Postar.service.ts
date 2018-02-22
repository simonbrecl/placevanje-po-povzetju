import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Postar } from '../org.feri.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class PostarService {

	
	private NAMESPACE: string = 'Postar';

    constructor(private dataService: DataService<Postar>) {
    };

    public getAllPostar(): Observable<Postar[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getPostar(id: any): Observable<Postar> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addPostar(itemToAdd: any): Observable<Postar> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updatePostar(id: any, itemToUpdate: any): Observable<Postar> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deletePostar(id: any): Observable<Postar> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
