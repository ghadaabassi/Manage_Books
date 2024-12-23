import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeBooksComponent } from './free-books.component';

describe('FreeBooksComponent', () => {
  let component: FreeBooksComponent;
  let fixture: ComponentFixture<FreeBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
