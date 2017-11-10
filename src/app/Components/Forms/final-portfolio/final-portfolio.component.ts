import { Component, OnInit} from '@angular/core';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {DataSource} from "@angular/cdk/collections";
import {FormControl, FormGroup} from "@angular/forms";
import {StockEntries} from "../../../Interfaces/stock-entries.interface";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-final-portfolio',
  templateUrl: './final-portfolio.component.html',
  styleUrls: ['./final-portfolio.component.css']
})
export class FinalPortfolioComponent implements OnInit {
  //variables
  displayedColumns = ['position', 'symbol', 'shares', 'select'];
  dataSourceFinal;
  elementArr : StockEntries[] = [];

  //user entry form
  stockForm : FormGroup = new FormGroup({
    symbolCtrl : new FormControl(''),
    sharesCtrl : new FormControl('')
  });

  constructor() {}

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
    let converted : number = Number(submission.get('sharesCtrl').value);
    let num : number = this.elementArr.length;

    if(isNullOrUndefined(num)) num = 0;
    else num += 1;

    let obj : StockEntries = {position: num, symbol: submission.get('symbolCtrl').value.toUpperCase(), shares: converted};

    this.elementArr.push(obj);
    console.log(this.elementArr);
    this.dataSourceFinal = new TableDataSource(this.elementArr);
    this.stockForm.reset();
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
