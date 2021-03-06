import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BaseTemplateComponent } from './Components/base-template/base-template.component';
import { StepperProgressComponent } from './Components/stepper-progress/stepper-progress.component';
import { AdvertisementComponent } from './Components/advertisement/advertisement.component';
import { IterableMapPipe } from './Pipes/iterable-map.pipe';

import {SharedServices} from './Components/Services/shared-services.service';

import {appRoutes} from './Routing/app-router.router';
import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatStepperModule,
  MatTableModule
} from '@angular/material';
import { InitialPortfolioComponent } from './Components/Forms/initial-portfolio/initial-portfolio.component';
import { FinalPortfolioComponent } from './Components/Forms/final-portfolio/final-portfolio.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {CdkTableModule} from "@angular/cdk/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LandingComponent } from './Components/landing/landing.component';
import { RebalancePortfolioComponent } from './Components/rebalance-portfolio/rebalance-portfolio.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    BaseTemplateComponent,
    StepperProgressComponent,
    AdvertisementComponent,
    IterableMapPipe,
    InitialPortfolioComponent,
    FinalPortfolioComponent,
    LandingComponent,
    RebalancePortfolioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    MatTableModule,
    CdkTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [SharedServices ],
  bootstrap: [AppComponent]
})
export class AppModule { }
