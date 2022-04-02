import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNannyComponent } from './create-nanny.component';

describe('CreateNannyComponent', () => {
  let component: CreateNannyComponent;
  let fixture: ComponentFixture<CreateNannyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNannyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNannyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
