import { Component, OnInit } from '@angular/core';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {DataSource} from "@angular/cdk/collections";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-final-portfolio',
  templateUrl: './final-portfolio.component.html',
  styleUrls: ['./final-portfolio.component.css']
})
export class FinalPortfolioComponent implements OnInit {
  displayedColumns = ['position', 'symbol', 'shares'];
  dataSource;
  elementArr : StockEntries[] = [{
    position: 1,
    symbol: 'GOOG',
    shares: 100
  }];

  forms : FormGroup;

  constructor(private fb : FormBuilder) {}

  ngOnInit() {
    this.dataSource = new TableDataSource(this.elementArr);
  }

  addNewStock()

}

export interface StockEntries{
  position: number;
  symbol : string;
  shares : number;
}

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
