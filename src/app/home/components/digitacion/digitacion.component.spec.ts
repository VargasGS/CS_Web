import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitacionComponent } from './digitacion.component';

describe('DigitacionComponent', () => {
  let component: DigitacionComponent;
  let fixture: ComponentFixture<DigitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
