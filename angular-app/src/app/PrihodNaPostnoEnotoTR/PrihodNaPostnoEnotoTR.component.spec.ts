import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Configuration } from '../configuration';
import { DataService } from '../data.service';
import { PrihodNaPostnoEnotoTRComponent } from './PrihodNaPostnoEnotoTR.component';
import {PrihodNaPostnoEnotoTRService} from './PrihodNaPostnoEnotoTR.service';

describe('TransactionComponent', () => {
  let component: PrihodNaPostnoEnotoTRComponent;
  let fixture: ComponentFixture<PrihodNaPostnoEnotoTRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrihodNaPostnoEnotoTRComponent ],
imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
providers: [PrihodNaPostnoEnotoTRService,DataService,Configuration]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrihodNaPostnoEnotoTRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
