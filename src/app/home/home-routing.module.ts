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
import { PaquetesComponent } from './components/paquetes/paquetes.component';
import { ReciboPaquetesComponent } from './components/recibo-paquetes/recibo-paquetes.component';
import { EntregaRecetaComponent } from './components/entrega-receta/entrega-receta.component';


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
      },
      {
        path: 'paquetes',
        component: PaquetesComponent,
      },
      {
        path: 'recibo-paquetes',
        component: ReciboPaquetesComponent,
      },
      {
        path: 'entrega-receta',
        component: EntregaRecetaComponent,
      }
    ]
 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class homeRoutingModule {}
