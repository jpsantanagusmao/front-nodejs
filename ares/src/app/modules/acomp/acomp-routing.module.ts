import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaAcompComponent } from './components/tela-acomp/tela-acomp.component';
import { PropriedadeRuralComponent } from './components/propriedade-rural/propriedade-rural.component';
import { ContatoFuncionarioComponent } from './components/contato-funcionario/contato-funcionario.component';
 
const routes: Routes = [
  {
    path:'acompanhamentos',
    component: TelaAcompComponent,
    children: [
      {
        path: '',
        redirectTo: '/acompanhamentos',
        pathMatch: 'full'
      },
      {
        path: 'propriedade-rural/:id',
        component: PropriedadeRuralComponent
      },
      {
        path: 'contato/:id',
        component: ContatoFuncionarioComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcompRoutingModule { }
