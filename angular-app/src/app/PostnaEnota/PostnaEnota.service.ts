import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { PostnaEnota } from '../org.feri.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class PostnaEnotaService {

	
	private NAMESPACE: string = 'PostnaEnota';

    constructor(private dataService: DataService<PostnaEnota>) {
    };

    public getAllPostnaEnota(): Observable<PostnaEnota[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getPostnaEnota(id: any): Observable<PostnaEnota> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addPostnaEnota(itemToAdd: any): Observable<PostnaEnota> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updatePostnaEnota(id: any, itemToUpdate: any): Observable<PostnaEnota> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deletePostnaEnota(id: any): Observable<PostnaEnota> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
