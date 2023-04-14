import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DetailRacketComponent } from './components/detail-racket/detail-racket.component';
import { ManagementComponent } from './components/management/management.component';
import { AdminComponent } from './components/landing/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatPaginatorModule} from '@angular/material/paginator';
import { RacketDeleteComponent } from './components/racket-delete/racket-delete.component';


@NgModule({
  declarations: [
    DetailRacketComponent,
    ManagementComponent,
    AdminComponent,
    RacketDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgMultiSelectDropDownModule,
    MatPaginatorModule
  ]
})
export class AdminModule { }
