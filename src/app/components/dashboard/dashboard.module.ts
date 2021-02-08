import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { DataService } from 'src/services/data.service';
import { PokedetailComponent } from './pokedetail/pokedetail.component';
import { PokelistComponent } from './pokelist/pokelist.component';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { FilterdatalistPipe } from 'src/app/pipe/filterdatalist.pipe';
import { FormsModule } from '@angular/forms';
import { NavigationService } from 'src/services/navigation.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [DashboardComponent, PokedetailComponent, PokelistComponent, SnackbarComponent, FilterdatalistPipe],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [DataService, NavigationService]
})
export class DashboardModule { }
