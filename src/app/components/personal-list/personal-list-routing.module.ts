import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalListComponent } from './personal-list.component';


const routes: Routes = [
  {
    path: '',
    component: PersonalListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalListRoutingModule { }
