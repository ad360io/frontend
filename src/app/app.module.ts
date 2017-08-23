/*
Modules
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
/*
Components
*/
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
/*
Services
*/
import { LoginAuthenticationService } from './services/loginAuthentication.service';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { AuthGuard } from './guards/auth-guard';
import { HeaderComponent } from './components/header/header.component';

const appRoutes : Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardContainerComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardContainerComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [LoginAuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
