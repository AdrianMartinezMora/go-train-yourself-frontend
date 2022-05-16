import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCatFormComponent } from './admin-cat-form.component';

describe('AdminCatFormComponent', () => {
  let component: AdminCatFormComponent;
  let fixture: ComponentFixture<AdminCatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCatFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
