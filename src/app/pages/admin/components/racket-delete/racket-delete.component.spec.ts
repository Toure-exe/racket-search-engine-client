import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacketDeleteComponent } from './racket-delete.component';

describe('RacketDeleteComponent', () => {
  let component: RacketDeleteComponent;
  let fixture: ComponentFixture<RacketDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacketDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RacketDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
