import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Configuration } from '../configuration';
import { DataService } from '../data.service';
import { PostnaEnotaComponent } from './PostnaEnota.component';
import {PostnaEnotaService} from './PostnaEnota.service';
describe('PostnaEnotaComponent', () => {
  let component: PostnaEnotaComponent;
  let fixture: ComponentFixture<PostnaEnotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostnaEnotaComponent ],
imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
providers: [PostnaEnotaService,DataService,Configuration]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostnaEnotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
