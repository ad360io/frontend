/*
MODULES
*/
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { SliderModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';


/*
COMPONENTS
*/
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { DashboardComponent } from './components/dashboard/dashboard-container.component';

import { AdvDashboardComponent } from './components/dashboard/adv-dashboard/adv-dashboard.component';
import { AdvDashboardStatsComponent } from './components/dashboard/adv-dashboard/adv-dashboard-stats/adv-dashboard-stats.component';
import { AdvDashboardTablesComponent } from './components/dashboard/adv-dashboard/adv-dashboard-tables/adv-dashboard-tables.component';
import { AdvDashboardChartsComponent } from './components/dashboard/adv-dashboard/adv-dashboard-charts/adv-dashboard-charts.component';
import { AdvBarchartComponent } from './components/dashboard/adv-dashboard/adv-dashboard-charts/adv-barchart/adv-barchart.component';
import { AdvLinechartComponent } from './components/dashboard/adv-dashboard/adv-dashboard-charts/adv-linechart/adv-linechart.component';

import { PubDashboardComponent } from './components/dashboard/pub-dashboard/pub-dashboard.component';
import { PubDashboardStatsComponent } from './components/dashboard/pub-dashboard/pub-dashboard-stats/pub-dashboard-stats.component';
import { PubDashboardTablesComponent } from './components/dashboard/pub-dashboard/pub-dashboard-tables/pub-dashboard-tables.component';
import { PubDashboardChartsComponent } from './components/dashboard/pub-dashboard/pub-dashboard-charts/pub-dashboard-charts.component';
import { PubBarchartComponent } from './components/dashboard/pub-dashboard/pub-dashboard-charts/pub-barchart/pub-barchart.component';
import { PubLinechartComponent } from './components/dashboard/pub-dashboard/pub-dashboard-charts/pub-linechart/pub-linechart.component';

import { MarketplaceComponent } from './components/marketplace/marketplace-container.component';
import { AdvMarketplaceComponent } from './components/marketplace/adv-marketplace/adv-marketplace.component';
import { PubMarketplaceComponent } from './components/marketplace/pub-marketplace/pub-marketplace.component';

import { CreateListingComponent } from './components/create-listing/create-listing.component';
import { CreateAdListingComponent } from './components/create-listing/create-ad-listing/create-ad-listing.component';
import { CreateAdspaceListingComponent } from './components/create-listing/create-adspace-listing/create-adspace-listing.component';


/*
SERVICES
*/
import { AuthService } from './services/auth/auth.service';
import { TrackCurrency } from './services/trackCurrency.service';
import { TrackMode } from './services/trackMode.service';


/*
GUARDS
*/
import { AuthGuard } from './guards/auth-guard.guard';


/*
ROUTES
*/
import { AppRoutes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthCallbackComponent,

    HeaderComponent,
    FooterComponent,

    DashboardComponent,

    AdvDashboardComponent,
      AdvDashboardStatsComponent,
      AdvDashboardTablesComponent,
      AdvDashboardChartsComponent,
        AdvBarchartComponent,
        AdvLinechartComponent,

    PubDashboardComponent,
      PubDashboardStatsComponent,
      PubDashboardTablesComponent,
      PubDashboardChartsComponent,
        PubBarchartComponent,
        PubLinechartComponent,

    MarketplaceComponent,
    AdvMarketplaceComponent,
    PubMarketplaceComponent,

    CreateListingComponent,
    CreateAdListingComponent,
    CreateAdspaceListingComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    ChartsModule,
    SliderModule,
    CalendarModule
  ],

  providers: [
    Title,
    AuthService,
    AuthGuard,
    TrackCurrency,
    TrackMode
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
