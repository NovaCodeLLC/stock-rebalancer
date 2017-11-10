import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {DataSource} from "@angular/cdk/collections";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-final-portfolio',
  templateUrl: './final-portfolio.component.html',
  styleUrls: ['./final-portfolio.component.css']
})
export class FinalPortfolioComponent implements OnInit {
  //variables
  displayedColumns = ['position', 'symbol', 'shares', 'select'];
  dataSource;
  elementArr : StockEntries[] = [{
    position: 1,
    symbol: 'GOOG',
    shares: 100
  }];

  //user entry form
  stockForm : FormGroup = new FormGroup({
    symbolCtrl : new FormControl(''),
    sharesCtrl : new FormControl('')
  });

  constructor(private changeDetectorRefs: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataSource = new TableDataSource(this.elementArr);
  }

  addNewStock( submission : FormGroup ){
    let converted : number = Number(submission.get('sharesCtrl').value);
    let num : number = this.elementArr.length;

    num += 1;

    let obj : StockEntries = {position: num, symbol: submission.get('symbolCtrl').value, shares: converted};

    this.elementArr.push(obj);
    console.log(this.elementArr);
    this.dataSource = new TableDataSource(this.elementArr);
    this.stockForm.reset();
  }
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
