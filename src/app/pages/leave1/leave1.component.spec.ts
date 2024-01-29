import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Leave1Component } from './leave1.component';

describe('Leave1Component', () => {
  let component: Leave1Component;
  let fixture: ComponentFixture<Leave1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Leave1Component]
    });
    fixture = TestBed.createComponent(Leave1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
