import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTeaserComponent } from './book-teaser.component';

describe('BookTeaserComponent', () => {
  let component: BookTeaserComponent;
  let fixture: ComponentFixture<BookTeaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTeaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
