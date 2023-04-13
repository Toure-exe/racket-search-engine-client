import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRacketComponent } from './detail-racket.component';

describe('DetailRacketComponent', () => {
  let component: DetailRacketComponent;
  let fixture: ComponentFixture<DetailRacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRacketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
