import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './home/components/registro/registro.component';


const routes: Routes = [
  { path: '', component:LoginComponent,pathMatch:"full" },
  { path: 'login', component:LoginComponent,pathMatch:"full" },
  { path: 'pages', loadChildren: () => import("./home/home.module").then(x => x.HomeModule) },
  { path: '**', redirectTo:'login',pathMatch:"full" },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
