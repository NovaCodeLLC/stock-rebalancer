import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/from';
import {StockEntries} from "../../Interfaces/stock-entries.interface";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {HttpClient} from "@angular/common/http";
import {MarketInfo} from "../../Interfaces/market-info.interface";

@Injectable()
export class SharedServices {

  constructor(private http : HttpClient) { }

  private urlBase : string = "https://api.iextrading.com/1.0/stock/market/batch?symbols=";
  private urlSuffix : string = "&types=quote";
  private stockData : Object; //todo: change typing to stock market interface
  private initialPortData : Map<string, StockEntries>;
  private finalPortData : Map<string, StockEntries>;
  private combinedMap : Array<string> = [];

  public getStockMarketData(stockSymbols : string[]) : Observable<{[p:string] : MarketInfo}> {
    let len : number = Math.ceil(stockSymbols.length % 100);

    return Observable.from(stockSymbols)
      .bufferCount( 100 )
      .map( (symbolBatch : string[]) => {
        let requestedSymbols : string = '';

        symbolBatch.forEach((symbol) => {
          requestedSymbols += symbol + ','
        });

        let getURL : string = this.urlBase + requestedSymbols.slice(0, requestedSymbols.length -1) + this.urlSuffix;
        return getURL;
      })
      .flatMap( (url : string ) => {
        return this.http.get<{[p:string] : MarketInfo}>(url);
      })
      .bufferCount( len )
      .map( (arrOfOne : Array<{[p:string] : MarketInfo}>) => {
        return arrOfOne[0];
      })
  }

  public getInitialPortMap() : Map<string, StockEntries>{
    return this.initialPortData
  }

  public setInitialPort(initialPort : Map<string, StockEntries>) : void {
    this.initialPortData = initialPort;
  }

  public getFinalPortMap() : Map<string, StockEntries>{
    return this.finalPortData;
  }

  public setFinalPort(finalPort : Map<string, StockEntries>) : void {
    this.finalPortData = finalPort;
  }

  public setFinalPortShares(key : string, numShare : number) : void {
    this.finalPortData.get(key).shares = numShare;
  }

  public setInitPortShares
  (key : string, numShare : number) : void {
    this.initialPortData.get(key).shares = numShare;
  }

  public addToCombinedMap(newSymbol : Map<string, StockEntries>){
    if(!newSymbol) return;

    Array.from(newSymbol.keys()).forEach((currentKey : string) => {
      if(this.combinedMap.indexOf(currentKey) === -1) {
        this.combinedMap.push(currentKey);
      }
    });
  }

  public getCombinedMap() : Array<string> {
    return this.combinedMap;
  }
}
