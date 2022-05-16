import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCatListComponent } from './admin-cat-list.component';

describe('AdminCatListComponent', () => {
  let component: AdminCatListComponent;
  let fixture: ComponentFixture<AdminCatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
