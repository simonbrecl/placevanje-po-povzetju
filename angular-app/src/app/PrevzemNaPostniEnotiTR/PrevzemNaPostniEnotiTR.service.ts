import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import {Posiljka, PrevzemNaPostniEnoti } from '../org.feri.model';

import 'rxjs/Rx';

@Injectable()
export class PlaciloNaDomuTRService {

	private POSTAR: string = 'Postar';
    private POSILJKA: string = 'Posiljka';
    private PREVZEM_NA_POSTNI_ENOTI: string = 'PrevzemNaPostniEnoti';

    constructor(private PosiljkaService: DataService<Posiljka>, private PrevzemNaPostniEnotiService: DataService<PrevzemNaPostniEnoti>) {
    };

    public getAllPosiljke(): Observable<Posiljka[]> {
        return this.PosiljkaService.getAll(this.POSILJKA);
    }

    public PrevzemNaPostniEnoti(itemToAdd: any): Observable<PrevzemNaPostniEnoti> {
        return this.PrevzemNaPostniEnotiService.add(this.PREVZEM_NA_POSTNI_ENOTI, itemToAdd);
      }

}
