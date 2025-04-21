import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFirstTimeComponent } from './login-first-time.component';

describe('LoginFirstTimeComponent', () => {
  let component: LoginFirstTimeComponent;
  let fixture: ComponentFixture<LoginFirstTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFirstTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFirstTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
