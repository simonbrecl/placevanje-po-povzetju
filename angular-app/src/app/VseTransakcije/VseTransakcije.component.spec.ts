import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Configuration } from '../configuration';
import { DataService } from '../data.service';
import { VseTransakcijeComponent } from './VseTransakcije.component';
import {VseTransakcijeService} from './VseTransakcije.service';
describe('VseTransakcijeComponent', () => {
  let component: VseTransakcijeComponent;
  let fixture: ComponentFixture<VseTransakcijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VseTransakcijeComponent ],
imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
providers: [VseTransakcijeService,DataService,Configuration]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VseTransakcijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
