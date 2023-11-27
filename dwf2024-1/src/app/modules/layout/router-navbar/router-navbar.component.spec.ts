import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterNavbarComponent } from './router-navbar.component';

describe('RouterNavbarComponent', () => {
  let component: RouterNavbarComponent;
  let fixture: ComponentFixture<RouterNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouterNavbarComponent]
    });
    fixture = TestBed.createComponent(RouterNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
