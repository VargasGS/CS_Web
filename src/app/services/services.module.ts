import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LugarRetiroData } from 'src/app/models/catalogos/lugar-retiro';
import { LugarRetiroService } from './catalogos/lugar-retiro/lugar-retiro.service';
import { LugarRetiroApi } from './catalogos/lugar-retiro/lugar-retiro.api';
import { LugarAtencionData } from '../models/catalogos/lugar-atencion';
import { LugarAtencionService } from './catalogos/lugar-atencion/lugar-atencion.service';
import { LugarAtencionApi } from './catalogos/lugar-atencion/lugar-atencion.api';
import { PacientesData } from '../models/catalogos/pacientes';
import { PacientesService } from './catalogos/pacientes/pacientes.service';
import { PacientesApi } from './catalogos/pacientes/pacientes.api';
import { AdscritosApi } from './catalogos/adscritos/adscritos.api';
import { AdscritosData } from '../models/catalogos/adscritos';
import { AdscritosService } from './catalogos/adscritos/adscritos.service';
import { ActivacionRecetaApi } from './activacion-receta/activacion-receta.api';
import { ActivacionRecetaData } from '../models/activacion-receta/activacion-receta';
import { ActivacionRecetaService } from './activacion-receta/activacion-receta.service';
import { UsuariosApi } from './autenticacion/usuarios.api';
import { UsuariosData } from '../models/autenticacion/usuarios';
import { UsuariosService } from './autenticacion/usuarios.service';
import { DigitacionRecetaApi } from './digitacion-receta/digitacion-receta.api';
import { DigitacionRecetaData } from '../models/digitacion-receta/digitacion-receta';
import { DigitacionRecetaService } from './digitacion-receta/digitacion-receta.service';
import { PaquetesData } from '../models/paquetes/paquetes';
import { PaquetesService } from './paquetes/paquetes.service';
import { PaquetesApi } from './paquetes/paquetes.api';




const API = [
LugarRetiroApi,
LugarAtencionApi,
PacientesApi,
AdscritosApi,
ActivacionRecetaApi,
UsuariosApi,
DigitacionRecetaApi,
PaquetesApi
];
const SERVICES = [
  { provide: LugarRetiroData, useClass: LugarRetiroService },
  { provide: LugarAtencionData, useClass: LugarAtencionService },
  { provide: PacientesData, useClass: PacientesService },
  { provide: AdscritosData, useClass: AdscritosService},
  { provide: ActivacionRecetaData, useClass: ActivacionRecetaService},
  { provide: UsuariosData, useClass: UsuariosService},
  { provide: DigitacionRecetaData, useClass: DigitacionRecetaService},
  { provide: PaquetesData, useClass: PaquetesService},

];

@NgModule({
  imports: [CommonModule],
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [
        ...API,
        ...SERVICES,
      ],
    };
  }
}
