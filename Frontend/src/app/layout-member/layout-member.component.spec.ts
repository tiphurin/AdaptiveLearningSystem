import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMemberComponent } from './layout-member.component';

describe('LayoutMemberComponent', () => {
  let component: LayoutMemberComponent;
  let fixture: ComponentFixture<LayoutMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
