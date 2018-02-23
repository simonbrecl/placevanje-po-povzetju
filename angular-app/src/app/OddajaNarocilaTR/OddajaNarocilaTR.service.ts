import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import {Narocilo, PostnaEnota, OddajaNarocila } from '../org.feri.model';

import 'rxjs/Rx';

@Injectable()
export class OddajaNarocilaTRService {

	private POSTNA_ENOTA: string = 'PostnaEnota';
    private NAROCILO: string = 'Narocilo';
    private ODDAJA_NAROCILA: string = 'OddajaNarocila';

    constructor(private NarociloService: DataService<Narocilo>, private PostnaEnotaService: DataService<PostnaEnota>, private OddajaNarocilaService: DataService<OddajaNarocila>) {
    };

    public getAllNarocila(): Observable<Narocilo[]> {
        return this.NarociloService.getAll(this.NAROCILO);
    }

    public getAllPostneEnote(): Observable<PostnaEnota[]> {
        return this.PostnaEnotaService.getAll(this.POSTNA_ENOTA);
    }

    public OddajaNarocila(itemToAdd: any): Observable<OddajaNarocila> {
        return this.OddajaNarocilaService.add(this.ODDAJA_NAROCILA, itemToAdd);
      }

}
