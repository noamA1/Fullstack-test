import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccuontsComponent } from './accuonts.component';

describe('AccuontsComponent', () => {
  let component: AccuontsComponent;
  let fixture: ComponentFixture<AccuontsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccuontsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccuontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
