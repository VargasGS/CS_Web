import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RequisitosComponent } from './components/requisitos/requisitos.component';
import { ActivacionRecetaComponent } from './components/activacion-receta/activacion-receta.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DigitacionComponent } from './components/digitacion/digitacion.component';
import { AuthGuard } from '../guards/auth.guard';
import { EstadoRecetaComponent } from './components/estado-receta/estado-receta.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path: 'requisitos',
        component: RequisitosComponent,
      },
      {
        path: 'activacion-receta',
        component: ActivacionRecetaComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'registro',
        component: RegistroComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'digitacion',
        component: DigitacionComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'estadoReceta',
        component: EstadoRecetaComponent,
      }
    ]
 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class homeRoutingModule {}
