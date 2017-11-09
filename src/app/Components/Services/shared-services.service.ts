import { Injectable } from '@angular/core';
import {AllowableStates} from "../../Enumerations/allowable-states";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SharedServices {

  constructor() { }

  private currentState : AllowableStates = AllowableStates.landingPage;
  private stockData : Object; //todo: change typing to stock market interface
  private initialPortData : Map<string, Object>; //todo: change to stock model
  private finalPortData : Map<string, Object>; //todo: change to stock Model


  public getStockMarketData(stockSymbols : string[]) { }

  public getInitialPort() : Map<string, Object>{
    return this.initialPortData;
  }

  public setInitialPort(initialPort : Map<string, Object>) : void {
    this.initialPortData = initialPort;
  }

  public getFinalPort() : Map<string, Object> {
    return this.finalPortData;
  }

  public setFinalPort(finalPort : Map<string, Object>) : void {
    this.finalPortData = finalPort;
  }

  public getState() : AllowableStates {
    return this.currentState;
  }

  public setState( state : AllowableStates) : void {
    switch (state) {
      case AllowableStates.landingPage:
        this.currentState = AllowableStates.landingPage;
        break;

      case AllowableStates.initialPortPage:
        this.currentState = AllowableStates.initialPortPage;
        break;

      case AllowableStates.finalPortPage:
        this.currentState = AllowableStates.finalPortPage;
        break;

      case AllowableStates.rebalancingPage:
        this.currentState = AllowableStates.rebalancingPage;
        break;

      default:
        this.currentState = AllowableStates.landingPage;
        break;
    }
  }

}
