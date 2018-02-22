import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import {Postar, Posiljka, PrihodNaPostnoEnoto } from '../org.feri.model';

import 'rxjs/Rx';

@Injectable()
export class PrihodNaPostnoEnotoTRService {

	private POSTAR: string = 'Postar';
    private POSILJKA: string = 'Posiljka';
    private PLACILO_NA_DOMU: string = 'PlaciloNaDomu';

    constructor(private PosiljkaService: DataService<Posiljka>, private PostarService: DataService<Postar>, private PrihodNaPostnoEnotoService: DataService<PrihodNaPostnoEnoto>) {
    };

    public getAllPosiljke(): Observable<Posiljka[]> {
        return this.PosiljkaService.getAll(this.POSILJKA);
    }

    public getAllPostarji(): Observable<Postar[]> {
        return this.PostarService.getAll(this.POSTAR);
    }

    public PrihodNaPostnoEnoto(itemToAdd: any): Observable<PrihodNaPostnoEnoto> {
        return this.PrihodNaPostnoEnotoService.add(this.PLACILO_NA_DOMU, itemToAdd);
      }

}
