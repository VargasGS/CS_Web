import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoRecetaComponent } from './estado-receta.component';

describe('EstadoRecetaComponent', () => {
  let component: EstadoRecetaComponent;
  let fixture: ComponentFixture<EstadoRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoRecetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
