/*
Modules
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import {SliderModule} from 'primeng/primeng';
/*
Components
*/
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
//MARKETPLACE
import { MarketplaceContainerComponent } from './components/marketplace-container/marketplace-container.component';
import { PubMarketplaceComponent } from './components/marketplace-container/pub-marketplace/pub-marketplace.component';
import { AdvMarketplaceComponent } from './components/marketplace-container/adv-marketplace/adv-marketplace.component';
//DASHBOARD
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { PubDashboardComponent } from './components/dashboard-container/pub-dashboard/pub-dashboard.component';
import { AdvDashboardComponent } from './components/dashboard-container/adv-dashboard/adv-dashboard.component';
import { AdvDashboardStatsComponent } from './components/dashboard-container/adv-dashboard/adv-dashboard-stats/adv-dashboard-stats.component';
import { AdvDashboardChartsComponent } from './components/dashboard-container/adv-dashboard/adv-dashboard-charts/adv-dashboard-charts.component';
import { AdvDashboardTablesComponent } from './components/dashboard-container/adv-dashboard/adv-dashboard-tables/adv-dashboard-tables.component';
import { PubDashboardTablesComponent } from './components/dashboard-container/pub-dashboard/pub-dashboard-tables/pub-dashboard-tables.component';
import { PubDashboardChartsComponent } from './components/dashboard-container/pub-dashboard/pub-dashboard-charts/pub-dashboard-charts.component';
import { PubDashboardStatsComponent } from './components/dashboard-container/pub-dashboard/pub-dashboard-stats/pub-dashboard-stats.component';
/*
Services
*/
import { LoginAuthenticationService } from './services/loginAuthentication.service';
import { AuthGuard } from './guards/auth-guard';
import { TrackMode } from './services/trackMode.service';
import { TrackCurrency } from './services/trackCurrency.service';
import { PubLinechartComponent } from './components/dashboard-container/pub-dashboard/pub-dashboard-charts/pub-linechart/pub-linechart.component';
import { PubBarchartComponent } from './components/dashboard-container/pub-dashboard/pub-dashboard-charts/pub-barchart/pub-barchart.component';
import { AdvBarchartComponent } from './components/dashboard-container/adv-dashboard/adv-dashboard-charts/adv-barchart/adv-barchart.component';
import { AdvLinechartComponent } from './components/dashboard-container/adv-dashboard/adv-dashboard-charts/adv-linechart/adv-linechart.component';
import { CreateAdspaceFormComponent } from './components/create-container/create-adspace-form/create-adspace-form.component';
import { CreateAdFormComponent } from './components/create-container/create-ad-form/create-ad-form.component';
import { CreateContainerComponent } from './components/create-container/create-container.component';



const appRoutes : Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardContainerComponent, canActivate: [AuthGuard] },
  { path: 'marketplace', component: MarketplaceContainerComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateContainerComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard', component: DashboardContainerComponent },
  // { path: 'marketplace', component: MarketplaceContainerComponent },
  // { path: 'create', component: CreateContainerComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardContainerComponent,
    MarketplaceContainerComponent,
    PubMarketplaceComponent,
    AdvMarketplaceComponent,
    PubDashboardComponent,
    AdvDashboardComponent,
    AdvDashboardStatsComponent,
    AdvDashboardChartsComponent,
    PubDashboardTablesComponent,
    PubDashboardChartsComponent,
    PubDashboardStatsComponent,
    AdvDashboardTablesComponent,
    PubLinechartComponent,
    PubBarchartComponent,
    AdvBarchartComponent,
    AdvLinechartComponent,
    CreateAdspaceFormComponent,
    CreateAdFormComponent,
    CreateContainerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule,
    SliderModule
  ],
  providers: [LoginAuthenticationService, AuthGuard, TrackMode, TrackCurrency],
  bootstrap: [AppComponent]
})
export class AppModule { }
