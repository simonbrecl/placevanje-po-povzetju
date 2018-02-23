import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import {Posiljka, PostnaEnota, OddajaNarocila } from '../org.feri.model';

import 'rxjs/Rx';

@Injectable()
export class OddajaNarocilaTRService {

	private POSTNA_ENOTA: string = 'PostnaEnota';
    private POSILJKA: string = 'Posiljka';
    private ODDAJA_NAROCILA: string = 'OddajaNarocila';

    constructor(private PosiljkaService: DataService<Posiljka>, private PostnaEnotaService: DataService<PostnaEnota>, private OddajaNarocilaService: DataService<OddajaNarocila>) {
    };

    public getAllPosiljke(): Observable<Posiljka[]> {
        return this.PosiljkaService.getAll(this.POSILJKA);
    }

    public getAllPostneEnote(): Observable<PostnaEnota[]> {
        return this.PostnaEnotaService.getAll(this.POSTNA_ENOTA);
    }

    public OddajaNarocila(itemToAdd: any): Observable<OddajaNarocila> {
        return this.OddajaNarocilaService.add(this.ODDAJA_NAROCILA, itemToAdd);
      }

}
