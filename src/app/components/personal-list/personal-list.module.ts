import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalListRoutingModule } from './personal-list-routing.module';
import { PersonalListComponent } from './personal-list.component';
import { MaterialModule } from 'src/app/material.module';
import { PokemoncardModule } from 'src/app/shared/pokemoncard/pokemoncard.module';

@NgModule({
  declarations: [PersonalListComponent],
  imports: [
    CommonModule,
    PersonalListRoutingModule,
    MaterialModule,
    PokemoncardModule
  ]
})
export class PersonalListModule { }
