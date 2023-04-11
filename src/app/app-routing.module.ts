import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { CrudComponent } from './pages/crud/crud.component';

const routes: Routes = [
  {path: "", component: SearchComponent},
  {path:"crud", component: CrudComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
