import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedServices} from "../Services/shared-services.service";
import {StockEntries} from "../../Interfaces/stock-entries.interface";
import {Observable} from "rxjs/Rx";
import {MatStepper} from "@angular/material";
import {MarketInfo} from "../../Interfaces/market-info.interface";
import {TableDataSource} from "../Forms/final-portfolio/final-portfolio.component";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-rebalance-portfolio',
  templateUrl: './rebalance-portfolio.component.html',
  styleUrls: ['./rebalance-portfolio.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RebalancePortfolioComponent implements OnInit, AfterViewInit {

  @Input() stepper : MatStepper;
  private combinedMapSymbols : Array<string> = [];
  private financeMap : Map<string, number> = new Map<string, number>();
  private valInitPort : number = 0;
  private portfolioDiff : Map<string, number> = new Map<string, number>();
  private displayedColumns = ['position', 'symbol', 'shares', 'marketPrice', 'percentage'];
  private elementArr : StockEntries[] = [];
  private rebalanceDataSrc : TableDataSource;

  constructor(private shareServices: SharedServices) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    Observable.from(this.stepper.selectionChange).subscribe( (currentVal) => {
      if(( this.stepper.selectedIndex + 1 ) === 3) this.getMarketDataForPortfolio();
      this.combinedMapSymbols = this.shareServices.getCombinedMap();
    });
    }

  private getMarketDataForPortfolio(){
    console.log('fire computational Rebalance');
    this.shareServices.getStockMarketData(this.combinedMapSymbols).subscribe(
      (data : {[p:string] : MarketInfo}) => {
        console.log('market data', data);

        for( let key of this.combinedMapSymbols){
            this.financeMap.set(key, data[key].quote.close);
        }

        this.computeReblance(this.financeMap, this.shareServices.getInitialPortMap(), this.shareServices.getFinalPortMap());
        this.trackPortfolioDifference();
        console.log('finance map: ', this.financeMap);
        console.log('portfolio diffs: ', this.portfolioDiff);
      },
      (err) => {console.log(err)}
    );
  }

  //todo: refactor to hae the initial / final portfolios setup local variables rather than accessing services and creating mayhem.
  private computeReblance(financeMap : Map<string, number>, initPort: Map<string, StockEntries>, finalPort : Map<string, StockEntries>) : void {
    let finalPortFundingMap : Map<string, number> = new Map<string, number>();

    //calculate total value of initPort
    for(let key of Array.from(finalPort.keys())){
      this.valInitPort += finalPort.get(key).shares * financeMap.get(key);
    }

    //find final port funding allocations for each stock
    for(let key of Array.from(initPort.keys())){
      finalPortFundingMap.set(key, (initPort.get(key).percentage/100) * this.valInitPort);
      this.shareServices.setInitPortShares(key, Math.floor(finalPortFundingMap.get(key) / financeMap.get(key)));
    }

    console.log('service data: ', this.shareServices.getInitialPortMap());
  }


  private trackPortfolioDifference() : void{
    //setup variables and initialize
    let iniPort : Map< string, StockEntries > = this.shareServices.getInitialPortMap();
    let finalPort : Map< string, StockEntries > = this.shareServices.getFinalPortMap();
    let shareChange : number = 0;
    let pos : number = 0;

    this.shareServices.getCombinedMap().forEach( (stockSymbol : string) => {
      //reset
      shareChange = 0;

      //if symbol shows up in only final port, all stocks were bought.  If symbol only shows up in initial port, all stocks were sold
      //if symbol shows up in both ports, calculate the difference to determine if they were bought of sold (negative number is sold, positive is bought)
      if(iniPort.get(stockSymbol) && finalPort.get(stockSymbol)){ //both
        shareChange =  iniPort.get(stockSymbol).shares -  finalPort.get(stockSymbol).shares
      } else if (iniPort.get(stockSymbol) && !finalPort.get(stockSymbol)){ //only initial
        shareChange = iniPort.get(stockSymbol).shares
      } else if (!iniPort.get(stockSymbol) && finalPort.get(stockSymbol)){ // only final
        shareChange = 0 - finalPort.get(stockSymbol).shares;
      }

      //store to local mapping
      this.portfolioDiff.set( stockSymbol, shareChange );
    });

    Array.from(this.financeMap.keys()).forEach((stockSymbol : string) => {

      //local temp variables
      let tempObj : StockEntries;
      let percentage : number = null;

      //find position of entry
      if(this.elementArr.length < 1 || isNullOrUndefined(this.elementArr)) pos = 0;
      else pos++;

      if(iniPort.get(stockSymbol)) percentage = iniPort.get(stockSymbol).percentage;
      else percentage = 0;

      let sign = (this.financeMap.get(stockSymbol) >= 0) ? true : false;
      let marketPrice = this.financeMap.get(stockSymbol);
      let shares = Math.abs(this.portfolioDiff.get(stockSymbol));

      //populate a stockEntry object
      tempObj = { position: pos, symbol: stockSymbol, shares: shares, percentage: percentage, marketPrice: marketPrice, sign: sign };


      this.elementArr.push(tempObj);
    });

     this.rebalanceDataSrc = new TableDataSource(this.elementArr);
  }
}
