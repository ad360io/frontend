/*
MODULES
*/
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { SliderModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
NG-MATERIAL MODULES
*/
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


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
import { AdvDashboardWalletComponent } from './components/dashboard/adv-dashboard/adv-dashboard-wallet/adv-dashboard-wallet.component';
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

import { ProfileComponent } from './components/profile/profile.component';


/*
SERVICES
*/
import { AuthService } from './services/auth/auth.service';
import { TrackCurrency } from './services/trackCurrency.service';
import { TimeTickerService } from './services/timeTicker.service';
import { TrackMode } from './services/trackMode.service';
import { UserService } from './services/user.service';
import { TestNetRequest } from './services/testnetService/testNetRequest.service';
import { TestNet } from './services/testnetService/testNet.service';

/*
GUARDS
*/
import { AuthGuard } from './guards/auth-guard.guard';


/*
ROUTES
*/
import { AppRoutes } from './app.routes';
import { PubPlaceholderComponent } from './components/dashboard/placeholder-dashboards/pub-placeholder/pub-placeholder.component';
import { AdvPlaceholderComponent } from './components/dashboard/placeholder-dashboards/adv-placeholder/adv-placeholder.component';
import { AdvMarketplaceSideFilterComponent } from './components/marketplace/adv-marketplace-side-filter/adv-marketplace-side-filter.component';


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
    CreateAdspaceListingComponent,

    ProfileComponent,

    PubPlaceholderComponent,

    AdvPlaceholderComponent,

    AdvDashboardWalletComponent,

    AdvMarketplaceSideFilterComponent,



  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule.forRoot(),
    ChartsModule,
    SliderModule,
    CalendarModule,
    HttpClientModule,

    MatCardModule,
    MatDividerModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule
  ],

  providers: [
    Title,
    AuthService,
    AuthGuard,
    TrackCurrency,
    TrackMode,
    UserService,
    TestNet,
    TestNetRequest,
    TimeTickerService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
