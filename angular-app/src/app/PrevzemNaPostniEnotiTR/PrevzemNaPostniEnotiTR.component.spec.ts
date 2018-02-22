import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Configuration } from '../configuration';
import { DataService } from '../data.service';
import { PrevzemNaPostniEnotiTRComponent } from './PrevzemNaPostniEnotiTR.component';
import {PrevzemNaPostniEnotiTRService} from './PrevzemNaPostniEnotiTR.service';
describe('TransactionComponent', () => {
  let component: PrevzemNaPostniEnotiTRComponent;
  let fixture: ComponentFixture<PrevzemNaPostniEnotiTRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevzemNaPostniEnotiTRComponent ],
imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
providers: [PrevzemNaPostniEnotiTRService,DataService,Configuration]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevzemNaPostniEnotiTRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});