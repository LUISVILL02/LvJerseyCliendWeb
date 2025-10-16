import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardJersey } from './card-jersey';

describe('CardJersey', () => {
  let component: CardJersey;
  let fixture: ComponentFixture<CardJersey>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardJersey]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardJersey);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
