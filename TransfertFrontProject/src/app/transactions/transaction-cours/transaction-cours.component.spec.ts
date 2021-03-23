import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCoursComponent } from './transaction-cours.component';

describe('TransactionCoursComponent', () => {
  let component: TransactionCoursComponent;
  let fixture: ComponentFixture<TransactionCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
