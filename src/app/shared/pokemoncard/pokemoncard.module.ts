import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { PokemoncardComponent } from 'src/app/shared/pokemoncard/pokemoncard.component';


@NgModule({
  declarations: [PokemoncardComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PokemoncardComponent
  ]
})
export class PokemoncardModule { }
