import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedInComponent } from './checked-in.component';

describe('CheckedInComponent', () => {
  let component: CheckedInComponent;
  let fixture: ComponentFixture<CheckedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckedInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
