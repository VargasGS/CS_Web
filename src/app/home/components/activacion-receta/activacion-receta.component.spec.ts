import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivacionRecetaComponent } from './activacion-receta.component';

describe('ActivacionRecetaComponent', () => {
  let component: ActivacionRecetaComponent;
  let fixture: ComponentFixture<ActivacionRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivacionRecetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivacionRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
