import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/landing/admin.component';
import { ManagementComponent } from './components/management/management.component';
import { DetailRacketComponent } from './components/detail-racket/detail-racket.component';

const routes: Routes = [
  {path:'',component:AdminComponent},
  {path:'new-racket',component:ManagementComponent},
  {path:'edit-racket',component:ManagementComponent},
  {path:'detail-racket',component:DetailRacketComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
