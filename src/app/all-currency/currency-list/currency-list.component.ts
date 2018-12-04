import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../core/service/crypto.service';
import { Options, ChangeContext } from 'ng5-slider';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

  allData: any;
  filteredData: any;
  totalCryptoCurrencyPage: number;
  crypto_Page_Start = 1;
  disableCounter = 0;
  priceSortAsc: string = 'false';
  priceSortDec: string = 'false';
  marketSortAsc: string = 'false';
  marketSortDec: string = 'false';
  minPriceRange = 0;
  maxPriceRange = 0;
  priceRangeOptions: Options;
  minMarketcapRange = 0;
  maxMarketcapRange = 0;
  marketcapRangeOptions: Options;
  favoriteStorageKey = "FAV_CURRENCIES";
  showOnlyFavorites = false;
  compareView = false;
  compareList = [];

  constructor(private router: Router, public cryptoService: CryptoService, private toastr: ToastrService) {
  }

  ngOnInit() {
    const favCurrencies: number[] = JSON.parse(localStorage.getItem(this.favoriteStorageKey));
    this.getCryptoData(this.crypto_Page_Start, favCurrencies && favCurrencies.length > 0);
  }

  getMinPrice = (minVal: number, currentValObj: any) => {
    if(currentValObj.quotes.USD.price === null) return minVal;

    return minVal < currentValObj.quotes.USD.price ? minVal : currentValObj.quotes.USD.price;
  }

  getMaxPrice = (maxVal: number, currentValObj: any) => {
    if(currentValObj.quotes.USD.price === null) return maxVal;

    return maxVal > currentValObj.quotes.USD.price ? maxVal : currentValObj.quotes.USD.price;
  }

  getMinMarketcap = (minVal: number, currentValObj: any) => {
    if(currentValObj.quotes.USD.market_cap === null) return minVal;

    return minVal < currentValObj.quotes.USD.market_cap ? minVal : currentValObj.quotes.USD.market_cap;
  }

  getMaxMarketcap = (maxVal: number, currentValObj: any) => {
    if(currentValObj.quotes.USD.market_cap === null) return maxVal;

    return maxVal > currentValObj.quotes.USD.market_cap ? maxVal : currentValObj.quotes.USD.market_cap;
  }

  public getCryptoData: any = (pageStart: number, getOnlyFav = false) => {

    this.cryptoService.getCryptoData(pageStart).subscribe((apiResponse) => {

      this.allData = apiResponse.data;
      this.filteredData = apiResponse.data;
      if (getOnlyFav) {
        this.showOnlyFavorites = true;
        this.filteredData = this.getFavoriteCurrencies();
      } else {
        this.showOnlyFavorites = false;
      }
      if (this.crypto_Page_Start === 1) {
        this.totalCryptoCurrencyPage = Math.ceil(apiResponse.metadata.num_cryptocurrencies / 100);
      }

      this.disableCounter++;

      //Set price range values
      this.minPriceRange = this.filteredData.reduce(this.getMinPrice, 0);
      this.maxPriceRange = this.filteredData.reduce(this.getMaxPrice, 0);
      this.priceRangeOptions = {
        floor: this.minPriceRange,
        ceil: this.maxPriceRange
      }

      //Set marketcap range values
      this.minMarketcapRange = this.filteredData.reduce(this.getMinMarketcap, 0);
      this.maxMarketcapRange = this.filteredData.reduce(this.getMaxMarketcap, 0);
      this.marketcapRangeOptions = {
        floor: this.minMarketcapRange,
        ceil: this.maxMarketcapRange
      }

    },(err)=>{

      this.toastr.error('Some Error Occured');

    })

  }

  public getNextPageData: any = () => {

    this.crypto_Page_Start = this.crypto_Page_Start + 100;

    this.priceSortAsc = 'false';
    this.priceSortDec = 'false';
    this.marketSortAsc = 'false';
    this.marketSortDec = 'false';

    this.getCryptoData(this.crypto_Page_Start);
  }

  public getPreviousPageData: any = () => {

    this.crypto_Page_Start = this.crypto_Page_Start - 100;

    this.priceSortAsc = 'false';
    this.priceSortDec = 'false';
    this.marketSortAsc = 'false';
    this.marketSortDec = 'false';

    this.disableCounter--;

    this.getCryptoData(this.crypto_Page_Start);
  }

  public sortByMarketcap: any = () => {


    this.priceSortAsc = 'false';
    this.priceSortDec = 'false';

    if (this.marketSortAsc == 'false') {
      this.marketSortAsc = 'true';
      this.marketSortDec = 'false';

      this.filteredData.sort(function (obj1, obj2) {
        return obj1.quotes.USD.market_cap - obj2.quotes.USD.market_cap
      })
    }
    else {
      this.marketSortAsc = 'false';
      this.marketSortDec = 'true';

      this.filteredData.sort(function (obj1, obj2) {
        return obj2.quotes.USD.market_cap - obj1.quotes.USD.market_cap
      })
    }
  }

  public sortByPrice: any = () => {

    this.marketSortAsc = 'false';
    this.marketSortDec = 'false';

    if (this.priceSortAsc == 'false') {
      this.priceSortAsc = 'true';
      this.priceSortDec = 'false';

      this.filteredData.sort(function (obj1, obj2) {
        return obj1.quotes.USD.price - obj2.quotes.USD.price
      })
    }
    else {
      this.priceSortAsc = 'false';
      this.priceSortDec = 'true';

      this.filteredData.sort(function (obj1, obj2) {
        return obj2.quotes.USD.price - obj1.quotes.USD.price
      })
    }
  }

  getFavouriteClass = (currencyId: number) => {
    const favCurrencies: number[] = JSON.parse(localStorage.getItem(this.favoriteStorageKey));
    return favCurrencies && favCurrencies.length > 0 && favCurrencies.find((item) => item === currencyId) ? "starFill" : "";
  }

  getFavoriteCurrencies = () => {
    const favCurrencies: number[] = JSON.parse(localStorage.getItem(this.favoriteStorageKey));
    return this.allData.filter((currencyItem) => favCurrencies.findIndex((item) => item === currencyItem.id) !== -1);
  }

  showFavoritesChange = () => {
    this.showOnlyFavorites = !this.showOnlyFavorites;
    this.filteredData = this.getFilterData(this.minPriceRange, this.maxPriceRange, this.minMarketcapRange, this.maxMarketcapRange);
  }

  public markAsFav: any = (currencyId: number) => {
    const favCurrencies: number[] = JSON.parse(localStorage.getItem(this.favoriteStorageKey));
    if (favCurrencies) {
      const index = favCurrencies.indexOf(currencyId);
      index === -1 ? favCurrencies.push(currencyId) : favCurrencies.splice(index, 1);
      localStorage.setItem(this.favoriteStorageKey, JSON.stringify(favCurrencies));
    } else {
      localStorage.setItem(this.favoriteStorageKey, JSON.stringify([currencyId]));
    }
  }

  getFilterData = (minPrice, maxPrice, minMarketcap, maxMarketcap) => {
    let data = this.showOnlyFavorites ? this.getFavoriteCurrencies() : this.allData;
    return data.filter((data) => {
      return (data.quotes.USD.price >= minPrice) && (data.quotes.USD.price <= maxPrice) &&
        (data.quotes.USD.market_cap >= minMarketcap) && (data.quotes.USD.market_cap <= maxMarketcap);
    });
  }

  onPriceChangeEnd(changeContext: ChangeContext): void {
    this.filteredData = this.getFilterData(changeContext.value, changeContext.highValue, this.minMarketcapRange, this.maxMarketcapRange);
  }

  onMarketcapChangeEnd(changeContext: ChangeContext): void {
    this.filteredData = this.getFilterData(this.minPriceRange, this.maxPriceRange, changeContext.value, changeContext.highValue);
  }

  initComapareView = () => {
    this.compareView = true;
  }

  manageComparisionList = (currencyId: number) => {
    const index = this.compareList.findIndex((item) => item === currencyId);
    if (index === -1) {
      this.compareList.push(currencyId);
    } else {
      // If item unchecked, remove it from list
      this.compareList.splice(index, 1);
    }

  }

  public compareCurrencyHandler = () => {
    if (this.compareList.length !== 2) {
      this.toastr.warning('You must select 2 items');
      return;
    }

    this.cryptoService.setCurrenciesToCompare(this.crypto_Page_Start, this.compareList).then(() => {
      this.router.navigate(['/comparePrice']);
    });

  }

}
