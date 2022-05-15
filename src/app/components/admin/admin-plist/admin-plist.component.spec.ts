import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlistComponent } from './admin-plist.component';

describe('AdminPlistComponent', () => {
  let component: AdminPlistComponent;
  let fixture: ComponentFixture<AdminPlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
