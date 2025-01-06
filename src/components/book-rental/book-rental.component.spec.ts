import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRentalComponent } from './book-rental.component';

describe('BookRentalComponent', () => {
  let component: BookRentalComponent;
  let fixture: ComponentFixture<BookRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookRentalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
