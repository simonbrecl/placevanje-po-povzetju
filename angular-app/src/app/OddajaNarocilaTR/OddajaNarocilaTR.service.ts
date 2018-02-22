import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import {Narocilo } from '../org.feri.model';
import {PostnaEnota } from '../org.feri.model';

import 'rxjs/Rx';

@Injectable()
export class OddajaNarocilaTRService {

	  private NAROCILO: string = 'Narocilo';
    private POSTNAENOTA: string = 'PostnaEnota';

    constructor(private PostnaEnotaService: DataService<PostnaEnota>, private narociloService: DataService<Narocilo>) {
    };

    public getAllPostnaEnota(): Observable<PostnaEnota[]> {
        return this.PostnaEnotaService.getAll(this.POSTNAENOTA);
    }

    public getAllAssets(): Observable<Narocilo[]> {
        return this.narociloService.getAll(this.NAROCILO);
    }

}
