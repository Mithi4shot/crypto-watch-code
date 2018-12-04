import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  public baseUrl = 'https://api.coinmarketcap.com/v2/';
  private currencyComparision;

  constructor(public http: HttpClient) { }

  public getCryptoData(crypto_page): Observable<any> {
    return this.http.get(`${this.baseUrl}ticker/?start=${crypto_page}&structure=array&sort=rank`);
  }

  public getSingleCurrencyData(id): Observable<any> {
    return this.http.get(`${this.baseUrl}ticker/${id}/`);
  }

  public setCurrenciesToCompare(crypto_page: number, ids: number[]): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}ticker/?start=${crypto_page}&structure=array&sort=rank`).toPromise().then((currencies:any) => {
        const data = [];
        for(let item of currencies.data){
          if(ids.findIndex((id) => id === item.id) !== -1) {
            data.push(item);
          }
        }
        this.currencyComparision = data;
        resolve();
      });
    });
    return promise;       
  }
  
  public getCurrenciesToCompare(): any {
    return this.currencyComparision;
  }

}
