/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditSystemEvoluationComponent } from './edit-system-evoluation.component';

describe('EditSystemEvoluationComponent', () => {
  let component: EditSystemEvoluationComponent;
  let fixture: ComponentFixture<EditSystemEvoluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSystemEvoluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSystemEvoluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
