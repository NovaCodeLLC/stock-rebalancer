import { Component, OnInit } from '@angular/core';
import {StockEntries} from "../../../Interfaces/stock-entries.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {isNullOrUndefined} from "util";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-initial-portfolio',
  templateUrl: './initial-portfolio.component.html',
  styleUrls: ['./initial-portfolio.component.css']
})
export class InitialPortfolioComponent implements OnInit {

  //variables
  displayedColumns = ['position', 'symbol', 'percentage', 'select'];
  dataSourceInit;
  elementArr : StockEntries[] = [];

  //user entry form
  stockForm : FormGroup = new FormGroup({
    symbolCtrl : new FormControl(''),
    percentCtrl : new FormControl('')
  });

  constructor() {}

  /**
   * get initial data for table
   */
  ngOnInit() {
    this.dataSourceInit = new TblDataSource(this.elementArr);
  }

  /**
   * Adds a row representing a single stock asset in the user's portfolio to the table
   *
   * @param {FormGroup} submission
   */
  addNewStock( submission : FormGroup ){
    let converted : number = Number(submission.get('percentCtrl').value);
    let num : number = this.elementArr.length;

    if(isNullOrUndefined(num)) num = 0;
    else num += 1;

    let obj : StockEntries = {position: num, symbol: submission.get('symbolCtrl').value.toUpperCase(), percentage: converted};

    this.elementArr.push(obj);
    console.log(this.elementArr);
    this.dataSourceInit = new TblDataSource(this.elementArr);
    this.stockForm.reset();
  }
}

/**
 * Datasource class needed to populate the page's data table.
 */
export class TblDataSource extends DataSource<any>{
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
