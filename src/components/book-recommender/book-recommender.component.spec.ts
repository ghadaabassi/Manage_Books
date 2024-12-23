import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRecommenderComponent } from './book-recommender.component';

describe('BookRecommenderComponent', () => {
  let component: BookRecommenderComponent;
  let fixture: ComponentFixture<BookRecommenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookRecommenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookRecommenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
