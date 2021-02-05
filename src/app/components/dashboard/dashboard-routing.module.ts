import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PokedetailComponent } from './pokedetail/pokedetail.component';
import { PokelistComponent } from './pokelist/pokelist.component';


const routes: Routes = [
  { path: '',  redirectTo: 'poke-list/', pathMatch: 'full'},
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'poke-detail/:id', component: PokedetailComponent },
      { path: 'poke-list/', component: PokelistComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
