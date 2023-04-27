import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNannyComponent } from './profile-nanny.component';

describe('EditNannyComponent', () => {
  let component: EditNannyComponent;
  let fixture: ComponentFixture<EditNannyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNannyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNannyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
