import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculFraisComponent } from './calcul-frais.component';

describe('CalculFraisComponent', () => {
  let component: CalculFraisComponent;
  let fixture: ComponentFixture<CalculFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculFraisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
