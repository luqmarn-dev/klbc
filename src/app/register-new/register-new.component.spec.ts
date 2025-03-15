import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewComponent } from './register-new.component';

describe('RegisterNewComponent', () => {
  let component: RegisterNewComponent;
  let fixture: ComponentFixture<RegisterNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
