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

    public getAll(): Observable<Kupec[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getParticipant(id: any): Observable<Kupec> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addParticipant(itemToAdd: any): Observable<Kupec> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public UpdateParticipant(id: any, itemToUpdate: any): Observable<Kupec> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteParticipant(id: any): Observable<Kupec> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
