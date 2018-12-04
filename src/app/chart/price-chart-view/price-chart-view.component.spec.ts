import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceChartViewComponent } from './price-chart-view.component';

describe('PriceChartViewComponent', () => {
  let component: PriceChartViewComponent;
  let fixture: ComponentFixture<PriceChartViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceChartViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceChartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
