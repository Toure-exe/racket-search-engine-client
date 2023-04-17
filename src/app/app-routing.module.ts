import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  {path: "", component: SearchComponent},
  {path:"auth", component: AuthComponent},
  {path:"admin", loadChildren:()=>import('./pages/admin/admin.module').then(m=>m.AdminModule),canActivate:[AuthGuard]},
  {path:"**", component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
