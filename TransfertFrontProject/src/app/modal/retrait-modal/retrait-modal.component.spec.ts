import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetraitModalComponent } from './retrait-modal.component';

describe('RetraitModalComponent', () => {
  let component: RetraitModalComponent;
  let fixture: ComponentFixture<RetraitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetraitModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetraitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
