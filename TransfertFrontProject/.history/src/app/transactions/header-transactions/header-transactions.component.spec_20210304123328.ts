import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTransactionsComponent } from './header-transactions.component';

describe('HeaderTransactionsComponent', () => {
  let component: HeaderTransactionsComponent;
  let fixture: ComponentFixture<HeaderTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
