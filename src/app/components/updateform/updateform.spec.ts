import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateform } from './updateform';

describe('Updateform', () => {
  let component: Updateform;
  let fixture: ComponentFixture<Updateform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
