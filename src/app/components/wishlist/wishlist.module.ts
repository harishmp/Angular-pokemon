import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { WishlistComponent } from './wishlist.component';
import { PokemoncardModule } from 'src/app/shared/pokemoncard/pokemoncard.module';

@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    MaterialModule,
    PokemoncardModule
  ]
})
export class WishlistModule { }
