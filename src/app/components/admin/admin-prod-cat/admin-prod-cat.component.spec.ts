import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProdCatComponent } from './admin-prod-cat.component';

describe('AdminProdCatComponent', () => {
  let component: AdminProdCatComponent;
  let fixture: ComponentFixture<AdminProdCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProdCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
