/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddSystemEvoluationComponent } from './add-system-evoluation.component';

describe('AddSystemEvaluationComponent', () => {
  let component: AddSystemEvoluationComponent;
  let fixture: ComponentFixture<AddSystemEvoluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSystemEvoluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSystemEvoluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
