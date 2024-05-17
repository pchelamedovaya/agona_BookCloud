import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBooksByGenreListComponent } from './all-books-by-genre-list.component';

describe('AllBooksByGenreListComponent', () => {
  let component: AllBooksByGenreListComponent;
  let fixture: ComponentFixture<AllBooksByGenreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBooksByGenreListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllBooksByGenreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
