import { Injectable } from '@angular/core';
import {AllowableStates} from "../../Enumerations/allowable-states";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/from';
import {StockEntries} from "../../Interfaces/stock-entries.interface";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class SharedServices {

  constructor() { }

  private stockData : Object; //todo: change typing to stock market interface
  private initialPortData : Map<string, StockEntries>;
  private finalPortData : Map<string, StockEntries>;
  private emptyMap : Map<string, StockEntries> = new Map<string, StockEntries>();
  private behaviorSubIni : BehaviorSubject<Map<string, StockEntries>> = new BehaviorSubject<Map<string, StockEntries>>(this.emptyMap);

  public getStockMarketData(stockSymbols : string[]) { }

  public getInitialPortObs() : Observable< Map<string, StockEntries>>{
    return this.behaviorSubIni;
  }

  public getInitialPortMap() : Map<string, StockEntries>{
    return this.initialPortData
  }

  public setInitialPort(initialPort : Map<string, StockEntries>) : void {
    this.initialPortData = initialPort;
  }

  public getFinalPortObs() : Observable< Map<string, StockEntries>> {
    return Observable.from([this.finalPortData]);
  }

  public getFinalPortMap() : Map<string, StockEntries>{
    return this.finalPortData;
  }

  public setFinalPort(finalPort : Map<string, StockEntries>) : void {
    this.finalPortData = finalPort;
    this.behaviorSubIni.next(this.finalPortData);
  }
}
