import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Configuration } from '../configuration';
import { DataService } from '../data.service';
import { OddajaNarocilaTRComponent } from './OddajaNarocilaTR.component';
import {OddajaNarocilaTRService} from './OddajaNarocilaTR.service';
describe('TransactionComponent', () => {
  let component: OddajaNarocilaTRComponent;
  let fixture: ComponentFixture<OddajaNarocilaTRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OddajaNarocilaTRComponent ],
imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
providers: [OddajaNarocilaTRService,DataService,Configuration]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OddajaNarocilaTRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
