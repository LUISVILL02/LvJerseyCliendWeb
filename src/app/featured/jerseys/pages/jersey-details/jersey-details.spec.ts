import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JerseyDetails } from './jersey-details';

describe('JerseyDetails', () => {
  let component: JerseyDetails;
  let fixture: ComponentFixture<JerseyDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JerseyDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JerseyDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
