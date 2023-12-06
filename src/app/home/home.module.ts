import { NgModule } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NbThemeModule, NbLayoutModule, NbActionsModule, NbIconModule, NbUserModule, NbSelectModule, NbMenuModule, NbContextMenuModule, NbCardModule, NbListModule, NbRadioModule, NbCheckboxModule, NbButtonModule, NbBadgeModule, NbThemeService } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { SplitterModule } from 'primeng/splitter';
import { NbSidebarModule } from '@nebular/theme';

import { homeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ActivacionRecetaComponent } from './components/activacion-receta/activacion-receta.component';
import { RequisitosComponent } from './components/requisitos/requisitos.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ServicesModule } from '../services/services.module';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from "primeng/dialog";
import { DigitacionComponent } from './components/digitacion/digitacion.component'; 
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { EstadoRecetaComponent } from './components/estado-receta/estado-receta.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    ActivacionRecetaComponent,
    RegistroComponent,
    RequisitosComponent,
    FooterComponent,
    HeaderComponent,
    DigitacionComponent,
    EstadoRecetaComponent
   
  ],
  imports: [
  
    NbLayoutModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    homeRoutingModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    NbActionsModule, 
    NbIconModule,
    NbUserModule,
    NbSelectModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbSidebarModule.forRoot(), 
    NbCardModule,
    NbListModule, 
    NbRadioModule,
    NbCheckboxModule,
    NbButtonModule,
    NbBadgeModule,
    HttpClientModule,
    FormsModule,
    CalendarModule,
    InputTextModule ,
    ServicesModule.forRoot(),
    DynamicDialogModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    NbActionsModule,
    OverlayPanelModule,
    NbUserModule,
    MessageModule,
    NbSidebarModule.forRoot(),
    NbEvaIconsModule,
    NbLayoutModule,
    MenuModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })

   
  
  ],
   providers: [
  
    // ... otros proveedores ...
    { provide: DOCUMENT, useValue: document } // Proporcionar el objeto Document
    ,{provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true}
    
  ],
 
})
export class HomeModule { }
