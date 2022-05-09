import { Class10ToolsComponent } from './components/class10-tools/class10-tools.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { Class10CadastrarContractComponent } from './components/class10-cadastrar-contract/class10-cadastrar-contract.component';
import { Class10HomeComponent } from './components/class10-home/class10-home.component';
import { Class10IndexComponent } from './components/class10-index/class10-index.component';


const routes: Routes = [
  {
    path: '',
    component: Class10IndexComponent,
    children: [
      {
        path: '',
        redirectTo: '/users/private/class10/root',
        pathMatch: 'full'
      },
      {
        path: 'root',
        component: Class10HomeComponent
      },
      {
        path: 'commands',
        component: Class10ToolsComponent
      },
      {
        path: 'create-contract',
        component: Class10CadastrarContractComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Class10RoutingModule { }
