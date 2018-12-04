import { ComparisonViewModule } from './comparison-view.module';

describe('ComparisonViewModule', () => {
  let comparisonViewModule: ComparisonViewModule;

  beforeEach(() => {
    comparisonViewModule = new ComparisonViewModule();
  });

  it('should create an instance', () => {
    expect(comparisonViewModule).toBeTruthy();
  });
});
