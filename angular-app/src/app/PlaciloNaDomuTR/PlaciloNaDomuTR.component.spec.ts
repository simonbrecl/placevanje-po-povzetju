import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Configuration } from '../configuration';
import { DataService } from '../data.service';
import { PlaciloNaDomuTRComponent } from './PlaciloNaDomuTR.component';
import {PlaciloNaDomuTRService} from './PlaciloNaDomuTR.service';

describe('TransactionComponent', () => {
  let component: PlaciloNaDomuTRComponent;
  let fixture: ComponentFixture<PlaciloNaDomuTRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaciloNaDomuTRComponent ],
imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
providers: [PlaciloNaDomuTRService,DataService,Configuration]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaciloNaDomuTRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
