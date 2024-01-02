import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaRecetaComponent } from './entrega-receta.component';

describe('EntregaRecetaComponent', () => {
  let component: EntregaRecetaComponent;
  let fixture: ComponentFixture<EntregaRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaRecetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
