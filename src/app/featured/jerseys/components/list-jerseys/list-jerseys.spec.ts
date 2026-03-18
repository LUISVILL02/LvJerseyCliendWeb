import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJerseys } from './list-jerseys';

describe('ListJerseys', () => {
  let component: ListJerseys;
  let fixture: ComponentFixture<ListJerseys>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListJerseys]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListJerseys);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
