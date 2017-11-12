import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedServices} from "../Services/shared-services.service";
import {StockEntries} from "../../Interfaces/stock-entries.interface";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/merge';
import {MatStepper} from "@angular/material";

@Component({
  selector: 'app-rebalance-portfolio',
  templateUrl: './rebalance-portfolio.component.html',
  styleUrls: ['./rebalance-portfolio.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RebalancePortfolioComponent implements OnInit, AfterViewInit {

  @Input() stepper : MatStepper;
  private combinedMapSymbols : Array<string> = [];

  constructor(private shareServices: SharedServices) { }

  ngOnInit() {
    let iniKeys : Observable< Map<string, StockEntries>> = this.shareServices.getFinalPortObs();
    let finalKeys : Observable< Map<string, StockEntries>> = this.shareServices.getInitialPortObs();

    iniKeys.merge(finalKeys).subscribe(
      (maps : Map<string, StockEntries>) => {

        if(!maps) return;

        Array.from(maps.keys()).forEach((currentKey : string) => {
          if(this.combinedMapSymbols.indexOf(currentKey) === -1) {
            this.combinedMapSymbols.push(currentKey);
          }
        });

        console.log('combinedmap: ', this.combinedMapSymbols);
      },
      (err : Error) => {console.log(err)},
      () => {console.log('[iniKeys emission] Complete ... ')}
    );
  }

  ngAfterViewInit() {
    Observable.from(this.stepper.selectionChange).subscribe( (currentVal) => {
      if(( this.stepper.selectedIndex + 1 ) === 3) this.computeRebalance();
    });
    }

  computeRebalance(){
    console.log('fire computational Rebalance');
    this.shareServices.getStockMarketData(this.combinedMapSymbols)
  }
}
