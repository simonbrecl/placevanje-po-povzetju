import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import {Postar, Posiljka, PlaciloNaDomu } from '../org.feri.model';

import 'rxjs/Rx';

@Injectable()
export class PlaciloNaDomuTRService {

	private POSTAR: string = 'Postar';
    private POSILJKA: string = 'Posiljka';
    private PLACILO_NA_DOMU: string = 'PlaciloNaDomu';

    constructor(private PosiljkaService: DataService<Posiljka>, private PostarService: DataService<Postar>, private PlaciloNaDomuService: DataService<PlaciloNaDomu>) {
    };

    public getAllPosiljke(): Observable<Posiljka[]> {
        return this.PosiljkaService.getAll(this.POSILJKA);
    }

    public getAllPostarji(): Observable<Postar[]> {
        return this.PostarService.getAll(this.POSTAR);
    }

    public PlaciloNaDomu(itemToAdd: any): Observable<PlaciloNaDomu> {
        return this.PlaciloNaDomuService.add(this.PLACILO_NA_DOMU, itemToAdd);
      }

}
