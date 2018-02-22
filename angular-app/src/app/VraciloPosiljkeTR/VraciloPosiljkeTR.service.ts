import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import {Posiljka, VraciloPosiljke } from '../org.feri.model';

import 'rxjs/Rx';

@Injectable()
export class VraciloPosiljkeTRService {

    private POSILJKA: string = 'Posiljka';
    private VRACILO_POSILJKE: string = 'VraciloPosiljke';

    constructor(private PosiljkaService: DataService<Posiljka>, private VraciloPosiljkeService: DataService<VraciloPosiljke>) {
    };

    public getAllPosiljke(): Observable<Posiljka[]> {
        return this.PosiljkaService.getAll(this.POSILJKA);
    }

    public VraciloPosiljke(itemToAdd: any): Observable<VraciloPosiljke> {
        return this.VraciloPosiljkeService.add(this.VRACILO_POSILJKE, itemToAdd);
      }

}
