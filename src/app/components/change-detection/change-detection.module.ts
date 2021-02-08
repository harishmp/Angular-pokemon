import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeDetectionRoutingModule } from './change-detection-routing.module';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { ChangeDetectionComponent } from './change-detection.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ParentComponent, ChildComponent, ChangeDetectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChangeDetectionRoutingModule,
    MaterialModule
  ]
})
export class ChangeDetectionModule { }
