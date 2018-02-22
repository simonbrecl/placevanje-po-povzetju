import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Configuration } from '../configuration';
import { DataService } from '../data.service';
import { VraciloPosiljkeTRComponent } from './VraciloPosiljkeTR.component';
import {VraciloPosiljkeTRService} from './VraciloPosiljkeTR.service';

describe('TransactionComponent', () => {
  let component: VraciloPosiljkeTRComponent;
  let fixture: ComponentFixture<VraciloPosiljkeTRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VraciloPosiljkeTRComponent ],
imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
providers: [VraciloPosiljkeTRService,DataService,Configuration]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VraciloPosiljkeTRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
