import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { DashboardComponent } from './components/dashboard/dashboard-container.component';
import { MarketplaceComponent } from './components/marketplace/marketplace-container.component';
import { CreateListingComponent } from './components/create-listing/create-listing.component';
import { ProfileComponent } from './components/profile/profile.component';

export const AppRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'marketplace', component: MarketplaceComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateListingComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: '**', redirectTo: '' }
];
