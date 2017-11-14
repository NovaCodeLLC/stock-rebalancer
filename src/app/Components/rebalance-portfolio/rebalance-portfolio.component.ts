import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedServices} from "../Services/shared-services.service";
import {StockEntries} from "../../Interfaces/stock-entries.interface";
import {Observable} from "rxjs/Rx";
import {MatStepper} from "@angular/material";
import {MarketInfo} from "../../Interfaces/market-info.interface";

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
        console.log('finance map: ', this.financeMap);
      },
      (err) => {console.log(err)}
    );
  }

  //todo: refactor to hae the initial / final portfolios setup local variables rather than accessing services and creating mayhem.
  private computeReblance(financeMap : Map<string, number>, initPort: Map<string, StockEntries>, finalPort : Map<string, StockEntries>){
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
}
