import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./components/wishlist/wishlist.module').then(m => m.WishlistModule)
  },
  {
    path: 'personallist',
    loadChildren: () => import('./components/personal-list/personal-list.module').then(m => m.PersonalListModule)
  },
  {
    path: 'change-detection',
    loadChildren: () => import('./components/change-detection/change-detection.module').then(m => m.ChangeDetectionModule)
  },
  { path: '',  redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '**',  redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
