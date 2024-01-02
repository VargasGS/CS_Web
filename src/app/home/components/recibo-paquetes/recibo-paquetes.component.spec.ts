import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboPaquetesComponent } from './recibo-paquetes.component';

describe('ReciboPaquetesComponent', () => {
  let component: ReciboPaquetesComponent;
  let fixture: ComponentFixture<ReciboPaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciboPaquetesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciboPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
