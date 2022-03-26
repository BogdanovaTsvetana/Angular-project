import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNannyComponent } from './details-nanny.component';

describe('DetailsNannyComponent', () => {
  let component: DetailsNannyComponent;
  let fixture: ComponentFixture<DetailsNannyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsNannyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsNannyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
