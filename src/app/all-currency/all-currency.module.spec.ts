import { AllCurrencyModule } from './all-currency.module';

describe('AllCurrencyModule', () => {
  let allCurrencyModule: AllCurrencyModule;

  beforeEach(() => {
    allCurrencyModule = new AllCurrencyModule();
  });

  it('should create an instance', () => {
    expect(allCurrencyModule).toBeTruthy();
  });
});
