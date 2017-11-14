import { Component, OnInit} from '@angular/core';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {DataSource} from "@angular/cdk/collections";
import {FormControl, FormGroup} from "@angular/forms";
import {StockEntries} from "../../../Interfaces/stock-entries.interface";
import {isNullOrUndefined} from "util";
import {SharedServices} from "../../Services/shared-services.service";

@Component({
  selector: 'app-final-portfolio',
  templateUrl: './final-portfolio.component.html',
  styleUrls: ['./final-portfolio.component.css']
})
export class FinalPortfolioComponent implements OnInit {
  //variables
  private displayedColumns = ['position', 'symbol', 'shares', 'select'];
  private dataSourceFinal;
  private elementArr : StockEntries[] = [];

  //user entry form
  private stockForm : FormGroup = new FormGroup({
    symbolCtrl : new FormControl(''),
    sharesCtrl : new FormControl('')
  });

  constructor(private sharedServices: SharedServices) {}

  /**
   * get initial data for table
   */
  ngOnInit() {
    this.dataSourceFinal = new TableDataSource(this.elementArr);
  }

  /**
   * Adds a row representing a single stock asset in the user's portfolio to the table
   *
   * @param {FormGroup} submission
   */
  addNewStock( submission : FormGroup ){
    //setup some preliminaries: ie. convert strings to numbers, figure out the current number of array elements, and create a map for later.
    let converted : number = Number(submission.get('sharesCtrl').value);
    let num : number = this.elementArr.length;
    let initMap : Map< string, StockEntries > = new Map< string, StockEntries>();

    //check if we initialized the position number and correctly label the current position
    if(isNullOrUndefined(num)) num = 0;
    else num += 1;

    //create a stock entry and push it to an array.
    let obj : StockEntries = {position: num, symbol: submission.get('symbolCtrl').value.toUpperCase(), shares: converted};
    this.elementArr.push(obj);

    //refresh the table
    this.dataSourceFinal = new TableDataSource(this.elementArr);

    //convert our array of stock data to map and store this to a shared service for computation purposes later.
    this.elementArr.forEach((stockObj : StockEntries) => {
      initMap.set(stockObj.symbol, stockObj);
    });
    this.sharedServices.setFinalPort(initMap);
    this.sharedServices.addToCombinedMap(initMap);

    //reset the form for the next entry.
    this.stockForm.reset();
    console.log(this.sharedServices.getCombinedMap());
  }
}

/**
 * Datasource class needed to populate the page's data table.
 */
export class TableDataSource extends DataSource<any>{
  private elementArr : Array<StockEntries>;

  constructor(public Arr : Array<StockEntries>){
    super();
    this.elementArr = Arr;
  }

  connect(): Observable<StockEntries[]> {
    return Observable.of(this.elementArr)
  }
  disconnect() {}
}
