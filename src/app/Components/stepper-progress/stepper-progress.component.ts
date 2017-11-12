import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from "@angular/material";

@Component({
  selector: 'app-stepper-progress',
  templateUrl: './stepper-progress.component.html',
  styleUrls: ['./stepper-progress.component.css']
})
export class StepperProgressComponent implements AfterViewInit {

  @ViewChild('stepper') step : MatStepper;
  constructor() { }

  ngAfterViewInit(){

  }

}
