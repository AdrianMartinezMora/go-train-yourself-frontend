import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdListComponent} from './components/prod-list/prod-list.component';
import { ProdFormComponent} from './components/prod-form/prod-form.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/productos',
    pathMatch: 'full'
  },
  {
    path:'productos',
    component: ProdListComponent
  },
  {
    path:'productos/add',
    component: ProdFormComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
