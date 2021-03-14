import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotModalComponent } from './depot-modal.component';

describe('DepotModalComponent', () => {
  let component: DepotModalComponent;
  let fixture: ComponentFixture<DepotModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
