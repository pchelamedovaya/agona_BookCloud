import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBooksListComponent } from './all-books-list.component';

describe('AllBooksListComponent', () => {
  let component: AllBooksListComponent;
  let fixture: ComponentFixture<AllBooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBooksListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
